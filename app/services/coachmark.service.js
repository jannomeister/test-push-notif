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
var color_1 = require("tns-core-modules/color");
var nativescript_coachmarks_1 = require("nativescript-coachmarks");
var user_service_1 = require("./user.service");
var component_event_service_1 = require("./component-event.service");
var CoachMarkService = /** @class */ (function () {
    function CoachMarkService(_userService, _componentService) {
        this._userService = _userService;
        this._componentService = _componentService;
        nativescript_coachmarks_1.TNSCoachMarks.DEBUG = true;
    }
    CoachMarkService.prototype.actionBarTour = function (searchBar, notifButton) {
        this.currentTour = 'actionbar';
        this.searchBar = searchBar;
        this.notifButton = notifButton;
        var isTourDone = this._userService.getTourStatus();
        if (!isTourDone)
            this.initCoachMarkConfig();
    };
    CoachMarkService.prototype.tabsTour = function () {
        this.currentTour = 'tabs';
        var isTourDone = this._userService.getTourStatus();
        if (!isTourDone)
            this.initCoachMarkConfig();
    };
    CoachMarkService.prototype.setTab = function (homeTab, resourcesTab, projectTab, profileTab, settingsTab) {
        this.homeTab = homeTab;
        this.resourcesTab = resourcesTab;
        this.projectTab = projectTab;
        this.profileTab = profileTab;
        this.settingsTab = settingsTab;
    };
    CoachMarkService.prototype.initCoachMarkConfig = function () {
        var marksOptions;
        this.coachMark = new nativescript_coachmarks_1.TNSCoachMarks();
        this.coachMark.initEvents();
        this.setupEvents();
        if (this.currentTour === 'actionbar') {
            marksOptions = this.actionBarMarksOptions();
        }
        else if (this.currentTour === 'tabs') {
            marksOptions = this.tabsMarksOptions();
        }
        nativescript_coachmarks_1.TNSCoachMarks.start(marksOptions, this.getICoachMarkOptions(), this.coachMark);
    };
    CoachMarkService.prototype.actionBarMarksOptions = function () {
        return [
            new nativescript_coachmarks_1.TNSCoachMark({
                position: CGRectMake(this.searchBar.originX, // x axis 
                this.searchBar.originY, // y axis
                this.searchBar.width, // width
                this.searchBar.height // height
                ),
                caption: 'If you want to search something just click this search bar.',
                shape: nativescript_coachmarks_1.TNSCoachMark.SHAPES.DEFAULT,
                labelPosition: nativescript_coachmarks_1.TNSCoachMark.LABEL_POSITIONS.BOTTOM,
                labelAlignment: nativescript_coachmarks_1.TNSCoachMark.LABEL_ALIGNMENTS.RIGHT,
                showArrow: true
            }),
            new nativescript_coachmarks_1.TNSCoachMark({
                position: CGRectMake(this.notifButton.originX - 2.5, // x axis 
                this.notifButton.originY - 2.5, // y axis
                this.notifButton.width + 5, // width
                this.notifButton.height + 5 // height
                ),
                caption: 'This is the notification icon. You can view all your notifications by clicking it.',
                shape: nativescript_coachmarks_1.TNSCoachMark.SHAPES.CIRCLE,
                labelPosition: nativescript_coachmarks_1.TNSCoachMark.LABEL_POSITIONS.LEFT,
                labelAlignment: nativescript_coachmarks_1.TNSCoachMark.LABEL_ALIGNMENTS.LEFT,
                showArrow: true
            })
        ];
    };
    CoachMarkService.prototype.tabsMarksOptions = function () {
        return [
            new nativescript_coachmarks_1.TNSCoachMark({
                position: CGRectMake(this.homeTab.originX, this.homeTab.originY, this.homeTab.width, this.homeTab.height),
                caption: 'You can view active projects here.',
                shape: nativescript_coachmarks_1.TNSCoachMark.SHAPES.DEFAULT,
                labelPosition: nativescript_coachmarks_1.TNSCoachMark.LABEL_POSITIONS.TOP,
                labelAlignment: nativescript_coachmarks_1.TNSCoachMark.LABEL_ALIGNMENTS.LEFT,
                showArrow: true
            }),
            new nativescript_coachmarks_1.TNSCoachMark({
                position: CGRectMake(this.resourcesTab.originX, this.resourcesTab.originY, this.resourcesTab.width, this.resourcesTab.height),
                caption: 'You can access all the media resources here.',
                shape: nativescript_coachmarks_1.TNSCoachMark.SHAPES.DEFAULT,
                labelPosition: nativescript_coachmarks_1.TNSCoachMark.LABEL_POSITIONS.TOP,
                labelAlignment: nativescript_coachmarks_1.TNSCoachMark.LABEL_ALIGNMENTS.CENTER,
                showArrow: true
            }),
            new nativescript_coachmarks_1.TNSCoachMark({
                position: CGRectMake(this.projectTab.originX, this.projectTab.originY, this.projectTab.width, this.projectTab.height),
                caption: 'You can add/view your own project by clicking this.',
                shape: nativescript_coachmarks_1.TNSCoachMark.SHAPES.DEFAULT,
                labelPosition: nativescript_coachmarks_1.TNSCoachMark.LABEL_POSITIONS.TOP,
                labelAlignment: nativescript_coachmarks_1.TNSCoachMark.LABEL_ALIGNMENTS.RIGHT,
                showArrow: true
            }),
            new nativescript_coachmarks_1.TNSCoachMark({
                position: CGRectMake(this.profileTab.originX, this.profileTab.originY, this.profileTab.width, this.profileTab.height),
                caption: 'Click this to view your profile.',
                shape: nativescript_coachmarks_1.TNSCoachMark.SHAPES.DEFAULT,
                labelPosition: nativescript_coachmarks_1.TNSCoachMark.LABEL_POSITIONS.TOP,
                labelAlignment: nativescript_coachmarks_1.TNSCoachMark.LABEL_ALIGNMENTS.RIGHT,
                showArrow: true
            }),
            new nativescript_coachmarks_1.TNSCoachMark({
                position: CGRectMake(this.settingsTab.originX, this.settingsTab.originY, this.settingsTab.width, this.settingsTab.height),
                caption: 'Check your settings by clicking this.',
                shape: nativescript_coachmarks_1.TNSCoachMark.SHAPES.DEFAULT,
                labelPosition: nativescript_coachmarks_1.TNSCoachMark.LABEL_POSITIONS.LEFT,
                labelAlignment: nativescript_coachmarks_1.TNSCoachMark.LABEL_ALIGNMENTS.LEFT,
                showArrow: true
            })
        ];
    };
    CoachMarkService.prototype.getICoachMarkOptions = function () {
        var options = {
            continueLabelText: '',
            skipButtonText: 'Skip',
            lblSpacing: 30,
        };
        return options;
    };
    CoachMarkService.prototype.setupEvents = function () {
        var _this = this;
        this.coachMark.events.on('navigate', function (eventData) {
            // you can customize buttons and bar at each step
            _this.customizeStyle(eventData.data);
        });
        this.coachMark.events.on('click', function (eventData) { });
        this.coachMark.events.on('cleanup', function (eventData) {
            console.log("ready to cleanup in demo.");
            console.log(_this.currentTour);
            _this.coachMark = undefined;
            if (_this.currentTour === 'actionbar') {
                _this.tabsTour();
            }
            else {
                if (_this.currentTour === 'tabs') {
                    _this._userService.saveTourStatus(true);
                }
            }
        });
    };
    CoachMarkService.prototype.customizeStyle = function (data) {
        // console.log(data.instance.arrowImage.image);
        // could customize the arrowImage at each step 
        // data.instance.arrowImage.image = UIImage.imageNamed('someimage.png');
        // console.log(data.instance.btnSkipCoach);
        // console.log(data.instance.lblCaption);
        // console.log(data.instance.lblContinue);
        if (data.instance.lblContinue) {
            // only available when 'ready' is called
            // it disappears after the first tap and advance to next step
            // let labelContinue = data.instance.lblContinue.frame; // -20
            // data.instance.lblContinue.frame = CGRectMake(labelContinue.origin.x, labelContinue.origin.y - 200, labelContinue.size.width, labelContinue.size.height + 20);
            data.instance.lblContinue.backgroundColor = new color_1.Color(0.9, 0, 0, 0).ios;
            //0,0,0 alpha 0.9
            // custom caption color
            data.instance.lblCaption.textColor = new color_1.Color('#FFE108').ios;
            // customize skip button
            var btnSkip = data.instance.btnSkipCoach.frame;
            data.instance.btnSkipCoach.frame = CGRectMake(btnSkip.origin.x, btnSkip.origin.y - 300, btnSkip.size.width, btnSkip.size.height + 20);
            data.instance.btnSkipCoach.backgroundColor = new color_1.Color('#FFE108').ios;
            data.instance.btnSkipCoach.textColor = new color_1.Color('#000000').ios;
        }
    };
    CoachMarkService.prototype.tourChangeListener = function (isTourDone) {
        this._componentService.tourChanged(isTourDone);
    };
    __decorate([
        core_1.HostListener('change'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], CoachMarkService.prototype, "tourChangeListener", null);
    CoachMarkService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_service_1.UserService,
            component_event_service_1.ComponentEventService])
    ], CoachMarkService);
    return CoachMarkService;
}());
exports.CoachMarkService = CoachMarkService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29hY2htYXJrLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2FjaG1hcmsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RDtBQUN6RCxnREFBK0M7QUFDL0MsbUVBQXlGO0FBRXpGLCtDQUE2QztBQUM3QyxxRUFBa0U7QUFLbEU7SUFnQkMsMEJBQ2UsWUFBeUIsRUFDekIsaUJBQXdDO1FBRHhDLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3pCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFFdEQsdUNBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCx3Q0FBYSxHQUFiLFVBQWMsU0FBUyxFQUFFLFdBQVc7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFFL0IsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVuRCxJQUFHLENBQUMsVUFBVTtZQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFFRSxtQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFFMUIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVuRCxJQUFHLENBQUMsVUFBVTtZQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxpQ0FBTSxHQUFOLFVBQU8sT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVc7UUFDN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxZ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U0FBUyxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUU5RCx3QkFBd0I7WUFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ3RJLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLGVBQWUsR0FBRyxJQUFJLGFBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDdEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUNuRTtJQUNMLENBQUM7SUFHRCw2Q0FBa0IsR0FBbEIsVUFBbUIsVUFBVTtRQUN6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFGRDtRQURDLG1CQUFZLENBQUMsUUFBUSxDQUFDOzs7OzhEQUd0QjtJQXZPUSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTt5Q0FrQmlCLDBCQUFXO1lBQ04sK0NBQXFCO09BbEIzQyxnQkFBZ0IsQ0F3TzVCO0lBQUQsdUJBQUM7Q0FBQSxBQXhPRCxJQXdPQztBQXhPWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBIb3N0TGlzdGVuZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xuaW1wb3J0IHsgVE5TQ29hY2hNYXJrcywgVE5TQ29hY2hNYXJrLCBJQ29hY2hNYXJrT3B0aW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jb2FjaG1hcmtzJztcblxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuL2NvbXBvbmVudC1ldmVudC5zZXJ2aWNlXCI7XG5cbmRlY2xhcmUgdmFyIENHUmVjdE1ha2UsIFVJU2NyZWVuLCBVSUNvbG9yO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29hY2hNYXJrU2VydmljZSB7XG5cblx0Y29hY2hNYXJrOiBhbnk7XG5cdGN1cnJlbnRUb3VyOiBzdHJpbmc7XG5cbiAgICAvL2FjdGlvbmJhclxuICAgIG5vdGlmQnV0dG9uOiBhbnk7XG4gICAgc2VhcmNoQmFyOiBhbnk7XG5cbiAgICAvL3RhYnNcbiAgICBob21lVGFiOiBhbnk7XG4gICAgcmVzb3VyY2VzVGFiOiBhbnk7XG4gICAgcHJvamVjdFRhYjogYW55O1xuICAgIHByb2ZpbGVUYWI6IGFueTtcbiAgICBzZXR0aW5nc1RhYjogYW55O1xuXG5cdGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZVxuICAgICkge1xuXHRcdFROU0NvYWNoTWFya3MuREVCVUcgPSB0cnVlO1xuXHR9XG5cblx0YWN0aW9uQmFyVG91cihzZWFyY2hCYXIsIG5vdGlmQnV0dG9uKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRvdXIgPSAnYWN0aW9uYmFyJztcbiAgICAgICAgdGhpcy5zZWFyY2hCYXIgPSBzZWFyY2hCYXJcbiAgICAgICAgdGhpcy5ub3RpZkJ1dHRvbiA9IG5vdGlmQnV0dG9uO1xuXG4gICAgICAgIGxldCBpc1RvdXJEb25lID0gdGhpcy5fdXNlclNlcnZpY2UuZ2V0VG91clN0YXR1cygpO1xuXG4gICAgICAgIGlmKCFpc1RvdXJEb25lKSB0aGlzLmluaXRDb2FjaE1hcmtDb25maWcoKTtcblx0fVxuXG4gICAgdGFic1RvdXIoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRvdXIgPSAndGFicyc7XG5cbiAgICAgICAgbGV0IGlzVG91ckRvbmUgPSB0aGlzLl91c2VyU2VydmljZS5nZXRUb3VyU3RhdHVzKCk7XG5cbiAgICAgICAgaWYoIWlzVG91ckRvbmUpIHRoaXMuaW5pdENvYWNoTWFya0NvbmZpZygpO1xuICAgIH1cblxuICAgIHNldFRhYihob21lVGFiLCByZXNvdXJjZXNUYWIsIHByb2plY3RUYWIsIHByb2ZpbGVUYWIsIHNldHRpbmdzVGFiKSB7XG4gICAgICAgIHRoaXMuaG9tZVRhYiA9IGhvbWVUYWI7XG4gICAgICAgIHRoaXMucmVzb3VyY2VzVGFiID0gcmVzb3VyY2VzVGFiO1xuICAgICAgICB0aGlzLnByb2plY3RUYWIgPSBwcm9qZWN0VGFiO1xuICAgICAgICB0aGlzLnByb2ZpbGVUYWIgPSBwcm9maWxlVGFiO1xuICAgICAgICB0aGlzLnNldHRpbmdzVGFiID0gc2V0dGluZ3NUYWI7XG4gICAgfVxuXG5cdGluaXRDb2FjaE1hcmtDb25maWcoKSB7XG5cdFx0bGV0IG1hcmtzT3B0aW9ucztcblxuICAgICAgICB0aGlzLmNvYWNoTWFyayA9IG5ldyBUTlNDb2FjaE1hcmtzKCk7XG4gICAgICAgIHRoaXMuY29hY2hNYXJrLmluaXRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5zZXR1cEV2ZW50cygpO1xuXG5cdFx0aWYodGhpcy5jdXJyZW50VG91ciA9PT0gJ2FjdGlvbmJhcicpIHtcblx0XHRcdG1hcmtzT3B0aW9ucyA9IHRoaXMuYWN0aW9uQmFyTWFya3NPcHRpb25zKCk7XG5cdFx0fWVsc2UgaWYodGhpcy5jdXJyZW50VG91ciA9PT0gJ3RhYnMnKSB7XG4gICAgICAgICAgICBtYXJrc09wdGlvbnMgPSB0aGlzLnRhYnNNYXJrc09wdGlvbnMoKTtcbiAgICAgICAgfVxuXHRcdFROU0NvYWNoTWFya3Muc3RhcnQobWFya3NPcHRpb25zLCB0aGlzLmdldElDb2FjaE1hcmtPcHRpb25zKCksIHRoaXMuY29hY2hNYXJrKTtcblx0fVxuXG5cdGFjdGlvbkJhck1hcmtzT3B0aW9ucygpIHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0bmV3IFROU0NvYWNoTWFyayh7XG5cdFx0XHRcdHBvc2l0aW9uOiBDR1JlY3RNYWtlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaEJhci5vcmlnaW5YLCAvLyB4IGF4aXMgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQmFyLm9yaWdpblksIC8vIHkgYXhpc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaEJhci53aWR0aCwgLy8gd2lkdGhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hCYXIuaGVpZ2h0IC8vIGhlaWdodFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogJ0lmIHlvdSB3YW50IHRvIHNlYXJjaCBzb21ldGhpbmcganVzdCBjbGljayB0aGlzIHNlYXJjaCBiYXIuJyxcbiAgICAgICAgICAgICAgICBzaGFwZTogVE5TQ29hY2hNYXJrLlNIQVBFUy5ERUZBVUxULFxuICAgICAgICAgICAgICAgIGxhYmVsUG9zaXRpb246IFROU0NvYWNoTWFyay5MQUJFTF9QT1NJVElPTlMuQk9UVE9NLFxuICAgICAgICAgICAgICAgIGxhYmVsQWxpZ25tZW50OiBUTlNDb2FjaE1hcmsuTEFCRUxfQUxJR05NRU5UUy5SSUdIVCxcbiAgICAgICAgICAgICAgICBzaG93QXJyb3c6IHRydWVcblx0XHRcdH0pLCBcblx0XHRcdG5ldyBUTlNDb2FjaE1hcmsoe1xuXHRcdFx0XHRwb3NpdGlvbjogQ0dSZWN0TWFrZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZkJ1dHRvbi5vcmlnaW5YIC0gMi41LCAvLyB4IGF4aXMgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZCdXR0b24ub3JpZ2luWSAtIDIuNSwgLy8geSBheGlzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZCdXR0b24ud2lkdGggKyA1LCAvLyB3aWR0aFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmQnV0dG9uLmhlaWdodCArIDUgLy8gaGVpZ2h0XG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiAnVGhpcyBpcyB0aGUgbm90aWZpY2F0aW9uIGljb24uIFlvdSBjYW4gdmlldyBhbGwgeW91ciBub3RpZmljYXRpb25zIGJ5IGNsaWNraW5nIGl0LicsXG4gICAgICAgICAgICAgICAgc2hhcGU6IFROU0NvYWNoTWFyay5TSEFQRVMuQ0lSQ0xFLFxuICAgICAgICAgICAgICAgIGxhYmVsUG9zaXRpb246IFROU0NvYWNoTWFyay5MQUJFTF9QT1NJVElPTlMuTEVGVCxcbiAgICAgICAgICAgICAgICBsYWJlbEFsaWdubWVudDogVE5TQ29hY2hNYXJrLkxBQkVMX0FMSUdOTUVOVFMuTEVGVCxcbiAgICAgICAgICAgICAgICBzaG93QXJyb3c6IHRydWVcblx0XHRcdH0pXG5cdFx0XVxuXHR9XG5cbiAgICB0YWJzTWFya3NPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgbmV3IFROU0NvYWNoTWFyayh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IENHUmVjdE1ha2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaG9tZVRhYi5vcmlnaW5YLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhvbWVUYWIub3JpZ2luWSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob21lVGFiLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhvbWVUYWIuaGVpZ2h0XG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiAnWW91IGNhbiB2aWV3IGFjdGl2ZSBwcm9qZWN0cyBoZXJlLicsXG4gICAgICAgICAgICAgICAgc2hhcGU6IFROU0NvYWNoTWFyay5TSEFQRVMuREVGQVVMVCxcbiAgICAgICAgICAgICAgICBsYWJlbFBvc2l0aW9uOiBUTlNDb2FjaE1hcmsuTEFCRUxfUE9TSVRJT05TLlRPUCxcbiAgICAgICAgICAgICAgICBsYWJlbEFsaWdubWVudDogVE5TQ29hY2hNYXJrLkxBQkVMX0FMSUdOTUVOVFMuTEVGVCxcbiAgICAgICAgICAgICAgICBzaG93QXJyb3c6IHRydWVcbiAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICBuZXcgVE5TQ29hY2hNYXJrKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogQ0dSZWN0TWFrZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXNUYWIub3JpZ2luWCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXNUYWIub3JpZ2luWSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXNUYWIud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzb3VyY2VzVGFiLmhlaWdodFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogJ1lvdSBjYW4gYWNjZXNzIGFsbCB0aGUgbWVkaWEgcmVzb3VyY2VzIGhlcmUuJyxcbiAgICAgICAgICAgICAgICBzaGFwZTogVE5TQ29hY2hNYXJrLlNIQVBFUy5ERUZBVUxULFxuICAgICAgICAgICAgICAgIGxhYmVsUG9zaXRpb246IFROU0NvYWNoTWFyay5MQUJFTF9QT1NJVElPTlMuVE9QLFxuICAgICAgICAgICAgICAgIGxhYmVsQWxpZ25tZW50OiBUTlNDb2FjaE1hcmsuTEFCRUxfQUxJR05NRU5UUy5DRU5URVIsXG4gICAgICAgICAgICAgICAgc2hvd0Fycm93OiB0cnVlXG4gICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgbmV3IFROU0NvYWNoTWFyayh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IENHUmVjdE1ha2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdFRhYi5vcmlnaW5YLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RUYWIub3JpZ2luWSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0VGFiLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RUYWIuaGVpZ2h0XG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiAnWW91IGNhbiBhZGQvdmlldyB5b3VyIG93biBwcm9qZWN0IGJ5IGNsaWNraW5nIHRoaXMuJyxcbiAgICAgICAgICAgICAgICBzaGFwZTogVE5TQ29hY2hNYXJrLlNIQVBFUy5ERUZBVUxULFxuICAgICAgICAgICAgICAgIGxhYmVsUG9zaXRpb246IFROU0NvYWNoTWFyay5MQUJFTF9QT1NJVElPTlMuVE9QLFxuICAgICAgICAgICAgICAgIGxhYmVsQWxpZ25tZW50OiBUTlNDb2FjaE1hcmsuTEFCRUxfQUxJR05NRU5UUy5SSUdIVCxcbiAgICAgICAgICAgICAgICBzaG93QXJyb3c6IHRydWVcbiAgICAgICAgICAgIH0pLFxuXG4gICAgICAgICAgICBuZXcgVE5TQ29hY2hNYXJrKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogQ0dSZWN0TWFrZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9maWxlVGFiLm9yaWdpblgsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZmlsZVRhYi5vcmlnaW5ZLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2ZpbGVUYWIud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZmlsZVRhYi5oZWlnaHRcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIGNhcHRpb246ICdDbGljayB0aGlzIHRvIHZpZXcgeW91ciBwcm9maWxlLicsXG4gICAgICAgICAgICAgICAgc2hhcGU6IFROU0NvYWNoTWFyay5TSEFQRVMuREVGQVVMVCxcbiAgICAgICAgICAgICAgICBsYWJlbFBvc2l0aW9uOiBUTlNDb2FjaE1hcmsuTEFCRUxfUE9TSVRJT05TLlRPUCwgLy9CT1RUT00sTEVGVCxUT1AsUklHSFQsUklHSFRfQk9UVE9NXG4gICAgICAgICAgICAgICAgbGFiZWxBbGlnbm1lbnQ6IFROU0NvYWNoTWFyay5MQUJFTF9BTElHTk1FTlRTLlJJR0hULCAvL0NFTlRFUixMRUZULFJJR0hUXG4gICAgICAgICAgICAgICAgc2hvd0Fycm93OiB0cnVlXG4gICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgbmV3IFROU0NvYWNoTWFyayh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IENHUmVjdE1ha2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NUYWIub3JpZ2luWCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nc1RhYi5vcmlnaW5ZLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzVGFiLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzVGFiLmhlaWdodFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogJ0NoZWNrIHlvdXIgc2V0dGluZ3MgYnkgY2xpY2tpbmcgdGhpcy4nLFxuICAgICAgICAgICAgICAgIHNoYXBlOiBUTlNDb2FjaE1hcmsuU0hBUEVTLkRFRkFVTFQsXG4gICAgICAgICAgICAgICAgbGFiZWxQb3NpdGlvbjogVE5TQ29hY2hNYXJrLkxBQkVMX1BPU0lUSU9OUy5MRUZULFxuICAgICAgICAgICAgICAgIGxhYmVsQWxpZ25tZW50OiBUTlNDb2FjaE1hcmsuTEFCRUxfQUxJR05NRU5UUy5MRUZULFxuICAgICAgICAgICAgICAgIHNob3dBcnJvdzogdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgXVxuICAgIH1cblxuXHRnZXRJQ29hY2hNYXJrT3B0aW9ucygpIHtcbiAgICAgICAgbGV0IG9wdGlvbnM6IElDb2FjaE1hcmtPcHRpb25zID0ge1xuICAgICAgICAgICAgY29udGludWVMYWJlbFRleHQ6ICcnLFxuICAgICAgICAgICAgc2tpcEJ1dHRvblRleHQ6ICdTa2lwJyxcbiAgICAgICAgICAgIGxibFNwYWNpbmc6IDMwLFxuICAgICAgICAgICAgLy8gbWFza0NvbG9yOiBVSUNvbG9yLmNvbG9yV2l0aFJlZEdyZWVuQmx1ZUFscGhhKDAuMzAsIDAuNDYsIDAuODksIC45KVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuXHRzZXR1cEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5jb2FjaE1hcmsuZXZlbnRzLm9uKCduYXZpZ2F0ZScsIChldmVudERhdGEpID0+IHtcbiAgICAgICAgICAgIC8vIHlvdSBjYW4gY3VzdG9taXplIGJ1dHRvbnMgYW5kIGJhciBhdCBlYWNoIHN0ZXBcbiAgICAgICAgICAgIHRoaXMuY3VzdG9taXplU3R5bGUoZXZlbnREYXRhLmRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvYWNoTWFyay5ldmVudHMub24oJ2NsaWNrJywgKGV2ZW50RGF0YSkgPT4ge30pO1xuXG4gICAgICAgIHRoaXMuY29hY2hNYXJrLmV2ZW50cy5vbignY2xlYW51cCcsIChldmVudERhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGByZWFkeSB0byBjbGVhbnVwIGluIGRlbW8uYCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRUb3VyKVxuICAgICAgICAgICAgdGhpcy5jb2FjaE1hcmsgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudFRvdXIgPT09ICdhY3Rpb25iYXInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJzVG91cigpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50VG91ciA9PT0gJ3RhYnMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLnNhdmVUb3VyU3RhdHVzKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3VzdG9taXplU3R5bGUoZGF0YTogYW55KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEuaW5zdGFuY2UuYXJyb3dJbWFnZS5pbWFnZSk7XG4gICAgICAgIC8vIGNvdWxkIGN1c3RvbWl6ZSB0aGUgYXJyb3dJbWFnZSBhdCBlYWNoIHN0ZXAgXG4gICAgICAgIC8vIGRhdGEuaW5zdGFuY2UuYXJyb3dJbWFnZS5pbWFnZSA9IFVJSW1hZ2UuaW1hZ2VOYW1lZCgnc29tZWltYWdlLnBuZycpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhLmluc3RhbmNlLmJ0blNraXBDb2FjaCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEuaW5zdGFuY2UubGJsQ2FwdGlvbik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEuaW5zdGFuY2UubGJsQ29udGludWUpO1xuICAgICAgICBpZiAoZGF0YS5pbnN0YW5jZS5sYmxDb250aW51ZSkge1xuICAgICAgICAgICAgLy8gb25seSBhdmFpbGFibGUgd2hlbiAncmVhZHknIGlzIGNhbGxlZFxuICAgICAgICAgICAgLy8gaXQgZGlzYXBwZWFycyBhZnRlciB0aGUgZmlyc3QgdGFwIGFuZCBhZHZhbmNlIHRvIG5leHQgc3RlcFxuICAgICAgICAgICAgLy8gbGV0IGxhYmVsQ29udGludWUgPSBkYXRhLmluc3RhbmNlLmxibENvbnRpbnVlLmZyYW1lOyAvLyAtMjBcbiAgICAgICAgICAgIC8vIGRhdGEuaW5zdGFuY2UubGJsQ29udGludWUuZnJhbWUgPSBDR1JlY3RNYWtlKGxhYmVsQ29udGludWUub3JpZ2luLngsIGxhYmVsQ29udGludWUub3JpZ2luLnkgLSAyMDAsIGxhYmVsQ29udGludWUuc2l6ZS53aWR0aCwgbGFiZWxDb250aW51ZS5zaXplLmhlaWdodCArIDIwKTtcbiAgICAgICAgICAgIGRhdGEuaW5zdGFuY2UubGJsQ29udGludWUuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKDAuOSwwLDAsMCkuaW9zOyBcbiAgICAgICAgICAgICAgLy8wLDAsMCBhbHBoYSAwLjlcbiAgICAgICAgICAgIC8vIGN1c3RvbSBjYXB0aW9uIGNvbG9yXG4gICAgICAgICAgICBkYXRhLmluc3RhbmNlLmxibENhcHRpb24udGV4dENvbG9yID0gbmV3IENvbG9yKCcjRkZFMTA4JykuaW9zOyAgXG5cbiAgICAgICAgICAgIC8vIGN1c3RvbWl6ZSBza2lwIGJ1dHRvblxuICAgICAgICAgICAgbGV0IGJ0blNraXAgPSBkYXRhLmluc3RhbmNlLmJ0blNraXBDb2FjaC5mcmFtZTtcbiAgICAgICAgICAgIGRhdGEuaW5zdGFuY2UuYnRuU2tpcENvYWNoLmZyYW1lID0gQ0dSZWN0TWFrZShidG5Ta2lwLm9yaWdpbi54LCBidG5Ta2lwLm9yaWdpbi55IC0gMzAwLCBidG5Ta2lwLnNpemUud2lkdGgsIGJ0blNraXAuc2l6ZS5oZWlnaHQgKyAyMCk7XG4gICAgICAgICAgICBkYXRhLmluc3RhbmNlLmJ0blNraXBDb2FjaC5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoJyNGRkUxMDgnKS5pb3M7XG4gICAgICAgICAgICBkYXRhLmluc3RhbmNlLmJ0blNraXBDb2FjaC50ZXh0Q29sb3IgPSBuZXcgQ29sb3IoJyMwMDAwMDAnKS5pb3M7IFxuICAgICAgICB9ICAgIFxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScpXG4gICAgdG91ckNoYW5nZUxpc3RlbmVyKGlzVG91ckRvbmUpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS50b3VyQ2hhbmdlZChpc1RvdXJEb25lKTtcbiAgICB9XG59Il19