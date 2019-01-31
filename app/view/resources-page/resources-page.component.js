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
var page_1 = require("tns-core-modules/ui/page");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var walkthrough_page_component_1 = require("../../view/walkthrough-page/walkthrough-page.component");
var router_1 = require("nativescript-angular/router");
// OTHERS
var utils_1 = require("utils/utils");
// SERVICES
var component_event_service_1 = require("../../services/component-event.service");
var ResourcesComponent = /** @class */ (function () {
    function ResourcesComponent(_page, vcRef, _routerExtensions, _modal, _componentService) {
        this._page = _page;
        this.vcRef = vcRef;
        this._routerExtensions = _routerExtensions;
        this._modal = _modal;
        this._componentService = _componentService;
        this.options = { rel: 1, autoplay: 1 };
        this.videoSrc = 'https://res.cloudinary.com/dbi1b3kf0/video/upload/v1546581007/yudabands/resources/How_to_use_the_app_resources.mp4';
        this.navOptions = this._componentService.getRouteOptions();
        this.navOptions.transition.name = "slideTop";
    }
    ResourcesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.youtubeLink = this._componentService.getYoutubeId('https://youtu.be/gOYceWtTzWE');
        this._page.on('navigatingTo', function (data) {
            _this.videoPlayer.nativeElement.src = 'https://res.cloudinary.com/dbi1b3kf0/video/upload/v1546581007/yudabands/resources/How_to_use_the_app_resources.mp4';
        });
        this._page.on('navigatingFrom', function (data) {
            _this.videoPlayer.nativeElement.src = '';
        });
    };
    // showModal(index){
    //     let opt = {
    //         context: { index: index },
    //         fullscreen: true,
    //         viewContainerRef: this.vcRef,
    //         animated: true
    //     }
    //     this._modal.showModal(InformationModalComponent, opt)
    //         .then(response => {
    //             console.log(response)
    //         })
    // }
    ResourcesComponent.prototype.openWalkthrough = function (type) {
        var _this = this;
        this.videoPlayer.nativeElement.pause();
        var opt = {
            context: { type: type },
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true
        };
        this._modal.showModal(walkthrough_page_component_1.WalkThroughComponent, opt).then(function (response) {
            _this.videoPlayer.nativeElement.play();
        });
    };
    ResourcesComponent.prototype.open = function (url) {
        utils_1.openUrl(url);
    };
    ResourcesComponent.prototype.openMedia = function () {
        this._routerExtensions.navigate(['media'], this.navOptions);
    };
    __decorate([
        core_1.ViewChild("videoPlayer"),
        __metadata("design:type", core_1.ElementRef)
    ], ResourcesComponent.prototype, "videoPlayer", void 0);
    ResourcesComponent = __decorate([
        core_1.Component({
            selector: "resources-page",
            moduleId: module.id,
            templateUrl: "./resources-page.component.html",
            styleUrls: ['./resources-page.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            core_1.ViewContainerRef,
            router_1.RouterExtensions,
            dialogs_1.ModalDialogService,
            component_event_service_1.ComponentEventService])
    ], ResourcesComponent);
    return ResourcesComponent;
}());
exports.ResourcesComponent = ResourcesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzLXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzb3VyY2VzLXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJGO0FBRTNGLGlEQUFnRDtBQUNoRCxtRUFBNkU7QUFDN0UscUdBQThGO0FBQzlGLHNEQUE4RDtBQUk5RCxTQUFTO0FBQ1QscUNBQXNDO0FBRXRDLFdBQVc7QUFDWCxrRkFBK0U7QUFRL0U7SUFXSSw0QkFDWSxLQUFXLEVBQ1gsS0FBdUIsRUFDdkIsaUJBQW1DLEVBRW5DLE1BQTBCLEVBQzFCLGlCQUF3QztRQUx4QyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUVuQyxXQUFNLEdBQU4sTUFBTSxDQUFvQjtRQUMxQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBVnBELFlBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBRWxDLGFBQVEsR0FBVyxvSEFBb0gsQ0FBQztRQVVwSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO0lBQ2pELENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUV2RixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsVUFBQyxJQUFJO1lBQy9CLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxvSEFBb0gsQ0FBQztRQUM5SixDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLFVBQUMsSUFBSTtZQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELG9CQUFvQjtJQUNwQixrQkFBa0I7SUFDbEIscUNBQXFDO0lBQ3JDLDRCQUE0QjtJQUM1Qix3Q0FBd0M7SUFDeEMseUJBQXlCO0lBQ3pCLFFBQVE7SUFFUiw0REFBNEQ7SUFDNUQsOEJBQThCO0lBQzlCLG9DQUFvQztJQUNwQyxhQUFhO0lBQ2IsSUFBSTtJQUVKLDRDQUFlLEdBQWYsVUFBZ0IsSUFBSTtRQUFwQixpQkFhQztRQVpHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXZDLElBQUksR0FBRyxHQUFHO1lBQ04sT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtZQUN2QixVQUFVLEVBQUUsSUFBSTtZQUNoQixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSztZQUM1QixRQUFRLEVBQUUsSUFBSTtTQUNqQixDQUFBO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsaURBQW9CLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUMxRCxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxpQ0FBSSxHQUFKLFVBQUssR0FBRztRQUNKLGVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsc0NBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDL0QsQ0FBQztJQXBFeUI7UUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7a0NBQWMsaUJBQVU7MkRBQUM7SUFGekMsa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO1NBQ2hELENBQUM7eUNBYXFCLFdBQUk7WUFDSix1QkFBZ0I7WUFDSix5QkFBZ0I7WUFFM0IsNEJBQWtCO1lBQ1AsK0NBQXFCO09BakIzQyxrQkFBa0IsQ0F1RTlCO0lBQUQseUJBQUM7Q0FBQSxBQXZFRCxJQXVFQztBQXZFWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFdhbGtUaHJvdWdoQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3ZpZXcvd2Fsa3Rocm91Z2gtcGFnZS93YWxrdGhyb3VnaC1wYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIlxuXG5pbXBvcnQgeyBZb3V0dWJlUGxheWVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC15b3V0dWJlcGxheWVyXCJcblxuLy8gT1RIRVJTXG5pbXBvcnQgeyBvcGVuVXJsIH0gZnJvbSBcInV0aWxzL3V0aWxzXCI7XG5cbi8vIFNFUlZJQ0VTXG5pbXBvcnQgeyBDb21wb25lbnRFdmVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29tcG9uZW50LWV2ZW50LnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicmVzb3VyY2VzLXBhZ2VcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcmVzb3VyY2VzLXBhZ2UuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9yZXNvdXJjZXMtcGFnZS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBAVmlld0NoaWxkKFwidmlkZW9QbGF5ZXJcIikgdmlkZW9QbGF5ZXI6IEVsZW1lbnRSZWY7XG5cbiAgICBuYXZPcHRpb25zOiBhbnk7XG5cbiAgICB5b3V0dWJlTGluazogc3RyaW5nO1xuICAgIG9wdGlvbnMgPSB7IHJlbDogMSwgYXV0b3BsYXk6IDEgfTtcblxuICAgIHZpZGVvU3JjOiBzdHJpbmcgPSAnaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGJpMWIza2YwL3ZpZGVvL3VwbG9hZC92MTU0NjU4MTAwNy95dWRhYmFuZHMvcmVzb3VyY2VzL0hvd190b191c2VfdGhlX2FwcF9yZXNvdXJjZXMubXA0JztcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfcGFnZTogUGFnZSxcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcblxuICAgICAgICBwcml2YXRlIF9tb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9jb21wb25lbnRTZXJ2aWNlOiBDb21wb25lbnRFdmVudFNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRSb3V0ZU9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zLnRyYW5zaXRpb24ubmFtZSA9IFwic2xpZGVUb3BcIjtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy55b3V0dWJlTGluayA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0WW91dHViZUlkKCdodHRwczovL3lvdXR1LmJlL2dPWWNlV3RUeldFJyk7XG5cbiAgICAgICAgdGhpcy5fcGFnZS5vbignbmF2aWdhdGluZ1RvJywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9QbGF5ZXIubmF0aXZlRWxlbWVudC5zcmMgPSAnaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGJpMWIza2YwL3ZpZGVvL3VwbG9hZC92MTU0NjU4MTAwNy95dWRhYmFuZHMvcmVzb3VyY2VzL0hvd190b191c2VfdGhlX2FwcF9yZXNvdXJjZXMubXA0JztcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLl9wYWdlLm9uKCduYXZpZ2F0aW5nRnJvbScsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZGVvUGxheWVyLm5hdGl2ZUVsZW1lbnQuc3JjID0gJyc7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gc2hvd01vZGFsKGluZGV4KXtcbiAgICAvLyAgICAgbGV0IG9wdCA9IHtcbiAgICAvLyAgICAgICAgIGNvbnRleHQ6IHsgaW5kZXg6IGluZGV4IH0sXG4gICAgLy8gICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxuICAgIC8vICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAvLyAgICAgICAgIGFuaW1hdGVkOiB0cnVlXG4gICAgLy8gICAgIH1cbiAgICAgICAgXG4gICAgLy8gICAgIHRoaXMuX21vZGFsLnNob3dNb2RhbChJbmZvcm1hdGlvbk1vZGFsQ29tcG9uZW50LCBvcHQpXG4gICAgLy8gICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgLy8gICAgICAgICB9KVxuICAgIC8vIH1cblxuICAgIG9wZW5XYWxrdGhyb3VnaCh0eXBlKSB7XG4gICAgICAgIHRoaXMudmlkZW9QbGF5ZXIubmF0aXZlRWxlbWVudC5wYXVzZSgpO1xuXG4gICAgICAgIGxldCBvcHQgPSB7XG4gICAgICAgICAgICBjb250ZXh0OiB7IHR5cGU6IHR5cGUgfSxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IHRydWUsXG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxuICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWVcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5fbW9kYWwuc2hvd01vZGFsKFdhbGtUaHJvdWdoQ29tcG9uZW50LCBvcHQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWRlb1BsYXllci5uYXRpdmVFbGVtZW50LnBsYXkoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgIFx0b3Blbih1cmwpIHtcbiAgICAgICAgb3BlblVybCh1cmwpO1xuICAgXHR9XG5cbiAgICBvcGVuTWVkaWEoKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWydtZWRpYSddLCB0aGlzLm5hdk9wdGlvbnMpXG4gICAgfVxufSJdfQ==