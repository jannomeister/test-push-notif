import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

// OTHERS
import * as application from "tns-core-modules/application";

// MODELS
import { User } from "../../models/user.model";

// SERVICES
import { UserService } from "../../services/user.service";
import { ProjectService } from "../../services/project.service";
import { ComponentEventService } from "../../services/component-event.service";

declare var UITableViewCellSelectionStyle: any;

@Component({
    selector: "profile-page",
    moduleId: module.id,
    templateUrl: "./profile-page.component.html",
    styleUrls: ['./profile-page.component.css'],
})
export class ProfileComponent implements OnInit {

    user: User;
    userId: number = 0;

    projects: any = [];

    page: number = 1;
    limit: number = 10;
    orderBy: string = 'DESC'; 

    isProjectEmpty: boolean = false;
    isProjectLoading: boolean = true;
    isProjectInitialized: boolean = false;
    isInitialized: boolean = false;

    navOptions: any;


    constructor(
        private _routerExtensions: RouterExtensions,
        private _userService: UserService,
        private _projectService: ProjectService,
        private _componentService: ComponentEventService,
    ) {
        this.user = new User();
        this.navOptions = this._componentService.getRouteOptions();
    }

    ngOnInit() {
        this.userId = this._userService.getCurrentUserId();
        this.getUserData();
        this.getUserAllProject();
    }

    onItemLoading(args) {
        if(application.ios) {
            const iosCell = args.ios;
            iosCell.selectionStyle = UITableViewCellSelectionStyle.None;
        }
    }

    onTap() {}

    viewProject(project) {
        if(project.status === 'pending') {
            this._componentService.showAlert('Alert', 'You can\'t view pending projects.');
            return;
        }else if(!project.studentId && project.status === 'approved') {
            this._componentService.showAlert('No student found', 'You must complete the last step by clicking project tab and add a student.');
            return;
        }

        this._routerExtensions.navigate(['/project', project.projectId], this.navOptions)
    }

    templateSelector(item: any, index: number, items: any) {
        return item.type;
    }

    seePost(project) {
        if(project.status === 'pending') {
            this._componentService.showAlert('Alert', 'Project still pending. Please wait for the project manager to approve it.');
        }else{
            this._routerExtensions.navigate(['/project', project.projectId], this.navOptions)
        }
    }

    gotoSettings() {
        this._routerExtensions.navigate(['/settings'], this.navOptions);
    }

    gotoEditProfile() {
        this.navOptions.transition.name = 'slideLeft';
        this._routerExtensions.navigate(['/edit-profile'], this.navOptions);
    }

    async getUserData() {
        try{
            let res = await this._userService.getUserData(this.userId);
            console.log(res.data)
            this.isInitialized = true;
            if(res.data) {
                this.user.deserialize(res.data);
                this.user.imageUrl = this._componentService.getImageProfileV2(this.user.imageUrl);
                
                this.projects.unshift({ type: 'header' });
            }
                
        }catch(e) {
            this.isInitialized = true;
        }
    }

    async getUserAllProject() {
        try{
            let res = await this._projectService.getUserAllProject(this.userId, this.page, this.limit, this.orderBy);
            
            this.isProjectEmpty = (!res.data.length)? true : false;
            this.isProjectInitialized = true; 
            this.isProjectLoading = false;

            for(let i = 0; i < res.data.length; i++) {

                if(res.data[0].studentId !== 0) {
                    res.data[i].imageUrl = this._componentService.getImageCover(res.data[i].studentId.imageUrl);
                }else {
                    res.data[i].imageUrl = '';
                }
                
                res.data[i].type = 'projects'
                this.projects.push(res.data[i]);
            }
            
        }catch(e) {
            this.isProjectLoading = false;
            this.isProjectInitialized = true;
        }
    }
   
}




