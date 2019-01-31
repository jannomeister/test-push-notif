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
var joinproject_page_component_1 = require("../../view/joinproject-page/joinproject-page.component");
var brag_page_component_1 = require("../../view/brag-page/brag-page.component");
var skype_sched_page_component_1 = require("../../view/skype-sched-page/skype-sched-page.component");
var router_2 = require("nativescript-angular/router");
var page_1 = require("tns-core-modules/ui/page");
// OTHERS
var utils_1 = require("utils/utils");
var feedback_page_component_1 = require("../../view/feedback-page/feedback-page.component");
var select_student_modal_component_1 = require("../../view/select-student-modal/select-student-modal.component");
var projectmanager_info_page_component_1 = require("../../view/projectmanager-info-page/projectmanager-info-page.component");
var shipment_statusinfo_page_component_1 = require("../../view/shipment-statusinfo-page/shipment-statusinfo-page.component");
var shipment_history_page_component_1 = require("../../view/shipment-history-page/shipment-history-page.component");
var volunteers_list_modal_component_1 = require("../../view/volunteers-list-modal/volunteers-list-modal.component");
var order_bands_modal_component_1 = require("../../view/order-bands-modal/order-bands-modal.component");
// MODELS
var user_model_1 = require("../../models/user.model");
var project_model_1 = require("../../models/project.model");
var student_model_1 = require("../../models/student.model");
var shipment_model_1 = require("../../models/shipment.model");
var user_progress_model_1 = require("../../models/user-progress.model");
var call_schedule_model_1 = require("../../models/call-schedule.model");
// SERVICES
var user_service_1 = require("../../services/user.service");
var config_service_1 = require("../../services/config.service");
var project_service_1 = require("../../services/project.service");
var shipment_service_1 = require("../../services/shipment.service");
var user_project_service_1 = require("../../services/user-project.service");
var user_progress_service_1 = require("../../services/user-progress.service");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var project_member_service_1 = require("../../services/project-member.service");
var project_report_service_1 = require("../../services/project-report.service");
var component_event_service_1 = require("../../services/component-event.service");
var project_progress_service_1 = require("../../services/project-progress.service");
var dialogs = require("ui/dialogs");
var utils = require("utils/utils");
var ProjectComponent = /** @class */ (function () {
    function ProjectComponent(page, _ngZone, modal, vcRef, _activatedRoute, _routerExtensions, _userService, _configService, _projectMemberService, _projectReportService, _projectService, _shipmentService, _userProjectService, _userProgressService, _componentService, _projectProgressService) {
        this.page = page;
        this._ngZone = _ngZone;
        this.modal = modal;
        this.vcRef = vcRef;
        this._activatedRoute = _activatedRoute;
        this._routerExtensions = _routerExtensions;
        this._userService = _userService;
        this._configService = _configService;
        this._projectMemberService = _projectMemberService;
        this._projectReportService = _projectReportService;
        this._projectService = _projectService;
        this._shipmentService = _shipmentService;
        this._userProjectService = _userProjectService;
        this._userProgressService = _userProgressService;
        this._componentService = _componentService;
        this._projectProgressService = _projectProgressService;
        this.userId = 0;
        this.projectId = 0;
        this.hasProject = false;
        this.isPending = false;
        this.isUserProject = false;
        this.isReportEnable = false;
        this.isEditEnable = true;
        this.isInitialized = false;
        this.progress = {
            hasStudent: false,
            hasOrderedBands: false,
            hasSkypeCall: false,
            watchVideos: false,
            printedStudentProfile: false,
            hasSharedVideos: false,
            hasOrderedShirts: false
        };
        this.finalProgress = {
            hasShipmentLabel: false,
            hasLeftOverBands: false,
            hasSubmittedInvoice: false,
            hasConfirmPayment: false,
            hasFeedback: false
        };
        this.tabBtn = {
            project: { isActive: true },
            progress: { isActive: false },
            student: { isActive: false },
            finalization: { isActive: false },
        };
        // tabItems: Array<SegmentedBarItem> = [];
        this.projectItem = [];
        this.selectedIndex = 0;
        this.user = new user_model_1.User();
        this.student = new student_model_1.Student();
        this.project = new project_model_1.Project();
        this.shipment = new shipment_model_1.Shipment();
        this.confirmShipment = new shipment_model_1.Shipment();
        this.userProgress = new user_progress_model_1.UserProgress();
        this.callSchedule = new call_schedule_model_1.CallSchedule();
        this._componentService.setModalVcRef(this.vcRef);
        this.navOptions = this._componentService.getRouteOptions();
        this.navOptions.transition.name = 'slideTop';
        this.projectId = Number(this._activatedRoute.snapshot.params['id']);
        this._componentService.localNotifCallBack();
    }
    ProjectComponent.prototype.ngOnInit = function () {
        this.userId = this._userService.getCurrentUserId();
        this.videoStory = this._componentService.getYoutubeId('https://youtu.be/njF2MJhd6oM');
        this.getProject();
        this.getCurrentShipment();
        this.confirmShipment.deserialize({ bandsReceived: null });
    };
    ProjectComponent.prototype.toggleCheckbox = function (type) {
        this._componentService.showLoader('Updating...');
        var data = {
            hasShipmentLabel: 'printLabel',
            hasLeftOverBands: 'shipLeftoverBands',
            hasSubmittedInvoice: 'submitInvoice',
            hasConfirmPayment: 'confirmPayment'
        };
        var field = data[type];
        var obj = {};
        obj[field] = (this.finalProgress[type]) ? 'pending' : 'done';
        console.log(obj);
        this.updateProjectFinalProgress(type, obj, !this.finalProgress[type]);
    };
    ProjectComponent.prototype.toggleWatchVideo = function () {
        this._componentService.showLoader('Updating...');
        var watchVideos = (this.progress.watchVideos) ? 'pending' : 'done';
        this.updateUserProgress('watchVideos', { watchVideos: watchVideos }, !this.progress.watchVideos);
    };
    ProjectComponent.prototype.toggleOrderShirt = function () {
        this._componentService.showLoader('Updating...');
        var orderShirt = (this.progress.hasOrderedShirts) ? 'pending' : 'done';
        this.updateUserProgress('hasOrderedShirts', { orderShirt: orderShirt }, !this.progress.hasOrderedShirts);
    };
    ProjectComponent.prototype.onSelectedTabItemChange = function (args) {
        this.selectedIndex = args;
        switch (this.selectedIndex) {
            case 0:
                this.tabBtn.project.isActive = true;
                this.tabBtn.progress.isActive = false;
                this.tabBtn.student.isActive = false;
                this.tabBtn.finalization.isActive = false;
                break;
            case 1:
                this.tabBtn.project.isActive = false;
                this.tabBtn.progress.isActive = true;
                this.tabBtn.student.isActive = false;
                this.tabBtn.finalization.isActive = false;
                break;
            case 2:
                this.tabBtn.project.isActive = false;
                this.tabBtn.progress.isActive = false;
                this.tabBtn.student.isActive = true;
                this.tabBtn.finalization.isActive = false;
                this.videoid = this._componentService.getYoutubeId(this.student.videoLink);
                break;
            case 3:
                this.tabBtn.project.isActive = false;
                this.tabBtn.progress.isActive = false;
                this.tabBtn.student.isActive = false;
                this.tabBtn.finalization.isActive = true;
                break;
            default:
                this.tabBtn.project.isActive = true;
                this.tabBtn.progress.isActive = false;
                this.tabBtn.student.isActive = false;
                this.tabBtn.finalization.isActive = false;
                break;
        }
    };
    ProjectComponent.prototype.openSkypeUrl = function () {
        utils.openUrl('http://www.yudabands.org/skype');
    };
    ProjectComponent.prototype.openBragModal = function () {
        var _this = this;
        this._componentService.showLoader('Opening...');
        setTimeout(function () {
            _this._componentService.hideLoader();
            if (!_this.project.hasStudent()) {
                _this._componentService.showAlert('Ooops!', 'Please select a student to sponsor before you can brag');
                return;
            }
            var opt = _this._componentService.getModalOptions({ student: _this.student, project: _this.project }, false, false);
            _this.modal.showModal(brag_page_component_1.BragComponent, opt).then(function (res) { return console.log(res); });
        }, 1500);
    };
    ProjectComponent.prototype.openMeetStudent = function () {
        console.log('TODO: redirect url');
    };
    ProjectComponent.prototype.openShipmentHistory = function () {
        var _this = this;
        this._componentService.showLoader('Opening...');
        setTimeout(function () {
            _this._componentService.hideLoader();
            var opt = _this._componentService.getModalOptions({ projectId: _this.projectId }, false);
            _this.modal.showModal(shipment_history_page_component_1.ShipmentHistoryComponent, opt).then(function (res) { return console.log(res); });
        }, 1500);
    };
    ProjectComponent.prototype.openVolunteersList = function () {
        this._componentService.hideLoader();
        var opt = this._componentService.getModalOptions({ projectId: this.projectId }, false);
        this.modal.showModal(volunteers_list_modal_component_1.VolunteersListComponent, opt).then(function (res) { return console.log(res); });
    };
    ProjectComponent.prototype.openSocialDialog = function () {
        var _this = this;
        dialogs.action({
            message: "Follow us!",
            cancelButtonText: "Cancel",
            actions: ["Facebook", "Twitter", "Instagram", "Youtube"]
        }).then(function (result) {
            console.log("Dialog result: " + result);
            if (result == "Facebook") {
                _this.openSocial('facebook');
            }
            else if (result == "Twitter") {
                _this.openSocial('twitter');
            }
            else if (result == "Instagram") {
                _this.openSocial('instagram');
            }
            else if (result == "Youtube") {
                _this.openSocial('youtube');
            }
        });
    };
    ProjectComponent.prototype.updateNumbers = function () {
        var _this = this;
        if (!this.progress.hasOrderedBands) {
            this._componentService.showAlert('Ooops!', 'Please order Yuda Bands first.');
            return;
        }
        else if (!this.shipment.isDelivered()) {
            this._componentService.showAlert('Ooops!', 'Your shipment has not yet been delivered');
            return;
        }
        dialogs.prompt({
            title: "Update Bands Sold",
            message: "Please update your band's sold",
            okButtonText: "Update",
            cancelButtonText: "Cancel",
            inputType: dialogs.inputType.number
        }).then(function (r) {
            if (r.result) {
                _this._componentService.showLoader('Updating...');
                _this.updateBandsSold(parseInt(r.text));
            }
        });
    };
    ProjectComponent.prototype.openSocial = function (type) {
        var name = '';
        if (type === 'facebook') {
            name = 'https://www.facebook.com/yudabands';
        }
        else if (type === 'instagram') {
            name = 'https://www.instagram.com/yudabands';
        }
        else if (type === 'twitter') {
            name = 'https://twitter.com/yudabands';
        }
        else if (type === 'youtube') {
            name = 'https://www.youtube.com/user/yudabands';
        }
        utils.openUrl(name);
    };
    ProjectComponent.prototype.goTo = function (type) {
        var url = '';
        if (type === 'trip') {
            url = 'http://www.yudabands.org/trips';
            utils.openUrl(url);
        }
        else if (type === 'review') {
            url = 'https://www.facebook.com/pg/yudabands/reviews/?ref=page_internal';
            utils.openUrl(url);
        }
        else if (type === 'shirt') {
            url = 'https://yudabands.org/shirts';
            utils.openUrl(url);
        }
        else if (type === 'resources') {
            this.navOptions.animated = false;
            this._routerExtensions.navigate(['/' + type], this.navOptions);
        }
        else if (type === 'media') {
            this._routerExtensions.navigate(['/' + type], this.navOptions);
        }
        else if (type === 'feedback') {
            this.openFeedbackModal();
        }
    };
    ProjectComponent.prototype.goToEditUser = function () {
        this.navOptions.transition.name = 'slideLeft';
        this._routerExtensions.navigate(['/edit-profile'], this.navOptions);
    };
    ProjectComponent.prototype.viewPendingInfo = function () {
        this._componentService.showAlert('Information', 'Your student is not yet verified, to be able to display your project publicly you need to wait for the project manager to approve your student.');
    };
    ProjectComponent.prototype.joinProject = function () {
        var _this = this;
        var opt = this._componentService.getModalOptions({
            userId: this.userId,
            projectId: this.projectId
        }, false, false);
        this.modal.showModal(joinproject_page_component_1.JoinProjectComponent, opt).then(function (res) {
            if (res) {
                _this._componentService.showAlert("Information", "You will be notified once the project leader approves your request.");
                _this._ngZone.run(function () {
                    _this.hasProject = true;
                    _this.isPending = true;
                    _this.isMember = true;
                });
            }
        });
    };
    ProjectComponent.prototype.viewShipmentStatus = function () {
        if (this.project.status === 'rejected') {
            this._componentService.showAlert('Ooops!', 'You can\'t view a rejected project shipment status.');
            return;
        }
        var opt = this._componentService.getModalOptions({ projectId: this.projectId }, false, false);
        this.modal.showModal(shipment_statusinfo_page_component_1.ShipmentStatusInfoComponent, opt).then(function (res) { return console.log(res); });
    };
    ProjectComponent.prototype.openScheduleSkypeModal = function () {
        var _this = this;
        if (this.project.status === 'done') {
            this._componentService.showAlert('Ooops!', 'You can\'t schedule a skype call on this project');
            return;
        }
        if (!this.project.hasStudent()) {
            this._componentService.showAlert('Ooops!', 'Please select a student to sponsor before you can schedule a call');
            return;
        }
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 4);
        var maxDate = new Date(this.project.dateStart);
        maxDate.setDate(maxDate.getDate() + 4);
        if (currentDate > maxDate) {
            this._componentService.showAlert('Ooops!', 'You are past due with the given available skype call dates');
            return;
        }
        var context = {
            projectId: this.project.projectId,
            schoolAddress: this.project.schoolAddress,
            user: this.user,
            student: this.student,
            dateStart: this.project.dateStart,
            dateEnd: this.project.dateEnd
        };
        this.modal.showModal(skype_sched_page_component_1.SkypeSchedComponent, this._componentService.getModalOptions(context, true)).then(function (response) {
            if (response.success) {
                _this.progress.hasSkypeCall = response.success;
                _this.callSchedule.deserialize(response.data);
            }
        });
    };
    ProjectComponent.prototype.onPrintProfile = function () {
        var _this = this;
        this._componentService.showLoader('Opening...');
        if (this.isUserProject) {
            this.updateUserProgress('printedStudentProfile', { printStudentProfile: 'done' });
        }
        else {
            setTimeout(function () {
                _this._componentService.hideLoader();
                utils_1.openUrl(_this._configService.getWebBaseUrl() + "/view-student/" + _this.student.studentId);
            }, 800);
        }
    };
    ProjectComponent.prototype.report = function () {
        this.checkHasReport();
    };
    ProjectComponent.prototype.startProject = function () {
        this._routerExtensions.navigate(["/start-project"], this.navOptions);
    };
    ProjectComponent.prototype.routeToStartProject = function () {
        this.navOptions.animated = true;
        this.navOptions.clearHistory = false;
        this._routerExtensions.navigate(["/start-project"], this.navOptions);
    };
    ProjectComponent.prototype.onEditProject = function () {
        if (this.project.status === 'rejected') {
            this._componentService.showAlert('Ooops!', 'You can\'t edit a rejected project.');
            return;
        }
        else if (this.project.status === 'done') {
            this._componentService.showAlert('Ooops!', 'You can\'t edit a project when it\'s done');
            return;
        }
        this.navOptions.transition.name = "";
        this.navOptions.transition.curve = "";
        this.navOptions.transition.duration = 0;
        this.navOptions.queryParams = {
            projectId: this.project.projectId
        };
        this._routerExtensions.navigate(["/edit-project"], this.navOptions);
    };
    ProjectComponent.prototype.openProjectManagerInfoModal = function () {
        var opt = this._componentService.getModalOptions({ userId: this.project.manager.userId }, true);
        this.modal.showModal(projectmanager_info_page_component_1.ProjectManagerInfoComponent, opt).then(function (response) {
            console.log(response);
        });
    };
    ProjectComponent.prototype.openProject = function (data) {
        if (data.studentId === 0) {
            this.navOptions.queryParams = { projectId: data.projectId };
            this._routerExtensions.navigate(['/project-approved'], this.navOptions);
        }
        else {
            this.navOptions.transition.name = 'slideLeft';
            this._routerExtensions.navigate(['/project', data.projectId], this.navOptions);
        }
    };
    ProjectComponent.prototype.openFeedbackModal = function () {
        var _this = this;
        if (this.finalProgress.hasFeedback) {
            this._componentService.showAlert('Ooops!', 'You already submitted a feedback');
            return;
        }
        var opt = this._componentService.getModalOptions({ projectId: this.project.projectId }, true);
        this.modal.showModal(feedback_page_component_1.FeedbackComponent, opt).then(function (response) {
            if (response) {
                _this._componentService.showLoader('Refreshing...');
                _this.getProject();
            }
        });
    };
    ProjectComponent.prototype.orderBands = function () {
        var _this = this;
        var opt = this._componentService.getModalOptions({
            projectId: this.projectId,
            dateStart: this.project.dateStart
        }, true);
        this.modal.showModal(order_bands_modal_component_1.OrderBandsComponent, opt).then(function (response) {
            if (response.success) {
                _this.projectId = response.projectId;
                _this._componentService.showLoader('Refreshing...');
                _this.getProject();
            }
        });
    };
    ProjectComponent.prototype.openSelectStudentPage = function () {
        var _this = this;
        var opt = this._componentService.getModalOptions({
            projectId: this.projectId,
            dateStart: this.project.dateStart
        }, true);
        this.modal.showModal(select_student_modal_component_1.SelectStudentComponent, opt).then(function (response) {
            if (response.success) {
                _this.projectId = response.projectId;
                _this._componentService.showLoader('Refreshing...');
                _this.getProject();
                _this.onSelectedTabItemChange(2);
            }
        });
    };
    ProjectComponent.prototype.showConfirm = function (message) {
        var _this = this;
        dialogs.confirm({
            title: "Oooppss!",
            message: message,
            okButtonText: "Create",
            cancelButtonText: "Cancel",
        }).then(function (result) {
            if (result) {
                _this.routeToStartProject();
            }
        });
    };
    ProjectComponent.prototype.confirmShipmentItem = function () {
        var _this = this;
        this._componentService.showLoader('Loading...');
        setTimeout(function () {
            if (!_this.confirmShipment.bandsReceived) {
                _this._componentService.hideLoader();
                _this._componentService.showAlert('Ooops!', 'All fields are required');
                return;
            }
            else {
                _this.confirm();
            }
        }, 800);
    };
    ProjectComponent.prototype.getManagerProfile = function (url) {
        return this._componentService.getProjectManageProfile(url);
    };
    ProjectComponent.prototype.getProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res_1, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._projectService.getProject(this.projectId)];
                    case 1:
                        res_1 = _a.sent();
                        this.isInitialized = true;
                        this._componentService.hideLoader();
                        if (res_1.data) {
                            this.project.deserialize(res_1.data);
                            this.user.deserialize(res_1.data.userId);
                            this.student.deserialize(res_1.data.studentId);
                            this.callSchedule.deserialize(res_1.data.schedules[0]);
                            this.checkUserCurrentProject();
                            this._componentService.hasScheduledNotif(res_1.data.projectId)
                                .then(function (hasNotif) {
                                if (!hasNotif) {
                                    _this._componentService.scheduleNotification(res_1.data);
                                }
                            });
                            this.videoId = this._componentService.getYoutubeId(this.student.videoLink);
                            this.project.imageUrl = this._componentService.getImageCover(this.project.imageUrl);
                            if (this.user.imageUrl) {
                                this.user.imageUrl = this._componentService.getImageProfile(this.user.imageUrl);
                            }
                            if (this.student.imageUrl) {
                                this.student.imageUrl = this._componentService.getImageProfile(this.student.imageUrl);
                                this.studentCoverImage = this._componentService.getImageCover(this.student.imageUrl);
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
    ProjectComponent.prototype.getProjectProgress = function (projectId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._projectService.getProgress(projectId)];
                    case 1:
                        res = _a.sent();
                        this.progress.hasStudent = res.hasStudent;
                        this.progress.hasOrderedBands = res.hasOrderedBands;
                        this.progress.hasSkypeCall = res.hasSkypeCall;
                        this.getUserProgress();
                        this.getProjectFinalProgress();
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
    ProjectComponent.prototype.getUserProgress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userProgressService.getProgress(this.userId)];
                    case 1:
                        res = _a.sent();
                        if (res.data) {
                            this.userProgress.deserialize(res.data);
                            this.progress.watchVideos = this.userProgress.getProgress().watchVideos;
                            this.progress.printedStudentProfile = this.userProgress.getProgress().printedStudentProfile;
                            this.progress.hasSharedVideos = this.userProgress.getProgress().hasSharedVideos;
                            this.progress.hasOrderedShirts = this.userProgress.getProgress().hasOrderedShirts;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProjectComponent.prototype.getProjectFinalProgress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._projectProgressService.getProgress(this.userId, this.projectId)];
                    case 1:
                        res = _a.sent();
                        this.finalProgress = res;
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        console.log(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProjectComponent.prototype.getCurrentShipment = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._shipmentService.getCurrentShipment(this.projectId)];
                    case 1:
                        res = _a.sent();
                        if (res.data)
                            this.shipment.deserialize(res.data);
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        console.log(e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProjectComponent.prototype.checkUserCurrentProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userProjectService.checkUserCurrentProject(this.userId)];
                    case 1:
                        res = _a.sent();
                        if (res.hasProject) {
                            this.hasProject = res.hasProject;
                            if (res.project.projectId === this.projectId) {
                                this.isUserProject = (res.isLeader && !res.isMember) ? res.isLeader : false;
                                this.isMember = (!res.isLeader && res.isMember) ? res.isMember : false;
                                this.isPending = (!res.isLeader && res.isMember && !res.memberConfig.isApproved) ? true : false;
                                this.getProjectProgress(this.projectId);
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        console.log(e_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProjectComponent.prototype.checkHasReport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._componentService.showLoader('Loading...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._projectReportService.checkHasReport(this.projectId, this.userId)];
                    case 2:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.success) {
                            if (!res.hasReport) {
                                this.navOptions.queryParams = { projectId: this.projectId };
                                this._routerExtensions.navigate(['/project-report'], this.navOptions);
                            }
                            else {
                                this._componentService.showAlert('Ooops!', 'You already made a report for this project.');
                            }
                        }
                        else {
                            this._componentService.showAlert('Ooops!', res.message);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_7 = _a.sent();
                        this._componentService.hideLoader();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProjectComponent.prototype.updateUserProgress = function (type, data, isDone) {
        if (isDone === void 0) { isDone = true; }
        return __awaiter(this, void 0, void 0, function () {
            var res, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userProgressService.updateProgress(this.userId, data)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        this.progress[type] = isDone;
                        if (type === 'printedStudentProfile')
                            utils_1.openUrl(this._configService.getWebBaseUrl() + "/view-student/" + this.student.studentId);
                        return [3 /*break*/, 3];
                    case 2:
                        e_8 = _a.sent();
                        console.log(e_8);
                        this._componentService.hideLoader();
                        if (type === 'printedStudentProfile')
                            utils_1.openUrl(this._configService.getWebBaseUrl() + "/view-student/" + this.student.studentId);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProjectComponent.prototype.updateProjectFinalProgress = function (type, data, isDone) {
        if (isDone === void 0) { isDone = true; }
        return __awaiter(this, void 0, void 0, function () {
            var res, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._projectProgressService.updateProgress(this.projectId, data)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        console.log("FINAL PROGRESS: " + type);
                        console.log("BOOLEAN: " + isDone);
                        this.finalProgress[type] = isDone;
                        return [3 /*break*/, 3];
                    case 2:
                        e_9 = _a.sent();
                        console.log(e_9);
                        this._componentService.hideLoader();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProjectComponent.prototype.updateBandsSold = function (newNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._projectService.updateProject(this.projectId, { bandsSold: newNumber })];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.success) {
                            this.project.bandsSold = newNumber;
                            this._componentService.showSuccessFeedback('Success!', 'Total bands sold successfully updated!');
                        }
                        else {
                            this._componentService.showErrorFeedback('Oops!', 'Unable to update your total sold bands');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_10 = _a.sent();
                        this._componentService.hideLoader();
                        this._componentService.showErrorFeedback('Oops!', 'Unable to update your total sold bands');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProjectComponent.prototype.confirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._shipmentService.confirm(this.shipment.shipmentId, this.confirmShipment)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.success) {
                            this.getCurrentShipment();
                            this._componentService.showAlert('Success!', 'Number of Bands confirmed. You can now start with your project. Goodluck!');
                        }
                        else {
                            this._componentService.showAlert('Ooops!', 'Unable to confirm bands. Please try again.');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_11 = _a.sent();
                        this._componentService.hideLoader();
                        this._componentService.showAlert('Ooops!', 'Unable to confirm bands. Please try again.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProjectComponent = __decorate([
        core_1.Component({
            selector: "project-page",
            moduleId: module.id,
            templateUrl: "./project-page.component.html",
            styleUrls: ['./project-page.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            core_1.NgZone,
            dialogs_1.ModalDialogService,
            core_1.ViewContainerRef,
            router_1.ActivatedRoute,
            router_2.RouterExtensions,
            user_service_1.UserService,
            config_service_1.ConfigService,
            project_member_service_1.ProjectMemberService,
            project_report_service_1.ProjectReportService,
            project_service_1.ProjectService,
            shipment_service_1.ShipmentService,
            user_project_service_1.UserProjectService,
            user_progress_service_1.UserProgressService,
            component_event_service_1.ComponentEventService,
            project_progress_service_1.ProjectProgressService])
    ], ProjectComponent);
    return ProjectComponent;
}());
exports.ProjectComponent = ProjectComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2plY3QtcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUE0RTtBQUM1RSwwQ0FBaUQ7QUFDakQscUdBQThGO0FBQzlGLGdGQUF3RTtBQUd4RSxxR0FBNkY7QUFDN0Ysc0RBQStEO0FBRS9ELGlEQUFnRDtBQUVoRCxTQUFTO0FBQ1QscUNBQXNDO0FBQ3RDLDRGQUFxRjtBQUNyRixpSEFBd0c7QUFDeEcsNkhBQXFIO0FBQ3JILDZIQUFxSDtBQUNySCxvSEFBNEc7QUFDNUcsb0hBQTJHO0FBRTNHLHdHQUErRjtBQUUvRixTQUFTO0FBQ1Qsc0RBQStDO0FBQy9DLDREQUFxRDtBQUNyRCw0REFBcUQ7QUFDckQsOERBQXVEO0FBQ3ZELHdFQUFnRTtBQUNoRSx3RUFBZ0U7QUFFaEUsV0FBVztBQUNYLDREQUEwRDtBQUMxRCxnRUFBOEQ7QUFDOUQsa0VBQWdFO0FBQ2hFLG9FQUFrRTtBQUNsRSw0RUFBeUU7QUFDekUsOEVBQTJFO0FBQzNFLG1FQUE2RTtBQUM3RSxnRkFBNkU7QUFDN0UsZ0ZBQTZFO0FBQzdFLGtGQUErRTtBQUMvRSxvRkFBaUY7QUFFakYsb0NBQXNDO0FBQ3RDLG1DQUFxQztBQVFyQztJQXNESSwwQkFDWSxJQUFVLEVBQ1YsT0FBZSxFQUNmLEtBQXlCLEVBQy9CLEtBQXVCLEVBQ2pCLGVBQStCLEVBQ3JDLGlCQUFtQyxFQUU3QixZQUF5QixFQUN6QixjQUE2QixFQUM3QixxQkFBMkMsRUFDM0MscUJBQTJDLEVBQzNDLGVBQStCLEVBQy9CLGdCQUFpQyxFQUNqQyxtQkFBdUMsRUFDdkMsb0JBQXlDLEVBQ3pDLGlCQUF3QyxFQUN4Qyx1QkFBK0M7UUFoQi9DLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixZQUFPLEdBQVAsT0FBTyxD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QUU3RixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBRXBDLElBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRTs0QkFDWixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs0QkFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsMkVBQTJFLENBQUMsQ0FBQTt5QkFFNUg7NkJBQUs7NEJBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsNENBQTRDLENBQUMsQ0FBQzt5QkFDNUY7Ozs7d0JBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUNwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSw0Q0FBNEMsQ0FBQyxDQUFDOzs7Ozs7S0FFaEc7SUFodEJRLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDOUMsQ0FBQzt5Q0F3RG9CLFdBQUk7WUFDRCxhQUFNO1lBQ1IsNEJBQWtCO1lBQ3hCLHVCQUFnQjtZQUNBLHVCQUFjO1lBQ2xCLHlCQUFnQjtZQUVmLDBCQUFXO1lBQ1QsOEJBQWE7WUFDTiw2Q0FBb0I7WUFDcEIsNkNBQW9CO1lBQzFCLGdDQUFjO1lBQ2Isa0NBQWU7WUFDWix5Q0FBa0I7WUFDakIsMkNBQW1CO1lBQ3RCLCtDQUFxQjtZQUNmLGlEQUFzQjtPQXZFbEQsZ0JBQWdCLENBaXRCNUI7SUFBRCx1QkFBQztDQUFBLEFBanRCRCxJQWl0QkM7QUFqdEJZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmLCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBKb2luUHJvamVjdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi92aWV3L2pvaW5wcm9qZWN0LXBhZ2Uvam9pbnByb2plY3QtcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IEJyYWdDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vdmlldy9icmFnLXBhZ2UvYnJhZy1wYWdlLmNvbXBvbmVudFwiXG5pbXBvcnQgeyBKb2luUHJvamVjdEFsZXJ0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3ZpZXcvam9pbnByb2plY3QtYWxlcnQtcGFnZS9qb2lucHJvamVjdC1hbGVydC1wYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2hhcmVQcm9qZWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3ZpZXcvc2hhcmVwcm9qZWN0LXBhZ2Uvc2hhcmVwcm9qZWN0LXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTa3lwZVNjaGVkQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3ZpZXcvc2t5cGUtc2NoZWQtcGFnZS9za3lwZS1zY2hlZC1wYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFNlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuXG4vLyBPVEhFUlNcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IEZlZWRiYWNrQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3ZpZXcvZmVlZGJhY2stcGFnZS9mZWVkYmFjay1wYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2VsZWN0U3R1ZGVudENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi92aWV3L3NlbGVjdC1zdHVkZW50LW1vZGFsL3NlbGVjdC1zdHVkZW50LW1vZGFsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUHJvamVjdE1hbmFnZXJJbmZvQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3ZpZXcvcHJvamVjdG1hbmFnZXItaW5mby1wYWdlL3Byb2plY3RtYW5hZ2VyLWluZm8tcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNoaXBtZW50U3RhdHVzSW5mb0NvbXBvbmVudCB9IGZyb20gXCIuLi8uLi92aWV3L3NoaXBtZW50LXN0YXR1c2luZm8tcGFnZS9zaGlwbWVudC1zdGF0dXNpbmZvLXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTaGlwbWVudEhpc3RvcnlDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vdmlldy9zaGlwbWVudC1oaXN0b3J5LXBhZ2Uvc2hpcG1lbnQtaGlzdG9yeS1wYWdlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgVm9sdW50ZWVyc0xpc3RDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vdmlldy92b2x1bnRlZXJzLWxpc3QtbW9kYWwvdm9sdW50ZWVycy1saXN0LW1vZGFsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2VsZWN0TGlzdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi92aWV3L3NlbGVjdGxpc3QtcGFnZS9zZWxlY3RsaXN0LXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBPcmRlckJhbmRzQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3ZpZXcvb3JkZXItYmFuZHMtbW9kYWwvb3JkZXItYmFuZHMtbW9kYWwuY29tcG9uZW50XCI7XG5cbi8vIE1PREVMU1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvcHJvamVjdC5tb2RlbFwiO1xuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudC5tb2RlbFwiO1xuaW1wb3J0IHsgU2hpcG1lbnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3NoaXBtZW50Lm1vZGVsXCI7XG5pbXBvcnQgeyBVc2VyUHJvZ3Jlc3MgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3VzZXItcHJvZ3Jlc3MubW9kZWxcIjtcbmltcG9ydCB7IENhbGxTY2hlZHVsZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvY2FsbC1zY2hlZHVsZS5tb2RlbFwiO1xuXG4vLyBTRVJWSUNFU1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQcm9qZWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wcm9qZWN0LnNlcnZpY2VcIjtcbmltcG9ydCB7IFNoaXBtZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zaGlwbWVudC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VyUHJvamVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci1wcm9qZWN0LnNlcnZpY2VcIjtcbmltcG9ydCB7IFVzZXJQcm9ncmVzc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci1wcm9ncmVzcy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBQcm9qZWN0TWVtYmVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wcm9qZWN0LW1lbWJlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQcm9qZWN0UmVwb3J0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wcm9qZWN0LXJlcG9ydC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21wb25lbnRFdmVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29tcG9uZW50LWV2ZW50LnNlcnZpY2VcIjtcbmltcG9ydCB7IFByb2plY3RQcm9ncmVzc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcHJvamVjdC1wcm9ncmVzcy5zZXJ2aWNlXCI7XG5cbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCJ1dGlscy91dGlsc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwcm9qZWN0LXBhZ2VcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcHJvamVjdC1wYWdlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvamVjdC1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICB2aWRlb0lkOiBzdHJpbmc7XG4gICAgdmlkZW9pZDogc3RyaW5nO1xuICAgIHZpZGVvU3Rvcnk6IHN0cmluZztcbiAgICBzdHVkZW50Q292ZXJJbWFnZTogc3RyaW5nO1xuICAgIHVzZXJJZDogbnVtYmVyID0gMDtcbiAgICBwcm9qZWN0SWQ6IG51bWJlciA9IDA7XG4gICAgaGFzUHJvamVjdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzTWVtYmVyOiBib29sZWFuO1xuICAgIGlzUGVuZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzVXNlclByb2plY3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc1JlcG9ydEVuYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzRWRpdEVuYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIFxuICAgIG5hdk9wdGlvbnM6IGFueTtcbiAgICBwcm9ncmVzczogYW55ID0ge1xuICAgICAgICBoYXNTdHVkZW50OiBmYWxzZSxcbiAgICAgICAgaGFzT3JkZXJlZEJhbmRzOiBmYWxzZSxcbiAgICAgICAgaGFzU2t5cGVDYWxsOiBmYWxzZSxcbiAgICAgICAgd2F0Y2hWaWRlb3M6IGZhbHNlLFxuICAgICAgICBwcmludGVkU3R1ZGVudFByb2ZpbGU6IGZhbHNlLFxuICAgICAgICBoYXNTaGFyZWRWaWRlb3M6IGZhbHNlLFxuICAgICAgICBoYXNPcmRlcmVkU2hpcnRzOiBmYWxzZVxuICAgIH1cblxuICAgIGZpbmFsUHJvZ3Jlc3M6IGFueSA9IHtcbiAgICAgICAgaGFzU2hpcG1lbnRMYWJlbDogZmFsc2UsXG4gICAgICAgIGhhc0xlZnRPdmVyQmFuZHM6IGZhbHNlLFxuICAgICAgICBoYXNTdWJtaXR0ZWRJbnZvaWNlOiBmYWxzZSxcbiAgICAgICAgaGFzQ29uZmlybVBheW1lbnQ6IGZhbHNlLFxuICAgICAgICBoYXNGZWVkYmFjazogZmFsc2VcbiAgICB9XG5cbiAgICB0YWJCdG46IGFueSA9IHtcbiAgICAgICAgcHJvamVjdDogeyBpc0FjdGl2ZTogdHJ1ZSB9LFxuICAgICAgICBwcm9ncmVzczogeyBpc0FjdGl2ZTogZmFsc2UgfSxcbiAgICAgICAgc3R1ZGVudDogeyBpc0FjdGl2ZTogZmFsc2UgfSxcbiAgICAgICAgZmluYWxpemF0aW9uOiB7IGlzQWN0aXZlOiBmYWxzZSB9LFxuICAgIH07XG5cbiAgICB1c2VyOiBVc2VyO1xuICAgIHN0dWRlbnQ6IFN0dWRlbnQ7XG4gICAgcHJvamVjdDogUHJvamVjdDtcbiAgICBzaGlwbWVudDogU2hpcG1lbnQ7XG4gICAgY29uZmlybVNoaXBtZW50OiBTaGlwbWVudDtcbiAgICB1c2VyUHJvZ3Jlc3M6IFVzZXJQcm9ncmVzcztcbiAgICBjYWxsU2NoZWR1bGU6IENhbGxTY2hlZHVsZTtcblxuICAgIC8vIHRhYkl0ZW1zOiBBcnJheTxTZWdtZW50ZWRCYXJJdGVtPiA9IFtdO1xuICAgIHByb2plY3RJdGVtOiBhbnkgPSBbXTsgXG4gICAgc2VsZWN0ZWRJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsXG5cdFx0cHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuXHRcdHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG5cbiAgICAgICAgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9jb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9wcm9qZWN0TWVtYmVyU2VydmljZTogUHJvamVjdE1lbWJlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3Byb2plY3RSZXBvcnRTZXJ2aWNlOiBQcm9qZWN0UmVwb3J0U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfcHJvamVjdFNlcnZpY2U6IFByb2plY3RTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9zaGlwbWVudFNlcnZpY2U6IFNoaXBtZW50U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfdXNlclByb2plY3RTZXJ2aWNlOiBVc2VyUHJvamVjdFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3VzZXJQcm9ncmVzc1NlcnZpY2U6IFVzZXJQcm9ncmVzc1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfcHJvamVjdFByb2dyZXNzU2VydmljZTogUHJvamVjdFByb2dyZXNzU2VydmljZVxuICAgICkgeyBcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcbiAgICAgICAgdGhpcy5zdHVkZW50ID0gbmV3IFN0dWRlbnQoKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gbmV3IFByb2plY3QoKTtcbiAgICAgICAgdGhpcy5zaGlwbWVudCA9IG5ldyBTaGlwbWVudCgpO1xuICAgICAgICB0aGlzLmNvbmZpcm1TaGlwbWVudCA9IG5ldyBTaGlwbWVudCgpO1xuICAgICAgICB0aGlzLnVzZXJQcm9ncmVzcyA9IG5ldyBVc2VyUHJvZ3Jlc3MoKTtcbiAgICAgICAgdGhpcy5jYWxsU2NoZWR1bGUgPSBuZXcgQ2FsbFNjaGVkdWxlKCk7XG5cbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zZXRNb2RhbFZjUmVmKHRoaXMudmNSZWYpXG5cbiAgICAgICAgdGhpcy5uYXZPcHRpb25zID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRSb3V0ZU9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zLnRyYW5zaXRpb24ubmFtZSA9ICdzbGlkZVRvcCc7XG5cbiAgICAgICAgdGhpcy5wcm9qZWN0SWQgPSBOdW1iZXIodGhpcy5fYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddKTtcblxuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmxvY2FsTm90aWZDYWxsQmFjaygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnVzZXJJZCA9IHRoaXMuX3VzZXJTZXJ2aWNlLmdldEN1cnJlbnRVc2VySWQoKTtcblxuICAgICAgICB0aGlzLnZpZGVvU3RvcnkgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldFlvdXR1YmVJZCgnaHR0cHM6Ly95b3V0dS5iZS9uakYyTUpoZDZvTScpO1xuICAgICAgICB0aGlzLmdldFByb2plY3QoKTtcbiAgICAgICAgdGhpcy5nZXRDdXJyZW50U2hpcG1lbnQoKTtcblxuICAgICAgICB0aGlzLmNvbmZpcm1TaGlwbWVudC5kZXNlcmlhbGl6ZSh7IGJhbmRzUmVjZWl2ZWQ6IG51bGwgfSlcbiAgICB9XG5cbiAgICB0b2dnbGVDaGVja2JveCh0eXBlKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignVXBkYXRpbmcuLi4nKVxuXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgaGFzU2hpcG1lbnRMYWJlbDogJ3ByaW50TGFiZWwnLFxuICAgICAgICAgICAgaGFzTGVmdE92ZXJCYW5kczogJ3NoaXBMZWZ0b3ZlckJhbmRzJyxcbiAgICAgICAgICAgIGhhc1N1Ym1pdHRlZEludm9pY2U6ICdzdWJtaXRJbnZvaWNlJyxcbiAgICAgICAgICAgIGhhc0NvbmZpcm1QYXltZW50OiAnY29uZmlybVBheW1lbnQnXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZmllbGQgPSBkYXRhW3R5cGVdO1xuICAgICAgICBsZXQgb2JqID0ge307XG4gICAgICAgIFxuICAgICAgICBvYmpbZmllbGRdID0gKHRoaXMuZmluYWxQcm9ncmVzc1t0eXBlXSk/ICdwZW5kaW5nJyA6ICdkb25lJztcbiAgICAgICAgY29uc29sZS5sb2cob2JqKVxuICAgICAgICB0aGlzLnVwZGF0ZVByb2plY3RGaW5hbFByb2dyZXNzKHR5cGUsIG9iaiwgIXRoaXMuZmluYWxQcm9ncmVzc1t0eXBlXSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlV2F0Y2hWaWRlbygpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdVcGRhdGluZy4uLicpXG5cbiAgICAgICAgbGV0IHdhdGNoVmlkZW9zID0gKHRoaXMucHJvZ3Jlc3Mud2F0Y2hWaWRlb3MpPyAncGVuZGluZycgOiAnZG9uZSc7XG4gICAgICAgIHRoaXMudXBkYXRlVXNlclByb2dyZXNzKCd3YXRjaFZpZGVvcycsIHsgd2F0Y2hWaWRlb3M6IHdhdGNoVmlkZW9zIH0sICF0aGlzLnByb2dyZXNzLndhdGNoVmlkZW9zKVxuICAgIH1cblxuICAgIHRvZ2dsZU9yZGVyU2hpcnQoKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignVXBkYXRpbmcuLi4nKVxuXG4gICAgICAgIGxldCBvcmRlclNoaXJ0ID0gKHRoaXMucHJvZ3Jlc3MuaGFzT3JkZXJlZFNoaXJ0cyk/ICdwZW5kaW5nJyA6ICdkb25lJztcbiAgICAgICAgdGhpcy51cGRhdGVVc2VyUHJvZ3Jlc3MoJ2hhc09yZGVyZWRTaGlydHMnLCB7IG9yZGVyU2hpcnQ6IG9yZGVyU2hpcnQgfSwgIXRoaXMucHJvZ3Jlc3MuaGFzT3JkZXJlZFNoaXJ0cylcbiAgICB9XG5cbiAgICBvblNlbGVjdGVkVGFiSXRlbUNoYW5nZShhcmdzKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGFyZ3NcbiAgICAgICAgc3dpdGNoICh0aGlzLnNlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB0aGlzLnRhYkJ0bi5wcm9qZWN0LmlzQWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRoaXMudGFiQnRuLnByb2dyZXNzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnRhYkJ0bi5zdHVkZW50LmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnRhYkJ0bi5maW5hbGl6YXRpb24uaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgdGhpcy50YWJCdG4ucHJvamVjdC5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy50YWJCdG4ucHJvZ3Jlc3MuaXNBY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy50YWJCdG4uc3R1ZGVudC5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy50YWJCdG4uZmluYWxpemF0aW9uLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzLnRhYkJ0bi5wcm9qZWN0LmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnRhYkJ0bi5wcm9ncmVzcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy50YWJCdG4uc3R1ZGVudC5pc0FjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgICAgICB0aGlzLnRhYkJ0bi5maW5hbGl6YXRpb24uaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9pZCA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0WW91dHViZUlkKHRoaXMuc3R1ZGVudC52aWRlb0xpbmspO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHRoaXMudGFiQnRuLnByb2plY3QuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMudGFiQnRuLnByb2dyZXNzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnRhYkJ0bi5zdHVkZW50LmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnRhYkJ0bi5maW5hbGl6YXRpb24uaXNBY3RpdmUgPSB0cnVlXG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnRhYkJ0bi5wcm9qZWN0LmlzQWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRoaXMudGFiQnRuLnByb2dyZXNzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnRhYkJ0bi5zdHVkZW50LmlzQWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnRhYkJ0bi5maW5hbGl6YXRpb24uaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlblNreXBlVXJsKCkge1xuICAgICAgICB1dGlscy5vcGVuVXJsKCdodHRwOi8vd3d3Lnl1ZGFiYW5kcy5vcmcvc2t5cGUnKVxuICAgIH1cblxuICAgIG9wZW5CcmFnTW9kYWwoKSB7XG5cbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdPcGVuaW5nLi4uJyk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcblxuICAgICAgICAgICAgaWYoIXRoaXMucHJvamVjdC5oYXNTdHVkZW50KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ1BsZWFzZSBzZWxlY3QgYSBzdHVkZW50IHRvIHNwb25zb3IgYmVmb3JlIHlvdSBjYW4gYnJhZycpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9wdCA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0TW9kYWxPcHRpb25zKHsgc3R1ZGVudDogdGhpcy5zdHVkZW50LCBwcm9qZWN0OiB0aGlzLnByb2plY3QgfSwgZmFsc2UsIGZhbHNlKVxuXG4gICAgICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChCcmFnQ29tcG9uZW50LCBvcHQpLnRoZW4ocmVzID0+IGNvbnNvbGUubG9nKHJlcykpXG4gICAgICAgIH0sIDE1MDApXG4gICAgfVxuXG4gICAgb3Blbk1lZXRTdHVkZW50KCkge1xuICAgICAgICBjb25zb2xlLmxvZygnVE9ETzogcmVkaXJlY3QgdXJsJylcbiAgICB9XG5cbiAgICBvcGVuU2hpcG1lbnRIaXN0b3J5KCkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ09wZW5pbmcuLi4nKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuXG4gICAgICAgICAgICBsZXQgb3B0ID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRNb2RhbE9wdGlvbnMoeyBwcm9qZWN0SWQ6IHRoaXMucHJvamVjdElkIH0sIGZhbHNlKVxuXG4gICAgICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChTaGlwbWVudEhpc3RvcnlDb21wb25lbnQsIG9wdCkudGhlbihyZXMgPT4gY29uc29sZS5sb2cocmVzKSlcbiAgICAgICAgfSwgMTUwMClcbiAgICB9XG5cbiAgICBvcGVuVm9sdW50ZWVyc0xpc3QoKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuXG4gICAgICAgIGxldCBvcHQgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldE1vZGFsT3B0aW9ucyh7IHByb2plY3RJZDogdGhpcy5wcm9qZWN0SWQgfSwgZmFsc2UpXG5cbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoVm9sdW50ZWVyc0xpc3RDb21wb25lbnQsIG9wdCkudGhlbihyZXMgPT4gY29uc29sZS5sb2cocmVzKSlcbiAgICB9XG5cbiAgICBvcGVuU29jaWFsRGlhbG9nKCkge1xuICAgICAgICBkaWFsb2dzLmFjdGlvbih7XG4gICAgICAgICAgICBtZXNzYWdlOiBcIkZvbGxvdyB1cyFcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXCJGYWNlYm9va1wiLCBcIlR3aXR0ZXJcIiwgXCJJbnN0YWdyYW1cIiwgXCJZb3V0dWJlXCJdXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIHJlc3VsdDogXCIgKyByZXN1bHQpO1xuICAgICAgICAgICAgaWYocmVzdWx0ID09IFwiRmFjZWJvb2tcIil7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuU29jaWFsKCdmYWNlYm9vaycpXG4gICAgICAgICAgICB9ZWxzZSBpZihyZXN1bHQgPT0gXCJUd2l0dGVyXCIpe1xuICAgICAgICAgICAgICAgIHRoaXMub3BlblNvY2lhbCgndHdpdHRlcicpXG4gICAgICAgICAgICB9ZWxzZSBpZihyZXN1bHQgPT0gXCJJbnN0YWdyYW1cIil7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuU29jaWFsKCdpbnN0YWdyYW0nKVxuICAgICAgICAgICAgfWVsc2UgaWYocmVzdWx0ID09IFwiWW91dHViZVwiKXtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5Tb2NpYWwoJ3lvdXR1YmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVOdW1iZXJzKCkge1xuICAgICAgICBpZighdGhpcy5wcm9ncmVzcy5oYXNPcmRlcmVkQmFuZHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb29wcyEnLCAnUGxlYXNlIG9yZGVyIFl1ZGEgQmFuZHMgZmlyc3QuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1lbHNlIGlmKCF0aGlzLnNoaXBtZW50LmlzRGVsaXZlcmVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb29wcyEnLCAnWW91ciBzaGlwbWVudCBoYXMgbm90IHlldCBiZWVuIGRlbGl2ZXJlZCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlhbG9ncy5wcm9tcHQoe1xuICAgICAgICAgICAgdGl0bGU6IFwiVXBkYXRlIEJhbmRzIFNvbGRcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiUGxlYXNlIHVwZGF0ZSB5b3VyIGJhbmQncyBzb2xkXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiVXBkYXRlXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiLFxuICAgICAgICAgICAgaW5wdXRUeXBlOiBkaWFsb2dzLmlucHV0VHlwZS5udW1iZXJcbiAgICAgICAgfSkudGhlbigocikgPT4ge1xuICAgICAgICAgICAgaWYoci5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ1VwZGF0aW5nLi4uJylcblxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQmFuZHNTb2xkKHBhcnNlSW50KHIudGV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvcGVuU29jaWFsKHR5cGUpIHtcbiAgICAgICAgbGV0IG5hbWUgPSAnJztcblxuICAgICAgICBpZih0eXBlID09PSAnZmFjZWJvb2snKSB7XG4gICAgICAgICAgICBuYW1lID0gJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS95dWRhYmFuZHMnO1xuICAgICAgICB9ZWxzZSBpZih0eXBlID09PSAnaW5zdGFncmFtJykge1xuICAgICAgICAgICAgbmFtZSA9ICdodHRwczovL3d3dy5pbnN0YWdyYW0uY29tL3l1ZGFiYW5kcyc7XG4gICAgICAgIH1lbHNlIGlmKHR5cGUgPT09ICd0d2l0dGVyJykge1xuICAgICAgICAgICAgbmFtZSA9ICdodHRwczovL3R3aXR0ZXIuY29tL3l1ZGFiYW5kcyc7XG4gICAgICAgIH1lbHNlIGlmKHR5cGUgPT09ICd5b3V0dWJlJykge1xuICAgICAgICAgICAgbmFtZSA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS91c2VyL3l1ZGFiYW5kcyc7XG4gICAgICAgIH1cblxuICAgICAgICB1dGlscy5vcGVuVXJsKG5hbWUpXG4gICAgfVxuXG4gICAgZ29Ubyh0eXBlKSB7XG4gICAgICAgIGxldCB1cmwgPSAnJztcblxuICAgICAgICBpZih0eXBlID09PSAndHJpcCcpIHtcbiAgICAgICAgICAgIHVybCA9ICdodHRwOi8vd3d3Lnl1ZGFiYW5kcy5vcmcvdHJpcHMnO1xuICAgICAgICAgICAgdXRpbHMub3BlblVybCh1cmwpXG4gICAgICAgIH1lbHNlIGlmKHR5cGUgPT09ICdyZXZpZXcnKSB7XG4gICAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3BnL3l1ZGFiYW5kcy9yZXZpZXdzLz9yZWY9cGFnZV9pbnRlcm5hbCc7XG4gICAgICAgICAgICB1dGlscy5vcGVuVXJsKHVybClcbiAgICAgICAgfWVsc2UgaWYodHlwZSA9PT0gJ3NoaXJ0Jykge1xuICAgICAgICAgICAgdXJsID0gJ2h0dHBzOi8veXVkYWJhbmRzLm9yZy9zaGlydHMnO1xuICAgICAgICAgICAgdXRpbHMub3BlblVybCh1cmwpXG4gICAgICAgIH1lbHNlIGlmKHR5cGUgPT09ICdyZXNvdXJjZXMnKSB7XG4gICAgICAgICAgICB0aGlzLm5hdk9wdGlvbnMuYW5pbWF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvJyt0eXBlXSwgdGhpcy5uYXZPcHRpb25zKTtcbiAgICAgICAgfWVsc2UgaWYodHlwZSA9PT0gJ21lZGlhJykge1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy8nK3R5cGVdLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgICAgICB9ZWxzZSBpZih0eXBlID09PSAnZmVlZGJhY2snKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5GZWVkYmFja01vZGFsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnb1RvRWRpdFVzZXIoKSB7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucy50cmFuc2l0aW9uLm5hbWUgPSAnc2xpZGVMZWZ0JztcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9lZGl0LXByb2ZpbGUnXSwgdGhpcy5uYXZPcHRpb25zKTtcbiAgICB9XG5cbiAgICB2aWV3UGVuZGluZ0luZm8oKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdJbmZvcm1hdGlvbicsICdZb3VyIHN0dWRlbnQgaXMgbm90IHlldCB2ZXJpZmllZCwgdG8gYmUgYWJsZSB0byBkaXNwbGF5IHlvdXIgcHJvamVjdCBwdWJsaWNseSB5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcHJvamVjdCBtYW5hZ2VyIHRvIGFwcHJvdmUgeW91ciBzdHVkZW50LicpO1xuICAgIH1cblxuICAgIGpvaW5Qcm9qZWN0KCkge1xuICAgICAgICBsZXQgb3B0ID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRNb2RhbE9wdGlvbnMoe1xuICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXG4gICAgICAgICAgICAgICAgcHJvamVjdElkOiB0aGlzLnByb2plY3RJZFxuICAgICAgICAgICAgfSwgZmFsc2UsIGZhbHNlKVxuXG4gICAgICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKEpvaW5Qcm9qZWN0Q29tcG9uZW50LCBvcHQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGlmKHJlcyl7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoXCJJbmZvcm1hdGlvblwiLCBcIllvdSB3aWxsIGJlIG5vdGlmaWVkIG9uY2UgdGhlIHByb2plY3QgbGVhZGVyIGFwcHJvdmVzIHlvdXIgcmVxdWVzdC5cIilcblxuICAgICAgICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc1Byb2plY3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUGVuZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNNZW1iZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdmlld1NoaXBtZW50U3RhdHVzKCkge1xuICAgICAgICBpZih0aGlzLnByb2plY3Quc3RhdHVzID09PSAncmVqZWN0ZWQnKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ1lvdSBjYW5cXCd0IHZpZXcgYSByZWplY3RlZCBwcm9qZWN0IHNoaXBtZW50IHN0YXR1cy4nKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9wdCA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0TW9kYWxPcHRpb25zKHsgcHJvamVjdElkOiB0aGlzLnByb2plY3RJZCB9LCBmYWxzZSwgZmFsc2UpXG5cbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoU2hpcG1lbnRTdGF0dXNJbmZvQ29tcG9uZW50LCBvcHQpLnRoZW4ocmVzID0+IGNvbnNvbGUubG9nKHJlcykpXG4gICAgfVxuXG4gICAgb3BlblNjaGVkdWxlU2t5cGVNb2RhbCgpIHtcbiAgICAgICAgaWYodGhpcy5wcm9qZWN0LnN0YXR1cyA9PT0gJ2RvbmUnKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ1lvdSBjYW5cXCd0IHNjaGVkdWxlIGEgc2t5cGUgY2FsbCBvbiB0aGlzIHByb2plY3QnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCF0aGlzLnByb2plY3QuaGFzU3R1ZGVudCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ1BsZWFzZSBzZWxlY3QgYSBzdHVkZW50IHRvIHNwb25zb3IgYmVmb3JlIHlvdSBjYW4gc2NoZWR1bGUgYSBjYWxsJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIGN1cnJlbnREYXRlLnNldERhdGUoY3VycmVudERhdGUuZ2V0RGF0ZSgpKzQpXG5cbiAgICAgICAgbGV0IG1heERhdGUgPSBuZXcgRGF0ZSh0aGlzLnByb2plY3QuZGF0ZVN0YXJ0KVxuXG4gICAgICAgIG1heERhdGUuc2V0RGF0ZShtYXhEYXRlLmdldERhdGUoKSs0KTtcblxuICAgICAgICBpZihjdXJyZW50RGF0ZSA+IG1heERhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb29wcyEnLCAnWW91IGFyZSBwYXN0IGR1ZSB3aXRoIHRoZSBnaXZlbiBhdmFpbGFibGUgc2t5cGUgY2FsbCBkYXRlcycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNvbnRleHQgPSB7XG4gICAgICAgICAgICBwcm9qZWN0SWQ6IHRoaXMucHJvamVjdC5wcm9qZWN0SWQsXG4gICAgICAgICAgICBzY2hvb2xBZGRyZXNzOiB0aGlzLnByb2plY3Quc2Nob29sQWRkcmVzcyxcbiAgICAgICAgICAgIHVzZXI6IHRoaXMudXNlcixcbiAgICAgICAgICAgIHN0dWRlbnQ6IHRoaXMuc3R1ZGVudCxcbiAgICAgICAgICAgIGRhdGVTdGFydDogdGhpcy5wcm9qZWN0LmRhdGVTdGFydCxcbiAgICAgICAgICAgIGRhdGVFbmQ6IHRoaXMucHJvamVjdC5kYXRlRW5kXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoU2t5cGVTY2hlZENvbXBvbmVudCwgdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRNb2RhbE9wdGlvbnMoY29udGV4dCwgdHJ1ZSkpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MuaGFzU2t5cGVDYWxsID0gcmVzcG9uc2Uuc3VjY2VzcztcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxTY2hlZHVsZS5kZXNlcmlhbGl6ZShyZXNwb25zZS5kYXRhKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uUHJpbnRQcm9maWxlKCkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ09wZW5pbmcuLi4nKVxuXG4gICAgICAgIGlmKHRoaXMuaXNVc2VyUHJvamVjdCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVVc2VyUHJvZ3Jlc3MoJ3ByaW50ZWRTdHVkZW50UHJvZmlsZScsIHsgcHJpbnRTdHVkZW50UHJvZmlsZTogJ2RvbmUnIH0pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgIG9wZW5VcmwoYCR7dGhpcy5fY29uZmlnU2VydmljZS5nZXRXZWJCYXNlVXJsKCl9L3ZpZXctc3R1ZGVudC8ke3RoaXMuc3R1ZGVudC5zdHVkZW50SWR9YClcbiAgICAgICAgICAgIH0sIDgwMClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICByZXBvcnQoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tIYXNSZXBvcnQoKTtcbiAgICB9XG5cbiAgICBzdGFydFByb2plY3QoKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3N0YXJ0LXByb2plY3RcIl0sIHRoaXMubmF2T3B0aW9ucyk7IFxuICAgIH1cblxuICAgIHJvdXRlVG9TdGFydFByb2plY3QoKSB7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucy5hbmltYXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucy5jbGVhckhpc3RvcnkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvc3RhcnQtcHJvamVjdFwiXSwgdGhpcy5uYXZPcHRpb25zKTtcbiAgICB9XG5cbiAgICBvbkVkaXRQcm9qZWN0KCkge1xuICAgICAgICBpZih0aGlzLnByb2plY3Quc3RhdHVzID09PSAncmVqZWN0ZWQnKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ1lvdSBjYW5cXCd0IGVkaXQgYSByZWplY3RlZCBwcm9qZWN0LicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLnByb2plY3Quc3RhdHVzID09PSAnZG9uZScpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb29wcyEnLCAnWW91IGNhblxcJ3QgZWRpdCBhIHByb2plY3Qgd2hlbiBpdFxcJ3MgZG9uZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uYXZPcHRpb25zLnRyYW5zaXRpb24ubmFtZSA9IFwiXCI7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucy50cmFuc2l0aW9uLmN1cnZlID0gXCJcIjtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zLnRyYW5zaXRpb24uZHVyYXRpb24gPSAwO1xuXG4gICAgICAgIHRoaXMubmF2T3B0aW9ucy5xdWVyeVBhcmFtcyA9IHtcbiAgICAgICAgICAgIHByb2plY3RJZDogdGhpcy5wcm9qZWN0LnByb2plY3RJZFxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvZWRpdC1wcm9qZWN0XCJdLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgIH1cblxuICAgIG9wZW5Qcm9qZWN0TWFuYWdlckluZm9Nb2RhbCgpIHtcblxuICAgICAgICBsZXQgb3B0ID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRNb2RhbE9wdGlvbnMoeyB1c2VySWQ6IHRoaXMucHJvamVjdC5tYW5hZ2VyLnVzZXJJZCB9LCB0cnVlKVxuXG4gICAgICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKFByb2plY3RNYW5hZ2VySW5mb0NvbXBvbmVudCwgb3B0KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9wZW5Qcm9qZWN0KGRhdGEpIHtcbiAgICAgICAgaWYoZGF0YS5zdHVkZW50SWQgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubmF2T3B0aW9ucy5xdWVyeVBhcmFtcyA9IHsgcHJvamVjdElkOiBkYXRhLnByb2plY3RJZCB9O1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9wcm9qZWN0LWFwcHJvdmVkJ10sIHRoaXMubmF2T3B0aW9ucyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5uYXZPcHRpb25zLnRyYW5zaXRpb24ubmFtZSA9ICdzbGlkZUxlZnQnO1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9wcm9qZWN0JywgZGF0YS5wcm9qZWN0SWRdLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlbkZlZWRiYWNrTW9kYWwoKSB7XG4gICAgICAgIGlmKHRoaXMuZmluYWxQcm9ncmVzcy5oYXNGZWVkYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vb3BzIScsICdZb3UgYWxyZWFkeSBzdWJtaXR0ZWQgYSBmZWVkYmFjaycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9wdCA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0TW9kYWxPcHRpb25zKHsgcHJvamVjdElkOiB0aGlzLnByb2plY3QucHJvamVjdElkIH0sIHRydWUpXG5cbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoRmVlZGJhY2tDb21wb25lbnQsIG9wdCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBpZihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignUmVmcmVzaGluZy4uLicpXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQcm9qZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb3JkZXJCYW5kcygpIHtcbiAgICAgICAgbGV0IG9wdCA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0TW9kYWxPcHRpb25zKHsgXG4gICAgICAgICAgICAgICAgcHJvamVjdElkOiB0aGlzLnByb2plY3RJZCxcbiAgICAgICAgICAgICAgICBkYXRlU3RhcnQ6IHRoaXMucHJvamVjdC5kYXRlU3RhcnRcbiAgICAgICAgICAgIH0sIHRydWUpXG4gICAgICAgIFxuICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChPcmRlckJhbmRzQ29tcG9uZW50LCBvcHQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdElkID0gcmVzcG9uc2UucHJvamVjdElkO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignUmVmcmVzaGluZy4uLicpXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQcm9qZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb3BlblNlbGVjdFN0dWRlbnRQYWdlKCkge1xuICAgICAgICBsZXQgb3B0ID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRNb2RhbE9wdGlvbnMoeyBcbiAgICAgICAgICAgICAgICBwcm9qZWN0SWQ6IHRoaXMucHJvamVjdElkLFxuICAgICAgICAgICAgICAgIGRhdGVTdGFydDogdGhpcy5wcm9qZWN0LmRhdGVTdGFydFxuICAgICAgICAgICAgfSwgdHJ1ZSlcblxuICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChTZWxlY3RTdHVkZW50Q29tcG9uZW50LCBvcHQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdElkID0gcmVzcG9uc2UucHJvamVjdElkO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignUmVmcmVzaGluZy4uLicpXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQcm9qZWN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdGVkVGFiSXRlbUNoYW5nZSgyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNob3dDb25maXJtKG1lc3NhZ2UpIHtcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk9vb3Bwc3MhXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkNyZWF0ZVwiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcbiAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgaWYocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZVRvU3RhcnRQcm9qZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbmZpcm1TaGlwbWVudEl0ZW0oKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignTG9hZGluZy4uLicpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYoIXRoaXMuY29uZmlybVNoaXBtZW50LmJhbmRzUmVjZWl2ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ0FsbCBmaWVsZHMgYXJlIHJlcXVpcmVkJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCA4MDApXG4gICAgfVxuXG4gICAgZ2V0TWFuYWdlclByb2ZpbGUodXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldFByb2plY3RNYW5hZ2VQcm9maWxlKHVybCk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0UHJvamVjdCgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9wcm9qZWN0U2VydmljZS5nZXRQcm9qZWN0KHRoaXMucHJvamVjdElkKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG5cbiAgICAgICAgICAgIGlmKHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0LmRlc2VyaWFsaXplKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXIuZGVzZXJpYWxpemUocmVzLmRhdGEudXNlcklkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0dWRlbnQuZGVzZXJpYWxpemUocmVzLmRhdGEuc3R1ZGVudElkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxTY2hlZHVsZS5kZXNlcmlhbGl6ZShyZXMuZGF0YS5zY2hlZHVsZXNbMF0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1VzZXJDdXJyZW50UHJvamVjdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oYXNTY2hlZHVsZWROb3RpZihyZXMuZGF0YS5wcm9qZWN0SWQpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChoYXNOb3RpZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWhhc05vdGlmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zY2hlZHVsZU5vdGlmaWNhdGlvbihyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvSWQgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldFlvdXR1YmVJZCh0aGlzLnN0dWRlbnQudmlkZW9MaW5rKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdC5pbWFnZVVybCAgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldEltYWdlQ292ZXIodGhpcy5wcm9qZWN0LmltYWdlVXJsKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnVzZXIuaW1hZ2VVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyLmltYWdlVXJsID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRJbWFnZVByb2ZpbGUodGhpcy51c2VyLmltYWdlVXJsKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLnN0dWRlbnQuaW1hZ2VVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50LmltYWdlVXJsID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRJbWFnZVByb2ZpbGUodGhpcy5zdHVkZW50LmltYWdlVXJsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50Q292ZXJJbWFnZSA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0SW1hZ2VDb3Zlcih0aGlzLnN0dWRlbnQuaW1hZ2VVcmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9IFxuXG4gICAgYXN5bmMgZ2V0UHJvamVjdFByb2dyZXNzKHByb2plY3RJZCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fcHJvamVjdFNlcnZpY2UuZ2V0UHJvZ3Jlc3MocHJvamVjdElkKTtcblxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5oYXNTdHVkZW50ID0gcmVzLmhhc1N0dWRlbnQ7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLmhhc09yZGVyZWRCYW5kcyA9IHJlcy5oYXNPcmRlcmVkQmFuZHM7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLmhhc1NreXBlQ2FsbCA9IHJlcy5oYXNTa3lwZUNhbGw7XG5cbiAgICAgICAgICAgIHRoaXMuZ2V0VXNlclByb2dyZXNzKCk7XG4gICAgICAgICAgICB0aGlzLmdldFByb2plY3RGaW5hbFByb2dyZXNzKCk7XG5cbiAgICAgICAgfWNhdGNoKGUpIHsgY29uc29sZS5sb2coZSkgfVxuICAgIH1cblxuICAgIGFzeW5jIGdldFVzZXJQcm9ncmVzcygpIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3VzZXJQcm9ncmVzc1NlcnZpY2UuZ2V0UHJvZ3Jlc3ModGhpcy51c2VySWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihyZXMuZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlclByb2dyZXNzLmRlc2VyaWFsaXplKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLndhdGNoVmlkZW9zID0gdGhpcy51c2VyUHJvZ3Jlc3MuZ2V0UHJvZ3Jlc3MoKS53YXRjaFZpZGVvcztcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByaW50ZWRTdHVkZW50UHJvZmlsZSA9IHRoaXMudXNlclByb2dyZXNzLmdldFByb2dyZXNzKCkucHJpbnRlZFN0dWRlbnRQcm9maWxlO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MuaGFzU2hhcmVkVmlkZW9zID0gdGhpcy51c2VyUHJvZ3Jlc3MuZ2V0UHJvZ3Jlc3MoKS5oYXNTaGFyZWRWaWRlb3M7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5oYXNPcmRlcmVkU2hpcnRzID0gdGhpcy51c2VyUHJvZ3Jlc3MuZ2V0UHJvZ3Jlc3MoKS5oYXNPcmRlcmVkU2hpcnRzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1jYXRjaChlKSB7IGNvbnNvbGUubG9nKGUpIH1cbiAgICB9XG5cbiAgICBhc3luYyBnZXRQcm9qZWN0RmluYWxQcm9ncmVzcygpIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3Byb2plY3RQcm9ncmVzc1NlcnZpY2UuZ2V0UHJvZ3Jlc3ModGhpcy51c2VySWQsIHRoaXMucHJvamVjdElkKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5maW5hbFByb2dyZXNzID0gcmVzO1xuXG4gICAgICAgIH1jYXRjaChlKSB7IGNvbnNvbGUubG9nKGUpIH1cbiAgICB9XG5cbiAgICBhc3luYyBnZXRDdXJyZW50U2hpcG1lbnQoKSB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9zaGlwbWVudFNlcnZpY2UuZ2V0Q3VycmVudFNoaXBtZW50KHRoaXMucHJvamVjdElkKTtcblxuICAgICAgICAgICAgaWYocmVzLmRhdGEpIHRoaXMuc2hpcG1lbnQuZGVzZXJpYWxpemUocmVzLmRhdGEpXG5cbiAgICAgICAgfWNhdGNoKGUpIHsgY29uc29sZS5sb2coZSkgfVxuICAgIH1cblxuICAgIGFzeW5jIGNoZWNrVXNlckN1cnJlbnRQcm9qZWN0KCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fdXNlclByb2plY3RTZXJ2aWNlLmNoZWNrVXNlckN1cnJlbnRQcm9qZWN0KHRoaXMudXNlcklkKTtcblxuICAgICAgICAgICAgaWYocmVzLmhhc1Byb2plY3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhc1Byb2plY3QgPSByZXMuaGFzUHJvamVjdDtcbiAgICAgICAgICAgICAgICBpZihyZXMucHJvamVjdC5wcm9qZWN0SWQgPT09IHRoaXMucHJvamVjdElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNVc2VyUHJvamVjdCA9IChyZXMuaXNMZWFkZXIgJiYgIXJlcy5pc01lbWJlcik/IHJlcy5pc0xlYWRlciA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTWVtYmVyICAgICAgPSAoIXJlcy5pc0xlYWRlciAmJiByZXMuaXNNZW1iZXIpPyByZXMuaXNNZW1iZXIgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1BlbmRpbmcgICAgID0gKCFyZXMuaXNMZWFkZXIgJiYgcmVzLmlzTWVtYmVyICYmICFyZXMubWVtYmVyQ29uZmlnLmlzQXBwcm92ZWQpPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFByb2plY3RQcm9ncmVzcyh0aGlzLnByb2plY3RJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1jYXRjaChlKSB7IGNvbnNvbGUubG9nKGUpIH1cbiAgICB9XG5cbiAgICBhc3luYyBjaGVja0hhc1JlcG9ydCgpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdMb2FkaW5nLi4uJyk7XG5cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3Byb2plY3RSZXBvcnRTZXJ2aWNlLmNoZWNrSGFzUmVwb3J0KHRoaXMucHJvamVjdElkLCB0aGlzLnVzZXJJZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgaWYocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZighcmVzLmhhc1JlcG9ydCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdk9wdGlvbnMucXVlcnlQYXJhbXMgPSB7IHByb2plY3RJZDogdGhpcy5wcm9qZWN0SWQgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9wcm9qZWN0LXJlcG9ydCddLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ1lvdSBhbHJlYWR5IG1hZGUgYSByZXBvcnQgZm9yIHRoaXMgcHJvamVjdC4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vb3BzIScsIHJlcy5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGVVc2VyUHJvZ3Jlc3ModHlwZSwgZGF0YSwgaXNEb25lID0gdHJ1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3VzZXJQcm9ncmVzc1NlcnZpY2UudXBkYXRlUHJvZ3Jlc3ModGhpcy51c2VySWQsIGRhdGEpO1xuXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NbdHlwZV0gPSBpc0RvbmU7IFxuXG4gICAgICAgICAgICBpZih0eXBlID09PSAncHJpbnRlZFN0dWRlbnRQcm9maWxlJykgb3BlblVybChgJHt0aGlzLl9jb25maWdTZXJ2aWNlLmdldFdlYkJhc2VVcmwoKX0vdmlldy1zdHVkZW50LyR7dGhpcy5zdHVkZW50LnN0dWRlbnRJZH1gKVxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgaWYodHlwZSA9PT0gJ3ByaW50ZWRTdHVkZW50UHJvZmlsZScpIG9wZW5VcmwoYCR7dGhpcy5fY29uZmlnU2VydmljZS5nZXRXZWJCYXNlVXJsKCl9L3ZpZXctc3R1ZGVudC8ke3RoaXMuc3R1ZGVudC5zdHVkZW50SWR9YClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHVwZGF0ZVByb2plY3RGaW5hbFByb2dyZXNzKHR5cGUsIGRhdGEsIGlzRG9uZSA9IHRydWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9wcm9qZWN0UHJvZ3Jlc3NTZXJ2aWNlLnVwZGF0ZVByb2dyZXNzKHRoaXMucHJvamVjdElkLCBkYXRhKTtcblxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZJTkFMIFBST0dSRVNTOiBcIit0eXBlKVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCT09MRUFOOiBcIitpc0RvbmUpXG4gICAgICAgICAgICB0aGlzLmZpbmFsUHJvZ3Jlc3NbdHlwZV0gPSBpc0RvbmU7IFxuXG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGVCYW5kc1NvbGQobmV3TnVtYmVyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fcHJvamVjdFNlcnZpY2UudXBkYXRlUHJvamVjdCh0aGlzLnByb2plY3RJZCwgeyBiYW5kc1NvbGQ6IG5ld051bWJlciB9KTtcblxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICBpZihyZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdC5iYW5kc1NvbGQgPSBuZXdOdW1iZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93U3VjY2Vzc0ZlZWRiYWNrKCdTdWNjZXNzIScsICdUb3RhbCBiYW5kcyBzb2xkIHN1Y2Nlc3NmdWxseSB1cGRhdGVkIScpXG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93RXJyb3JGZWVkYmFjaygnT29wcyEnLCAnVW5hYmxlIHRvIHVwZGF0ZSB5b3VyIHRvdGFsIHNvbGQgYmFuZHMnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dFcnJvckZlZWRiYWNrKCdPb3BzIScsICdVbmFibGUgdG8gdXBkYXRlIHlvdXIgdG90YWwgc29sZCBiYW5kcycpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBjb25maXJtKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3NoaXBtZW50U2VydmljZS5jb25maXJtKHRoaXMuc2hpcG1lbnQuc2hpcG1lbnRJZCwgdGhpcy5jb25maXJtU2hpcG1lbnQpO1xuXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcblxuICAgICAgICAgICAgaWYocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEN1cnJlbnRTaGlwbWVudCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdTdWNjZXNzIScsICdOdW1iZXIgb2YgQmFuZHMgY29uZmlybWVkLiBZb3UgY2FuIG5vdyBzdGFydCB3aXRoIHlvdXIgcHJvamVjdC4gR29vZGx1Y2shJylcblxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb29wcyEnLCAnVW5hYmxlIHRvIGNvbmZpcm0gYmFuZHMuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb29wcyEnLCAnVW5hYmxlIHRvIGNvbmZpcm0gYmFuZHMuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=