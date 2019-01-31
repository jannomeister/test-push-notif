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
var page_1 = require("ui/page");
var selectlist_page_component_1 = require("../../view/selectlist-page/selectlist-page.component");
var walkthrough_page_component_1 = require("../../view/walkthrough-page/walkthrough-page.component");
var project_service_1 = require("../../services/project.service");
var component_event_service_1 = require("../../services/component-event.service");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var dialogs_2 = require("nativescript-angular/directives/dialogs");
var project_model_1 = require("../../models/project.model");
var student_model_1 = require("../../models/student.model");
var SelectStudentComponent = /** @class */ (function () {
    function SelectStudentComponent(_activatedRoute, _routerExtensions, params, modal, vcRef, _page, _projectService, _componentService) {
        this._activatedRoute = _activatedRoute;
        this._routerExtensions = _routerExtensions;
        this.params = params;
        this.modal = modal;
        this.vcRef = vcRef;
        this._page = _page;
        this._projectService = _projectService;
        this._componentService = _componentService;
        this.projectId = 0;
        this.selectedBand = 0;
        this.numberOfBands = [200, 300, 400];
        this.student = new student_model_1.Student();
        this.project = new project_model_1.Project();
        this.project.deserialize({
            studentId: 0
        });
        this.navOptions = this._componentService.getRouteOptions();
        this.projectId = this.params.context.projectId;
        this.dateStart = this.params.context.dateStart;
    }
    SelectStudentComponent.prototype.ngOnInit = function () {
        var selectedStudent = this._componentService.getSelectedStudent();
        if (selectedStudent.studentId) {
            this.project.studentId = selectedStudent.studentId;
            this.student.deserialize({
                firstName: selectedStudent.firstName,
                lastName: selectedStudent.lastName
            });
        }
    };
    SelectStudentComponent.prototype.onValueChanged = function (args) {
        var progressBar = args.object;
    };
    SelectStudentComponent.prototype.onClose = function () {
        // this._componentService.removeSelectedStudent();
        this.params.closeCallback({ success: false });
    };
    SelectStudentComponent.prototype.confirm = function () {
        if (this.project.studentId > 0) {
            this._componentService.showLoader('');
            this.updateProjectApproved({ studentId: this.project.studentId });
        }
        else {
            this._componentService.showAlert('Oops!', 'You must pick a student');
        }
    };
    SelectStudentComponent.prototype.openWalkthrough = function (type) {
        var opt = {
            context: { type: type },
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true
        };
        this.modal.showModal(walkthrough_page_component_1.WalkThroughComponent, opt).then(function (response) {
            console.log(response);
        });
    };
    SelectStudentComponent.prototype.searchStudent = function () {
        var _this = this;
        var opt = {
            context: {
                projectId: this.projectId,
                dateStart: this.dateStart
            },
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true,
            transition: {
                name: "slideTop",
                duration: 200,
                curve: "ease"
            }
        };
        this.modal.showModal(selectlist_page_component_1.SelectListComponent, opt).then(function (response) {
            _this.projectId = response.projectId;
            _this.dateStart = response.dateStart;
            _this.ngOnInit();
        });
    };
    SelectStudentComponent.prototype.updateProjectApproved = function (data) {
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
                        this._componentService.removeSelectedStudent();
                        this.params.closeCallback({ success: true, projectId: this.projectId });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this._componentService.hideLoader();
                        this._componentService.showAlert('Oops!', 'Unable to select a student. Please try again later');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SelectStudentComponent = __decorate([
        core_1.Component({
            selector: "select-student-modal",
            moduleId: module.id,
            templateUrl: "./select-student-modal.component.html",
            styleUrls: ['./select-student-modal.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_2.RouterExtensions,
            dialogs_2.ModalDialogParams,
            dialogs_1.ModalDialogService,
            core_1.ViewContainerRef,
            page_1.Page,
            project_service_1.ProjectService,
            component_event_service_1.ComponentEventService])
    ], SelectStudentComponent);
    return SelectStudentComponent;
}());
exports.SelectStudentComponent = SelectStudentComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXN0dWRlbnQtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0LXN0dWRlbnQtbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUc7QUFDekcsMENBQWlEO0FBQ2pELHNEQUErRDtBQUcvRCxnQ0FBK0I7QUFFL0Isa0dBQTJGO0FBQzNGLHFHQUE4RjtBQUU5RixrRUFBZ0U7QUFDaEUsa0ZBQStFO0FBQy9FLG1FQUE2RTtBQUM3RSxtRUFBNEU7QUFFNUUsNERBQXFEO0FBQ3JELDREQUFxRDtBQVVyRDtJQWNJLGdDQUNZLGVBQStCLEVBQy9CLGlCQUFtQyxFQUNuQyxNQUF5QixFQUMvQixLQUF5QixFQUN6QixLQUF1QixFQUNqQixLQUFXLEVBQ1gsZUFBK0IsRUFDL0IsaUJBQXdDO1FBUHhDLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQy9CLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ2pCLFVBQUssR0FBTCxLQUFLLENBQU07UUFDWCxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQWxCcEQsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUU1QixrQkFBYSxHQUFrQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFrQnhDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSx1QkFBTyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHVCQUFPLEVBQUUsQ0FBQztRQUU3QixJQUFJLENBQUMs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bnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiwgSG9zdExpc3RlbmVyLCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xuaW1wb3J0IHsgUHJvZ3Jlc3MgfSBmcm9tIFwidWkvcHJvZ3Jlc3NcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5pbXBvcnQgeyBTZWxlY3RMaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3ZpZXcvc2VsZWN0bGlzdC1wYWdlL3NlbGVjdGxpc3QtcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFdhbGtUaHJvdWdoQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3ZpZXcvd2Fsa3Rocm91Z2gtcGFnZS93YWxrdGhyb3VnaC1wYWdlLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBQcm9qZWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wcm9qZWN0LnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5cbmltcG9ydCB7IFByb2plY3QgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3Byb2plY3QubW9kZWxcIjtcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N0dWRlbnQubW9kZWxcIjtcblxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzZWxlY3Qtc3R1ZGVudC1tb2RhbFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZWxlY3Qtc3R1ZGVudC1tb2RhbC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL3NlbGVjdC1zdHVkZW50LW1vZGFsLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0U3R1ZGVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICB2aWRlb1BsYXllcjogRWxlbWVudFJlZjtcblxuICAgIHByb2plY3RJZDogbnVtYmVyID0gMDtcbiAgICBzZWxlY3RlZEJhbmQ6IG51bWJlciA9IDA7XG4gICAgZGF0ZVN0YXJ0OiBzdHJpbmc7XG5cdG51bWJlck9mQmFuZHM6IEFycmF5PG51bWJlcj4gPSBbMjAwLCAzMDAsIDQwMF07XG5cbiAgICBzdHVkZW50OiBTdHVkZW50O1xuICAgIHByb2plY3Q6IFByb2plY3Q7XG5cbiAgICBuYXZPcHRpb25zOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsXG5cdFx0cHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLCBcblx0XHRwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxuICAgICAgICBwcml2YXRlIF9wcm9qZWN0U2VydmljZTogUHJvamVjdFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcbiAgICApIHtcblxuICAgICAgICB0aGlzLnN0dWRlbnQgPSBuZXcgU3R1ZGVudCgpO1xuICAgICAgICB0aGlzLnByb2plY3QgPSBuZXcgUHJvamVjdCgpO1xuXG4gICAgICAgIHRoaXMucHJvamVjdC5kZXNlcmlhbGl6ZSh7XG4gICAgICAgICAgICBzdHVkZW50SWQ6IDBcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLm5hdk9wdGlvbnMgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldFJvdXRlT3B0aW9ucygpO1xuICAgICAgICB0aGlzLnByb2plY3RJZCA9IHRoaXMucGFyYW1zLmNvbnRleHQucHJvamVjdElkO1xuICAgICAgICB0aGlzLmRhdGVTdGFydCA9IHRoaXMucGFyYW1zLmNvbnRleHQuZGF0ZVN0YXJ0O1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZFN0dWRlbnQgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldFNlbGVjdGVkU3R1ZGVudCgpO1xuXG4gICAgICAgIGlmKHNlbGVjdGVkU3R1ZGVudC5zdHVkZW50SWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdC5zdHVkZW50SWQgPSBzZWxlY3RlZFN0dWRlbnQuc3R1ZGVudElkO1xuICAgICAgICAgICAgdGhpcy5zdHVkZW50LmRlc2VyaWFsaXplKHtcbiAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IHNlbGVjdGVkU3R1ZGVudC5maXJzdE5hbWUsXG4gICAgICAgICAgICAgICAgbGFzdE5hbWU6IHNlbGVjdGVkU3R1ZGVudC5sYXN0TmFtZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgb25WYWx1ZUNoYW5nZWQoYXJncykge1xuICAgICAgICBsZXQgcHJvZ3Jlc3NCYXIgPSA8UHJvZ3Jlc3M+YXJncy5vYmplY3Q7XG4gICAgfVxuXG4gICAgb25DbG9zZSgpIHtcbiAgICAgICAgLy8gdGhpcy5fY29tcG9uZW50U2VydmljZS5yZW1vdmVTZWxlY3RlZFN0dWRlbnQoKTtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh7IHN1Y2Nlc3M6IGZhbHNlIH0pO1xuICAgIH1cblxuICAgIGNvbmZpcm0oKSB7XG4gICAgICAgIGlmKHRoaXMucHJvamVjdC5zdHVkZW50SWQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJycpXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByb2plY3RBcHByb3ZlZCh7IHN0dWRlbnRJZDogdGhpcy5wcm9qZWN0LnN0dWRlbnRJZCB9KTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vcHMhJywgJ1lvdSBtdXN0IHBpY2sgYSBzdHVkZW50Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuV2Fsa3Rocm91Z2godHlwZSkge1xuXG4gICAgICAgIGxldCBvcHQgPSB7XG4gICAgICAgICAgICBjb250ZXh0OiB7IHR5cGU6IHR5cGUgfSxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IHRydWUsXG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxuICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWVcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoV2Fsa1Rocm91Z2hDb21wb25lbnQsIG9wdCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICB9KVxuICAgIH0gICAgXG5cbiAgIFx0c2VhcmNoU3R1ZGVudCgpIHtcblxuICAgICAgICBsZXQgb3B0ID0ge1xuICAgICAgICAgICAgY29udGV4dDogeyBcbiAgICAgICAgICAgICAgICBwcm9qZWN0SWQ6IHRoaXMucHJvamVjdElkLFxuICAgICAgICAgICAgICAgIGRhdGVTdGFydDogdGhpcy5kYXRlU3RhcnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVUb3BcIixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoU2VsZWN0TGlzdENvbXBvbmVudCwgb3B0KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdElkID0gcmVzcG9uc2UucHJvamVjdElkO1xuICAgICAgICAgICAgdGhpcy5kYXRlU3RhcnQgPSByZXNwb25zZS5kYXRlU3RhcnQ7XG4gICAgICAgICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIGFzeW5jIHVwZGF0ZVByb2plY3RBcHByb3ZlZChkYXRhKSB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9wcm9qZWN0U2VydmljZS51cGRhdGVQcm9qZWN0QXBwcm92ZWQodGhpcy5wcm9qZWN0SWQsIGRhdGEpXG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5yZW1vdmVTZWxlY3RlZFN0dWRlbnQoKTtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soeyBzdWNjZXNzOiB0cnVlLCBwcm9qZWN0SWQ6IHRoaXMucHJvamVjdElkIH0pO1xuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29wcyEnLCAnVW5hYmxlIHRvIHNlbGVjdCBhIHN0dWRlbnQuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXInKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuXG4iXX0=