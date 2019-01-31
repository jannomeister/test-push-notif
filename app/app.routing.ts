import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { AuthGuard } from "./services/auth-guard.service";

import { ActionBarComponent } from "./view/action-bar/action-bar.component";
import { LoginComponent } from "./view/login-page/login-page.component";
import { LoginToComponent } from "./view/login-page/loginto-page.component";
import { SignInComponent } from "./view/signin-page/signin-page.component";
import { SignUpComponent } from "./view/signup-page/signup-page.component";
import { VerificationComponent } from "./view/verification-page/verification-page.component";
import { NotificationComponent } from "./view/notification-page/notification-page.component";
import { DashboardComponent } from "./view/dashboard-page/dashboard-page.component";
import { ProfileComponent } from "./view/profile-page/profile-page.component";
import { SearchComponent } from "./view/general-search/general-search.component";
import { ShareProjectComponent } from "./view/shareproject-page/shareproject-page.component";
import { StartProjectComponent } from "./view/start-project-page/start-project-page.component";
import { SettingsComponent } from "./view/settings-page/settings-page.component";
import { FeedbackComponent } from "./view/feedback-page/feedback-page.component";
import { SelectListComponent } from "./view/selectlist-page/selectlist-page.component";
import { StudentInfoModalComponent } from "./view/student-info-modal/student-info-modal.component";
import { ProjectComponent } from "./view/project-page/project-page.component";
import { ProjectManagerInfoComponent } from "./view/projectmanager-info-page/projectmanager-info-page.component";
import { EditProjectPageComponent } from "./view/edit-project-page/edit-project-page.component";
import { SlideComponent } from "./view/slide-page/slide-page.component";
import { RequestComponent } from "./view/request-page/request-page.component";
import { ProjectReportComponent } from "./view/project-report-page/project-report-page.component";
import { ShipmentStatusInfoComponent } from "./view/shipment-statusinfo-page/shipment-statusinfo-page.component";
import { ConfirmItemComponent } from "./view/confirm-item-page/confirm-item-page.component";
import { ForgetPasswordComponent } from "./view/forget-password-page/forget-password-page.component";
import { EditProfileComponent } from "./view/edit-profile-page/edit-profile-page.component";
import { ProfileInfoComponent } from "./view/profile-info-page/profile-info-page.component";
import { ChangePasswordComponent } from "./view/change-password-page/change-password-page.component";
import { ResourcesComponent } from "./view/resources-page/resources-page.component";
import { MediaComponent } from "./view/media-page/media-page.component";
import { UserProjectAlertComponent } from "./view/user-project-alert-page/user-project-alert-page.component";
import { JoinProjectGuideComponent } from "./view/join-project-guide-page/join-project-guide-page.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: LoginComponent},
    { path: "login-to", component: LoginToComponent},
    { path: "signin", component: SignInComponent},
    { path: "signup", component: SignUpComponent},
    { path: "forget-password", component: ForgetPasswordComponent},
    { path: "verification", component: VerificationComponent},
    { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
    { path: "notification", component: NotificationComponent, canActivate: [AuthGuard] },
    { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
    { path: "profile-info", component: ProfileInfoComponent, canActivate: [AuthGuard] },
    { path: "edit-profile", component: EditProfileComponent, canActivate: [AuthGuard] },
    { path: "search", component: SearchComponent, canActivate: [AuthGuard] },
    { path: "share", component: ShareProjectComponent, canActivate: [AuthGuard] },
    { path: "start-project", component: StartProjectComponent, canActivate: [AuthGuard] },
    { path: "settings", component: SettingsComponent, canActivate: [AuthGuard] },
    { path: "feedback", component: FeedbackComponent, canActivate: [AuthGuard] },
    { path: "select-list", component: SelectListComponent, canActivate: [AuthGuard]},
    { path: "student-info", component: StudentInfoModalComponent, canActivate: [AuthGuard]},
    { path: "project/:id", component: ProjectComponent, canActivate: [AuthGuard], data: { noReuse: true } },
    { path: "project-manager-info", component: ProjectManagerInfoComponent, canActivate: [AuthGuard]},
    { path: "edit-project", component: EditProjectPageComponent, canActivate: [AuthGuard]},
    { path: "slide", component: SlideComponent, canActivate: [AuthGuard]},
    { path: "request", component: RequestComponent, canActivate: [AuthGuard]},
    { path: "project-report", component: ProjectReportComponent, canActivate: [AuthGuard]},
    { path: "shipment-status", component: ShipmentStatusInfoComponent, canActivate: [AuthGuard]},
    { path: "confirm-item", component: ConfirmItemComponent, canActivate: [AuthGuard]},
    { path: "change-password", component: ChangePasswordComponent, canActivate: [AuthGuard]},
    { path: "resources", component: ResourcesComponent, canActivate: [AuthGuard]},
    { path: "media", component: MediaComponent, canActivate: [AuthGuard]},
    { path: "user-alert", component: UserProjectAlertComponent, canActivate: [AuthGuard]},
    { path: "join-project-guide", component: JoinProjectGuideComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }