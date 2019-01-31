import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

// MODELS
import { CallSchedule } from '../../models/call-schedule.model';

// SERVICES
import { CallScheduleService } from "../../services/call-schedule.service";
import { ComponentEventService } from "../../services/component-event.service";

import * as dialogs from "ui/dialogs";
import * as moment from 'moment';

@Component({
    selector: "skype-sched-page",
    moduleId: module.id,
    templateUrl: "./skype-sched-page.component.html",
    styleUrls: ['./skype-sched-page.component.css'],
})
export class SkypeSchedComponent implements OnInit {

    userId: number;
    projectId: number;

	callSchedule: CallSchedule;

    months: Array<string>;
    availableTimes: Array<string>;

    picker: any;
    selectedDate: string = '';
    selectedTime: string = '';
    selectedAvailableTime: number = 0;
    userTimezone: string = '';
    studentLocalTime: string = '';
    buttonText: string = 'Schedule Call';

    hasDate: boolean = false;
    hasTime: boolean = false;
    hasSchedule: boolean = false;
    isLoadingAvailableTimes: boolean = true;
    isLocalTimePending: boolean = false;

    constructor(
    	private modal: ModalDialogParams,
    	private _callScheduleService: CallScheduleService,
    	private _componentService: ComponentEventService,
    ) {
        this.userId = this.modal.context.user.userId;
        this.projectId = this.modal.context.projectId;

    	this.callSchedule = new CallSchedule();
        this.initDatePicker();
        this.initMonths();
    }

    ngOnInit() {
        this.initCallSchedule();
    }

    initCallSchedule() {
        this._componentService.showLoader('Loading...');
        this.getCallSchedule(this.userId, this.projectId);
    }

    initDatePicker() {
    	const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
		this.picker = new ModalPicker();
    }

    initMonths() {
    	this.months = [
    		'January','February','March',
    		'April','May','June','July',
    		'August','September','October',
    		'November','December'
    	];
    }

    onDateSelected() {
        if(this.hasSchedule) {
            return;
        }
        
        this.picker.pickDate({
            title: "Select Date",
            theme: "dark",
            minDate: this.setMinAndMaxDate().minDate,
            maxDate: this.setMinAndMaxDate().maxDate
        }).then((result) => {
            // result { day: 0, month: 0, year: 0 }
            if(result) {
                this.hasDate = true;
                this.callSchedule.callDate = `${result.year}/${result.month}/${result.day}`;
                this.selectedDate = this.callSchedule.formatDate();

                this.getStudentLocalTime();
            }

        }).catch((error) => {});
    }

    onDDTimeClosed() {
        this.converTime(); 
    }

    onTimeSeleted() {

        this.picker.pickTime({
            hour: this.callSchedule.getTime().hour,
            minute: this.callSchedule.getTime().minute
        }).then((result) => {
            if(result) {
                this.hasTime = true;
                this.callSchedule.callTime = `${result.hour}:${result.minute}:00`;
                this.selectedTime = this.callSchedule.formatTime();

                this.getStudentLocalTime();
            }
        })
        .catch((error) => {});
    }

    converTime() {
        let selected = this.availableTimes[this.selectedAvailableTime];

        this.hasTime = true;
        this.callSchedule.callTime = this.callSchedule.convertTo24hrs(selected);
        this.selectedTime = selected;

        this.getStudentLocalTime();
    }

    setMinAndMaxDate() {
        let currentDate = new Date();

        let minDate = new Date(this.modal.context.dateStart);
        let maxDate = new Date(this.modal.context.dateStart);

        currentDate.setDate(currentDate.getDate()+4)

        minDate.setDate(minDate.getDate()-7);
        maxDate.setDate(maxDate.getDate()+4);

        return {
            minDate: (currentDate >= minDate && currentDate <= maxDate)? currentDate : minDate,
            maxDate: maxDate
        }
    }

    getDefaultDate() {
        let min = moment(this.setMinAndMaxDate().minDate);

        this.hasDate = true;
        this.callSchedule.callDate = min.format('YYYY/MM/DD');
        this.selectedDate = this.callSchedule.formatDate();

        this.getStudentLocalTime();
    }

    getStudentLocalTime() {
        if(this.callSchedule.hasDateAndTime()) {
            this.isLocalTimePending = true;
            setTimeout(() => {
                this.isLocalTimePending = false;
                this.studentLocalTime = this.callSchedule.getStudentLocalTime(this.userTimezone, this.modal.context.student.country)
            }, 1000)
        }else {
            this.studentLocalTime = '';
        }
    }

