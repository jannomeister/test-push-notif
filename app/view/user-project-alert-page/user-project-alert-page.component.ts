import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

// SERVICES
import { UserService } from "../../services/user.service";
import { UserProjectService } from "../../services/user-project.service";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "user-project-alert-page",
    moduleId: module.id,
    templateUrl: "./user-project-alert-page.component.html",
    styleUrls: ['./user-project-alert-page.component.css'],
})
export class UserProjectAlertComponent implements OnInit {

	navOptions: any;

    userId: number = 0;

    constructor(
    	private _routerExtensions: RouterExtensions,

        private _userService: UserService,
        private _userProjectService: UserProjectService,
    	private _componentService: ComponentEventService
    ) {
    	this.navOptions = this._componentService.getRouteOptions();
    }

    ngOnInit() {
        this.userId = this._userService.getCurrentUserId();
    }

    goTo() {
        this._componentService.showLoader('Loading...');

        setTimeout(() => {
            this._componentService.hideLoader();
            this.navOptions.clearHistory = true;
            this.navOptions.transition.name = 'slideLeft';
            this._routerExtensions.navigate(['/dashboard'], this.navOptions) 
        }, 800)
    }

    joinProject() {
        this._componentService.showLoader('Loading...');

        setTimeout(() => {
            this.checkUserCurrentProject('join-project')
        }, 900)
    }

    startProject() {
        this._componentService.showLoader('Checking...');

        setTimeout(() => {
            this.checkUserCurrentProject('start-project');
        }, 900)
    }

    routeToJoinProject() {
        this.navOptions.clearHistory = true;
        this.navOptions.transition.name = 'slideLeft';
        this._routerExtensions.navigate(["/join-project-guide"], this.navOptions) 
    }

    routeToStartProject() {
        this.navOptions.animated = true;
        this.navOptions.clearHistory = false;
        this.navOptions.queryParams = { route: 'start' }
        this._routerExtensions.navigate(["/start-project"], this.navOptions);
    }

    async checkUserCurrentProject(type) {
        try{
            let res = await this._userProjectService.checkUserCurrentProject(this.userId);

            this._componentService.hideLoader();

            if(res.hasProject) {
                this._componentService.showAlert('Ooops!', 'You already have a project.')
            }else {
                if(type === 'start-project') {
                    this.routeToStartProject();
                }else {
                    this.routeToJoinProject();
                }
            }
        }catch(e) {
            this._componentService.hideLoader();
            this._componentService.showAlert('Oops!', 'Something went wrong. Please try again.')
        }
    }
}