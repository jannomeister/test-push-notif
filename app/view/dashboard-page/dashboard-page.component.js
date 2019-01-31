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
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var project_service_1 = require("../../services/project.service");
var component_event_service_1 = require("../../services/component-event.service");
var coachmark_service_1 = require("../../services/coachmark.service");
var moment = require("moment");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(modal, vcRef, _routerExtensions, _projectService, _componentService, _coachMarkService) {
        this.modal = modal;
        this.vcRef = vcRef;
        this._routerExtensions = _routerExtensions;
        this._projectService = _projectService;
        this._componentService = _componentService;
        this._coachMarkService = _coachMarkService;
        this.posts = [];
        this.page = 1;
        this.limit = 2;
        this.orderBy = 'DESC';
        this.hasData = false;
        this.isEmpty = false;
        this.isInitialized = false;
        this.getAllPosts();
        this.navOptions = this._componentService.getRouteOptions();
    }
    DashboardComponent.prototype.ngOnInit = function () { };
    DashboardComponent.prototype.loadMoreItems = function () {
        this.page++;
        this.getAllPosts();
    };
    DashboardComponent.prototype.refreshList = function (args) {
        var pullRefresh = args.object;
        this.page = 1;
        this.posts = [];
        this.getAllPosts();
        pullRefresh.refreshing = false;
    };
    DashboardComponent.prototype.shareProject = function () {
        this.navOptions.clearHistory = false;
        this.navOptions.transition = 'slideTop';
        this._routerExtensions.navigate(["/media"], this.navOptions);
    };
    DashboardComponent.prototype.startProject = function () {
        this.navOptions.transition = 'slideTop';
        this._routerExtensions.navigate(["/start-project"], this.navOptions);
    };
    DashboardComponent.prototype.seePost = function (projectId) {
        this._routerExtensions.navigate(['/project', projectId], this.navOptions);
    };
    DashboardComponent.prototype.formatDate = function (dateStart) {
        var date = new Date(dateStart);
        return moment(date).format('LL');
    };
    DashboardComponent.prototype.getCaption = function (school, state) {
        school = (state) ? this.formatName(school) + "," : school;
        return school + " " + state;
    };
    DashboardComponent.prototype.formatName = function (str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
    DashboardComponent.prototype.getAllPosts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, i, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._projectService.getAllProject(this.page, this.limit, this.orderBy)];
                    case 1:
                        res = _a.sent();
                        this.isInitialized = true;
                        if (res.data.length > 0) {
                            for (i = 0; i < res.data.length; i++) {
                                res.data[i].userId.name = this.formatName(res.data[i].userId.firstName + " " + res.data[i].userId.lastName);
                                res.data[i].userId.country = (res.data[i].userId.country) ? 'in ' + res.data[i].userId.country : "";
                                res.data[i].description = res.data[i].projectDescription;
                                res.data[i].userId.imageUrl = this._componentService.getImageProfile(res.data[i].userId.imageUrl);
                                res.data[i].imageUrl = this._componentService.getImageFeed(res.data[i].studentId.imageUrl);
                                console.log("IMAGE::::");
                                console.log(res.data[i].imageUrl);
                                res.data[i].description = res.data[i].projectDescription;
                                this.posts.push(res.data[i]);
                            }
                        }
                        this.isEmpty = (this.posts.length === 0) ? true : false;
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
    DashboardComponent = __decorate([
        core_1.Component({
            selector: "dashboard-page",
            moduleId: module.id,
            templateUrl: "./dashboard-page.component.html",
            styleUrls: ['./dashboard-page.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogService,
            core_1.ViewContainerRef,
            router_1.RouterExtensions,
            project_service_1.ProjectService,
            component_event_service_1.ComponentEventService,
            coachmark_service_1.CoachMarkService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFzaGJvYXJkLXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFDcEUsc0RBQStEO0FBSS9ELG1FQUE2RTtBQUM3RSxrRUFBZ0U7QUFDaEUsa0ZBQStFO0FBQy9FLHNFQUFvRTtBQUVwRSwrQkFBaUM7QUFTakM7SUFhSSw0QkFDWSxLQUF5QixFQUMvQixLQUF1QixFQUNqQixpQkFBbUMsRUFDbkMsZUFBK0IsRUFDL0IsaUJBQXdDLEVBQ3hDLGlCQUFtQztRQUxuQyxVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUMvQixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUNqQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBQ3hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFqQi9DLFVBQUssR0FBUSxFQUFFLENBQUM7UUFDaEIsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUNqQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFlBQU8sR0FBVyxNQUFNLENBQUM7UUFFekIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBWTNCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMvRCxDQUFDO0lBRUQscUNBQVEsR0FBUixjQUFZLENBQUM7SUFFYiwwQ0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFB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QUMsUUFBVSxDQUFDLENBQUM7Z0NBQzVHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0NBQ2xHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUM7Z0NBQ3pELEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dDQUNsRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dDQUMzRixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO2dDQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUE7Z0NBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUM7Z0NBQ3pELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTs2QkFFL0I7eUJBQ0o7d0JBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzs7Ozt3QkFHdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7Ozs7OztLQUVqQztJQXRHUSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7U0FDaEQsQ0FBQzt5Q0FlcUIsNEJBQWtCO1lBQ3hCLHVCQUFnQjtZQUNFLHlCQUFnQjtZQUNsQixnQ0FBYztZQUNaLCtDQUFxQjtZQUNyQixvQ0FBZ0I7T0FuQnRDLGtCQUFrQixDQXdHOUI7SUFBRCx5QkFBQztDQUFBLEFBeEdELElBd0dDO0FBeEdZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IFNoYXJlUHJvamVjdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi92aWV3L3NoYXJlcHJvamVjdC1wYWdlL3NoYXJlcHJvamVjdC1wYWdlLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBQcm9qZWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wcm9qZWN0LnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29hY2hNYXJrU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb2FjaG1hcmsuc2VydmljZVwiO1xuXG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJkYXNoYm9hcmQtcGFnZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9kYXNoYm9hcmQtcGFnZS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL2Rhc2hib2FyZC1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHsgIFxuICAgXG4gICAgcG9zdHM6IGFueSA9IFtdO1xuICAgIHBhZ2U6IG51bWJlciA9IDE7XG4gICAgbGltaXQ6IG51bWJlciA9IDI7XG4gICAgb3JkZXJCeTogc3RyaW5nID0gJ0RFU0MnOyBcbiAgICBlcnJvcm1zZzogc3RyaW5nO1xuICAgIGhhc0RhdGE6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc0VtcHR5OiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgbmF2T3B0aW9uczogYW55O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSwgXG5cdFx0cHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgX3Byb2plY3RTZXJ2aWNlOiBQcm9qZWN0U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfY29tcG9uZW50U2VydmljZTogQ29tcG9uZW50RXZlbnRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9jb2FjaE1hcmtTZXJ2aWNlOiBDb2FjaE1hcmtTZXJ2aWNlLFxuICAgICkge1xuICAgICAgICB0aGlzLmdldEFsbFBvc3RzKCk7XG5cbiAgICAgICAgdGhpcy5uYXZPcHRpb25zID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRSb3V0ZU9wdGlvbnMoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHt9XG5cbiAgICBsb2FkTW9yZUl0ZW1zKCkge1xuICAgICAgICB0aGlzLnBhZ2UrKztcbiAgICAgICAgdGhpcy5nZXRBbGxQb3N0cygpO1xuICAgIH1cblxuICAgIHJlZnJlc2hMaXN0KGFyZ3MpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBwdWxsUmVmcmVzaCA9IGFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIHRoaXMucGFnZSA9IDE7XG4gICAgICAgIHRoaXMucG9zdHMgPSBbXVxuICAgICAgICB0aGlzLmdldEFsbFBvc3RzKCk7XG5cbiAgICAgICAgcHVsbFJlZnJlc2gucmVmcmVzaGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNoYXJlUHJvamVjdCgpIHtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zLmNsZWFySGlzdG9yeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5hdk9wdGlvbnMudHJhbnNpdGlvbiA9ICdzbGlkZVRvcCc7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL21lZGlhXCJdLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgIH1cblxuICAgIHN0YXJ0UHJvamVjdCgpIHtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zLnRyYW5zaXRpb24gPSAnc2xpZGVUb3AnO1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9zdGFydC1wcm9qZWN0XCJdLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgIH1cblxuICAgIHNlZVBvc3QocHJvamVjdElkKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvcHJvamVjdCcsIHByb2plY3RJZF0sIHRoaXMubmF2T3B0aW9ucylcbiAgICB9XG5cbiAgICBmb3JtYXREYXRlKGRhdGVTdGFydCkge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdGFydCk7XG5cbiAgICAgICAgcmV0dXJuIG1vbWVudChkYXRlKS5mb3JtYXQoJ0xMJyk7XG4gICAgfVxuXG4gICAgZ2V0Q2FwdGlvbihzY2hvb2wsIHN0YXRlKSB7XG4gICAgICAgIHNjaG9vbCA9IChzdGF0ZSk/IHRoaXMuZm9ybWF0TmFtZShzY2hvb2wpICsgXCIsXCIgOiBzY2hvb2w7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYCR7c2Nob29sfSAke3N0YXRlfWA7XG4gICAgfVxuXG4gICAgZm9ybWF0TmFtZShzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHdcXFMqL2csIGZ1bmN0aW9uKHR4dCl7XG4gICAgICAgICAgICByZXR1cm4gdHh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdHh0LnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRBbGxQb3N0cygpIHtcblxuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fcHJvamVjdFNlcnZpY2UuZ2V0QWxsUHJvamVjdCh0aGlzLnBhZ2UsIHRoaXMubGltaXQsIHRoaXMub3JkZXJCeSk7XG4gICAgICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYocmVzLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZXMuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVtpXS51c2VySWQubmFtZSA9IHRoaXMuZm9ybWF0TmFtZShgJHtyZXMuZGF0YVtpXS51c2VySWQuZmlyc3ROYW1lfSAke3Jlcy5kYXRhW2ldLnVzZXJJZC5sYXN0TmFtZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGFbaV0udXNlcklkLmNvdW50cnkgPSAocmVzLmRhdGFbaV0udXNlcklkLmNvdW50cnkpPyAnaW4gJyArIHJlcy5kYXRhW2ldLnVzZXJJZC5jb3VudHJ5OiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVtpXS5kZXNjcmlwdGlvbiA9IHJlcy5kYXRhW2ldLnByb2plY3REZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGFbaV0udXNlcklkLmltYWdlVXJsID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRJbWFnZVByb2ZpbGUocmVzLmRhdGFbaV0udXNlcklkLmltYWdlVXJsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGFbaV0uaW1hZ2VVcmwgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldEltYWdlRmVlZChyZXMuZGF0YVtpXS5zdHVkZW50SWQuaW1hZ2VVcmwpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklNQUdFOjo6OlwiKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YVtpXS5pbWFnZVVybClcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGFbaV0uZGVzY3JpcHRpb24gPSByZXMuZGF0YVtpXS5wcm9qZWN0RGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zdHMucHVzaChyZXMuZGF0YVtpXSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmlzRW1wdHkgPSAodGhpcy5wb3N0cy5sZW5ndGggPT09IDApPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgIFxufVxuXG5cblxuXG4iXX0=