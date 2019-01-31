import { Component, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { logout as fbLogout } from "nativescript-facebook";
import { Switch } from "ui/switch";

// OTHERS
import * as utils from "utils/utils";
import * as dialogs from "ui/dialogs";
import * as pushPlugin from "nativescript-push-notifications";
import * as platformModule from "tns-core-modules/platform";

// SERVICES
import { UserService } from "../../services/user.service";
import { DeviceService } from "../../services/device.service";
import { FacebookService } from "../../services/facebook.service";
import { ConfigService } from "../../services/config.service";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "settings-page",
    moduleId: module.id,
    templateUrl: "./settings-page.component.html",
    styleUrls: ['./settings-page.component.css'],
})
export class SettingsComponent implements OnInit {

    userId: number = 0;
    userSettingsData: any = {};
    notificationIsAllowed: boolean = true;

    facebookName: string = '';
    hasFacebookLinkedAccount: boolean = false;

    twitterName: string = '';
    hasTwitterLinkedAccount: boolean = false;

    isInitialized: boolean = false;
    isUserSettingsInitialized: boolean = false;
    isAccountsInitialized: boolean = false;

    navOptions: any;

    constructor(
        private _configService: ConfigService,
        private _routerExtensions: RouterExtensions,
        private _ngZone: NgZone,
        private _userService: UserService,
        private _deviceService: DeviceService,
        private _facebookService: FacebookService,
        private _componentService: ComponentEventService,
    ) {
        this.userId = this._userService.getCurrentUserId();
        this.navOptions = this._componentService.getRouteOptions();
    }

    ngOnInit() {
        this.getUserLinkedAccount();
        this.getUserSettings();
    }

    ngAfterContentInit() {
        setTimeout(() => {
            this.isInitialized = true;
        }, 1000)
    }
    
    checkIsChange(event) {
        let switchChange = <Switch>event.object;

        if(switchChange.checked) {
            this.registerDevice(this.userId);
            this.updateUserSetting(switchChange.checked);
        }else {
            this.unregisterToken();
            this.updateUserSetting(switchChange.checked);
        }
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

    unregisterToken() {
        pushPlugin.unregister(
            (result) => {
                console.log('Device unregistered successfully');
            }, 

            (errorMessage) => {
                console.dir(errorMessage);
            }, 
            
            this._configService.pushSettings()
        );
    }

    connect(type) {

        if(type === 'facebook') {
            
            if(!this.hasFacebookLinkedAccount) {

                this._facebookService.connectWithoutPermission()
                    .then((token) => {
                        this._componentService.showLoader('Connecting...');
                        this._facebookService.getData(token)
                            .then((data: any) => {

                                let linkedAccount = {
                                    userId: this.userId,
                                    socialId: data.id,
                                    socialName: data.name,
                                    socialEmail: data.email,
                                    socialAccessToken: token,
                                    socialAccount: 'facebook'
                                }

                                this.createUserLinkedAccount(linkedAccount)

                            }).catch((err) => {
                                console.log('GET FACEBOOK DATA:')
                                console.log(err)
                                this._componentService.hideLoader();
                            })
                    }).catch((err) => {})

            }
        
        }else if(type === 'twitter') {
            this._componentService.showLoader('Connecting...');

            setTimeout(() => {
                this._componentService.hideLoader();
                this._componentService.showAlert('Alert', 'This is still under development. Unable to process your request.');
            }, 1000)
        }
    }
    
    openUrl() {
        utils.openUrl("http://www.yudabands.org/faqs/");
    }

    gotoProfileInfo(){
        this.navOptions.transition.name = 'slideLeft';
        this._routerExtensions.navigate(['/profile-info'], this.navOptions);
    }

    editProfile(){
        this.navOptions.transition.name = 'slideLeft';
        this._routerExtensions.navigate(['/edit-profile'], this.navOptions);
    }

    changePassword(){
        this.navOptions.transition.name = 'slideTop';
        this._routerExtensions.navigate(['/change-password'], this.navOptions);
    }

    async getUserSettings() {
        let userId = this._userService.getCurrentUserId();

        this.isUserSettingsInitialized = true;
        try {
            let res = await this._userService.getUserSetting(userId);
            
            if(res.data) {
                this.userSettingsData = res.data;
                this.notificationIsAllowed = this.userSettingsData.allowNotification;
            }else{
                let createRes = await this._userService.createUserSetting({ userId: userId })
                
                this.userSettingsData = createRes.data;
                this.notificationIsAllowed = this.userSettingsData.allowNotification;
            }
            

        }catch(e) {
            this.isUserSettingsInitialized = true;
        }
    }

    async updateUserSetting(args) {
        
        if(this.userSettingsData.userSettingId) {

            let data = {
                allowNotification: args
            };
            
            try {
                let res = await this._userService.updateUserSetting(this.userSettingsData.userSettingId, data);
                console.dir(res)
            }catch(e) {}
        }
    }

    async getUserLinkedAccount() {
        try {
            let res = await this._userService.getUserLinkedAccount(this.userId);
            
            this.isAccountsInitialized = true;
            if(res.data.length > 0) {

                for(let i=0; i < res.data.length; i++) {

                    if(res.data[i].socialAccount === 'facebook') {
                        this.facebookName = res.data[i].socialEmail;
                        this.hasFacebookLinkedAccount = true;
                    }

                    if(res.data[i].socialAccount === 'twitter') {
                        this.twitterName = res.data[i].socialEmail;
                        this.hasTwitterLinkedAccount = true;
                    }
                }

            }else {
                this.hasFacebookLinkedAccount = false;
                this.hasTwitterLinkedAccount = false;
            }

        }catch(e) {
            this.isAccountsInitialized = true;
        }
    }

    async createUserLinkedAccount(data) {
        try{
            let res = await this._userService.createUserLinkedAccount(data)

            this._componentService.hideLoader();
            if(res.success) {
                this._componentService.showSuccessFeedback('', 'Successfully connected!')
                this._ngZone.run(() => {
                    this.hasFacebookLinkedAccount = true;
                    this.facebookName = res.data.socialEmail;
                })
            }else{
                this._componentService.showAlert('Ooops!', 'You can\'t connect using this facebook account. Log out and try another one.');
                this._facebookService.logout();
            }
        }catch(e) {
            this._componentService.hideLoader()
        }
    } 
}




