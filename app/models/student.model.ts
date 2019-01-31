import { Deserializable } from "./deserializable.model";
import * as moment from "moment";

export class Student implements Deserializable {

	studentId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    skypeId?: string;
    birthDate?: string;
    imageUrl?: any;
    webImageUrl?: any;
    certificateImageUrl?: any;
    videoLink?: any;
    gender?: string;
    bio?: string;
    schoolName?: string;
    schoolSchedule?: string;
    yearLevel?: string;
    startYear?: number;
    gradYear?: number;
    address?: string;
    city?: string;
    country?: string;
    datetimeCreated?: string;
    datetimeUpdated?: string;
    scholarshipStatus?: string;
    status?: string;

    totalBands?: number;
    bandsSold?: number;
    remainingBands?: number;

	deserialize(input: any): this {
	    Object.assign(this, input);
	    return this;
	}

	decodeUTF8(s) {
		try{
			return decodeURIComponent(escape(s));
		}catch(e) {
			return s;
		}
	}

	toTitleCase(str) {
	    return str.replace(/\w\S*/g, function(txt){
	        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    });
	}

	getFullName() {
		if(!this.lastName || !this.firstName) {
			return null;
		}
		
		return this.decodeUTF8(`${this.firstName} ${this.lastName}`);
	}

	getEmail() {
		return `${this.email}`;
	}

	getAge() {
		let date = new Date(this.birthDate)

		return moment().diff(date, 'years');
	}

	getCountry() {
		return (this.country)? this.toTitleCase(this.country) : 'N/A';
	}

	getGender() {
		return (this.gender)? this.toTitleCase(this.gender) : 'N/A';
	}

	getBio() {
		return (this.bio)? this.decodeUTF8(this.bio) : 'N/A';
	}
	
	getFlag() {
		let flags = {
			guatemala: '~/assets/icon/guatemala.png',
			zimbabwe: '~/assets/icon/zimbabwe.png'
		};

		return flags[this.country.toLowerCase()];
	}

	hasVideo() {
		return (this.videoLink)? true : false;
	}
}