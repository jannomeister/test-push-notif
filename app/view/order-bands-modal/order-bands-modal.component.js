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
var dialogs_1 = require("nativescript-angular/directives/dialogs");
// SERVICES
var project_service_1 = require("../../services/project.service");
var component_event_service_1 = require("../../services/component-event.service");
// MODELS
var project_model_1 = require("../../models/project.model");
var OrderBandsComponent = /** @class */ (function () {
    function OrderBandsComponent(params, _projectService, _componentService) {
        this.params = params;
        this._projectService = _projectService;
        this._componentService = _componentService;
        this.projectId = 0;
        this.selectedBand = 0;
        this.numberOfBands = [200, 300, 400];
        this.project = new project_model_1.Project();
        this.project.deserialize({ totalBands: this.numberOfBands[0] });
        this.navOptions = this._componentService.getRouteOptions();
        this.projectId = this.params.context.projectId;
        this.dateStart = this.params.context.dateStart;
    }
    OrderBandsComponent.prototype.ngOnInit = function () { };
    OrderBandsComponent.prototype.onClose = function () {
        this.params.closeCallback({ success: false });
    };
    OrderBandsComponent.prototype.onBandsClose = function () {
        this.project.totalBands = this.numberOfBands[this.selectedBand];
    };
    OrderBandsComponent.prototype.confirm = function () {
        var _this = this;
        this._componentService
            .showBandsConfirmationAlert(this.project.totalBands, this.dateStart)
            .then(function (res) {
            _this._componentService.showLoader('');
            _this.updateProjectApproved(_this.project);
        });
    };
    OrderBandsComponent.prototype.updateProjectApproved = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._projectService.updateProjectApproved(this.projectId, data)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        this.params.closeCallback({ success: true, projectId: this.projectId });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this._componentService.hideLoader();
                        this._componentService.showAlert('Oops!', 'Unable to order bands. Please try again later');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderBandsComponent = __decorate([
        core_1.Component({
            selector: "order-bands-modal",
            moduleId: module.id,
            templateUrl: "./order-bands-modal.component.html",
            styleUrls: ['./order-bands-modal.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
            project_service_1.ProjectService,
            component_event_service_1.ComponentEventService])
    ], OrderBandsComponent);
    return OrderBandsComponent;
}());
exports.OrderBandsComponent = OrderBandsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYmFuZHMtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib3JkZXItYmFuZHMtbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsbUVBQTRFO0FBRTVFLFdBQVc7QUFDWCxrRUFBZ0U7QUFDaEUsa0ZBQStFO0FBRS9FLFNBQVM7QUFDVCw0REFBcUQ7QUFRckQ7SUFXSSw2QkFDUyxNQUF5QixFQUV0QixlQUErQixFQUNsQyxpQkFBd0M7UUFIeEMsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFFdEIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQ2xDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFicEQsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUNuQixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUU1QixrQkFBYSxHQUFrQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFZM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHVCQUFPLEVBQUUsQ0FBQztRQUUxQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUUvRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsc0NBQVEsR0FBUixjQUFZLENBQUM7SUFFYixxQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsMENBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxxQ0FBTyxHQUFQO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsaUJBQWlCO2FBQ2pCLDBCQUEwQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDbkUsSUFBSSxDQUFDLFVBQUMsR0FBRztZQUNOLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDckMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFSyxtREFBcUIsR0FBM0IsVUFBNEIsSUFBSTs7Ozs7Ozt3QkFFZCxxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUE7O3dCQUE1RSxHQUFHLEdBQUcsU0FBc0U7d0JBRWhGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzs7Ozt3QkFFeEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUNwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSwrQ0FBK0MsQ0FBQyxDQUFBOzs7Ozs7S0FFakc7SUF2RFEsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsb0NBQW9DO1lBQ2pELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO1NBQ25ELENBQUM7eUNBYW1CLDJCQUFpQjtZQUVMLGdDQUFjO1lBQ2YsK0NBQXFCO09BZnhDLG1CQUFtQixDQXdEL0I7SUFBRCwwQkFBQztDQUFBLEFBeERELElBd0RDO0FBeERZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuXG4vLyBTRVJWSUNFU1xuaW1wb3J0IHsgUHJvamVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcHJvamVjdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21wb25lbnRFdmVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29tcG9uZW50LWV2ZW50LnNlcnZpY2VcIjtcblxuLy8gTU9ERUxTXG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9wcm9qZWN0Lm1vZGVsXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm9yZGVyLWJhbmRzLW1vZGFsXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL29yZGVyLWJhbmRzLW1vZGFsLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vb3JkZXItYmFuZHMtbW9kYWwuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckJhbmRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRwcm9qZWN0SWQ6IG51bWJlciA9IDA7XG4gICAgc2VsZWN0ZWRCYW5kOiBudW1iZXIgPSAwO1xuICAgIGRhdGVTdGFydDogc3RyaW5nO1xuXHRudW1iZXJPZkJhbmRzOiBBcnJheTxudW1iZXI+ID0gWzIwMCwgMzAwLCA0MDBdO1xuXG5cdHByb2plY3Q6IFByb2plY3Q7IFxuXG5cdG5hdk9wdGlvbnM6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgIFx0cHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxuXG4gICAgICAgIHByaXZhdGUgX3Byb2plY3RTZXJ2aWNlOiBQcm9qZWN0U2VydmljZSxcbiAgICBcdHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcbiAgICApIHtcbiAgICBcdHRoaXMucHJvamVjdCA9IG5ldyBQcm9qZWN0KCk7XG5cbiAgICAgICAgdGhpcy5wcm9qZWN0LmRlc2VyaWFsaXplKHsgdG90YWxCYW5kczogdGhpcy5udW1iZXJPZkJhbmRzWzBdIH0pXG5cbiAgICAgICAgdGhpcy5uYXZPcHRpb25zID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRSb3V0ZU9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0SWQgPSB0aGlzLnBhcmFtcy5jb250ZXh0LnByb2plY3RJZDtcbiAgICAgICAgdGhpcy5kYXRlU3RhcnQgPSB0aGlzLnBhcmFtcy5jb250ZXh0LmRhdGVTdGFydDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHt9XG5cbiAgICBvbkNsb3NlKCkge1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgfVxuXG4gICAgb25CYW5kc0Nsb3NlKCkge1xuICAgICAgICB0aGlzLnByb2plY3QudG90YWxCYW5kcyA9IHRoaXMubnVtYmVyT2ZCYW5kc1t0aGlzLnNlbGVjdGVkQmFuZF07XG4gICAgfVxuXG4gICAgY29uZmlybSgpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZVxuICAgICAgICAgICAgLnNob3dCYW5kc0NvbmZpcm1hdGlvbkFsZXJ0KHRoaXMucHJvamVjdC50b3RhbEJhbmRzLCB0aGlzLmRhdGVTdGFydClcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJycpXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9qZWN0QXBwcm92ZWQodGhpcy5wcm9qZWN0KVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgdXBkYXRlUHJvamVjdEFwcHJvdmVkKGRhdGEpIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3Byb2plY3RTZXJ2aWNlLnVwZGF0ZVByb2plY3RBcHByb3ZlZCh0aGlzLnByb2plY3RJZCwgZGF0YSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh7IHN1Y2Nlc3M6IHRydWUsIHByb2plY3RJZDogdGhpcy5wcm9qZWN0SWQgfSk7XG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb3BzIScsICdVbmFibGUgdG8gb3JkZXIgYmFuZHMuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXInKVxuICAgICAgICB9XG4gICAgfVxufSJdfQ==