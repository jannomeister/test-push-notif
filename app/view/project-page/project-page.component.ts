import { Component, OnInit, ViewContainerRef, NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JoinProjectComponent } from "../../view/joinproject-page/joinproject-page.component";
import { BragComponent } from "../../view/brag-page/brag-page.component"
import { JoinProjectAlertComponent } from "../../view/joinproject-alert-page/joinproject-alert-page.component";
import { ShareProjectComponent } from "../../view/shareproject-page/shareproject-page.component";
import { SkypeSchedComponent } from "../../view/skype-sched-page/skype-sched-page.component";
import { RouterExtensions } from "nativescript-angular/router";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { Page } from "tns-core-modules/ui/page";

// OTHERS
import { openUrl } from "utils/utils";
import { FeedbackComponent } from "../../view/feedback-page/feedback-page.component";
import { SelectStudentComponent } from "../../view/select-student-modal/select-student-modal.component";
import { ProjectManagerInfoComponent } from "../../view/projectmanager-info-page/projectmanager-info-page.component";
import { ShipmentStatusInfoComponent } from "../../view/shipment-statusinfo-page/shipment-statusinfo-page.component";
import { ShipmentHistoryComponent } from "../../view/shipment-history-page/shipment-history-page.component";
import { VolunteersListComponent } from "../../view/volunteers-list-modal/volunteers-list-modal.component";
import { SelectListComponent } from "../../view/selectlist-page/selectlist-page.component";
import { OrderBandsComponent } from "../../view/order-bands-modal/order-bands-modal.component";

// MODELS
import { User } from "../../models/user.model";
import { Project } from "../../models/project.model";
import { Student } from "../../models/student.model";
import { Shipment } from "../../models/shipment.model";
import { UserProgress } from "../../models/user-progress.model";
import { CallSchedule } from "../../models/call-schedule.model";

// SERVICES
import { UserService } from "../../services/user.service";
import { ConfigService } from "../../services/config.service";
import { ProjectService } from "../../services/project.service";
import { ShipmentService } from "../../services/shipment.service";
import { UserProjectService } from "../../services/user-project.service";
import { UserProgressService } from "../../services/user-progress.service";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ProjectMemberService } from "../../services/project-member.service";
import { ProjectReportService } from "../../services/project-report.service";
import { ComponentEventService } from "../../services/component-event.service";
import { ProjectProgressService } from "../../services/project-progress.service";

import * as dialogs from "ui/dialogs";
import * as utils from "utils/utils";

@Component({
    selector: "project-page",
    moduleId: module.id,
    templateUrl: "./project-page.component.html",
    styleUrls: ['./project-page.component.css'],
})
export class ProjectComponent implements OnInit {

    videoId: string;
    videoid: string;
    videoStory: string;
    studentCoverImage: string;
    userId: number = 0;
    projectId: number = 0;
    hasProject: boolean = false;
    isMember: boolean;
    isPending: boolean = false;
    isUserProject: boolean = false;
    isReportEnable: boolean = false;
    isEditEnable: boolean = true;
    isInitialized: boolean = false;
    
    navOptions: any;
    progress: any = {
        hasStudent: false,
        hasOrderedBands: false,
        hasSkypeCall: false,
        watchVideos: false,
        printedStudentProfile: false,
        hasSharedVideos: false,
        hasOrderedShirts: false
    }

    finalProgress: any = {
        hasShipmentLabel: false,
        hasLeftOverBands: false,
        hasSubmittedInvoice: false,
        hasConfirmPayment: false,
        hasFeedback: false
    }

    tabBtn: any = {
        project: { isActive: true },
        progress: { isActive: false },
        student: { isActive: false },
        finalization: { isActive: false },
    };

    user: User;
    student: Student;
    project: Project;
    shipment: Shipment;
    confirmShipment: Shipment;
    userProgress: UserProgress;
    callSchedule: CallSchedule;

    // tabItems: Array<SegmentedBarItem> = [];
    projectItem: any = []; 
    selectedIndex: number = 0;

    constructor(
        private page: Page,
        private _ngZone: NgZone,
        private modal: ModalDialogService,
		private vcRef: ViewContainerRef,
        private _activatedRoute: ActivatedRoute,
		private _routerExtensions: RouterExtensions,

        private _userService: UserService,
        private _configService: ConfigService,
        private _projectMemberService: ProjectMemberService,
        private _projectReportService: ProjectReportService,
        private _projectService: ProjectService,
        private _shipmentService: ShipmentService,
        private _userProjectService: UserProjectService,
        private _userProgressService: UserProgressService,
        private _componentService: ComponentEventService,
        private _projectProgressService: ProjectProgressService
    ) { 
        this.user = new User();
        this.student = new Student();
        this.project = new Project();
        this.shipment = new Shipment();
        this.confirmShipment = new Shipment();
        this.userProgress = new UserProgress();
        this.callSchedule = new CallSchedule();

        this._componentService.setModalVcRef(this.vcRef)

        this.navOptions = this._componentService.getRouteOptions();
        this.navOptions.transition.name = 'slideTop';

        this.projectId = Number(this._activatedRoute.snapshot.params['id']);

        this._componentService.localNotifCallBack();
    }

    ngOnInit() {
        this.userId = this._userService.getCurrentUserId();

        this.videoStory = this._componentService.getYoutubeId('https://youtu.be/njF2MJhd6oM');
        this.getProject();
        this.getCurrentShipment();

        this.confirmShipment.deserialize({ bandsReceived: null })
    }

    toggleCheckbox(type) {
        this._componentService.showLoader('Updating...')

        let data = {
            hasShipmentLabel: 'printLabel',
            hasLeftOverBands: 'shipLeftoverBands',
            hasSubmittedInvoice: 'submitInvoice',
            hasConfirmPayment: 'confirmPayment'
        }

        let field = data[type];
        let obj = {};
        
        obj[field] = (this.finalProgress[type])? 'pending' : 'done';
        console.log(obj)
        this.updateProjectFinalProgress(type, obj, !this.finalProgress[type]);
    }

    toggleWatchVideo() {
        this._componentService.showLoader('Updating...')

        let watchVideos = (this.progress.watchVideos)? 'pending' : 'done';
        this.updateUserProgress('watchVideos', { watchVideos: watchVideos }, !this.progress.watchVideos)
    }

    toggleOrderShirt() {
        this._componentService.showLoader('Updating...')

        let orderShirt = (this.progress.hasOrderedShirts)? 'pending' : 'done';
        this.updateUserProgress('hasOrderedShirts', { orderShirt: orderShirt }, !this.progress.hasOrderedShirts)
    }

    onSelectedTabItemChange(args) {
        this.selectedIndex = args
        switch (this.selectedIndex) {
            case 0:
                this.tabBtn.project.isActive = true
                this.tabBtn.progress.isActive = false
                this.tabBtn.student.isActive = false
                this.tabBtn.finalization.isActive = false
                break;

            case 1:
                this.tabBtn.project.isActive = false
                this.tabBtn.progress.isActive = true
                this.tabBtn.student.isActive = false
                this.tabBtn.finalization.isActive = false
                break;
                
            case 2:
                this.tabBtn.project.isActive = false
                this.tabBtn.progress.isActive = false
                this.tabBtn.student.isActive = true
                this.tabBtn.finalization.isActive = false
                this.videoid = this._componentService.getYoutubeId(this.student.videoLink);
                
                break;
                
            case 3:
                this.tabBtn.project.isActive = false
                this.tabBtn.progress.isActive = false
                this.tabBtn.student.isActive = false
                this.tabBtn.finalization.isActive = true

                break;

            default:
                this.tabBtn.project.isActive = true
                this.tabBtn.progress.isActive = false
                this.tabBtn.student.isActive = false
                this.tabBtn.finalization.isActive = false
                break;
        }
    }

    openSkypeUrl() {
        utils.openUrl('http://www.yudabands.org/skype')
    }

