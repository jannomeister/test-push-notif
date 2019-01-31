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
// OTHERS
var application = require("tns-core-modules/application");
// MODELS
var user_model_1 = require("../../models/user.model");
// SERVICES
var user_service_1 = require("../../services/user.service");
var project_service_1 = require("../../services/project.service");
var component_event_service_1 = require("../../services/component-event.service");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(_routerExtensions, _userService, _projectService, _componentService) {
        this._routerExtensions = _routerExtensions;
        this._userService = _userService;
        this._projectService = _projectService;
        this._componentService = _componentService;
        this.userId = 0;
        this.projects = [];
        this.page = 1;
        this.limit = 10;
        this.orderBy = 'DESC';
        this.isProjectEmpty = false;
        this.isProjectLoading = true;
        this.isProjectInitialized = false;
        this.isInitialized = false;
        this.user = new user_model_1.User();
        this.navOptions = this._componentService.getRouteOptions();
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.userId = this._userService.getCurrentUserId();
        this.getUserData();
        this.getUserAllProject();
    };
    ProfileComponent.prototype.onItemLoading = function (args) {
        if (application.ios) {
            var iosCell = args.ios;
            iosCell.selectionStyle = UITableViewCellSelectionStyle.None;
        }
    };
    ProfileComponent.prototype.onTap = function () { };
    ProfileComponent.prototype.viewProject = function (project) {
        if (project.status === 'pending') {
            this._componentService.showAlert('Alert', 'You can\'t view pending projects.');
            return;
        }
        else if (!project.studentId && project.status === 'approved') {
            this._componentService.showAlert('No student found', 'You must complete the last step by clicking project tab and add a student.');
            return;
        }
        this._routerExtensions.navigate(['/project', project.projectId], this.navOptions);
    };
    ProfileComponent.prototype.templateSelector = function (item, index, items) {
        return item.type;
    };
    ProfileComponent.prototype.seePost = function (project) {
        if (project.status === 'pending') {
            this._componentService.showAlert('Alert', 'Project still pending. Please wait for the project manager to approve it.');
        }
        else {
            this._routerExtensions.navigate(['/project', project.projectId], this.navOptions);
        }
    };
    ProfileComponent.prototype.gotoSettings = function () {
        this._routerExtensions.navigate(['/settings'], this.navOptions);
    };
    ProfileComponent.prototype.gotoEditProfile = function () {
        this.navOptions.transition.name = 'slideLeft';
        this._routerExtensions.navigate(['/edit-profile'], this.navOptions);
    };
    ProfileComponent.prototype.getUserData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userService.getUserData(this.userId)];
                    case 1:
                        res = _a.sent();
                        console.log(res.data);
                        this.isInitialized = true;
                        if (res.data) {
                            this.user.deserialize(res.data);
                            this.user.imageUrl = this._componentService.getImageProfileV2(this.user.imageUrl);
                            this.projects.unshift({ type: 'header' });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.isInitialized = true;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProfileComponent.prototype.getUserAllProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, i, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._projectService.getUserAllProject(this.userId, this.page, this.limit, this.orderBy)];
                    case 1:
                        res = _a.sent();
                        this.isProjectEmpty = (!res.data.length) ? true : false;
                        this.isProjectInitialized = true;
                        this.isProjectLoading = false;
                        for (i = 0; i < res.data.length; i++) {
                            if (res.data[0].studentId !== 0) {
                                res.data[i].imageUrl = this._componentService.getImageCover(res.data[i].studentId.imageUrl);
                            }
                            else {
                                res.data[i].imageUrl = '';
                            }
                            res.data[i].type = 'projects';
                            this.projects.push(res.data[i]);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        this.isProjectLoading = false;
                        this.isProjectInitialized = true;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: "profile-page",
            moduleId: module.id,
            templateUrl: "./profile-page.component.html",
            styleUrls: ['./profile-page.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            user_service_1.UserService,
            project_service_1.ProjectService,
            component_event_service_1.ComponentEventService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2ZpbGUtcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCxzREFBK0Q7QUFFL0QsU0FBUztBQUNULDBEQUE0RDtBQUU1RCxTQUFTO0FBQ1Qsc0RBQStDO0FBRS9DLFdBQVc7QUFDWCw0REFBMEQ7QUFDMUQsa0VBQWdFO0FBQ2hFLGtGQUErRTtBQVUvRTtJQW1CSSwwQkFDWSxpQkFBbUMsRUFDbkMsWUFBeUIsRUFDekIsZUFBK0IsRUFDL0IsaUJBQXdDO1FBSHhDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFwQnBELFdBQU0sR0FBVyxDQUFDLENBQUM7UUFFbkIsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUVuQixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsWUFBTyxHQUFXLE1BQU0sQ0FBQztRQUV6QixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMseUJBQW9CLEdBQVksS0FBSyxDQUFDO1FBQ3RDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBVzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDL0QsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JB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LENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDbkM7Ozs7d0JBR0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQzt3QkFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQzs7Ozs7O0tBRXhDO0lBdEhRLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDOUMsQ0FBQzt5Q0FxQmlDLHlCQUFnQjtZQUNyQiwwQkFBVztZQUNSLGdDQUFjO1lBQ1osK0NBQXFCO09BdkIzQyxnQkFBZ0IsQ0F3SDVCO0lBQUQsdUJBQUM7Q0FBQSxBQXhIRCxJQXdIQztBQXhIWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG4vLyBPVEhFUlNcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5cbi8vIE1PREVMU1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xuXG4vLyBTRVJWSUNFU1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQcm9qZWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wcm9qZWN0LnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuXG5kZWNsYXJlIHZhciBVSVRhYmxlVmlld0NlbGxTZWxlY3Rpb25TdHlsZTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwcm9maWxlLXBhZ2VcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcHJvZmlsZS1wYWdlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvZmlsZS1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZmlsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICB1c2VyOiBVc2VyO1xuICAgIHVzZXJJZDogbnVtYmVyID0gMDtcblxuICAgIHByb2plY3RzOiBhbnkgPSBbXTtcblxuICAgIHBhZ2U6IG51bWJlciA9IDE7XG4gICAgbGltaXQ6IG51bWJlciA9IDEwO1xuICAgIG9yZGVyQnk6IHN0cmluZyA9ICdERVNDJzsgXG5cbiAgICBpc1Byb2plY3RFbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzUHJvamVjdExvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGlzUHJvamVjdEluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgbmF2T3B0aW9uczogYW55O1xuXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9wcm9qZWN0U2VydmljZTogUHJvamVjdFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcbiAgICApIHtcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRSb3V0ZU9wdGlvbnMoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLl91c2VyU2VydmljZS5nZXRDdXJyZW50VXNlcklkKCk7XG4gICAgICAgIHRoaXMuZ2V0VXNlckRhdGEoKTtcbiAgICAgICAgdGhpcy5nZXRVc2VyQWxsUHJvamVjdCgpO1xuICAgIH1cblxuICAgIG9uSXRlbUxvYWRpbmcoYXJncykge1xuICAgICAgICBpZihhcHBsaWNhdGlvbi5pb3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGlvc0NlbGwgPSBhcmdzLmlvcztcbiAgICAgICAgICAgIGlvc0NlbGwuc2VsZWN0aW9uU3R5bGUgPSBVSVRhYmxlVmlld0NlbGxTZWxlY3Rpb25TdHlsZS5Ob25lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25UYXAoKSB7fVxuXG4gICAgdmlld1Byb2plY3QocHJvamVjdCkge1xuICAgICAgICBpZihwcm9qZWN0LnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnQWxlcnQnLCAnWW91IGNhblxcJ3QgdmlldyBwZW5kaW5nIHByb2plY3RzLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9ZWxzZSBpZighcHJvamVjdC5zdHVkZW50SWQgJiYgcHJvamVjdC5zdGF0dXMgPT09ICdhcHByb3ZlZCcpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdObyBzdHVkZW50IGZvdW5kJywgJ1lvdSBtdXN0IGNvbXBsZXRlIHRoZSBsYXN0IHN0ZXAgYnkgY2xpY2tpbmcgcHJvamVjdCB0YWIgYW5kIGFkZCBhIHN0dWRlbnQuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3Byb2plY3QnLCBwcm9qZWN0LnByb2plY3RJZF0sIHRoaXMubmF2T3B0aW9ucylcbiAgICB9XG5cbiAgICB0ZW1wbGF0ZVNlbGVjdG9yKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgaXRlbXM6IGFueSkge1xuICAgICAgICByZXR1cm4gaXRlbS50eXBlO1xuICAgIH1cblxuICAgIHNlZVBvc3QocHJvamVjdCkge1xuICAgICAgICBpZihwcm9qZWN0LnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnQWxlcnQnLCAnUHJvamVjdCBzdGlsbCBwZW5kaW5nLiBQbGVhc2Ugd2FpdCBmb3IgdGhlIHByb2plY3QgbWFuYWdlciB0byBhcHByb3ZlIGl0LicpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvcHJvamVjdCcsIHByb2plY3QucHJvamVjdElkXSwgdGhpcy5uYXZPcHRpb25zKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ290b1NldHRpbmdzKCkge1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3NldHRpbmdzJ10sIHRoaXMubmF2T3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZ290b0VkaXRQcm9maWxlKCkge1xuICAgICAgICB0aGlzLm5hdk9wdGlvbnMudHJhbnNpdGlvbi5uYW1lID0gJ3NsaWRlTGVmdCc7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvZWRpdC1wcm9maWxlJ10sIHRoaXMubmF2T3B0aW9ucyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0VXNlckRhdGEoKSB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5nZXRVc2VyRGF0YSh0aGlzLnVzZXJJZCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSlcbiAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICBpZihyZXMuZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlci5kZXNlcmlhbGl6ZShyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyLmltYWdlVXJsID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRJbWFnZVByb2ZpbGVWMih0aGlzLnVzZXIuaW1hZ2VVcmwpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdHMudW5zaGlmdCh7IHR5cGU6ICdoZWFkZXInIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGdldFVzZXJBbGxQcm9qZWN0KCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fcHJvamVjdFNlcnZpY2UuZ2V0VXNlckFsbFByb2plY3QodGhpcy51c2VySWQsIHRoaXMucGFnZSwgdGhpcy5saW1pdCwgdGhpcy5vcmRlckJ5KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5pc1Byb2plY3RFbXB0eSA9ICghcmVzLmRhdGEubGVuZ3RoKT8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc1Byb2plY3RJbml0aWFsaXplZCA9IHRydWU7IFxuICAgICAgICAgICAgdGhpcy5pc1Byb2plY3RMb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZXMuZGF0YS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgaWYocmVzLmRhdGFbMF0uc3R1ZGVudElkICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhW2ldLmltYWdlVXJsID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRJbWFnZUNvdmVyKHJlcy5kYXRhW2ldLnN0dWRlbnRJZC5pbWFnZVVybCk7XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVtpXS5pbWFnZVVybCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXMuZGF0YVtpXS50eXBlID0gJ3Byb2plY3RzJ1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdHMucHVzaChyZXMuZGF0YVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNQcm9qZWN0TG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc1Byb2plY3RJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICBcbn1cblxuXG5cblxuIl19