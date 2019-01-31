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
var project_member_service_1 = require("../../services/project-member.service");
var component_event_service_1 = require("../../services/component-event.service");
var member_model_1 = require("../../models/member.model");
var JoinProjectComponent = /** @class */ (function () {
    function JoinProjectComponent(params, _componentService, _projectMemberService) {
        this.params = params;
        this._componentService = _componentService;
        this._projectMemberService = _projectMemberService;
        this.member = new member_model_1.Member();
        this.member.deserialize({
            userId: 0,
            projectId: 0,
            reason: ''
        });
    }
    JoinProjectComponent.prototype.ngOnInit = function () {
        this.member.userId = this.params.context.userId;
        this.member.projectId = this.params.context.projectId;
    };
    JoinProjectComponent.prototype.onClose = function () {
        this.params.closeCallback();
    };
    JoinProjectComponent.prototype.joinProject = function () {
        this._componentService.showLoader('Loading...');
        this.createProjectMember();
    };
    JoinProjectComponent.prototype.createProjectMember = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._projectMemberService.createProjectMember(this.member)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.success) {
                            this.params.closeCallback(true);
                        }
                        else {
                            this._componentService.showAlert('Ooops!', res.data);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this._componentService.hideLoader();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    JoinProjectComponent = __decorate([
        core_1.Component({
            selector: "joinproject-page",
            moduleId: module.id,
            templateUrl: "./joinproject-page.component.html",
            styleUrls: ['./joinproject-page.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
            component_event_service_1.ComponentEventService,
            project_member_service_1.ProjectMemberService])
    ], JoinProjectComponent);
    return JoinProjectComponent;
}());
exports.JoinProjectComponent = JoinProjectComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbnByb2plY3QtcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqb2lucHJvamVjdC1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELG1FQUE0RTtBQUU1RSxnRkFBNkU7QUFDN0Usa0ZBQStFO0FBRS9FLDBEQUFtRDtBQVFuRDtJQUlJLDhCQUNTLE1BQXlCLEVBQ3RCLGlCQUF3QyxFQUN4QyxxQkFBMkM7UUFGOUMsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDdEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQUN4QywwQkFBcUIsR0FBckIscUJBQXFCLENBQXNCO1FBRXRELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxxQkFBTSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDcEIsTUFBTSxFQUFFLENBQUM7WUFDVCxTQUFTLEVBQUUsQ0FBQztZQUNaLE1BQU0sRUFBRSxFQUFFO1NBQ2IsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQzFELENBQUM7SUFFSixzQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsMENBQVcsR0FBWDtRQUNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUE7UUFFL0MsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVRLGtEQUFtQixHQUF6Qjs7Ozs7Ozt3QkFFWSxxQkFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBdkUsR0FBRyxHQUFHLFNBQWlFO3dCQUVyRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQzFDLElBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRTs0QkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDaEM7NkJBQUs7NEJBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUM5RDs7Ozt3QkFFRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7Ozs7OztLQUVyQztJQTdDUSxvQkFBb0I7UUFOaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxtQ0FBbUM7WUFDaEQsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7U0FDbEQsQ0FBQzt5Q0FNbUIsMkJBQWlCO1lBQ0gsK0NBQXFCO1lBQ2pCLDZDQUFvQjtPQVA5QyxvQkFBb0IsQ0ErQ2hDO0lBQUQsMkJBQUM7Q0FBQSxBQS9DRCxJQStDQztBQS9DWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcblxuaW1wb3J0IHsgUHJvamVjdE1lbWJlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcHJvamVjdC1tZW1iZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50RXZlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbXBvbmVudC1ldmVudC5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7IE1lbWJlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvbWVtYmVyLm1vZGVsXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImpvaW5wcm9qZWN0LXBhZ2VcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vam9pbnByb2plY3QtcGFnZS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL2pvaW5wcm9qZWN0LXBhZ2UuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBKb2luUHJvamVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgXG4gICAgbWVtYmVyOiBNZW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICBcdHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcyxcbiAgICAgICAgcHJpdmF0ZSBfY29tcG9uZW50U2VydmljZTogQ29tcG9uZW50RXZlbnRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9wcm9qZWN0TWVtYmVyU2VydmljZTogUHJvamVjdE1lbWJlclNlcnZpY2UsXG4gICAgKSB7XG4gICAgXHR0aGlzLm1lbWJlciA9IG5ldyBNZW1iZXIoKTtcbiAgICAgICAgdGhpcy5tZW1iZXIuZGVzZXJpYWxpemUoe1xuICAgICAgICAgICAgdXNlcklkOiAwLFxuICAgICAgICAgICAgcHJvamVjdElkOiAwLFxuICAgICAgICAgICAgcmVhc29uOiAnJ1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm1lbWJlci51c2VySWQgPSB0aGlzLnBhcmFtcy5jb250ZXh0LnVzZXJJZDtcbiAgICAgICAgdGhpcy5tZW1iZXIucHJvamVjdElkID0gdGhpcy5wYXJhbXMuY29udGV4dC5wcm9qZWN0SWQ7XG4gICAgfVxuXG5cdG9uQ2xvc2UoKSB7XG4gICAgXHR0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XG5cdH1cblxuXHRqb2luUHJvamVjdCgpIHtcblx0XHR0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ0xvYWRpbmcuLi4nKVxuXG5cdFx0dGhpcy5jcmVhdGVQcm9qZWN0TWVtYmVyKCk7XG5cdH1cbiAgICBcbiAgICBhc3luYyBjcmVhdGVQcm9qZWN0TWVtYmVyKCkge1xuICAgICAgICB0cnkge1xuICAgIFx0XHRsZXQgcmVzID0gYXdhaXQgdGhpcy5fcHJvamVjdE1lbWJlclNlcnZpY2UuY3JlYXRlUHJvamVjdE1lbWJlcih0aGlzLm1lbWJlcik7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgIFx0XHRpZihyZXMuc3VjY2Vzcykge1xuICAgIFx0XHRcdHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2sodHJ1ZSk7XG4gICAgXHRcdH1lbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgcmVzLmRhdGEpO1xuICAgIFx0XHR9XG4gICAgXHR9Y2F0Y2goZSkge1xuICAgIFx0XHR0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICBcdH1cbiAgICB9XG4gICBcbn0iXX0=