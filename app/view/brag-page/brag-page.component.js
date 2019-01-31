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
// MODELS
var student_model_1 = require("../../models/student.model");
var project_model_1 = require("../../models/project.model");
// SERVICES
var student_service_1 = require("../../services/student.service");
var component_event_service_1 = require("../../services/component-event.service");
var BragComponent = /** @class */ (function () {
    function BragComponent(modal, _studentService, _componentService) {
        this.modal = modal;
        this._studentService = _studentService;
        this._componentService = _componentService;
        this.student = new student_model_1.Student();
        this.project = new project_model_1.Project();
        this.project.deserialize(this.modal.context.project);
    }
    BragComponent.prototype.ngOnInit = function () {
        this.getStudent();
    };
    BragComponent.prototype.onClose = function () {
        this.modal.closeCallback(true);
    };
    BragComponent.prototype.getBragDesc = function () {
        return this.project.getSchoolName() + " just helped pay for " + this.student.getFullName() + " from " + this.student.getCountry() + " to get an education.";
    };
    BragComponent.prototype.getStudent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._studentService.getStudent(this.modal.context.student.studentId)];
                    case 1:
                        res = _a.sent();
                        if (res.data) {
                            this.student.deserialize(res.data);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BragComponent = __decorate([
        core_1.Component({
            selector: "brag-page",
            moduleId: module.id,
            templateUrl: "./brag-page.component.html",
            styleUrls: ['./brag-page.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
            student_service_1.StudentService,
            component_event_service_1.ComponentEventService])
    ], BragComponent);
    return BragComponent;
}());
exports.BragComponent = BragComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhZy1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyYWctcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUVsRCxtRUFBNEU7QUFFNUUsU0FBUztBQUNULDREQUFxRDtBQUNyRCw0REFBcUQ7QUFFckQsV0FBVztBQUNYLGtFQUFnRTtBQUNoRSxrRkFBK0U7QUFRL0U7SUFLQyx1QkFDUyxLQUF3QixFQUV4QixlQUErQixFQUMvQixpQkFBd0M7UUFIeEMsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFFeEIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFFaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHVCQUFPLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksdUJBQU8sRUFBRSxDQUFDO1FBRTdCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFRCwrQkFBTyxHQUFQO1FBQ08sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDRixPQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLDZCQUF3QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxjQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLDBCQUF1QixDQUFBO0lBQ2xKLENBQUM7SUFFUSxrQ0FBVSxHQUFoQjs7Ozs7Ozt3QkFFWSxxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUE7O3dCQUFqRixHQUFHLEdBQUcsU0FBMkU7d0JBRXJGLElBQUcsR0FBRyxDQUFDLElBQUksRUFBRTs0QkFDWixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7eUJBQ2xDOzs7O3dCQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUE7Ozs7OztLQUVmO0lBdkNRLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQzNDLENBQUM7eUNBT2UsMkJBQWlCO1lBRVAsZ0NBQWM7WUFDWiwrQ0FBcUI7T0FUckMsYUFBYSxDQXdDekI7SUFBRCxvQkFBQztDQUFBLEFBeENELElBd0NDO0FBeENZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcblxuLy8gTU9ERUxTXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdHVkZW50Lm1vZGVsXCI7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4uLy4uL21vZGVscy9wcm9qZWN0Lm1vZGVsXCI7XG5cbi8vIFNFUlZJQ0VTXG5pbXBvcnQgeyBTdHVkZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zdHVkZW50LnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJicmFnLXBhZ2VcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vYnJhZy1wYWdlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vYnJhZy1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQnJhZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0c3R1ZGVudDogU3R1ZGVudDtcblx0cHJvamVjdDogUHJvamVjdDtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1BhcmFtcyxcblxuXHRcdHByaXZhdGUgX3N0dWRlbnRTZXJ2aWNlOiBTdHVkZW50U2VydmljZSxcblx0XHRwcml2YXRlIF9jb21wb25lbnRTZXJ2aWNlOiBDb21wb25lbnRFdmVudFNlcnZpY2Vcblx0KXtcblx0XHR0aGlzLnN0dWRlbnQgPSBuZXcgU3R1ZGVudCgpO1xuXHRcdHRoaXMucHJvamVjdCA9IG5ldyBQcm9qZWN0KCk7XG5cblx0XHR0aGlzLnByb2plY3QuZGVzZXJpYWxpemUodGhpcy5tb2RhbC5jb250ZXh0LnByb2plY3QpXG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmdldFN0dWRlbnQoKVxuXHR9XG5cblx0b25DbG9zZSgpIHtcbiAgICAgICAgdGhpcy5tb2RhbC5jbG9zZUNhbGxiYWNrKHRydWUpO1xuICAgIH1cblxuICAgIGdldEJyYWdEZXNjKCkge1xuXHRcdHJldHVybiBgJHt0aGlzLnByb2plY3QuZ2V0U2Nob29sTmFtZSgpfSBqdXN0IGhlbHBlZCBwYXkgZm9yICR7dGhpcy5zdHVkZW50LmdldEZ1bGxOYW1lKCl9IGZyb20gJHt0aGlzLnN0dWRlbnQuZ2V0Q291bnRyeSgpfSB0byBnZXQgYW4gZWR1Y2F0aW9uLmBcblx0fVxuXG4gICAgYXN5bmMgZ2V0U3R1ZGVudCgpIHtcbiAgICBcdHRyeXtcbiAgICBcdFx0bGV0IHJlcyA9IGF3YWl0IHRoaXMuX3N0dWRlbnRTZXJ2aWNlLmdldFN0dWRlbnQodGhpcy5tb2RhbC5jb250ZXh0LnN0dWRlbnQuc3R1ZGVudElkKTtcblxuICAgIFx0XHRpZihyZXMuZGF0YSkge1xuICAgIFx0XHRcdHRoaXMuc3R1ZGVudC5kZXNlcmlhbGl6ZShyZXMuZGF0YSlcbiAgICBcdFx0fVxuICAgIFx0fWNhdGNoKGUpIHtcbiAgICBcdFx0Y29uc29sZS5sb2coZSlcbiAgICBcdH1cbiAgICB9XG59Il19