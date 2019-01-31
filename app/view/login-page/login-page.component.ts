import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";

// OTHERS
import { openUrl } from "utils/utils";

// SERVICES
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { DeviceService } from "../../services/device.service";
import { ConfigService } from "../../services/config.service";
import { FacebookService } from "../../services/facebook.service";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./login-page.component.html",
    styleUrls: ['./login-page.component.css'],
})
export class LoginComponent implements OnInit {

    navOptions: any;

    constructor(
        private _page: Page,
        private _routerExtensions: RouterExtensions,
        private _authService: AuthService,
        private _userService: UserService,
        private _deviceService: DeviceService,
        private _facebookService: FacebookService,
        private _configService: ConfigService,
        private _componentService: ComponentEventService,
    ) {
        _page.actionBarHidden = true;

        this.navOptions = this._componentService.getRouteOptions();
    }

    ngOnInit() {}

    login() {
        this._facebookService.connectWithoutPermission()
            .then((token) => {
                this._componentService.showLoader('Signing in...');
                this._facebookService.getData(token)
                    .then((data: any) => {

                        // this._componentService.hideLoader();
                        let user = {
                            firstName: data.first_name,
                            lastName: data.last_name,
                            imageUrl: data.picture.data.url,
                            email: data.email,
                            loginType: 'facebook',
                            facebook: {
                                socialId: data.id,
                                socialName: data.name,
                                socialEmail: data.email,
                                socialAccessToken: token,
                                socialAccount: 'facebook'
                            }
                        };

                        // this._componentService.showAlert('facebook data', JSON.stringify(user));

                        this.authenticate(user)

                    }).catch((err) => {
                        console.log(err)
                        this._componentService.hideLoader();
                        this._routerExtensions.navigate(['/home'])
                    })
            }).catch((err) => { console.log(err) })
    }

    registerDevice(userId) {
        console.log("REGISTER DEVICE!!!!!!")
        this._userService.registerTokenV2()
            .then((token: string) => {
                console.log('*** TOKEN (V2) *** ==> '+token)
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

    open(url) {
        openUrl(url)
    }

    async authenticate(user) {
        try{
            let res = await this._authService.authenticate(user);

            if(res.data) {
                this.getUserData();
            }else {
               this._componentService.hideLoader();
               this._componentService.showErrorFeedback('Ooops!', 'Something went wrong')
               this._routerExtensions.navigate(["/home"]); 
            }
        }catch(e) {
            this._componentService.hideLoader();
            this._componentService.showAlert('Ooops!', e.error.error)
        }
    }

    async getUserData() {
        let userId = this._userService.getCurrentUserId();

        try {
            let res = await this._userService.getUserData(userId);
            
            if(res.data) {
                this.registerDevice(userId);
                this.updateUserDeviceLoginStatus(res.data);
            }else{
                this._componentService.hideLoader();
                this._componentService.showErrorFeedback('Ooops!', 'Something went wrong')
                this._routerExtensions.navigate(["/home"]);
            }

        }catch(e) {
            this._componentService.hideLoader();
            this._componentService.showErrorFeedback('Ooops!', 'Something went wrong')
            this._routerExtensions.navigate(["/home"]);
        }
    }

    async updateUserDeviceLoginStatus(user) {
        try{
            let res = await this._userService.updateUserDeviceLoginStatus(user.userId);

            this._componentService.hideLoader();
            if(res.success) {
                this.navOptions.clearHistory = true;
                this._routerExtensions.navigate(['/user-alert'], this.navOptions);

            }else{
                this._userService.removeCurrentUser();
                this._componentService.showErrorFeedback('Ooops!', 'Something went wrong')
            }

        }catch(e) {
            this._componentService.hideLoader();
            this._userService.removeCurrentUser();
            this._componentService.showErrorFeedback('Ooops!', 'Something went wrong');
        }
    }
}