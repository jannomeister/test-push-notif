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
var segmented_bar_1 = require("ui/segmented-bar");
var router_1 = require("nativescript-angular/router");
var student_info_modal_component_1 = require("../student-info-modal/student-info-modal.component");
// SERVICES
var user_service_1 = require("../../services/user.service");
var search_service_1 = require("../../services/search.service");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var component_event_service_1 = require("../../services/component-event.service");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(vcRef, modal, _routerExtensions, _userService, _searchService, _componentService) {
        this.vcRef = vcRef;
        this.modal = modal;
        this._routerExtensions = _routerExtensions;
        this._userService = _userService;
        this._searchService = _searchService;
        this._componentService = _componentService;
        this.selectedIndex = 0;
        this.visibility1 = true;
        this.visibility2 = false;
        this.visibility3 = false;
        this.categories = ['All', 'Student', 'Projects'];
        /* DATA TO DISPLAY */
        this.isEmpty = false;
        this.isInitialized = true;
        this.isSearchBusy = false;
        this.lists = [];
        this.studentLists = [];
        this.projectLists = [];
        this.lastId = 0;
        this.pageList = 1;
        this.pageStudentList = 1;
        this.pageProjectList = 1;
        this.limit = 2;
        this.orderBy = 'DESC';
        this.items = [];
        for (var i = 0; i < this.categories.length; i++) {
            var segmentedBarItem = new segmented_bar_1.SegmentedBarItem();
            segmentedBarItem.title = this.categories[i];
            this.items.push(segmentedBarItem);
        }
        this.selectedIndex = 0;
        this.listenSearchBarTextChange();
    }
    SearchComponent.prototype.ngOnInit = function () { };
    SearchComponent.prototype.goTo = function (data, type) {
        if (type === 'project') {
            this.openProjectInfo(data);
        }
        else {
            this.openStudentInfo(data);
        }
    };
    SearchComponent.prototype.openProjectInfo = function (data) {
        this._routerExtensions.navigate(['/project', data.projectId], {
            animated: true,
            transition: {
                name: "slideLeft",
                duration: 200,
                curve: "ease"
            }
        });
    };
    SearchComponent.prototype.openStudentInfo = function (data) {
        var opt = {
            context: {
                studentId: data.studentId,
                type: 'search-student'
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
            console.log(res);
        });
    };
    SearchComponent.prototype.listenSearchBarTextChange = function () {
        var _this = this;
        this._componentService.searchQuery.subscribe(function (searchQuery) {
            _this.searchQuery = searchQuery;
            _this.onSearch();
        });
    };
    SearchComponent.prototype.onSelectedIndexChange = function (args) {
        var segmetedBar = args.object;
        this.selectedIndex = segmetedBar.selectedIndex;
        switch (this.selectedIndex) {
            case 0:
                if (this.searchQuery) {
                    this.pageList = 1;
                    this.lists = [];
                    this.isInitialized = false;
                    this.searchAll();
                }
                this.visibility1 = true;
                this.visibility2 = false;
                this.visibility3 = false;
                break;
            case 1:
                if (this.searchQuery) {
                    this.pageStudentList = 1;
                    this.studentLists = [];
                    this.isInitialized = false;
                    this.searchStudents();
                }
                this.visibility1 = false;
                this.visibility2 = true;
                this.visibility3 = false;
                break;
            case 2:
                if (this.searchQuery) {
                    this.pageProjectList = 1;
                    this.projectLists = [];
                    this.isInitialized = false;
                    this.searchProjects();
                }
                this.visibility1 = false;
                this.visibility2 = false;
                this.visibility3 = true;
                break;
            default:
                break;
        }
    };
    SearchComponent.prototype.alltemplateSelector = function (item, index, items) {
        if (item.searchType === "project") {
            return "project";
        }
        if (item.searchType === "student") {
            return "student";
        }
        throw new Error("Unrecognized template!");
    };
    SearchComponent.prototype.loadMoreItems = function (tab) {
        if (tab === 'all') {
            this.pageList += 1;
            this.searchAll();
        }
        else if (tab === 'student') {
            this.pageStudentList += 1;
            this.searchStudents();
        }
        else if (tab === 'project') {
            this.pageProjectList += 1;
            this.searchProjects();
        }
    };
    SearchComponent.prototype.onSearch = function () {
        if (this.selectedIndex === 0) {
            this.pageList = 1;
            this.lists = [];
            this.isEmpty = false;
            this.isInitialized = false;
            this.searchAll();
        }
        else if (this.selectedIndex === 1) {
            this.pageStudentList = 1;
            this.studentLists = [];
            this.isEmpty = false;
            this.isInitialized = false;
            this.searchStudents();
        }
        else if (this.selectedIndex === 2) {
            this.pageProjectList = 1;
            this.projectLists = [];
            this.isEmpty = false;
            this.isInitialized = false;
            this.searchProjects();
        }
    };
    SearchComponent.prototype.searchAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, i, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._searchService.searchAll(this.searchQuery, this.pageList, this.limit + 3, this.orderBy)];
                    case 1:
                        res = _a.sent();
                        this.isInitialized = true;
                        if (res.data.length > 0) {
                            for (i = 0; i < res.data.length; i++) {
                                res.data[i].name = this._componentService.decodeUTF8(res.data[i].name);
                                res.data[i].imageUrl = this._componentService.getImageProfileV2(res.data[i].imageUrl);
                                this.lists.push(res.data[i]);
                            }
                        }
                        this.isEmpty = (this.lists.length === 0) ? true : false;
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
    SearchComponent.prototype.searchStudents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, i, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._searchService.searchAvailableStudent(this.pageStudentList, this.limit + 8, this.searchQuery, this.lastId, '', '', '')];
                    case 1:
                        res = _a.sent();
                        this.isInitialized = true;
                        this.lastId = (res.data.length > 0) ? res.data[res.data.length - 1].studentId : 0;
                        if (res.data) {
                            for (i = 0; i < res.data.length; i++) {
                                res.data[i].firstName = this._componentService.decodeUTF8(res.data[i].firstName);
                                res.data[i].lastName = this._componentService.decodeUTF8(res.data[i].lastName);
                                res.data[i].imageUrl = this._componentService.getImageProfileV2(res.data[i].imageUrl);
                                this.studentLists.push(res.data[i]);
                            }
                        }
                        this.isEmpty = (this.studentLists.length === 0) ? true : false;
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        this.isInitialized = true;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SearchComponent.prototype.searchProjects = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, i, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._searchService.searchProjects(this.searchQuery, this.pageProjectList, this.limit + 8, this.orderBy)];
                    case 1:
                        res = _a.sent();
                        this.isInitialized = true;
                        if (res.data) {
                            for (i = 0; i < res.data.length; i++) {
                                res.data[i].imageUrl = this._componentService.getImageProfileV2(res.data[i].imageUrl);
                                this.projectLists.push(res.data[i]);
                            }
                        }
                        this.isEmpty = (this.projectLists.length === 0) ? true : false;
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        this.isInitialized = true;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: "general-search",
            moduleId: module.id,
            templateUrl: "./general-search.component.html",
            styleUrls: ['./general-search.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef,
            dialogs_1.ModalDialogService,
            router_1.RouterExtensions,
            user_service_1.UserService,
            search_service_1.SearchService,
            component_event_service_1.ComponentEventService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhbC1zZWFyY2guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2VuZXJhbC1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFFcEUsa0RBQWtFO0FBQ2xFLHNEQUErRDtBQUUvRCxtR0FBK0Y7QUFFL0YsV0FBVztBQUNYLDREQUEwRDtBQUMxRCxnRUFBOEQ7QUFDOUQsbUVBQTZFO0FBQzdFLGtGQUErRTtBQVcvRTtJQTJCSSx5QkFDWSxLQUF1QixFQUN2QixLQUF5QixFQUN6QixpQkFBbUMsRUFDbkMsWUFBeUIsRUFDekIsY0FBNkIsRUFDN0IsaUJBQXdDO1FBTHhDLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQTdCcEQsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFcEIsZUFBVSxHQUFRLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVqRCxxQkFBcUI7UUFDckIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixVQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ2hCLGlCQUFZLEdBQVEsRUFBRSxDQUFDO1FBQ3ZCLGlCQUFZLEdBQVEsRUFBRSxDQUFDO1FBQ3ZCLFdBQU0sR0FB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RyxJQUFJLENBQUM7d0JBQzFCLElBQUcsR0FBRyxDQUFDLElBQUksRUFBRTs0QkFDVCxLQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dDQUVyQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FFdEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBOzZCQUN0Qzt5QkFDSjt3QkFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDOzs7O3dCQUU5RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzs7Ozs7O0tBRWpDO0lBNVFRLGVBQWU7UUFOM0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7U0FDaEQsQ0FBQzt5Q0E2QnFCLHVCQUFnQjtZQUNoQiw0QkFBa0I7WUFDTix5QkFBZ0I7WUFDckIsMEJBQVc7WUFDVCw4QkFBYTtZQUNWLCtDQUFxQjtPQWpDM0MsZUFBZSxDQTZRM0I7SUFBRCxzQkFBQztDQUFBLEFBN1FELElBNlFDO0FBN1FZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW0gfSBmcm9tIFwidWkvc2VnbWVudGVkLWJhclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQgeyBTdHVkZW50SW5mb01vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4uL3N0dWRlbnQtaW5mby1tb2RhbC9zdHVkZW50LWluZm8tbW9kYWwuY29tcG9uZW50XCI7XG5cbi8vIFNFUlZJQ0VTXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2VhcmNoLnNlcnZpY2VcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuXG5cbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiZ2VuZXJhbC1zZWFyY2hcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vZ2VuZXJhbC1zZWFyY2guY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9nZW5lcmFsLXNlYXJjaC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICAvKiBTRUdNRU5UIEJBUiBWQVJJQUJMRVMgKi9cbiAgICBpdGVtczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XG4gICAgc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgdmlzaWJpbGl0eTEgPSB0cnVlO1xuICAgIHZpc2liaWxpdHkyID0gZmFsc2U7XG4gICAgdmlzaWJpbGl0eTMgPSBmYWxzZTtcblxuICAgIGNhdGVnb3JpZXM6IGFueSA9IFsnQWxsJywgJ1N0dWRlbnQnLCAnUHJvamVjdHMnXTtcblxuICAgIC8qIERBVEEgVE8gRElTUExBWSAqL1xuICAgIGlzRW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc0luaXRpYWxpemVkOiBib29sZWFuID0gdHJ1ZTtcbiAgICBpc1NlYXJjaEJ1c3k6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBsaXN0czogYW55ID0gW107XG4gICAgc3R1ZGVudExpc3RzOiBhbnkgPSBbXTtcbiAgICBwcm9qZWN0TGlzdHM6IGFueSA9IFtdO1xuICAgIGxhc3RJZDogbnVtYmVyID0gMDtcbiAgICBwYWdlTGlzdDogbnVtYmVyID0gMTtcbiAgICBwYWdlU3R1ZGVudExpc3Q6IG51bWJlciA9IDE7XG4gICAgcGFnZVByb2plY3RMaXN0OiBudW1iZXIgPSAxO1xuICAgIGxpbWl0OiBudW1iZXIgPSAyO1xuICAgIG9yZGVyQnk6IHN0cmluZyA9ICdERVNDJztcblxuICAgIHNlYXJjaFF1ZXJ5OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3NlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcbiAgICApIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuY2F0ZWdvcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNlZ21lbnRlZEJhckl0ZW0gPSA8U2VnbWVudGVkQmFySXRlbT5uZXcgU2VnbWVudGVkQmFySXRlbSgpO1xuICAgICAgICAgICAgc2VnbWVudGVkQmFySXRlbS50aXRsZSA9IHRoaXMuY2F0ZWdvcmllc1tpXTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChzZWdtZW50ZWRCYXJJdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XG5cbiAgICAgICAgdGhpcy5saXN0ZW5TZWFyY2hCYXJUZXh0Q2hhbmdlKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7fVxuXG4gICAgZ29UbyhkYXRhLCB0eXBlKSB7XG4gICAgICAgIGlmKHR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5vcGVuUHJvamVjdEluZm8oZGF0YSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5vcGVuU3R1ZGVudEluZm8oZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuUHJvamVjdEluZm8oZGF0YSkge1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3Byb2plY3QnLCBkYXRhLnByb2plY3RJZF0se1xuICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZUxlZnRcIixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxuICAgICAgICAgICAgfX0pXG4gICAgfVxuXG4gICAgb3BlblN0dWRlbnRJbmZvKGRhdGEpIHtcbiAgICAgICAgbGV0IG9wdCA9IHtcbiAgICAgICAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgICBzdHVkZW50SWQ6IGRhdGEuc3R1ZGVudElkLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzZWFyY2gtc3R1ZGVudCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZUxlZnRcIixcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcbiAgICAgICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoU3R1ZGVudEluZm9Nb2RhbENvbXBvbmVudCwgb3B0KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgbGlzdGVuU2VhcmNoQmFyVGV4dENoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zZWFyY2hRdWVyeS5zdWJzY3JpYmUoc2VhcmNoUXVlcnkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9IHNlYXJjaFF1ZXJ5O1xuICAgICAgICAgICAgdGhpcy5vblNlYXJjaCgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uU2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XG4gICAgICAgIGxldCBzZWdtZXRlZEJhciA9IDxTZWdtZW50ZWRCYXI+YXJncy5vYmplY3Q7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleDtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zZWFyY2hRdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2VMaXN0ID0gMVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RzID0gW11cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQWxsKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNlYXJjaFF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZVN0dWRlbnRMaXN0ID0gMVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0dWRlbnRMaXN0cyA9IFtdXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFN0dWRlbnRzKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNlYXJjaFF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZVByb2plY3RMaXN0ID0gMVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RMaXN0cyA9IFtdXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFByb2plY3RzKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5MSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eTIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2liaWxpdHkzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGx0ZW1wbGF0ZVNlbGVjdG9yKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgaXRlbXM6IGFueSkge1xuICAgICAgICBpZiAoaXRlbS5zZWFyY2hUeXBlID09PSBcInByb2plY3RcIikge1xuICAgICAgICAgICAgcmV0dXJuIFwicHJvamVjdFwiXG4gICAgICAgIH0gXG4gICAgICAgICAgXG4gICAgICAgIGlmIChpdGVtLnNlYXJjaFR5cGUgPT09IFwic3R1ZGVudFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJzdHVkZW50XCI7XG4gICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5yZWNvZ25pemVkIHRlbXBsYXRlIVwiKVxuICAgIH1cblxuICAgIGxvYWRNb3JlSXRlbXModGFiKSB7XG5cbiAgICAgICAgaWYodGFiID09PSAnYWxsJykge1xuICAgICAgICAgICAgdGhpcy5wYWdlTGlzdCArPSAxO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hBbGwoKTtcblxuICAgICAgICB9ZWxzZSBpZih0YWIgPT09ICdzdHVkZW50Jykge1xuICAgICAgICAgICAgdGhpcy5wYWdlU3R1ZGVudExpc3QgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU3R1ZGVudHMoKTtcblxuICAgICAgICB9ZWxzZSBpZih0YWIgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5wYWdlUHJvamVjdExpc3QgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUHJvamVjdHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2VhcmNoKCkge1xuXG4gICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRJbmRleCA9PT0gMCkge1xuXG4gICAgICAgICAgICB0aGlzLnBhZ2VMaXN0ID0gMVxuICAgICAgICAgICAgdGhpcy5saXN0cyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5pc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoQWxsKCk7XG5cbiAgICAgICAgfWVsc2UgaWYodGhpcy5zZWxlY3RlZEluZGV4ID09PSAxKSB7XG5cbiAgICAgICAgICAgIHRoaXMucGFnZVN0dWRlbnRMaXN0ID0gMVxuICAgICAgICAgICAgdGhpcy5zdHVkZW50TGlzdHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFN0dWRlbnRzKCk7XG5cbiAgICAgICAgfWVsc2UgaWYodGhpcy5zZWxlY3RlZEluZGV4ID09PSAyKSB7XG5cbiAgICAgICAgICAgIHRoaXMucGFnZVByb2plY3RMaXN0ID0gMVxuICAgICAgICAgICAgdGhpcy5wcm9qZWN0TGlzdHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFByb2plY3RzKCk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHNlYXJjaEFsbCgpIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3NlYXJjaFNlcnZpY2Uuc2VhcmNoQWxsKHRoaXMuc2VhcmNoUXVlcnksIHRoaXMucGFnZUxpc3QsIHRoaXMubGltaXQrMywgdGhpcy5vcmRlckJ5KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmKHJlcy5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmVzLmRhdGEubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YVtpXS5uYW1lID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5kZWNvZGVVVEY4KHJlcy5kYXRhW2ldLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhW2ldLmltYWdlVXJsID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRJbWFnZVByb2ZpbGVWMihyZXMuZGF0YVtpXS5pbWFnZVVybCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0cy5wdXNoKHJlcy5kYXRhW2ldKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pc0VtcHR5ID0gKHRoaXMubGlzdHMubGVuZ3RoID09PSAwKT8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHNlYXJjaFN0dWRlbnRzKCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fc2VhcmNoU2VydmljZS5zZWFyY2hBdmFpbGFibGVTdHVkZW50KHRoaXMucGFnZVN0dWRlbnRMaXN0LCB0aGlzLmxpbWl0KzgsIHRoaXMuc2VhcmNoUXVlcnksIHRoaXMubGFzdElkLCAnJywgJycsICcnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0SWQgPSAocmVzLmRhdGEubGVuZ3RoID4gMCk/IHJlcy5kYXRhW3Jlcy5kYXRhLmxlbmd0aCAtIDFdLnN0dWRlbnRJZCA6IDA7XG5cbiAgICAgICAgICAgIGlmKHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHJlcy5kYXRhLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGFbaV0uZmlyc3ROYW1lID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5kZWNvZGVVVEY4KHJlcy5kYXRhW2ldLmZpcnN0TmFtZSlcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGFbaV0ubGFzdE5hbWUgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmRlY29kZVVURjgocmVzLmRhdGFbaV0ubGFzdE5hbWUpXG4gICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhW2ldLmltYWdlVXJsID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRJbWFnZVByb2ZpbGVWMihyZXMuZGF0YVtpXS5pbWFnZVVybCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50TGlzdHMucHVzaChyZXMuZGF0YVtpXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaXNFbXB0eSA9ICh0aGlzLnN0dWRlbnRMaXN0cy5sZW5ndGggPT09IDApPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgc2VhcmNoUHJvamVjdHMoKSB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9zZWFyY2hTZXJ2aWNlLnNlYXJjaFByb2plY3RzKHRoaXMuc2VhcmNoUXVlcnksIHRoaXMucGFnZVByb2plY3RMaXN0LCB0aGlzLmxpbWl0KzgsIHRoaXMub3JkZXJCeSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICBpZihyZXMuZGF0YSkge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZXMuZGF0YS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhW2ldLmltYWdlVXJsID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRJbWFnZVByb2ZpbGVWMihyZXMuZGF0YVtpXS5pbWFnZVVybCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RMaXN0cy5wdXNoKHJlcy5kYXRhW2ldKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pc0VtcHR5ID0gKHRoaXMucHJvamVjdExpc3RzLmxlbmd0aCA9PT0gMCk/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59Il19