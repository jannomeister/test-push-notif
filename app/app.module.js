"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var angular_1 = require("nativescript-drop-down/angular");
var forms_1 = require("@angular/forms");
var angular2_moment_1 = require("angular2-moment");
var angular_2 = require("nativescript-youtubeplayer/angular");
var forms_2 = require("nativescript-angular/forms");
var http_client_1 = require("nativescript-angular/http-client");
var angular_3 = require("nativescript-ui-autocomplete/angular");
var angular_4 = require("nativescript-ui-listview/angular");
var angular_5 = require("nativescript-facebook/angular");
var angular_6 = require("nativescript-checkbox/angular");
/* SERVICES */
var auth_service_1 = require("./services/auth.service");
var auth_guard_service_1 = require("./services/auth-guard.service");
var user_service_1 = require("./services/user.service");
var verification_service_1 = require("./services/verification.service");
var post_service_1 = require("./services/post.service");
var config_service_1 = require("./services/config.service");
var search_service_1 = require("./services/search.service");
var facebook_service_1 = require("./services/facebook.service");
var project_service_1 = require("./services/project.service");
var project_member_service_1 = require("./services/project-member.service");
var project_feedback_service_1 = require("./services/project-feedback.service");
var device_service_1 = require("./services/device.service");
var notification_service_1 = require("./services/notification.service");
var socket_service_1 = require("./services/socket.service");
var project_report_service_1 = require("./services/project-report.service");
var call_schedule_service_1 = require("./services/call-schedule.service");
var shipment_service_1 = require("./services/shipment.service");
var image_service_1 = require("./services/image.service");
var connectivity_service_1 = require("./services/connectivity.service");
var component_event_service_1 = require("./services/component-event.service");
var project_alert_service_1 = require("./services/project-alert.service");
var coachmark_service_1 = require("./services/coachmark.service");
var convention_service_1 = require("./services/convention.service");
var student_service_1 = require("./services/student.service");
var media_service_1 = require("./services/media.service");
var user_project_service_1 = require("./services/user-project.service");
var user_progress_service_1 = require("./services/user-progress.service");
var project_progress_service_1 = require("./services/project-progress.service");
var custom_route_reuse_strategy_service_1 = require("./services/custom-route-reuse-strategy.service");
/* DIRECTIVES */
var input_directive_1 = require("./directives/input.directive");
var input_directive_2 = require("./directives/input.directive");
/* PAGES */
var tabs_component_1 = require("./view/tabs/tabs.component");
var action_bar_component_1 = require("./view/action-bar/action-bar.component");
var login_page_component_1 = require("./view/login-page/login-page.component");
var loginto_page_component_1 = require("./view/login-page/loginto-page.component");
var signin_page_component_1 = require("./view/signin-page/signin-page.component");
var signup_page_component_1 = require("./view/signup-page/signup-page.component");
var notification_page_component_1 = require("./view/notification-page/notification-page.component");
var dashboard_page_component_1 = require("./view/dashboard-page/dashboard-page.component");
var profile_page_component_1 = require("./view/profile-page/profile-page.component");
var general_search_component_1 = require("./view/general-search/general-search.component");
var start_project_page_component_1 = require("./view/start-project-page/start-project-page.component");
var settings_page_component_1 = require("./view/settings-page/settings-page.component");
var feedback_page_component_1 = require("./view/feedback-page/feedback-page.component");
var select_student_modal_component_1 = require("./view/select-student-modal/select-student-modal.component");
var order_bands_modal_component_1 = require("./view/order-bands-modal/order-bands-modal.component");
var selectlist_page_component_1 = require("./view/selectlist-page/selectlist-page.component");
var project_page_component_1 = require("./view/project-page/project-page.component");
var joinproject_page_component_1 = require("./view/joinproject-page/joinproject-page.component");
var joinproject_alert_page_component_1 = require("./view/joinproject-alert-page/joinproject-alert-page.component");
var no_result_page_component_1 = require("./view/no-result/no-result-page.component");
var projectmanager_info_page_component_1 = require("./view/projectmanager-info-page/projectmanager-info-page.component");
var edit_project_page_component_1 = require("./view/edit-project-page/edit-project-page.component");
var slide_page_component_1 = require("./view/slide-page/slide-page.component");
var request_page_component_1 = require("./view/request-page/request-page.component");
var project_report_page_component_1 = require("./view/project-report-page/project-report-page.component");
var verification_page_component_1 = require("./view/verification-page/verification-page.component");
var shareproject_page_component_1 = require("./view/shareproject-page/shareproject-page.component");
var skype_sched_page_component_1 = require("./view/skype-sched-page/skype-sched-page.component");
var shipment_statusinfo_page_component_1 = require("./view/shipment-statusinfo-page/shipment-statusinfo-page.component");
var shipment_history_page_component_1 = require("./view/shipment-history-page/shipment-history-page.component");
var confirm_item_page_component_1 = require("./view/confirm-item-page/confirm-item-page.component");
var item_confirmed_modal_page_component_1 = require("./view/item-confirmed-modal-page/item-confirmed-modal-page.component");
var forget_password_page_component_1 = require("./view/forget-password-page/forget-password-page.component");
var edit_profile_page_component_1 = require("./view/edit-profile-page/edit-profile-page.component");
var profile_info_page_component_1 = require("./view/profile-info-page/profile-info-page.component");
var change_password_page_component_1 = require("./view/change-password-page/change-password-page.component");
var resources_page_component_1 = require("./view/resources-page/resources-page.component");
var shimmer_component_1 = require("./view/shimmer/shimmer.component");
var update_project_video_component_1 = require("./view/update-project-video/update-project-video.component");
var reference_list_component_1 = require("./view/reference-list/reference-list.component");
var student_info_modal_component_1 = require("./view/student-info-modal/student-info-modal.component");
var search_address_modal_component_1 = require("./view/search-address-modal/search-address-modal.component");
var media_page_component_1 = require("./view/media-page/media-page.component");
var walkthrough_page_component_1 = require("./view/walkthrough-page/walkthrough-page.component");
var brag_page_component_1 = require("./view/brag-page/brag-page.component");
var user_project_alert_page_component_1 = require("./view/user-project-alert-page/user-project-alert-page.component");
var join_project_guide_page_component_1 = require("./view/join-project-guide-page/join-project-guide-page.component");
var volunteers_list_modal_component_1 = require("./view/volunteers-list-modal/volunteers-list-modal.component");
var shipment_progress_modal_component_1 = require("./view/shipment-progress-modal/shipment-progress-modal.component");
var http_1 = require("@angular/common/http");
var http_interceptor_service_1 = require("./services/http-interceptor.service");
var application = require("application");
var nativescript_facebook_1 = require("nativescript-facebook");
application.on(application.launchEvent, function (args) {
    nativescript_facebook_1.init("2079069768972058");
});
core_1.enableProdMode();
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_1.AppRoutingModule,
                angular_1.DropDownModule,
                forms_1.FormsModule,
                angular_2.YoutubePlayerModule,
                forms_2.NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                angular2_moment_1.MomentModule,
                angular_3.NativeScriptUIAutoCompleteTextViewModule,
                angular_4.NativeScriptUIListViewModule,
                angular_5.NativeScriptFacebookModule,
                angular_6.TNSCheckBoxModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                login_page_component_1.LoginComponent,
                loginto_page_component_1.LoginToComponent,
                signin_page_component_1.SignInComponent,
                signup_page_component_1.SignUpComponent,
                verification_page_component_1.VerificationComponent,
                tabs_component_1.TabsComponent,
                notification_page_component_1.NotificationComponent,
                tabs_component_1.TabsComponent,
                action_bar_component_1.ActionBarComponent,
                dashboard_page_component_1.DashboardComponent,
                profile_page_component_1.ProfileComponent,
                general_search_component_1.SearchComponent,
                shareproject_page_component_1.ShareProjectComponent,
                start_project_page_component_1.StartProjectComponent,
                settings_page_component_1.SettingsComponent,
                feedback_page_component_1.FeedbackComponent,
                input_directive_1.IsEmailDirective,
                input_directive_2.MinLengthDirective,
                select_student_modal_component_1.SelectStudentComponent,
                order_bands_modal_component_1.OrderBandsComponent,
                selectlist_page_component_1.SelectListComponent,
                project_page_component_1.ProjectComponent,
                joinproject_page_component_1.JoinProjectComponent,
                joinproject_alert_page_component_1.JoinProjectAlertComponent,
                no_result_page_component_1.NoResultComponent,
                projectmanager_info_page_component_1.ProjectManagerInfoComponent,
                edit_project_page_component_1.EditProjectPageComponent,
                slide_page_component_1.SlideComponent,
                request_page_component_1.RequestComponent,
                project_report_page_component_1.ProjectReportComponent,
                skype_sched_page_component_1.SkypeSchedComponent,
                walkthrough_page_component_1.WalkThroughComponent,
                brag_page_component_1.BragComponent,
                shipment_statusinfo_page_component_1.ShipmentStatusInfoComponent,
                shipment_history_page_component_1.ShipmentHistoryComponent,
                confirm_item_page_component_1.ConfirmItemComponent,
                item_confirmed_modal_page_component_1.ItemConfirmedComponent,
                forget_password_page_component_1.ForgetPasswordComponent,
                edit_profile_page_component_1.EditProfileComponent,
                profile_info_page_component_1.ProfileInfoComponent,
                change_password_page_component_1.ChangePasswordComponent,
                resources_page_component_1.ResourcesComponent,
                shimmer_component_1.ShimmerComponent,
                update_project_video_component_1.UpdateProjectVideoComponent,
                reference_list_component_1.ReferenceListComponent,
                student_info_modal_component_1.StudentInfoModalComponent,
                search_address_modal_component_1.SearchAddressModalComponent,
                media_page_component_1.MediaComponent,
                user_project_alert_page_component_1.UserProjectAlertComponent,
                join_project_guide_page_component_1.JoinProjectGuideComponent,
                volunteers_list_modal_component_1.VolunteersListComponent,
                shipment_progress_modal_component_1.ShipmentProgressComponent
            ],
            providers: [
                modal_dialog_1.ModalDialogService,
                auth_service_1.AuthService,
                verification_service_1.VerificationService,
                auth_guard_service_1.AuthGuard,
                user_service_1.UserService,
                post_service_1.PostService,
                config_service_1.ConfigService,
                search_service_1.SearchService,
                facebook_service_1.FacebookService,
                project_service_1.ProjectService,
                project_member_service_1.ProjectMemberService,
                project_feedback_service_1.ProjectFeedbackService,
                device_service_1.DeviceService,
                notification_service_1.NotificationService,
                socket_service_1.SocketService,
                project_report_service_1.ProjectReportService,
                call_schedule_service_1.CallScheduleService,
                shipment_service_1.ShipmentService,
                image_service_1.ImageService,
                connectivity_service_1.ConnectivityService,
                component_event_service_1.ComponentEventService,
                project_alert_service_1.ProjectAlertService,
                coachmark_service_1.CoachMarkService,
                convention_service_1.ConventionService,
                student_service_1.StudentService,
                media_service_1.MediaService,
                user_project_service_1.UserProjectService,
                user_progress_service_1.UserProgressService,
                project_progress_service_1.ProjectProgressService,
                {
                    provide: router_1.RouteReuseStrategy,
                    useClass: custom_route_reuse_strategy_service_1.CustomRouteReuseStrategy
                },
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: http_interceptor_service_1.HttpInterceptorService,
                    multi: true
                }
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ],
            entryComponents: [
                joinproject_page_component_1.JoinProjectComponent,
                joinproject_alert_page_component_1.JoinProjectAlertComponent,
                skype_sched_page_component_1.SkypeSchedComponent,
                walkthrough_page_component_1.WalkThroughComponent,
                brag_page_component_1.BragComponent,
                item_confirmed_modal_page_component_1.ItemConfirmedComponent,
                update_project_video_component_1.UpdateProjectVideoComponent,
                reference_list_component_1.ReferenceListComponent,
                student_info_modal_component_1.StudentInfoModalComponent,
                search_address_modal_component_1.SearchAddressModalComponent,
                shipment_history_page_component_1.ShipmentHistoryComponent,
                order_bands_modal_component_1.OrderBandsComponent,
                select_student_modal_component_1.SelectStudentComponent,
                volunteers_list_modal_component_1.VolunteersListComponent,
                shipment_progress_modal_component_1.ShipmentProgressComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBMkU7QUFDM0UsMENBQXFEO0FBQ3JELGdGQUE4RTtBQUM5RSw2Q0FBaUQ7QUFDakQsaURBQStDO0FBQy9DLGtFQUF1RTtBQUN2RSwwREFBZ0U7QUFDaEUsd0NBQTZDO0FBQzdDLG1EQUErQztBQUMvQyw4REFBeUU7QUFDekUsb0RBQXFFO0FBQ3JFLGdFQUFnRjtBQUNoRixnRUFBZ0c7QUFDaEcsNERBQWdGO0FBQ2hGLHlEQUEyRTtBQUMzRSx5REFBa0U7QUFFbEUsY0FBYztBQUNkLHdEQUFzRDtBQUN0RCxvRUFBMEQ7QUFDMUQsd0RBQXNEO0FBQ3RELHdFQUFzRTtBQUN0RSx3REFBc0Q7QUFDdEQsNERBQTBEO0FBQzFELDREQUEwRDtBQUMxRCxnRUFBOEQ7QUFDOUQsOERBQTREO0FBQzVELDRFQUF5RTtBQUN6RSxnRkFBNkU7QUFDN0UsNERBQTBEO0FBQzFELHdFQUFzRTtBQUN0RSw0REFBMEQ7QUFDMUQsNEVBQXlFO0FBQ3pFLDBFQUF1RTtBQUN2RSxnRUFBOEQ7QUFDOUQsMERBQXdEO0FBQ3hELHdFQUFzRTtBQUN0RSw4RUFBMkU7QUFDM0UsMEVBQXVFO0FBQ3ZFLGtFQUFnRTtBQUNoRSxvRUFBa0U7QUFDbEUsOERBQTREO0FBQzVELDBEQUF3RDtBQUN4RCx3RUFBcUU7QUFDckUsMEVBQXVFO0FBQ3ZFLGdGQUE2RTtBQUU3RSxzR0FBMEY7QUFFMUYsZ0JBQWdCO0FBQ2hCLGdFQUFnRTtBQUNoRSxnRUFBa0U7QUFFbEUsV0FBVztBQUNYLDZEQUEyRDtBQUMzRCwrRUFBNEU7QUFFNUUsK0VBQXdFO0FBQ3hFLG1GQUE0RTtBQUM1RSxrRkFBMkU7QUFDM0Usa0ZBQTJFO0FBQzNFLG9HQUE2RjtBQUM3RiwyRkFBb0Y7QUFDcEYscUZBQThFO0FBQzlFLDJGQUFpRjtBQUNqRix1R0FBK0Y7QUFD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YixrQ0FBZTtnQkFDZixnQ0FBYztnQkFDZCw2Q0FBb0I7Z0JBQ3BCLGlEQUFzQjtnQkFDdEIsOEJBQWE7Z0JBQ2IsMENBQW1CO2dCQUNuQiw4QkFBYTtnQkFDYiw2Q0FBb0I7Z0JBQ3BCLDJDQUFtQjtnQkFDbkIsa0NBQWU7Z0JBQ2YsNEJBQVk7Z0JBQ1osMENBQW1CO2dCQUNuQiwrQ0FBcUI7Z0JBQ3JCLDJDQUFtQjtnQkFDbkIsb0NBQWdCO2dCQUNoQixzQ0FBaUI7Z0JBQ2pCLGdDQUFjO2dCQUNkLDRCQUFZO2dCQUNaLHlDQUFrQjtnQkFDbEIsMkNBQW1CO2dCQUNuQixpREFBc0I7Z0JBQ3RCO29CQUNJLE9BQU8sRUFBRSwyQkFBa0I7b0JBQzNCLFFBQVEsRUFBRSw4REFBd0I7aUJBQ3JDO2dCQUNEO29CQUNJLE9BQU8sRUFBRSx3QkFBaUI7b0JBQzFCLFFBQVEsRUFBRSxpREFBc0I7b0JBQ2hDLEtBQUssRUFBRSxJQUFJO2lCQUNkO2FBQ0o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLGlEQUFvQjtnQkFDcEIsNERBQXlCO2dCQUN6QixnREFBbUI7Z0JBQ25CLGlEQUFvQjtnQkFDcEIsbUNBQWE7Z0JBQ2IsNERBQXNCO2dCQUN0Qiw0REFBMkI7Z0JBQzNCLGlEQUFzQjtnQkFDdEIsd0RBQXlCO2dCQUN6Qiw0REFBMkI7Z0JBQzNCLDBEQUF3QjtnQkFDeEIsaURBQW1CO2dCQUNuQix1REFBc0I7Z0JBQ3RCLHlEQUF1QjtnQkFDdkIsNkRBQXlCO2FBQzVCO1NBQ0osQ0FBQztPQUVXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBlbmFibGVQcm9kTW9kZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZVJldXNlU3RyYXRlZ3kgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XG5pbXBvcnQgeyBEcm9wRG93bk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZHJvcC1kb3duL2FuZ3VsYXJcIjtcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBNb21lbnRNb2R1bGUgfSBmcm9tICdhbmd1bGFyMi1tb21lbnQnO1xuaW1wb3J0IHsgWW91dHViZVBsYXllck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQteW91dHViZXBsYXllci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlBdXRvQ29tcGxldGVUZXh0Vmlld01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktYXV0b2NvbXBsZXRlL2FuZ3VsYXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3L2FuZ3VsYXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZhY2Vib29rTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mYWNlYm9vay9hbmd1bGFyXCI7XG5pbXBvcnQgeyBUTlNDaGVja0JveE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jaGVja2JveC9hbmd1bGFyJztcblxuLyogU0VSVklDRVMgKi9cbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tIFwiLi9zZXJ2aWNlcy9hdXRoLWd1YXJkLnNlcnZpY2VcIjtcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBWZXJpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvdmVyaWZpY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IFBvc3RTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvcG9zdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvY29uZmlnLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9zZWFyY2guc2VydmljZVwiO1xuaW1wb3J0IHsgRmFjZWJvb2tTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZmFjZWJvb2suc2VydmljZVwiO1xuaW1wb3J0IHsgUHJvamVjdFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9wcm9qZWN0LnNlcnZpY2VcIjtcbmltcG9ydCB7IFByb2plY3RNZW1iZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvcHJvamVjdC1tZW1iZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgUHJvamVjdEZlZWRiYWNrU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3Byb2plY3QtZmVlZGJhY2suc2VydmljZVwiO1xuaW1wb3J0IHsgRGV2aWNlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2RldmljZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNvY2tldFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9zb2NrZXQuc2VydmljZVwiO1xuaW1wb3J0IHsgUHJvamVjdFJlcG9ydFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9wcm9qZWN0LXJlcG9ydC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDYWxsU2NoZWR1bGVTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvY2FsbC1zY2hlZHVsZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTaGlwbWVudFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9zaGlwbWVudC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBJbWFnZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9pbWFnZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb25uZWN0aXZpdHlTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvY29ubmVjdGl2aXR5LnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2NvbXBvbmVudC1ldmVudC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQcm9qZWN0QWxlcnRTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvcHJvamVjdC1hbGVydC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb2FjaE1hcmtTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvY29hY2htYXJrLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbnZlbnRpb25TZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvY29udmVudGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3N0dWRlbnQuc2VydmljZVwiO1xuaW1wb3J0IHsgTWVkaWFTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvbWVkaWEuc2VydmljZVwiO1xuaW1wb3J0IHsgVXNlclByb2plY3RTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvdXNlci1wcm9qZWN0LnNlcnZpY2VcIjtcbmltcG9ydCB7IFVzZXJQcm9ncmVzc1NlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy91c2VyLXByb2dyZXNzLnNlcnZpY2VcIjtcbmltcG9ydCB7IFByb2plY3RQcm9ncmVzc1NlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9wcm9qZWN0LXByb2dyZXNzLnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgQ3VzdG9tUm91dGVSZXVzZVN0cmF0ZWd5IH0gZnJvbSBcIi4vc2VydmljZXMvY3VzdG9tLXJvdXRlLXJldXNlLXN0cmF0ZWd5LnNlcnZpY2VcIjtcblxuLyogRElSRUNUSVZFUyAqL1xuaW1wb3J0IHsgSXNFbWFpbERpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvaW5wdXQuZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBNaW5MZW5ndGhEaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2lucHV0LmRpcmVjdGl2ZVwiO1xuXG4vKiBQQUdFUyAqL1xuaW1wb3J0IHsgVGFic0NvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXcvdGFicy90YWJzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQWN0aW9uQmFyQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9hY3Rpb24tYmFyL2FjdGlvbi1iYXIuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9sb2dpbi1wYWdlL2xvZ2luLXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBMb2dpblRvQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9sb2dpbi1wYWdlL2xvZ2ludG8tcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNpZ25JbkNvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXcvc2lnbmluLXBhZ2Uvc2lnbmluLXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTaWduVXBDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3L3NpZ251cC1wYWdlL3NpZ251cC1wYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9ub3RpZmljYXRpb24tcGFnZS9ub3RpZmljYXRpb24tcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IERhc2hib2FyZENvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXcvZGFzaGJvYXJkLXBhZ2UvZGFzaGJvYXJkLXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQcm9maWxlQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9wcm9maWxlLXBhZ2UvcHJvZmlsZS1wYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2VhcmNoQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9nZW5lcmFsLXNlYXJjaC9nZW5lcmFsLXNlYXJjaC5jb21wb25lbnRcIjtcbmltcG9ydCB7IFN0YXJ0UHJvamVjdENvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXcvc3RhcnQtcHJvamVjdC1wYWdlL3N0YXJ0LXByb2plY3QtcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNldHRpbmdzQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9zZXR0aW5ncy1wYWdlL3NldHRpbmdzLXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBGZWVkYmFja0NvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXcvZmVlZGJhY2stcGFnZS9mZWVkYmFjay1wYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2VsZWN0U3R1ZGVudENvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXcvc2VsZWN0LXN0dWRlbnQtbW9kYWwvc2VsZWN0LXN0dWRlbnQtbW9kYWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBPcmRlckJhbmRzQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9vcmRlci1iYW5kcy1tb2RhbC9vcmRlci1iYW5kcy1tb2RhbC5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNlbGVjdExpc3RDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3L3NlbGVjdGxpc3QtcGFnZS9zZWxlY3RsaXN0LXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQcm9qZWN0Q29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9wcm9qZWN0LXBhZ2UvcHJvamVjdC1wYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgSm9pblByb2plY3RDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3L2pvaW5wcm9qZWN0LXBhZ2Uvam9pbnByb2plY3QtcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IEpvaW5Qcm9qZWN0QWxlcnRDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3L2pvaW5wcm9qZWN0LWFsZXJ0LXBhZ2Uvam9pbnByb2plY3QtYWxlcnQtcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IE5vUmVzdWx0Q29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9uby1yZXN1bHQvbm8tcmVzdWx0LXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQcm9qZWN0TWFuYWdlckluZm9Db21wb25lbnQgfSBmcm9tIFwiLi92aWV3L3Byb2plY3RtYW5hZ2VyLWluZm8tcGFnZS9wcm9qZWN0bWFuYWdlci1pbmZvLXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBFZGl0UHJvamVjdFBhZ2VDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3L2VkaXQtcHJvamVjdC1wYWdlL2VkaXQtcHJvamVjdC1wYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2xpZGVDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3L3NsaWRlLXBhZ2Uvc2xpZGUtcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFJlcXVlc3RDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3L3JlcXVlc3QtcGFnZS9yZXF1ZXN0LXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQcm9qZWN0UmVwb3J0Q29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9wcm9qZWN0LXJlcG9ydC1wYWdlL3Byb2plY3QtcmVwb3J0LXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBWZXJpZmljYXRpb25Db21wb25lbnQgfSBmcm9tIFwiLi92aWV3L3ZlcmlmaWNhdGlvbi1wYWdlL3ZlcmlmaWNhdGlvbi1wYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2hhcmVQcm9qZWN0Q29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9zaGFyZXByb2plY3QtcGFnZS9zaGFyZXByb2plY3QtcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNreXBlU2NoZWRDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3L3NreXBlLXNjaGVkLXBhZ2Uvc2t5cGUtc2NoZWQtcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNoaXBtZW50U3RhdHVzSW5mb0NvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXcvc2hpcG1lbnQtc3RhdHVzaW5mby1wYWdlL3NoaXBtZW50LXN0YXR1c2luZm8tcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNoaXBtZW50SGlzdG9yeUNvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXcvc2hpcG1lbnQtaGlzdG9yeS1wYWdlL3NoaXBtZW50LWhpc3RvcnktcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENvbmZpcm1JdGVtQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9jb25maXJtLWl0ZW0tcGFnZS9jb25maXJtLWl0ZW0tcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IEl0ZW1Db25maXJtZWRDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3L2l0ZW0tY29uZmlybWVkLW1vZGFsLXBhZ2UvaXRlbS1jb25maXJtZWQtbW9kYWwtcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IEZvcmdldFBhc3N3b3JkQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9mb3JnZXQtcGFzc3dvcmQtcGFnZS9mb3JnZXQtcGFzc3dvcmQtcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IEVkaXRQcm9maWxlQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9lZGl0LXByb2ZpbGUtcGFnZS9lZGl0LXByb2ZpbGUtcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFByb2ZpbGVJbmZvQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9wcm9maWxlLWluZm8tcGFnZS9wcm9maWxlLWluZm8tcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoYW5nZVBhc3N3b3JkQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9jaGFuZ2UtcGFzc3dvcmQtcGFnZS9jaGFuZ2UtcGFzc3dvcmQtcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFJlc291cmNlc0NvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXcvcmVzb3VyY2VzLXBhZ2UvcmVzb3VyY2VzLXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTaGltbWVyQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9zaGltbWVyL3NoaW1tZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBVcGRhdGVQcm9qZWN0VmlkZW9Db21wb25lbnQgfSBmcm9tIFwiLi92aWV3L3VwZGF0ZS1wcm9qZWN0LXZpZGVvL3VwZGF0ZS1wcm9qZWN0LXZpZGVvLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUmVmZXJlbmNlTGlzdENvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXcvcmVmZXJlbmNlLWxpc3QvcmVmZXJlbmNlLWxpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTdHVkZW50SW5mb01vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9zdHVkZW50LWluZm8tbW9kYWwvc3R1ZGVudC1pbmZvLW1vZGFsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2VhcmNoQWRkcmVzc01vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9zZWFyY2gtYWRkcmVzcy1tb2RhbC9zZWFyY2gtYWRkcmVzcy1tb2RhbC5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1lZGlhQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlldy9tZWRpYS1wYWdlL21lZGlhLXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBXYWxrVGhyb3VnaENvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXcvd2Fsa3Rocm91Z2gtcGFnZS93YWxrdGhyb3VnaC1wYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQnJhZ0NvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXcvYnJhZy1wYWdlL2JyYWctcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFVzZXJQcm9qZWN0QWxlcnRDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3L3VzZXItcHJvamVjdC1hbGVydC1wYWdlL3VzZXItcHJvamVjdC1hbGVydC1wYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgSm9pblByb2plY3RHdWlkZUNvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXcvam9pbi1wcm9qZWN0LWd1aWRlLXBhZ2Uvam9pbi1wcm9qZWN0LWd1aWRlLXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBWb2x1bnRlZXJzTGlzdENvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXcvdm9sdW50ZWVycy1saXN0LW1vZGFsL3ZvbHVudGVlcnMtbGlzdC1tb2RhbC5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNoaXBtZW50UHJvZ3Jlc3NDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3L3NoaXBtZW50LXByb2dyZXNzLW1vZGFsL3NoaXBtZW50LXByb2dyZXNzLW1vZGFsLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2h0dHAtaW50ZXJjZXB0b3Iuc2VydmljZVwiO1xuXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IGluaXQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWZhY2Vib29rXCI7XG5cbmFwcGxpY2F0aW9uLm9uKGFwcGxpY2F0aW9uLmxhdW5jaEV2ZW50LCBmdW5jdGlvbiAoYXJncykge1xuICAgIGluaXQoXCIyMDc5MDY5NzY4OTcyMDU4XCIpO1xufSk7XG5cbmVuYWJsZVByb2RNb2RlKCk7XG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICBEcm9wRG93bk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFlvdXR1YmVQbGF5ZXJNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlLFxuICAgICAgICBNb21lbnRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJQXV0b0NvbXBsZXRlVGV4dFZpZXdNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZhY2Vib29rTW9kdWxlLFxuICAgICAgICBUTlNDaGVja0JveE1vZHVsZSxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgICAgIExvZ2luQ29tcG9uZW50LFxuICAgICAgICBMb2dpblRvQ29tcG9uZW50LFxuICAgICAgICBTaWduSW5Db21wb25lbnQsXG4gICAgICAgIFNpZ25VcENvbXBvbmVudCxcbiAgICAgICAgVmVyaWZpY2F0aW9uQ29tcG9uZW50LFxuICAgICAgICBUYWJzQ29tcG9uZW50LFxuICAgICAgICBOb3RpZmljYXRpb25Db21wb25lbnQsXG4gICAgICAgIFRhYnNDb21wb25lbnQsXG4gICAgICAgIEFjdGlvbkJhckNvbXBvbmVudCxcbiAgICAgICAgRGFzaGJvYXJkQ29tcG9uZW50LFxuICAgICAgICBQcm9maWxlQ29tcG9uZW50LFxuICAgICAgICBTZWFyY2hDb21wb25lbnQsXG4gICAgICAgIFNoYXJlUHJvamVjdENvbXBvbmVudCxcbiAgICAgICAgU3RhcnRQcm9qZWN0Q29tcG9uZW50LFxuICAgICAgICBTZXR0aW5nc0NvbXBvbmVudCxcbiAgICAgICAgRmVlZGJhY2tDb21wb25lbnQsXG4gICAgICAgIElzRW1haWxEaXJlY3RpdmUsXG4gICAgICAgIE1pbkxlbmd0aERpcmVjdGl2ZSxcbiAgICAgICAgU2VsZWN0U3R1ZGVudENvbXBvbmVudCxcbiAgICAgICAgT3JkZXJCYW5kc0NvbXBvbmVudCxcbiAgICAgICAgU2VsZWN0TGlzdENvbXBvbmVudCxcbiAgICAgICAgUHJvamVjdENvbXBvbmVudCxcbiAgICAgICAgSm9pblByb2plY3RDb21wb25lbnQsXG4gICAgICAgIEpvaW5Qcm9qZWN0QWxlcnRDb21wb25lbnQsXG4gICAgICAgIE5vUmVzdWx0Q29tcG9uZW50LFxuICAgICAgICBQcm9qZWN0TWFuYWdlckluZm9Db21wb25lbnQsXG4gICAgICAgIEVkaXRQcm9qZWN0UGFnZUNvbXBvbmVudCxcbiAgICAgICAgU2xpZGVDb21wb25lbnQsXG4gICAgICAgIFJlcXVlc3RDb21wb25lbnQsXG4gICAgICAgIFByb2plY3RSZXBvcnRDb21wb25lbnQsXG4gICAgICAgIFNreXBlU2NoZWRDb21wb25lbnQsXG4gICAgICAgIFdhbGtUaHJvdWdoQ29tcG9uZW50LFxuICAgICAgICBCcmFnQ29tcG9uZW50LFxuICAgICAgICBTaGlwbWVudFN0YXR1c0luZm9Db21wb25lbnQsXG4gICAgICAgIFNoaXBtZW50SGlzdG9yeUNvbXBvbmVudCxcbiAgICAgICAgQ29uZmlybUl0ZW1Db21wb25lbnQsXG4gICAgICAgIEl0ZW1Db25maXJtZWRDb21wb25lbnQsXG4gICAgICAgIEZvcmdldFBhc3N3b3JkQ29tcG9uZW50LFxuICAgICAgICBFZGl0UHJvZmlsZUNvbXBvbmVudCxcbiAgICAgICAgUHJvZmlsZUluZm9Db21wb25lbnQsXG4gICAgICAgIENoYW5nZVBhc3N3b3JkQ29tcG9uZW50LFxuICAgICAgICBSZXNvdXJjZXNDb21wb25lbnQsXG4gICAgICAgIFNoaW1tZXJDb21wb25lbnQsXG4gICAgICAgIFVwZGF0ZVByb2plY3RWaWRlb0NvbXBvbmVudCxcbiAgICAgICAgUmVmZXJlbmNlTGlzdENvbXBvbmVudCxcbiAgICAgICAgU3R1ZGVudEluZm9Nb2RhbENvbXBvbmVudCxcbiAgICAgICAgU2VhcmNoQWRkcmVzc01vZGFsQ29tcG9uZW50LFxuICAgICAgICBNZWRpYUNvbXBvbmVudCxcbiAgICAgICAgVXNlclByb2plY3RBbGVydENvbXBvbmVudCxcbiAgICAgICAgSm9pblByb2plY3RHdWlkZUNvbXBvbmVudCxcbiAgICAgICAgVm9sdW50ZWVyc0xpc3RDb21wb25lbnQsXG4gICAgICAgIFNoaXBtZW50UHJvZ3Jlc3NDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIEF1dGhTZXJ2aWNlLFxuICAgICAgICBWZXJpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBBdXRoR3VhcmQsXG4gICAgICAgIFVzZXJTZXJ2aWNlLFxuICAgICAgICBQb3N0U2VydmljZSxcbiAgICAgICAgQ29uZmlnU2VydmljZSxcbiAgICAgICAgU2VhcmNoU2VydmljZSxcbiAgICAgICAgRmFjZWJvb2tTZXJ2aWNlLFxuICAgICAgICBQcm9qZWN0U2VydmljZSxcbiAgICAgICAgUHJvamVjdE1lbWJlclNlcnZpY2UsXG4gICAgICAgIFByb2plY3RGZWVkYmFja1NlcnZpY2UsXG4gICAgICAgIERldmljZVNlcnZpY2UsXG4gICAgICAgIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgIFNvY2tldFNlcnZpY2UsXG4gICAgICAgIFByb2plY3RSZXBvcnRTZXJ2aWNlLFxuICAgICAgICBDYWxsU2NoZWR1bGVTZXJ2aWNlLFxuICAgICAgICBTaGlwbWVudFNlcnZpY2UsXG4gICAgICAgIEltYWdlU2VydmljZSxcbiAgICAgICAgQ29ubmVjdGl2aXR5U2VydmljZSxcbiAgICAgICAgQ29tcG9uZW50RXZlbnRTZXJ2aWNlLFxuICAgICAgICBQcm9qZWN0QWxlcnRTZXJ2aWNlLFxuICAgICAgICBDb2FjaE1hcmtTZXJ2aWNlLFxuICAgICAgICBDb252ZW50aW9uU2VydmljZSxcbiAgICAgICAgU3R1ZGVudFNlcnZpY2UsXG4gICAgICAgIE1lZGlhU2VydmljZSxcbiAgICAgICAgVXNlclByb2plY3RTZXJ2aWNlLFxuICAgICAgICBVc2VyUHJvZ3Jlc3NTZXJ2aWNlLFxuICAgICAgICBQcm9qZWN0UHJvZ3Jlc3NTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBSb3V0ZVJldXNlU3RyYXRlZ3ksXG4gICAgICAgICAgICB1c2VDbGFzczogQ3VzdG9tUm91dGVSZXVzZVN0cmF0ZWd5XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgICAgICAgICAgdXNlQ2xhc3M6IEh0dHBJbnRlcmNlcHRvclNlcnZpY2UsXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBKb2luUHJvamVjdENvbXBvbmVudCwgXG4gICAgICAgIEpvaW5Qcm9qZWN0QWxlcnRDb21wb25lbnQsXG4gICAgICAgIFNreXBlU2NoZWRDb21wb25lbnQsXG4gICAgICAgIFdhbGtUaHJvdWdoQ29tcG9uZW50LFxuICAgICAgICBCcmFnQ29tcG9uZW50LFxuICAgICAgICBJdGVtQ29uZmlybWVkQ29tcG9uZW50LFxuICAgICAgICBVcGRhdGVQcm9qZWN0VmlkZW9Db21wb25lbnQsXG4gICAgICAgIFJlZmVyZW5jZUxpc3RDb21wb25lbnQsXG4gICAgICAgIFN0dWRlbnRJbmZvTW9kYWxDb21wb25lbnQsXG4gICAgICAgIFNlYXJjaEFkZHJlc3NNb2RhbENvbXBvbmVudCxcbiAgICAgICAgU2hpcG1lbnRIaXN0b3J5Q29tcG9uZW50LFxuICAgICAgICBPcmRlckJhbmRzQ29tcG9uZW50LFxuICAgICAgICBTZWxlY3RTdHVkZW50Q29tcG9uZW50LFxuICAgICAgICBWb2x1bnRlZXJzTGlzdENvbXBvbmVudCxcbiAgICAgICAgU2hpcG1lbnRQcm9ncmVzc0NvbXBvbmVudFxuICAgIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=