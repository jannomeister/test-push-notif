import { NgModule, NO_ERRORS_SCHEMA, enableProdMode } from "@angular/core";
import { RouteReuseStrategy } from "@angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { DropDownModule } from "nativescript-drop-down/angular";
import { FormsModule } from "@angular/forms";
import { MomentModule } from 'angular2-moment';
import { YoutubePlayerModule } from "nativescript-youtubeplayer/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptFacebookModule } from "nativescript-facebook/angular";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

/* SERVICES */
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth-guard.service";
import { UserService } from "./services/user.service";
import { VerificationService } from "./services/verification.service";
import { PostService } from "./services/post.service";
import { ConfigService } from "./services/config.service";
import { SearchService } from "./services/search.service";
import { FacebookService } from "./services/facebook.service";
import { ProjectService } from "./services/project.service";
import { ProjectMemberService } from "./services/project-member.service";
import { ProjectFeedbackService } from "./services/project-feedback.service";
import { DeviceService } from "./services/device.service";
import { NotificationService } from "./services/notification.service";
import { SocketService } from "./services/socket.service";
import { ProjectReportService } from "./services/project-report.service";
import { CallScheduleService } from "./services/call-schedule.service";
import { ShipmentService } from "./services/shipment.service";
import { ImageService } from "./services/image.service";
import { ConnectivityService } from "./services/connectivity.service";
import { ComponentEventService } from "./services/component-event.service";
import { ProjectAlertService } from "./services/project-alert.service";
import { CoachMarkService } from "./services/coachmark.service";
import { ConventionService } from "./services/convention.service";
import { StudentService } from "./services/student.service";
import { MediaService } from "./services/media.service";
import { UserProjectService } from "./services/user-project.service";
import { UserProgressService } from "./services/user-progress.service";
import { ProjectProgressService } from "./services/project-progress.service";

import { CustomRouteReuseStrategy } from "./services/custom-route-reuse-strategy.service";

/* DIRECTIVES */
import { IsEmailDirective } from "./directives/input.directive";
import { MinLengthDirective } from "./directives/input.directive";

/* PAGES */
import { TabsComponent } from "./view/tabs/tabs.component";
import { ActionBarComponent } from "./view/action-bar/action-bar.component";

import { LoginComponent } from "./view/login-page/login-page.component";
import { LoginToComponent } from "./view/login-page/loginto-page.component";
import { SignInComponent } from "./view/signin-page/signin-page.component";
import { SignUpComponent } from "./view/signup-page/signup-page.component";
import { NotificationComponent } from "./view/notification-page/notification-page.component";
import { DashboardComponent } from "./view/dashboard-page/dashboard-page.component";
import { ProfileComponent } from "./view/profile-page/profile-page.component";
import { SearchComponent } from "./view/general-search/general-search.component";
import { StartProjectComponent } from "./view/start-project-page/start-project-page.component";
import { SettingsComponent } from "./view/settings-page/settings-page.component";
import { FeedbackComponent } from "./view/feedback-page/feedback-page.component";
import { SelectStudentComponent } from "./view/select-student-modal/select-student-modal.component";
import { OrderBandsComponent } from "./view/order-bands-modal/order-bands-modal.component";
import { SelectListComponent } from "./view/selectlist-page/selectlist-page.component";
import { ProjectComponent } from "./view/project-page/project-page.component";
import { JoinProjectComponent } from "./view/joinproject-page/joinproject-page.component";
import { JoinProjectAlertComponent } from "./view/joinproject-alert-page/joinproject-alert-page.component";
import { NoResultComponent } from "./view/no-result/no-result-page.component";
import { ProjectManagerInfoComponent } from "./view/projectmanager-info-page/projectmanager-info-page.component";
import { EditProjectPageComponent } from "./view/edit-project-page/edit-project-page.component";
import { SlideComponent } from "./view/slide-page/slide-page.component";
import { RequestComponent } from "./view/request-page/request-page.component";
import { ProjectReportComponent } from "./view/project-report-page/project-report-page.component";
import { VerificationComponent } from "./view/verification-page/verification-page.component";
import { ShareProjectComponent } from "./view/shareproject-page/shareproject-page.component";
import { SkypeSchedComponent } from "./view/skype-sched-page/skype-sched-page.component";
import { ShipmentStatusInfoComponent } from "./view/shipment-statusinfo-page/shipment-statusinfo-page.component";
import { ShipmentHistoryComponent } from "./view/shipment-history-page/shipment-history-page.component";
import { ConfirmItemComponent } from "./view/confirm-item-page/confirm-item-page.component";
import { ItemConfirmedComponent } from "./view/item-confirmed-modal-page/item-confirmed-modal-page.component";
import { ForgetPasswordComponent } from "./view/forget-password-page/forget-password-page.component";
import { EditProfileComponent } from "./view/edit-profile-page/edit-profile-page.component";
import { ProfileInfoComponent } from "./view/profile-info-page/profile-info-page.component";
import { ChangePasswordComponent } from "./view/change-password-page/change-password-page.component";
import { ResourcesComponent } from "./view/resources-page/resources-page.component";
import { ShimmerComponent } from "./view/shimmer/shimmer.component";
import { UpdateProjectVideoComponent } from "./view/update-project-video/update-project-video.component";
import { ReferenceListComponent } from "./view/reference-list/reference-list.component";
import { StudentInfoModalComponent } from "./view/student-info-modal/student-info-modal.component";
import { SearchAddressModalComponent } from "./view/search-address-modal/search-address-modal.component";
import { MediaComponent } from "./view/media-page/media-page.component";
import { WalkThroughComponent } from "./view/walkthrough-page/walkthrough-page.component";
import { BragComponent } from "./view/brag-page/brag-page.component";
import { UserProjectAlertComponent } from "./view/user-project-alert-page/user-project-alert-page.component";
import { JoinProjectGuideComponent } from "./view/join-project-guide-page/join-project-guide-page.component";
import { VolunteersListComponent } from "./view/volunteers-list-modal/volunteers-list-modal.component";
import { ShipmentProgressComponent } from "./view/shipment-progress-modal/shipment-progress-modal.component";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorService } from "./services/http-interceptor.service";

import * as application from "application";
import { init } from "nativescript-facebook";

application.on(application.launchEvent, function (args) {
    init("2079069768972058");
});

enableProdMode();
@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        DropDownModule,
        FormsModule,
        YoutubePlayerModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        MomentModule,
        NativeScriptUIAutoCompleteTextViewModule,
        NativeScriptUIListViewModule,
        NativeScriptFacebookModule,
        TNSCheckBoxModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        LoginToComponent,
        SignInComponent,
        SignUpComponent,
        VerificationComponent,
        TabsComponent,
        NotificationComponent,
        TabsComponent,
        ActionBarComponent,
        DashboardComponent,
        ProfileComponent,
        SearchComponent,
        ShareProjectComponent,
        StartProjectComponent,
        SettingsComponent,
        FeedbackComponent,
        IsEmailDirective,
        MinLengthDirective,
        SelectStudentComponent,
        OrderBandsComponent,
        SelectListComponent,
        ProjectComponent,
        JoinProjectComponent,
        JoinProjectAlertComponent,
        NoResultComponent,
        ProjectManagerInfoComponent,
        EditProjectPageComponent,
        SlideComponent,
        RequestComponent,
        ProjectReportComponent,
        SkypeSchedComponent,
        WalkThroughComponent,
        BragComponent,
        ShipmentStatusInfoComponent,
        ShipmentHistoryComponent,
        ConfirmItemComponent,
        ItemConfirmedComponent,
        ForgetPasswordComponent,
        EditProfileComponent,
        ProfileInfoComponent,
        ChangePasswordComponent,
        ResourcesComponent,
        ShimmerComponent,
        UpdateProjectVideoComponent,
        ReferenceListComponent,
        StudentInfoModalComponent,
        SearchAddressModalComponent,
        MediaComponent,
        UserProjectAlertComponent,
        JoinProjectGuideComponent,
        VolunteersListComponent,
        ShipmentProgressComponent
    ],
    providers: [
        ModalDialogService,
        AuthService,
        VerificationService,
        AuthGuard,
        UserService,
        PostService,
        ConfigService,
        SearchService,
        FacebookService,
        ProjectService,
        ProjectMemberService,
        ProjectFeedbackService,
        DeviceService,
        NotificationService,
        SocketService,
        ProjectReportService,
        CallScheduleService,
        ShipmentService,
        ImageService,
        ConnectivityService,
        ComponentEventService,
        ProjectAlertService,
        CoachMarkService,
        ConventionService,
        StudentService,
        MediaService,
        UserProjectService,
        UserProgressService,
        ProjectProgressService,
        {
            provide: RouteReuseStrategy,
            useClass: CustomRouteReuseStrategy
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
        JoinProjectComponent, 
        JoinProjectAlertComponent,
        SkypeSchedComponent,
        WalkThroughComponent,
        BragComponent,
        ItemConfirmedComponent,
        UpdateProjectVideoComponent,
        ReferenceListComponent,
        StudentInfoModalComponent,
        SearchAddressModalComponent,
        ShipmentHistoryComponent,
        OrderBandsComponent,
        SelectStudentComponent,
        VolunteersListComponent,
        ShipmentProgressComponent
    ]
})

export class AppModule { }
