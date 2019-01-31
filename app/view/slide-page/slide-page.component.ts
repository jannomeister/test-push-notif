import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";

import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "slide-page",
    moduleId: module.id,
    templateUrl: "./slide-page.component.html",
    styleUrls: ['./slide-page.component.css'],
})
export class SlideComponent implements OnInit {
    
    projectId: number = 0;
    navOptions: any;

    constructor(
        private _page: Page,
        private _activatedRoute: ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private _componentService: ComponentEventService
    ) {
        _page.actionBarHidden = true;

        this.navOptions = this._componentService.getRouteOptions();
        this._activatedRoute.queryParams.subscribe(params => {
            this.projectId = parseInt(params['projectId']);
        })
    }

    ngOnInit() {}

    skip() {
        this.navOptions.clearHistory = true;
        this._routerExtensions.navigate(['/project', this.projectId], this.navOptions);
    }
    
    /*
        TODO: EVENTS NOT BINDING
    */
    myChangeEvent(args) {
        console.log("hello")
        console.dir(args)
    	console.log(args.index)
    }
   
}