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
var ShipmentProgressComponent = /** @class */ (function () {
    function ShipmentProgressComponent(modal) {
        this.modal = modal;
        this.activity = [];
    }
    ShipmentProgressComponent.prototype.ngOnInit = function () {
        this.activity = this.modal.context.activity;
    };
    ShipmentProgressComponent.prototype.onClose = function () {
        this.modal.closeCallback(true);
    };
    ShipmentProgressComponent = __decorate([
        core_1.Component({
            selector: "shipment-progress-modal",
            moduleId: module.id,
            templateUrl: "./shipment-progress-modal.component.html",
            styleUrls: ['./shipment-progress-modal.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams])
    ], ShipmentProgressComponent);
    return ShipmentProgressComponent;
}());
exports.ShipmentProgressComponent = ShipmentProgressComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcG1lbnQtcHJvZ3Jlc3MtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hpcG1lbnQtcHJvZ3Jlc3MtbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELG1FQUE0RTtBQVE1RTtJQUlJLG1DQUFvQixLQUF3QjtRQUF4QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUYvQyxhQUFRLEdBQWUsRUFBRSxDQUFDO0lBRXdCLENBQUM7SUFFaEQsNENBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQzdDLENBQUM7SUFFRCwyQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQVpRLHlCQUF5QjtRQU5yQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxTQUFTLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztTQUN6RCxDQUFDO3lDQUs2QiwyQkFBaUI7T0FKbkMseUJBQXlCLENBYXJDO0lBQUQsZ0NBQUM7Q0FBQSxBQWJELElBYUM7QUFiWSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic2hpcG1lbnQtcHJvZ3Jlc3MtbW9kYWxcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2hpcG1lbnQtcHJvZ3Jlc3MtbW9kYWwuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9zaGlwbWVudC1wcm9ncmVzcy1tb2RhbC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFNoaXBtZW50UHJvZ3Jlc3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdGFjdGl2aXR5OiBBcnJheTxhbnk+ID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1BhcmFtcykge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgIFx0dGhpcy5hY3Rpdml0eSA9IHRoaXMubW9kYWwuY29udGV4dC5hY3Rpdml0eTtcbiAgICB9XG5cbiAgICBvbkNsb3NlKCkge1xuICAgICAgICB0aGlzLm1vZGFsLmNsb3NlQ2FsbGJhY2sodHJ1ZSk7XG4gICAgfVxufSJdfQ==