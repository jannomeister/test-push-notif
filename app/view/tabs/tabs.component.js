"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var page_1 = require("tns-core-modules/ui/page");
var feedback_page_component_1 = require("../../view/feedback-page/feedback-page.component");
var user_service_1 = require("../../services/user.service");
var socket_service_1 = require("../../services/socket.service");
var project_service_1 = require("../../services/project.service");
var coachmark_service_1 = require("../../services/coachmark.service");
var user_project_service_1 = require("../../services/user-project.service");
var project_member_service_1 = require("../../services/project-member.service");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var component_event_service_1 = require("../../services/component-event.service");
var TabsComponent = /** @class */ (function () {
    function TabsComponent(page, _ngZone, vcRef, modal, _routerExtensions, _userService, _socketService, _projectService, _coachMarkService, _userProjectService, _componentService, _projectMemberService) {
        this.page = page;
        this._ngZone = _ngZone;
        this.vcRef = vcRef;
        this.modal = modal;
        this._routerExtensions = _routerExtensions;
        this._userService = _userService;
        this._socketService = _socketService;
        this._projectService = _projectService;
        this._coachMarkService = _coachMarkService;
        this._userProjectService = _userProjectService;
        this._componentService = _componentService;
        this._projectMemberService = _projectMemberService;
        this.projectId = 0;
        this.isClicked = false;
        this.userHasProject = false;
        this.isProjectDone = false;
        this.tabs = {
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
        };
        this.navOptions = this._componentService.getRouteOptions();
        // this.navOptions.clearHistory = true;
        // this.navOptions.transition.name = "slideTop";
        this.isProjectDoneListener();
        this.isUserRemovedListener();
    }
    TabsComponent.prototype.ngOnInit = function () {
        var userId = this._userService.getCurrentUserId();
        this.setActiveTab();
        this.checkUserCurrentProject(userId, 'init');
    };
    TabsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            var homeTab = _this.getHomeTabPosAndSize();
            var resourcesTab = _this.getResourcesTabPosAndSize();
            var projectTab = _this.getProjectTabPosAndSize();
            var profileTab = _this.getProfileTabPosAndSize();
            var settingsTab = _this.getSettingsTabPosAndSize();
            _this._coachMarkService.setTab(homeTab, resourcesTab, projectTab, profileTab, settingsTab);
        }, 1500);
    };
    TabsComponent.prototype.isProjectDoneListener = function () {
        var _this = this;
        this._componentService.isProjectDone.subscribe(function (isProjectDone) {
            _this._componentService.showAlert('Congratulations!', 'Your project is officially over! We hope it was a success. Open your project to report your numbers.');
            _this._ngZone.run(function () {
                _this.isProjectDone = isProjectDone;
            });
        });
    };
    TabsComponent.prototype.isUserRemovedListener = function () {
        var _this = this;
        this._componentService.isUserRemoved.subscribe(function (isUserRemoved) {
            _this._userService.removeCurrentUser();
            _this._componentService.unregisterToken();
            _this._componentService
                .showUserRemovalAlert()
                .then(function (data) {
                _this._componentService.showLoader('');
                setTimeout(function () {
                    _this._componentService.hideLoader();
                    _this.navOptions.clearHistory = true;
                    _this.navOptions.transition.name = 'slideRight';
                    _this._routerExtensions.navigate(['/home'], _this.navOptions);
                }, 800);
            });
        });
    };
    TabsComponent.prototype.getHomeTabPosAndSize = function () {
        var home = this.page.getViewById('homeTab');
        var size = home.getActualSize();
        var position = home.getLocationOnScreen();
        return {
            originX: position.x,
            originY: position.y,
            width: size.width,
            height: size.height
        };
    };
    TabsComponent.prototype.getResourcesTabPosAndSize = function () {
        var resources = this.page.getViewById('resourcesTab');
        var size = resources.getActualSize();
        var position = resources.getLocationOnScreen();
        return {
            originX: position.x,
            originY: position.y,
            width: size.width,
            height: size.height
        };
    };
    TabsComponent.prototype.getProjectTabPosAndSize = function () {
        var project = this.page.getViewById('projectTab');
        var size = project.getActualSize();
        var position = project.getLocationOnScreen();
        return {
            originX: position.x,
            originY: position.y,
            width: size.width,
            height: size.height
        };
    };
    TabsComponent.prototype.getProfileTabPosAndSize = function () {
        var profile = this.page.getViewById('profileTab');
        var size = profile.getActualSize();
        var position = profile.getLocationOnScreen();
        return {
            originX: position.x,
            originY: position.y,
            width: size.width,
            height: size.height
        };
    };
    TabsComponent.prototype.getSettingsTabPosAndSize = function () {
        var settings = this.page.getViewById('settingsTab');
        var size = settings.getActualSize();
        var position = settings.getLocationOnScreen();
        return {
            originX: position.x,
            originY: position.y,
            width: size.width,
            height: size.height
        };
    };
    TabsComponent.prototype.setActiveTab = function () {
        var _this = this;
        this._ngZone.run(function () {
            _this.tabs[_this.activeTab].color = '#00a9ed';
            _this.tabs[_this.activeTab].image = "~/assets/resized/" + _this.activeTab + "-active.png";
        });
    };
    TabsComponent.prototype.checkProject = function () {
        var userId = this._userService.getCurrentUserId();
        this._componentService.showLoader('Checking...');
        this.checkUserCurrentProject(userId, 'click');
    };
    TabsComponent.prototype.routeToStartProject = function () {
        this.navOptions.animated = true;
        this.navOptions.clearHistory = false;
        this.navOptions.queryParams = { route: 'tabs' };
        this._routerExtensions.navigate(["/start-project"], this.navOptions);
    };
    TabsComponent.prototype.goTo = function (routeName) {
        // this.isProjectDone = false;
        this.navOptions.animated = false;
        // this.navOptions.clearHistory = true;
        this._routerExtensions.navigate([routeName], this.navOptions);
    };
    TabsComponent.prototype.openFeedbackModal = function (projectId) {
        var _this = this;
        var opt = {
            context: { projectId: projectId },
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true,
            transition: {
                name: "slideTop",
                duration: 200,
                curve: "ease"
            }
        };
        this.modal.showModal(feedback_page_component_1.FeedbackComponent, opt).then(function (response) {
            if (response) {
                _this.userHasProject = false;
            }
        });
    };
    TabsComponent.prototype.openProjectPage = function (projectId) {
        this.navOptions.animated = false;
        this._routerExtensions.navigate(['/project', projectId], this.navOptions);
    };
    TabsComponent.prototype.processProject = function (data) {
        var _this = this;
        if (data.hasProject) {
            if (data.isLeader && !data.isMember) {
                if (data.leaderConfig.isProjectPending) {
                    this._componentService.showAlert('Oops!', data.leaderConfig.message);
                }
                else {
                    this.openProjectPage(data.project.projectId);
                }
            }
            else if (data.isMember && !data.isLeader) {
                if (!data.memberConfig.isApproved) {
                    this._componentService.showAlert('Oops!', data.memberConfig.message);
                }
                else {
                    this.openProjectPage(data.project.projectId);
                }
            }
            else {
                this._componentService.showAlert('Oops!', 'Something went wrong. Please try again.');
            }
        }
        else {
            this._componentService.showAlertStartProject()
                .then(function (res) { return _this.routeToStartProject(); })
                .catch(function (e) { return console.log(e); });
        }
    };
    TabsComponent.prototype.checkUserCurrentProject = function (userId, action) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userProjectService.checkUserCurrentProject(userId)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        this.userHasProject = res.hasProject;
                        if (action === 'click')
                            this.processProject(res);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this._componentService.hideLoader();
                        this._componentService.showAlert('Oops!', 'Something went wrong. Please try again.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.Input('activeTab'),
        __metadata("design:type", String)
    ], TabsComponent.prototype, "activeTab", void 0);
    TabsComponent = __decorate([
        core_1.Component({
            selector: "tabs",
            moduleId: module.id,
            templateUrl: "./tabs.component.html",
            styleUrls: ['./tabs.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            core_1.NgZone,
            core_1.ViewContainerRef,
            dialogs_1.ModalDialogService,
            router_1.RouterExtensions,
            user_service_1.UserService,
            socket_service_1.SocketService,
            project_service_1.ProjectService,
            coachmark_service_1.CoachMarkService,
            user_project_service_1.UserProjectService,
            component_event_service_1.ComponentEventService,
            project_member_service_1.ProjectMemberService])
    ], TabsComponent);
    return TabsComponent;
}());
exports.TabsComponent = TabsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW1GO0FBRW5GLHNEQUErRDtBQUUvRCxpREFBZ0Q7QUFFaEQsNEZBQXFGO0FBRXJGLDREQUEwRDtBQUMxRCxnRUFBOEQ7QUFDOUQsa0VBQWdFO0FBQ2hFLHNFQUFvRTtBQUNwRSw0RUFBeUU7QUFDekUsZ0ZBQTZFO0FBQzdFLG1FQUE2RTtBQUM3RSxrRkFBK0U7QUFRL0U7SUFrQ0ksdUJBQ1ksSUFBVSxFQUNWLE9BQWUsRUFDZixLQUF1QixFQUN2QixLQUF5QixFQUN6QixpQkFBbUMsRUFFbkMsWUFBeUIsRUFDekIsY0FBNkIsRUFDN0IsZUFBK0IsRUFDL0IsaUJBQW1DLEVBQ25DLG1CQUF1QyxFQUN2QyxpQkFBd0MsRUFDeEMscUJBQTJDO1FBWjNDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDekIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUVuQyxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUN6QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBQ3ZDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFDeEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzQjtRQTdDdkQsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hD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LFVBQVUsRUFBRSxDQUFDO3dCQUVwQyxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7d0JBRXJDLElBQUcsTUFBTSxLQUFLLE9BQU87NEJBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQTs7Ozt3QkFHL0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUNwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSx5Q0FBeUMsQ0FBQyxDQUFBOzs7Ozs7S0FFM0Y7SUFoUG1CO1FBQW5CLFlBQUssQ0FBQyxXQUFXLENBQUM7O29EQUFtQjtJQWhDN0IsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDdEMsQ0FBQzt5Q0FvQ29CLFdBQUk7WUFDRCxhQUFNO1lBQ1IsdUJBQWdCO1lBQ2hCLDRCQUFrQjtZQUNOLHlCQUFnQjtZQUVyQiwwQkFBVztZQUNULDhCQUFhO1lBQ1osZ0NBQWM7WUFDWixvQ0FBZ0I7WUFDZCx5Q0FBa0I7WUFDcEIsK0NBQXFCO1lBQ2pCLDZDQUFvQjtPQS9DOUMsYUFBYSxDQWlSekI7SUFBRCxvQkFBQztDQUFBLEFBalJELElBaVJDO0FBalJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYsIElucHV0LCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5cbmltcG9ydCB7IEZlZWRiYWNrQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3ZpZXcvZmVlZGJhY2stcGFnZS9mZWVkYmFjay1wYWdlLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNvY2tldFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc29ja2V0LnNlcnZpY2VcIjtcbmltcG9ydCB7IFByb2plY3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3Byb2plY3Quc2VydmljZVwiO1xuaW1wb3J0IHsgQ29hY2hNYXJrU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb2FjaG1hcmsuc2VydmljZVwiO1xuaW1wb3J0IHsgVXNlclByb2plY3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXItcHJvamVjdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQcm9qZWN0TWVtYmVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wcm9qZWN0LW1lbWJlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBDb21wb25lbnRFdmVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29tcG9uZW50LWV2ZW50LnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwidGFic1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi90YWJzLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFicy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHJvamVjdElkOiBudW1iZXIgPSAwO1xuICAgIGlzQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHVzZXJIYXNQcm9qZWN0OiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNQcm9qZWN0RG9uZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgbmF2T3B0aW9uczogYW55O1xuXG4gICAgdGFiczogYW55ID0ge1xuICAgICAgICBob21lOiB7XG4gICAgICAgICAgICBjb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICAgICAgaW1hZ2U6ICd+L2Fzc2V0cy9yZXNpemVkL2hvbWUucG5nJ1xuICAgICAgICB9LFxuICAgICAgICByZXNvdXJjZXM6IHtcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICBpbWFnZTogJ34vYXNzZXRzL3Jlc2l6ZWQvcmVzb3VyY2VzLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAgcHJvamVjdDoge1xuICAgICAgICAgICAgY29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgIGltYWdlOiAnfi9hc3NldHMvcmVzaXplZC9wcm9qZWN0LnBuZydcbiAgICAgICAgfSxcbiAgICAgICAgcHJvZmlsZToge1xuICAgICAgICAgICAgY29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgIGltYWdlOiAnfi9hc3NldHMvcmVzaXplZC9wcm9maWxlLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgIGNvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICBpbWFnZTogJ34vYXNzZXRzL3Jlc2l6ZWQvc2V0dGluZ3MucG5nJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCdhY3RpdmVUYWInKSBhY3RpdmVUYWI6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG5cbiAgICAgICAgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9zb2NrZXRTZXJ2aWNlOiBTb2NrZXRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9wcm9qZWN0U2VydmljZTogUHJvamVjdFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvYWNoTWFya1NlcnZpY2U6IENvYWNoTWFya1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3VzZXJQcm9qZWN0U2VydmljZTogVXNlclByb2plY3RTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9jb21wb25lbnRTZXJ2aWNlOiBDb21wb25lbnRFdmVudFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3Byb2plY3RNZW1iZXJTZXJ2aWNlOiBQcm9qZWN0TWVtYmVyU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRSb3V0ZU9wdGlvbnMoKTtcbiAgICAgICAgLy8gdGhpcy5uYXZPcHRpb25zLmNsZWFySGlzdG9yeSA9IHRydWU7XG4gICAgICAgIC8vIHRoaXMubmF2T3B0aW9ucy50cmFuc2l0aW9uLm5hbWUgPSBcInNsaWRlVG9wXCI7XG5cbiAgICAgICAgdGhpcy5pc1Byb2plY3REb25lTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5pc1VzZXJSZW1vdmVkTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgbGV0IHVzZXJJZCA9IHRoaXMuX3VzZXJTZXJ2aWNlLmdldEN1cnJlbnRVc2VySWQoKTtcblxuICAgICAgICB0aGlzLnNldEFjdGl2ZVRhYigpO1xuICAgICAgICB0aGlzLmNoZWNrVXNlckN1cnJlbnRQcm9qZWN0KHVzZXJJZCwgJ2luaXQnKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGhvbWVUYWIgPSB0aGlzLmdldEhvbWVUYWJQb3NBbmRTaXplKCk7XG4gICAgICAgICAgICBsZXQgcmVzb3VyY2VzVGFiID0gdGhpcy5nZXRSZXNvdXJjZXNUYWJQb3NBbmRTaXplKCk7XG4gICAgICAgICAgICBsZXQgcHJvamVjdFRhYiA9IHRoaXMuZ2V0UHJvamVjdFRhYlBvc0FuZFNpemUoKTtcbiAgICAgICAgICAgIGxldCBwcm9maWxlVGFiID0gdGhpcy5nZXRQcm9maWxlVGFiUG9zQW5kU2l6ZSgpO1xuICAgICAgICAgICAgbGV0IHNldHRpbmdzVGFiID0gdGhpcy5nZXRTZXR0aW5nc1RhYlBvc0FuZFNpemUoKTtcblxuICAgICAgICAgICAgdGhpcy5fY29hY2hNYXJrU2VydmljZS5zZXRUYWIoaG9tZVRhYiwgcmVzb3VyY2VzVGFiLCBwcm9qZWN0VGFiLCBwcm9maWxlVGFiLCBzZXR0aW5nc1RhYik7XG4gICAgICAgIH0sIDE1MDApXG4gICAgfVxuXG4gICAgaXNQcm9qZWN0RG9uZUxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmlzUHJvamVjdERvbmUuc3Vic2NyaWJlKGlzUHJvamVjdERvbmUgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnQ29uZ3JhdHVsYXRpb25zIScsICdZb3VyIHByb2plY3QgaXMgb2ZmaWNpYWxseSBvdmVyISBXZSBob3BlIGl0IHdhcyBhIHN1Y2Nlc3MuIE9wZW4geW91ciBwcm9qZWN0IHRvIHJlcG9ydCB5b3VyIG51bWJlcnMuJylcblxuICAgICAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1Byb2plY3REb25lID0gaXNQcm9qZWN0RG9uZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaXNVc2VyUmVtb3ZlZExpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmlzVXNlclJlbW92ZWQuc3Vic2NyaWJlKGlzVXNlclJlbW92ZWQgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdXNlclNlcnZpY2UucmVtb3ZlQ3VycmVudFVzZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UudW5yZWdpc3RlclRva2VuKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2VcbiAgICAgICAgICAgICAgICAuc2hvd1VzZXJSZW1vdmFsQWxlcnQoKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2T3B0aW9ucy5jbGVhckhpc3RvcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZPcHRpb25zLnRyYW5zaXRpb24ubmFtZSA9ICdzbGlkZVJpZ2h0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvaG9tZSddLCB0aGlzLm5hdk9wdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgIH0sIDgwMClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldEhvbWVUYWJQb3NBbmRTaXplKCkge1xuICAgICAgICBsZXQgaG9tZSA9IDxWaWV3PnRoaXMucGFnZS5nZXRWaWV3QnlJZCgnaG9tZVRhYicpO1xuXG4gICAgICAgIGxldCBzaXplID0gaG9tZS5nZXRBY3R1YWxTaXplKCk7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IGhvbWUuZ2V0TG9jYXRpb25PblNjcmVlbigpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvcmlnaW5YOiBwb3NpdGlvbi54LFxuICAgICAgICAgICAgb3JpZ2luWTogcG9zaXRpb24ueSxcbiAgICAgICAgICAgIHdpZHRoOiBzaXplLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLmhlaWdodFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UmVzb3VyY2VzVGFiUG9zQW5kU2l6ZSgpIHtcbiAgICAgICAgbGV0IHJlc291cmNlcyA9IDxWaWV3PnRoaXMucGFnZS5nZXRWaWV3QnlJZCgncmVzb3VyY2VzVGFiJyk7XG5cbiAgICAgICAgbGV0IHNpemUgPSByZXNvdXJjZXMuZ2V0QWN0dWFsU2l6ZSgpO1xuICAgICAgICBsZXQgcG9zaXRpb24gPSByZXNvdXJjZXMuZ2V0TG9jYXRpb25PblNjcmVlbigpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvcmlnaW5YOiBwb3NpdGlvbi54LFxuICAgICAgICAgICAgb3JpZ2luWTogcG9zaXRpb24ueSxcbiAgICAgICAgICAgIHdpZHRoOiBzaXplLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLmhlaWdodFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UHJvamVjdFRhYlBvc0FuZFNpemUoKSB7XG4gICAgICAgIGxldCBwcm9qZWN0ID0gPFZpZXc+dGhpcy5wYWdlLmdldFZpZXdCeUlkKCdwcm9qZWN0VGFiJyk7IFxuXG4gICAgICAgIGxldCBzaXplID0gcHJvamVjdC5nZXRBY3R1YWxTaXplKCk7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHByb2plY3QuZ2V0TG9jYXRpb25PblNjcmVlbigpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvcmlnaW5YOiBwb3NpdGlvbi54LFxuICAgICAgICAgICAgb3JpZ2luWTogcG9zaXRpb24ueSxcbiAgICAgICAgICAgIHdpZHRoOiBzaXplLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLmhlaWdodFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UHJvZmlsZVRhYlBvc0FuZFNpemUoKSB7XG4gICAgICAgIGxldCBwcm9maWxlID0gPFZpZXc+dGhpcy5wYWdlLmdldFZpZXdCeUlkKCdwcm9maWxlVGFiJyk7IFxuXG4gICAgICAgIGxldCBzaXplID0gcHJvZmlsZS5nZXRBY3R1YWxTaXplKCk7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHByb2ZpbGUuZ2V0TG9jYXRpb25PblNjcmVlbigpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvcmlnaW5YOiBwb3NpdGlvbi54LFxuICAgICAgICAgICAgb3JpZ2luWTogcG9zaXRpb24ueSxcbiAgICAgICAgICAgIHdpZHRoOiBzaXplLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLmhlaWdodFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U2V0dGluZ3NUYWJQb3NBbmRTaXplKCkge1xuICAgICAgICBsZXQgc2V0dGluZ3MgPSA8Vmlldz50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ3NldHRpbmdzVGFiJyk7IFxuXG4gICAgICAgIGxldCBzaXplID0gc2V0dGluZ3MuZ2V0QWN0dWFsU2l6ZSgpO1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBzZXR0aW5ncy5nZXRMb2NhdGlvbk9uU2NyZWVuKCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9yaWdpblg6IHBvc2l0aW9uLngsXG4gICAgICAgICAgICBvcmlnaW5ZOiBwb3NpdGlvbi55LFxuICAgICAgICAgICAgd2lkdGg6IHNpemUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHNpemUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRBY3RpdmVUYWIoKSB7XG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50YWJzW3RoaXMuYWN0aXZlVGFiXS5jb2xvciA9ICcjMDBhOWVkJztcbiAgICAgICAgICAgIHRoaXMudGFic1t0aGlzLmFjdGl2ZVRhYl0uaW1hZ2UgPSBgfi9hc3NldHMvcmVzaXplZC8ke3RoaXMuYWN0aXZlVGFifS1hY3RpdmUucG5nYDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGNoZWNrUHJvamVjdCgpIHtcblxuICAgICAgICBsZXQgdXNlcklkID0gdGhpcy5fdXNlclNlcnZpY2UuZ2V0Q3VycmVudFVzZXJJZCgpO1xuXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignQ2hlY2tpbmcuLi4nKTtcblxuICAgICAgICB0aGlzLmNoZWNrVXNlckN1cnJlbnRQcm9qZWN0KHVzZXJJZCwgJ2NsaWNrJyk7XG4gICAgfVxuXG4gICAgcm91dGVUb1N0YXJ0UHJvamVjdCgpIHtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zLmFuaW1hdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zLmNsZWFySGlzdG9yeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5hdk9wdGlvbnMucXVlcnlQYXJhbXMgPSB7IHJvdXRlOiAndGFicycgfVxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9zdGFydC1wcm9qZWN0XCJdLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgIH1cblxuICAgIGdvVG8ocm91dGVOYW1lKSB7XG4gICAgICAgIC8vIHRoaXMuaXNQcm9qZWN0RG9uZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5hdk9wdGlvbnMuYW5pbWF0ZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5uYXZPcHRpb25zLmNsZWFySGlzdG9yeSA9IHRydWU7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW3JvdXRlTmFtZV0sIHRoaXMubmF2T3B0aW9ucylcbiAgICB9XG5cbiAgICBvcGVuRmVlZGJhY2tNb2RhbChwcm9qZWN0SWQpIHtcbiAgICAgICAgbGV0IG9wdCA9IHtcbiAgICAgICAgICAgIGNvbnRleHQ6IHsgcHJvamVjdElkOiBwcm9qZWN0SWQgfSxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IHRydWUsXG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxuICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZVRvcFwiLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKEZlZWRiYWNrQ29tcG9uZW50LCBvcHQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJIYXNQcm9qZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb3BlblByb2plY3RQYWdlKHByb2plY3RJZCkge1xuICAgICAgICB0aGlzLm5hdk9wdGlvbnMuYW5pbWF0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9wcm9qZWN0JywgcHJvamVjdElkXSwgdGhpcy5uYXZPcHRpb25zKTtcbiAgICB9XG5cbiAgICBwcm9jZXNzUHJvamVjdChkYXRhKSB7XG4gICAgICAgIGlmKGRhdGEuaGFzUHJvamVjdCkge1xuICAgICAgICAgICAgaWYoZGF0YS5pc0xlYWRlciAmJiAhZGF0YS5pc01lbWJlcikge1xuICAgICAgICAgICAgICAgIGlmKGRhdGEubGVhZGVyQ29uZmlnLmlzUHJvamVjdFBlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vcHMhJywgZGF0YS5sZWFkZXJDb25maWcubWVzc2FnZSlcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlblByb2plY3RQYWdlKGRhdGEucHJvamVjdC5wcm9qZWN0SWQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfWVsc2UgaWYoZGF0YS5pc01lbWJlciAmJiAhZGF0YS5pc0xlYWRlcikge1xuICAgICAgICAgICAgICAgIGlmKCFkYXRhLm1lbWJlckNvbmZpZy5pc0FwcHJvdmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb3BzIScsIGRhdGEubWVtYmVyQ29uZmlnLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Qcm9qZWN0UGFnZShkYXRhLnByb2plY3QucHJvamVjdElkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vcHMhJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nLiBQbGVhc2UgdHJ5IGFnYWluLicpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnRTdGFydFByb2plY3QoKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHRoaXMucm91dGVUb1N0YXJ0UHJvamVjdCgpKVxuICAgICAgICAgICAgLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZSkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBjaGVja1VzZXJDdXJyZW50UHJvamVjdCh1c2VySWQsIGFjdGlvbikge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fdXNlclByb2plY3RTZXJ2aWNlLmNoZWNrVXNlckN1cnJlbnRQcm9qZWN0KHVzZXJJZCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuXG4gICAgICAgICAgICB0aGlzLnVzZXJIYXNQcm9qZWN0ID0gcmVzLmhhc1Byb2plY3Q7XG5cbiAgICAgICAgICAgIGlmKGFjdGlvbiA9PT0gJ2NsaWNrJykgdGhpcy5wcm9jZXNzUHJvamVjdChyZXMpXG5cbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vcHMhJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nLiBQbGVhc2UgdHJ5IGFnYWluLicpXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=