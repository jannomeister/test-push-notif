import { Component, OnInit, HostListener } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

import { Student } from "../../models/student.model";
import { StudentNeed } from "../../models/student-need.model";

import { StudentService } from "../../services/student.service";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "student-info-modal",
    moduleId: module.id,
    templateUrl: "./student-info-modal.component.html",
    styleUrls: ['./student-info-modal.component.css'],
})
export class StudentInfoModalComponent implements OnInit {
	
	studentId: number;
    totalBands: number = 0;

    isBusy: boolean = true;

    type: string;
    videoId: string;

    student: Student;

	constructor(
        private params: ModalDialogParams,
        private _studentSevice: StudentService,
        private _componentService: ComponentEventService
    ) {
        this.student = new Student();
        this.studentId = this.params.context.studentId;
        this.type = this.params.context.type;
    }

	ngOnInit() {
        setTimeout(() => {
            this.getStudent();
            this.getStudentCurrentNeed();
        }, 600)
    }

	onClose() {
    	this.params.closeCallback({ success: false });
	}

    selectStudent() {
        this._componentService.showLoader('Loading...');

        setTimeout(() => {
            this._componentService.hideLoader();
            this.params.closeCallback({ success: true, data: this.student })
        }, 700)
    }

    async getStudent() {
        try{
            let res = await this._studentSevice.getStudent(this.studentId);

            this.isBusy = false;
            if(res.data) {
                this.student.deserialize(res.data);
                this.videoId = this._componentService.getYoutubeId(this.student.videoLink);
            }
        }catch(e) {
            console.log(e)
        }
    }

    async getStudentCurrentNeed() {
        try{
            let res = await this._studentSevice.getStudentCurrentNeed(this.studentId);

            this.totalBands = res.data;
        }catch(e) {
            console.log(e)
        }
    }
}