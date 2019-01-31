import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

// SERVICES
import { ProjectMemberService } from "../../services/project-member.service";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "volunteers-list-modal",
    moduleId: module.id,
    templateUrl: "./volunteers-list-modal.component.html",
    styleUrls: ['./volunteers-list-modal.component.css'],
})
export class VolunteersListComponent implements OnInit {

    projectId: number = 0;

	volunteers: Array<any> = []

    constructor(
        private modal: ModalDialogParams,

        private _componentService: ComponentEventService,
        private _projectMemberService: ProjectMemberService,
    ) {
        this.projectId = this.modal.context.projectId;
    }

    ngOnInit() {
        this._componentService.showLoader('Loading...');
    	this.getProjectMembers();
    }

    onClose() {
        this.modal.closeCallback(true);
    }

    async getProjectMembers() {
        try{
            let res = await this._projectMemberService.getProjectMembers(this.projectId);

            this._componentService.hideLoader();
            if(res.data.length > 0) {
                for(let i = 0; i < res.data.length; i++) {
                    res.data[i].imageUrl = this._componentService.getImageProfile(res.data[i].imageUrl);
                }

                this.volunteers = res.data;
            }
        }catch(e) {
            console.log(e)
            this._componentService.hideLoader();
        }
    }
}