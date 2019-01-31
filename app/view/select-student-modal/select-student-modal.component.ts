import { Component, OnInit, ViewContainerRef, HostListener, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { Progress } from "ui/progress";
import { Page } from "ui/page";

import { SelectListComponent } from "../../view/selectlist-page/selectlist-page.component";
import { WalkThroughComponent } from "../../view/walkthrough-page/walkthrough-page.component";

import { ProjectService } from "../../services/project.service";
import { ComponentEventService } from "../../services/component-event.service";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

import { Project } from "../../models/project.model";
import { Student } from "../../models/student.model";

import * as dialogs from "ui/dialogs";

@Component({
    selector: "select-student-modal",
    moduleId: module.id,
    templateUrl: "./select-student-modal.component.html",
    styleUrls: ['./select-student-modal.component.css'],
})
export class SelectStudentComponent implements OnInit {

    videoPlayer: ElementRef;

    projectId: number = 0;
    selectedBand: number = 0;
    dateStart: string;
	numberOfBands: Array<number> = [200, 300, 400];

    student: Student;
    project: Project;

    navOptions: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private params: ModalDialogParams,
		private modal: ModalDialogService, 
		private vcRef: ViewContainerRef,
        private _page: Page,
        private _projectService: ProjectService,
        private _componentService: ComponentEventService,
    ) {

        this.student = new Student();
        this.project = new Project();

        this.project.deserialize({
            studentId: 0
        })

        this.navOptions = this._componentService.getRouteOptions();
        this.projectId = this.params.context.projectId;
        this.dateStart = this.params.context.dateStart;

    }

    ngOnInit() {
        let selectedStudent = this._componentService.getSelectedStudent();

        if(selectedStudent.studentId) {
            this.project.studentId = selectedStudent.studentId;
            this.student.deserialize({
                firstName: selectedStudent.firstName,
                lastName: selectedStudent.lastName
            });
        }


    }

    onValueChanged(args) {
        let progressBar = <Progress>args.object;
    }

    onClose() {
        // this._componentService.removeSelectedStudent();
        this.params.closeCallback({ success: false });
    }

    confirm() {
        if(this.project.studentId > 0) {
            this._componentService.showLoader('')
            this.updateProjectApproved({ studentId: this.project.studentId });
        }else {
            this._componentService.showAlert('Oops!', 'You must pick a student');
        }
    }

    openWalkthrough(type) {

        let opt = {
            context: { type: type },
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true
        }
        
        this.modal.showModal(WalkThroughComponent, opt).then(response => {
           console.log(response)
        })
    }    

   	searchStudent() {

        let opt = {
            context: { 
                projectId: this.projectId,
                dateStart: this.dateStart
            },
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true,
            transition: {
                name: "slideTop",
                duration: 200,
                curve: "ease"
            }
        }

        this.modal.showModal(SelectListComponent, opt).then(response => {
            this.projectId = response.projectId;
            this.dateStart = response.dateStart;
            this.ngOnInit();
        })
    }
    
    async updateProjectApproved(data) {
        try{
            let res = await this._projectService.updateProjectApproved(this.projectId, data)

            this._componentService.hideLoader();
            this._componentService.removeSelectedStudent();
            this.params.closeCallback({ success: true, projectId: this.projectId });
        }catch(e) {
            this._componentService.hideLoader();
            this._componentService.showAlert('Oops!', 'Unable to select a student. Please try again later')
        }
    }
}




