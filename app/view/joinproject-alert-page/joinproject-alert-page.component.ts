import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

@Component({
    selector: "joinproject-alert-page",
    moduleId: module.id,
    templateUrl: "./joinproject-alert-page.component.html",
    styleUrls: ['./joinproject-alert-page.component.css'],
})
export class JoinProjectAlertComponent implements OnInit {

    constructor(private params: ModalDialogParams) {}

    ngOnInit() {}

    done() {
    	this.params.closeCallback(true);
    }
   	
   	onClose() {
    	this.params.closeCallback(true);
	}
}