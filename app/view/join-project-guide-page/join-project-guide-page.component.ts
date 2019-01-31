import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";

// SERVICES
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "join-project-guide-page",
    moduleId: module.id,
    templateUrl: "./join-project-guide-page.component.html",
    styleUrls: ['./join-project-guide-page.component.css'],
})
export class JoinProjectGuideComponent implements OnInit {
    
    navOptions: any;

    constructor(
    		private _page: Page,
    		private _routerExtensions: RouterExtensions,
    		private _componentService: ComponentEventService
   ) {
    	this.navOptions = this._componentService.getRouteOptions();
    	this._page.actionBarHidden = true;
    }

    ngOnInit() { }

    goto(route) {
    	this._componentService.showLoader('Loading...');

    	setTimeout(() => {
    		this._componentService.hideLoader();
            this.navOptions.clearHistory = true;
	    	this.navOptions.transition.name = 'slideLeft';
	    	this._routerExtensions.navigate([route], this.navOptions) 
    	}, 800)
    }

   
}
