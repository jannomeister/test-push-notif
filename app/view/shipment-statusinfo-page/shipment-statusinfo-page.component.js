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
var shipment_progress_modal_component_1 = require("../shipment-progress-modal/shipment-progress-modal.component");
// SERVICES
var user_service_1 = require("../../services/user.service");
var shipment_service_1 = require("../../services/shipment.service");
var component_event_service_1 = require("../../services/component-event.service");
var dialogs_2 = require("nativescript-angular/directives/dialogs");
var ShipmentStatusInfoComponent = /** @class */ (function () {
    function ShipmentStatusInfoComponent(vcRef, modal, params, _activatedRoute, _routerExtensions, _userService, _shipmentService, _componentService) {
        this.vcRef = vcRef;
        this.modal = modal;
        this.params = params;
        this._activatedRoute = _activatedRoute;
        this._routerExtensions = _routerExtensions;
        this._userService = _userService;
        this._shipmentService = _shipmentService;
        this._componentService = _componentService;
        this.projectId = 0;
        this.isLoading = true;
        this.shipment = {};
        this.navOptions = this._componentService.getRouteOptions();
        this.projectId = this.params.context.projectId;
    }
    ShipmentStatusInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.trackShipment();
        }, 800);
    };
    ShipmentStatusInfoComponent.prototype.close = function () {
        this.params.closeCallback({ success: true });
    };
    ShipmentStatusInfoComponent.prototype.openProgress = function () {
        var opt = {
            context: { activity: this.shipment.activity },
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true
        };
        this.modal.showModal(shipment_progress_modal_component_1.ShipmentProgressComponent, opt).then(function (response) { return console.log(response); });
    };
    ShipmentStatusInfoComponent.prototype.trackShipment = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._shipmentService.trackShipment(this.projectId)];
                    case 1:
                        res = _a.sent();
                        this.isLoading = false;
                        if (res.data) {
                            this.shipment = res.data;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.isLoading = false;
                        console.log(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShipmentStatusInfoComponent = __decorate([
        core_1.Component({
            selector: "shipment-statusinfo-page",
            moduleId: module.id,
            templateUrl: "./shipment-statusinfo-page.component.html",
            styleUrls: ['./shipment-statusinfo-page.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef,
            dialogs_2.ModalDialogService,
            dialogs_1.ModalDialogParams,
            router_1.ActivatedRoute,
            router_2.RouterExtensions,
            user_service_1.UserService,
            shipment_service_1.ShipmentService,
            component_event_service_1.ComponentEventService])
    ], ShipmentStatusInfoComponent);
    return ShipmentStatusInfoComponent;
}());
exports.ShipmentStatusInfoComponent = ShipmentStatusInfoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcG1lbnQtc3RhdHVzaW5mby1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoaXBtZW50LXN0YXR1c2luZm8tcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQUNwRSwwQ0FBaUQ7QUFDakQsc0RBQStEO0FBQy9ELG1FQUE0RTtBQUk1RSxrSEFBd0c7QUFLeEcsV0FBVztBQUNYLDREQUEwRDtBQUMxRCxvRUFBa0U7QUFDbEUsa0ZBQStFO0FBQy9FLG1FQUE2RTtBQVU3RTtJQVVJLHFDQUNZLEtBQXVCLEVBQ3ZCLEtBQXlCLEVBQ3pCLE1BQXlCLEVBQ3pCLGVBQStCLEVBQy9CLGlCQUFtQyxFQUNuQyxZQUF5QixFQUN6QixnQkFBaUMsRUFDakMsaUJBQXdDO1FBUHhDLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3pCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQWhCcEQsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUl0QixjQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGFBQVEsR0FBUSxFQUFFLENBQUE7UUFZZCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsOENBQVEsR0FBUjtRQUFBLGlCQUlDO1FBSEcsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNYLENBQUM7SUFFRCwyQ0FBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsa0RBQVksR0FBWjtRQUNJLElBQUksR0FBRyxHQUFHO1lBQ04sT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzdDLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1lBQzVCLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUE7UUFHRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyw2REFBeUIsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUE7SUFDaEcsQ0FBQztJQUVLLG1EQUFhLEdBQW5COzs7Ozs7O3dCQUVrQixxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQTs7d0JBQS9ELEdBQUcsR0FBRyxTQUF5RDt3QkFFbkUsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7d0JBQ3ZCLElBQUcsR0FBRyxDQUFDLElBQUksRUFBRTs0QkFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7eUJBQzVCOzs7O3dCQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO3dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFBOzs7Ozs7S0FFckI7SUExRFEsMkJBQTJCO1FBTnZDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkNBQTJDO1lBQ3hELFNBQVMsRUFBRSxDQUFDLDBDQUEwQyxDQUFDO1NBQzFELENBQUM7eUNBWXFCLHVCQUFnQjtZQUNoQiw0QkFBa0I7WUFDakIsMkJBQWlCO1lBQ1IsdUJBQWM7WUFDWix5QkFBZ0I7WUFDckIsMEJBQVc7WUFDUCxrQ0FBZTtZQUNkLCtDQUFxQjtPQWxCM0MsMkJBQTJCLENBMkR2QztJQUFELGtDQUFDO0NBQUEsQUEzREQsSUEyREM7QUEzRFksa0VBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5cbi8vIE9USEVSU1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IFNoaXBtZW50UHJvZ3Jlc3NDb21wb25lbnQgfSBmcm9tIFwiLi4vc2hpcG1lbnQtcHJvZ3Jlc3MtbW9kYWwvc2hpcG1lbnQtcHJvZ3Jlc3MtbW9kYWwuY29tcG9uZW50XCJcblxuLy8gTU9ERUxTXG5pbXBvcnQgeyBTaGlwbWVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2hpcG1lbnQubW9kZWxcIjtcblxuLy8gU0VSVklDRVNcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgU2hpcG1lbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NoaXBtZW50LnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuXG5kZWNsYXJlIHZhciBVSVRhYmxlVmlld0NlbGxTZWxlY3Rpb25TdHlsZTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzaGlwbWVudC1zdGF0dXNpbmZvLXBhZ2VcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2hpcG1lbnQtc3RhdHVzaW5mby1wYWdlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2hpcG1lbnQtc3RhdHVzaW5mby1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgU2hpcG1lbnRTdGF0dXNJbmZvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHByb2plY3RJZDogbnVtYmVyID0gMDtcblxuICAgIG5hdk9wdGlvbnM6IGFueTtcblxuICAgIGlzTG9hZGluZzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBzaGlwbWVudDogYW55ID0ge31cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcyxcbiAgICAgICAgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3NoaXBtZW50U2VydmljZTogU2hpcG1lbnRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9jb21wb25lbnRTZXJ2aWNlOiBDb21wb25lbnRFdmVudFNlcnZpY2UsXG4gICAgKSB7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucyA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0Um91dGVPcHRpb25zKCk7XG4gICAgICAgIHRoaXMucHJvamVjdElkID0gdGhpcy5wYXJhbXMuY29udGV4dC5wcm9qZWN0SWQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50cmFja1NoaXBtZW50KCk7XG4gICAgICAgIH0sIDgwMClcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgb3BlblByb2dyZXNzKCkge1xuICAgICAgICBsZXQgb3B0ID0ge1xuICAgICAgICAgICAgY29udGV4dDogeyBhY3Rpdml0eTogdGhpcy5zaGlwbWVudC5hY3Rpdml0eSB9LFxuICAgICAgICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXG4gICAgICAgICAgICBhbmltYXRlZDogdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKFNoaXBtZW50UHJvZ3Jlc3NDb21wb25lbnQsIG9wdCkudGhlbihyZXNwb25zZSA9PiBjb25zb2xlLmxvZyhyZXNwb25zZSkpXG4gICAgfVxuXG4gICAgYXN5bmMgdHJhY2tTaGlwbWVudCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9zaGlwbWVudFNlcnZpY2UudHJhY2tTaGlwbWVudCh0aGlzLnByb2plY3RJZCk7XG5cbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpZihyZXMuZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcG1lbnQgPSByZXMuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICB9XG4gICAgfVxufSJdfQ==