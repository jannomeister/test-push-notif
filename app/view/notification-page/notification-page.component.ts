import { Component, OnInit, HostBinding, NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array";

import { UserService } from "../../services/user.service";
import { SocketService } from "../../services/socket.service";
import { NotificationService } from "../../services/notification.service";
import { ProjectMemberService } from "../../services/project-member.service";
import { ComponentEventService } from "../../services/component-event.service";

import * as app from "tns-core-modules/application";
import * as dialogs from "ui/dialogs";

@Component({
    selector: "notification-page",
    moduleId: module.id,
    templateUrl: "./notification-page.component.html",
    styleUrls: ['./notification-page.component.css'],
})
export class NotificationComponent implements OnInit {

    isEmpty: boolean = false;
    isInitialized: boolean = false; 
    userId: number = 0;
    items: Array<SegmentedBarItem> = [];
    selectedIndex: number = 0;
    categories: any = ['Notifications', 'Requests']; 
    visibility1 = true;
    visibility2 = false;
    notifications: any = [];
    requests:  any = [];
    page: number = 1;
    limit: number = 10;
    orderBy: string = 'DESC'; 

    navOptions: any;

    activeTab: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private _userService: UserService,
        private _socketService: SocketService,
        private _componentService: ComponentEventService,
        private _notificationService: NotificationService,
        private _projectMemberService: ProjectMemberService,
    ) {
        this.navOptions = this._componentService.getRouteOptions();
        this._activatedRoute.queryParams.subscribe(params => {
            this.activeTab = (params['activeTab'] === 'home')? params['activeTab'] : ((params['activeTab'] === 'settings')? params['activeTab'] : 'home');
        })

        this.generateSegmentBar();
    }

    ngOnInit() {
        this.userId = this._userService.getCurrentUserId();
        this.checkSocketChanges();
    }

    generateSegmentBar() {
        for(let i=0; i<this.categories.length; i++) {
            let segmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
            segmentedBarItem.title = this.categories[i];
            this.items.push(segmentedBarItem);
        }
    }

    checkSocketChanges() {
        this._socketService.getSocketInstance().on('USER-'+this.userId, (data) => {
            if(data.hasNotif) {
                this.isEmpty = false;
                
                if(data.data.notifType === 'normal') {
                    data.data.fromUserId.imageUrl = this._componentService.getImageProfile(data.data.fromUserId.imageUrl);
                    this.notifications.unshift(data.data);
                }else if(data.data.notifType === 'request') {
                    data.data.imageUrl = this._componentService.getImageProfile(data.data.imageUrl);
                    this.requests.unshift(data.data);
                }
            }
        });
    }

    notifIsClick(notification) {
        console.log("navigate to project page")
        // this._routerExtensions.navigate(['/project', notification.projectId], this.navOptions);
    }

    loadMoreItems(type) {
        this.page += 1;

        if(type === 'all') {
            this.getNotifications();
        }else if(type === 'requests') {
            this.getRequests();
        }
    }

    refreshList(args, type) {

        let pullRefresh = args.object;
        
        this.page = 1

        if(type === 'all') {
            this.notifications = []
            this.getNotifications();
        }else if(type === 'requests') {
            this.requests = []
            this.getRequests();
        }

        pullRefresh.refreshing = false;
    }
    
    onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;
        this.selectedIndex = segmetedBar.selectedIndex;

        switch (this.selectedIndex) {
            case 0:
                this.page = 1
                this.notifications = [];
                this.getNotifications();
                this.visibility1 = true;
                this.visibility2 = false;
                this.isInitialized = false;
                this.isEmpty = false;
                break;
            case 1:
                this.page = 1
                this.requests = [];
                this.getRequests();
                this.visibility1 = false;
                this.visibility2 = true;
                this.isInitialized = false;
                this.isEmpty = false;
                break;
            
            default:
                break;
        }
    }

    viewRequestInfo(data) {
        data.activeTab = this.activeTab;
        this.navOptions.queryParams = data;
        this._routerExtensions.navigate(["/request"], this.navOptions);
    }

    confirmation(projectMemberId, type) {

        let data = {
            userId: this.userId,
            requestStatus: type
        }

        this.approveRequest(projectMemberId, data);
    }

    async getNotifications() {
        try {
            let res = await this._notificationService.getNotifications(this.userId, this.page, this.limit, this.orderBy)
            
            this.isInitialized = true;
            
            if(res.data.length > 0) {
                for(let i = 0; i < res.data.length; i++) {
                    res.data[i].fromUserId.imageUrl = this._componentService.getProjectManageProfile(res.data[i].fromUserId.imageUrl);
                    res.data[i].fromUserId.fullName =  res.data[i].fromUserId.firstName + ' ' + res.data[i].fromUserId.lastName
                    this.notifications.push(res.data[i])
                }
            }

            this.isEmpty = (this.notifications.length === 0)? true : false;

        }catch(e) {
            this.isInitialized = true;
        }
    }

    async getRequests() {
        try {
            let res = await this._notificationService.getRequests(this.userId, this.page, this.limit, this.orderBy)
   
            this.isInitialized = true;

            if(res.data.length > 0) {
                for(let i = 0; i < res.data.length; i++) {
                    console.log(res.data[i])
                    res.data[i].imageUrl = this._componentService.getImageProfile(res.data[i].imageUrl);
                    this.requests.push(res.data[i])
                }
            }
            this.isEmpty = (this.requests.length === 0)? true : false;
        }catch(e) {
            this.isInitialized = true;
        }
    }

    async approveRequest(projectMemberId, data) {
        this._componentService.showLoader('Loading...')

        try {
            let res = await this._projectMemberService.approveRequest(projectMemberId, data);

            this._componentService.hideLoader();
            if(res.success) {
                this.requests = [];
                this.getRequests();
                this._componentService.showSuccessFeedback('', 'Successfully confirmed!');
            }else{
                this._componentService.showErrorFeedback('Ooops!', 'Something went wrong!');
            }
        }catch(e) {
            this._componentService.hideLoader();
        }
    }
   
}