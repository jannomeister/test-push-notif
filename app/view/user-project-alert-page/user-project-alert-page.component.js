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
// SERVICES
var user_service_1 = require("../../services/user.service");
var user_project_service_1 = require("../../services/user-project.service");
var component_event_service_1 = require("../../services/component-event.service");
var UserProjectAlertComponent = /** @class */ (function () {
    function UserProjectAlertComponent(_routerExtensions, _userService, _userProjectService, _componentService) {
        this._routerExtensions = _routerExtensions;
        this._userService = _userService;
        this._userProjectService = _userProjectService;
        this._componentService = _componentService;
        this.userId = 0;
        this.navOptions = this._componentService.getRouteOptions();
    }
    UserProjectAlertComponent.prototype.ngOnInit = function () {
        this.userId = this._userService.getCurrentUserId();
    };
    UserProjectAlertComponent.prototype.goTo = function () {
        var _this = this;
        this._componentService.showLoader('Loading...');
        setTimeout(function () {
            _this._componentService.hideLoader();
            _this.navOptions.clearHistory = true;
            _this.navOptions.transition.name = 'slideLeft';
            _this._routerExtensions.navigate(['/dashboard'], _this.navOptions);
        }, 800);
    };
    UserProjectAlertComponent.prototype.joinProject = function () {
        var _this = this;
        this._componentService.showLoader('Loading...');
        setTimeout(function () {
            _this.checkUserCurrentProject('join-project');
        }, 900);
    };
    UserProjectAlertComponent.prototype.startProject = function () {
        var _this = this;
        this._componentService.showLoader('Checking...');
        setTimeout(function () {
            _this.checkUserCurrentProject('start-project');
        }, 900);
    };
    UserProjectAlertComponent.prototype.routeToJoinProject = function () {
        this.navOptions.clearHistory = true;
        this.navOptions.transition.name = 'slideLeft';
        this._routerExtensions.navigate(["/join-project-guide"], this.navOptions);
    };
    UserProjectAlertComponent.prototype.routeToStartProject = function () {
        this.navOptions.animated = true;
        this.navOptions.clearHistory = false;
        this.navOptions.queryParams = { route: 'start' };
        this._routerExtensions.navigate(["/start-project"], this.navOptions);
    };
    UserProjectAlertComponent.prototype.checkUserCurrentProject = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userProjectService.checkUserCurrentProject(this.userId)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.hasProject) {
                            this._componentService.showAlert('Ooops!', 'You already have a project.');
                        }
                        else {
                            if (type === 'start-project') {
                                this.routeToStartProject();
                            }
                            else {
                                this.routeToJoinProject();
                            }
                        }
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
    UserProjectAlertComponent = __decorate([
        core_1.Component({
            selector: "user-project-alert-page",
            moduleId: module.id,
            templateUrl: "./user-project-alert-page.component.html",
            styleUrls: ['./user-project-alert-page.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            user_service_1.UserService,
            user_project_service_1.UserProjectService,
            component_event_service_1.ComponentEventService])
    ], UserProjectAlertComponent);
    return UserProjectAlertComponent;
}());
exports.UserProjectAlertComponent = UserProjectAlertComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9qZWN0LWFsZXJ0LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci1wcm9qZWN0LWFsZXJ0LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQStEO0FBRS9ELFdBQVc7QUFDWCw0REFBMEQ7QUFDMUQsNEVBQXlFO0FBQ3pFLGtGQUErRTtBQVEvRTtJQU1JLG1DQUNTLGlCQUFtQyxFQUVoQyxZQUF5QixFQUN6QixtQkFBdUMsRUFDMUMsaUJBQXdDO1FBSnhDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFFaEMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUMxQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBUGpELFdBQU0sR0FBVyxDQUFDLENBQUM7UUFTbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUVELDRDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRUQsd0NBQUksR0FBSjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVoRCxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDcEMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7WUFDOUMsS0FBSSxDQUFDLGlC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bmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbi8vIFNFUlZJQ0VTXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFVzZXJQcm9qZWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLXByb2plY3Quc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50RXZlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbXBvbmVudC1ldmVudC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInVzZXItcHJvamVjdC1hbGVydC1wYWdlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3VzZXItcHJvamVjdC1hbGVydC1wYWdlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vdXNlci1wcm9qZWN0LWFsZXJ0LXBhZ2UuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyUHJvamVjdEFsZXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRuYXZPcHRpb25zOiBhbnk7XG5cbiAgICB1c2VySWQ6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICBcdHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG5cbiAgICAgICAgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF91c2VyUHJvamVjdFNlcnZpY2U6IFVzZXJQcm9qZWN0U2VydmljZSxcbiAgICBcdHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZVxuICAgICkge1xuICAgIFx0dGhpcy5uYXZPcHRpb25zID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRSb3V0ZU9wdGlvbnMoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLl91c2VyU2VydmljZS5nZXRDdXJyZW50VXNlcklkKCk7XG4gICAgfVxuXG4gICAgZ29UbygpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdMb2FkaW5nLi4uJyk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMubmF2T3B0aW9ucy5jbGVhckhpc3RvcnkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5uYXZPcHRpb25zLnRyYW5zaXRpb24ubmFtZSA9ICdzbGlkZUxlZnQnO1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9kYXNoYm9hcmQnXSwgdGhpcy5uYXZPcHRpb25zKSBcbiAgICAgICAgfSwgODAwKVxuICAgIH1cblxuICAgIGpvaW5Qcm9qZWN0KCkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ0xvYWRpbmcuLi4nKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tVc2VyQ3VycmVudFByb2plY3QoJ2pvaW4tcHJvamVjdCcpXG4gICAgICAgIH0sIDkwMClcbiAgICB9XG5cbiAgICBzdGFydFByb2plY3QoKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignQ2hlY2tpbmcuLi4nKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tVc2VyQ3VycmVudFByb2plY3QoJ3N0YXJ0LXByb2plY3QnKTtcbiAgICAgICAgfSwgOTAwKVxuICAgIH1cblxuICAgIHJvdXRlVG9Kb2luUHJvamVjdCgpIHtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zLmNsZWFySGlzdG9yeSA9IHRydWU7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucy50cmFuc2l0aW9uLm5hbWUgPSAnc2xpZGVMZWZ0JztcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvam9pbi1wcm9qZWN0LWd1aWRlXCJdLCB0aGlzLm5hdk9wdGlvbnMpIFxuICAgIH1cblxuICAgIHJvdXRlVG9TdGFydFByb2plY3QoKSB7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucy5hbmltYXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucy5jbGVhckhpc3RvcnkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zLnF1ZXJ5UGFyYW1zID0geyByb3V0ZTogJ3N0YXJ0JyB9XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3N0YXJ0LXByb2plY3RcIl0sIHRoaXMubmF2T3B0aW9ucyk7XG4gICAgfVxuXG4gICAgYXN5bmMgY2hlY2tVc2VyQ3VycmVudFByb2plY3QodHlwZSkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fdXNlclByb2plY3RTZXJ2aWNlLmNoZWNrVXNlckN1cnJlbnRQcm9qZWN0KHRoaXMudXNlcklkKTtcblxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG5cbiAgICAgICAgICAgIGlmKHJlcy5oYXNQcm9qZWN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vb3BzIScsICdZb3UgYWxyZWFkeSBoYXZlIGEgcHJvamVjdC4nKVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHR5cGUgPT09ICdzdGFydC1wcm9qZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlVG9TdGFydFByb2plY3QoKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVUb0pvaW5Qcm9qZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29wcyEnLCAnU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4uJylcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=