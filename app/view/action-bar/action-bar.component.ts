import { 
    Component, 
    OnInit, 
    NgZone, 
    Input, 
    HostListener,
    ViewChild,
    ElementRef
} from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { View } from "ui/core/view";
import { SearchBar } from "ui/search-bar";
import { Vibrate } from "nativescript-vibrate";

import { UserService } from "../../services/user.service";
import { SocketService } from "../../services/socket.service";
import { ConfigService } from "../../services/config.service";
import { FacebookService } from "../../services/facebook.service";
import { CoachMarkService } from "../../services/coachmark.service";
import { ComponentEventService } from "../../services/component-event.service";

import * as dialogs from "ui/dialogs";
import * as pushPlugin from "nativescript-push-notifications";
import { LocalNotifications } from "nativescript-local-notifications";

@Component({
    selector: "actionbar",
    moduleId: module.id,
    templateUrl: "./action-bar.component.html",
    styleUrls: ['./action-bar.component.css'],
})
export class ActionBarComponent implements OnInit {

    userId: number = 0;
    
    isBadgeVisible: boolean = false;
    isSearchBarVisible: boolean = true; 
    isBackButtonVisible: boolean = true; 
    isNotifButtonVisible: boolean = true;  

    buttonColor: string = '#000000';

    navOptions: any;

    vibrator = new Vibrate();

    @Input('pageName') pageName: string;

    constructor(
        private page: Page,
        private _ngZone: NgZone,
        private _routerExtensions: RouterExtensions,
        private _userService: UserService,
        private _configService: ConfigService,
        private _socketService: SocketService,
        private _facebookService: FacebookService,
        private _coachMarkService: CoachMarkService,
        private _componentService: ComponentEventService
    ) {
        this.userId = this._userService.getCurrentUserId();
        this.navOptions = this._componentService.getRouteOptions();

        // this.hasNotificationListener();
        this.testNewNotificationListener();

    }

    ngOnInit() {
        this.setBackButton();
        this.setNotifButton();
        this.setItemVisibilityConfig();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            
            let searchBarData = this.getMockSearchBarPosAndSize();
            let notifBtnData  = this.getBellPosAndSize();

            this._coachMarkService.actionBarTour(searchBarData, notifBtnData);
        
        }, 1000)
    }

    getMockSearchBarPosAndSize() {
        let searchBar = <View>this.page.getViewById('mockSearch');

        let size = searchBar.getActualSize();
        let position  = searchBar.getLocationOnScreen();

        return {
            originX: position.x,
            originY: position.y,
            width: size.width,
            height: size.height
        }
    }

    getBellPosAndSize() {
        let bellIcon = <View>this.page.getViewById('notifButton');

        let size = bellIcon.getActualSize();
        let position  = bellIcon.getLocationOnScreen();

        return {
            originX: position.x,
            originY: position.y,
            width: size.width,
            height: size.height
        }
    }

    testNewNotificationListener() {
        // LocalNotifications.hasPermission();

        LocalNotifications.addOnMessageReceivedCallback(notification => {
            console.log("HAHANOTIFHAHAHAX");
            console.log(notification)
            // if(notification.notifData) {
            //     let data = JSON.parse(notification.notifData)

            //     if(data.type === 'project_approval') {
            //         this._componentService.showAlert(data.title, data.message)
            //     }

            //     this._ngZone.run(() => {
            //         this.isBadgeVisible = true;
            //     })
            // }else {
            //     console.log("NOTIFFFFSASDADAD")
            //     console.log(notification)
            //     this._componentService.showAlert(notification.title, notification.body);
            // }
        }).then(() => console.log("Listener added!!!"))
    }

    hasNotificationListener() {
        this._componentService.hasNotif.subscribe(hasNotif => {
            this._ngZone.run(() => {
                this.isBadgeVisible = true;
            })
        })
    }

    setBackButton() {
        let pageName = this.pageName || '';

        if(
            pageName === 'home'     || 
            pageName === 'settings' ||
            pageName === 'profile'  ||
            pageName === 'project'  ||
            pageName === 'resources'
        ) {
            this.isBackButtonVisible = false;
        }else{
            this.isBackButtonVisible = true;
        }
    }

    setNotifButton() {
        let pageName = this.pageName || '';

        this.isNotifButtonVisible = (pageName === 'settings')? false : true;
    }

    setItemVisibilityConfig() {
        let pageName = this.pageName || '';

        if(
            pageName === 'edit-profile' ||
            pageName === 'edit-project' ||
            pageName === 'profile-info' ||
            pageName === 'profile'      ||
            pageName === 'project'      ||
            pageName === 'projectmanager-info' ||
            pageName === 'resources'
        ) {
            this.isSearchBarVisible = false;
        }else {
            this.isSearchBarVisible = true;
        }
    }

    onTap() {
        this.isBadgeVisible = false;
        this.navOptions.queryParams = { activeTab: this.pageName }
        this._routerExtensions.navigate(['/notification'], this.navOptions);
    }

    logout() {
        dialogs.action({
            message: 'Are you sure you want to log out?',
            cancelButtonText: 'Cancel',
            actions: ['Log Out']
        }).then(result => {
            if(result === 'Log Out'){
                this._componentService.showLoader('Logging out...');

                this.unregisterToken();
                this._componentService.removeProjectManager();
                this._componentService.removeAllLocalNotifications();
                this._facebookService.logout();
                this._socketService.getSocketInstance().disconnect();
                this._userService.removeCurrentUser();
                this._userService.removeTourStatus();
                this._userService.removeStartProjectData();
                this.navOptions.transition.name = "slideRight";
                this.navOptions.clearHistory = true;

                this.updateUserDeviceLogoutStatus();
            }
        });
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

    goToSearch() { 
        this._routerExtensions.navigate(['/search'], this.navOptions);
    }

    searchBarLoaded(args) {
        let searchBar = <SearchBar>args.object;

        searchBar.focus();
    }

    onSearch(args) {
        let searchBar = <SearchBar>args.object;

        args.object.dismissSoftInput();

        let searchQuery = searchBar.text.trim();

        this.searchBarTextChanged(searchQuery);

    }

    animate() {
        let view = <View>this.page.getViewById('notifButton');

        var animation1 = view.createAnimation({opacity: 0});
        var animation2 = view.createAnimation({opacity: 1});

        animation1.play()
            .then(()=>animation2.play())
            .then(()=>animation1.play())
            .then(()=>animation2.play())
            .then(() => {})
            .catch((e) => {
                console.log(e.message);
            });
    }

    // listeners
    @HostListener('change')
    searchBarTextChanged(searchQuery) {
        this._componentService.searchBarChanged(searchQuery);
    }

    async updateUserDeviceLogoutStatus() {
    
        try{
            let res = await this._userService.updateUserDeviceLogoutStatus(this.userId);

            this._componentService.hideLoader();
            if(res.success) {
                this._routerExtensions.navigate(['/home'], this.navOptions);
            }
        }catch(e) {
            this._componentService.hideLoader();
        }
    }
    
}