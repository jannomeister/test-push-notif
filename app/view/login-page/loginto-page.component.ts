import { Component, OnInit, NgZone, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";

import { UserService } from "../../services/user.service";
import { FacebookService } from "../../services/facebook.service";
import { ComponentEventService } from "../../services/component-event.service";

// OTHERS
import * as lodash from "lodash";
import { openUrl } from "utils/utils";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./loginto-page.component.html",
    styleUrls: ['./login-page.component.css'],
})
export class LoginToComponent implements OnInit {

    userId: number = 0;
    facebookName: string = 'Sign in with Facebook';
    twitterName: string = 'Sign in with twitter';

    hasTwitter: boolean = false;
    hasFacebook: boolean = false;
    hasTwitterLinkedAccount: boolean = false;
    hasFacebookLinkedAccount: boolean = false;

    isInitialized: boolean = false;

    navOptions: any;

    @ViewChild('twitter') twitter: ElementRef;

    constructor(
        private _routerExtensions: RouterExtensions,
        private _ngZone: NgZone,
        private _page: Page,
        private _userService: UserService,
        private _componentService: ComponentEventService,
        private _facebookService: FacebookService,
    ) {
        _page.actionBarHidden = true;
        let currentUser = this._userService.getCurrentUser();

        this.userId = this._userService.getCurrentUserId();
        this.navOptions = this._componentService.getRouteOptions();
        this.hasFacebook = (currentUser.data.loginType === "facebook")? true: false;
        this.getUserLinkedAccount();
        this.hasTwitterLinkedAccount = false;
    }

    ngOnInit() {}

    connectToFacebook() {
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
                        };

                        this.createUserLinkedAccount(linkedAccount);

                    }).catch((err) => {
                        this._componentService.hideLoader();
                        this._componentService.showErrorFeedback('Ooops!', 'Something went wrong. Please try again later');
                    })
            }).catch((err) => {})
    }

    connectToTwitter() {
        this._componentService.showAlert('Alert', 'This is still under development. Sorry for inconvenience.');
        // this._componentService.showErrorFeedback('Oops!', 'This is still under development. Sorry for inconvenience.');
    }

    skip() {
        this.navOptions.clearHistory = true;
        this._routerExtensions.navigate(['/dashboard'], this.navOptions);
    }

    facebookLogout() {
       this._facebookService.logout();
    }

    open(url) {
        openUrl(url);
    }

    async getUserLinkedAccount() {
        try{
            let res = await this._userService.getUserLinkedAccount(this.userId);
            
            this.isInitialized = true;
            if(res.data.length > 0) {
                let facebook = lodash.find(res.data, ['socialAccount', 'facebook']);
                let twitter = lodash.find(res.data, ['socialAccount', 'twitter'])
                
                if(facebook) {
                    this.hasFacebook = true;
                    this.hasFacebookLinkedAccount = true;
                }

                if(twitter) {}
            }
        }catch(e) {
            this.isInitialized = true;
        }
    }

    async createUserLinkedAccount(linkedAccount) {
        try{

            let res = await this._userService.createUserLinkedAccount(linkedAccount);

            this._componentService.hideLoader();
            if(!res.success) {

                this._componentService.showErrorFeedback('Ooops!', `You can't connect using this ${linkedAccount.socialAccount} account. Log out and try another one.`)

                if(linkedAccount.socialAccount === 'facebook') {
                    this.facebookLogout();
                }

            }else {

                this._componentService.showSuccessFeedback('', 'Successfully connected!')

                this._ngZone.run(() => {

                    if(linkedAccount.socialAccount === 'facebook') {

                        this.hasFacebookLinkedAccount = true;
                        this.facebookName = res.data.socialEmail;

                    }else if(linkedAccount.socialAccount === 'twitter') {

                        this.hasTwitterLinkedAccount = true;
                        this.twitterName = res.data.socialEmail;
                    }
                })
                
            }

        }catch(e) {
            this._componentService.hideLoader();
        }
    }

}