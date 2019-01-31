import { Deserializable } from "./deserializable.model";

export class User implements Deserializable {

	userId: number;
	firstName: string;
	lastName: string;
	imageUrl: any;
	email: string;
	password: string;
	affiliation: string;
	communityRole: string;
	schoolName: string;
	birthDate: string;
	phoneNumber: string;
	address: string;
	city: string;
	country: string;
	datetimeCreated: string;
	datetimeUpdated: string;
	userType: string;
	loginType: string;
	status: string;

	totalProject: number;

	deserialize(input: any): this {
	    Object.assign(this, input);
	    return this;
	}

	getUserName() {
		return `@${this.firstName}`;
	}

	getFullName() {
		return this.toTitleCase(`${this.firstName} ${this.lastName}`);
	}

	getMemberYear() {
		let date = new Date(this.datetimeCreated);

		return date.getFullYear();
	}

	getFormattedBirthday() {
		if(!this.birthDate) return '';

		let months = [
			'January', 'February', 'March', 'April', 
			'May', 'June', 'July', 'August', 
			'September', 'October', 'November', 'December'
		];

		let date = new Date(this.birthDate);

		let month = months[date.getMonth()];
		let day   = date.getDate();
		let year  = date.getFullYear();

		return `${month} ${day}, ${year}`;
	}

	isRequiredFieldsNotEmpty() {
		if(
			!this.email ||
			!this.password
		) {
			return false;
		}else {
			return true;
		}
	}

	toTitleCase(str) {
	    return str.replace(/\w\S*/g, function(txt){
	        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    });
	}
}