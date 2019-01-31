import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { TextField } from "ui/text-field";
import { Page } from "tns-core-modules/ui/page";

import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { ComponentEventService } from "../../services/component-event.service";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";

// OTHERS
import { openUrl } from "utils/utils";

// MODELS
import { User } from "../../models/user.model";

@Component({
    selector: "signup-page",
    moduleId: module.id,
    templateUrl: "./signup-page.component.html",
    styleUrls: ['./signup-page.component.css'],
})
export class SignUpComponent implements OnInit {

    isMatch = true;
    confirmationPassword: string = '';

    user: User;

    navOptions: any;

    constructor(
        private page: Page,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService, 
        private _routerExtensions: RouterExtensions,
        private _authService: AuthService,
        private _userService: UserService,
        private _componentService: ComponentEventService,
        
    ) { 
        page.actionBarHidden = true; 

        this.user = new User();
        this.user.deserialize({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: ''
        })

        this.navOptions = this._componentService.getRouteOptions();
    }

    ngOnInit() {}

    pass(event){
        this.isMatch = false;
        let confirmpass = <TextField>this.page.getViewById("confirmpass");
        if(this.user.password === confirmpass.text){
            this.isMatch = true;
        }
    }

    goBack() {
        this.navOptions.transition.name = 'slideRight';
        this._routerExtensions.navigate(['/home'], this.navOptions)
    }

    signup() {
        if(!this._componentService.hasInternetConnection()) {
            this._componentService.showAlert('Ooops!', 'Internet connection not available');
            return;
        }else if(!this._componentService.validatePhoneNumber(this.user.phoneNumber)) {
            this._componentService.showAlert('Ooops!', 'Invalid Phone number');
            return;
        }else {
            this._componentService.showLoader('Creating...');
            setTimeout(() => {
                this.register();
            }, 800)
        }
    }

    open(url) {
        openUrl(url);
    }

    async register(){
        try {
            let res = await this._authService.register(this.user);

            this._componentService.hideLoader();
            if(res.success) {
                if(res.data.status === "unverified") {
                    this.navOptions.clearHistory = false;
                    this._userService.saveCurrentUser(res);
                    this._routerExtensions.navigate(['/verification'], this.navOptions);
                }
            }else {
                this._componentService.showAlert('Ooops', res.message)
            }
            
        } catch (e) {
            this._componentService.hideLoader();
            this._componentService.showAlert('Ooops', 'Unable to create account. Please try again later.')
        }
        
    }
}
