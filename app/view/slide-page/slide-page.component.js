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
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var component_event_service_1 = require("../../services/component-event.service");
var SlideComponent = /** @class */ (function () {
    function SlideComponent(_page, _activatedRoute, _routerExtensions, _componentService) {
        var _this = this;
        this._page = _page;
        this._activatedRoute = _activatedRoute;
        this._routerExtensions = _routerExtensions;
        this._componentService = _componentService;
        this.projectId = 0;
        _page.actionBarHidden = true;
        this.navOptions = this._componentService.getRouteOptions();
        this._activatedRoute.queryParams.subscribe(function (params) {
            _this.projectId = parseInt(params['projectId']);
        });
    }
    SlideComponent.prototype.ngOnInit = function () { };
    SlideComponent.prototype.skip = function () {
        this.navOptions.clearHistory = true;
        this._routerExtensions.navigate(['/project', this.projectId], this.navOptions);
    };
    /*
        TODO: EVENTS NOT BINDING
    */
    SlideComponent.prototype.myChangeEvent = function (args) {
        console.log("hello");
        console.dir(args);
        console.log(args.index);
    };
    SlideComponent = __decorate([
        core_1.Component({
            selector: "slide-page",
            moduleId: module.id,
            templateUrl: "./slide-page.component.html",
            styleUrls: ['./slide-page.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.ActivatedRoute,
            router_2.RouterExtensions,
            component_event_service_1.ComponentEventService])
    ], SlideComponent);
    return SlideComponent;
}());
exports.SlideComponent = SlideComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbGlkZS1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsc0RBQStEO0FBQy9ELGdDQUErQjtBQUUvQixrRkFBK0U7QUFRL0U7SUFLSSx3QkFDWSxLQUFXLEVBQ1gsZUFBK0IsRUFDL0IsaUJBQW1DLEVBQ25DLGlCQUF3QztRQUpwRCxpQkFZQztRQVhXLFVBQUssR0FBTCxLQUFLLENBQU07UUFDWCxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBUHBELGNBQVMsR0FBVyxDQUFDLENBQUM7UUFTbEIsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFFN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUM3QyxLQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxpQ0FBUSxHQUFSLGNBQVksQ0FBQztJQUViLDZCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRDs7TUFFRTtJQUNGLHNDQUFhLEdBQWIsVUFBYyxJQUFJO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFqQ1EsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7U0FDNUMsQ0FBQzt5Q0FPcUIsV0FBSTtZQUNNLHVCQUFjO1lBQ1oseUJBQWdCO1lBQ2hCLCtDQUFxQjtPQVQzQyxjQUFjLENBbUMxQjtJQUFELHFCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7QUFuQ1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcblxuaW1wb3J0IHsgQ29tcG9uZW50RXZlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbXBvbmVudC1ldmVudC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNsaWRlLXBhZ2VcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2xpZGUtcGFnZS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL3NsaWRlLXBhZ2UuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgXG4gICAgcHJvamVjdElkOiBudW1iZXIgPSAwO1xuICAgIG5hdk9wdGlvbnM6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxuICAgICAgICBwcml2YXRlIF9hY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZVxuICAgICkge1xuICAgICAgICBfcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuXG4gICAgICAgIHRoaXMubmF2T3B0aW9ucyA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0Um91dGVPcHRpb25zKCk7XG4gICAgICAgIHRoaXMuX2FjdGl2YXRlZFJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9qZWN0SWQgPSBwYXJzZUludChwYXJhbXNbJ3Byb2plY3RJZCddKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHt9XG5cbiAgICBza2lwKCkge1xuICAgICAgICB0aGlzLm5hdk9wdGlvbnMuY2xlYXJIaXN0b3J5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9wcm9qZWN0JywgdGhpcy5wcm9qZWN0SWRdLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgIH1cbiAgICBcbiAgICAvKlxuICAgICAgICBUT0RPOiBFVkVOVFMgTk9UIEJJTkRJTkdcbiAgICAqL1xuICAgIG15Q2hhbmdlRXZlbnQoYXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhcImhlbGxvXCIpXG4gICAgICAgIGNvbnNvbGUuZGlyKGFyZ3MpXG4gICAgXHRjb25zb2xlLmxvZyhhcmdzLmluZGV4KVxuICAgIH1cbiAgIFxufSJdfQ==