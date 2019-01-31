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
var page_1 = require("tns-core-modules/ui/page");
var student_info_modal_component_1 = require("../student-info-modal/student-info-modal.component");
var nativescript_drop_down_1 = require("nativescript-drop-down");
var nativescript_ui_listview_1 = require("nativescript-ui-listview");
var angular_1 = require("nativescript-ui-listview/angular");
// OTHERS
var moment = require("moment");
var application = require("tns-core-modules/application");
// SERVICES
var search_service_1 = require("../../services/search.service");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var dialogs_2 = require("nativescript-angular/directives/dialogs");
var component_event_service_1 = require("../../services/component-event.service");
var SelectListComponent = /** @class */ (function () {
    function SelectListComponent(_page, vcRef, _changeDetectionRef, modal, params, _searchService, _activatedRoute, _routerExtensions, _componentService) {
        this._page = _page;
        this.vcRef = vcRef;
        this._changeDetectionRef = _changeDetectionRef;
        this.modal = modal;
        this.params = params;
        this._searchService = _searchService;
        this._activatedRoute = _activatedRoute;
        this._routerExtensions = _routerExtensions;
        this._componentService = _componentService;
        this.isDone = false;
        this.isBusy = true;
        this.isIOS = false;
        this.isAndroid = false;
        this.isLoadingItems = false;
        this.lastId = 0;
        this.lists = [];
        this.numberOfAddedItems = 0;
        this.page = 1;
        this.limit = 15;
        this.totalRows = 100;
        this.query = '';
        this.selectedGender = 0;
        this.selectedCountry = 0;
        this.selectedBandsNeeded = 0;
        this.isIOS = (application.ios) ? true : false;
        this.isAndroid = (application.android) ? true : false;
        this.navOptions = this._componentService.getRouteOptions();
        // this._activatedRoute.queryParams.subscribe(params => {
        //     this.projectId = params['projectId'];
        //     this.dateStart = params['dateStart'];
        // })
        this.projectId = this.params.context.projectId;
        this.dateStart = this.params.context.dateStart;
        this.initDDValues();
    }
    SelectListComponent.prototype.ngOnInit = function () {
        this.layout = new nativescript_ui_listview_1.ListViewLinearLayout();
        this.layout.scrollDirection = "Vertical";
        this.searchStudents();
        this._changeDetectionRef.detectChanges();
    };
    SelectListComponent.prototype.initDDValues = function () {
        this.genders = new nativescript_drop_down_1.ValueList();
        this.countries = new nativescript_drop_down_1.ValueList();
        this.bands = new nativescript_drop_down_1.ValueList();
        var genders = [{ value: 'All', display: 'Gender' }, { value: 'Male', display: 'Male' }, { value: 'Female', display: 'Female' }];
        var countries = [{ value: 'All', display: 'Country' }, { value: 'Guatemala', display: 'Guatemala' }, { value: 'Zimbabwe', display: 'Zimbabwe' }];
        var bands = [{ value: 'All', display: 'Bands' }, { value: '0-300', display: '0-300' }, { value: '300-700', display: '300-700' }, { value: '700+', display: '700+' }];
        for (var g = 0; g < genders.length; g++) {
            this.genders.push(genders[g]);
        }
        for (var c = 0; c < countries.length; c++) {
            this.countries.push(countries[c]);
        }
        for (var b = 0; b < bands.length; b++) {
            this.bands.push(bands[b]);
        }
        this.genderFilter = this.genders.getValue(this.selectedGender);
        this.countryFilter = this.countries.getValue(this.selectedCountry);
        this.bandsFilter = this.bands.getValue(this.selectedBandsNeeded);
    };
    SelectListComponent.prototype.openStudentInfo = function (student) {
        var _this = this;
        var opt = {
            context: {
                studentId: student.studentId,
                type: 'project-approved'
            },
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true,
            transition: {
                name: "slideLeft",
                duration: 200,
                curve: "ease"
            }
        };
        this.modal.showModal(student_info_modal_component_1.StudentInfoModalComponent, opt).then(function (res) {
            if (res.success) {
                _this._componentService.showLoader('Completing...');
                _this._componentService.saveSelectedStudent(res.data);
                setTimeout(function () {
                    _this._componentService.hideLoader();
                    _this.onClose();
                }, 800);
            }
        });
    };
    SelectListComponent.prototype.onClose = function () {
        this.params.closeCallback({
            success: true,
            projectId: this.projectId,
            dateStart: this.dateStart
        });
    };
    SelectListComponent.prototype.refresh = function (args) {
        this.resetParams();
        this.searchStudents();
    };
    SelectListComponent.prototype.loadMoreItems = function (args) {
        this.limit = 15;
        this.page += 1;
        this.isLoadingItems = true;
        this.searchStudents();
    };
    SelectListComponent.prototype.onSearch = function (args) {
        if (args.object.android) {
            args.object.dismissSoftInput();
            args.object.android.clearFocus();
            args.object.android.setFocusable(false);
        }
        var searchBar = args.object;
        if (searchBar.text.length < 4) {
            this._componentService.showAlert("Ooops!", "Search query too short. Try to search more than 4 letters");
        }
        else {
            this.query = searchBar.text;
            if (!this.query) {
                return;
            }
            this.resetParams();
            this.searchStudents();
        }
    };
    SelectListComponent.prototype.onDDChange = function (name) {
        if (name === 'gender') {
            this.genderFilter = this.genders.getValue(this.selectedGender);
        }
        else if (name === 'country') {
            this.countryFilter = this.countries.getValue(this.selectedCountry);
        }
        else if (name === 'bands') {
            this.bandsFilter = this.bands.getValue(this.selectedBandsNeeded);
        }
        this.resetParams();
        this.searchStudents();
    };
    SelectListComponent.prototype.resetParams = function () {
        this.lastId = 0;
        this.page = 1;
        this.lists = [];
        this.isDone = false;
        this.isBusy = true;
    };
    SelectListComponent.prototype.getAge = function (birthDate) {
        var date = new Date(birthDate);
        return 'Age: ' + moment().diff(date, 'years');
    };
    SelectListComponent.prototype.toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
    SelectListComponent.prototype.searchStudents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, i, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._searchService.searchAvailableStudent(this.page, this.limit, this.query, this.lastId, this.genderFilter, this.countryFilter, this.bandsFilter)];
                    case 1:
                        res = _a.sent();
                        this.isBusy = false;
                        this.isLoadingItems = false;
                        this.totalRows = res.totalRows;
                        this.lastId = (res.data.length > 0) ? res.data[res.data.length - 1].studentId : 0;
                        if (res.data.length > 0) {
                            for (i = 0; i < res.data.length; i++) {
                                res.data[i].country = this.toTitleCase(res.data[i].country);
                                res.data[i].firstName = this._componentService.decodeUTF8(res.data[i].firstName);
                                res.data[i].lastName = this._componentService.decodeUTF8(res.data[i].lastName);
                                res.data[i].imageUrl = this._componentService.getImageProfileV2(res.data[i].imageUrl);
                                this.lists.push(res.data[i]);
                            }
                        }
                        if (this.lists.length === this.totalRows) {
                            this.listViewComp.listView.notifyLoadOnDemandFinished(true);
                        }
                        setTimeout(function () {
                            _this.listViewComp.listView.notifyLoadOnDemandFinished();
                            _this.listViewComp.listView.notifyPullToRefreshFinished();
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.isBusy = false;
                        this.isLoadingItems = false;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild('myListView'),
        __metadata("design:type", angular_1.RadListViewComponent)
    ], SelectListComponent.prototype, "listViewComp", void 0);
    SelectListComponent = __decorate([
        core_1.Component({
            selector: "selectlist-page",
            moduleId: module.id,
            templateUrl: "./selectlist-page.component.html",
            styleUrls: ['./selectlist-page.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            core_1.ViewContainerRef,
            core_1.ChangeDetectorRef,
            dialogs_2.ModalDialogService,
            dialogs_1.ModalDialogParams,
            search_service_1.SearchService,
            router_1.ActivatedRoute,
            router_2.RouterExtensions,
            component_event_service_1.ComponentEventService])
    ], SelectListComponent);
    return SelectListComponent;
}());
exports.SelectListComponent = SelectListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0bGlzdC1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlbGVjdGxpc3QtcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFrRztBQUNsRywwQ0FBaUQ7QUFDakQsc0RBQTBFO0FBRzFFLGlEQUFnRDtBQUNoRCxtR0FBK0Y7QUFDL0YsaUVBQWtGO0FBRWxGLHFFQUFrSDtBQUNsSCw0REFBd0U7QUFFeEUsU0FBUztBQUNULCtCQUFpQztBQUNqQywwREFBNEQ7QUFLNUQsV0FBVztBQUNYLGdFQUE4RDtBQUM5RCxtRUFBNEU7QUFDNUUsbUVBQTZFO0FBQzdFLGtGQUErRTtBQVEvRTtJQW1DSSw2QkFDWSxLQUFXLEVBQ1gsS0FBdUIsRUFDdkIsbUJBQXNDLEVBRXRDLEtBQXlCLEVBQ3pCLE1BQXlCLEVBQ3pCLGNBQTZCLEVBQzdCLGVBQStCLEVBQy9CLGlCQUFtQyxFQUNuQyxpQkFBd0M7UUFUeEMsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFFdEMsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0Isb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQTNDcEQsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLFVBQUssR0FBWSxLQUFLLENBQUM7UUFDdkIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUdoQyxXQUFN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SW5pdCwgVmlld0NvbnRhaW5lclJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2VSb3V0ZSwgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBTdHVkZW50SW5mb01vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4uL3N0dWRlbnQtaW5mby1tb2RhbC9zdHVkZW50LWluZm8tbW9kYWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSwgVmFsdWVMaXN0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcblxuaW1wb3J0IHsgTGlzdFZpZXdMaW5lYXJMYXlvdXQsIExpc3RWaWV3RXZlbnREYXRhLCBMb2FkT25EZW1hbmRMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXdcIjtcbmltcG9ydCB7IFJhZExpc3RWaWV3Q29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlldy9hbmd1bGFyXCI7XG5cbi8vIE9USEVSU1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5cbi8vIE1PREVMU1xuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3R1ZGVudC5tb2RlbFwiO1xuXG4vLyBTRVJWSUNFU1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zZWFyY2guc2VydmljZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBDb21wb25lbnRFdmVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29tcG9uZW50LWV2ZW50LnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic2VsZWN0bGlzdC1wYWdlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NlbGVjdGxpc3QtcGFnZS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL3NlbGVjdGxpc3QtcGFnZS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgaXNEb25lOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcbiAgICBpc0lPUzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzQW5kcm9pZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzTG9hZGluZ0l0ZW1zOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcm9qZWN0SWQ6IG51bWJlcjtcbiAgICBsYXN0SWQ6IG51bWJlciA9IDA7XG4gICAgZGF0ZVN0YXJ0OiBzdHJpbmc7XG5cbiAgICBsYXlvdXQ6IExpc3RWaWV3TGluZWFyTGF5b3V0O1xuXG4gICAgbGlzdHM6IGFueSA9IFtdO1xuICAgIG51bWJlck9mQWRkZWRJdGVtczogbnVtYmVyID0gMDtcbiAgICBwYWdlOiBudW1iZXIgPSAxO1xuICAgIGxpbWl0OiBudW1iZXIgPSAxNTtcbiAgICB0b3RhbFJvd3M6IG51bWJlciA9IDEwMDtcbiAgICBxdWVyeTogc3RyaW5nID0gJyc7XG4gICAgZ2VuZGVyRmlsdGVyOiBzdHJpbmc7XG4gICAgY291bnRyeUZpbHRlcjogc3RyaW5nO1xuICAgIGJhbmRzRmlsdGVyOiBzdHJpbmc7XG4gICAgXG4gICAgbmF2T3B0aW9uczogYW55O1xuXG4gICAgZ2VuZGVyczogVmFsdWVMaXN0PGFueT47XG4gICAgY291bnRyaWVzOiBWYWx1ZUxpc3Q8YW55PjtcbiAgICBiYW5kczogVmFsdWVMaXN0PGFueT47XG4gICAgc2VsZWN0ZWRHZW5kZXI6IG51bWJlciA9IDA7XG4gICAgc2VsZWN0ZWRDb3VudHJ5OiBudW1iZXIgPSAwO1xuICAgIHNlbGVjdGVkQmFuZHNOZWVkZWQ6IG51bWJlciA9IDA7XG5cbiAgICBAVmlld0NoaWxkKCdteUxpc3RWaWV3JykgbGlzdFZpZXdDb21wOiBSYWRMaXN0Vmlld0NvbXBvbmVudDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxuXG4gICAgICAgIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxuICAgICAgICBwcml2YXRlIF9zZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9hY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcbiAgICApIHtcblxuICAgICAgICB0aGlzLmlzSU9TID0gKGFwcGxpY2F0aW9uLmlvcyk/IHRydWUgOiBmYWxzZVxuICAgICAgICB0aGlzLmlzQW5kcm9pZCA9IChhcHBsaWNhdGlvbi5hbmRyb2lkKT8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB0aGlzLm5hdk9wdGlvbnMgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldFJvdXRlT3B0aW9ucygpO1xuXG4gICAgICAgIC8vIHRoaXMuX2FjdGl2YXRlZFJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy5wcm9qZWN0SWQgPSBwYXJhbXNbJ3Byb2plY3RJZCddO1xuICAgICAgICAvLyAgICAgdGhpcy5kYXRlU3RhcnQgPSBwYXJhbXNbJ2RhdGVTdGFydCddO1xuICAgICAgICAvLyB9KVxuXG4gICAgICAgIHRoaXMucHJvamVjdElkID0gdGhpcy5wYXJhbXMuY29udGV4dC5wcm9qZWN0SWQ7XG4gICAgICAgIHRoaXMuZGF0ZVN0YXJ0ID0gdGhpcy5wYXJhbXMuY29udGV4dC5kYXRlU3RhcnQ7XG5cbiAgICAgICAgdGhpcy5pbml0RERWYWx1ZXMoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBuZXcgTGlzdFZpZXdMaW5lYXJMYXlvdXQoKTtcbiAgICAgICAgdGhpcy5sYXlvdXQuc2Nyb2xsRGlyZWN0aW9uID0gXCJWZXJ0aWNhbFwiO1xuICAgICAgICB0aGlzLnNlYXJjaFN0dWRlbnRzKCk7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgaW5pdEREVmFsdWVzKCkge1xuICAgICAgICB0aGlzLmdlbmRlcnMgPSBuZXcgVmFsdWVMaXN0PGFueT4oKTtcbiAgICAgICAgdGhpcy5jb3VudHJpZXMgPSBuZXcgVmFsdWVMaXN0PGFueT4oKTtcbiAgICAgICAgdGhpcy5iYW5kcyA9IG5ldyBWYWx1ZUxpc3Q8YW55PigpO1xuXG4gICAgICAgIGxldCBnZW5kZXJzICAgPSBbeyB2YWx1ZTogJ0FsbCcsIGRpc3BsYXk6ICdHZW5kZXInIH0sIHsgdmFsdWU6ICdNYWxlJywgZGlzcGxheTogJ01hbGUnIH0sIHsgdmFsdWU6ICdGZW1hbGUnLCBkaXNwbGF5OiAnRmVtYWxlJyB9XTtcbiAgICAgICAgbGV0IGNvdW50cmllcyA9IFt7IHZhbHVlOiAnQWxsJywgZGlzcGxheTogJ0NvdW50cnknIH0sIHsgdmFsdWU6ICdHdWF0ZW1hbGEnLCBkaXNwbGF5OiAnR3VhdGVtYWxhJyB9LCB7IHZhbHVlOiAnWmltYmFid2UnLCBkaXNwbGF5OiAnWmltYmFid2UnIH1dO1xuICAgICAgICBsZXQgYmFuZHMgICAgID0gW3sgdmFsdWU6ICdBbGwnLCBkaXNwbGF5OiAnQmFuZHMnIH0sIHsgdmFsdWU6ICcwLTMwMCcsIGRpc3BsYXk6ICcwLTMwMCcgfSwgeyB2YWx1ZTogJzMwMC03MDAnLCBkaXNwbGF5OiAnMzAwLTcwMCcgfSwgeyB2YWx1ZTogJzcwMCsnLCBkaXNwbGF5OiAnNzAwKycgfV1cblxuICAgICAgICBmb3IobGV0IGcgPSAwOyBnIDwgZ2VuZGVycy5sZW5ndGg7IGcrKykge1xuICAgICAgICAgICAgdGhpcy5nZW5kZXJzLnB1c2goZ2VuZGVyc1tnXSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGMgPSAwOyBjIDwgY291bnRyaWVzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50cmllcy5wdXNoKGNvdW50cmllc1tjXSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGIgPSAwOyBiIDwgYmFuZHMubGVuZ3RoOyBiKyspIHtcbiAgICAgICAgICAgIHRoaXMuYmFuZHMucHVzaChiYW5kc1tiXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdlbmRlckZpbHRlciA9IHRoaXMuZ2VuZGVycy5nZXRWYWx1ZSh0aGlzLnNlbGVjdGVkR2VuZGVyKVxuICAgICAgICB0aGlzLmNvdW50cnlGaWx0ZXIgPSB0aGlzLmNvdW50cmllcy5nZXRWYWx1ZSh0aGlzLnNlbGVjdGVkQ291bnRyeSlcbiAgICAgICAgdGhpcy5iYW5kc0ZpbHRlciA9IHRoaXMuYmFuZHMuZ2V0VmFsdWUodGhpcy5zZWxlY3RlZEJhbmRzTmVlZGVkKVxuICAgIH1cblxuICAgIG9wZW5TdHVkZW50SW5mbyhzdHVkZW50KSB7XG4gICAgICAgIGxldCBvcHQgPSB7XG4gICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgc3R1ZGVudElkOiBzdHVkZW50LnN0dWRlbnRJZCxcbiAgICAgICAgICAgICAgICB0eXBlOiAncHJvamVjdC1hcHByb3ZlZCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZUxlZnRcIixcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcbiAgICAgICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoU3R1ZGVudEluZm9Nb2RhbENvbXBvbmVudCwgb3B0KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBpZihyZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignQ29tcGxldGluZy4uLicpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2F2ZVNlbGVjdGVkU3R1ZGVudChyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcblxuICAgICAgICAgICAgICAgIH0sIDgwMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25DbG9zZSgpe1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHsgXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLCBcbiAgICAgICAgICAgIHByb2plY3RJZDogdGhpcy5wcm9qZWN0SWQsXG4gICAgICAgICAgICBkYXRlU3RhcnQ6IHRoaXMuZGF0ZVN0YXJ0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZnJlc2goYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcbiAgICAgICAgdGhpcy5yZXNldFBhcmFtcygpO1xuICAgICAgICB0aGlzLnNlYXJjaFN0dWRlbnRzKClcbiAgICB9XG5cbiAgICBsb2FkTW9yZUl0ZW1zKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG5cbiAgICAgICAgdGhpcy5saW1pdCA9IDE1O1xuICAgICAgICB0aGlzLnBhZ2UgKz0gMTtcblxuICAgICAgICB0aGlzLmlzTG9hZGluZ0l0ZW1zID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnNlYXJjaFN0dWRlbnRzKCk7XG4gICAgfVxuXG4gICAgb25TZWFyY2goYXJncykge1xuICAgICAgICBpZiAoYXJncy5vYmplY3QuYW5kcm9pZCkge1xuICAgICAgICAgICAgYXJncy5vYmplY3QuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICAgICAgYXJncy5vYmplY3QuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgICAgICBhcmdzLm9iamVjdC5hbmRyb2lkLnNldEZvY3VzYWJsZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIGlmKHNlYXJjaEJhci50ZXh0Lmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KFwiT29vcHMhXCIsIFwiU2VhcmNoIHF1ZXJ5IHRvbyBzaG9ydC4gVHJ5IHRvIHNlYXJjaCBtb3JlIHRoYW4gNCBsZXR0ZXJzXCIpXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSBzZWFyY2hCYXIudGV4dDtcblxuICAgICAgICAgICAgaWYoIXRoaXMucXVlcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVzZXRQYXJhbXMoKTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU3R1ZGVudHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRERDaGFuZ2UobmFtZSkge1xuICAgICAgICBpZihuYW1lID09PSAnZ2VuZGVyJykge1xuICAgICAgICAgICAgdGhpcy5nZW5kZXJGaWx0ZXIgPSB0aGlzLmdlbmRlcnMuZ2V0VmFsdWUodGhpcy5zZWxlY3RlZEdlbmRlcik7XG4gICAgICAgIH1lbHNlIGlmKG5hbWUgPT09ICdjb3VudHJ5Jykge1xuICAgICAgICAgICAgdGhpcy5jb3VudHJ5RmlsdGVyID0gdGhpcy5jb3VudHJpZXMuZ2V0VmFsdWUodGhpcy5zZWxlY3RlZENvdW50cnkpO1xuICAgICAgICB9ZWxzZSBpZihuYW1lID09PSAnYmFuZHMnKSB7XG4gICAgICAgICAgICB0aGlzLmJhbmRzRmlsdGVyID0gdGhpcy5iYW5kcy5nZXRWYWx1ZSh0aGlzLnNlbGVjdGVkQmFuZHNOZWVkZWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlc2V0UGFyYW1zKCk7XG4gICAgICAgIHRoaXMuc2VhcmNoU3R1ZGVudHMoKTtcbiAgICB9XG5cbiAgICByZXNldFBhcmFtcygpIHtcbiAgICAgICAgdGhpcy5sYXN0SWQgPSAwO1xuICAgICAgICB0aGlzLnBhZ2UgPSAxO1xuICAgICAgICB0aGlzLmxpc3RzID0gW107XG4gICAgICAgIHRoaXMuaXNEb25lID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRBZ2UoYmlydGhEYXRlKSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoYmlydGhEYXRlKTtcblxuICAgICAgICByZXR1cm4gJ0FnZTogJyArIG1vbWVudCgpLmRpZmYoZGF0ZSwgJ3llYXJzJyk7XG4gICAgfVxuXG4gICAgdG9UaXRsZUNhc2Uoc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFx3XFxTKi9nLCBmdW5jdGlvbih0eHQpe1xuICAgICAgICAgICAgcmV0dXJuIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2VhcmNoU3R1ZGVudHMoKSB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9zZWFyY2hTZXJ2aWNlLnNlYXJjaEF2YWlsYWJsZVN0dWRlbnQodGhpcy5wYWdlLCB0aGlzLmxpbWl0LCB0aGlzLnF1ZXJ5LCB0aGlzLmxhc3RJZCwgdGhpcy5nZW5kZXJGaWx0ZXIsIHRoaXMuY291bnRyeUZpbHRlciwgdGhpcy5iYW5kc0ZpbHRlcik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZ0l0ZW1zID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnRvdGFsUm93cyA9IHJlcy50b3RhbFJvd3M7XG5cbiAgICAgICAgICAgIHRoaXMubGFzdElkID0gKHJlcy5kYXRhLmxlbmd0aCA+IDApPyByZXMuZGF0YVtyZXMuZGF0YS5sZW5ndGggLSAxXS5zdHVkZW50SWQgOiAwO1xuXG4gICAgICAgICAgICBpZihyZXMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxyZXMuZGF0YS5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhW2ldLmNvdW50cnkgPSB0aGlzLnRvVGl0bGVDYXNlKHJlcy5kYXRhW2ldLmNvdW50cnkpO1xuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVtpXS5maXJzdE5hbWUgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmRlY29kZVVURjgocmVzLmRhdGFbaV0uZmlyc3ROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGFbaV0ubGFzdE5hbWUgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmRlY29kZVVURjgocmVzLmRhdGFbaV0ubGFzdE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVtpXS5pbWFnZVVybCA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0SW1hZ2VQcm9maWxlVjIocmVzLmRhdGFbaV0uaW1hZ2VVcmwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RzLnB1c2gocmVzLmRhdGFbaV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0aGlzLmxpc3RzLmxlbmd0aCA9PT0gdGhpcy50b3RhbFJvd3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RWaWV3Q29tcC5saXN0Vmlldy5ub3RpZnlMb2FkT25EZW1hbmRGaW5pc2hlZCh0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0Vmlld0NvbXAubGlzdFZpZXcubm90aWZ5TG9hZE9uRGVtYW5kRmluaXNoZWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RWaWV3Q29tcC5saXN0Vmlldy5ub3RpZnlQdWxsVG9SZWZyZXNoRmluaXNoZWQoKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZ0l0ZW1zID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5cbiJdfQ==