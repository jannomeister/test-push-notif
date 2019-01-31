import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { ShareProjectComponent } from "../../view/shareproject-page/shareproject-page.component";

import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ProjectService } from "../../services/project.service";
import { ComponentEventService } from "../../services/component-event.service";
import { CoachMarkService } from "../../services/coachmark.service";

import * as moment from "moment";
import * as dialogs from "ui/dialogs";

@Component({
    selector: "dashboard-page",
    moduleId: module.id,
    templateUrl: "./dashboard-page.component.html",
    styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardComponent implements OnInit {  
   
    posts: any = [];
    page: number = 1;
    limit: number = 2;
    orderBy: string = 'DESC'; 
    errormsg: string;
    hasData: boolean = false;
    isEmpty: boolean = false;
    isInitialized: boolean = false;

    navOptions: any;

    constructor(
        private modal: ModalDialogService, 
		private vcRef: ViewContainerRef, 
        private _routerExtensions: RouterExtensions,
        private _projectService: ProjectService,
        private _componentService: ComponentEventService,
        private _coachMarkService: CoachMarkService,
    ) {
        this.getAllPosts();

        this.navOptions = this._componentService.getRouteOptions();
    }

    ngOnInit() {}

    loadMoreItems() {
        this.page++;
        this.getAllPosts();
    }

    refreshList(args) {
        
        let pullRefresh = args.object;

        this.page = 1;
        this.posts = []
        this.getAllPosts();

        pullRefresh.refreshing = false;
    }

    shareProject() {
        this.navOptions.clearHistory = false;
        this.navOptions.transition = 'slideTop';
        this._routerExtensions.navigate(["/media"], this.navOptions);
    }

    startProject() {
        this.navOptions.transition = 'slideTop';
        this._routerExtensions.navigate(["/start-project"], this.navOptions);
    }

    seePost(projectId) {
        this._routerExtensions.navigate(['/project', projectId], this.navOptions)
    }

    formatDate(dateStart) {
        let date = new Date(dateStart);

        return moment(date).format('LL');
    }

    getCaption(school, state) {
        school = (state)? this.formatName(school) + "," : school;
        
        return `${school} ${state}`;
    }

    formatName(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    async getAllPosts() {

        try{
            let res = await this._projectService.getAllProject(this.page, this.limit, this.orderBy);
            this.isInitialized = true;
            if(res.data.length > 0) {
                for(let i = 0; i < res.data.length; i++) {
                    res.data[i].userId.name = this.formatName(`${res.data[i].userId.firstName} ${res.data[i].userId.lastName}`);
                    res.data[i].userId.country = (res.data[i].userId.country)? 'in ' + res.data[i].userId.country: "";
                    res.data[i].description = res.data[i].projectDescription;
                    res.data[i].userId.imageUrl = this._componentService.getImageProfile(res.data[i].userId.imageUrl);
                    res.data[i].imageUrl = this._componentService.getImageFeed(res.data[i].studentId.imageUrl);
                    console.log("IMAGE::::")
                    console.log(res.data[i].imageUrl)
                    res.data[i].description = res.data[i].projectDescription;
                    this.posts.push(res.data[i])
                    
                }
            }

            this.isEmpty = (this.posts.length === 0)? true : false;

        }catch(e){
            this.isInitialized = true;
        }
    }
   
}




