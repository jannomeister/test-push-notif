import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

import { ShipmentService } from "../../services/shipment.service";

@Component({
    selector: "shipment-history-page",
    moduleId: module.id,
    templateUrl: "./shipment-history-page.component.html",
    styleUrls: ['./shipment-history-page.component.css'],
})
export class ShipmentHistoryComponent implements OnInit {

    projectId: number = 0;

	
	shipmentHistory: Array<any> = []

    constructor(
        private modal: ModalDialogParams,

        private _shipmentService: ShipmentService
    ) {
        this.projectId = this.modal.context.projectId;
    }

    ngOnInit() {
        this.getProjectShipmentHistory();
    }

    onClose() {
        this.modal.closeCallback(true);
    }

    getDate(dateString) {
        let date = new Date(dateString);
        let dateTime;
        let months = [
            'January','February','March',
            'April','May','June','July',
            'August','September','October',
            'November','December'
        ]

    	dateTime = months[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear();

    	return dateTime;
    }

    async getProjectShipmentHistory() {
        try{
            let res = await this._shipmentService.getProjectShipmentHistory(this.projectId);

            this.shipmentHistory = res.data;
        }catch(e) {
            console.log(e)
        }
    }
}

