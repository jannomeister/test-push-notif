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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var page_1 = require("ui/page");
// SERVICES
var component_event_service_1 = require("../../services/component-event.service");
var JoinProjectGuideComponent = /** @class */ (function () {
    function JoinProjectGuideComponent(_page, _routerExtensions, _componentService) {
        this._page = _page;
        this._routerExtensions = _routerExtensions;
        this._componentService = _componentService;
        this.navOptions = this._componentService.getRouteOptions();
        this._page.actionBarHidden = true;
    }
    JoinProjectGuideComponent.prototype.ngOnInit = function () { };
    JoinProjectGuideComponent.prototype.goto = function (route) {
        var _this = this;
        this._componentService.showLoader('Loading...');
        setTimeout(function () {
            _this._componentService.hideLoader();
            _this.navOptions.clearHistory = true;
            _this.navOptions.transition.name = 'slideLeft';
            _this._routerExtensions.navigate([route], _this.navOptions);
        }, 800);
    };
    JoinProjectGuideComponent = __decorate([
        core_1.Component({
            selector: "join-project-guide-page",
            moduleId: module.id,
            templateUrl: "./join-project-guide-page.component.html",
            styleUrls: ['./join-project-guide-page.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.RouterExtensions,
            component_event_service_1.ComponentEventService])
    ], JoinProjectGuideComponent);
    return JoinProjectGuideComponent;
}());
exports.JoinProjectGuideComponent = JoinProjectGuideComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbi1wcm9qZWN0LWd1aWRlLXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiam9pbi1wcm9qZWN0LWd1aWRlLXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBRWxELHNEQUErRDtBQUMvRCxnQ0FBK0I7QUFFL0IsV0FBVztBQUNYLGtGQUErRTtBQVEvRTtJQUlJLG1DQUNVLEtBQVcsRUFDWCxpQkFBbUMsRUFDbkMsaUJBQXdDO1FBRnhDLFVBQUssR0FBTCxLQUFLLENBQU07UUFDWCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFFakQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRCw0Q0FBUSxHQUFSLGNBQWEsQ0FBQztJQUVkLHdDQUFJLEdBQUosVUFBSyxLQUFLO1FBQVYsaUJBU0M7UUFSQSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWhELFVBQVUsQ0FBQztZQUNWLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM5QixLQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDMUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztZQUM5QyxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQzFELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNSLENBQUM7SUF4QlEseUJBQXlCO1FBTnJDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMENBQTBDO1lBQ3ZELFNBQVMsRUFBRSxDQUFDLHlDQUF5QyxDQUFDO1NBQ3pELENBQUM7eUNBTW1CLFdBQUk7WUFDUSx5QkFBZ0I7WUFDaEIsK0NBQXFCO09BUHpDLHlCQUF5QixDQTJCckM7SUFBRCxnQ0FBQztDQUFBLEFBM0JELElBMkJDO0FBM0JZLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbi8vIFNFUlZJQ0VTXG5pbXBvcnQgeyBDb21wb25lbnRFdmVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29tcG9uZW50LWV2ZW50LnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiam9pbi1wcm9qZWN0LWd1aWRlLXBhZ2VcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vam9pbi1wcm9qZWN0LWd1aWRlLXBhZ2UuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9qb2luLXByb2plY3QtZ3VpZGUtcGFnZS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEpvaW5Qcm9qZWN0R3VpZGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIFxuICAgIG5hdk9wdGlvbnM6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgIFx0XHRwcml2YXRlIF9wYWdlOiBQYWdlLFxuICAgIFx0XHRwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIFx0XHRwcml2YXRlIF9jb21wb25lbnRTZXJ2aWNlOiBDb21wb25lbnRFdmVudFNlcnZpY2VcbiAgICkge1xuICAgIFx0dGhpcy5uYXZPcHRpb25zID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRSb3V0ZU9wdGlvbnMoKTtcbiAgICBcdHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHsgfVxuXG4gICAgZ290byhyb3V0ZSkge1xuICAgIFx0dGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdMb2FkaW5nLi4uJyk7XG5cbiAgICBcdHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIFx0XHR0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMubmF2T3B0aW9ucy5jbGVhckhpc3RvcnkgPSB0cnVlO1xuXHQgICAgXHR0aGlzLm5hdk9wdGlvbnMudHJhbnNpdGlvbi5uYW1lID0gJ3NsaWRlTGVmdCc7XG5cdCAgICBcdHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW3JvdXRlXSwgdGhpcy5uYXZPcHRpb25zKSBcbiAgICBcdH0sIDgwMClcbiAgICB9XG5cbiAgIFxufVxuIl19