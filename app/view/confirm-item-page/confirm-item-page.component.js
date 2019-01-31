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
var dialogs_1 = require("nativescript-angular/directives/dialogs");
// MODELS
var shipment_model_1 = require("../../models/shipment.model");
// SERVICES
var shipment_service_1 = require("../../services/shipment.service");
var dialogs_2 = require("nativescript-angular/directives/dialogs");
var component_event_service_1 = require("../../services/component-event.service");
var ConfirmItemComponent = /** @class */ (function () {
    function ConfirmItemComponent(_activatedRoute, params, _routerExtensions, modal, vcRef, _shipmentService, _componentService) {
        this._activatedRoute = _activatedRoute;
        this.params = params;
        this._routerExtensions = _routerExtensions;
        this.modal = modal;
        this.vcRef = vcRef;
        this._shipmentService = _shipmentService;
        this._componentService = _componentService;
        this.projectId = 0;
        this.shipmentId = 0;
        this.totalBands = 0;
        this.shipment = new shipment_model_1.Shipment();
        this.navOptions = this._componentService.getRouteOptions();
        this.projectId = this.params.context.projectId;
        this.shipmentId = this.params.context.shipmentId;
        this.totalBands = this.params.context.totalBands;
    }
    ConfirmItemComponent.prototype.ngOnInit = function () {
        this.shipment.deserialize({
            bandsReceived: null
        });
    };
    ConfirmItemComponent.prototype.onClose = function () {
        this.params.closeCallback({ success: false });
    };
    ConfirmItemComponent.prototype.confirmItem = function () {
        var _this = this;
        this._componentService.showLoader('Loading...');
        setTimeout(function () {
            if (!_this.shipment.bandsReceived) {
                _this._componentService.hideLoader();
                _this._componentService.showAlert('Oops!', 'All fields are required');
                return;
            }
            else {
                _this.confirm();
            }
        }, 800);
    };
    ConfirmItemComponent.prototype.confirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._shipmentService.confirm(this.shipmentId, this.shipment)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.success) {
                            this.params.closeCallback({ success: res.success, projectId: this.projectId });
                        }
                        else {
                            this._componentService.showAlert('Oops!', 'Something went wrong. Please try again.');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this._componentService.hideLoader();
                        this._componentService.showAlert('Oops!', 'Something went wrong. Please try again.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ConfirmItemComponent = __decorate([
        core_1.Component({
            selector: "confirm-item-page",
            moduleId: module.id,
            templateUrl: "./confirm-item-page.component.html",
            styleUrls: ['./confirm-item-page.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            dialogs_1.ModalDialogParams,
            router_2.RouterExtensions,
            dialogs_2.ModalDialogService,
            core_1.ViewContainerRef,
            shipment_service_1.ShipmentService,
            component_event_service_1.ComponentEventService])
    ], ConfirmItemComponent);
    return ConfirmItemComponent;
}());
exports.ConfirmItemComponent = ConfirmItemComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1pdGVtLXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlybS1pdGVtLXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFDcEUsMENBQWlEO0FBQ2pELHNEQUErRDtBQUUvRCxtRUFBNEU7QUFLNUUsU0FBUztBQUNULDhEQUF1RDtBQUV2RCxXQUFXO0FBQ1gsb0VBQWtFO0FBQ2xFLG1FQUE2RTtBQUM3RSxrRkFBK0U7QUFRL0U7SUFXSSw4QkFDWSxlQUErQixFQUMvQixNQUF5QixFQUN6QixpQkFBbUMsRUFDbkMsS0FBeUIsRUFDekIsS0FBdUIsRUFDdkIsZ0JBQWlDLEVBQ2pDLGlCQUF3QztRQU54QyxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0IsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUN6QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFmcEQsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFlbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHlCQUFRLEVBQUUsQ0FBQztRQUUvQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV2RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUV6RCxDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ3RCLGFBQWEsRUFBRSxJQUFJO1NBQ3RCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxzQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsMENBQVcsR0FBWDtRQUFBLGlCQWVDO1FBYkcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUUvQyxVQUFVLENBQUM7WUFDUCxJQUFHLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7Z0JBQzdCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDcEMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUseUJBQXlCLENBQUMsQ0FBQztnQkFDckUsT0FBTzthQUNWO2lCQUFLO2dCQUNGLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNsQjtRQUVMLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUVYLENBQUM7SUFFSyxzQ0FBTyxHQUFiOzs7Ozs7O3dCQUVrQixxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBekUsR0FBRyxHQUFHLFNBQW1FO3dCQUU3RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBRXBDLElBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRTs0QkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzt5QkFDbEY7NkJBQUs7NEJBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUseUNBQXlDLENBQUMsQ0FBQzt5QkFDeEY7Ozs7d0JBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUNwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSx5Q0FBeUMsQ0FBQyxDQUFDOzs7Ozs7S0FFNUY7SUF4RVEsb0JBQW9CO1FBTmhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsb0NBQW9DO1lBQ2pELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO1NBQ25ELENBQUM7eUNBYStCLHVCQUFjO1lBQ3ZCLDJCQUFpQjtZQUNOLHlCQUFnQjtZQUM1Qiw0QkFBa0I7WUFDbEIsdUJBQWdCO1lBQ0wsa0NBQWU7WUFDZCwrQ0FBcUI7T0FsQjNDLG9CQUFvQixDQXlFaEM7SUFBRCwyQkFBQztDQUFBLEFBekVELElBeUVDO0FBekVZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEl0ZW1Db25maXJtZWRDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vdmlldy9pdGVtLWNvbmZpcm1lZC1tb2RhbC1wYWdlL2l0ZW0tY29uZmlybWVkLW1vZGFsLXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcblxuLy8gT1RIRVJTXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5cbi8vIE1PREVMU1xuaW1wb3J0IHsgU2hpcG1lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NoaXBtZW50Lm1vZGVsXCI7XG5cbi8vIFNFUlZJQ0VTXG5pbXBvcnQgeyBTaGlwbWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2hpcG1lbnQuc2VydmljZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50RXZlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbXBvbmVudC1ldmVudC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImNvbmZpcm0taXRlbS1wYWdlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NvbmZpcm0taXRlbS1wYWdlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vY29uZmlybS1pdGVtLXBhZ2UuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maXJtSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgXG4gICAgaW5wdXR0ZWRCYW5kOiBudW1iZXI7XG4gICAgcHJvamVjdElkOiBudW1iZXIgPSAwO1xuICAgIHNoaXBtZW50SWQ6IG51bWJlciA9IDA7XG4gICAgdG90YWxCYW5kczogbnVtYmVyID0gMDtcblxuICAgIG5hdk9wdGlvbnM6IGFueTtcblxuICAgIHNoaXBtZW50OiBTaGlwbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9hY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcyxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIF9zaGlwbWVudFNlcnZpY2U6IFNoaXBtZW50U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfY29tcG9uZW50U2VydmljZTogQ29tcG9uZW50RXZlbnRTZXJ2aWNlLFxuICAgICkge1xuICAgICAgICB0aGlzLnNoaXBtZW50ID0gbmV3IFNoaXBtZW50KCk7XG5cbiAgICAgICAgdGhpcy5uYXZPcHRpb25zID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRSb3V0ZU9wdGlvbnMoKTtcbiAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnByb2plY3RJZCA9IHRoaXMucGFyYW1zLmNvbnRleHQucHJvamVjdElkO1xuICAgICAgICAgICAgdGhpcy5zaGlwbWVudElkID0gdGhpcy5wYXJhbXMuY29udGV4dC5zaGlwbWVudElkO1xuICAgICAgICAgICAgdGhpcy50b3RhbEJhbmRzID0gdGhpcy5wYXJhbXMuY29udGV4dC50b3RhbEJhbmRzO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zaGlwbWVudC5kZXNlcmlhbGl6ZSh7XG4gICAgICAgICAgICBiYW5kc1JlY2VpdmVkOiBudWxsXG4gICAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgICB9XG4gICBcbiAgICBjb25maXJtSXRlbSgpIHtcblxuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ0xvYWRpbmcuLi4nKVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYoIXRoaXMuc2hpcG1lbnQuYmFuZHNSZWNlaXZlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb3BzIScsICdBbGwgZmllbGRzIGFyZSByZXF1aXJlZCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm0oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCA4MDApXG5cbiAgICB9XG5cbiAgICBhc3luYyBjb25maXJtKCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fc2hpcG1lbnRTZXJ2aWNlLmNvbmZpcm0odGhpcy5zaGlwbWVudElkLCB0aGlzLnNoaXBtZW50KTtcblxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG5cbiAgICAgICAgICAgIGlmKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh7IHN1Y2Nlc3M6IHJlcy5zdWNjZXNzLCBwcm9qZWN0SWQ6IHRoaXMucHJvamVjdElkIH0pOyAgICAgXG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vcHMhJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29wcyEnLCAnU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgIH1cbiAgICB9XG59Il19