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
var JoinProjectAlertComponent = /** @class */ (function () {
    function JoinProjectAlertComponent(params) {
        this.params = params;
    }
    JoinProjectAlertComponent.prototype.ngOnInit = function () { };
    JoinProjectAlertComponent.prototype.done = function () {
        this.params.closeCallback(true);
    };
    JoinProjectAlertComponent.prototype.onClose = function () {
        this.params.closeCallback(true);
    };
    JoinProjectAlertComponent = __decorate([
        core_1.Component({
            selector: "joinproject-alert-page",
            moduleId: module.id,
            templateUrl: "./joinproject-alert-page.component.html",
            styleUrls: ['./joinproject-alert-page.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams])
    ], JoinProjectAlertComponent);
    return JoinProjectAlertComponent;
}());
exports.JoinProjectAlertComponent = JoinProjectAlertComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbnByb2plY3QtYWxlcnQtcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqb2lucHJvamVjdC1hbGVydC1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCxtRUFBNEU7QUFRNUU7SUFFSSxtQ0FBb0IsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7SUFBRyxDQUFDO0lBRWpELDRDQUFRLEdBQVIsY0FBWSxDQUFDO0lBRWIsd0NBQUksR0FBSjtRQUNDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCwyQ0FBTyxHQUFQO1FBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQVpXLHlCQUF5QjtRQU5yQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHlDQUF5QztZQUN0RCxTQUFTLEVBQUUsQ0FBQyx3Q0FBd0MsQ0FBQztTQUN4RCxDQUFDO3lDQUc4QiwyQkFBaUI7T0FGcEMseUJBQXlCLENBYXJDO0lBQUQsZ0NBQUM7Q0FBQSxBQWJELElBYUM7QUFiWSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiam9pbnByb2plY3QtYWxlcnQtcGFnZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9qb2lucHJvamVjdC1hbGVydC1wYWdlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vam9pbnByb2plY3QtYWxlcnQtcGFnZS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEpvaW5Qcm9qZWN0QWxlcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7fVxuXG4gICAgZG9uZSgpIHtcbiAgICBcdHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2sodHJ1ZSk7XG4gICAgfVxuICAgXHRcbiAgIFx0b25DbG9zZSgpIHtcbiAgICBcdHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2sodHJ1ZSk7XG5cdH1cbn0iXX0=