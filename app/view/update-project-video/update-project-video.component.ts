import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { TextField } from "ui/text-field";

import { ProjectService } from "../../services/project.service";
import { ComponentEventService } from "../../services/component-event.service";

import { Project } from "../../models/project.model";

@Component({
    selector: "update-project-video",
    moduleId: module.id,
    templateUrl: "./update-project-video.component.html",
    styleUrls: ['./update-project-video.component.css'],
})
export class UpdateProjectVideoComponent implements OnInit {

    buttonText: string = 'DONE';
    projectId: number;

    project: Project;

    constructor(
        private modal: ModalDialogParams,
        private _projectService: ProjectService,
        private _componentService: ComponentEventService,
    ) {
        this.project = new Project();
        this.project.deserialize({
            videoLink: ''
        })
    }

    ngOnInit() {
        this.projectId = this.modal.context.projectId;
        this.project.videoLink = this.modal.context.videoLink;
    }

    onTextChange(args) {
        let textField = <TextField>args.object;

        if(textField.text.trim() === this.modal.context.videoLink.trim()) {
            this.buttonText = 'DONE';
        }else if(!textField.text.trim()){
            this.buttonText = 'UPDATE';
        }else{
            this.buttonText = 'UPDATE';
        }
    }

    close() {
    	this.modal.closeCallback({ success: false });
	}

    update() {
        if(!this.project.videoLink) {
            this._componentService.showErrorFeedback('Ooops!', 'Field must not be empty.')
        }else if(this.project.videoLink.trim() === this.modal.context.videoLink.trim()){
            this.modal.closeCallback({ success: false });
        }else{
            this.updateProject();
        }
    }

    async updateProject() {
        this._componentService.showLoader('Updating...');
        try{
            let res = await this._projectService.updateProject(this.projectId, this.project);

            this._componentService.hideLoader();
            if(res.success) {
                this._componentService.showSuccessFeedback('', 'Successfully updated!')
                let data = {
                    id: this._componentService.getYoutubeId(this.project.videoLink),
                    link: this.project.videoLink
                }
                this.modal.closeCallback({ success: true, data: data })
            }else{
                this._componentService.showErrorFeedback('Ooops!', 'Update failed')
            }

        }catch(e) {
            this._componentService.hideLoader();
        }
    }
}
