import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";

import { ComponentEventService } from "../../services/component-event.service";
import { AuthService } from "../../services/auth.service"; 

import { User } from "../../models/user.model";

@Component({
    selector: "forget-password-page",
    moduleId: module.id,
    templateUrl: "./forget-password-page.component.html",
    styleUrls: ['./forget-password-page.component.css'],
})
export class ForgetPasswordComponent implements OnInit {

    user: User;

    constructor(
        private page: Page,
		private _routerExtensions: RouterExtensions,
        private _componentService: ComponentEventService,
        private _authService: AuthService
    ) {
        page.actionBarHidden = true;

        this.user = new User();
        this.user.deserialize({ email: '' });
    }

    ngOnInit() {}

    onClose() {
    	this._routerExtensions.back();
    }

    tapForgotPassword() {
        this._componentService.showLoader('Sending...');
        setTimeout(() => {
            if(!this.user.email) {
                this._componentService.hideLoader();
                this._componentService.showAlert('Ooops', 'Email failed is required.');
                return;
            }else if(!this._componentService.validateEmail(this.user.email)) {
                this._componentService.hideLoader();
                this._componentService.showAlert('Ooops', 'Invalid email address.');
                return;
            }

            this.forgotPassword();
        }, 900)
    }

    async forgotPassword() {
        try{

            let res = await this._authService.forgotPassword(this.user.email);

            this._componentService.hideLoader();
            if(res.success) {
                this._componentService.showSuccessFeedback('Success!', 'Please open your email to see your new password.');
                this.onClose();
            }else{
                this._componentService.showErrorFeedback('Ooops', 'Failed to reset password. Please try again.');
            }

        }catch(e) {
            this._componentService.hideLoader();
        }
    }
   
}