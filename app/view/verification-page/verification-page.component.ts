
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { TextField } from "ui/text-field";

import { VerificationService } from "../../services/verification.service";
import { UserService } from "../../services/user.service";
import { ConfigService } from "../../services/config.service";
import { DeviceService } from "../../services/device.service";
import { ComponentEventService } from "../../services/component-event.service";
import { SocketService } from "../../services/socket.service";

import * as dialogs from "ui/dialogs";
import * as platformModule from "tns-core-modules/platform";
import * as pushPlugin from "nativescript-push-notifications";

@Component({
    selector: "verification-page",
    moduleId: module.id,
    templateUrl: "./verification-page.component.html",
    styleUrls: ['./verification-page.component.css'],
})
export class VerificationComponent implements OnInit {

    tf1: any;
    tf2: any;
    tf3: any;
    tf4: any;

    userId: number = 0;

    navOptions: any;

    constructor(
        private page: Page,
        private _routerExtensions: RouterExtensions,
        private _userService: UserService,
        private _deviceService: DeviceService,
        private _configService: ConfigService,
        private _socketService: SocketService,
        private _componentService: ComponentEventService,
        private _verificationService: VerificationService
    ) {
        page.actionBarHidden = true;
        this.navOptions = this._componentService.getRouteOptions();
    }

    ngOnInit() {
        this.userId = this._userService.getCurrentUserId();
    }

    goBack() {
        console.log("go back")
        this._routerExtensions.back();
    }

    onEnterCode(event, no) {

        // textfields
        let textField1 = <TextField>this.page.getViewById("tf-1");
        let textField2 = <TextField>this.page.getViewById("tf-2");
        let textField3 = <TextField>this.page.getViewById("tf-3");
        let textField4 = <TextField>this.page.getViewById("tf-4");

        if(no === 1) {
            this.tf1 = textField1.text;
            if(textField1.text) {
                setTimeout(() => {
                    textField2.focus();
                }, 150)
            }
        }
        if(no === 2) {
            this.tf2 = textField2.text;
            if(textField2.text) {
                setTimeout(() => {
                    textField3.focus();
                }, 150)
            }
        }
        if(no === 3) {
            this.tf3 = textField3.text;
            if(textField3.text) {
                setTimeout(() => {
                    textField4.focus();
                }, 150)
            }
        }else {
            this.tf4 = textField4.text;
        }

        if(textField1.text && textField2.text && textField3.text && textField4.text) {
            setTimeout(() => {
                textField1.dismissSoftInput();
                textField2.dismissSoftInput();
                textField3.dismissSoftInput();
                textField4.dismissSoftInput();
            }, 200)
        }
    }

    resendCode() {
        this._componentService.showLoader('Sending...');

        this.resend({ userId: this.userId });
    }

    registerDevice(userId) {
        this._userService.registerTokenV2()
            .then((token: string) => {
                console.log('*** TOKEN *** ==> '+token)
                this._deviceService.registerDevice(token)
                    .then((device: any) => {
                        console.log('*** DEVICE DATA *** ==>')
                        console.log(device)
                        this._userService.registerUserDevice(userId, device.data.deviceId)
                            .then((userDevice: any) => {
                                console.log('*** USER DEVICE DATA *** ==>')
                                console.log(userDevice)
                            }).catch(err => console.log('REGISTER USER DEVICE: ',err))
                    }).catch(err => console.log('REGISTER DEVICE ERROR: ',err))
            }).catch(err => console.log('REGISER TOKEN ERROR: ',err))
    }

    clearFields() {
        this.tf1 = '';
        this.tf2 = '';
        this.tf3 = '';
        this.tf4 = '';
    }

    verifyCode() {
        this._componentService.showLoader('Verifying...');

        let code = `${this.tf1}${this.tf2}${this.tf3}${this.tf4}`;

        setTimeout(() => {
            if(code.length === 4) {
                this.verify(code);
            }else {
                this._componentService.hideLoader();
                this._componentService.showAlert('Verification failed', 'Invalid Code. Please try again.')
            }
        }, 300);
    }

    async verify(cleanedCode) {
        try {
            let res = await this._verificationService.verify(this.userId, cleanedCode);

            if(res.success){

                let currentUser = this._userService.getCurrentUser();

                currentUser.data.status = res.data.status;
                this._socketService.connect();
                this._userService.saveCurrentUser(currentUser);

                this.getUserData();
            }else {
                this._componentService.hideLoader();
                this.clearFields();
                this._componentService.showAlert('Ooops!', res.data)
            }
        
        }catch(e) {
            this._componentService.hideLoader();
            this._componentService.showErrorFeedback('Ooops!', 'Something went wrong')
        }
    }

    async getUserData() {
        let userId = this._userService.getCurrentUserId();
        try {
            let res = await this._userService.getUserData(userId);
            if(res.data) {
                this.registerDevice(res.data.userId);
                this.updateUserDeviceLoginStatus(res.data);
            }
            
        }catch(e) {
            this._componentService.hideLoader();
            this._componentService.showErrorFeedback('Ooops!', 'Something went wrong')
        }
    }

    async updateUserDeviceLoginStatus(user) {
        try{
            let res = await this._userService.updateUserDeviceLoginStatus(user.userId);

            this._componentService.hideLoader();
            if(res.success) {
                this.navOptions.clearHistory = true;
                this._routerExtensions.navigate(['/user-alert'], this.navOptions);
            }else {
                this._userService.removeCurrentUser();
                this._componentService.showErrorFeedback('Ooops!', 'Something went wrong')
            }

        }catch(e) {
            this._componentService.hideLoader();
            this._userService.removeCurrentUser();
            this._componentService.showErrorFeedback('Ooops!', 'Something went wrong')
        }
    } 

    async resend(data) {
        try{

            let res = await this._verificationService.resend(data);
            
            this._componentService.hideLoader();
            if(res.success) {
                this._componentService.showAlert('Success!', res.data);
            }else {
                this._componentService.showAlert('Ooops!', 'Unable to send a new code. Please try again.');
            }

        }catch(e) {
            this._componentService.hideLoader();
            this._componentService.showAlert('Ooops!', 'Unable to send a new code. Please try again.');
        }
    }
}
