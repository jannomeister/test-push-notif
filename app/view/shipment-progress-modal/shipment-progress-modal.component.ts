import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

@Component({
    selector: "shipment-progress-modal",
    moduleId: module.id,
    templateUrl: "./shipment-progress-modal.component.html",
    styleUrls: ['./shipment-progress-modal.component.css'],
})
export class ShipmentProgressComponent implements OnInit {

	activity: Array<any> = [];

    constructor(private modal: ModalDialogParams) {}

    ngOnInit() {
    	this.activity = this.modal.context.activity;
    }

    onClose() {
        this.modal.closeCallback(true);
    }
}