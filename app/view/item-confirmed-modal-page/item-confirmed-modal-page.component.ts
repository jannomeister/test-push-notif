import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

@Component({
    selector: "item-confirmed-modal-page",
    moduleId: module.id,
    templateUrl: "./item-confirmed-modal-page.component.html",
    styleUrls: ['./item-confirmed-modal-page.component.css'],
})
export class ItemConfirmedComponent implements OnInit {

    constructor(private params: ModalDialogParams) {}

    ngOnInit() {}
    
    onClose() {
        this.params.closeCallback();
    }
}   