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
var student_model_1 = require("../../models/student.model");
var student_service_1 = require("../../services/student.service");
var component_event_service_1 = require("../../services/component-event.service");
var StudentInfoModalComponent = /** @class */ (function () {
    function StudentInfoModalComponent(params, _studentSevice, _componentService) {
        this.params = params;
        this._studentSevice = _studentSevice;
        this._componentService = _componentService;
        this.totalBands = 0;
        this.isBusy = true;
        this.student = new student_model_1.Student();
        this.studentId = this.params.context.studentId;
        this.type = this.params.context.type;
    }
    StudentInfoModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.getStudent();
            _this.getStudentCurrentNeed();
        }, 600);
    };
    StudentInfoModalComponent.prototype.onClose = function () {
        this.params.closeCallback({ success: false });
    };
    StudentInfoModalComponent.prototype.selectStudent = function () {
        var _this = this;
        this._componentService.showLoader('Loading...');
        setTimeout(function () {
            _this._componentService.hideLoader();
            _this.params.closeCallback({ success: true, data: _this.student });
        }, 700);
    };
    StudentInfoModalComponent.prototype.getStudent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._studentSevice.getStudent(this.studentId)];
                    case 1:
                        res = _a.sent();
                        this.isBusy = false;
                        if (res.data) {
                            this.student.deserialize(res.data);
                            this.videoId = this._componentService.getYoutubeId(this.student.videoLink);
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
    StudentInfoModalComponent.prototype.getStudentCurrentNeed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._studentSevice.getStudentCurrentNeed(this.studentId)];
                    case 1:
                        res = _a.sent();
                        this.totalBands = res.data;
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StudentInfoModalComponent = __decorate([
        core_1.Component({
            selector: "student-info-modal",
            moduleId: module.id,
            templateUrl: "./student-info-modal.component.html",
            styleUrls: ['./student-info-modal.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
            student_service_1.StudentService,
            component_event_service_1.ComponentEventService])
    ], StudentInfoModalComponent);
    return StudentInfoModalComponent;
}());
exports.StudentInfoModalComponent = StudentInfoModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R1ZGVudC1pbmZvLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0dWRlbnQtaW5mby1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFnRTtBQUNoRSxtRUFBNEU7QUFFNUUsNERBQXFEO0FBR3JELGtFQUFnRTtBQUNoRSxrRkFBK0U7QUFRL0U7SUFZQyxtQ0FDZSxNQUF5QixFQUN6QixjQUE4QixFQUM5QixpQkFBd0M7UUFGeEMsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFacEQsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUV2QixXQUFNLEdBQVksSUFBSSxDQUFDO1FBWW5CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSx1QkFBTyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDekMsQ0FBQztJQUVKLDRDQUFRLEdBQVI7UUFBQSxpQkFLSTtRQUpHLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixLQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNqQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDWCxDQUFDO0lBRUosMkNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVFLGlEQUFhLEdBQWI7UUFBQSxpQkFPQztRQU5HLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFaEQsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3BDLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDcEUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ1gsQ0FBQztJQUVLLDhDQUFVLEdBQWhCOzs7Ozs7O3dCQUVrQixxQkFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUE7O3dCQUExRCxHQUFHLEdBQUcsU0FBb0Q7d0JBRTlELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO3dCQUNwQixJQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUU7NEJBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzt5QkFDOUU7Ozs7d0JBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQTs7Ozs7O0tBRXJCO0lBRUsseURBQXFCLEdBQTNCOzs7Ozs7O3dCQUVrQixxQkFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQTs7d0JBQXJFLEdBQUcsR0FBRyxTQUErRDt3QkFFekUsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDOzs7O3dCQUUzQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFBOzs7Ozs7S0FFckI7SUFoRVEseUJBQXlCO1FBTnJDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUscUNBQXFDO1lBQ2xELFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO1NBQ3BELENBQUM7eUNBY3NCLDJCQUFpQjtZQUNULGdDQUFjO1lBQ1gsK0NBQXFCO09BZjNDLHlCQUF5QixDQWlFckM7SUFBRCxnQ0FBQztDQUFBLEFBakVELElBaUVDO0FBakVZLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBIb3N0TGlzdGVuZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5cbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N0dWRlbnQubW9kZWxcIjtcbmltcG9ydCB7IFN0dWRlbnROZWVkIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdHVkZW50LW5lZWQubW9kZWxcIjtcblxuaW1wb3J0IHsgU3R1ZGVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc3R1ZGVudC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21wb25lbnRFdmVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29tcG9uZW50LWV2ZW50LnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3R1ZGVudC1pbmZvLW1vZGFsXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3N0dWRlbnQtaW5mby1tb2RhbC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL3N0dWRlbnQtaW5mby1tb2RhbC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFN0dWRlbnRJbmZvTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRcblx0c3R1ZGVudElkOiBudW1iZXI7XG4gICAgdG90YWxCYW5kczogbnVtYmVyID0gMDtcblxuICAgIGlzQnVzeTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgdmlkZW9JZDogc3RyaW5nO1xuXG4gICAgc3R1ZGVudDogU3R1ZGVudDtcblxuXHRjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxuICAgICAgICBwcml2YXRlIF9zdHVkZW50U2V2aWNlOiBTdHVkZW50U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfY29tcG9uZW50U2VydmljZTogQ29tcG9uZW50RXZlbnRTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMuc3R1ZGVudCA9IG5ldyBTdHVkZW50KCk7XG4gICAgICAgIHRoaXMuc3R1ZGVudElkID0gdGhpcy5wYXJhbXMuY29udGV4dC5zdHVkZW50SWQ7XG4gICAgICAgIHRoaXMudHlwZSA9IHRoaXMucGFyYW1zLmNvbnRleHQudHlwZTtcbiAgICB9XG5cblx0bmdPbkluaXQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRTdHVkZW50KCk7XG4gICAgICAgICAgICB0aGlzLmdldFN0dWRlbnRDdXJyZW50TmVlZCgpO1xuICAgICAgICB9LCA2MDApXG4gICAgfVxuXG5cdG9uQ2xvc2UoKSB7XG4gICAgXHR0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHsgc3VjY2VzczogZmFsc2UgfSk7XG5cdH1cblxuICAgIHNlbGVjdFN0dWRlbnQoKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignTG9hZGluZy4uLicpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogdGhpcy5zdHVkZW50IH0pXG4gICAgICAgIH0sIDcwMClcbiAgICB9XG5cbiAgICBhc3luYyBnZXRTdHVkZW50KCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fc3R1ZGVudFNldmljZS5nZXRTdHVkZW50KHRoaXMuc3R1ZGVudElkKTtcblxuICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmKHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50LmRlc2VyaWFsaXplKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvSWQgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldFlvdXR1YmVJZCh0aGlzLnN0dWRlbnQudmlkZW9MaW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBnZXRTdHVkZW50Q3VycmVudE5lZWQoKSB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9zdHVkZW50U2V2aWNlLmdldFN0dWRlbnRDdXJyZW50TmVlZCh0aGlzLnN0dWRlbnRJZCk7XG5cbiAgICAgICAgICAgIHRoaXMudG90YWxCYW5kcyA9IHJlcy5kYXRhO1xuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=