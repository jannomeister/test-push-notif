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
var update_project_video_component_1 = require("../../view/update-project-video/update-project-video.component");
// MODELS
var user_model_1 = require("../../models/user.model");
var student_model_1 = require("../../models/student.model");
var project_model_1 = require("../../models/project.model");
// SERVICES
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var project_service_1 = require("../../services/project.service");
var project_member_service_1 = require("../../services/project-member.service");
var user_service_1 = require("../../services/user.service");
var config_service_1 = require("../../services/config.service");
var component_event_service_1 = require("../../services/component-event.service");
var EditProjectPageComponent = /** @class */ (function () {
    function EditProjectPageComponent(_ngZone, vcRef, _activatedRoute, _routerExtensions, modal, _userService, _projectMemberService, _projectService, _configService, _componentService) {
        var _this = this;
        this._ngZone = _ngZone;
        this.vcRef = vcRef;
        this._activatedRoute = _activatedRoute;
        this._routerExtensions = _routerExtensions;
        this.modal = modal;
        this._userService = _userService;
        this._projectMemberService = _projectMemberService;
        this._projectService = _projectService;
        this._configService = _configService;
        this._componentService = _componentService;
        this.volunteerList = [];
        this.isMember = false;
        this.isPending = false;
        this.isInitialized = false;
        this.isUserProject = false;
        this.isStudentPending = false;
        this.isUserImageEdited = false;
        this.isProjectImageEdited = false;
        this.userId = 0;
        this.projectId = 0;
        this.user = new user_model_1.User();
        this.student = new student_model_1.Student();
        this.project = new project_model_1.Project();
        this.navOptions = this._componentService.getRouteOptions();
        this._activatedRoute.queryParams.subscribe(function (params) {
            _this.projectId = parseInt(params['projectId']);
        });
    }
    EditProjectPageComponent.prototype.ngOnInit = function () {
        this.userId = this._userService.getCurrentUserId();
        this.getProject();
        this.checkIfMember();
    };
    EditProjectPageComponent.prototype.changeImage = function (type) {
        var _this = this;
        this._componentService.changeImage(250, 600)
            .then(function (result) {
            _this.isProjectImageEdited = true;
            _this.project.imageUrl = result;
        })
            .catch(function (err) {
            console.log("CAMERA/GALLERY: " + err);
        });
    };
    EditProjectPageComponent.prototype.update = function () {
        this.updateProject();
    };
    EditProjectPageComponent.prototype.save = function () {
        this.uploadImage(this.project.projectId);
    };
    EditProjectPageComponent.prototype.revert = function () {
        this.project.imageUrl = this._componentService.getImageCover(this.originalProjectImage);
        this.isProjectImageEdited = false;
    };
    EditProjectPageComponent.prototype.uploadImage = function (id) {
        var _this = this;
        this._componentService.showLoader('Uploading...');
        this._componentService.uploadImage(id, 'project', this.project.imageUrl)
            .then(function (result) {
            _this._componentService.hideLoader();
            if (result.success) {
                _this._ngZone.run(function () {
                    _this.originalProjectImage = result.data;
                    _this.project.imageUrl = _this._componentService.getImageCover(result.data);
                    _this.isProjectImageEdited = false;
                    _this._componentService.showSuccessFeedback('', 'Successfully updated!');
                });
            }
            else {
                _this._componentService.showErrorFeedback('Ooops!', result.message);
            }
        })
            .catch(function (err) {
            console.log("UPLOAD ERROR: " + err);
            _this._componentService.hideLoader();
            _this._componentService.showErrorFeedback('Ooops!', 'Update failed');
        });
    };
    EditProjectPageComponent.prototype.updateVideo = function () {
        var _this = this;
        var opt = {
            context: {
                projectId: this.projectId,
                videoLink: this.project.videoLink
            },
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true
        };
        this.modal.showModal(update_project_video_component_1.UpdateProjectVideoComponent, opt)
            .then(function (res) {
            if (res.success) {
                _this.project.videoLink = res.data.link;
                // this._ngZone.run(() => {
                //     this.project.videoLink = res.data.link;
                //     this.navOptions.transition.name = 'slideRight';
                //     this.navOptions.clearHistory = true;
                //     this.navOptions.queryParams = { projectId: this.projectId };
                //     this._routerExtensions.navigate(["/project"], this.navOptions);
                // })
            }
            console.log(res);
        });
    };
    EditProjectPageComponent.prototype.getProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._projectService.getProject(this.projectId)];
                    case 1:
                        res = _a.sent();
                        this.isInitialized = true;
                        if (res.data) {
                            this.project.deserialize(res.data);
                            this.user.deserialize(res.data.userId);
                            this.student.deserialize(res.data.studentId);
                            this.isUserProject = (this.user.userId === this.userId) ? true : false;
                            this.originalProjectImage = this.project.imageUrl;
                            this.project.imageUrl = this._componentService.getImageCover(this.project.imageUrl);
                            this.project.manager.imageUrl = this._componentService.getImageProfile(this.project.manager.imageUrl);
                            if (this.user.imageUrl) {
                                this.originalUserImage = this.user.imageUrl;
                                this.user.imageUrl = this._componentService.getImageProfile(this.user.imageUrl);
                            }
                            if (this.student.imageUrl) {
                                this.studentCoverImage = this._componentService.getImageCover(this.student.imageUrl);
                                this.student.imageUrl = this._componentService.getImageProfile(this.student.imageUrl);
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.isInitialized = true;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EditProjectPageComponent.prototype.checkIfMember = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._projectMemberService.checkIfMember(this.projectId, this.userId)];
                    case 1:
                        res = _a.sent();
                        this.isMember = res.isMember;
                        if (res.isMember) {
                            this.isPending = (res.data.requestStatus === 'pending') ? true : false;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EditProjectPageComponent.prototype.updateProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_3;
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
                            this.navOptions.clearHistory = true;
                            this.navOptions.transition.name = 'slideRight';
                            this.navOptions.queryParams = { projectId: this.projectId };
                            this._routerExtensions.navigate(["/project"], this.navOptions);
                        }
                        else {
                            this._componentService.showErrorFeedback('Ooops!', 'Update failed');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        this._componentService.hideLoader();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild("volunteerTextField"),
        __metadata("design:type", core_1.ElementRef)
    ], EditProjectPageComponent.prototype, "volunteerTextField", void 0);
    EditProjectPageComponent = __decorate([
        core_1.Component({
            selector: "edit-project-page",
            moduleId: module.id,
            templateUrl: "./edit-project-page.component.html",
            styleUrls: ['./edit-project-page.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.NgZone,
            core_1.ViewContainerRef,
            router_1.ActivatedRoute,
            router_2.RouterExtensions,
            dialogs_1.ModalDialogService,
            user_service_1.UserService,
            project_member_service_1.ProjectMemberService,
            project_service_1.ProjectService,
            config_service_1.ConfigService,
            component_event_service_1.ComponentEventService])
    ], EditProjectPageComponent);
    return EditProjectPageComponent;
}());
exports.EditProjectPageComponent = EditProjectPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1wcm9qZWN0LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWRpdC1wcm9qZWN0LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBbUc7QUFDbkcsMENBQWlEO0FBRWpELHNEQUErRDtBQUMvRCxpSEFBNkc7QUFFN0csU0FBUztBQUNULHNEQUErQztBQUMvQyw0REFBcUQ7QUFDckQsNERBQXFEO0FBRXJELFdBQVc7QUFDWCxtRUFBNkU7QUFDN0Usa0VBQWdFO0FBQ2hFLGdGQUE2RTtBQUM3RSw0REFBMEQ7QUFDMUQsZ0VBQThEO0FBQzlELGtGQUErRTtBQVcvRTtJQTJCSSxrQ0FDWSxPQUFlLEVBQ2YsS0FBdUIsRUFDdkIsZUFBK0IsRUFDL0IsaUJBQW1DLEVBQ25DLEtBQXlCLEVBQ3pCLFlBQXlCLEVBQ3pCLHFCQUEyQyxFQUMzQyxlQUErQixFQUMvQixjQUE2QixFQUM3QixpQkFBd0M7UUFWcEQsaUJBcUJDO1FBcEJXLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2QixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUN6QixpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUN6QiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXNCO1FBQzNDLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBakNwRCxrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUV4QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUNuQyx5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFFdEMsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBeUJsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSx1QkFBTyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHVCQUFPLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUUzRCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzdDLEtBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO1FBQ2xELENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELDJDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUVuRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCw4Q0FBVyxHQUFYLFVBQVksSUFBSTtRQUFoQixpQkFTQztRQVJHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzthQUN2QyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ1QsS0FBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztZQUNqQyxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDbkMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsR0FBRztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUMsR0FBRyxDQUFDLENBQUE7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQseUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsdUNBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQseUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDeEYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztJQUN0QyxDQUFDO0lBRUQsOENBQVcsR0FBWCxVQUFZLEVBQUU7UUFBZCxpQkF1QkM7UUF0QkcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7YUFDbkUsSUFBSSxDQUFDLFVBQUMsTUFBVztZQUNkLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVwQyxJQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7b0JBQ2IsS0FBSSxDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ3hDLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMxRSxLQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO29CQUNsQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsRUFBRSxFQUFFLHVCQUF1QixDQUFDLENBQUE7Z0JBQzNFLENBQUMsQ0FBQyxDQUFBO2FBQ0w7aUJBQUk7Z0JBQ0QsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdEU7UUFDTCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxHQUFHO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsQ0FBQTtZQUNuQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDcEMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUMsQ0FBQTtJQUNWLENBQUM7SUFFRCw4Q0FBVyxHQUFYO1FBQUEsaUJBMEJDO1FBekJHLElBQUksR0FBRyxHQUFHO1lBQ04sT0FBTyxFQUFFO2dCQUNMLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUzthQUNwQztZQUNELFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1lBQzVCLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUE7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyw0REFBMkIsRUFBRSxHQUFHLENBQUM7YUFDakQsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNMLElBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDWixLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDdkMsMkJBQTJCO2dCQUMzQiw4Q0FBOEM7Z0JBQzlDLHNEQUFzRDtnQkFDdEQsMkNBQTJDO2dCQUMzQyxtRUFBbUU7Z0JBQ25FLHNFQUFzRTtnQkFDdEUsS0FBSzthQUNSO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUVWLENBQUM7SUFFSyw2Q0FBVSxHQUFoQjs7Ozs7Ozt3QkFHa0IscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFBOzt3QkFBM0QsR0FBRyxHQUFHLFNBQXFEO3dCQUUvRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzt3QkFDMUIsSUFBRyxHQUFHLENBQUMsSUFBSSxFQUFFOzRCQUVULElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFFN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7NEJBRXRFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzs0QkFDbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNyRixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFFdEcsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQ0FDbkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dDQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7NkJBQ25GOzRCQUVELElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7Z0NBQ3RCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBQ3JGLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs2QkFDekY7eUJBRUo7Ozs7d0JBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7Ozs7OztLQUVqQztJQUVLLGdEQUFhLEdBQW5COzs7Ozs7O3dCQUVrQixxQkFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBakYsR0FBRyxHQUFHLFNBQTJFO3dCQUVyRixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7d0JBRTdCLElBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRTs0QkFDYixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO3lCQUN6RTs7Ozs7Ozs7O0tBR1I7SUFFSyxnREFBYSxHQUFuQjs7Ozs7O3dCQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7Ozs7d0JBRW5DLHFCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBNUUsR0FBRyxHQUFHLFNBQXNFO3dCQUVoRixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBQ3BDLElBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRTs0QkFDWixJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsRUFBRSxFQUFFLHVCQUF1QixDQUFDLENBQUE7NEJBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzs0QkFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQzs0QkFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOzRCQUM1RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3lCQUNsRTs2QkFBSTs0QkFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFBO3lCQUN0RTs7Ozt3QkFHRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7Ozs7OztLQUUzQztJQS9LZ0M7UUFBaEMsZ0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQztrQ0FBcUIsaUJBQVU7d0VBQUM7SUF6QnZELHdCQUF3QjtRQVBwQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztTQUNuRCxDQUFDO3lDQThCdUIsYUFBTTtZQUNSLHVCQUFnQjtZQUNOLHVCQUFjO1lBQ1oseUJBQWdCO1lBQzVCLDRCQUFrQjtZQUNYLDBCQUFXO1lBQ0YsNkNBQW9CO1lBQzFCLGdDQUFjO1lBQ2YsOEJBQWE7WUFDViwrQ0FBcUI7T0FyQzNDLHdCQUF3QixDQXlNcEM7SUFBRCwrQkFBQztDQUFBLEFBek1ELElBeU1DO0FBek1ZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIE5nWm9uZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgVXBkYXRlUHJvamVjdFZpZGVvQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3ZpZXcvdXBkYXRlLXByb2plY3QtdmlkZW8vdXBkYXRlLXByb2plY3QtdmlkZW8uY29tcG9uZW50XCI7XG5cbi8vIE1PREVMU1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudC5tb2RlbFwiO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvcHJvamVjdC5tb2RlbFwiO1xuXG4vLyBTRVJWSUNFU1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgUHJvamVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcHJvamVjdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQcm9qZWN0TWVtYmVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wcm9qZWN0LW1lbWJlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29uZmlnLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImVkaXQtcHJvamVjdC1wYWdlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2VkaXQtcHJvamVjdC1wYWdlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vZWRpdC1wcm9qZWN0LXBhZ2UuY29tcG9uZW50LmNzcyddLFxufSlcblxuZXhwb3J0IGNsYXNzIEVkaXRQcm9qZWN0UGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgXG4gICAgdm9sdW50ZWVyOiBzdHJpbmc7XG4gICAgc3R1ZGVudENvdmVySW1hZ2U6IHN0cmluZztcbiAgICB2b2x1bnRlZXJMaXN0OiBhbnkgPSBbXTtcbiBcbiAgICBpc01lbWJlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzUGVuZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc1VzZXJQcm9qZWN0OiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNTdHVkZW50UGVuZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzVXNlckltYWdlRWRpdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNQcm9qZWN0SW1hZ2VFZGl0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHVzZXJJZDogbnVtYmVyID0gMDtcbiAgICBwcm9qZWN0SWQ6IG51bWJlciA9IDA7XG4gICAgb3JpZ2luYWxQcm9qZWN0SW1hZ2U6IHN0cmluZztcbiAgICBvcmlnaW5hbFVzZXJJbWFnZTogc3RyaW5nO1xuXG4gICAgcHJvamVjdDogUHJvamVjdDtcbiAgICB1c2VyOiBVc2VyO1xuICAgIHN0dWRlbnQ6IFN0dWRlbnQ7XG5cbiAgICBuYXZPcHRpb25zOiBhbnk7XG5cbiAgICBAVmlld0NoaWxkKFwidm9sdW50ZWVyVGV4dEZpZWxkXCIpIHZvbHVudGVlclRleHRGaWVsZDogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfcHJvamVjdE1lbWJlclNlcnZpY2U6IFByb2plY3RNZW1iZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9wcm9qZWN0U2VydmljZTogUHJvamVjdFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcbiAgICAgICAgXG4gICAgKSB7XG4gICAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICAgICAgIHRoaXMuc3R1ZGVudCA9IG5ldyBTdHVkZW50KCk7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IG5ldyBQcm9qZWN0KCk7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucyA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0Um91dGVPcHRpb25zKCk7XG5cbiAgICAgICAgdGhpcy5fYWN0aXZhdGVkUm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RJZCA9IHBhcnNlSW50KHBhcmFtc1sncHJvamVjdElkJ10pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXNlcklkID0gdGhpcy5fdXNlclNlcnZpY2UuZ2V0Q3VycmVudFVzZXJJZCgpO1xuXG4gICAgICAgIHRoaXMuZ2V0UHJvamVjdCgpO1xuICAgICAgICB0aGlzLmNoZWNrSWZNZW1iZXIoKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VJbWFnZSh0eXBlKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuY2hhbmdlSW1hZ2UoMjUwLCA2MDApXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1Byb2plY3RJbWFnZUVkaXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0LmltYWdlVXJsID0gcmVzdWx0OyBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0FNRVJBL0dBTExFUlk6IFwiK2VycilcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVQcm9qZWN0KCk7XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy51cGxvYWRJbWFnZSh0aGlzLnByb2plY3QucHJvamVjdElkKTtcbiAgICB9XG5cbiAgICByZXZlcnQoKSB7XG4gICAgICAgIHRoaXMucHJvamVjdC5pbWFnZVVybCA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0SW1hZ2VDb3Zlcih0aGlzLm9yaWdpbmFsUHJvamVjdEltYWdlKTtcbiAgICAgICAgdGhpcy5pc1Byb2plY3RJbWFnZUVkaXRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHVwbG9hZEltYWdlKGlkKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignVXBsb2FkaW5nLi4uJyk7XG5cbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS51cGxvYWRJbWFnZShpZCwgJ3Byb2plY3QnLCB0aGlzLnByb2plY3QuaW1hZ2VVcmwpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcblxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luYWxQcm9qZWN0SW1hZ2UgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdC5pbWFnZVVybCA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0SW1hZ2VDb3ZlcihyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUHJvamVjdEltYWdlRWRpdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dTdWNjZXNzRmVlZGJhY2soJycsICdTdWNjZXNzZnVsbHkgdXBkYXRlZCEnKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dFcnJvckZlZWRiYWNrKCdPb29wcyEnLCByZXN1bHQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVUExPQUQgRVJST1I6IFwiICsgZXJyKVxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0Vycm9yRmVlZGJhY2soJ09vb3BzIScsICdVcGRhdGUgZmFpbGVkJyk7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuICAgIHVwZGF0ZVZpZGVvKCkge1xuICAgICAgICBsZXQgb3B0ID0ge1xuICAgICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgICAgIHByb2plY3RJZDogdGhpcy5wcm9qZWN0SWQsXG4gICAgICAgICAgICAgICAgdmlkZW9MaW5rOiB0aGlzLnByb2plY3QudmlkZW9MaW5rXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXG4gICAgICAgICAgICBhbmltYXRlZDogdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoVXBkYXRlUHJvamVjdFZpZGVvQ29tcG9uZW50LCBvcHQpXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdC52aWRlb0xpbmsgPSByZXMuZGF0YS5saW5rO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMucHJvamVjdC52aWRlb0xpbmsgPSByZXMuZGF0YS5saW5rO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5uYXZPcHRpb25zLnRyYW5zaXRpb24ubmFtZSA9ICdzbGlkZVJpZ2h0JztcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMubmF2T3B0aW9ucy5jbGVhckhpc3RvcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5uYXZPcHRpb25zLnF1ZXJ5UGFyYW1zID0geyBwcm9qZWN0SWQ6IHRoaXMucHJvamVjdElkIH07XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9wcm9qZWN0XCJdLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0UHJvamVjdCgpIHtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3Byb2plY3RTZXJ2aWNlLmdldFByb2plY3QodGhpcy5wcm9qZWN0SWQpO1xuXG4gICAgICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYocmVzLmRhdGEpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdC5kZXNlcmlhbGl6ZShyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyLmRlc2VyaWFsaXplKHJlcy5kYXRhLnVzZXJJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50LmRlc2VyaWFsaXplKHJlcy5kYXRhLnN0dWRlbnRJZCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlzVXNlclByb2plY3QgPSAodGhpcy51c2VyLnVzZXJJZCA9PT0gdGhpcy51c2VySWQpPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbmFsUHJvamVjdEltYWdlID0gdGhpcy5wcm9qZWN0LmltYWdlVXJsO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdC5pbWFnZVVybCAgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldEltYWdlQ292ZXIodGhpcy5wcm9qZWN0LmltYWdlVXJsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3QubWFuYWdlci5pbWFnZVVybCA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0SW1hZ2VQcm9maWxlKHRoaXMucHJvamVjdC5tYW5hZ2VyLmltYWdlVXJsKTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMudXNlci5pbWFnZVVybCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbmFsVXNlckltYWdlID0gdGhpcy51c2VyLmltYWdlVXJsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXIuaW1hZ2VVcmwgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldEltYWdlUHJvZmlsZSh0aGlzLnVzZXIuaW1hZ2VVcmwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc3R1ZGVudC5pbWFnZVVybCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0dWRlbnRDb3ZlckltYWdlID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRJbWFnZUNvdmVyKHRoaXMuc3R1ZGVudC5pbWFnZVVybCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R1ZGVudC5pbWFnZVVybCA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0SW1hZ2VQcm9maWxlKHRoaXMuc3R1ZGVudC5pbWFnZVVybCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgY2hlY2tJZk1lbWJlcigpIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3Byb2plY3RNZW1iZXJTZXJ2aWNlLmNoZWNrSWZNZW1iZXIodGhpcy5wcm9qZWN0SWQsIHRoaXMudXNlcklkKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5pc01lbWJlciA9IHJlcy5pc01lbWJlcjtcblxuICAgICAgICAgICAgaWYocmVzLmlzTWVtYmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1BlbmRpbmcgPSAocmVzLmRhdGEucmVxdWVzdFN0YXR1cyA9PT0gJ3BlbmRpbmcnKT8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1jYXRjaChlKSB7fVxuICAgIH1cblxuICAgIGFzeW5jIHVwZGF0ZVByb2plY3QoKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignVXBkYXRpbmcuLi4nKTtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3Byb2plY3RTZXJ2aWNlLnVwZGF0ZVByb2plY3QodGhpcy5wcm9qZWN0SWQsIHRoaXMucHJvamVjdCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgaWYocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dTdWNjZXNzRmVlZGJhY2soJycsICdTdWNjZXNzZnVsbHkgdXBkYXRlZCEnKVxuICAgICAgICAgICAgICAgIHRoaXMubmF2T3B0aW9ucy5jbGVhckhpc3RvcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubmF2T3B0aW9ucy50cmFuc2l0aW9uLm5hbWUgPSAnc2xpZGVSaWdodCc7XG4gICAgICAgICAgICAgICAgdGhpcy5uYXZPcHRpb25zLnF1ZXJ5UGFyYW1zID0geyBwcm9qZWN0SWQ6IHRoaXMucHJvamVjdElkIH07XG4gICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcHJvamVjdFwiXSwgdGhpcy5uYXZPcHRpb25zKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0Vycm9yRmVlZGJhY2soJ09vb3BzIScsICdVcGRhdGUgZmFpbGVkJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=