    openBragModal() {

        this._componentService.showLoader('Opening...');

        setTimeout(() => {
            this._componentService.hideLoader();

            if(!this.project.hasStudent()) {
                this._componentService.showAlert('Ooops!', 'Please select a student to sponsor before you can brag');
                return;
            }

            let opt = this._componentService.getModalOptions({ student: this.student, project: this.project }, false, false)

            this.modal.showModal(BragComponent, opt).then(res => console.log(res))
        }, 1500)
    }

    openMeetStudent() {
        console.log('TODO: redirect url')
    }

    openShipmentHistory() {
        this._componentService.showLoader('Opening...');

        setTimeout(() => {
            this._componentService.hideLoader();

            let opt = this._componentService.getModalOptions({ projectId: this.projectId }, false)

            this.modal.showModal(ShipmentHistoryComponent, opt).then(res => console.log(res))
        }, 1500)
    }

    openVolunteersList() {
        this._componentService.hideLoader();

        let opt = this._componentService.getModalOptions({ projectId: this.projectId }, false)

        this.modal.showModal(VolunteersListComponent, opt).then(res => console.log(res))
    }

    openSocialDialog() {
        dialogs.action({
            message: "Follow us!",
            cancelButtonText: "Cancel",
            actions: ["Facebook", "Twitter", "Instagram", "Youtube"]
        }).then(result => {
            console.log("Dialog result: " + result);
            if(result == "Facebook"){
                this.openSocial('facebook')
            }else if(result == "Twitter"){
                this.openSocial('twitter')
            }else if(result == "Instagram"){
                this.openSocial('instagram')
            }else if(result == "Youtube"){
                this.openSocial('youtube')
            }
        });
    }

    updateNumbers() {
        if(!this.progress.hasOrderedBands) {
            this._componentService.showAlert('Ooops!', 'Please order Yuda Bands first.');
            return;
        }else if(!this.shipment.isDelivered()) {
            this._componentService.showAlert('Ooops!', 'Your shipment has not yet been delivered');
            return;
        }

        dialogs.prompt({
            title: "Update Bands Sold",
            message: "Please update your band's sold",
            okButtonText: "Update",
            cancelButtonText: "Cancel",
            inputType: dialogs.inputType.number
        }).then((r) => {
            if(r.result) {
                this._componentService.showLoader('Updating...')

                this.updateBandsSold(parseInt(r.text));
            }
        });
    }

    openSocial(type) {
        let name = '';

        if(type === 'facebook') {
            name = 'https://www.facebook.com/yudabands';
        }else if(type === 'instagram') {
            name = 'https://www.instagram.com/yudabands';
        }else if(type === 'twitter') {
            name = 'https://twitter.com/yudabands';
        }else if(type === 'youtube') {
            name = 'https://www.youtube.com/user/yudabands';
        }

        utils.openUrl(name)
    }

    goTo(type) {
        let url = '';

        if(type === 'trip') {
            url = 'http://www.yudabands.org/trips';
            utils.openUrl(url)
        }else if(type === 'review') {
            url = 'https://www.facebook.com/pg/yudabands/reviews/?ref=page_internal';
            utils.openUrl(url)
        }else if(type === 'shirt') {
            url = 'https://yudabands.org/shirts';
            utils.openUrl(url)
        }else if(type === 'resources') {
            this.navOptions.animated = false;
            this._routerExtensions.navigate(['/'+type], this.navOptions);
        }else if(type === 'media') {
            this._routerExtensions.navigate(['/'+type], this.navOptions);
        }else if(type === 'feedback') {
            this.openFeedbackModal();
        }
    }

    goToEditUser() {
        this.navOptions.transition.name = 'slideLeft';
        this._routerExtensions.navigate(['/edit-profile'], this.navOptions);
    }

    viewPendingInfo() {
        this._componentService.showAlert('Information', 'Your student is not yet verified, to be able to display your project publicly you need to wait for the project manager to approve your student.');
    }

