import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

// MODELS
import { Student } from "../../models/student.model";
import { Project } from "../../models/project.model";

// SERVICES
import { StudentService } from "../../services/student.service";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "brag-page",
    moduleId: module.id,
    templateUrl: "./brag-page.component.html",
    styleUrls: ['./brag-page.component.css'],
})
export class BragComponent implements OnInit {

	student: Student;
	project: Project;

	constructor(
		private modal: ModalDialogParams,

		private _studentService: StudentService,
		private _componentService: ComponentEventService
	){
		this.student = new Student();
		this.project = new Project();

		this.project.deserialize(this.modal.context.project)
	}

	ngOnInit() {
		this.getStudent()
	}

	onClose() {
        this.modal.closeCallback(true);
    }

    getBragDesc() {
		return `${this.project.getSchoolName()} just helped pay for ${this.student.getFullName()} from ${this.student.getCountry()} to get an education.`
	}

    async getStudent() {
    	try{
    		let res = await this._studentService.getStudent(this.modal.context.student.studentId);

    		if(res.data) {
    			this.student.deserialize(res.data)
    		}
    	}catch(e) {
    		console.log(e)
    	}
    }
}