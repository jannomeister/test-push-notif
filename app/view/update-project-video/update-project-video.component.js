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
var project_service_1 = require("../../services/project.service");
var component_event_service_1 = require("../../services/component-event.service");
var project_model_1 = require("../../models/project.model");
var UpdateProjectVideoComponent = /** @class */ (function () {
    function UpdateProjectVideoComponent(modal, _projectService, _componentService) {
        this.modal = modal;
        this._projectService = _projectService;
        this._componentService = _componentService;
        this.buttonText = 'DONE';
        this.project = new project_model_1.Project();
        this.project.deserialize({
            videoLink: ''
        });
    }
    UpdateProjectVideoComponent.prototype.ngOnInit = function () {
        this.projectId = this.modal.context.projectId;
        this.project.videoLink = this.modal.context.videoLink;
    };
    UpdateProjectVideoComponent.prototype.onTextChange = function (args) {
        var textField = args.object;
        if (textField.text.trim() === this.modal.context.videoLink.trim()) {
            this.buttonText = 'DONE';
        }
        else if (!textField.text.trim()) {
            this.buttonText = 'UPDATE';
        }
        else {
            this.buttonText = 'UPDATE';
        }
    };
    UpdateProjectVideoComponent.prototype.close = function () {
        this.modal.closeCallback({ success: false });
    };
    UpdateProjectVideoComponent.prototype.update = function () {
        if (!this.project.videoLink) {
            this._componentService.showErrorFeedback('Ooops!', 'Field must not be empty.');
        }
        else if (this.project.videoLink.trim() === this.modal.context.videoLink.trim()) {
            this.modal.closeCallback({ success: false });
        }
        else {
            this.updateProject();
        }
    };
    UpdateProjectVideoComponent.prototype.updateProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._componentService.showLoader('Updating...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._projectService.updateProject(this.projectId, this.project)];
                    case 2:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.success) {
                            this._componentService.showSuccessFeedback('', 'Successfully updated!');
                            data = {
                                id: this._componentService.getYoutubeId(this.project.videoLink),
                                link: this.project.videoLink
                            };
                            this.modal.closeCallback({ success: true, data: data });
                        }
                        else {
                            this._componentService.showErrorFeedback('Ooops!', 'Update failed');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this._componentService.hideLoader();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UpdateProjectVideoComponent = __decorate([
        core_1.Component({
            selector: "update-project-video",
            moduleId: module.id,
            templateUrl: "./update-project-video.component.html",
            styleUrls: ['./update-project-video.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
            project_service_1.ProjectService,
            component_event_service_1.ComponentEventService])
    ], UpdateProjectVideoComponent);
    return UpdateProjectVideoComponent;
}());
exports.UpdateProjectVideoComponent = UpdateProjectVideoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXByb2plY3QtdmlkZW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXBkYXRlLXByb2plY3QtdmlkZW8uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsbUVBQTRFO0FBRzVFLGtFQUFnRTtBQUNoRSxrRkFBK0U7QUFFL0UsNERBQXFEO0FBUXJEO0lBT0kscUNBQ1ksS0FBd0IsRUFDeEIsZUFBK0IsRUFDL0IsaUJBQXdDO1FBRnhDLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBUnBELGVBQVUsR0FBVyxNQUFNLENBQUM7UUFVeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHVCQUFPLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUNyQixTQUFTLEVBQUUsRUFBRTtTQUNoQixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsOENBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsa0RBQVksR0FBWixVQUFhLElBQUk7UUFDYixJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXZDLElBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDOUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7U0FDNUI7YUFBSyxJQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQztZQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztTQUM5QjthQUFJO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRUQsMkNBQUssR0FBTDtRQUNDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVFLDRDQUFNLEdBQU47UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSwwQkFBMEIsQ0FBQyxDQUFBO1NBQ2pGO2FBQUssSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUM7WUFDM0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUNoRDthQUFJO1lBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVLLG1EQUFhLEdBQW5COzs7Ozs7d0JBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7Ozt3QkFFbkMscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUE1RSxHQUFHLEdBQUcsU0FBc0U7d0JBRWhGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDcEMsSUFBRyxHQUFHLENBQUMsT0FBTyxFQUFFOzRCQUNaLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsdUJBQXVCLENBQUMsQ0FBQTs0QkFDbkUsSUFBSSxHQUFHO2dDQUNQLEVBQUUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO2dDQUMvRCxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzZCQUMvQixDQUFBOzRCQUNELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTt5QkFDMUQ7NkJBQUk7NEJBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQTt5QkFDdEU7Ozs7d0JBR0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDOzs7Ozs7S0FFM0M7SUFyRVEsMkJBQTJCO1FBTnZDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUNBQXVDO1lBQ3BELFNBQVMsRUFBRSxDQUFDLHNDQUFzQyxDQUFDO1NBQ3RELENBQUM7eUNBU3FCLDJCQUFpQjtZQUNQLGdDQUFjO1lBQ1osK0NBQXFCO09BVjNDLDJCQUEyQixDQXNFdkM7SUFBRCxrQ0FBQztDQUFBLEFBdEVELElBc0VDO0FBdEVZLGtFQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcblxuaW1wb3J0IHsgUHJvamVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcHJvamVjdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21wb25lbnRFdmVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29tcG9uZW50LWV2ZW50LnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvcHJvamVjdC5tb2RlbFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ1cGRhdGUtcHJvamVjdC12aWRlb1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi91cGRhdGUtcHJvamVjdC12aWRlby5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL3VwZGF0ZS1wcm9qZWN0LXZpZGVvLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgVXBkYXRlUHJvamVjdFZpZGVvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGJ1dHRvblRleHQ6IHN0cmluZyA9ICdET05FJztcbiAgICBwcm9qZWN0SWQ6IG51bWJlcjtcblxuICAgIHByb2plY3Q6IFByb2plY3Q7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dQYXJhbXMsXG4gICAgICAgIHByaXZhdGUgX3Byb2plY3RTZXJ2aWNlOiBQcm9qZWN0U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfY29tcG9uZW50U2VydmljZTogQ29tcG9uZW50RXZlbnRTZXJ2aWNlLFxuICAgICkge1xuICAgICAgICB0aGlzLnByb2plY3QgPSBuZXcgUHJvamVjdCgpO1xuICAgICAgICB0aGlzLnByb2plY3QuZGVzZXJpYWxpemUoe1xuICAgICAgICAgICAgdmlkZW9MaW5rOiAnJ1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnByb2plY3RJZCA9IHRoaXMubW9kYWwuY29udGV4dC5wcm9qZWN0SWQ7XG4gICAgICAgIHRoaXMucHJvamVjdC52aWRlb0xpbmsgPSB0aGlzLm1vZGFsLmNvbnRleHQudmlkZW9MaW5rO1xuICAgIH1cblxuICAgIG9uVGV4dENoYW5nZShhcmdzKSB7XG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIGlmKHRleHRGaWVsZC50ZXh0LnRyaW0oKSA9PT0gdGhpcy5tb2RhbC5jb250ZXh0LnZpZGVvTGluay50cmltKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uVGV4dCA9ICdET05FJztcbiAgICAgICAgfWVsc2UgaWYoIXRleHRGaWVsZC50ZXh0LnRyaW0oKSl7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvblRleHQgPSAnVVBEQVRFJztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvblRleHQgPSAnVVBEQVRFJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgIFx0dGhpcy5tb2RhbC5jbG9zZUNhbGxiYWNrKHsgc3VjY2VzczogZmFsc2UgfSk7XG5cdH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYoIXRoaXMucHJvamVjdC52aWRlb0xpbmspIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0Vycm9yRmVlZGJhY2soJ09vb3BzIScsICdGaWVsZCBtdXN0IG5vdCBiZSBlbXB0eS4nKVxuICAgICAgICB9ZWxzZSBpZih0aGlzLnByb2plY3QudmlkZW9MaW5rLnRyaW0oKSA9PT0gdGhpcy5tb2RhbC5jb250ZXh0LnZpZGVvTGluay50cmltKCkpe1xuICAgICAgICAgICAgdGhpcy5tb2RhbC5jbG9zZUNhbGxiYWNrKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9qZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGVQcm9qZWN0KCkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ1VwZGF0aW5nLi4uJyk7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9wcm9qZWN0U2VydmljZS51cGRhdGVQcm9qZWN0KHRoaXMucHJvamVjdElkLCB0aGlzLnByb2plY3QpO1xuXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIGlmKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93U3VjY2Vzc0ZlZWRiYWNrKCcnLCAnU3VjY2Vzc2Z1bGx5IHVwZGF0ZWQhJylcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0WW91dHViZUlkKHRoaXMucHJvamVjdC52aWRlb0xpbmspLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiB0aGlzLnByb2plY3QudmlkZW9MaW5rXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuY2xvc2VDYWxsYmFjayh7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGRhdGEgfSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0Vycm9yRmVlZGJhY2soJ09vb3BzIScsICdVcGRhdGUgZmFpbGVkJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=