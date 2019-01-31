import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

import { ProjectMemberService } from "../../services/project-member.service";
import { ComponentEventService } from "../../services/component-event.service";

import { Member } from "../../models/member.model";

@Component({
    selector: "joinproject-page",
    moduleId: module.id,
    templateUrl: "./joinproject-page.component.html",
    styleUrls: ['./joinproject-page.component.css'],
})
export class JoinProjectComponent implements OnInit {
    
    member: Member;

    constructor(
    	private params: ModalDialogParams,
        private _componentService: ComponentEventService,
        private _projectMemberService: ProjectMemberService,
    ) {
    	this.member = new Member();
        this.member.deserialize({
            userId: 0,
            projectId: 0,
            reason: ''
        })
    }

    ngOnInit() {
        this.member.userId = this.params.context.userId;
        this.member.projectId = this.params.context.projectId;
    }

	onClose() {
    	this.params.closeCallback();
	}

	joinProject() {
		this._componentService.showLoader('Loading...')

		this.createProjectMember();
	}
    
    async createProjectMember() {
        try {
    		let res = await this._projectMemberService.createProjectMember(this.member);

            this._componentService.hideLoader();
    		if(res.success) {
    			this.params.closeCallback(true);
    		}else {
                this._componentService.showAlert('Ooops!', res.data);
    		}
    	}catch(e) {
    		this._componentService.hideLoader();
    	}
    }
   
}