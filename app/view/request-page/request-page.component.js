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
var user_service_1 = require("../../services/user.service");
var project_member_service_1 = require("../../services/project-member.service");
var component_event_service_1 = require("../../services/component-event.service");
var RequestComponent = /** @class */ (function () {
    function RequestComponent(_activatedRoute, _routerExtensions, _userService, _projectMemberService, _componentService) {
        var _this = this;
        this._activatedRoute = _activatedRoute;
        this._routerExtensions = _routerExtensions;
        this._userService = _userService;
        this._projectMemberService = _projectMemberService;
        this._componentService = _componentService;
        this.userId = 0;
        this.projectMemberId = 0;
        this.data = {
            name: '',
            imageUrl: '',
            reason: '',
            datetimeCreated: ''
        };
        this.userId = this._userService.getCurrentUserId();
        this.navOptions = this._componentService.getRouteOptions();
        this._activatedRoute.queryParams.subscribe(function (params) {
            _this.projectMemberId = params['projectMemberId'];
            _this.data.name = params['name'];
            _this.data.imageUrl = params['imageUrl'];
            _this.data.reason = params['reason'];
            _this.data.datetimeCreated = params['datetimeCreated'];
            _this.activeTab = params['activeTab'];
        });
    }
    RequestComponent.prototype.ngOnInit = function () { };
    RequestComponent.prototype.confirmation = function (type) {
        var data = {
            userId: this.userId,
            requestStatus: type
        };
        this.approveRequest(this.projectMemberId, data);
    };
    RequestComponent.prototype.approveRequest = function (projectMemberId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
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
                            this.navOptions.clearHistory = true;
                            this._routerExtensions.navigate(["/notification"], this.navOptions);
                            this._componentService.showSuccessFeedback('', 'Successfully confirmed!');
                        }
                        else {
                            this._componentService.showErrorFeedback('Ooops!', 'Something went wrong!');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this._componentService.hideLoader();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RequestComponent = __decorate([
        core_1.Component({
            selector: "request-page",
            moduleId: module.id,
            templateUrl: "./request-page.component.html",
            styleUrls: ['./request-page.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_2.RouterExtensions,
            user_service_1.UserService,
            project_member_service_1.ProjectMemberService,
            component_event_service_1.ComponentEventService])
    ], RequestComponent);
    return RequestComponent;
}());
exports.RequestComponent = RequestComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVlc3QtcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsc0RBQStEO0FBRS9ELDREQUEwRDtBQUMxRCxnRkFBNkU7QUFDN0Usa0ZBQStFO0FBUS9FO0lBZ0JJLDBCQUNZLGVBQStCLEVBQy9CLGlCQUFtQyxFQUNuQyxZQUF5QixFQUN6QixxQkFBMkMsRUFDM0MsaUJBQXdDO1FBTHBELGlCQW9CQztRQW5CVyxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUN6QiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXNCO1FBQzNDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFuQnBELFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFJNUIsU0FBSSxHQUFRO1lBQ1IsSUFBSSxFQUFFLEVBQUU7WUFDUixRQUFRLEVBQUUsRUFBRTtZQUNaLE1BQU0sRUFBRSxFQUFFO1lBQ1YsZUFBZSxFQUFFLEVBQUU7U0FDdEIsQ0FBQztRQVdFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRTNELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFFN0MsS0FBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUNoRCxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEMsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hDLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwQyxLQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUV0RCxLQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxtQ0FBUSxHQUFSLGNBQVksQ0FBQztJQUViLHVDQUFZLEdBQVosVUFBYSxJQUFJO1FBRWIsSUFBSSxJQUFJLEdBQUc7WUFDUCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsYUFBYSxFQUFFLElBQUk7U0FDdEIsQ0FBQTtRQUVELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0lBR0sseUNBQWMsR0FBcEIsVUFBcUIsZUFBZSxFQUFFLElBQUk7Ozs7Ozt3QkFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQzs7Ozt3QkFHbEMscUJBQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEVBQUE7O3dCQUE1RSxHQUFHLEdBQUcsU0FBc0U7d0JBRWhGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDcEMsSUFBRyxHQUFHLENBQUMsT0FBTyxFQUFFOzRCQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzs0QkFDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDcEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLEVBQUUsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO3lCQUM3RTs2QkFBSTs0QkFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLHVCQUF1QixDQUFDLENBQUM7eUJBQy9FOzs7O3dCQUVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7Ozs7O0tBRTNDO0lBcEVRLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDOUMsQ0FBQzt5Q0FrQitCLHVCQUFjO1lBQ1oseUJBQWdCO1lBQ3JCLDBCQUFXO1lBQ0YsNkNBQW9CO1lBQ3hCLCtDQUFxQjtPQXJCM0MsZ0JBQWdCLENBc0U1QjtJQUFELHVCQUFDO0NBQUEsQUF0RUQsSUFzRUM7QUF0RVksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFByb2plY3RNZW1iZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3Byb2plY3QtbWVtYmVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJyZXF1ZXN0LXBhZ2VcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcmVxdWVzdC1wYWdlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vcmVxdWVzdC1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgUmVxdWVzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICB1c2VySWQ6IG51bWJlciA9IDA7XG4gICAgcHJvamVjdE1lbWJlcklkOiBudW1iZXIgPSAwO1xuXG4gICAgYWN0aXZlVGFiOiBzdHJpbmc7XG5cbiAgICBkYXRhOiBhbnkgPSB7XG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBpbWFnZVVybDogJycsXG4gICAgICAgIHJlYXNvbjogJycsXG4gICAgICAgIGRhdGV0aW1lQ3JlYXRlZDogJydcbiAgICB9O1xuXG4gICAgbmF2T3B0aW9uczogYW55O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2FjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9wcm9qZWN0TWVtYmVyU2VydmljZTogUHJvamVjdE1lbWJlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcbiAgICApIHsgICBcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLl91c2VyU2VydmljZS5nZXRDdXJyZW50VXNlcklkKCk7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucyA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0Um91dGVPcHRpb25zKCk7XG5cbiAgICAgICAgdGhpcy5fYWN0aXZhdGVkUm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMucHJvamVjdE1lbWJlcklkID0gcGFyYW1zWydwcm9qZWN0TWVtYmVySWQnXVxuICAgICAgICAgICAgdGhpcy5kYXRhLm5hbWUgPSBwYXJhbXNbJ25hbWUnXTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5pbWFnZVVybCA9IHBhcmFtc1snaW1hZ2VVcmwnXTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5yZWFzb24gPSBwYXJhbXNbJ3JlYXNvbiddO1xuICAgICAgICAgICAgdGhpcy5kYXRhLmRhdGV0aW1lQ3JlYXRlZCA9IHBhcmFtc1snZGF0ZXRpbWVDcmVhdGVkJ107XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlVGFiID0gcGFyYW1zWydhY3RpdmVUYWInXTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHt9XG5cbiAgICBjb25maXJtYXRpb24odHlwZSkge1xuXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcbiAgICAgICAgICAgIHJlcXVlc3RTdGF0dXM6IHR5cGVcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXBwcm92ZVJlcXVlc3QodGhpcy5wcm9qZWN0TWVtYmVySWQsIGRhdGEpXG4gICAgfVxuXG5cbiAgICBhc3luYyBhcHByb3ZlUmVxdWVzdChwcm9qZWN0TWVtYmVySWQsIGRhdGEpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdMb2FkaW5nLi4uJyk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9wcm9qZWN0TWVtYmVyU2VydmljZS5hcHByb3ZlUmVxdWVzdChwcm9qZWN0TWVtYmVySWQsIGRhdGEpO1xuXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIGlmKHJlcy5zdWNjZXNzKSB7IFxuICAgICAgICAgICAgICAgIHRoaXMubmF2T3B0aW9ucy5jbGVhckhpc3RvcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL25vdGlmaWNhdGlvblwiXSwgdGhpcy5uYXZPcHRpb25zKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dTdWNjZXNzRmVlZGJhY2soJycsICdTdWNjZXNzZnVsbHkgY29uZmlybWVkIScpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93RXJyb3JGZWVkYmFjaygnT29vcHMhJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICBcbn0iXX0=