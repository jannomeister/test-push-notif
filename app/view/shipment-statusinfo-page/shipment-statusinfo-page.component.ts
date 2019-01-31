import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

// OTHERS
import * as application from "tns-core-modules/application";
import { ShipmentProgressComponent } from "../shipment-progress-modal/shipment-progress-modal.component"

// MODELS
import { Shipment } from "../../models/shipment.model";

// SERVICES
import { UserService } from "../../services/user.service";
import { ShipmentService } from "../../services/shipment.service";
import { ComponentEventService } from "../../services/component-event.service";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";

declare var UITableViewCellSelectionStyle: any;

@Component({
    selector: "shipment-statusinfo-page",
    moduleId: module.id,
    templateUrl: "./shipment-statusinfo-page.component.html",
    styleUrls: ['./shipment-statusinfo-page.component.css'],
})
export class ShipmentStatusInfoComponent implements OnInit {

    projectId: number = 0;

    navOptions: any;

    isLoading: boolean = true;

    shipment: any = {}

    constructor(
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private params: ModalDialogParams,
        private _activatedRoute: ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private _userService: UserService,
        private _shipmentService: ShipmentService,
        private _componentService: ComponentEventService,
    ) {
        this.navOptions = this._componentService.getRouteOptions();
        this.projectId = this.params.context.projectId;
    }

    ngOnInit() {
        setTimeout(() => {
            this.trackShipment();
        }, 800)
    }

    close() {
        this.params.closeCallback({ success: true });
    }

    openProgress() {
        let opt = {
            context: { activity: this.shipment.activity },
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true
        }
        

        this.modal.showModal(ShipmentProgressComponent, opt).then(response => console.log(response))
    }

    async trackShipment() {
        try {
            let res = await this._shipmentService.trackShipment(this.projectId);

            this.isLoading = false;
            if(res.data) {
                this.shipment = res.data;
            }
        }catch(e) {
            this.isLoading = false;
            console.log(e)
        }
    }
}