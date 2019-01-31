import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ItemConfirmedComponent } from "../../view/item-confirmed-modal-page/item-confirmed-modal-page.component";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

// OTHERS
import * as dialogs from "ui/dialogs";

// MODELS
import { Shipment } from "../../models/shipment.model";

// SERVICES
import { ShipmentService } from "../../services/shipment.service";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "confirm-item-page",
    moduleId: module.id,
    templateUrl: "./confirm-item-page.component.html",
    styleUrls: ['./confirm-item-page.component.css'],
})
export class ConfirmItemComponent implements OnInit {
    
    inputtedBand: number;
    projectId: number = 0;
    shipmentId: number = 0;
    totalBands: number = 0;

    navOptions: any;

    shipment: Shipment;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private params: ModalDialogParams,
        private _routerExtensions: RouterExtensions,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private _shipmentService: ShipmentService,
        private _componentService: ComponentEventService,
    ) {
        this.shipment = new Shipment();

        this.navOptions = this._componentService.getRouteOptions();
        
            this.projectId = this.params.context.projectId;
            this.shipmentId = this.params.context.shipmentId;
            this.totalBands = this.params.context.totalBands;
        
    }

    ngOnInit() {
        this.shipment.deserialize({
            bandsReceived: null
        })
    }
    
    onClose() {
        this.params.closeCallback({ success: false });
    }
   
    confirmItem() {

        this._componentService.showLoader('Loading...')

        setTimeout(() => {
            if(!this.shipment.bandsReceived) {
                this._componentService.hideLoader();
                this._componentService.showAlert('Oops!', 'All fields are required');
                return;
            }else {
                this.confirm();
            }

        }, 800)

    }

    async confirm() {
        try{
            let res = await this._shipmentService.confirm(this.shipmentId, this.shipment);

            this._componentService.hideLoader();

            if(res.success) {
                this.params.closeCallback({ success: res.success, projectId: this.projectId });     
            }else {
                this._componentService.showAlert('Oops!', 'Something went wrong. Please try again.');
            }
        }catch(e) {
            this._componentService.hideLoader();
            this._componentService.showAlert('Oops!', 'Something went wrong. Please try again.');
        }
    }
}