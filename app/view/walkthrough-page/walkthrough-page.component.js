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
var dialogs_1 = require("nativescript-angular/directives/dialogs");
// SERVICES
var user_service_1 = require("../../services/user.service");
var component_event_service_1 = require("../../services/component-event.service");
var WalkThroughComponent = /** @class */ (function () {
    function WalkThroughComponent(modal, _userService, _componentService) {
        this.modal = modal;
        this._userService = _userService;
        this._componentService = _componentService;
        this.userId = 0;
        this.opt = {};
        this.data = {
            title: "",
            description: "",
            videos: []
        };
        this.videoLinks = {
            sell: [
                "https://youtu.be/H8gWdaCoygA",
                "https://youtu.be/5gBSzMttsXs",
                "https://youtu.be/kIULVBJKZgg",
                "https://youtu.be/hB9B4gu4iL0",
                "https://youtu.be/mpj8RpJOlK8",
                "https://youtu.be/y5f0MU7QPQQ",
                "https://youtu.be/1IdwsZrm7IE"
            ],
            word: [
                "https://youtu.be/ZeaANdW7Dbs",
                "https://youtu.be/PmE-12pVPUc",
                "https://youtu.be/67kLj3cnbgs",
                "https://youtu.be/pTk3Xn8kwBE"
            ]
        };
    }
    WalkThroughComponent.prototype.ngOnInit = function () {
        this.userId = this._userService.getCurrentUserId();
        this.initData();
    };
    WalkThroughComponent.prototype.initData = function () {
        if (this.modal.context.type === 'sell') {
            this.data.title = "How to Sell the Bands";
            this.data.description = "These short instructional videos will walk you through setting up, running, and finalizing your Yuda Bands project.";
            for (var i = 0; i < this.videoLinks.sell.length; i++) {
                this.data.videos.push(this._componentService.getYoutubeId(this.videoLinks.sell[i]));
            }
        }
        else if (this.modal.context.type === 'word') {
            this.data.title = "How to Get the Word Out";
            this.data.description = "These short videos are full of ideas to help you publicize your project.";
            for (var i = 0; i < this.videoLinks.word.length; i++) {
                this.data.videos.push(this._componentService.getYoutubeId(this.videoLinks.word[i]));
            }
        }
        else if (this.modal.context.type === 'sponsor') {
            this.data.title = " ";
            this.data.description = "";
            this.data.videos.push(this._componentService.getYoutubeId(this.videoLinks.sell[1]));
        }
    };
    WalkThroughComponent.prototype.onClose = function () {
        this.modal.closeCallback(true);
    };
    WalkThroughComponent = __decorate([
        core_1.Component({
            selector: "walkthrough-page",
            moduleId: module.id,
            templateUrl: "./walkthrough-page.component.html",
            styleUrls: ['./walkthrough-page.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
            user_service_1.UserService,
            component_event_service_1.ComponentEventService])
    ], WalkThroughComponent);
    return WalkThroughComponent;
}());
exports.WalkThroughComponent = WalkThroughComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Fsa3Rocm91Z2gtcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3YWxrdGhyb3VnaC1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RTtBQUV6RSxtRUFBNEU7QUFHNUUsV0FBVztBQUNYLDREQUEwRDtBQUMxRCxrRkFBK0U7QUFRL0U7SUErQkMsOEJBQ1MsS0FBd0IsRUFFeEIsWUFBeUIsRUFDekIsaUJBQXdDO1FBSHhDLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBRXhCLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3pCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFqQ2pELFdBQU0sR0FBVyxDQUFDLENBQUM7UUFFbkIsUUFBRyxHQUFRLEVBQUUsQ0FBQTtRQUViLFNBQUksR0FBUTtZQUNYLEtBQUssRUFBRSxFQUFFO1lBQ1QsV0FBVyxFQUFFLEVBQUU7WUFDZixNQUFNLEVBQUUsRUFBRTtTQUNWLENBQUE7UUFFRCxlQUFVLEdBQVE7WUFDakIsSUFBSSxFQUFFO2dCQUNMLDhCQUE4QjtnQkFDOUIsOEJBQThCO2dCQUM5Qiw4QkFBOEI7Z0JBQzlCLDhCQUE4QjtnQkFDOUIsOEJBQThCO2dCQUM5Qiw4QkFBOEI7Z0JBQzlCLDhCQUE4QjthQUM5QjtZQUVELElBQUksRUFBRTtnQkFDTCw4QkFBOEI7Z0JBQzlCLDhCQUE4QjtnQkFDOUIsOEJBQThCO2dCQUM5Qiw4QkFBOEI7YUFDOUI7U0FDRCxDQUFBO0lBT0MsQ0FBQztJQUVILHVDQUFRLEdBQVI7UUFDQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUVuRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFakIsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFDQyxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFFdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsdUJBQXVCLENBQUM7WUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcscUhBQXFILENBQUM7WUFFOUksS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BGO1NBRUQ7YUFBSyxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFFNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcseUJBQXlCLENBQUM7WUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsMEVBQTBFLENBQUM7WUFFbkcsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BGO1NBRUQ7YUFBSyxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7WUFFL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUUzQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEY7SUFDRixDQUFDO0lBRUQsc0NBQU8sR0FBUDtRQUNPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUEzRVEsb0JBQW9CO1FBTmhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO1NBQ2xELENBQUM7eUNBaUNlLDJCQUFpQjtZQUVWLDBCQUFXO1lBQ04sK0NBQXFCO09BbkNyQyxvQkFBb0IsQ0E0RWhDO0lBQUQsMkJBQUM7Q0FBQSxBQTVFRCxJQTRFQztBQTVFWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBZb3V0dWJlUGxheWVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC15b3V0dWJlcGxheWVyXCI7XG5cbi8vIFNFUlZJQ0VTXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ3YWxrdGhyb3VnaC1wYWdlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3dhbGt0aHJvdWdoLXBhZ2UuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi93YWxrdGhyb3VnaC1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgV2Fsa1Rocm91Z2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdHVzZXJJZDogbnVtYmVyID0gMDtcblxuXHRvcHQ6IGFueSA9IHt9XG5cblx0ZGF0YTogYW55ID0ge1xuXHRcdHRpdGxlOiBcIlwiLFxuXHRcdGRlc2NyaXB0aW9uOiBcIlwiLFxuXHRcdHZpZGVvczogW11cblx0fVxuXG5cdHZpZGVvTGlua3M6IGFueSA9IHtcblx0XHRzZWxsOiBbXG5cdFx0XHRcImh0dHBzOi8veW91dHUuYmUvSDhnV2RhQ295Z0FcIixcblx0XHRcdFwiaHR0cHM6Ly95b3V0dS5iZS81Z0JTek10dHNYc1wiLFxuXHRcdFx0XCJodHRwczovL3lvdXR1LmJlL2tJVUxWQkpLWmdnXCIsXG5cdFx0XHRcImh0dHBzOi8veW91dHUuYmUvaEI5QjRndTRpTDBcIixcblx0XHRcdFwiaHR0cHM6Ly95b3V0dS5iZS9tcGo4UnBKT2xLOFwiLFxuXHRcdFx0XCJodHRwczovL3lvdXR1LmJlL3k1ZjBNVTdRUFFRXCIsXG5cdFx0XHRcImh0dHBzOi8veW91dHUuYmUvMUlkd3Nacm03SUVcIlxuXHRcdF0sXG5cblx0XHR3b3JkOiBbXG5cdFx0XHRcImh0dHBzOi8veW91dHUuYmUvWmVhQU5kVzdEYnNcIixcblx0XHRcdFwiaHR0cHM6Ly95b3V0dS5iZS9QbUUtMTJwVlBVY1wiLFxuXHRcdFx0XCJodHRwczovL3lvdXR1LmJlLzY3a0xqM2NuYmdzXCIsXG5cdFx0XHRcImh0dHBzOi8veW91dHUuYmUvcFRrM1huOGt3QkVcIlxuXHRcdF1cblx0fVxuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nUGFyYW1zLFxuXG5cdFx0cHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuXHRcdHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZVxuXHQpe31cblxuXHRuZ09uSW5pdCgpe1xuXHRcdHRoaXMudXNlcklkID0gdGhpcy5fdXNlclNlcnZpY2UuZ2V0Q3VycmVudFVzZXJJZCgpO1xuXG5cdFx0dGhpcy5pbml0RGF0YSgpO1xuXHRcdFxuXHR9XG5cblx0aW5pdERhdGEoKSB7XG5cdFx0aWYodGhpcy5tb2RhbC5jb250ZXh0LnR5cGUgPT09ICdzZWxsJykge1xuXG5cdFx0XHR0aGlzLmRhdGEudGl0bGUgPSBcIkhvdyB0byBTZWxsIHRoZSBCYW5kc1wiO1xuXHRcdFx0dGhpcy5kYXRhLmRlc2NyaXB0aW9uID0gXCJUaGVzZSBzaG9ydCBpbnN0cnVjdGlvbmFsIHZpZGVvcyB3aWxsIHdhbGsgeW91IHRocm91Z2ggc2V0dGluZyB1cCwgcnVubmluZywgYW5kIGZpbmFsaXppbmcgeW91ciBZdWRhIEJhbmRzIHByb2plY3QuXCI7XG5cblx0XHRcdGZvcihsZXQgaT0wOyBpPHRoaXMudmlkZW9MaW5rcy5zZWxsLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHRoaXMuZGF0YS52aWRlb3MucHVzaCh0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldFlvdXR1YmVJZCh0aGlzLnZpZGVvTGlua3Muc2VsbFtpXSkpO1xuXHRcdFx0fVxuXG5cdFx0fWVsc2UgaWYodGhpcy5tb2RhbC5jb250ZXh0LnR5cGUgPT09ICd3b3JkJykge1xuXG5cdFx0XHR0aGlzLmRhdGEudGl0bGUgPSBcIkhvdyB0byBHZXQgdGhlIFdvcmQgT3V0XCI7XG5cdFx0XHR0aGlzLmRhdGEuZGVzY3JpcHRpb24gPSBcIlRoZXNlIHNob3J0IHZpZGVvcyBhcmUgZnVsbCBvZiBpZGVhcyB0byBoZWxwIHlvdSBwdWJsaWNpemUgeW91ciBwcm9qZWN0LlwiO1xuXG5cdFx0XHRmb3IobGV0IGk9MDsgaTx0aGlzLnZpZGVvTGlua3Mud29yZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR0aGlzLmRhdGEudmlkZW9zLnB1c2godGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRZb3V0dWJlSWQodGhpcy52aWRlb0xpbmtzLndvcmRbaV0pKTtcblx0XHRcdH1cblxuXHRcdH1lbHNlIGlmKHRoaXMubW9kYWwuY29udGV4dC50eXBlID09PSAnc3BvbnNvcicpIHtcblxuXHRcdFx0dGhpcy5kYXRhLnRpdGxlID0gXCIgXCI7XG5cdFx0XHR0aGlzLmRhdGEuZGVzY3JpcHRpb24gPSBcIlwiO1xuXG5cdFx0XHR0aGlzLmRhdGEudmlkZW9zLnB1c2godGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRZb3V0dWJlSWQodGhpcy52aWRlb0xpbmtzLnNlbGxbMV0pKTtcblx0XHR9XG5cdH1cblxuXHRvbkNsb3NlKCkge1xuICAgICAgICB0aGlzLm1vZGFsLmNsb3NlQ2FsbGJhY2sodHJ1ZSk7XG4gICAgfVxufSJdfQ==