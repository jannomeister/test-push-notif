import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";

import { UserService } from "../../services/user.service";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "change-password-page",
    moduleId: module.id,
    templateUrl: "./change-password-page.component.html",
    styleUrls: ['./change-password-page.component.css'],
})
export class ChangePasswordComponent implements OnInit {
    
    userId: number = 0;
    user: any = {
        password: '',
        newPassword: '',
    }

    constructor(
        private page: Page,
		private _routerExtensions: RouterExtensions,
        private _userService: UserService,
        private _componentService: ComponentEventService,
    ) {
        page.actionBarHidden = true;

        this.userId = this._userService.getCurrentUserId();
    }

    ngOnInit() {

    }

    save() {
        this._componentService.showLoader('Updating...');

        if(!this.user.password || !this.user.newPassword) {
            setTimeout(() => {
                this._componentService.hideLoader();
                this._componentService.showErrorFeedback('Ooops', 'All Fields are required.');
                return;
            }, 1200)
        }else{
            this.changePassword();
        }
    }

    onClose() {
    	this._routerExtensions.backToPreviousPage();
    }

    async changePassword() {

        try{
            let res = await this._userService.changePassword(this.userId, this.user);

            this._componentService.hideLoader();

            if(res.success) {
                this._componentService.showSuccessFeedback('Success', 'Password successfully changed.');
                this.onClose();
            }else{
                this._componentService.showErrorFeedback('Ooops', 'Invalid password');
            }

        }catch(e) {
           this._componentService.hideLoader();
        }
    }
   
}