    joinProject() {
        let opt = this._componentService.getModalOptions({
                userId: this.userId,
                projectId: this.projectId
            }, false, false)

        this.modal.showModal(JoinProjectComponent, opt).then(res => {
            if(res){
                this._componentService.showAlert("Information", "You will be notified once the project leader approves your request.")

                this._ngZone.run(() => {
                    this.hasProject = true;
                    this.isPending = true;
                    this.isMember = true;
                })
            }
                
        })
    }

    viewShipmentStatus() {
        if(this.project.status === 'rejected') {
            this._componentService.showAlert('Ooops!', 'You can\'t view a rejected project shipment status.')
            return;
        }

        let opt = this._componentService.getModalOptions({ projectId: this.projectId }, false, false)

        this.modal.showModal(ShipmentStatusInfoComponent, opt).then(res => console.log(res))
    }

    openScheduleSkypeModal() {
        if(this.project.status === 'done') {
            this._componentService.showAlert('Ooops!', 'You can\'t schedule a skype call on this project');
            return;
        }

        if(!this.project.hasStudent()) {
            this._componentService.showAlert('Ooops!', 'Please select a student to sponsor before you can schedule a call');
            return;
        }

        let currentDate = new Date();

        currentDate.setDate(currentDate.getDate()+4)

        let maxDate = new Date(this.project.dateStart)

        maxDate.setDate(maxDate.getDate()+4);

        if(currentDate > maxDate) {
            this._componentService.showAlert('Ooops!', 'You are past due with the given available skype call dates');
            return;
        }

        let context = {
            projectId: this.project.projectId,
            schoolAddress: this.project.schoolAddress,
            user: this.user,
            student: this.student,
            dateStart: this.project.dateStart,
            dateEnd: this.project.dateEnd
        };

        this.modal.showModal(SkypeSchedComponent, this._componentService.getModalOptions(context, true)).then(response => {
            if(response.success) {
                this.progress.hasSkypeCall = response.success;
                this.callSchedule.deserialize(response.data)
            }
        })
    }

    onPrintProfile() {
        this._componentService.showLoader('Opening...')

        if(this.isUserProject) {
            this.updateUserProgress('printedStudentProfile', { printStudentProfile: 'done' })
        }else {
            setTimeout(() => {
                this._componentService.hideLoader();
                openUrl(`${this._configService.getWebBaseUrl()}/view-student/${this.student.studentId}`)
            }, 800)
        }
        
    }

    report() {
        this.checkHasReport();
    }

    startProject() {
        this._routerExtensions.navigate(["/start-project"], this.navOptions); 
    }

    routeToStartProject() {
        this.navOptions.animated = true;
        this.navOptions.clearHistory = false;
        this._routerExtensions.navigate(["/start-project"], this.navOptions);
    }

    onEditProject() {
        if(this.project.status === 'rejected') {
            this._componentService.showAlert('Ooops!', 'You can\'t edit a rejected project.');
            return;
        }else if(this.project.status === 'done') {
            this._componentService.showAlert('Ooops!', 'You can\'t edit a project when it\'s done');
            return;
        }

        this.navOptions.transition.name = "";
        this.navOptions.transition.curve = "";
        this.navOptions.transition.duration = 0;

        this.navOptions.queryParams = {
            projectId: this.project.projectId
        };
        
        this._routerExtensions.navigate(["/edit-project"], this.navOptions);
    }

    openProjectManagerInfoModal() {

        let opt = this._componentService.getModalOptions({ userId: this.project.manager.userId }, true)

        this.modal.showModal(ProjectManagerInfoComponent, opt).then(response => {
            console.log(response)
        })
    }

    openProject(data) {
        if(data.studentId === 0) {
            this.navOptions.queryParams = { projectId: data.projectId };
            this._routerExtensions.navigate(['/project-approved'], this.navOptions);
        }else{
            this.navOptions.transition.name = 'slideLeft';
            this._routerExtensions.navigate(['/project', data.projectId], this.navOptions);
        }
    }

