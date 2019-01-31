import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

// SERVICES
import { ProjectService } from "../../services/project.service";
import { ComponentEventService } from "../../services/component-event.service";

// MODELS
import { Project } from "../../models/project.model";

@Component({
    selector: "order-bands-modal",
    moduleId: module.id,
    templateUrl: "./order-bands-modal.component.html",
    styleUrls: ['./order-bands-modal.component.css'],
})
export class OrderBandsComponent implements OnInit {

	projectId: number = 0;
    selectedBand: number = 0;
    dateStart: string;
	numberOfBands: Array<number> = [200, 300, 400];

	project: Project; 

	navOptions: any;

    constructor(
    	private params: ModalDialogParams,

        private _projectService: ProjectService,
    	private _componentService: ComponentEventService,
    ) {
    	this.project = new Project();

        this.project.deserialize({ totalBands: this.numberOfBands[0] })

        this.navOptions = this._componentService.getRouteOptions();
        this.projectId = this.params.context.projectId;
        this.dateStart = this.params.context.dateStart;
    }

    ngOnInit() {}

    onClose() {
        this.params.closeCallback({ success: false });
    }

    onBandsClose() {
        this.project.totalBands = this.numberOfBands[this.selectedBand];
    }

    confirm() {
        this._componentService
            .showBandsConfirmationAlert(this.project.totalBands, this.dateStart)
            .then((res) => {
                this._componentService.showLoader('')
                this.updateProjectApproved(this.project)
            });
    }

    async updateProjectApproved(data) {
        try{
            let res = await this._projectService.updateProjectApproved(this.projectId, data);

            this._componentService.hideLoader();
            this.params.closeCallback({ success: true, projectId: this.projectId });
        }catch(e) {
            this._componentService.hideLoader();
            this._componentService.showAlert('Oops!', 'Unable to order bands. Please try again later')
        }
    }
}