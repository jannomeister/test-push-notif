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
var ItemConfirmedComponent = /** @class */ (function () {
    function ItemConfirmedComponent(params) {
        this.params = params;
    }
    ItemConfirmedComponent.prototype.ngOnInit = function () { };
    ItemConfirmedComponent.prototype.onClose = function () {
        this.params.closeCallback();
    };
    ItemConfirmedComponent = __decorate([
        core_1.Component({
            selector: "item-confirmed-modal-page",
            moduleId: module.id,
            templateUrl: "./item-confirmed-modal-page.component.html",
            styleUrls: ['./item-confirmed-modal-page.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams])
    ], ItemConfirmedComponent);
    return ItemConfirmedComponent;
}());
exports.ItemConfirmedComponent = ItemConfirmedComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1jb25maXJtZWQtbW9kYWwtcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpdGVtLWNvbmZpcm1lZC1tb2RhbC1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCxtRUFBNEU7QUFRNUU7SUFFSSxnQ0FBb0IsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7SUFBRyxDQUFDO0lBRWpELHlDQUFRLEdBQVIsY0FBWSxDQUFDO0lBRWIsd0NBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQVJRLHNCQUFzQjtRQU5sQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDRDQUE0QztZQUN6RCxTQUFTLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQztTQUMzRCxDQUFDO3lDQUc4QiwyQkFBaUI7T0FGcEMsc0JBQXNCLENBU2xDO0lBQUQsNkJBQUM7Q0FBQSxBQVRELElBU0M7QUFUWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaXRlbS1jb25maXJtZWQtbW9kYWwtcGFnZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtLWNvbmZpcm1lZC1tb2RhbC1wYWdlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vaXRlbS1jb25maXJtZWQtbW9kYWwtcGFnZS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1Db25maXJtZWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7fVxuICAgIFxuICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcbiAgICB9XG59ICAgIl19