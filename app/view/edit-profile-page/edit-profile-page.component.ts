import { Component, OnInit, NgZone } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

import { UserService } from "../../services/user.service";
import { ConfigService } from "../../services/config.service";
import { ComponentEventService } from "../../services/component-event.service";

import { User } from "../../models/user.model";

import * as moment from 'moment';
import * as dialogs from "ui/dialogs";

@Component({
    selector: "edit-profile-page",
    moduleId: module.id,
    templateUrl: "./edit-profile-page.component.html",
    styleUrls: ['./edit-profile-page.component.css'],
})
export class EditProfileComponent implements OnInit {
	
	userId: number = 0;   
    communityRoles: Array<string> = ['Community Leader', 'Community Project', 'Community Member'];
    months: Array<string> = [];
    days: Array<string> = [];
    years: Array<number> = [];

    isInitialized: boolean = false;
    isUserImageEdited: boolean = false;

    selectedCommunityRole: number;
    selectedMonth: number;
    selectedDay: number;
    selectedYear: number;

    user: User;

    navOptions: any;

    userImage: string;
    originalUserImage: string;

    constructor(
        private _ngZone: NgZone,
        private _routerExtensions: RouterExtensions,
    	private _userService: UserService,
        private _configService: ConfigService,
    	private _componentService: ComponentEventService,
    ) {
    	this.user = new User();
        this.navOptions = this._componentService.getRouteOptions();
    }

    ngOnInit() {
        this.userId = this._userService.getCurrentUserId();
        
        this.generateMonth();
        this.generateDay();
        this.generateYear();

        this.getUserData();
    }

    initializeDateDefaultValue(birthDate?) {
        let date = (birthDate)? new Date(birthDate) : new Date();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let year = date.getFullYear();

        let monthIndex = (month >= 10)? this.months.indexOf(month.toString()) : this.months.indexOf('0'+month);
        let dayIndex = (day >= 10)? this.days.indexOf(day.toString()) : this.days.indexOf('0'+day);
        let yearIndex = this.years.indexOf(year);

        this.selectedMonth = monthIndex;
        this.selectedDay = dayIndex;
        this.selectedYear = yearIndex;
    }

    generateMonth() {

        for(let i = 1; i <= 12; i++) {

            let data = (i >= 10)? i.toString() : '0'+i;
            
            this.months.push(data)
        }
    }

    generateDay() {

        for(let i = 1; i <= 31; i++) {

            let data = (i >= 10)? i.toString() : '0'+i;

            this.days.push(data)
        }
    }

    generateYear() {
        let currentYear = new Date().getFullYear();
        let startYear = 1905;

        while(startYear <= currentYear) {
            this.years.push(startYear++)
        }
    }

    onCommunityRolechange(event: SelectedIndexChangedEventData) {
        this.selectedCommunityRole = event.newIndex;
        this.user.communityRole = this.communityRoles[event.newIndex];
    }

    onMonthchange(event: SelectedIndexChangedEventData) {
        this.selectedMonth = event.newIndex;
    }

    onDaychange(event: SelectedIndexChangedEventData) {
        this.selectedDay = event.newIndex;
    }

    onYearchange(event: SelectedIndexChangedEventData) {
        this.selectedYear = event.newIndex;
    }

    changePicture() {
        this._componentService.changeImage(150, 150)
            .then((result:any) => {
                this.isUserImageEdited = true;
                this.userImage = result; 

                this.changeConfirmationDialog();
            })
            .catch((err) => {
                console.log("CAMERA/GALLERY: "+err)
            });
    }

    changeConfirmationDialog() {
        dialogs.confirm({
            title: "Confirmation",
            message: "Are you sure you want to use this picture?",
            okButtonText: "Yes",
            cancelButtonText: "No",
        }).then(result => {
            console.log('IMAGE::::');
            console.log(this.userImage)
            if(result) {
                this.saveImage();
            }else {
                this.revert();
            }
        });
    }

    saveImage() {
        this.uploadImage();
    }

    revert() {
        this.userImage = this._componentService.getImageProfile(this.originalUserImage);
        this.isUserImageEdited = false;
    }

    uploadImage() {
        this._componentService.showLoader('Uploading...');

        this._componentService.uploadImage(this.userId, 'user', this.userImage)
            .then((result: any) => {
                this._componentService.hideLoader();

                if(result.success) {
                    console.log('RESULT DATA ***')
                    console.log(result.data)
                    this._ngZone.run(() => { 
                        this.originalUserImage = result.data;
                        this.user.imageUrl = this.originalUserImage;
                        this.userImage = this._componentService.getImageProfile(result.data);
                        this.isUserImageEdited = false;
                    })
                }else{
                    this._componentService.showErrorFeedback('Ooops!', result.message);
                }
            })
            .catch((err) => {
                console.log("UPLOAD ERROR: " + err)
                this._componentService.hideLoader();
                this._componentService.showErrorFeedback('Ooops!', 'Update failed');
            })
    }

    save() {
        let month = this.months[this.selectedMonth];
        let day = this.days[this.selectedDay];
        let year = this.years[this.selectedYear];
        let date = `${year}/${month}/${day}`;

        let dateIsValid = moment(date, "YYYY/MM/DD", true).isValid();
        let age = moment().diff(date, 'years');
        
        this._componentService.showLoader('Updating...');

        if(!this.user.firstName || !this.user.lastName) {
            setTimeout(() => {
                this._componentService.hideLoader();
                this._componentService.showErrorFeedback('Ooops!', 'first name or last name must not be empty.');
                return;
            }, 1200)

        }else {
            this.user.birthDate = date;
            this.updateUser(this.user);
        }
    }

    cancel() {
        this._routerExtensions.back();
    }

    async getUserData() {
    	try{

    		let res = await this._userService.getUserData(this.userId);

            this.isInitialized = true;
            if(res.data) {
                this.user.deserialize(res.data);

                this.originalUserImage = this.user.imageUrl;
                this.userImage = this._componentService.getImageProfile(this.user.imageUrl);
                this.selectedCommunityRole = this.communityRoles.indexOf(this.user.communityRole);
                this.initializeDateDefaultValue(this.user.birthDate);
            }

    	}catch(e){
            this.isInitialized = true;
    	}
    }

    async updateUser(data) {
        try{

            let res = await this._userService.updateUser(this.userId, data);

            this._componentService.hideLoader();

            if(res.success) {
                this._routerExtensions.navigate(['/settings'], this.navOptions);
                this._componentService.showSuccessFeedback('Success!', 'User successfully updated.');
            }else {
                this._componentService.showErrorFeedback('Ooops!', 'Update failed.');
            }

        }catch(e) {
            this._componentService.hideLoader();
        }
    }
   
}