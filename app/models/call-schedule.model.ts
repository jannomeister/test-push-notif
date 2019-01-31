import { Deserializable } from "./deserializable.model";
import { ComponentEventService } from "../services/component-event.service";

import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';

export class CallSchedule implements Deserializable {

	callScheduleId?: number;
	userId?: any;
	projectId?: any;
	studentId?: any;
	eventId?: any;
	skypeId?: string;
	callDate?: string;
	callTime?: string;
    localTime?: string;
	timeZone?: string;
	reminderStatus?: number;
	datetimeCreated?: string;
	datetimeUpdated?: string;
	status?: string;

	deserialize(input: any): this {
	    Object.assign(this, input);
	    return this;
	}

	formatDate() {
		let date = new Date(this.callDate.replace(/-/g, "/"));

		return moment(date).format('ll');
	}

    convertTo24hrs(time) {
        let hours = Number(time.match(/^(\d+)/)[1]);
        let minutes = Number(time.match(/:(\d+)/)[1]);
        let AMPM = time.match(/\s(.*)$/)[1];

        if ((AMPM == "PM" || AMPM == "pm") && hours < 12) hours = hours + 12;
        if ((AMPM == "AM" || AMPM == "am") && hours == 12) hours = hours - 12;

        let  sHours = hours.toString();
        let  sMinutes = minutes.toString();

        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;

        return `${sHours}:${sMinutes}:00`;
    }

	formatTime() {
        let timeArr = this.callTime.trim().split(':');

        let hours = parseInt(timeArr[0]);
        let minutes = parseInt(timeArr[1]);

        let ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;

        minutes = minutes < 10 ? parseInt('0'+minutes) : minutes;

        let minutesStr = (minutes === 0)? '00' : ((minutes < 10)? '0'+minutes : minutes.toString());
        
        let strTime = hours + ':' + minutesStr + ' ' + ampm;

        return strTime;
    }

    getSchedule() {
        if(!this.callDate || !this.callTime) {
            return 'No schedule yet.'
        }else {
            let d = new Date(this.callDate.trim()),
                month = d.getMonth()+1,
                day = d.getDate(),
                year = d.getFullYear();

            let date = moment(`${year}/${month}/${day} ${this.callTime}`, 'YYYY-MM-DD HH:mm:ss').format('lll');

            return date;
        }
    }

    getStudentLocalTime(userTimezone, country) {
    	let timezones = ComponentEventService.supportedTimezones;

    	if(this.callDate && this.callTime) {

    		country = country.toLowerCase();

    		let studentTimezone = (country === 'guatemala')? timezones[0] : ((country === 'zimbabwe')? timezones[1] : timezones[0]);

    		let date = `${this.callDate} ${this.callTime}`;
    		let userTime = momentTimezone.tz(date, 'YYYY-MM-DD HH:mm:ss', userTimezone)
        	let studentTime = momentTimezone.tz(userTime, studentTimezone);

        	let time = studentTime.format('h:mm A');
    		
    		return `In ${country} ${time}`;
    	}else {
    		return '';
    	}
    }

    getTime() {
        let dateAndTime = (this.callDate && this.callTime)? new Date(`${this.callDate} ${this.callTime}`) : new Date();
        let date = dateAndTime;

        return {
            hour: date.getHours(),
            minute: date.getMinutes()
        }
    }

    getButtonText() {
        return (!this.skypeId && !this.callDate && !this.callTime)? 'Ok':((this.skypeId && this.callDate && this.callTime)? 'Ok': 'Add');
    }

    hasSchedule() {
        return (!this.skypeId && !this.callDate && !this.callTime)? true :((this.skypeId && this.callDate && this.callTime)? true : false);
    }

    hasDateAndTime() {
    	return (this.callDate && this.callTime)? true : false;
    }

    isRequiredFieldsNotEmpty() {
    	if(
    		!this.skypeId ||
    		!this.callDate ||
    		!this.callTime
    	) {
    		return false;
    	}else {
    		return true;
    	}
    }

    isNotWeekend() {
        let date = new Date(this.callDate);

        let week = moment(date).weekday();
        
        return (week >= 1 && week <= 5)? true : false;
    }

    isCallConfirmed() {
        return (this.status === 'confirmed')? true : false;
    }

    isCallUnconfirmed() {
        return (this.status === 'unconfirmed')? true : false;
    }
}