    openFeedbackModal() {
        if(this.finalProgress.hasFeedback) {
            this._componentService.showAlert('Ooops!', 'You already submitted a feedback');
            return;
        }

        let opt = this._componentService.getModalOptions({ projectId: this.project.projectId }, true)

        this.modal.showModal(FeedbackComponent, opt).then(response => {
            if(response) {
                this._componentService.showLoader('Refreshing...')
                this.getProject();
            }
        })
    }

    orderBands() {
        let opt = this._componentService.getModalOptions({ 
                projectId: this.projectId,
                dateStart: this.project.dateStart
            }, true)
        
        this.modal.showModal(OrderBandsComponent, opt).then(response => {
            if(response.success) {
                this.projectId = response.projectId;
                this._componentService.showLoader('Refreshing...')
                this.getProject();
            }
        })
    }

    openSelectStudentPage() {
        let opt = this._componentService.getModalOptions({ 
                projectId: this.projectId,
                dateStart: this.project.dateStart
            }, true)

        this.modal.showModal(SelectStudentComponent, opt).then(response => {
            if(response.success) {
                this.projectId = response.projectId;
                this._componentService.showLoader('Refreshing...')
                this.getProject();
                this.onSelectedTabItemChange(2)
            }
        })
    }

    showConfirm(message) {
        dialogs.confirm({
            title: "Oooppss!",
            message: message,
            okButtonText: "Create",
            cancelButtonText: "Cancel",
        }).then(result => {
            if(result) {
                this.routeToStartProject();
            }
        });
    }

    confirmShipmentItem() {
        this._componentService.showLoader('Loading...');

        setTimeout(() => {
            if(!this.confirmShipment.bandsReceived) {
                this._componentService.hideLoader();
                this._componentService.showAlert('Ooops!', 'All fields are required');
                return;
            }else {
                this.confirm();
            }
        }, 800)
    }

    getManagerProfile(url) {
        return this._componentService.getProjectManageProfile(url);
    }

    async getProject() {
        try {
            let res = await this._projectService.getProject(this.projectId);
              
            this.isInitialized = true;
            this._componentService.hideLoader();

            if(res.data) {
                this.project.deserialize(res.data);
                this.user.deserialize(res.data.userId);
                this.student.deserialize(res.data.studentId);
                this.callSchedule.deserialize(res.data.schedules[0]);

                this.checkUserCurrentProject();

                this._componentService.hasScheduledNotif(res.data.projectId)
                    .then((hasNotif) => {
                        if(!hasNotif) {
                            this._componentService.scheduleNotification(res.data);
                        }
                    })

                this.videoId = this._componentService.getYoutubeId(this.student.videoLink);

                this.project.imageUrl  = this._componentService.getImageCover(this.project.imageUrl);
                if(this.user.imageUrl) {
                    this.user.imageUrl = this._componentService.getImageProfile(this.user.imageUrl);
                }

                if(this.student.imageUrl) {
                    this.student.imageUrl = this._componentService.getImageProfile(this.student.imageUrl);
                    this.studentCoverImage = this._componentService.getImageCover(this.student.imageUrl);
                }
            }
        }catch(e) {
            this.isInitialized = true;
        }
    } 

    async getProjectProgress(projectId) {
        try{
            let res = await this._projectService.getProgress(projectId);

            this.progress.hasStudent = res.hasStudent;
            this.progress.hasOrderedBands = res.hasOrderedBands;
            this.progress.hasSkypeCall = res.hasSkypeCall;

            this.getUserProgress();
            this.getProjectFinalProgress();

        }catch(e) { console.log(e) }
    }

    async getUserProgress() {
        try{
            let res = await this._userProgressService.getProgress(this.userId);
            
            if(res.data) {
                this.userProgress.deserialize(res.data);
                this.progress.watchVideos = this.userProgress.getProgress().watchVideos;
                this.progress.printedStudentProfile = this.userProgress.getProgress().printedStudentProfile;
                this.progress.hasSharedVideos = this.userProgress.getProgress().hasSharedVideos;
                this.progress.hasOrderedShirts = this.userProgress.getProgress().hasOrderedShirts;
            }

        }catch(e) { console.log(e) }
    }

