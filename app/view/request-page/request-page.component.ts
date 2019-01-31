import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

import { UserService } from "../../services/user.service";
import { ProjectMemberService } from "../../services/project-member.service";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "request-page",
    moduleId: module.id,
    templateUrl: "./request-page.component.html",
    styleUrls: ['./request-page.component.css'],
})
export class RequestComponent implements OnInit {

    userId: number = 0;
    projectMemberId: number = 0;

    activeTab: string;

    data: any = {
        name: '',
        imageUrl: '',
        reason: '',
        datetimeCreated: ''
    };

    navOptions: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private _userService: UserService,
        private _projectMemberService: ProjectMemberService,
        private _componentService: ComponentEventService,
    ) {   
        this.userId = this._userService.getCurrentUserId();
        this.navOptions = this._componentService.getRouteOptions();

        this._activatedRoute.queryParams.subscribe(params => {
            
            this.projectMemberId = params['projectMemberId']
            this.data.name = params['name'];
            this.data.imageUrl = params['imageUrl'];
            this.data.reason = params['reason'];
            this.data.datetimeCreated = params['datetimeCreated'];

            this.activeTab = params['activeTab'];
        })
    }

    ngOnInit() {}

    confirmation(type) {

        let data = {
            userId: this.userId,
            requestStatus: type
        }

        this.approveRequest(this.projectMemberId, data)
    }


    async approveRequest(projectMemberId, data) {
        this._componentService.showLoader('Loading...');

        try {
            let res = await this._projectMemberService.approveRequest(projectMemberId, data);

            this._componentService.hideLoader();
            if(res.success) { 
                this.navOptions.clearHistory = true;
                this._routerExtensions.navigate(["/notification"], this.navOptions);
                this._componentService.showSuccessFeedback('', 'Successfully confirmed!');
            }else{
                this._componentService.showErrorFeedback('Ooops!', 'Something went wrong!');
            }
        }catch(e) {
            this._componentService.hideLoader();
        }
    }
   
}