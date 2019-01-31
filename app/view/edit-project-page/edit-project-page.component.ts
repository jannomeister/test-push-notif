import { Component, OnInit, ElementRef, ViewChild, NgZone, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TextField } from "ui/text-field";
import { RouterExtensions } from "nativescript-angular/router";
import { UpdateProjectVideoComponent } from "../../view/update-project-video/update-project-video.component";

// MODELS
import { User } from "../../models/user.model";
import { Student } from "../../models/student.model";
import { Project } from "../../models/project.model";

// SERVICES
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ProjectService } from "../../services/project.service";
import { ProjectMemberService } from "../../services/project-member.service";
import { UserService } from "../../services/user.service";
import { ConfigService } from "../../services/config.service";
import { ComponentEventService } from "../../services/component-event.service";

import * as dialogs from "ui/dialogs";

@Component({
    selector: "edit-project-page",
    moduleId: module.id,
    templateUrl: "./edit-project-page.component.html",
    styleUrls: ['./edit-project-page.component.css'],
})

export class EditProjectPageComponent implements OnInit {
    
    volunteer: string;
    studentCoverImage: string;
    volunteerList: any = [];
 
    isMember: boolean = false;
    isPending: boolean = false;
    isInitialized: boolean = false;
    isUserProject: boolean = false;
    isStudentPending: boolean = false;
    isUserImageEdited: boolean = false;
    isProjectImageEdited: boolean = false;

    userId: number = 0;
    projectId: number = 0;
    originalProjectImage: string;
    originalUserImage: string;

    project: Project;
    user: User;
    student: Student;

    navOptions: any;

    @ViewChild("volunteerTextField") volunteerTextField: ElementRef;

    constructor(
        private _ngZone: NgZone,
        private vcRef: ViewContainerRef,
        private _activatedRoute: ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private modal: ModalDialogService,
        private _userService: UserService,
        private _projectMemberService: ProjectMemberService,
        private _projectService: ProjectService,
        private _configService: ConfigService,
        private _componentService: ComponentEventService,
        
    ) {
        this.user = new User();
        this.student = new Student();
        this.project = new Project();
        this.navOptions = this._componentService.getRouteOptions();

        this._activatedRoute.queryParams.subscribe(params => {
            this.projectId = parseInt(params['projectId'])
        })
    }

    ngOnInit() {
        this.userId = this._userService.getCurrentUserId();

        this.getProject();
        this.checkIfMember();
    }

    changeImage(type) {
        this._componentService.changeImage(250, 600)
            .then((result) => {
                this.isProjectImageEdited = true;
                this.project.imageUrl = result; 
            })
            .catch((err) => {
                console.log("CAMERA/GALLERY: "+err)
            });
    }

    update() {
        this.updateProject();
    }

    save() {
        this.uploadImage(this.project.projectId);
    }

    revert() {
        this.project.imageUrl = this._componentService.getImageCover(this.originalProjectImage);
        this.isProjectImageEdited = false;
    }

    uploadImage(id) {
        this._componentService.showLoader('Uploading...');

        this._componentService.uploadImage(id, 'project', this.project.imageUrl)
            .then((result: any) => {
                this._componentService.hideLoader();

                if(result.success) {
                    this._ngZone.run(() => { 
                        this.originalProjectImage = result.data;
                        this.project.imageUrl = this._componentService.getImageCover(result.data);
                        this.isProjectImageEdited = false;
                        this._componentService.showSuccessFeedback('', 'Successfully updated!')
                    })
                }else{
                    this._componentService.showErrorFeedback('Ooops!', result.message);
                }
            })
            .catch((err) => {
                console.log("UPLOAD ERROR: " + err)
                this._componentService.hideLoader();
                this._componentService.showErrorFeedback('Ooops!', 'Update failed');
            })
    }

    updateVideo() {
        let opt = {
            context: {
                projectId: this.projectId,
                videoLink: this.project.videoLink
            },
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true
        }

        this.modal.showModal(UpdateProjectVideoComponent, opt)
            .then(res => {
                if(res.success) {
                    this.project.videoLink = res.data.link;
                    // this._ngZone.run(() => {
                    //     this.project.videoLink = res.data.link;
                    //     this.navOptions.transition.name = 'slideRight';
                    //     this.navOptions.clearHistory = true;
                    //     this.navOptions.queryParams = { projectId: this.projectId };
                    //     this._routerExtensions.navigate(["/project"], this.navOptions);
                    // })
                }
                console.log(res)
            })

    }

    async getProject() {

        try {
            let res = await this._projectService.getProject(this.projectId);

            this.isInitialized = true;
            if(res.data) {

                this.project.deserialize(res.data);
                this.user.deserialize(res.data.userId);
                this.student.deserialize(res.data.studentId);

                this.isUserProject = (this.user.userId === this.userId)? true : false;

                this.originalProjectImage = this.project.imageUrl;
                this.project.imageUrl  = this._componentService.getImageCover(this.project.imageUrl);
                this.project.manager.imageUrl = this._componentService.getImageProfile(this.project.manager.imageUrl);

                if(this.user.imageUrl) {
                    this.originalUserImage = this.user.imageUrl;
                    this.user.imageUrl = this._componentService.getImageProfile(this.user.imageUrl);
                }

                if(this.student.imageUrl) {
                    this.studentCoverImage = this._componentService.getImageCover(this.student.imageUrl);
                    this.student.imageUrl = this._componentService.getImageProfile(this.student.imageUrl);
                }

            }
        }catch(e) {
            this.isInitialized = true;
        }
    }

    async checkIfMember() {
        try{
            let res = await this._projectMemberService.checkIfMember(this.projectId, this.userId);
            
            this.isMember = res.isMember;

            if(res.isMember) {
                this.isPending = (res.data.requestStatus === 'pending')? true : false;
            }

        }catch(e) {}
    }

    async updateProject() {
        this._componentService.showLoader('Updating...');
        try{
            let res = await this._projectService.updateProject(this.projectId, this.project);

            this._componentService.hideLoader();
            if(res.success) {
                this._componentService.showSuccessFeedback('', 'Successfully updated!')
                this.navOptions.clearHistory = true;
                this.navOptions.transition.name = 'slideRight';
                this.navOptions.queryParams = { projectId: this.projectId };
                this._routerExtensions.navigate(["/project"], this.navOptions);
            }else{
                this._componentService.showErrorFeedback('Ooops!', 'Update failed')
            }

        }catch(e) {
            this._componentService.hideLoader();
        }
    }
}
