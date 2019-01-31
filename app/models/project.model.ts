import { Deserializable } from "./deserializable.model";
import * as moment from "moment";

export class Project implements Deserializable {

	projectId?: number;
	email?: string;
	phoneNumber?: string;
	schoolName?: string;
	schoolAddress?: string;
	userSchoolAffiliation?: string;
	userSchoolAffiliationType?: string;
	schoolEnrollees?: string;
	clubSponsor?: string;
	teacherName?: string;
	teacherEmail?: string;
	projectDescription?: string;
	videoLink?: string;
	imageUrl?: any;
	raisedMoney?: string;
	bandsSold?: string;
	totalBands?: number;
	dateStart?: string;
	dateEnd?: string;
	heardFrom?: string;
	datetimeCreated?: string;
	datetimeUpdated?: string;
	studentApproval?: string;
	shipmentApproval?: string;
	status?: string;

	userId?: any;
	studentId?: any;
	manager?: any;

	deserialize(input: any): this {
	    Object.assign(this, input);
	    return this;
	}

	getAffiliation(type) {

		let data = {
			student: [
				'7th grade student',
				'8th grade student',
				'9th grade student',
				'10th grade student',
				'11th grade student',
				'12th grade student',
				'College'
			],

			teacher: [
				'Elementary School Teacher',
				'Middle School Teacher',
				'High School Teacher',
				'College Professor'
			]
		}

		return data[type];
	}

	getSchoolClub() {
		return [
			'Beta Club',
			'DECA',
			'FBLA',
			'FCCLA',
			'Interact Club',
			'Key Club',
			'NHS',
			'Spanish Club',
			'Student Council',
			'Other'
		]
	}

	getHeardFrom() {
		return [
			'Referred by someone who has done the project',
			'My school has done the project before',
			'Google Search',
			'Instagram',
			'Facebook',
			'Twitter',
			'Conventions',
			'Other'
		]
	}

	getDateDuration() {
		let dateStart = moment(`${this.dateStart}`, 'YYYY-MM-DD').format('ll');
		let dateEnd = moment(`${this.dateEnd}`, 'YYYY-MM-DD').format('ll');

		return `${dateStart} - ${dateEnd}`;
	}

	getDuration2() {
		let d1 = this.dateStart.split('-');
		let d2 = this.dateEnd.split('-');

		let months = [
			'Jan', 'Feb', 'Mar', 'Apr', 'May',
			'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Dec'
		];

		let ds = {
			year: d1[0],
			month: parseInt(d1[1])-1,
			day: d1[2]
		}

		let de = {
			year: d2[0],
			month: parseInt(d2[1])-1,
			day: d2[2]
		}

		let dateStart = `${ds.month} ${ds.day}, ${ds.year}`;
		let dateEnd = `${de.month} ${de.day}, ${de.year}`;

		return `${dateStart} - ${dateEnd}`;
	}

	getSchoolName() {
		return this.toTitleCase(this.schoolName)
	}

	getCurrentYear() {
		let date = new Date();

		return date.getFullYear();
	}

	formatProjectDurationDate(month, day, year, type?) {
		let date = new Date(`${year}/${month+1}/${day}`);

		if(type === 'start') {
			return {
				date: moment(date).format('L')
			}
		}else {
			date.setDate(date.getDate() + 11);

			return {
				formatted: moment(date).format('LL'),
				date: moment(date).format('L')
			}
		}
	}

	isStepClean(step) {
		if(step === 1) {
			if(
				!this.email || 
				!this.phoneNumber
			) {
				return false;
			}else {
				return true;
			}
		}else if(step === 2) {
			if(
				!this.schoolName 	||
				!this.schoolAddress ||
				!this.clubSponsor 	||
				!this.schoolEnrollees
			) {
				return false;
			}else {
				return true;
			}
		}else if(step === 3) {
			if(
				!this.teacherName ||
				!this.teacherEmail
			) {
				return false;
			}else {
				return true;
			}
		}else if(step === 4) {
			return true;
		}else if(step === 5) {
			if(!this.heardFrom) {
				return false;
			}else {
				return true;
			}
		}
	}

	hasStudent() {
		return (!this.studentId || !this.studentId.studentId)? false : true;
	}

	getRaisedMoney() {
		let raisedMoney = parseInt(this.bandsSold)*7;

		raisedMoney = this.kFormatter(raisedMoney);
		
		return `$ ${raisedMoney}`;
	}

	checkUpdateBands(newNumber) {
		newNumber = parseInt(newNumber);

		return {
			success: (newNumber > this.totalBands)? false : true,
			message: (newNumber > this.totalBands)? 'Bands entered excedeed the total bands' : ''
		}
	}

	getOrderDeadLine() {
		let date = new Date(this.dateStart);

		date.setDate(date.getDate() - 13);

		let deadline = moment(date).format('L');

		return deadline;
	}

	kFormatter(num) {
		return num > 999 ? (num/1000).toFixed(1) + 'k' : num
	}

	clearTeacher() {
		this.teacherName  = '';
        this.teacherEmail = ''; 
	}

	toTitleCase(str) {
	    return str.replace(/\w\S*/g, function(txt){
	        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    });
	}
}



