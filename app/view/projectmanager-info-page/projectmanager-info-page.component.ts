import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

// OTHERS
import * as TNSPhone from "nativescript-phone";

// MODELS
import { User } from "../../models/user.model";

// SERVICES
import { UserService } from "../../services/user.service";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "projectmanager-info-page",
    moduleId: module.id,
    templateUrl: "./projectmanager-info-page.component.html",
    styleUrls: ['./projectmanager-info-page.component.css'],
})
export class ProjectManagerInfoComponent implements OnInit {
    
    userId: number = 0;

    isInitialized: boolean = false;

    user: User;

    constructor(
        private params: ModalDialogParams,
    	private _activatedRoute: ActivatedRoute,
        private _userService: UserService,
        private _componentService: ComponentEventService,
    ) {
        this.user = new User();

        this.userId = this.params.context.userId;     
    }

    ngOnInit() {
        let user = this._componentService.getProjectManager();

        if(user.userId) {
            this.user.deserialize(user)
        }else {
            this.getUserData();
        }
    }

    onClose() {
        this.params.closeCallback(false);
    }

    mailTo() {
        var utilsModule = require("tns-core-modules/utils/utils");
        utilsModule.openUrl("mailto:janno@hyperstacksinc.com.com?Subject=Hello%20again")
    }

    showPhoneOption() {
        this._componentService.showPhoneAlert()
            .then((result) => {
                (result === 'Call')? this.call() : this.text();
            })
    }

    call() { 
        TNSPhone.requestCallPermission('You should accept the permission to be able to make a direct phone call.')
            .then(() => TNSPhone.dial(this.user.phoneNumber, false))
            .catch(() => TNSPhone.dial(this.user.phoneNumber, true))
    }

    text() {
        console.log('text...')
        this._componentService.showAlert('Sorry!', 'This feature is still under development.')
    }

    async getUserData() {

    	try{
    		let res = await this._userService.getUserData(this.userId);
             
            this.isInitialized = true;
            if(res.data) {
                this.user.deserialize(res.data);
                this.user.imageUrl = this._componentService.getProjectManageProfile(this.user.imageUrl);

                this._componentService.saveProjectManager(this.user)
            }
            
    	}catch(e){
            this.isInitialized = true;
    	}
    }
   
}