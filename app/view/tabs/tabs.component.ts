import { Component, OnInit, ViewContainerRef, Input, NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { View } from "ui/core/view";
import { Page } from "tns-core-modules/ui/page";

import { FeedbackComponent } from "../../view/feedback-page/feedback-page.component";

import { UserService } from "../../services/user.service";
import { SocketService } from "../../services/socket.service";
import { ProjectService } from "../../services/project.service";
import { CoachMarkService } from "../../services/coachmark.service";
import { UserProjectService } from "../../services/user-project.service";
import { ProjectMemberService } from "../../services/project-member.service";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "tabs",
    moduleId: module.id,
    templateUrl: "./tabs.component.html",
    styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {

    projectId: number = 0;
    isClicked: boolean = false;
    userHasProject: boolean = false;
    isProjectDone: boolean = false;

    navOptions: any;

    tabs: any = {
        home: {
            color: '#000000',
            image: '~/assets/resized/home.png'
        },
        resources: {
            color: '#000000',
            image: '~/assets/resized/resources.png'
        },
        project: {
            color: '#000000',
            image: '~/assets/resized/project.png'
        },
        profile: {
            color: '#000000',
            image: '~/assets/resized/profile.png'
        },
        settings: {
            color: '#000000',
            image: '~/assets/resized/settings.png'
        }
    }

    @Input('activeTab') activeTab: string;

    constructor(
        private page: Page,
        private _ngZone: NgZone,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private _routerExtensions: RouterExtensions,

        private _userService: UserService,
        private _socketService: SocketService,
        private _projectService: ProjectService,
        private _coachMarkService: CoachMarkService,
        private _userProjectService: UserProjectService,
        private _componentService: ComponentEventService,
        private _projectMemberService: ProjectMemberService,
    ) {
        this.navOptions = this._componentService.getRouteOptions();
        // this.navOptions.clearHistory = true;
        // this.navOptions.transition.name = "slideTop";

        this.isProjectDoneListener();
        this.isUserRemovedListener();
    }

    ngOnInit() {
        let userId = this._userService.getCurrentUserId();

        this.setActiveTab();
        this.checkUserCurrentProject(userId, 'init');
    }

    ngAfterViewInit() {
        setTimeout(() => {
            let homeTab = this.getHomeTabPosAndSize();
            let resourcesTab = this.getResourcesTabPosAndSize();
            let projectTab = this.getProjectTabPosAndSize();
            let profileTab = this.getProfileTabPosAndSize();
            let settingsTab = this.getSettingsTabPosAndSize();

            this._coachMarkService.setTab(homeTab, resourcesTab, projectTab, profileTab, settingsTab);
        }, 1500)
    }

    isProjectDoneListener() {
        this._componentService.isProjectDone.subscribe(isProjectDone => {

            this._componentService.showAlert('Congratulations!', 'Your project is officially over! We hope it was a success. Open your project to report your numbers.')

            this._ngZone.run(() => {
                this.isProjectDone = isProjectDone;
            })
        })
    }

    isUserRemovedListener() {
        this._componentService.isUserRemoved.subscribe(isUserRemoved => {
            this._userService.removeCurrentUser();
            this._componentService.unregisterToken();

            this._componentService
                .showUserRemovalAlert()
                .then((data) => {
                    this._componentService.showLoader('');

                    setTimeout(() => {
                        this._componentService.hideLoader();
                        this.navOptions.clearHistory = true;
                        this.navOptions.transition.name = 'slideRight';
                        this._routerExtensions.navigate(['/home'], this.navOptions)
                    }, 800)
                })
        })
    }

    getHomeTabPosAndSize() {
        let home = <View>this.page.getViewById('homeTab');

        let size = home.getActualSize();
        let position = home.getLocationOnScreen();

        return {
            originX: position.x,
            originY: position.y,
            width: size.width,
            height: size.height
        }
    }

    getResourcesTabPosAndSize() {
        let resources = <View>this.page.getViewById('resourcesTab');

        let size = resources.getActualSize();
        let position = resources.getLocationOnScreen();

        return {
            originX: position.x,
            originY: position.y,
            width: size.width,
            height: size.height
        }
    }

    getProjectTabPosAndSize() {
        let project = <View>this.page.getViewById('projectTab'); 

        let size = project.getActualSize();
        let position = project.getLocationOnScreen();

        return {
            originX: position.x,
            originY: position.y,
            width: size.width,
            height: size.height
        }
    }

    getProfileTabPosAndSize() {
        let profile = <View>this.page.getViewById('profileTab'); 

        let size = profile.getActualSize();
        let position = profile.getLocationOnScreen();

        return {
            originX: position.x,
            originY: position.y,
            width: size.width,
            height: size.height
        }
    }

    getSettingsTabPosAndSize() {
        let settings = <View>this.page.getViewById('settingsTab'); 

        let size = settings.getActualSize();
        let position = settings.getLocationOnScreen();

        return {
            originX: position.x,
            originY: position.y,
            width: size.width,
            height: size.height
        }
    }

    setActiveTab() {
        this._ngZone.run(() => {
            this.tabs[this.activeTab].color = '#00a9ed';
            this.tabs[this.activeTab].image = `~/assets/resized/${this.activeTab}-active.png`;
        });
    }
    
    checkProject() {

        let userId = this._userService.getCurrentUserId();

        this._componentService.showLoader('Checking...');

        this.checkUserCurrentProject(userId, 'click');
    }

    routeToStartProject() {
        this.navOptions.animated = true;
        this.navOptions.clearHistory = false;
        this.navOptions.queryParams = { route: 'tabs' }
        this._routerExtensions.navigate(["/start-project"], this.navOptions);
    }

    goTo(routeName) {
        // this.isProjectDone = false;
        this.navOptions.animated = false;
        // this.navOptions.clearHistory = true;
        this._routerExtensions.navigate([routeName], this.navOptions)
    }

    openFeedbackModal(projectId) {
        let opt = {
            context: { projectId: projectId },
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true,
            transition: {
                name: "slideTop",
                duration: 200,
                curve: "ease"
            }
        }
        
        this.modal.showModal(FeedbackComponent, opt).then(response => {
            if(response) {
                this.userHasProject = false;
            }
        })
    }

    openProjectPage(projectId) {
        this.navOptions.animated = false;
        this._routerExtensions.navigate(['/project', projectId], this.navOptions);
    }

    processProject(data) {
        if(data.hasProject) {
            if(data.isLeader && !data.isMember) {
                if(data.leaderConfig.isProjectPending) {
                    this._componentService.showAlert('Oops!', data.leaderConfig.message)
                }else {
                    this.openProjectPage(data.project.projectId);
                }

            }else if(data.isMember && !data.isLeader) {
                if(!data.memberConfig.isApproved) {
                    this._componentService.showAlert('Oops!', data.memberConfig.message)
                }else {
                    this.openProjectPage(data.project.projectId);
                }
            }else {
                this._componentService.showAlert('Oops!', 'Something went wrong. Please try again.')
            }

        }else {
            this._componentService.showAlertStartProject()
            .then(res => this.routeToStartProject())
            .catch(e => console.log(e))
        }
    }

    async checkUserCurrentProject(userId, action) {
        try{
            let res = await this._userProjectService.checkUserCurrentProject(userId);

            this._componentService.hideLoader();

            this.userHasProject = res.hasProject;

            if(action === 'click') this.processProject(res)

        }catch(e) {
            this._componentService.hideLoader();
            this._componentService.showAlert('Oops!', 'Something went wrong. Please try again.')
        }
    }
}