    async getProjectFinalProgress() {
        try{
            let res = await this._projectProgressService.getProgress(this.userId, this.projectId);
            
            this.finalProgress = res;

        }catch(e) { console.log(e) }
    }

    async getCurrentShipment() {
        try{
            let res = await this._shipmentService.getCurrentShipment(this.projectId);

            if(res.data) this.shipment.deserialize(res.data)

        }catch(e) { console.log(e) }
    }

    async checkUserCurrentProject() {
        try{
            let res = await this._userProjectService.checkUserCurrentProject(this.userId);

            if(res.hasProject) {
                this.hasProject = res.hasProject;
                if(res.project.projectId === this.projectId) {
                    this.isUserProject = (res.isLeader && !res.isMember)? res.isLeader : false;
                    this.isMember      = (!res.isLeader && res.isMember)? res.isMember : false;
                    this.isPending     = (!res.isLeader && res.isMember && !res.memberConfig.isApproved)? true : false;
                    
                    this.getProjectProgress(this.projectId);
                }
            }

        }catch(e) { console.log(e) }
    }

    async checkHasReport() {
        this._componentService.showLoader('Loading...');

        try{
            let res = await this._projectReportService.checkHasReport(this.projectId, this.userId);
            
            this._componentService.hideLoader();
            if(res.success) {
                if(!res.hasReport) {
                    this.navOptions.queryParams = { projectId: this.projectId };
                    this._routerExtensions.navigate(['/project-report'], this.navOptions);
                }else{
                    this._componentService.showAlert('Ooops!', 'You already made a report for this project.');
                }
            }else {
                this._componentService.showAlert('Ooops!', res.message);
            }

        }catch(e) {
            this._componentService.hideLoader();
        }
    }

    async updateUserProgress(type, data, isDone = true) {
        try {
            let res = await this._userProgressService.updateProgress(this.userId, data);

            this._componentService.hideLoader();
            this.progress[type] = isDone; 

            if(type === 'printedStudentProfile') openUrl(`${this._configService.getWebBaseUrl()}/view-student/${this.student.studentId}`)
        }catch(e) {
            console.log(e)
            this._componentService.hideLoader();
            if(type === 'printedStudentProfile') openUrl(`${this._configService.getWebBaseUrl()}/view-student/${this.student.studentId}`)
        }
    }

    async updateProjectFinalProgress(type, data, isDone = true) {
        try {
            let res = await this._projectProgressService.updateProgress(this.projectId, data);

            this._componentService.hideLoader();
            console.log("FINAL PROGRESS: "+type)
            console.log("BOOLEAN: "+isDone)
            this.finalProgress[type] = isDone; 

        }catch(e) {
            console.log(e)
            this._componentService.hideLoader();
        }
    }

    async updateBandsSold(newNumber) {
        try {
            let res = await this._projectService.updateProject(this.projectId, { bandsSold: newNumber });

            this._componentService.hideLoader();
            if(res.success) {
                this.project.bandsSold = newNumber;
                this._componentService.showSuccessFeedback('Success!', 'Total bands sold successfully updated!')
            }else {
                this._componentService.showErrorFeedback('Oops!', 'Unable to update your total sold bands')
            }
        }catch(e) {
            this._componentService.hideLoader();
            this._componentService.showErrorFeedback('Oops!', 'Unable to update your total sold bands')
        }
    }

    async confirm() {
        try {
            let res = await this._shipmentService.confirm(this.shipment.shipmentId, this.confirmShipment);

            this._componentService.hideLoader();

            if(res.success) {
                this.getCurrentShipment();
                this._componentService.showAlert('Success!', 'Number of Bands confirmed. You can now start with your project. Goodluck!')

            }else {
                this._componentService.showAlert('Ooops!', 'Unable to confirm bands. Please try again.');
            }
        }catch(e) {
            this._componentService.hideLoader();
            this._componentService.showAlert('Ooops!', 'Unable to confirm bands. Please try again.');
        }
    }
}
