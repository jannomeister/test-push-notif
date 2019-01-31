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
var page_1 = require("tns-core-modules/ui/page");
var router_2 = require("nativescript-angular/router");
var angular_1 = require("nativescript-ui-autocomplete/angular");
var reference_list_component_1 = require("../../view/reference-list/reference-list.component");
var search_address_modal_component_1 = require("../../view/search-address-modal/search-address-modal.component");
var projectmanager_info_page_component_1 = require("../../view/projectmanager-info-page/projectmanager-info-page.component");
// MODELS
var user_model_1 = require("../../models/user.model");
var project_model_1 = require("../../models/project.model");
// SERVICES
var user_service_1 = require("../../services/user.service");
var config_service_1 = require("../../services/config.service");
var project_service_1 = require("../../services/project.service");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var component_event_service_1 = require("../../services/component-event.service");
// OTHERS
var dialogs = require("ui/dialogs");
var moment = require("moment");
var utils_1 = require("utils/utils");
var platform_1 = require("platform");
var utils = require("utils/utils");
var StartProjectComponent = /** @class */ (function () {
    function StartProjectComponent(page, _ngZone, vcRef, _activatedRoute, _routerExtensions, modal, _userService, _projectService, _configService, _componentService) {
        var _this = this;
        this.page = page;
        this._ngZone = _ngZone;
        this.vcRef = vcRef;
        this._activatedRoute = _activatedRoute;
        this._routerExtensions = _routerExtensions;
        this.modal = modal;
        this._userService = _userService;
        this._projectService = _projectService;
        this._configService = _configService;
        this._componentService = _componentService;
        // CURRENT DATES
        this.date = new Date();
        this.currentMonth = this.date.getMonth();
        this.currentYear = this.date.getFullYear();
        // PROGRESS VARIABLES
        this.formattedDateEnd = '';
        this.buttonText = 'Next';
        this.progressValue = 1;
        this.step = 1;
        // END OF PROGRESS VARIABLES
        // DROPDOWN CHOICES
        this.schoolClubTypes = [];
        this.affiliationTypes = [];
        this.affiliationStudentTypes = [];
        this.affiliationTeacherTypes = [];
        this.heardFromLists = [];
        this.days = [];
        this.years = [];
        this.months = [
            'January', 'February', 'March',
            'April', 'May', 'June', 'July',
            'August', 'September', 'October',
            'November', 'December'
        ];
        // END OF DROPDOWN CHOICES
        // DROPDOWN SELECTED VALUE
        this.affiliationSelected = 1;
        this.affiliationTypeSelected = 0;
        this.schoolClubSelected = 0;
        this.heardFromSelected = 0;
        this.monthSelected = 0;
        this.daySelected = 0;
        this.yearSelected = 0;
        // END OF DROPDOWN SELECTED VALUE
        // DROPDOWN BOOLEANS
        this.isStudentSelected = true;
        this.isSchoolClubOtherSelected = false;
        this.isHeardFromOtherSelected = false;
        this.isHeardFromConventionSelected = false;
        // END OF DROPDOWN BOOLEANS
        // ACTIVITY INDICATORS
        // isTeacherDataLoading: boolean = false;
        // END OF ACTIVITY INDICATORS
        this.isSubmitted = false;
        this.isChecked = false;
        this.hasValidSchoolAddress = false;
        page.actionBarHidden = true;
        this.user = new user_model_1.User();
        this.project = new project_model_1.Project();
        this.navOptions = this._componentService.getRouteOptions();
        this._activatedRoute.queryParams.subscribe(function (params) {
            _this.routeName = params['route'];
        });
        this.initYear();
        setTimeout(function () {
            _this.initMonth();
        }, 800);
    }
    StartProjectComponent.prototype.ngOnInit = function () {
        this.initDropdownDatas();
        this.initProject();
        this.initSchoolClub();
        this.initAffiliationType();
        this.initAffiliation();
        this.initHeardFrom();
        this.getUserData();
        this.setProgressbarWidth(10);
    };
    StartProjectComponent.prototype.setProgressbarWidth = function (percent) {
        this.columns = percent + "*," + (100 - percent) + "*";
    };
    StartProjectComponent.prototype.initMonth = function () {
        var date = new Date();
        // let nextMonth = (date.getDate() === 1)? date.getMonth() : date.getMonth()+1;
        this.monthSelected = this.currentMonth;
        var currentMonth = this.currentMonth;
        this.getMondays(currentMonth + 1, date.getFullYear());
    };
    StartProjectComponent.prototype.initYear = function () {
        var currYear = new Date().getFullYear();
        var limitYear = currYear + 15;
        while (currYear <= limitYear) {
            this.years.push(currYear);
            currYear++;
        }
    };
    StartProjectComponent.prototype.initDropdownDatas = function () {
        this.schoolClubTypes = this.project.getSchoolClub();
        this.affiliationTypes = ['Student', 'Teacher'];
        this.affiliationStudentTypes = this.project.getAffiliation('student');
        this.affiliationTeacherTypes = this.project.getAffiliation('teacher');
        this.heardFromLists = this.project.getHeardFrom();
    };
    StartProjectComponent.prototype.initProject = function () {
        var cd = this._userService.getStartProjectData();
        this.project.deserialize({
            userId: 0,
            studentId: 0,
            email: null,
            phoneNumber: (cd.phoneNumber) ? cd.phoneNumber : null,
            schoolName: (cd.schoolName) ? cd.schoolName : null,
            userSchoolAffiliation: (cd.userSchoolAffiliation) ? cd.userSchoolAffiliation : this.affiliationTypes[0],
            userSchoolAffiliationType: (cd.userSchoolAffiliationType) ? cd.userSchoolAffiliationType : this.affiliationStudentTypes[0],
            clubSponsor: (cd.clubSponsor) ? cd.clubSponsor : this.schoolClubTypes[0],
            teacherName: (cd.teacherName) ? cd.teacherName : '',
            teacherEmail: (cd.teacherEmail) ? cd.teacherEmail : '',
            schoolAddress: (cd.schoolAddress) ? cd.schoolAddress : '',
            schoolEnrollees: (cd.schoolEnrollees) ? cd.schoolEnrollees : null,
            dateStart: (cd.dateStart) ? cd.dateStart : '',
            dateEnd: (cd.dateEnd) ? cd.dateEnd : '',
            heardFrom: (cd.heardFrom) ? cd.heardFrom : this.heardFromLists[0]
        });
        this.saveToCache();
    };
    StartProjectComponent.prototype.saveToCache = function () {
        this._userService.saveStartProjectData(this.project);
    };
    StartProjectComponent.prototype.modelChange = function (data, type) {
        this.project[type] = data;
        this.saveToCache();
    };
    StartProjectComponent.prototype.open = function (url) {
        utils_1.openUrl(url);
    };
    StartProjectComponent.prototype.openModal = function () {
        var _this = this;
        var opt = {
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true
        };
        this.modal.showModal(reference_list_component_1.ReferenceListComponent, opt).then(function (res) {
            if (res.hasData) {
                _this.isHeardFromConventionSelected = true;
                _this.project.heardFrom = res.data;
            }
            else {
                _this.isHeardFromOtherSelected = true;
                _this.isHeardFromConventionSelected = false;
                _this.project.heardFrom = null;
                _this.heardFromSelected = _this.heardFromLists.length - 1;
            }
            _this.saveToCache();
        });
    };
    StartProjectComponent.prototype.searchAddress = function () {
        var _this = this;
        var opt = {
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true
        };
        this.modal.showModal(search_address_modal_component_1.SearchAddressModalComponent, opt).then(function (res) {
            if (res.success) {
                _this.project.schoolAddress = res.data;
                _this.saveToCache();
            }
        });
    };
    /** PROGRESS CONFIG **/
    StartProjectComponent.prototype.progressBarLoaded = function (args) {
        var progressBar = args.object;
        progressBar.value = this.step;
        progressBar.maxValue = 5;
    };
    StartProjectComponent.prototype.progressValueChanged = function (args) {
        var progressBar = args.object;
    };
    /** END OF PROGRESS CONFIG **/
    /** DROPDOWN CONFIG **/
    StartProjectComponent.prototype.initSchoolClub = function () {
        this.schoolClubSelected = this.schoolClubTypes.indexOf(this.project.clubSponsor);
    };
    StartProjectComponent.prototype.initAffiliationType = function () {
        this.affiliationSelected = this.affiliationTypes.indexOf(this.project.userSchoolAffiliation);
        this.isStudentSelected = (this.affiliationSelected > 0) ? false : true;
    };
    StartProjectComponent.prototype.initAffiliation = function () {
        if (this.affiliationSelected == 0) {
            this.affiliationTypeSelected = this.affiliationStudentTypes.indexOf(this.project.userSchoolAffiliationType);
        }
        else if (this.affiliationSelected == 1) {
            this.affiliationTypeSelected = this.affiliationTeacherTypes.indexOf(this.project.userSchoolAffiliationType);
        }
    };
    StartProjectComponent.prototype.initHeardFrom = function () {
        this.heardFromSelected = this.heardFromLists.indexOf(this.project.heardFrom);
    };
    StartProjectComponent.prototype.onDropdownChanged = function (args, field) {
        if (field === 'affiliation') {
            if (args.newIndex === 1)
                this.project.clearTeacher();
            this.project.userSchoolAffiliation = this.affiliationTypes[args.newIndex];
            this.project.userSchoolAffiliationType = (args.newIndex === 1) ? this.affiliationTeacherTypes[0] : this.affiliationStudentTypes[0];
            this.affiliationTypeSelected = 0;
        }
        else if (field === 'affiliation-type') {
            this.project.userSchoolAffiliationType = (this.affiliationSelected === 1) ? this.affiliationTeacherTypes[args.newIndex] : this.affiliationStudentTypes[args.newIndex];
        }
        else if (field === 'heard-from') {
            var arrLength = this.heardFromLists.length - 1;
            if (args.newIndex === arrLength) {
                this.isHeardFromOtherSelected = true;
            }
            else {
                this.isHeardFromOtherSelected = false;
                this.project.heardFrom = this.heardFromLists[args.newIndex];
            }
        }
        else if (field === 'school-club') {
            var arrLength = this.schoolClubTypes.length - 1;
            if (args.newIndex === arrLength) {
                this.isSchoolClubOtherSelected = true;
            }
            else {
                this.isSchoolClubOtherSelected = false;
                this.project.clubSponsor = this.schoolClubTypes[args.newIndex];
            }
        }
        this.saveToCache();
    };
    StartProjectComponent.prototype.onDropdownClose = function (field) {
        var _this = this;
        setTimeout(function () {
            if (field === 'affiliation') {
                _this.isStudentSelected = (_this.affiliationSelected > 0) ? false : true;
            }
            else if (field === 'school-club') {
                var arrLength = _this.schoolClubTypes.length - 1;
                if (_this.schoolClubSelected === arrLength) {
                    _this.project.clubSponsor = null;
                    _this.isSchoolClubOtherSelected = true;
                }
                else {
                    _this.project.clubSponsor = _this.schoolClubTypes[_this.schoolClubSelected];
                    _this.isSchoolClubOtherSelected = false;
                }
            }
            else if (field === 'heard-from') {
                var arrLength = _this.heardFromLists.length;
                var ifOther = arrLength - 1;
                var ifConventions = arrLength - 2;
                if (_this.heardFromSelected === ifOther) {
                    _this.project.heardFrom = null;
                    _this.isHeardFromOtherSelected = true;
                    _this.isHeardFromConventionSelected = false;
                }
                else if (_this.heardFromSelected === ifConventions) {
                    _this._componentService.showLoader('Opening...');
                    setTimeout(function () {
                        _this._componentService.hideLoader();
                        _this.openModal();
                    }, 500);
                }
                else {
                    _this.project.heardFrom = _this.heardFromLists[_this.heardFromSelected];
                    _this.isHeardFromOtherSelected = false;
                    _this.isHeardFromConventionSelected = false;
                }
            }
            _this.saveToCache();
        }, 400);
    };
    /** END OF DROPDOWN CONFIG **/
    /** CHECKBOX CONFIG **/
    StartProjectComponent.prototype.checkedBoxChanged = function (checkbx) {
        this.isChecked = checkbx.checked;
    };
    /** END OF CHECKBOX CONFIG **/
    /** DATE CONFIGS (PAGE FOUR) **/
    StartProjectComponent.prototype.onChangeMonth = function (event) {
        var selectedMonth = event.newIndex;
        this.configureDate(selectedMonth, this.currentMonth);
    };
    StartProjectComponent.prototype.onChangeDay = function (event) {
        this.daySelected = event.newIndex;
        this.validateDate();
    };
    StartProjectComponent.prototype.onChangeYear = function (event) {
        this.yearSelected = event.newIndex;
        this.configureDate(this.monthSelected, this.currentMonth);
    };
    StartProjectComponent.prototype.configureDate = function (selectedMonth, currentMonth) {
        var _this = this;
        var selectedYear = this.years[this.yearSelected];
        var isCurrentYear = (this.currentYear === selectedYear) ? true : false;
        if (isCurrentYear) {
            if (selectedMonth < currentMonth) {
                setTimeout(function () {
                    _this.monthSelected = currentMonth;
                    setTimeout(function () {
                        _this.getMondays(currentMonth + 1, selectedYear);
                    }, 500);
                }, 100);
            }
            else {
                setTimeout(function () {
                    _this.getMondays(selectedMonth + 1, selectedYear);
                }, 100);
            }
        }
        else {
            setTimeout(function () {
                _this.getMondays(selectedMonth + 1, selectedYear);
            }, 100);
        }
    };
    StartProjectComponent.prototype.validateDate = function () {
        var start = this.project.formatProjectDurationDate(this.monthSelected, this.days[this.daySelected], this.years[this.yearSelected], 'start');
        var end = this.project.formatProjectDurationDate(this.monthSelected, this.days[this.daySelected], this.years[this.yearSelected], 'end');
        this.project.dateStart = start.date;
        this.project.dateEnd = end.date;
        this.formattedDateEnd = end.formatted;
        this.saveToCache();
    };
    StartProjectComponent.prototype.getMondays = function (month, year) {
        var _this = this;
        console.log("month: " + month);
        console.log("year: " + year);
        this.days = [];
        var dayArr = [];
        var currDate = new Date();
        var currMonth = currDate.getMonth() + 1;
        var currYear = currDate.getFullYear();
        var isCurrMonth = (currMonth === month) ? true : false;
        /* let isAfterCurrMonth = (currMonth+1 === month)? true : false; */
        var isCurrYear = (currYear === year) ? true : false;
        var currDay = (isCurrMonth) ? currDate.getDate() : 1;
        var selectedDate = new Date(year + "/" + month + "/" + currDay);
        if ((isCurrMonth) && isCurrYear) {
            selectedDate.setDate(selectedDate.getDate() + 14);
        }
        while (selectedDate.getDay() !== 1) {
            selectedDate.setDate(selectedDate.getDate() + 1);
        }
        var days = moment(selectedDate).daysInMonth();
        var currentDay = selectedDate.getDate();
        while (currentDay <= days) {
            var tempYear = selectedDate.getFullYear();
            var tempMonth = selectedDate.getMonth() + 1;
            var date = new Date(tempYear + "/" + tempMonth + "/" + currentDay);
            if (date.getDay() === 1) {
                dayArr.push(date.getDate());
            }
            currentDay++;
        }
        setTimeout(function () {
            _this.days = dayArr;
            _this.daySelected = 0;
            _this.monthSelected = selectedDate.getMonth();
            _this.yearSelected = _this.years.indexOf(selectedDate.getFullYear());
            _this.validateDate();
        }, 100);
    };
    /** END OF DATE CONFIGS (PAGE FOUR) **/
    StartProjectComponent.prototype.next = function () {
        this.validatePage();
        // this.incrementStep();
    };
    StartProjectComponent.prototype.validatePage = function () {
        if (this.step == 1) {
            if (!this.project.isStepClean(this.step)) {
                this._componentService.showAlert('Ooops!', 'All Fields are required');
            }
            else if (!this.user.getFullName()) {
                this._componentService.showAlert('Ooops!', 'Name is required! You can update your name by going to settings > Edit Profile Info.');
            }
            else if (!this._componentService.validateEmail(this.project.email)) {
                this._componentService.showAlert('Ooops!', 'Invalid Email Address');
            }
            else if (!this._componentService.validatePhoneNumber(this.project.phoneNumber)) {
                this._componentService.showAlert('Ooops!', 'Invalid Phone number');
            }
            else {
                if (platform_1.isIOS) {
                    utils.ios.getter(UIApplication, UIApplication.sharedApplication)
                        .keyWindow
                        .endEditing(true);
                }
                this.incrementStep();
                this.saveToCache();
            }
        }
        else if (this.step === 2) {
            if (!this.project.isStepClean(this.step)) {
                this._componentService.showAlert('Ooops!', 'All Fields are required');
            }
            else {
                if (platform_1.isIOS) {
                    utils.ios.getter(UIApplication, UIApplication.sharedApplication)
                        .keyWindow
                        .endEditing(true);
                }
                this.incrementStep();
                this.saveToCache();
            }
        }
        else if (this.step === 3) {
            if ((this.affiliationSelected === 0) && (!this.project.isStepClean(this.step))) {
                this._componentService.showAlert('Ooops!', 'Teacher\'s name and email are required');
            }
            else if ((this.affiliationSelected === 0) && !this._componentService.validateEmail(this.project.teacherEmail)) {
                this._componentService.showAlert('Ooops!', 'Invalid Email Address');
            }
            else {
                if (platform_1.isIOS) {
                    utils.ios.getter(UIApplication, UIApplication.sharedApplication)
                        .keyWindow
                        .endEditing(true);
                }
                this.incrementStep();
                this.saveToCache();
            }
        }
        else if (this.step === 4) {
            this.incrementStep();
            this.buttonText = 'Submit';
        }
        else if (this.step === 5) {
            if (!this.project.isStepClean(this.step)) {
                this._componentService.showAlert('Ooops!', 'All Fields are required');
            }
            else if (!this.isChecked) {
                this._componentService.showAlert('Ooops!', 'Are you allowed by your school?');
            }
            else {
                this.add();
            }
        }
    };
    StartProjectComponent.prototype.incrementStep = function () {
        this.progressValue += 1;
        this.step += 1;
    };
    StartProjectComponent.prototype.add = function () {
        this._componentService.showLoader('Submitting...');
        this.createProject();
    };
    StartProjectComponent.prototype.onClose = function () {
        this._routerExtensions.back();
        // this.navOptions.clearHistory = true;
        // this.navOptions.transition.name = 'slideRight';
        // this._routerExtensions.navigate(['/dashboard'], this.navOptions);
    };
    StartProjectComponent.prototype.goTo = function () {
        if (this.routeName === 'tabs') {
            this.navOptions.clearHistory = true;
            this.navOptions.transition.name = 'slideLeft';
            this._routerExtensions.navigate(['/resources'], this.navOptions);
        }
        else if (this.routeName === 'start') {
            this.navOptions.clearHistory = true;
            this.navOptions.transition.name = 'slideLeft';
            this._routerExtensions.navigate(['/resources'], this.navOptions);
        }
        else {
            this._routerExtensions.back();
        }
    };
    StartProjectComponent.prototype.help = function () {
        var _this = this;
        var userId = this._userService.getCurrentUserId();
        dialogs.action({
            message: "Need Help?",
            cancelButtonText: "Cancel",
            actions: ["Contact Yuda Bands representative now", "Visit FAQ Page"]
        }).then(function (result) {
            if (result === "Visit FAQ Page") {
                utils_1.openUrl("http://www.yudabands.org/faqs/");
            }
            else if (result === "Contact Yuda Bands representative now") {
                // this.navOptions.transition.curve = 'linear';
                // this.navOptions.queryParams = { userId: 1 };
                // this._routerExtensions.navigate(['/project-manager-info'], this.navOptions);
                var opt = {
                    context: {
                        userId: 1
                    },
                    fullscreen: true,
                    viewContainerRef: _this.vcRef,
                    animated: true,
                    transition: {
                        name: "slideTop",
                        duration: 200,
                        curve: "ease"
                    }
                };
                _this.modal.showModal(projectmanager_info_page_component_1.ProjectManagerInfoComponent, opt).then(function (response) {
                    console.log(response);
                });
            }
            else {
                console.log(result);
            }
        });
    };
    StartProjectComponent.prototype.getUserData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userId, cd, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = this._userService.getCurrentUserId();
                        cd = this._userService.getStartProjectData();
                        this._componentService.showLoader('Loading...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._userService.getUserData(userId)];
                    case 2:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        this.user.deserialize(res.data);
                        this.project.userId = this.user.userId;
                        this.project.phoneNumber = (cd.phoneNumber) ? cd.phoneNumber : this.user.phoneNumber;
                        this.project.email = this.user.email;
                        this.saveToCache();
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
    StartProjectComponent.prototype.createProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._projectService.createProject(this.project)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        this.isSubmitted = true;
                        this._userService.removeStartProjectData();
                        dialogs.alert({
                            title: "Well Done!",
                            message: "Your project will be approved shortly! In the meantime, please explore the videos under the resources tab",
                            okButtonText: "Done"
                        }).then(function () {
                            _this.goTo();
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        this._componentService.hideLoader();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild("checkbx"),
        __metadata("design:type", core_1.ElementRef)
    ], StartProjectComponent.prototype, "checkbx", void 0);
    __decorate([
        core_1.ViewChild("autoCmp"),
        __metadata("design:type", angular_1.RadAutoCompleteTextViewComponent)
    ], StartProjectComponent.prototype, "autoCmp", void 0);
    StartProjectComponent = __decorate([
        core_1.Component({
            selector: "start-project-page",
            moduleId: module.id,
            templateUrl: "./start-project-page.component.html",
            styleUrls: ['./start-project-page.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            core_1.NgZone,
            core_1.ViewContainerRef,
            router_1.ActivatedRoute,
            router_2.RouterExtensions,
            dialogs_1.ModalDialogService,
            user_service_1.UserService,
            project_service_1.ProjectService,
            config_service_1.ConfigService,
            component_event_service_1.ComponentEventService])
    ], StartProjectComponent);
    return StartProjectComponent;
}());
exports.StartProjectComponent = StartProjectComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQtcHJvamVjdC1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0YXJ0LXByb2plY3QtcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFtRztBQUNuRywwQ0FBaUQ7QUFFakQsaURBQWdEO0FBR2hELHNEQUErRDtBQUcvRCxnRUFBd0Y7QUFFeEYsK0ZBQTRGO0FBQzVGLGlIQUE2RztBQUM3Ryw2SEFBcUg7QUFFckgsU0FBUztBQUNULHNEQUErQztBQUMvQyw0REFBcUQ7QUFFckQsV0FBVztBQUNYLDREQUEwRDtBQUMxRCxnRUFBOEQ7QUFDOUQsa0VBQWdFO0FBQ2hFLG1FQUE2RTtBQUM3RSxrRkFBK0U7QUFFL0UsU0FBUztBQUNULG9DQUFzQztBQUV0QywrQkFBaUM7QUFDakMscUNBQXNDO0FBRXRDLHFDQUE0QztBQUM1QyxtQ0FBcUM7QUFRckM7SUFvRUksK0JBQ1ksSUFBVSxFQUNWLE9BQWUsRUFDZixLQUF1QixFQUN2QixlQUErQixFQUMvQixpQkFBbUMsRUFFbkMsS0FBeUIsRUFDekIsWUFBeUIsRUFDekIsZUFBK0IsRUFDL0IsY0FBNkIsRUFDN0IsaUJBQXdDO1FBWHBELGlCQTRCQztRQTNCVyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBRW5DLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3pCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBM0Vw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c0IsRUFBRSxDQUFDO3dCQUUzQyxPQUFPLENBQUMsS0FBSyxDQUFDOzRCQUNWLEtBQUssRUFBRSxZQUFZOzRCQUNuQixPQUFPLEVBQUUsMkdBQTJHOzRCQUNwSCxZQUFZLEVBQUUsTUFBTTt5QkFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDSixLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ2hCLENBQUMsQ0FBQyxDQUFDOzs7O3dCQUdILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7Ozs7O0tBRTNDO0lBamtCcUI7UUFBckIsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7a0NBQVUsaUJBQVU7MERBQUM7SUFDcEI7UUFBckIsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7a0NBQVUsMENBQWdDOzBEQUFDO0lBbEV2RCxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxxQ0FBcUM7WUFDbEQsU0FBUyxFQUFFLENBQUMsb0NBQW9DLENBQUM7U0FDcEQsQ0FBQzt5Q0FzRW9CLFdBQUk7WUFDRCxhQUFNO1lBQ1IsdUJBQWdCO1lBQ04sdUJBQWM7WUFDWix5QkFBZ0I7WUFFNUIsNEJBQWtCO1lBQ1gsMEJBQVc7WUFDUixnQ0FBYztZQUNmLDhCQUFhO1lBQ1YsK0NBQXFCO09BL0UzQyxxQkFBcUIsQ0Fvb0JqQztJQUFELDRCQUFDO0NBQUEsQUFwb0JELElBb29CQztBQXBvQlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYsIFZpZXdDaGlsZCwgTmdab25lLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUHJvZ3Jlc3MgfSBmcm9tIFwidWkvcHJvZ3Jlc3NcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhLCBWYWx1ZUxpc3QgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IERyb3BEb3duIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWRyb3AtZG93bic7XG5pbXBvcnQgeyBUb2tlbk1vZGVsLCBBdXRvQ29tcGxldGVFdmVudERhdGEsIFJhZEF1dG9Db21wbGV0ZVRleHRWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGVcIjtcbmltcG9ydCB7IFJhZEF1dG9Db21wbGV0ZVRleHRWaWV3Q29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGUvYW5ndWxhclwiO1xuXG5pbXBvcnQgeyBSZWZlcmVuY2VMaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL3ZpZXcvcmVmZXJlbmNlLWxpc3QvcmVmZXJlbmNlLWxpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTZWFyY2hBZGRyZXNzTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vdmlldy9zZWFyY2gtYWRkcmVzcy1tb2RhbC9zZWFyY2gtYWRkcmVzcy1tb2RhbC5jb21wb25lbnRcIjtcbmltcG9ydCB7IFByb2plY3RNYW5hZ2VySW5mb0NvbXBvbmVudCB9IGZyb20gXCIuLi8uLi92aWV3L3Byb2plY3RtYW5hZ2VyLWluZm8tcGFnZS9wcm9qZWN0bWFuYWdlci1pbmZvLXBhZ2UuY29tcG9uZW50XCI7XG5cbi8vIE1PREVMU1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvcHJvamVjdC5tb2RlbFwiO1xuXG4vLyBTRVJWSUNFU1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQcm9qZWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wcm9qZWN0LnNlcnZpY2VcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuXG4vLyBPVEhFUlNcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIGh0dHBNb2R1bGUgZnJvbSBcImh0dHBcIjsgXG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0IHsgb3BlblVybCB9IGZyb20gXCJ1dGlscy91dGlsc1wiO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBpc0lPUywgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwidXRpbHMvdXRpbHNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3RhcnQtcHJvamVjdC1wYWdlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3N0YXJ0LXByb2plY3QtcGFnZS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL3N0YXJ0LXByb2plY3QtcGFnZS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFN0YXJ0UHJvamVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjb2x1bW5zO1xuXG4gICAgLy8gQ1VSUkVOVCBEQVRFU1xuICAgIGRhdGU6IGFueSA9IG5ldyBEYXRlKCk7XG4gICAgY3VycmVudE1vbnRoOiBhbnkgPSB0aGlzLmRhdGUuZ2V0TW9udGgoKTtcbiAgICBjdXJyZW50WWVhcjogYW55ID0gdGhpcy5kYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICAvLyBQUk9HUkVTUyBWQVJJQUJMRVNcbiAgICBmb3JtYXR0ZWREYXRlRW5kOiBzdHJpbmcgPSAnJztcbiAgICBidXR0b25UZXh0OiBzdHJpbmcgPSAnTmV4dCc7XG4gICAgcHJvZ3Jlc3NWYWx1ZTogbnVtYmVyID0gMTtcbiAgICBzdGVwOiBudW1iZXIgPSAxO1xuICAgIC8vIEVORCBPRiBQUk9HUkVTUyBWQVJJQUJMRVNcblxuICAgIC8vIERST1BET1dOIENIT0lDRVNcbiAgICBzY2hvb2xDbHViVHlwZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBhZmZpbGlhdGlvblR5cGVzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgYWZmaWxpYXRpb25TdHVkZW50VHlwZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBhZmZpbGlhdGlvblRlYWNoZXJUeXBlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGhlYXJkRnJvbUxpc3RzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgZGF5czogQXJyYXk8bnVtYmVyPiA9IFtdO1xuICAgIHllYXJzOiBBcnJheTxudW1iZXI+ID0gW107XG4gICAgbW9udGhzOiBBcnJheTxzdHJpbmc+ID0gW1xuICAgICAgICAnSmFudWFyeScsJ0ZlYnJ1YXJ5JywnTWFyY2gnLFxuICAgICAgICAnQXByaWwnLCdNYXknLCdKdW5lJywnSnVseScsXG4gICAgICAgICdBdWd1c3QnLCdTZXB0ZW1iZXInLCdPY3RvYmVyJyxcbiAgICAgICAgJ05vdmVtYmVyJywnRGVjZW1iZXInXG4gICAgXVxuICAgIC8vIEVORCBPRiBEUk9QRE9XTiBDSE9JQ0VTXG5cbiAgICAvLyBEUk9QRE9XTiBTRUxFQ1RFRCBWQUxVRVxuICAgIGFmZmlsaWF0aW9uU2VsZWN0ZWQ6IG51bWJlciA9IDE7XG4gICAgYWZmaWxpYXRpb25UeXBlU2VsZWN0ZWQ6IG51bWJlciA9IDA7XG4gICAgc2Nob29sQ2x1YlNlbGVjdGVkOiBudW1iZXIgPSAwO1xuICAgIGhlYXJkRnJvbVNlbGVjdGVkOiBudW1iZXIgPSAwO1xuICAgIG1vbnRoU2VsZWN0ZWQ6IG51bWJlciA9IDA7XG4gICAgZGF5U2VsZWN0ZWQ6IG51bWJlciA9IDA7XG4gICAgeWVhclNlbGVjdGVkOiBudW1iZXIgPSAwO1xuICAgIC8vIEVORCBPRiBEUk9QRE9XTiBTRUxFQ1RFRCBWQUxVRVxuXG4gICAgLy8gRFJPUERPV04gQk9PTEVBTlNcbiAgICBpc1N0dWRlbnRTZWxlY3RlZDogYm9vbGVhbiA9IHRydWU7XG4gICAgaXNTY2hvb2xDbHViT3RoZXJTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzSGVhcmRGcm9tT3RoZXJTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzSGVhcmRGcm9tQ29udmVudGlvblNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy8gRU5EIE9GIERST1BET1dOIEJPT0xFQU5TXG5cbiAgICAvLyBBQ1RJVklUWSBJTkRJQ0FUT1JTXG4gICAgLy8gaXNUZWFjaGVyRGF0YUxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvLyBFTkQgT0YgQUNUSVZJVFkgSU5ESUNBVE9SU1xuXG4gICAgaXNTdWJtaXR0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc0NoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBoYXNWYWxpZFNjaG9vbEFkZHJlc3M6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHJvdXRlTmFtZTogc3RyaW5nO1xuICAgIG5hdk9wdGlvbnM6IGFueTtcblxuICAgIHVzZXI6IFVzZXI7XG4gICAgcHJvamVjdDogUHJvamVjdDtcblxuICAgIGRhdGFJdGVtczogT2JzZXJ2YWJsZUFycmF5PFRva2VuTW9kZWw+O1xuXG4gICAgQFZpZXdDaGlsZChcImNoZWNrYnhcIikgY2hlY2tieDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKFwiYXV0b0NtcFwiKSBhdXRvQ21wOiBSYWRBdXRvQ29tcGxldGVUZXh0Vmlld0NvbXBvbmVudDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIF9hY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG5cbiAgICAgICAgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLCBcbiAgICAgICAgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9wcm9qZWN0U2VydmljZTogUHJvamVjdFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcbiAgICApIHtcbiAgICAgICAgcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuXG4gICAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IG5ldyBQcm9qZWN0KCk7XG5cbiAgICAgICAgdGhpcy5uYXZPcHRpb25zID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRSb3V0ZU9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVkUm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlTmFtZSA9IHBhcmFtc1sncm91dGUnXTtcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmluaXRZZWFyKCk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRNb250aCgpO1xuICAgICAgICB9LCA4MDApXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdERyb3Bkb3duRGF0YXMoKTtcblxuICAgICAgICB0aGlzLmluaXRQcm9qZWN0KCk7XG4gICAgICAgIHRoaXMuaW5pdFNjaG9vbENsdWIoKTtcbiAgICAgICAgdGhpcy5pbml0QWZmaWxpYXRpb25UeXBlKCk7XG4gICAgICAgIHRoaXMuaW5pdEFmZmlsaWF0aW9uKCk7XG4gICAgICAgIHRoaXMuaW5pdEhlYXJkRnJvbSgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5nZXRVc2VyRGF0YSgpO1xuXG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3NiYXJXaWR0aCgxMCk7XG4gICAgfVxuXG4gICAgc2V0UHJvZ3Jlc3NiYXJXaWR0aChwZXJjZW50KSB7XG4gICAgICAgIHRoaXMuY29sdW1ucyA9IHBlcmNlbnQgKyBcIiosXCIgKyAoMTAwIC0gcGVyY2VudCkgKyBcIipcIjtcbiAgICB9XG5cbiAgICBpbml0TW9udGgoKSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgLy8gbGV0IG5leHRNb250aCA9IChkYXRlLmdldERhdGUoKSA9PT0gMSk/IGRhdGUuZ2V0TW9udGgoKSA6IGRhdGUuZ2V0TW9udGgoKSsxO1xuXG4gICAgICAgIHRoaXMubW9udGhTZWxlY3RlZCA9IHRoaXMuY3VycmVudE1vbnRoO1xuICAgICAgICBsZXQgY3VycmVudE1vbnRoID0gdGhpcy5jdXJyZW50TW9udGg7XG4gICAgICAgIHRoaXMuZ2V0TW9uZGF5cyhjdXJyZW50TW9udGgrMSwgZGF0ZS5nZXRGdWxsWWVhcigpKTtcblxuICAgIH1cblxuICAgIGluaXRZZWFyKCkge1xuICAgICAgICBsZXQgY3VyclllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIGxldCBsaW1pdFllYXIgPSBjdXJyWWVhcisxNTtcblxuICAgICAgICB3aGlsZShjdXJyWWVhciA8PSBsaW1pdFllYXIpIHtcbiAgICAgICAgICAgIHRoaXMueWVhcnMucHVzaChjdXJyWWVhcik7XG4gICAgICAgICAgICBjdXJyWWVhcisrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdERyb3Bkb3duRGF0YXMoKSB7XG4gICAgICAgIHRoaXMuc2Nob29sQ2x1YlR5cGVzID0gdGhpcy5wcm9qZWN0LmdldFNjaG9vbENsdWIoKTtcbiAgICAgICAgdGhpcy5hZmZpbGlhdGlvblR5cGVzID0gWydTdHVkZW50JywgJ1RlYWNoZXInXTtcbiAgICAgICAgdGhpcy5hZmZpbGlhdGlvblN0dWRlbnRUeXBlcyA9IHRoaXMucHJvamVjdC5nZXRBZmZpbGlhdGlvbignc3R1ZGVudCcpO1xuICAgICAgICB0aGlzLmFmZmlsaWF0aW9uVGVhY2hlclR5cGVzID0gdGhpcy5wcm9qZWN0LmdldEFmZmlsaWF0aW9uKCd0ZWFjaGVyJyk7XG4gICAgICAgIHRoaXMuaGVhcmRGcm9tTGlzdHMgPSB0aGlzLnByb2plY3QuZ2V0SGVhcmRGcm9tKCk7XG4gICAgfVxuXG4gICAgaW5pdFByb2plY3QoKSB7XG4gICAgICAgIGxldCBjZCA9IHRoaXMuX3VzZXJTZXJ2aWNlLmdldFN0YXJ0UHJvamVjdERhdGEoKTtcblxuICAgICAgICB0aGlzLnByb2plY3QuZGVzZXJpYWxpemUoe1xuICAgICAgICAgICAgdXNlcklkOiAgICAgIDAsXG4gICAgICAgICAgICBzdHVkZW50SWQ6ICAgMCxcbiAgICAgICAgICAgIGVtYWlsOiAgICAgICBudWxsLFxuICAgICAgICAgICAgcGhvbmVOdW1iZXI6IChjZC5waG9uZU51bWJlcik/IGNkLnBob25lTnVtYmVyIDogbnVsbCxcbiAgICAgICAgICAgIHNjaG9vbE5hbWU6ICAoY2Quc2Nob29sTmFtZSk/IGNkLnNjaG9vbE5hbWUgOiBudWxsLFxuICAgICAgICAgICAgdXNlclNjaG9vbEFmZmlsaWF0aW9uOiAgICAgKGNkLnVzZXJTY2hvb2xBZmZpbGlhdGlvbik/IGNkLnVzZXJTY2hvb2xBZmZpbGlhdGlvbiA6IHRoaXMuYWZmaWxpYXRpb25UeXBlc1swXSxcbiAgICAgICAgICAgIHVzZXJTY2hvb2xBZmZpbGlhdGlvblR5cGU6IChjZC51c2VyU2Nob29sQWZmaWxpYXRpb25UeXBlKT8gY2QudXNlclNjaG9vbEFmZmlsaWF0aW9uVHlwZSA6IHRoaXMuYWZmaWxpYXRpb25TdHVkZW50VHlwZXNbMF0sXG4gICAgICAgICAgICBjbHViU3BvbnNvcjogKGNkLmNsdWJTcG9uc29yKT8gY2QuY2x1YlNwb25zb3IgOiB0aGlzLnNjaG9vbENsdWJUeXBlc1swXSxcbiAgICAgICAgICAgIHRlYWNoZXJOYW1lOiAoY2QudGVhY2hlck5hbWUpPyBjZC50ZWFjaGVyTmFtZSA6ICcnLFxuICAgICAgICAgICAgdGVhY2hlckVtYWlsOiAoY2QudGVhY2hlckVtYWlsKT8gY2QudGVhY2hlckVtYWlsIDogJycsXG4gICAgICAgICAgICBzY2hvb2xBZGRyZXNzOiAoY2Quc2Nob29sQWRkcmVzcyk/IGNkLnNjaG9vbEFkZHJlc3MgOiAnJyxcbiAgICAgICAgICAgIHNjaG9vbEVucm9sbGVlczogKGNkLnNjaG9vbEVucm9sbGVlcyk/IGNkLnNjaG9vbEVucm9sbGVlcyA6IG51bGwsXG4gICAgICAgICAgICBkYXRlU3RhcnQ6ICAgKGNkLmRhdGVTdGFydCk/IGNkLmRhdGVTdGFydCA6ICcnLFxuICAgICAgICAgICAgZGF0ZUVuZDogICAgIChjZC5kYXRlRW5kKT8gY2QuZGF0ZUVuZCA6ICcnLFxuICAgICAgICAgICAgaGVhcmRGcm9tOiAgIChjZC5oZWFyZEZyb20pPyBjZC5oZWFyZEZyb20gOiB0aGlzLmhlYXJkRnJvbUxpc3RzWzBdXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5zYXZlVG9DYWNoZSgpO1xuICAgIH1cblxuICAgIHNhdmVUb0NhY2hlKCkge1xuICAgICAgICB0aGlzLl91c2VyU2VydmljZS5zYXZlU3RhcnRQcm9qZWN0RGF0YSh0aGlzLnByb2plY3QpO1xuICAgIH1cblxuICAgIG1vZGVsQ2hhbmdlKGRhdGEsIHR5cGUpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0W3R5cGVdID0gZGF0YTtcbiAgICAgICAgdGhpcy5zYXZlVG9DYWNoZSgpO1xuICAgIH1cblxuICAgIG9wZW4odXJsKSB7XG4gICAgICAgIG9wZW5VcmwodXJsKTtcbiAgICB9XG5cbiAgICBvcGVuTW9kYWwoKSB7XG4gICAgICAgIGxldCBvcHQgPSB7XG4gICAgICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChSZWZlcmVuY2VMaXN0Q29tcG9uZW50LCBvcHQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGlmKHJlcy5oYXNEYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0hlYXJkRnJvbUNvbnZlbnRpb25TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0LmhlYXJkRnJvbSA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0hlYXJkRnJvbU90aGVyU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNIZWFyZEZyb21Db252ZW50aW9uU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3QuaGVhcmRGcm9tID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYXJkRnJvbVNlbGVjdGVkID0gdGhpcy5oZWFyZEZyb21MaXN0cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNhdmVUb0NhY2hlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2VhcmNoQWRkcmVzcygpIHtcbiAgICAgICAgbGV0IG9wdCA9IHtcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IHRydWUsXG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxuICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKFNlYXJjaEFkZHJlc3NNb2RhbENvbXBvbmVudCwgb3B0KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBpZihyZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdC5zY2hvb2xBZGRyZXNzID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlVG9DYWNoZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKiBQUk9HUkVTUyBDT05GSUcgKiovXG4gICAgcHJvZ3Jlc3NCYXJMb2FkZWQoYXJncykge1xuICAgICAgICBsZXQgcHJvZ3Jlc3NCYXIgPSA8UHJvZ3Jlc3M+YXJncy5vYmplY3Q7XG5cbiAgICAgICAgcHJvZ3Jlc3NCYXIudmFsdWUgPSB0aGlzLnN0ZXA7XG4gICAgICAgIHByb2dyZXNzQmFyLm1heFZhbHVlID0gNTtcbiAgICB9XG5cbiAgICBwcm9ncmVzc1ZhbHVlQ2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGxldCBwcm9ncmVzc0JhciA9IDxQcm9ncmVzcz5hcmdzLm9iamVjdDtcbiAgICB9XG4gICAgLyoqIEVORCBPRiBQUk9HUkVTUyBDT05GSUcgKiovXG5cbiAgICAvKiogRFJPUERPV04gQ09ORklHICoqL1xuICAgIGluaXRTY2hvb2xDbHViKCkge1xuICAgICAgICB0aGlzLnNjaG9vbENsdWJTZWxlY3RlZCA9IHRoaXMuc2Nob29sQ2x1YlR5cGVzLmluZGV4T2YodGhpcy5wcm9qZWN0LmNsdWJTcG9uc29yKTtcbiAgICB9XG5cbiAgICBpbml0QWZmaWxpYXRpb25UeXBlKCkge1xuICAgICAgICB0aGlzLmFmZmlsaWF0aW9uU2VsZWN0ZWQgPSB0aGlzLmFmZmlsaWF0aW9uVHlwZXMuaW5kZXhPZih0aGlzLnByb2plY3QudXNlclNjaG9vbEFmZmlsaWF0aW9uKVxuXG4gICAgICAgIHRoaXMuaXNTdHVkZW50U2VsZWN0ZWQgPSAodGhpcy5hZmZpbGlhdGlvblNlbGVjdGVkID4gMCk/IGZhbHNlIDogdHJ1ZTtcbiAgICB9XG5cbiAgICBpbml0QWZmaWxpYXRpb24oKSB7ICBcbiAgICAgICAgaWYodGhpcy5hZmZpbGlhdGlvblNlbGVjdGVkID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuYWZmaWxpYXRpb25UeXBlU2VsZWN0ZWQgPSB0aGlzLmFmZmlsaWF0aW9uU3R1ZGVudFR5cGVzLmluZGV4T2YodGhpcy5wcm9qZWN0LnVzZXJTY2hvb2xBZmZpbGlhdGlvblR5cGUpO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmFmZmlsaWF0aW9uU2VsZWN0ZWQgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5hZmZpbGlhdGlvblR5cGVTZWxlY3RlZCA9IHRoaXMuYWZmaWxpYXRpb25UZWFjaGVyVHlwZXMuaW5kZXhPZih0aGlzLnByb2plY3QudXNlclNjaG9vbEFmZmlsaWF0aW9uVHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0SGVhcmRGcm9tKCkge1xuICAgICAgICB0aGlzLmhlYXJkRnJvbVNlbGVjdGVkID0gdGhpcy5oZWFyZEZyb21MaXN0cy5pbmRleE9mKHRoaXMucHJvamVjdC5oZWFyZEZyb20pO1xuICAgIH1cblxuICAgIG9uRHJvcGRvd25DaGFuZ2VkKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhLCBmaWVsZCkge1xuXG4gICAgICAgIGlmKGZpZWxkID09PSAnYWZmaWxpYXRpb24nKSB7XG4gICAgICAgICAgICBpZihhcmdzLm5ld0luZGV4ID09PSAxKSB0aGlzLnByb2plY3QuY2xlYXJUZWFjaGVyKCk7XG5cbiAgICAgICAgICAgIHRoaXMucHJvamVjdC51c2VyU2Nob29sQWZmaWxpYXRpb24gPSB0aGlzLmFmZmlsaWF0aW9uVHlwZXNbYXJncy5uZXdJbmRleF07XG4gICAgICAgICAgICB0aGlzLnByb2plY3QudXNlclNjaG9vbEFmZmlsaWF0aW9uVHlwZSA9IChhcmdzLm5ld0luZGV4ID09PSAxKT8gdGhpcy5hZmZpbGlhdGlvblRlYWNoZXJUeXBlc1swXSA6IHRoaXMuYWZmaWxpYXRpb25TdHVkZW50VHlwZXNbMF07XG4gICAgICAgIFxuICAgICAgICAgICAgdGhpcy5hZmZpbGlhdGlvblR5cGVTZWxlY3RlZCA9IDA7XG4gICAgICAgIH1lbHNlIGlmKGZpZWxkID09PSAnYWZmaWxpYXRpb24tdHlwZScpIHtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdC51c2VyU2Nob29sQWZmaWxpYXRpb25UeXBlID0gKHRoaXMuYWZmaWxpYXRpb25TZWxlY3RlZCA9PT0gMSk/IHRoaXMuYWZmaWxpYXRpb25UZWFjaGVyVHlwZXNbYXJncy5uZXdJbmRleF0gOiB0aGlzLmFmZmlsaWF0aW9uU3R1ZGVudFR5cGVzW2FyZ3MubmV3SW5kZXhdOyBcbiAgICAgICAgfWVsc2UgaWYoZmllbGQgPT09ICdoZWFyZC1mcm9tJykge1xuICAgICAgICAgICAgbGV0IGFyckxlbmd0aCA9IHRoaXMuaGVhcmRGcm9tTGlzdHMubGVuZ3RoLTE7XG5cbiAgICAgICAgICAgIGlmKGFyZ3MubmV3SW5kZXggPT09IGFyckxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNIZWFyZEZyb21PdGhlclNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuaXNIZWFyZEZyb21PdGhlclNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0LmhlYXJkRnJvbSA9IHRoaXMuaGVhcmRGcm9tTGlzdHNbYXJncy5uZXdJbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNlIGlmKGZpZWxkID09PSAnc2Nob29sLWNsdWInKSB7XG4gICAgICAgICAgICBsZXQgYXJyTGVuZ3RoID0gdGhpcy5zY2hvb2xDbHViVHlwZXMubGVuZ3RoLTE7XG5cbiAgICAgICAgICAgIGlmKGFyZ3MubmV3SW5kZXggPT09IGFyckxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNTY2hvb2xDbHViT3RoZXJTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2Nob29sQ2x1Yk90aGVyU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3QuY2x1YlNwb25zb3IgPSB0aGlzLnNjaG9vbENsdWJUeXBlc1thcmdzLm5ld0luZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2F2ZVRvQ2FjaGUoKTtcbiAgICB9XG5cbiAgICBvbkRyb3Bkb3duQ2xvc2UoZmllbGQpIHtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgICAgaWYoZmllbGQgPT09ICdhZmZpbGlhdGlvbicpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuaXNTdHVkZW50U2VsZWN0ZWQgPSAodGhpcy5hZmZpbGlhdGlvblNlbGVjdGVkID4gMCk/IGZhbHNlIDogdHJ1ZTtcblxuICAgICAgICAgICAgfWVsc2UgaWYoZmllbGQgPT09ICdzY2hvb2wtY2x1YicpIHtcblxuICAgICAgICAgICAgICAgIGxldCBhcnJMZW5ndGggPSB0aGlzLnNjaG9vbENsdWJUeXBlcy5sZW5ndGgtMTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2Nob29sQ2x1YlNlbGVjdGVkID09PSBhcnJMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0LmNsdWJTcG9uc29yID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NjaG9vbENsdWJPdGhlclNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0LmNsdWJTcG9uc29yID0gdGhpcy5zY2hvb2xDbHViVHlwZXNbdGhpcy5zY2hvb2xDbHViU2VsZWN0ZWRdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU2Nob29sQ2x1Yk90aGVyU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1lbHNlIGlmKGZpZWxkID09PSAnaGVhcmQtZnJvbScpIHtcblxuICAgICAgICAgICAgICAgIGxldCBhcnJMZW5ndGggPSB0aGlzLmhlYXJkRnJvbUxpc3RzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBsZXQgaWZPdGhlciA9IGFyckxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICBsZXQgaWZDb252ZW50aW9ucyA9IGFyckxlbmd0aCAtIDI7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLmhlYXJkRnJvbVNlbGVjdGVkID09PSBpZk90aGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdC5oZWFyZEZyb20gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSGVhcmRGcm9tT3RoZXJTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNIZWFyZEZyb21Db252ZW50aW9uU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmhlYXJkRnJvbVNlbGVjdGVkID09PSBpZkNvbnZlbnRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignT3BlbmluZy4uLicpXG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3Blbk1vZGFsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMClcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0LmhlYXJkRnJvbSA9IHRoaXMuaGVhcmRGcm9tTGlzdHNbdGhpcy5oZWFyZEZyb21TZWxlY3RlZF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNIZWFyZEZyb21PdGhlclNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNIZWFyZEZyb21Db252ZW50aW9uU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2F2ZVRvQ2FjaGUoKTtcblxuICAgICAgICB9LCA0MDApXG4gICAgfVxuICAgIC8qKiBFTkQgT0YgRFJPUERPV04gQ09ORklHICoqL1xuXG4gICAgLyoqIENIRUNLQk9YIENPTkZJRyAqKi9cbiAgICBjaGVja2VkQm94Q2hhbmdlZChjaGVja2J4KSB7XG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gY2hlY2tieC5jaGVja2VkO1xuICAgIH1cbiAgICAvKiogRU5EIE9GIENIRUNLQk9YIENPTkZJRyAqKi9cblxuICAgIC8qKiBEQVRFIENPTkZJR1MgKFBBR0UgRk9VUikgKiovXG4gICAgb25DaGFuZ2VNb250aChldmVudDogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkTW9udGggPSBldmVudC5uZXdJbmRleDtcblxuICAgICAgICB0aGlzLmNvbmZpZ3VyZURhdGUoc2VsZWN0ZWRNb250aCwgdGhpcy5jdXJyZW50TW9udGgpO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlRGF5KGV2ZW50OiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xuICAgICAgICB0aGlzLmRheVNlbGVjdGVkID0gZXZlbnQubmV3SW5kZXg7XG4gICAgICAgIHRoaXMudmFsaWRhdGVEYXRlKCk7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VZZWFyKGV2ZW50OiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xuICAgICAgICB0aGlzLnllYXJTZWxlY3RlZCA9IGV2ZW50Lm5ld0luZGV4O1xuXG4gICAgICAgIHRoaXMuY29uZmlndXJlRGF0ZSh0aGlzLm1vbnRoU2VsZWN0ZWQsIHRoaXMuY3VycmVudE1vbnRoKTtcbiAgICB9XG5cbiAgICBjb25maWd1cmVEYXRlKHNlbGVjdGVkTW9udGgsIGN1cnJlbnRNb250aCkge1xuXG4gICAgICAgIGxldCBzZWxlY3RlZFllYXIgPSB0aGlzLnllYXJzW3RoaXMueWVhclNlbGVjdGVkXTtcblxuICAgICAgICBsZXQgaXNDdXJyZW50WWVhciA9ICh0aGlzLmN1cnJlbnRZZWFyID09PSBzZWxlY3RlZFllYXIpPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgaWYoaXNDdXJyZW50WWVhcikge1xuICAgICAgICAgICAgaWYoc2VsZWN0ZWRNb250aCA8IGN1cnJlbnRNb250aCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnRoU2VsZWN0ZWQgPSBjdXJyZW50TW9udGg7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE1vbmRheXMoY3VycmVudE1vbnRoKzEsIHNlbGVjdGVkWWVhcik7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMClcbiAgICAgICAgICAgICAgICB9LCAxMDApXG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TW9uZGF5cyhzZWxlY3RlZE1vbnRoKzEsIHNlbGVjdGVkWWVhcik7XG4gICAgICAgICAgICAgICAgfSwgMTAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldE1vbmRheXMoc2VsZWN0ZWRNb250aCsxLCBzZWxlY3RlZFllYXIpO1xuICAgICAgICAgICAgfSwgMTAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVEYXRlKCkge1xuXG4gICAgICAgIGxldCBzdGFydCA9IHRoaXMucHJvamVjdC5mb3JtYXRQcm9qZWN0RHVyYXRpb25EYXRlKFxuICAgICAgICAgICAgdGhpcy5tb250aFNlbGVjdGVkLCBcbiAgICAgICAgICAgIHRoaXMuZGF5c1t0aGlzLmRheVNlbGVjdGVkXSxcbiAgICAgICAgICAgIHRoaXMueWVhcnNbdGhpcy55ZWFyU2VsZWN0ZWRdLFxuICAgICAgICAgICAgJ3N0YXJ0J1xuICAgICAgICApO1xuXG4gICAgICAgIGxldCBlbmQgPSB0aGlzLnByb2plY3QuZm9ybWF0UHJvamVjdER1cmF0aW9uRGF0ZShcbiAgICAgICAgICAgIHRoaXMubW9udGhTZWxlY3RlZCwgXG4gICAgICAgICAgICB0aGlzLmRheXNbdGhpcy5kYXlTZWxlY3RlZF0sXG4gICAgICAgICAgICB0aGlzLnllYXJzW3RoaXMueWVhclNlbGVjdGVkXSxcbiAgICAgICAgICAgICdlbmQnXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5wcm9qZWN0LmRhdGVTdGFydCA9IHN0YXJ0LmRhdGU7XG4gICAgICAgIHRoaXMucHJvamVjdC5kYXRlRW5kID0gZW5kLmRhdGU7XG4gICAgICAgIHRoaXMuZm9ybWF0dGVkRGF0ZUVuZCA9IGVuZC5mb3JtYXR0ZWQ7XG4gICAgICAgIHRoaXMuc2F2ZVRvQ2FjaGUoKTtcbiAgICB9XG5cbiAgICBnZXRNb25kYXlzKG1vbnRoPywgeWVhcj8pIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIm1vbnRoOiBcIittb250aClcbiAgICAgICAgY29uc29sZS5sb2coXCJ5ZWFyOiBcIit5ZWFyKVxuXG4gICAgICAgIHRoaXMuZGF5cyA9IFtdO1xuICAgICAgICBsZXQgZGF5QXJyID0gW107XG4gIFxuICAgICAgICBsZXQgY3VyckRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBsZXQgY3Vyck1vbnRoID0gY3VyckRhdGUuZ2V0TW9udGgoKSsxO1xuICAgICAgICBsZXQgY3VyclllYXIgPSBjdXJyRGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgIFxuICAgICAgICBsZXQgaXNDdXJyTW9udGggPSAoY3Vyck1vbnRoID09PSBtb250aCk/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAvKiBsZXQgaXNBZnRlckN1cnJNb250aCA9IChjdXJyTW9udGgrMSA9PT0gbW9udGgpPyB0cnVlIDogZmFsc2U7ICovXG4gICAgICAgIGxldCBpc0N1cnJZZWFyID0gKGN1cnJZZWFyID09PSB5ZWFyKT8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgIFxuICAgICAgICBsZXQgY3VyckRheSAgPSAoaXNDdXJyTW9udGgpPyBjdXJyRGF0ZS5nZXREYXRlKCkgOiAxO1xuXG4gICAgICAgIGxldCBzZWxlY3RlZERhdGUgPSBuZXcgRGF0ZShgJHt5ZWFyfS8ke21vbnRofS8ke2N1cnJEYXl9YCk7XG5cbiAgICAgICAgaWYoKGlzQ3Vyck1vbnRoKSAmJiBpc0N1cnJZZWFyICkge1xuICAgICAgICAgICAgc2VsZWN0ZWREYXRlLnNldERhdGUoc2VsZWN0ZWREYXRlLmdldERhdGUoKSsxNClcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlKHNlbGVjdGVkRGF0ZS5nZXREYXkoKSAhPT0gMSkge1xuICAgICAgICAgICAgc2VsZWN0ZWREYXRlLnNldERhdGUoc2VsZWN0ZWREYXRlLmdldERhdGUoKSArIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRheXMgPSBtb21lbnQoc2VsZWN0ZWREYXRlKS5kYXlzSW5Nb250aCgpO1xuICAgICAgICBsZXQgY3VycmVudERheSA9IHNlbGVjdGVkRGF0ZS5nZXREYXRlKCk7XG4gICAgICAgICAgXG4gICAgICAgIHdoaWxlKGN1cnJlbnREYXkgPD0gZGF5cykge1xuICAgICAgICAgICAgbGV0IHRlbXBZZWFyID0gc2VsZWN0ZWREYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICBsZXQgdGVtcE1vbnRoID0gc2VsZWN0ZWREYXRlLmdldE1vbnRoKCkrMTtcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoYCR7dGVtcFllYXJ9LyR7dGVtcE1vbnRofS8ke2N1cnJlbnREYXl9YCk7XG5cbiAgICAgICAgICAgIGlmKGRhdGUuZ2V0RGF5KCkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBkYXlBcnIucHVzaChkYXRlLmdldERhdGUoKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3VycmVudERheSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRheXMgPSBkYXlBcnI7XG4gICAgICAgICAgICB0aGlzLmRheVNlbGVjdGVkID0gMDtcblxuICAgICAgICAgICAgdGhpcy5tb250aFNlbGVjdGVkID0gc2VsZWN0ZWREYXRlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICB0aGlzLnllYXJTZWxlY3RlZCA9IHRoaXMueWVhcnMuaW5kZXhPZihzZWxlY3RlZERhdGUuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlRGF0ZSgpO1xuICAgICAgICB9LCAxMDApXG5cbiAgICB9XG4gICAgLyoqIEVORCBPRiBEQVRFIENPTkZJR1MgKFBBR0UgRk9VUikgKiovXG5cbiAgICBuZXh0KCkge1xuICAgICAgICB0aGlzLnZhbGlkYXRlUGFnZSgpO1xuICAgICAgICAvLyB0aGlzLmluY3JlbWVudFN0ZXAoKTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVBhZ2UoKSB7XG4gICAgICAgIGlmKHRoaXMuc3RlcCA9PSAxKSB7XG4gICAgICAgICAgICBpZighdGhpcy5wcm9qZWN0LmlzU3RlcENsZWFuKHRoaXMuc3RlcCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ0FsbCBGaWVsZHMgYXJlIHJlcXVpcmVkJyk7XG4gICAgICAgICAgICB9ZWxzZSBpZighdGhpcy51c2VyLmdldEZ1bGxOYW1lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ05hbWUgaXMgcmVxdWlyZWQhIFlvdSBjYW4gdXBkYXRlIHlvdXIgbmFtZSBieSBnb2luZyB0byBzZXR0aW5ncyA+IEVkaXQgUHJvZmlsZSBJbmZvLicpXG4gICAgICAgICAgICB9ZWxzZSBpZighdGhpcy5fY29tcG9uZW50U2VydmljZS52YWxpZGF0ZUVtYWlsKHRoaXMucHJvamVjdC5lbWFpbCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ0ludmFsaWQgRW1haWwgQWRkcmVzcycpXG4gICAgICAgICAgICB9ZWxzZSBpZighdGhpcy5fY29tcG9uZW50U2VydmljZS52YWxpZGF0ZVBob25lTnVtYmVyKHRoaXMucHJvamVjdC5waG9uZU51bWJlcikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ0ludmFsaWQgUGhvbmUgbnVtYmVyJylcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNJT1MpIHtcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuaW9zLmdldHRlcihVSUFwcGxpY2F0aW9uLCBVSUFwcGxpY2F0aW9uLnNoYXJlZEFwcGxpY2F0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmtleVdpbmRvd1xuICAgICAgICAgICAgICAgICAgICAgICAgLmVuZEVkaXRpbmcodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50U3RlcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVRvQ2FjaGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9ZWxzZSBpZih0aGlzLnN0ZXAgPT09IDIpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLnByb2plY3QuaXNTdGVwQ2xlYW4odGhpcy5zdGVwKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb29wcyEnLCAnQWxsIEZpZWxkcyBhcmUgcmVxdWlyZWQnKVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpc0lPUykge1xuICAgICAgICAgICAgICAgICAgICB1dGlscy5pb3MuZ2V0dGVyKFVJQXBwbGljYXRpb24sIFVJQXBwbGljYXRpb24uc2hhcmVkQXBwbGljYXRpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAua2V5V2luZG93XG4gICAgICAgICAgICAgICAgICAgICAgICAuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRTdGVwKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlVG9DYWNoZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuc3RlcCA9PT0gMykge1xuICAgICAgICAgICAgaWYoKHRoaXMuYWZmaWxpYXRpb25TZWxlY3RlZCA9PT0gMCkgJiYgKCF0aGlzLnByb2plY3QuaXNTdGVwQ2xlYW4odGhpcy5zdGVwKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ1RlYWNoZXJcXCdzIG5hbWUgYW5kIGVtYWlsIGFyZSByZXF1aXJlZCcpXG4gICAgICAgICAgICB9ZWxzZSBpZigodGhpcy5hZmZpbGlhdGlvblNlbGVjdGVkID09PSAwKSAmJiAhdGhpcy5fY29tcG9uZW50U2VydmljZS52YWxpZGF0ZUVtYWlsKHRoaXMucHJvamVjdC50ZWFjaGVyRW1haWwpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vb3BzIScsICdJbnZhbGlkIEVtYWlsIEFkZHJlc3MnKVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpc0lPUykge1xuICAgICAgICAgICAgICAgICAgICB1dGlscy5pb3MuZ2V0dGVyKFVJQXBwbGljYXRpb24sIFVJQXBwbGljYXRpb24uc2hhcmVkQXBwbGljYXRpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAua2V5V2luZG93XG4gICAgICAgICAgICAgICAgICAgICAgICAuZW5kRWRpdGluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRTdGVwKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlVG9DYWNoZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuc3RlcCA9PT0gNCkge1xuICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRTdGVwKCk7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvblRleHQgPSAnU3VibWl0JztcbiAgICAgICAgfWVsc2UgaWYodGhpcy5zdGVwID09PSA1KSB7XG4gICAgICAgICAgICBpZighdGhpcy5wcm9qZWN0LmlzU3RlcENsZWFuKHRoaXMuc3RlcCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ0FsbCBGaWVsZHMgYXJlIHJlcXVpcmVkJylcbiAgICAgICAgICAgIH1lbHNlIGlmKCF0aGlzLmlzQ2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb29wcyEnLCAnQXJlIHlvdSBhbGxvd2VkIGJ5IHlvdXIgc2Nob29sPycpXG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluY3JlbWVudFN0ZXAoKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NWYWx1ZSArPSAxO1xuICAgICAgICB0aGlzLnN0ZXAgKz0gMTtcbiAgICB9XG5cbiAgICBhZGQoKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignU3VibWl0dGluZy4uLicpXG4gICAgICAgIHRoaXMuY3JlYXRlUHJvamVjdCgpO1xuICAgIH1cblxuICAgIG9uQ2xvc2UoKXtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgICAgIC8vIHRoaXMubmF2T3B0aW9ucy5jbGVhckhpc3RvcnkgPSB0cnVlO1xuICAgICAgICAvLyB0aGlzLm5hdk9wdGlvbnMudHJhbnNpdGlvbi5uYW1lID0gJ3NsaWRlUmlnaHQnO1xuICAgICAgICAvLyB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgIH1cblxuICAgIGdvVG8oKSB7XG4gICAgICAgIGlmKHRoaXMucm91dGVOYW1lID09PSAndGFicycpIHtcbiAgICAgICAgICAgIHRoaXMubmF2T3B0aW9ucy5jbGVhckhpc3RvcnkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5uYXZPcHRpb25zLnRyYW5zaXRpb24ubmFtZSA9ICdzbGlkZUxlZnQnO1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9yZXNvdXJjZXMnXSwgdGhpcy5uYXZPcHRpb25zKTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5yb3V0ZU5hbWUgPT09ICdzdGFydCcpe1xuICAgICAgICAgICAgdGhpcy5uYXZPcHRpb25zLmNsZWFySGlzdG9yeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm5hdk9wdGlvbnMudHJhbnNpdGlvbi5uYW1lID0gJ3NsaWRlTGVmdCc7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3Jlc291cmNlcyddLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhlbHAoKSB7XG4gICAgICAgIGxldCB1c2VySWQgPSB0aGlzLl91c2VyU2VydmljZS5nZXRDdXJyZW50VXNlcklkKCk7XG4gICAgICAgIGRpYWxvZ3MuYWN0aW9uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiTmVlZCBIZWxwP1wiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcIkNvbnRhY3QgWXVkYSBCYW5kcyByZXByZXNlbnRhdGl2ZSBub3dcIiwgXCJWaXNpdCBGQVEgUGFnZVwiXVxuICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3VsdCA9PT0gXCJWaXNpdCBGQVEgUGFnZVwiKXtcbiAgICAgICAgICAgICAgICBvcGVuVXJsKFwiaHR0cDovL3d3dy55dWRhYmFuZHMub3JnL2ZhcXMvXCIpO1xuICAgICAgICAgICAgfWVsc2UgaWYocmVzdWx0ID09PSBcIkNvbnRhY3QgWXVkYSBCYW5kcyByZXByZXNlbnRhdGl2ZSBub3dcIikge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMubmF2T3B0aW9ucy50cmFuc2l0aW9uLmN1cnZlID0gJ2xpbmVhcic7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5uYXZPcHRpb25zLnF1ZXJ5UGFyYW1zID0geyB1c2VySWQ6IDEgfTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3Byb2plY3QtbWFuYWdlci1pbmZvJ10sIHRoaXMubmF2T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgbGV0IG9wdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogMVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZVRvcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoUHJvamVjdE1hbmFnZXJJbmZvQ29tcG9uZW50LCBvcHQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0VXNlckRhdGEoKSB7XG4gICAgICAgIGxldCB1c2VySWQgPSB0aGlzLl91c2VyU2VydmljZS5nZXRDdXJyZW50VXNlcklkKCk7XG4gICAgICAgIGxldCBjZCA9IHRoaXMuX3VzZXJTZXJ2aWNlLmdldFN0YXJ0UHJvamVjdERhdGEoKTtcblxuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ0xvYWRpbmcuLi4nKVxuXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5nZXRVc2VyRGF0YSh1c2VySWQpO1xuXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcblxuICAgICAgICAgICAgdGhpcy51c2VyLmRlc2VyaWFsaXplKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdC51c2VySWQgPSB0aGlzLnVzZXIudXNlcklkO1xuICAgICAgICAgICAgdGhpcy5wcm9qZWN0LnBob25lTnVtYmVyID0gKGNkLnBob25lTnVtYmVyKT8gY2QucGhvbmVOdW1iZXIgOiB0aGlzLnVzZXIucGhvbmVOdW1iZXI7XG4gICAgICAgICAgICB0aGlzLnByb2plY3QuZW1haWwgPSB0aGlzLnVzZXIuZW1haWw7XG4gICAgICAgICAgICB0aGlzLnNhdmVUb0NhY2hlKCk7XG5cbiAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBjcmVhdGVQcm9qZWN0KCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fcHJvamVjdFNlcnZpY2UuY3JlYXRlUHJvamVjdCh0aGlzLnByb2plY3QpO1xuXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5pc1N1Ym1pdHRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZS5yZW1vdmVTdGFydFByb2plY3REYXRhKCk7XG5cbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIldlbGwgRG9uZSFcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIllvdXIgcHJvamVjdCB3aWxsIGJlIGFwcHJvdmVkIHNob3J0bHkhIEluIHRoZSBtZWFudGltZSwgcGxlYXNlIGV4cGxvcmUgdGhlIHZpZGVvcyB1bmRlciB0aGUgcmVzb3VyY2VzIHRhYlwiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJEb25lXCJcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ29UbygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG59Il19