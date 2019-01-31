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
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var segmented_bar_1 = require("ui/segmented-bar");
var user_service_1 = require("../../services/user.service");
var socket_service_1 = require("../../services/socket.service");
var notification_service_1 = require("../../services/notification.service");
var project_member_service_1 = require("../../services/project-member.service");
var component_event_service_1 = require("../../services/component-event.service");
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(_activatedRoute, _routerExtensions, _userService, _socketService, _componentService, _notificationService, _projectMemberService) {
        var _this = this;
        this._activatedRoute = _activatedRoute;
        this._routerExtensions = _routerExtensions;
        this._userService = _userService;
        this._socketService = _socketService;
        this._componentService = _componentService;
        this._notificationService = _notificationService;
        this._projectMemberService = _projectMemberService;
        this.isEmpty = false;
        this.isInitialized = false;
        this.userId = 0;
        this.items = [];
        this.selectedIndex = 0;
        this.categories = ['Notifications', 'Requests'];
        this.visibility1 = true;
        this.visibility2 = false;
        this.notifications = [];
        this.requests = [];
        this.page = 1;
        this.limit = 10;
        this.orderBy = 'DESC';
        this.navOptions = this._componentService.getRouteOptions();
        this._activatedRoute.queryParams.subscribe(function (params) {
            _this.activeTab = (params['activeTab'] === 'home') ? params['activeTab'] : ((params['activeTab'] === 'settings') ? params['activeTab'] : 'home');
        });
        this.generateSegmentBar();
    }
    NotificationComponent.prototype.ngOnInit = function () {
        this.userId = this._userService.getCurrentUserId();
        this.checkSocketChanges();
    };
    NotificationComponent.prototype.generateSegmentBar = function () {
        for (var i = 0; i < this.categories.length; i++) {
            var segmentedBarItem = new segmented_bar_1.SegmentedBarItem();
            segmentedBarItem.title = this.categories[i];
            this.items.push(segmentedBarItem);
        }
    };
    NotificationComponent.prototype.checkSocketChanges = function () {
        var _this = this;
        this._socketService.getSocketInstance().on('USER-' + this.userId, function (data) {
            if (data.hasNotif) {
                _this.isEmpty = false;
                if (data.data.notifType === 'normal') {
                    data.data.fromUserId.imageUrl = _this._componentService.getImageProfile(data.data.fromUserId.imageUrl);
                    _this.notifications.unshift(data.data);
                }
                else if (data.data.notifType === 'request') {
                    data.data.imageUrl = _this._componentService.getImageProfile(data.data.imageUrl);
                    _this.requests.unshift(data.data);
                }
            }
        });
    };
    NotificationComponent.prototype.notifIsClick = function (notification) {
        console.log("navigate to project page");
        // this._routerExtensions.navigate(['/project', notification.projectId], this.navOptions);
    };
    NotificationComponent.prototype.loadMoreItems = function (type) {
        this.page += 1;
        if (type === 'all') {
            this.getNotifications();
        }
        else if (type === 'requests') {
            this.getRequests();
        }
    };
    NotificationComponent.prototype.refreshList = function (args, type) {
        var pullRefresh = args.object;
        this.page = 1;
        if (type === 'all') {
            this.notifications = [];
            this.getNotifications();
        }
        else if (type === 'requests') {
            this.requests = [];
            this.getRequests();
        }
        pullRefresh.refreshing = false;
    };
    NotificationComponent.prototype.onSelectedIndexChange = function (args) {
        var segmetedBar = args.object;
        this.selectedIndex = segmetedBar.selectedIndex;
        switch (this.selectedIndex) {
            case 0:
                this.page = 1;
                this.notifications = [];
                this.getNotifications();
                this.visibility1 = true;
                this.visibility2 = false;
                this.isInitialized = false;
                this.isEmpty = false;
                break;
            case 1:
                this.page = 1;
                this.requests = [];
                this.getRequests();
                this.visibility1 = false;
                this.visibility2 = true;
                this.isInitialized = false;
                this.isEmpty = false;
                break;
            default:
                break;
        }
    };
    NotificationComponent.prototype.viewRequestInfo = function (data) {
        data.activeTab = this.activeTab;
        this.navOptions.queryParams = data;
        this._routerExtensions.navigate(["/request"], this.navOptions);
    };
    NotificationComponent.prototype.confirmation = function (projectMemberId, type) {
        var data = {
            userId: this.userId,
            requestStatus: type
        };
        this.approveRequest(projectMemberId, data);
    };
    NotificationComponent.prototype.getNotifications = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, i, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._notificationService.getNotifications(this.userId, this.page, this.limit, this.orderBy)];
                    case 1:
                        res = _a.sent();
                        this.isInitialized = true;
                        if (res.data.length > 0) {
                            for (i = 0; i < res.data.length; i++) {
                                res.data[i].fromUserId.imageUrl = this._componentService.getProjectManageProfile(res.data[i].fromUserId.imageUrl);
                                res.data[i].fromUserId.fullName = res.data[i].fromUserId.firstName + ' ' + res.data[i].fromUserId.lastName;
                                this.notifications.push(res.data[i]);
                            }
                        }
                        this.isEmpty = (this.notifications.length === 0) ? true : false;
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
    NotificationComponent.prototype.getRequests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, i, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._notificationService.getRequests(this.userId, this.page, this.limit, this.orderBy)];
                    case 1:
                        res = _a.sent();
                        this.isInitialized = true;
                        if (res.data.length > 0) {
                            for (i = 0; i < res.data.length; i++) {
                                console.log(res.data[i]);
                                res.data[i].imageUrl = this._componentService.getImageProfile(res.data[i].imageUrl);
                                this.requests.push(res.data[i]);
                            }
                        }
                        this.isEmpty = (this.requests.length === 0) ? true : false;
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        this.isInitialized = true;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NotificationComponent.prototype.approveRequest = function (projectMemberId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._componentService.showLoader('Loading...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._projectMemberService.approveRequest(projectMemberId, data)];
                    case 2:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.success) {
                            this.requests = [];
                            this.getRequests();
                            this._componentService.showSuccessFeedback('', 'Successfully confirmed!');
                        }
                        else {
                            this._componentService.showErrorFeedback('Ooops!', 'Something went wrong!');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        this._componentService.hideLoader();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NotificationComponent = __decorate([
        core_1.Component({
            selector: "notification-page",
            moduleId: module.id,
            templateUrl: "./notification-page.component.html",
            styleUrls: ['./notification-page.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_2.RouterExtensions,
            user_service_1.UserService,
            socket_service_1.SocketService,
            component_event_service_1.ComponentEventService,
            notification_service_1.NotificationService,
            project_member_service_1.ProjectMemberService])
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm90aWZpY2F0aW9uLXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBdUU7QUFDdkUsMENBQWlEO0FBQ2pELHNEQUErRDtBQUMvRCxrREFBa0U7QUFHbEUsNERBQTBEO0FBQzFELGdFQUE4RDtBQUM5RCw0RUFBMEU7QUFDMUUsZ0ZBQTZFO0FBQzdFLGtGQUErRTtBQVcvRTtJQW9CSSwrQkFDWSxlQUErQixFQUMvQixpQkFBbUMsRUFDbkMsWUFBeUIsRUFDekIsY0FBNkIsRUFDN0IsaUJBQXdDLEVBQ3hDLG9CQUF5QyxFQUN6QyxxQkFBMkM7UUFQdkQsaUJBZUM7UUFkVyxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUN6QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzQjtRQXpCdkQsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLFVBQUssR0FBNEIsRUFBRSxDQUFDO1FBQ3BDLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGVBQVUsR0FBUSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQVMsRUFB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QUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUU7NEJBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7NEJBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs0QkFDbkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLEVBQUUsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO3lCQUM3RTs2QkFBSTs0QkFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLHVCQUF1QixDQUFDLENBQUM7eUJBQy9FOzs7O3dCQUVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7Ozs7O0tBRTNDO0lBeE1RLHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztTQUNuRCxDQUFDO3lDQXNCK0IsdUJBQWM7WUFDWix5QkFBZ0I7WUFDckIsMEJBQVc7WUFDVCw4QkFBYTtZQUNWLCtDQUFxQjtZQUNsQiwwQ0FBbUI7WUFDbEIsNkNBQW9CO09BM0I5QyxxQkFBcUIsQ0EwTWpDO0lBQUQsNEJBQUM7Q0FBQSxBQTFNRCxJQTBNQztBQTFNWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSG9zdEJpbmRpbmcsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW0gfSBmcm9tIFwidWkvc2VnbWVudGVkLWJhclwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5cbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgU29ja2V0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zb2NrZXQuc2VydmljZVwiO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9ub3RpZmljYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgUHJvamVjdE1lbWJlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcHJvamVjdC1tZW1iZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50RXZlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbXBvbmVudC1ldmVudC5zZXJ2aWNlXCI7XG5cbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJub3RpZmljYXRpb24tcGFnZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ub3RpZmljYXRpb24tcGFnZS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL25vdGlmaWNhdGlvbi1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGlzRW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc0luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7IFxuICAgIHVzZXJJZDogbnVtYmVyID0gMDtcbiAgICBpdGVtczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT4gPSBbXTtcbiAgICBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAwO1xuICAgIGNhdGVnb3JpZXM6IGFueSA9IFsnTm90aWZpY2F0aW9ucycsICdSZXF1ZXN0cyddOyBcbiAgICB2aXNpYmlsaXR5MSA9IHRydWU7XG4gICAgdmlzaWJpbGl0eTIgPSBmYWxzZTtcbiAgICBub3RpZmljYXRpb25zOiBhbnkgPSBbXTtcbiAgICByZXF1ZXN0czogIGFueSA9IFtdO1xuICAgIHBhZ2U6IG51bWJlciA9IDE7XG4gICAgbGltaXQ6IG51bWJlciA9IDEwO1xuICAgIG9yZGVyQnk6IHN0cmluZyA9ICdERVNDJzsgXG5cbiAgICBuYXZPcHRpb25zOiBhbnk7XG5cbiAgICBhY3RpdmVUYWI6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9hY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfc29ja2V0U2VydmljZTogU29ja2V0U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfY29tcG9uZW50U2VydmljZTogQ29tcG9uZW50RXZlbnRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9ub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9wcm9qZWN0TWVtYmVyU2VydmljZTogUHJvamVjdE1lbWJlclNlcnZpY2UsXG4gICAgKSB7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucyA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0Um91dGVPcHRpb25zKCk7XG4gICAgICAgIHRoaXMuX2FjdGl2YXRlZFJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSAocGFyYW1zWydhY3RpdmVUYWInXSA9PT0gJ2hvbWUnKT8gcGFyYW1zWydhY3RpdmVUYWInXSA6ICgocGFyYW1zWydhY3RpdmVUYWInXSA9PT0gJ3NldHRpbmdzJyk/IHBhcmFtc1snYWN0aXZlVGFiJ10gOiAnaG9tZScpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVTZWdtZW50QmFyKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXNlcklkID0gdGhpcy5fdXNlclNlcnZpY2UuZ2V0Q3VycmVudFVzZXJJZCgpO1xuICAgICAgICB0aGlzLmNoZWNrU29ja2V0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlU2VnbWVudEJhcigpIHtcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5jYXRlZ29yaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc2VnbWVudGVkQmFySXRlbSA9IDxTZWdtZW50ZWRCYXJJdGVtPm5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XG4gICAgICAgICAgICBzZWdtZW50ZWRCYXJJdGVtLnRpdGxlID0gdGhpcy5jYXRlZ29yaWVzW2ldO1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHNlZ21lbnRlZEJhckl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tTb2NrZXRDaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLl9zb2NrZXRTZXJ2aWNlLmdldFNvY2tldEluc3RhbmNlKCkub24oJ1VTRVItJyt0aGlzLnVzZXJJZCwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmKGRhdGEuaGFzTm90aWYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihkYXRhLmRhdGEubm90aWZUeXBlID09PSAnbm9ybWFsJykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLmRhdGEuZnJvbVVzZXJJZC5pbWFnZVVybCA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0SW1hZ2VQcm9maWxlKGRhdGEuZGF0YS5mcm9tVXNlcklkLmltYWdlVXJsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLnVuc2hpZnQoZGF0YS5kYXRhKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihkYXRhLmRhdGEubm90aWZUeXBlID09PSAncmVxdWVzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5kYXRhLmltYWdlVXJsID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRJbWFnZVByb2ZpbGUoZGF0YS5kYXRhLmltYWdlVXJsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0cy51bnNoaWZ0KGRhdGEuZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBub3RpZklzQ2xpY2sobm90aWZpY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibmF2aWdhdGUgdG8gcHJvamVjdCBwYWdlXCIpXG4gICAgICAgIC8vIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvcHJvamVjdCcsIG5vdGlmaWNhdGlvbi5wcm9qZWN0SWRdLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgIH1cblxuICAgIGxvYWRNb3JlSXRlbXModHlwZSkge1xuICAgICAgICB0aGlzLnBhZ2UgKz0gMTtcblxuICAgICAgICBpZih0eXBlID09PSAnYWxsJykge1xuICAgICAgICAgICAgdGhpcy5nZXROb3RpZmljYXRpb25zKCk7XG4gICAgICAgIH1lbHNlIGlmKHR5cGUgPT09ICdyZXF1ZXN0cycpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVxdWVzdHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2hMaXN0KGFyZ3MsIHR5cGUpIHtcblxuICAgICAgICBsZXQgcHVsbFJlZnJlc2ggPSBhcmdzLm9iamVjdDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGFnZSA9IDFcblxuICAgICAgICBpZih0eXBlID09PSAnYWxsJykge1xuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zID0gW11cbiAgICAgICAgICAgIHRoaXMuZ2V0Tm90aWZpY2F0aW9ucygpO1xuICAgICAgICB9ZWxzZSBpZih0eXBlID09PSAncmVxdWVzdHMnKSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RzID0gW11cbiAgICAgICAgICAgIHRoaXMuZ2V0UmVxdWVzdHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1bGxSZWZyZXNoLnJlZnJlc2hpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgb25TZWxlY3RlZEluZGV4Q2hhbmdlKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlZ21ldGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleDtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMucGFnZSA9IDFcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldE5vdGlmaWNhdGlvbnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkxID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlID0gMVxuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdHMgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlcXVlc3RzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmlld1JlcXVlc3RJbmZvKGRhdGEpIHtcbiAgICAgICAgZGF0YS5hY3RpdmVUYWIgPSB0aGlzLmFjdGl2ZVRhYjtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zLnF1ZXJ5UGFyYW1zID0gZGF0YTtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcmVxdWVzdFwiXSwgdGhpcy5uYXZPcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25maXJtYXRpb24ocHJvamVjdE1lbWJlcklkLCB0eXBlKSB7XG5cbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxuICAgICAgICAgICAgcmVxdWVzdFN0YXR1czogdHlwZVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHByb3ZlUmVxdWVzdChwcm9qZWN0TWVtYmVySWQsIGRhdGEpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldE5vdGlmaWNhdGlvbnMoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fbm90aWZpY2F0aW9uU2VydmljZS5nZXROb3RpZmljYXRpb25zKHRoaXMudXNlcklkLCB0aGlzLnBhZ2UsIHRoaXMubGltaXQsIHRoaXMub3JkZXJCeSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYocmVzLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZXMuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVtpXS5mcm9tVXNlcklkLmltYWdlVXJsID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRQcm9qZWN0TWFuYWdlUHJvZmlsZShyZXMuZGF0YVtpXS5mcm9tVXNlcklkLmltYWdlVXJsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGFbaV0uZnJvbVVzZXJJZC5mdWxsTmFtZSA9ICByZXMuZGF0YVtpXS5mcm9tVXNlcklkLmZpcnN0TmFtZSArICcgJyArIHJlcy5kYXRhW2ldLmZyb21Vc2VySWQubGFzdE5hbWVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLnB1c2gocmVzLmRhdGFbaV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmlzRW1wdHkgPSAodGhpcy5ub3RpZmljYXRpb25zLmxlbmd0aCA9PT0gMCk/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGdldFJlcXVlc3RzKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX25vdGlmaWNhdGlvblNlcnZpY2UuZ2V0UmVxdWVzdHModGhpcy51c2VySWQsIHRoaXMucGFnZSwgdGhpcy5saW1pdCwgdGhpcy5vcmRlckJ5KVxuICAgXG4gICAgICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZihyZXMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHJlcy5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhW2ldKVxuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVtpXS5pbWFnZVVybCA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0SW1hZ2VQcm9maWxlKHJlcy5kYXRhW2ldLmltYWdlVXJsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0cy5wdXNoKHJlcy5kYXRhW2ldKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaXNFbXB0eSA9ICh0aGlzLnJlcXVlc3RzLmxlbmd0aCA9PT0gMCk/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBhcHByb3ZlUmVxdWVzdChwcm9qZWN0TWVtYmVySWQsIGRhdGEpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdMb2FkaW5nLi4uJylcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3Byb2plY3RNZW1iZXJTZXJ2aWNlLmFwcHJvdmVSZXF1ZXN0KHByb2plY3RNZW1iZXJJZCwgZGF0YSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgaWYocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RzID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZXF1ZXN0cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd1N1Y2Nlc3NGZWVkYmFjaygnJywgJ1N1Y2Nlc3NmdWxseSBjb25maXJtZWQhJyk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dFcnJvckZlZWRiYWNrKCdPb29wcyEnLCAnU29tZXRoaW5nIHdlbnQgd3JvbmchJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgIFxufSJdfQ==