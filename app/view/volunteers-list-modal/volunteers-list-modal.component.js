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
var project_member_service_1 = require("../../services/project-member.service");
var component_event_service_1 = require("../../services/component-event.service");
var VolunteersListComponent = /** @class */ (function () {
    function VolunteersListComponent(modal, _componentService, _projectMemberService) {
        this.modal = modal;
        this._componentService = _componentService;
        this._projectMemberService = _projectMemberService;
        this.projectId = 0;
        this.volunteers = [];
        this.projectId = this.modal.context.projectId;
    }
    VolunteersListComponent.prototype.ngOnInit = function () {
        this._componentService.showLoader('Loading...');
        this.getProjectMembers();
    };
    VolunteersListComponent.prototype.onClose = function () {
        this.modal.closeCallback(true);
    };
    VolunteersListComponent.prototype.getProjectMembers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, i, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._projectMemberService.getProjectMembers(this.projectId)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.data.length > 0) {
                            for (i = 0; i < res.data.length; i++) {
                                res.data[i].imageUrl = this._componentService.getImageProfile(res.data[i].imageUrl);
                            }
                            this.volunteers = res.data;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        this._componentService.hideLoader();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VolunteersListComponent = __decorate([
        core_1.Component({
            selector: "volunteers-list-modal",
            moduleId: module.id,
            templateUrl: "./volunteers-list-modal.component.html",
            styleUrls: ['./volunteers-list-modal.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
            component_event_service_1.ComponentEventService,
            project_member_service_1.ProjectMemberService])
    ], VolunteersListComponent);
    return VolunteersListComponent;
}());
exports.VolunteersListComponent = VolunteersListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9sdW50ZWVycy1saXN0LW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZvbHVudGVlcnMtbGlzdC1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCxtRUFBNEU7QUFFNUUsV0FBVztBQUNYLGdGQUE2RTtBQUM3RSxrRkFBK0U7QUFRL0U7SUFNSSxpQ0FDWSxLQUF3QixFQUV4QixpQkFBd0MsRUFDeEMscUJBQTJDO1FBSDNDLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBRXhCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFDeEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzQjtRQVJ2RCxjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRXpCLGVBQVUsR0FBZSxFQUFFLENBQUE7UUFRcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7SUFDbEQsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCx5Q0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVLLG1EQUFpQixHQUF2Qjs7Ozs7Ozt3QkFFa0IscUJBQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQTs7d0JBQXhFLEdBQUcsR0FBRyxTQUFrRTt3QkFFNUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUNwQyxJQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDcEIsS0FBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQ0FDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzZCQUN2Rjs0QkFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7eUJBQzlCOzs7O3dCQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUE7d0JBQ2QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDOzs7Ozs7S0FFM0M7SUF4Q1EsdUJBQXVCO1FBTm5DLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0NBQXdDO1lBQ3JELFNBQVMsRUFBRSxDQUFDLHVDQUF1QyxDQUFDO1NBQ3ZELENBQUM7eUNBUXFCLDJCQUFpQjtZQUVMLCtDQUFxQjtZQUNqQiw2Q0FBb0I7T0FWOUMsdUJBQXVCLENBeUNuQztJQUFELDhCQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7QUF6Q1ksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5cbi8vIFNFUlZJQ0VTXG5pbXBvcnQgeyBQcm9qZWN0TWVtYmVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wcm9qZWN0LW1lbWJlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21wb25lbnRFdmVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29tcG9uZW50LWV2ZW50LnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwidm9sdW50ZWVycy1saXN0LW1vZGFsXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3ZvbHVudGVlcnMtbGlzdC1tb2RhbC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL3ZvbHVudGVlcnMtbGlzdC1tb2RhbC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFZvbHVudGVlcnNMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHByb2plY3RJZDogbnVtYmVyID0gMDtcblxuXHR2b2x1bnRlZXJzOiBBcnJheTxhbnk+ID0gW11cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1BhcmFtcyxcblxuICAgICAgICBwcml2YXRlIF9jb21wb25lbnRTZXJ2aWNlOiBDb21wb25lbnRFdmVudFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3Byb2plY3RNZW1iZXJTZXJ2aWNlOiBQcm9qZWN0TWVtYmVyU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0SWQgPSB0aGlzLm1vZGFsLmNvbnRleHQucHJvamVjdElkO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ0xvYWRpbmcuLi4nKTtcbiAgICBcdHRoaXMuZ2V0UHJvamVjdE1lbWJlcnMoKTtcbiAgICB9XG5cbiAgICBvbkNsb3NlKCkge1xuICAgICAgICB0aGlzLm1vZGFsLmNsb3NlQ2FsbGJhY2sodHJ1ZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0UHJvamVjdE1lbWJlcnMoKSB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9wcm9qZWN0TWVtYmVyU2VydmljZS5nZXRQcm9qZWN0TWVtYmVycyh0aGlzLnByb2plY3RJZCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgaWYocmVzLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZXMuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVtpXS5pbWFnZVVybCA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0SW1hZ2VQcm9maWxlKHJlcy5kYXRhW2ldLmltYWdlVXJsKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZvbHVudGVlcnMgPSByZXMuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=