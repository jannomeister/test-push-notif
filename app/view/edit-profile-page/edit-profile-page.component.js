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
var router_1 = require("nativescript-angular/router");
var user_service_1 = require("../../services/user.service");
var config_service_1 = require("../../services/config.service");
var component_event_service_1 = require("../../services/component-event.service");
var user_model_1 = require("../../models/user.model");
var moment = require("moment");
var dialogs = require("ui/dialogs");
var EditProfileComponent = /** @class */ (function () {
    function EditProfileComponent(_ngZone, _routerExtensions, _userService, _configService, _componentService) {
        this._ngZone = _ngZone;
        this._routerExtensions = _routerExtensions;
        this._userService = _userService;
        this._configService = _configService;
        this._componentService = _componentService;
        this.userId = 0;
        this.communityRoles = ['Community Leader', 'Community Project', 'Community Member'];
        this.months = [];
        this.days = [];
        this.years = [];
        this.isInitialized = false;
        this.isUserImageEdited = false;
        this.user = new user_model_1.User();
        this.navOptions = this._componentService.getRouteOptions();
    }
    EditProfileComponent.prototype.ngOnInit = function () {
        this.userId = this._userService.getCurrentUserId();
        this.generateMonth();
        this.generateDay();
        this.generateYear();
        this.getUserData();
    };
    EditProfileComponent.prototype.initializeDateDefaultValue = function (birthDate) {
        var date = (birthDate) ? new Date(birthDate) : new Date();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        var monthIndex = (month >= 10) ? this.months.indexOf(month.toString()) : this.months.indexOf('0' + month);
        var dayIndex = (day >= 10) ? this.days.indexOf(day.toString()) : this.days.indexOf('0' + day);
        var yearIndex = this.years.indexOf(year);
        this.selectedMonth = monthIndex;
        this.selectedDay = dayIndex;
        this.selectedYear = yearIndex;
    };
    EditProfileComponent.prototype.generateMonth = function () {
        for (var i = 1; i <= 12; i++) {
            var data = (i >= 10) ? i.toString() : '0' + i;
            this.months.push(data);
        }
    };
    EditProfileComponent.prototype.generateDay = function () {
        for (var i = 1; i <= 31; i++) {
            var data = (i >= 10) ? i.toString() : '0' + i;
            this.days.push(data);
        }
    };
    EditProfileComponent.prototype.generateYear = function () {
        var currentYear = new Date().getFullYear();
        var startYear = 1905;
        while (startYear <= currentYear) {
            this.years.push(startYear++);
        }
    };
    EditProfileComponent.prototype.onCommunityRolechange = function (event) {
        this.selectedCommunityRole = event.newIndex;
        this.user.communityRole = this.communityRoles[event.newIndex];
    };
    EditProfileComponent.prototype.onMonthchange = function (event) {
        this.selectedMonth = event.newIndex;
    };
    EditProfileComponent.prototype.onDaychange = function (event) {
        this.selectedDay = event.newIndex;
    };
    EditProfileComponent.prototype.onYearchange = function (event) {
        this.selectedYear = event.newIndex;
    };
    EditProfileComponent.prototype.changePicture = function () {
        var _this = this;
        this._componentService.changeImage(150, 150)
            .then(function (result) {
            _this.isUserImageEdited = true;
            _this.userImage = result;
            _this.changeConfirmationDialog();
        })
            .catch(function (err) {
            console.log("CAMERA/GALLERY: " + err);
        });
    };
    EditProfileComponent.prototype.changeConfirmationDialog = function () {
        var _this = this;
        dialogs.confirm({
            title: "Confirmation",
            message: "Are you sure you want to use this picture?",
            okButtonText: "Yes",
            cancelButtonText: "No",
        }).then(function (result) {
            console.log('IMAGE::::');
            console.log(_this.userImage);
            if (result) {
                _this.saveImage();
            }
            else {
                _this.revert();
            }
        });
    };
    EditProfileComponent.prototype.saveImage = function () {
        this.uploadImage();
    };
    EditProfileComponent.prototype.revert = function () {
        this.userImage = this._componentService.getImageProfile(this.originalUserImage);
        this.isUserImageEdited = false;
    };
    EditProfileComponent.prototype.uploadImage = function () {
        var _this = this;
        this._componentService.showLoader('Uploading...');
        this._componentService.uploadImage(this.userId, 'user', this.userImage)
            .then(function (result) {
            _this._componentService.hideLoader();
            if (result.success) {
                console.log('RESULT DATA ***');
                console.log(result.data);
                _this._ngZone.run(function () {
                    _this.originalUserImage = result.data;
                    _this.user.imageUrl = _this.originalUserImage;
                    _this.userImage = _this._componentService.getImageProfile(result.data);
                    _this.isUserImageEdited = false;
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
    EditProfileComponent.prototype.save = function () {
        var _this = this;
        var month = this.months[this.selectedMonth];
        var day = this.days[this.selectedDay];
        var year = this.years[this.selectedYear];
        var date = year + "/" + month + "/" + day;
        var dateIsValid = moment(date, "YYYY/MM/DD", true).isValid();
        var age = moment().diff(date, 'years');
        this._componentService.showLoader('Updating...');
        if (!this.user.firstName || !this.user.lastName) {
            setTimeout(function () {
                _this._componentService.hideLoader();
                _this._componentService.showErrorFeedback('Ooops!', 'first name or last name must not be empty.');
                return;
            }, 1200);
        }
        else {
            this.user.birthDate = date;
            this.updateUser(this.user);
        }
    };
    EditProfileComponent.prototype.cancel = function () {
        this._routerExtensions.back();
    };
    EditProfileComponent.prototype.getUserData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userService.getUserData(this.userId)];
                    case 1:
                        res = _a.sent();
                        this.isInitialized = true;
                        if (res.data) {
                            this.user.deserialize(res.data);
                            this.originalUserImage = this.user.imageUrl;
                            this.userImage = this._componentService.getImageProfile(this.user.imageUrl);
                            this.selectedCommunityRole = this.communityRoles.indexOf(this.user.communityRole);
                            this.initializeDateDefaultValue(this.user.birthDate);
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
    EditProfileComponent.prototype.updateUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userService.updateUser(this.userId, data)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.success) {
                            this._routerExtensions.navigate(['/settings'], this.navOptions);
                            this._componentService.showSuccessFeedback('Success!', 'User successfully updated.');
                        }
                        else {
                            this._componentService.showErrorFeedback('Ooops!', 'Update failed.');
                        }
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
    EditProfileComponent = __decorate([
        core_1.Component({
            selector: "edit-profile-page",
            moduleId: module.id,
            templateUrl: "./edit-profile-page.component.html",
            styleUrls: ['./edit-profile-page.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.NgZone,
            router_1.RouterExtensions,
            user_service_1.UserService,
            config_service_1.ConfigService,
            component_event_service_1.ComponentEventService])
    ], EditProfileComponent);
    return EditProfileComponent;
}());
exports.EditProfileComponent = EditProfileComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1wcm9maWxlLXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWRpdC1wcm9maWxlLXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEQ7QUFDMUQsc0RBQStEO0FBRy9ELDREQUEwRDtBQUMxRCxnRUFBOEQ7QUFDOUQsa0ZBQStFO0FBRS9FLHNEQUErQztBQUUvQywrQkFBaUM7QUFDakMsb0NBQXNDO0FBUXRDO0lBdUJJLDhCQUNZLE9BQWUsRUFDZixpQkFBbUMsRUFDdEMsWUFBeUIsRUFDdEIsY0FBNkIsRUFDaEMsaUJBQXdDO1FBSnJDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ3RDLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQ2hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUExQnBELFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDaEIsbUJBQWMsR0FBa0IsQ0FBQyxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlGLFdBQU0sR0FBa0IsRUFBRSxDQUFDO1FBQzNCLFNBQUksR0FBa0IsRUFBRSxDQUFDO1FBQ3pCLFVBQUssR0FBa0IsRUFBRSxDQUFDO1FBRTFCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQXFCbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFJLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMvRCxDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFD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SSx5QkFBZ0I7WUFDeEIsMEJBQVc7WUFDTiw4QkFBYTtZQUNiLCtDQUFxQjtPQTVCeEMsb0JBQW9CLENBOE9oQztJQUFELDJCQUFDO0NBQUEsQUE5T0QsSUE4T0M7QUE5T1ksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xuXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29uZmlnLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy91c2VyLm1vZGVsXCI7XG5cbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJlZGl0LXByb2ZpbGUtcGFnZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9lZGl0LXByb2ZpbGUtcGFnZS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL2VkaXQtcHJvZmlsZS1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgRWRpdFByb2ZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRcblx0dXNlcklkOiBudW1iZXIgPSAwOyAgIFxuICAgIGNvbW11bml0eVJvbGVzOiBBcnJheTxzdHJpbmc+ID0gWydDb21tdW5pdHkgTGVhZGVyJywgJ0NvbW11bml0eSBQcm9qZWN0JywgJ0NvbW11bml0eSBNZW1iZXInXTtcbiAgICBtb250aHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBkYXlzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgeWVhcnM6IEFycmF5PG51bWJlcj4gPSBbXTtcblxuICAgIGlzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc1VzZXJJbWFnZUVkaXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgc2VsZWN0ZWRDb21tdW5pdHlSb2xlOiBudW1iZXI7XG4gICAgc2VsZWN0ZWRNb250aDogbnVtYmVyO1xuICAgIHNlbGVjdGVkRGF5OiBudW1iZXI7XG4gICAgc2VsZWN0ZWRZZWFyOiBudW1iZXI7XG5cbiAgICB1c2VyOiBVc2VyO1xuXG4gICAgbmF2T3B0aW9uczogYW55O1xuXG4gICAgdXNlckltYWdlOiBzdHJpbmc7XG4gICAgb3JpZ2luYWxVc2VySW1hZ2U6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICBcdHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcbiAgICBcdHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcbiAgICApIHtcbiAgICBcdHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucyA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0Um91dGVPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXNlcklkID0gdGhpcy5fdXNlclNlcnZpY2UuZ2V0Q3VycmVudFVzZXJJZCgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRoKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXkoKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVllYXIoKTtcblxuICAgICAgICB0aGlzLmdldFVzZXJEYXRhKCk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZURhdGVEZWZhdWx0VmFsdWUoYmlydGhEYXRlPykge1xuICAgICAgICBsZXQgZGF0ZSA9IChiaXJ0aERhdGUpPyBuZXcgRGF0ZShiaXJ0aERhdGUpIDogbmV3IERhdGUoKTtcbiAgICAgICAgbGV0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpKzE7XG4gICAgICAgIGxldCBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgbGV0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgICAgbGV0IG1vbnRoSW5kZXggPSAobW9udGggPj0gMTApPyB0aGlzLm1vbnRocy5pbmRleE9mKG1vbnRoLnRvU3RyaW5nKCkpIDogdGhpcy5tb250aHMuaW5kZXhPZignMCcrbW9udGgpO1xuICAgICAgICBsZXQgZGF5SW5kZXggPSAoZGF5ID49IDEwKT8gdGhpcy5kYXlzLmluZGV4T2YoZGF5LnRvU3RyaW5nKCkpIDogdGhpcy5kYXlzLmluZGV4T2YoJzAnK2RheSk7XG4gICAgICAgIGxldCB5ZWFySW5kZXggPSB0aGlzLnllYXJzLmluZGV4T2YoeWVhcik7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZE1vbnRoID0gbW9udGhJbmRleDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERheSA9IGRheUluZGV4O1xuICAgICAgICB0aGlzLnNlbGVjdGVkWWVhciA9IHllYXJJbmRleDtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZU1vbnRoKCkge1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPD0gMTI7IGkrKykge1xuXG4gICAgICAgICAgICBsZXQgZGF0YSA9IChpID49IDEwKT8gaS50b1N0cmluZygpIDogJzAnK2k7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMubW9udGhzLnB1c2goZGF0YSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlRGF5KCkge1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPD0gMzE7IGkrKykge1xuXG4gICAgICAgICAgICBsZXQgZGF0YSA9IChpID49IDEwKT8gaS50b1N0cmluZygpIDogJzAnK2k7XG5cbiAgICAgICAgICAgIHRoaXMuZGF5cy5wdXNoKGRhdGEpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZVllYXIoKSB7XG4gICAgICAgIGxldCBjdXJyZW50WWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgbGV0IHN0YXJ0WWVhciA9IDE5MDU7XG5cbiAgICAgICAgd2hpbGUoc3RhcnRZZWFyIDw9IGN1cnJlbnRZZWFyKSB7XG4gICAgICAgICAgICB0aGlzLnllYXJzLnB1c2goc3RhcnRZZWFyKyspXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNvbW11bml0eVJvbGVjaGFuZ2UoZXZlbnQ6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDb21tdW5pdHlSb2xlID0gZXZlbnQubmV3SW5kZXg7XG4gICAgICAgIHRoaXMudXNlci5jb21tdW5pdHlSb2xlID0gdGhpcy5jb21tdW5pdHlSb2xlc1tldmVudC5uZXdJbmRleF07XG4gICAgfVxuXG4gICAgb25Nb250aGNoYW5nZShldmVudDogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1vbnRoID0gZXZlbnQubmV3SW5kZXg7XG4gICAgfVxuXG4gICAgb25EYXljaGFuZ2UoZXZlbnQ6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXkgPSBldmVudC5uZXdJbmRleDtcbiAgICB9XG5cbiAgICBvblllYXJjaGFuZ2UoZXZlbnQ6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRZZWFyID0gZXZlbnQubmV3SW5kZXg7XG4gICAgfVxuXG4gICAgY2hhbmdlUGljdHVyZSgpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5jaGFuZ2VJbWFnZSgxNTAsIDE1MClcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6YW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1VzZXJJbWFnZUVkaXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VySW1hZ2UgPSByZXN1bHQ7IFxuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VDb25maXJtYXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0FNRVJBL0dBTExFUlk6IFwiK2VycilcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoYW5nZUNvbmZpcm1hdGlvbkRpYWxvZygpIHtcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkNvbmZpcm1hdGlvblwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gdXNlIHRoaXMgcGljdHVyZT9cIixcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJZZXNcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIixcbiAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0lNQUdFOjo6OicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy51c2VySW1hZ2UpXG4gICAgICAgICAgICBpZihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVJbWFnZSgpO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmV2ZXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNhdmVJbWFnZSgpIHtcbiAgICAgICAgdGhpcy51cGxvYWRJbWFnZSgpO1xuICAgIH1cblxuICAgIHJldmVydCgpIHtcbiAgICAgICAgdGhpcy51c2VySW1hZ2UgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldEltYWdlUHJvZmlsZSh0aGlzLm9yaWdpbmFsVXNlckltYWdlKTtcbiAgICAgICAgdGhpcy5pc1VzZXJJbWFnZUVkaXRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHVwbG9hZEltYWdlKCkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ1VwbG9hZGluZy4uLicpO1xuXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UudXBsb2FkSW1hZ2UodGhpcy51c2VySWQsICd1c2VyJywgdGhpcy51c2VySW1hZ2UpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcblxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSRVNVTFQgREFUQSAqKionKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFVzZXJJbWFnZSA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyLmltYWdlVXJsID0gdGhpcy5vcmlnaW5hbFVzZXJJbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlckltYWdlID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRJbWFnZVByb2ZpbGUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1VzZXJJbWFnZUVkaXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dFcnJvckZlZWRiYWNrKCdPb29wcyEnLCByZXN1bHQubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVUExPQUQgRVJST1I6IFwiICsgZXJyKVxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0Vycm9yRmVlZGJhY2soJ09vb3BzIScsICdVcGRhdGUgZmFpbGVkJyk7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIGxldCBtb250aCA9IHRoaXMubW9udGhzW3RoaXMuc2VsZWN0ZWRNb250aF07XG4gICAgICAgIGxldCBkYXkgPSB0aGlzLmRheXNbdGhpcy5zZWxlY3RlZERheV07XG4gICAgICAgIGxldCB5ZWFyID0gdGhpcy55ZWFyc1t0aGlzLnNlbGVjdGVkWWVhcl07XG4gICAgICAgIGxldCBkYXRlID0gYCR7eWVhcn0vJHttb250aH0vJHtkYXl9YDtcblxuICAgICAgICBsZXQgZGF0ZUlzVmFsaWQgPSBtb21lbnQoZGF0ZSwgXCJZWVlZL01NL0REXCIsIHRydWUpLmlzVmFsaWQoKTtcbiAgICAgICAgbGV0IGFnZSA9IG1vbWVudCgpLmRpZmYoZGF0ZSwgJ3llYXJzJyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ1VwZGF0aW5nLi4uJyk7XG5cbiAgICAgICAgaWYoIXRoaXMudXNlci5maXJzdE5hbWUgfHwgIXRoaXMudXNlci5sYXN0TmFtZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93RXJyb3JGZWVkYmFjaygnT29vcHMhJywgJ2ZpcnN0IG5hbWUgb3IgbGFzdCBuYW1lIG11c3Qgbm90IGJlIGVtcHR5LicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0sIDEyMDApXG5cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdGhpcy51c2VyLmJpcnRoRGF0ZSA9IGRhdGU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXIodGhpcy51c2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0VXNlckRhdGEoKSB7XG4gICAgXHR0cnl7XG5cbiAgICBcdFx0bGV0IHJlcyA9IGF3YWl0IHRoaXMuX3VzZXJTZXJ2aWNlLmdldFVzZXJEYXRhKHRoaXMudXNlcklkKTtcblxuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmKHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyLmRlc2VyaWFsaXplKHJlcy5kYXRhKTtcblxuICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luYWxVc2VySW1hZ2UgPSB0aGlzLnVzZXIuaW1hZ2VVcmw7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VySW1hZ2UgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldEltYWdlUHJvZmlsZSh0aGlzLnVzZXIuaW1hZ2VVcmwpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb21tdW5pdHlSb2xlID0gdGhpcy5jb21tdW5pdHlSb2xlcy5pbmRleE9mKHRoaXMudXNlci5jb21tdW5pdHlSb2xlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVEYXRlRGVmYXVsdFZhbHVlKHRoaXMudXNlci5iaXJ0aERhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgXHR9Y2F0Y2goZSl7XG4gICAgICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIFx0fVxuICAgIH1cblxuICAgIGFzeW5jIHVwZGF0ZVVzZXIoZGF0YSkge1xuICAgICAgICB0cnl7XG5cbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl91c2VyU2VydmljZS51cGRhdGVVc2VyKHRoaXMudXNlcklkLCBkYXRhKTtcblxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG5cbiAgICAgICAgICAgIGlmKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9zZXR0aW5ncyddLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd1N1Y2Nlc3NGZWVkYmFjaygnU3VjY2VzcyEnLCAnVXNlciBzdWNjZXNzZnVsbHkgdXBkYXRlZC4nKTtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dFcnJvckZlZWRiYWNrKCdPb29wcyEnLCAnVXBkYXRlIGZhaWxlZC4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICBcbn0iXX0=