    done() {
        if(this.hasSchedule) {
            this.onClose();
        }else {
            this.add();
        }
    }

    onClose() {
        this.modal.closeCallback({ success: this.hasSchedule, data: this.callSchedule });
    }

    refresh() {
        this._componentService.showRefreshAlert()
            .then((res) => {
                this._componentService.showLoader('Refreshing...');
                setTimeout(() => {
                    this.getCallSchedule(this.userId, this.projectId);
                }, 1000)
            })
    }

    add() {
        this._componentService.showLoader('Adding...');
        setTimeout(() => {
            if(!this.callSchedule.isRequiredFieldsNotEmpty()) {
                this._componentService.hideLoader();
                this._componentService.showAlert('Ooops!', 'All fields are required')
                return;
            }else if(!this.callSchedule.isNotWeekend()) {
                this._componentService.hideLoader();
                this._componentService.showAlert('Ooops!', 'You can\'t schedule skype calls on weekends')
                return;
            }

            this.callSchedule.userId = this.modal.context.user.userId;
            this.callSchedule.projectId = this.modal.context.projectId;
            this.callSchedule.studentId = this.modal.context.student.studentId;
            this.callSchedule.timeZone = this.userTimezone;

            this.addSchedule();
        }, 1000);
    }

    async addSchedule() {
        try{
            let res = await this._callScheduleService.addCallSchedule(this.callSchedule);

            this._componentService.hideLoader();
            if(res.success) {
                this.hasSchedule = true;
                this.buttonText = 'Ok';
                this._componentService.showAlert('Success!', 'Your call has been scheduled. Once it is confirmed by your student\'s local director you\'ll receive an email with instructions on how to make the call.');
            }else {
                this._componentService.showAlert('Ooops!', res.data);
            }
        }catch(e) {
            this._componentService.hideLoader();
            this._componentService.showAlert('Ooops!', 'Something went wrong. Please try again');
            console.log('ADD SCHEDULE ERROR')
            console.log(e)
        }
    }

    async getCallSchedule(userId, projectId) {
        try{
            let res = await this._callScheduleService.getCallSchedule(userId, projectId);

            this._componentService.hideLoader();
            if(res.data) {
                this.hasSchedule = true;
                this.buttonText = 'Ok';
                this.callSchedule.deserialize(res.data);

                this.selectedDate = this.callSchedule.formatDate();
                this.selectedTime = this.callSchedule.formatTime();

                // this.getStudentLocalTime();
            }else {
                this.getDefaultDate();
            }

            this.getGeocodeAddress();
        }catch(e) {
            this._componentService.hideLoader();
            this.refresh();
            console.log('*** GET CALL SCHEDULE ERROR:')
            console.log(e)
        }
    }

    async getGeocodeAddress() {
        try{
            let res = await this._callScheduleService.getGeocodeAddress(
                this.modal.context.schoolAddress
            );

            if(res.results.length > 0) {
                let lat = res.results[0].geometry.location.lat;
                let lng = res.results[0].geometry.location.lng;

                this.getTimezone(lat, lng);

            }else {
                this._componentService.hideLoader();
                this._componentService.showAlert('Ooops!', 'We couldn\'t find your city and country! please update by going to your profile');
            }
        }catch(e) {
            this._componentService.hideLoader();
            this.refresh();
            console.log('*** GET GEOCODE ADDRESS ERROR:')
            console.log(e)
        }
    }

    async getTimezone(lat, lng) {
        try{
            let res = await this._callScheduleService.getTimeZone(lat, lng);

            if(res) {
                this.userTimezone = res.timeZoneId;
                this._componentService.hideLoader();
                this.getAvailableTime(this.userTimezone);
            }else {
                this._componentService.hideLoader();
                this.refresh();
            }

        }catch(e) {
            this._componentService.hideLoader();
            this.refresh();
            console.log('*** GET TIMEZONE ERROR:')
            console.log(e)
        }
    }

    async getAvailableTime(timeZone) {
        try{
            let res = await this._callScheduleService.getAvailableTime(this.userId, this.projectId, timeZone);

            this.isLoadingAvailableTimes = false;
            this._componentService.hideLoader();

            this.availableTimes = res.data;
            if(this.selectedTime) {
                let index = this.availableTimes.indexOf(this.selectedTime);
                this.selectedAvailableTime = index;
            }

            this.converTime();
            
        }catch(e) {
            this._componentService.hideLoader();
            this.refresh();
            console.log('*** GET AVAILABLE TIME ERROR:')
            console.log(e)
        }
    }
}