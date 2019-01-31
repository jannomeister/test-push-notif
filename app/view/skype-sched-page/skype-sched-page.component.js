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
var call_schedule_model_1 = require("../../models/call-schedule.model");
// SERVICES
var call_schedule_service_1 = require("../../services/call-schedule.service");
var component_event_service_1 = require("../../services/component-event.service");
var moment = require("moment");
var SkypeSchedComponent = /** @class */ (function () {
    function SkypeSchedComponent(modal, _callScheduleService, _componentService) {
        this.modal = modal;
        this._callScheduleService = _callScheduleService;
        this._componentService = _componentService;
        this.selectedDate = '';
        this.selectedTime = '';
        this.selectedAvailableTime = 0;
        this.userTimezone = '';
        this.studentLocalTime = '';
        this.buttonText = 'Schedule Call';
        this.hasDate = false;
        this.hasTime = false;
        this.hasSchedule = false;
        this.isLoadingAvailableTimes = true;
        this.isLocalTimePending = false;
        this.userId = this.modal.context.user.userId;
        this.projectId = this.modal.context.projectId;
        this.callSchedule = new call_schedule_model_1.CallSchedule();
        this.initDatePicker();
        this.initMonths();
    }
    SkypeSchedComponent.prototype.ngOnInit = function () {
        this.initCallSchedule();
    };
    SkypeSchedComponent.prototype.initCallSchedule = function () {
        this._componentService.showLoader('Loading...');
        this.getCallSchedule(this.userId, this.projectId);
    };
    SkypeSchedComponent.prototype.initDatePicker = function () {
        var ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
        this.picker = new ModalPicker();
    };
    SkypeSchedComponent.prototype.initMonths = function () {
        this.months = [
            'January', 'February', 'March',
            'April', 'May', 'June', 'July',
            'August', 'September', 'October',
            'November', 'December'
        ];
    };
    SkypeSchedComponent.prototype.onDateSelected = function () {
        var _this = this;
        if (this.hasSchedule) {
            return;
        }
        this.picker.pickDate({
            title: "Select Date",
            theme: "dark",
            minDate: this.setMinAndMaxDate().minDate,
            maxDate: this.setMinAndMaxDate().maxDate
        }).then(function (result) {
            // result { day: 0, month: 0, year: 0 }
            if (result) {
                _this.hasDate = true;
                _this.callSchedule.callDate = result.year + "/" + result.month + "/" + result.day;
                _this.selectedDate = _this.callSchedule.formatDate();
                _this.getStudentLocalTime();
            }
        }).catch(function (error) { });
    };
    SkypeSchedComponent.prototype.onDDTimeClosed = function () {
        this.converTime();
    };
    SkypeSchedComponent.prototype.onTimeSeleted = function () {
        var _this = this;
        this.picker.pickTime({
            hour: this.callSchedule.getTime().hour,
            minute: this.callSchedule.getTime().minute
        }).then(function (result) {
            if (result) {
                _this.hasTime = true;
                _this.callSchedule.callTime = result.hour + ":" + result.minute + ":00";
                _this.selectedTime = _this.callSchedule.formatTime();
                _this.getStudentLocalTime();
            }
        })
            .catch(function (error) { });
    };
    SkypeSchedComponent.prototype.converTime = function () {
        var selected = this.availableTimes[this.selectedAvailableTime];
        this.hasTime = true;
        this.callSchedule.callTime = this.callSchedule.convertTo24hrs(selected);
        this.selectedTime = selected;
        this.getStudentLocalTime();
    };
    SkypeSchedComponent.prototype.setMinAndMaxDate = function () {
        var currentDate = new Date();
        var minDate = new Date(this.modal.context.dateStart);
        var maxDate = new Date(this.modal.context.dateStart);
        currentDate.setDate(currentDate.getDate() + 4);
        minDate.setDate(minDate.getDate() - 7);
        maxDate.setDate(maxDate.getDate() + 4);
        return {
            minDate: (currentDate >= minDate && currentDate <= maxDate) ? currentDate : minDate,
            maxDate: maxDate
        };
    };
    SkypeSchedComponent.prototype.getDefaultDate = function () {
        var min = moment(this.setMinAndMaxDate().minDate);
        this.hasDate = true;
        this.callSchedule.callDate = min.format('YYYY/MM/DD');
        this.selectedDate = this.callSchedule.formatDate();
        this.getStudentLocalTime();
    };
    SkypeSchedComponent.prototype.getStudentLocalTime = function () {
        var _this = this;
        if (this.callSchedule.hasDateAndTime()) {
            this.isLocalTimePending = true;
            setTimeout(function () {
                _this.isLocalTimePending = false;
                _this.studentLocalTime = _this.callSchedule.getStudentLocalTime(_this.userTimezone, _this.modal.context.student.country);
            }, 1000);
        }
        else {
            this.studentLocalTime = '';
        }
    };
    SkypeSchedComponent.prototype.done = function () {
        if (this.hasSchedule) {
            this.onClose();
        }
        else {
            this.add();
        }
    };
    SkypeSchedComponent.prototype.onClose = function () {
        this.modal.closeCallback({ success: this.hasSchedule, data: this.callSchedule });
    };
    SkypeSchedComponent.prototype.refresh = function () {
        var _this = this;
        this._componentService.showRefreshAlert()
            .then(function (res) {
            _this._componentService.showLoader('Refreshing...');
            setTimeout(function () {
                _this.getCallSchedule(_this.userId, _this.projectId);
            }, 1000);
        });
    };
    SkypeSchedComponent.prototype.add = function () {
        var _this = this;
        this._componentService.showLoader('Adding...');
        setTimeout(function () {
            if (!_this.callSchedule.isRequiredFieldsNotEmpty()) {
                _this._componentService.hideLoader();
                _this._componentService.showAlert('Ooops!', 'All fields are required');
                return;
            }
            else if (!_this.callSchedule.isNotWeekend()) {
                _this._componentService.hideLoader();
                _this._componentService.showAlert('Ooops!', 'You can\'t schedule skype calls on weekends');
                return;
            }
            _this.callSchedule.userId = _this.modal.context.user.userId;
            _this.callSchedule.projectId = _this.modal.context.projectId;
            _this.callSchedule.studentId = _this.modal.context.student.studentId;
            _this.callSchedule.timeZone = _this.userTimezone;
            _this.addSchedule();
        }, 1000);
    };
    SkypeSchedComponent.prototype.addSchedule = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._callScheduleService.addCallSchedule(this.callSchedule)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.success) {
                            this.hasSchedule = true;
                            this.buttonText = 'Ok';
                            this._componentService.showAlert('Success!', 'Your call has been scheduled. Once it is confirmed by your student\'s local director you\'ll receive an email with instructions on how to make the call.');
                        }
                        else {
                            this._componentService.showAlert('Ooops!', res.data);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this._componentService.hideLoader();
                        this._componentService.showAlert('Ooops!', 'Something went wrong. Please try again');
                        console.log('ADD SCHEDULE ERROR');
                        console.log(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SkypeSchedComponent.prototype.getCallSchedule = function (userId, projectId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._callScheduleService.getCallSchedule(userId, projectId)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.data) {
                            this.hasSchedule = true;
                            this.buttonText = 'Ok';
                            this.callSchedule.deserialize(res.data);
                            this.selectedDate = this.callSchedule.formatDate();
                            this.selectedTime = this.callSchedule.formatTime();
                            // this.getStudentLocalTime();
                        }
                        else {
                            this.getDefaultDate();
                        }
                        this.getGeocodeAddress();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        this._componentService.hideLoader();
                        this.refresh();
                        console.log('*** GET CALL SCHEDULE ERROR:');
                        console.log(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SkypeSchedComponent.prototype.getGeocodeAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, lat, lng, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._callScheduleService.getGeocodeAddress(this.modal.context.schoolAddress)];
                    case 1:
                        res = _a.sent();
                        if (res.results.length > 0) {
                            lat = res.results[0].geometry.location.lat;
                            lng = res.results[0].geometry.location.lng;
                            this.getTimezone(lat, lng);
                        }
                        else {
                            this._componentService.hideLoader();
                            this._componentService.showAlert('Ooops!', 'We couldn\'t find your city and country! please update by going to your profile');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        this._componentService.hideLoader();
                        this.refresh();
                        console.log('*** GET GEOCODE ADDRESS ERROR:');
                        console.log(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SkypeSchedComponent.prototype.getTimezone = function (lat, lng) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._callScheduleService.getTimeZone(lat, lng)];
                    case 1:
                        res = _a.sent();
                        if (res) {
                            this.userTimezone = res.timeZoneId;
                            this._componentService.hideLoader();
                            this.getAvailableTime(this.userTimezone);
                        }
                        else {
                            this._componentService.hideLoader();
                            this.refresh();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        this._componentService.hideLoader();
                        this.refresh();
                        console.log('*** GET TIMEZONE ERROR:');
                        console.log(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SkypeSchedComponent.prototype.getAvailableTime = function (timeZone) {
        return __awaiter(this, void 0, void 0, function () {
            var res, index_1, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._callScheduleService.getAvailableTime(this.userId, this.projectId, timeZone)];
                    case 1:
                        res = _a.sent();
                        this.isLoadingAvailableTimes = false;
                        this._componentService.hideLoader();
                        this.availableTimes = res.data;
                        if (this.selectedTime) {
                            index_1 = this.availableTimes.indexOf(this.selectedTime);
                            this.selectedAvailableTime = index_1;
                        }
                        this.converTime();
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        this._componentService.hideLoader();
                        this.refresh();
                        console.log('*** GET AVAILABLE TIME ERROR:');
                        console.log(e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SkypeSchedComponent = __decorate([
        core_1.Component({
            selector: "skype-sched-page",
            moduleId: module.id,
            templateUrl: "./skype-sched-page.component.html",
            styleUrls: ['./skype-sched-page.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
            call_schedule_service_1.CallScheduleService,
            component_event_service_1.ComponentEventService])
    ], SkypeSchedComponent);
    return SkypeSchedComponent;
}());
exports.SkypeSchedComponent = SkypeSchedComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2t5cGUtc2NoZWQtcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJza3lwZS1zY2hlZC1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBRWxELG1FQUE0RTtBQUU1RSxTQUFTO0FBQ1Qsd0VBQWdFO0FBRWhFLFdBQVc7QUFDWCw4RUFBMkU7QUFDM0Usa0ZBQStFO0FBRy9FLCtCQUFpQztBQVFqQztJQXdCSSw2QkFDUyxLQUF3QixFQUN4QixvQkFBeUMsRUFDekMsaUJBQXdDO1FBRnhDLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQWhCakQsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsMEJBQXFCLEdBQVcsQ0FBQyxDQUFDO1FBQ2xDLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLHFCQUFnQixHQUFXLEVBQUUsQ0FBQztRQUM5QixlQUFVLEdBQVcsZUFBZSxDQUFDO1FBRXJDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3Qiw0QkFBdUIsR0FBWSxJQUFJLENBQUM7UUFDeEMsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBT2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUVqRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksa0NBQVksRUFB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WUFDNUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxtQ0FBbUM7WUFDaEQsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7U0FDbEQsQ0FBQzt5Q0EwQmtCLDJCQUFpQjtZQUNGLDJDQUFtQjtZQUN0QiwrQ0FBcUI7T0EzQnhDLG1CQUFtQixDQXVUL0I7SUFBRCwwQkFBQztDQUFBLEFBdlRELElBdVRDO0FBdlRZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5cbi8vIE1PREVMU1xuaW1wb3J0IHsgQ2FsbFNjaGVkdWxlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NhbGwtc2NoZWR1bGUubW9kZWwnO1xuXG4vLyBTRVJWSUNFU1xuaW1wb3J0IHsgQ2FsbFNjaGVkdWxlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jYWxsLXNjaGVkdWxlLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic2t5cGUtc2NoZWQtcGFnZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9za3lwZS1zY2hlZC1wYWdlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2t5cGUtc2NoZWQtcGFnZS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFNreXBlU2NoZWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgdXNlcklkOiBudW1iZXI7XG4gICAgcHJvamVjdElkOiBudW1iZXI7XG5cblx0Y2FsbFNjaGVkdWxlOiBDYWxsU2NoZWR1bGU7XG5cbiAgICBtb250aHM6IEFycmF5PHN0cmluZz47XG4gICAgYXZhaWxhYmxlVGltZXM6IEFycmF5PHN0cmluZz47XG5cbiAgICBwaWNrZXI6IGFueTtcbiAgICBzZWxlY3RlZERhdGU6IHN0cmluZyA9ICcnO1xuICAgIHNlbGVjdGVkVGltZTogc3RyaW5nID0gJyc7XG4gICAgc2VsZWN0ZWRBdmFpbGFibGVUaW1lOiBudW1iZXIgPSAwO1xuICAgIHVzZXJUaW1lem9uZTogc3RyaW5nID0gJyc7XG4gICAgc3R1ZGVudExvY2FsVGltZTogc3RyaW5nID0gJyc7XG4gICAgYnV0dG9uVGV4dDogc3RyaW5nID0gJ1NjaGVkdWxlIENhbGwnO1xuXG4gICAgaGFzRGF0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGhhc1RpbWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBoYXNTY2hlZHVsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzTG9hZGluZ0F2YWlsYWJsZVRpbWVzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBpc0xvY2FsVGltZVBlbmRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgIFx0cHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dQYXJhbXMsXG4gICAgXHRwcml2YXRlIF9jYWxsU2NoZWR1bGVTZXJ2aWNlOiBDYWxsU2NoZWR1bGVTZXJ2aWNlLFxuICAgIFx0cHJpdmF0ZSBfY29tcG9uZW50U2VydmljZTogQ29tcG9uZW50RXZlbnRTZXJ2aWNlLFxuICAgICkge1xuICAgICAgICB0aGlzLnVzZXJJZCA9IHRoaXMubW9kYWwuY29udGV4dC51c2VyLnVzZXJJZDtcbiAgICAgICAgdGhpcy5wcm9qZWN0SWQgPSB0aGlzLm1vZGFsLmNvbnRleHQucHJvamVjdElkO1xuXG4gICAgXHR0aGlzLmNhbGxTY2hlZHVsZSA9IG5ldyBDYWxsU2NoZWR1bGUoKTtcbiAgICAgICAgdGhpcy5pbml0RGF0ZVBpY2tlcigpO1xuICAgICAgICB0aGlzLmluaXRNb250aHMoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0Q2FsbFNjaGVkdWxlKCk7XG4gICAgfVxuXG4gICAgaW5pdENhbGxTY2hlZHVsZSgpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdMb2FkaW5nLi4uJyk7XG4gICAgICAgIHRoaXMuZ2V0Q2FsbFNjaGVkdWxlKHRoaXMudXNlcklkLCB0aGlzLnByb2plY3RJZCk7XG4gICAgfVxuXG4gICAgaW5pdERhdGVQaWNrZXIoKSB7XG4gICAgXHRjb25zdCBNb2RhbFBpY2tlciA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbW9kYWwtZGF0ZXRpbWVwaWNrZXJcIikuTW9kYWxEYXRldGltZXBpY2tlcjtcblx0XHR0aGlzLnBpY2tlciA9IG5ldyBNb2RhbFBpY2tlcigpO1xuICAgIH1cblxuICAgIGluaXRNb250aHMoKSB7XG4gICAgXHR0aGlzLm1vbnRocyA9IFtcbiAgICBcdFx0J0phbnVhcnknLCdGZWJydWFyeScsJ01hcmNoJyxcbiAgICBcdFx0J0FwcmlsJywnTWF5JywnSnVuZScsJ0p1bHknLFxuICAgIFx0XHQnQXVndXN0JywnU2VwdGVtYmVyJywnT2N0b2JlcicsXG4gICAgXHRcdCdOb3ZlbWJlcicsJ0RlY2VtYmVyJ1xuICAgIFx0XTtcbiAgICB9XG5cbiAgICBvbkRhdGVTZWxlY3RlZCgpIHtcbiAgICAgICAgaWYodGhpcy5oYXNTY2hlZHVsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBpY2tlci5waWNrRGF0ZSh7XG4gICAgICAgICAgICB0aXRsZTogXCJTZWxlY3QgRGF0ZVwiLFxuICAgICAgICAgICAgdGhlbWU6IFwiZGFya1wiLFxuICAgICAgICAgICAgbWluRGF0ZTogdGhpcy5zZXRNaW5BbmRNYXhEYXRlKCkubWluRGF0ZSxcbiAgICAgICAgICAgIG1heERhdGU6IHRoaXMuc2V0TWluQW5kTWF4RGF0ZSgpLm1heERhdGVcbiAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAvLyByZXN1bHQgeyBkYXk6IDAsIG1vbnRoOiAwLCB5ZWFyOiAwIH1cbiAgICAgICAgICAgIGlmKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFzRGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsU2NoZWR1bGUuY2FsbERhdGUgPSBgJHtyZXN1bHQueWVhcn0vJHtyZXN1bHQubW9udGh9LyR7cmVzdWx0LmRheX1gO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gdGhpcy5jYWxsU2NoZWR1bGUuZm9ybWF0RGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTdHVkZW50TG9jYWxUaW1lKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7fSk7XG4gICAgfVxuXG4gICAgb25ERFRpbWVDbG9zZWQoKSB7XG4gICAgICAgIHRoaXMuY29udmVyVGltZSgpOyBcbiAgICB9XG5cbiAgICBvblRpbWVTZWxldGVkKCkge1xuXG4gICAgICAgIHRoaXMucGlja2VyLnBpY2tUaW1lKHtcbiAgICAgICAgICAgIGhvdXI6IHRoaXMuY2FsbFNjaGVkdWxlLmdldFRpbWUoKS5ob3VyLFxuICAgICAgICAgICAgbWludXRlOiB0aGlzLmNhbGxTY2hlZHVsZS5nZXRUaW1lKCkubWludXRlXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNUaW1lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxTY2hlZHVsZS5jYWxsVGltZSA9IGAke3Jlc3VsdC5ob3VyfToke3Jlc3VsdC5taW51dGV9OjAwYDtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkVGltZSA9IHRoaXMuY2FsbFNjaGVkdWxlLmZvcm1hdFRpbWUoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3R1ZGVudExvY2FsVGltZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7fSk7XG4gICAgfVxuXG4gICAgY29udmVyVGltZSgpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5hdmFpbGFibGVUaW1lc1t0aGlzLnNlbGVjdGVkQXZhaWxhYmxlVGltZV07XG5cbiAgICAgICAgdGhpcy5oYXNUaW1lID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYWxsU2NoZWR1bGUuY2FsbFRpbWUgPSB0aGlzLmNhbGxTY2hlZHVsZS5jb252ZXJ0VG8yNGhycyhzZWxlY3RlZCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lID0gc2VsZWN0ZWQ7XG5cbiAgICAgICAgdGhpcy5nZXRTdHVkZW50TG9jYWxUaW1lKCk7XG4gICAgfVxuXG4gICAgc2V0TWluQW5kTWF4RGF0ZSgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcblxuICAgICAgICBsZXQgbWluRGF0ZSA9IG5ldyBEYXRlKHRoaXMubW9kYWwuY29udGV4dC5kYXRlU3RhcnQpO1xuICAgICAgICBsZXQgbWF4RGF0ZSA9IG5ldyBEYXRlKHRoaXMubW9kYWwuY29udGV4dC5kYXRlU3RhcnQpO1xuXG4gICAgICAgIGN1cnJlbnREYXRlLnNldERhdGUoY3VycmVudERhdGUuZ2V0RGF0ZSgpKzQpXG5cbiAgICAgICAgbWluRGF0ZS5zZXREYXRlKG1pbkRhdGUuZ2V0RGF0ZSgpLTcpO1xuICAgICAgICBtYXhEYXRlLnNldERhdGUobWF4RGF0ZS5nZXREYXRlKCkrNCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1pbkRhdGU6IChjdXJyZW50RGF0ZSA+PSBtaW5EYXRlICYmIGN1cnJlbnREYXRlIDw9IG1heERhdGUpPyBjdXJyZW50RGF0ZSA6IG1pbkRhdGUsXG4gICAgICAgICAgICBtYXhEYXRlOiBtYXhEYXRlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXREZWZhdWx0RGF0ZSgpIHtcbiAgICAgICAgbGV0IG1pbiA9IG1vbWVudCh0aGlzLnNldE1pbkFuZE1heERhdGUoKS5taW5EYXRlKTtcblxuICAgICAgICB0aGlzLmhhc0RhdGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNhbGxTY2hlZHVsZS5jYWxsRGF0ZSA9IG1pbi5mb3JtYXQoJ1lZWVkvTU0vREQnKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSB0aGlzLmNhbGxTY2hlZHVsZS5mb3JtYXREYXRlKCk7XG5cbiAgICAgICAgdGhpcy5nZXRTdHVkZW50TG9jYWxUaW1lKCk7XG4gICAgfVxuXG4gICAgZ2V0U3R1ZGVudExvY2FsVGltZSgpIHtcbiAgICAgICAgaWYodGhpcy5jYWxsU2NoZWR1bGUuaGFzRGF0ZUFuZFRpbWUoKSkge1xuICAgICAgICAgICAgdGhpcy5pc0xvY2FsVGltZVBlbmRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvY2FsVGltZVBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0dWRlbnRMb2NhbFRpbWUgPSB0aGlzLmNhbGxTY2hlZHVsZS5nZXRTdHVkZW50TG9jYWxUaW1lKHRoaXMudXNlclRpbWV6b25lLCB0aGlzLm1vZGFsLmNvbnRleHQuc3R1ZGVudC5jb3VudHJ5KVxuICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdHVkZW50TG9jYWxUaW1lID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb25lKCkge1xuICAgICAgICBpZih0aGlzLmhhc1NjaGVkdWxlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgIHRoaXMubW9kYWwuY2xvc2VDYWxsYmFjayh7IHN1Y2Nlc3M6IHRoaXMuaGFzU2NoZWR1bGUsIGRhdGE6IHRoaXMuY2FsbFNjaGVkdWxlIH0pO1xuICAgIH1cblxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd1JlZnJlc2hBbGVydCgpXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdSZWZyZXNoaW5nLi4uJyk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2FsbFNjaGVkdWxlKHRoaXMudXNlcklkLCB0aGlzLnByb2plY3RJZCk7XG4gICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgYWRkKCkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ0FkZGluZy4uLicpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmKCF0aGlzLmNhbGxTY2hlZHVsZS5pc1JlcXVpcmVkRmllbGRzTm90RW1wdHkoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb29wcyEnLCAnQWxsIGZpZWxkcyBhcmUgcmVxdWlyZWQnKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1lbHNlIGlmKCF0aGlzLmNhbGxTY2hlZHVsZS5pc05vdFdlZWtlbmQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb29wcyEnLCAnWW91IGNhblxcJ3Qgc2NoZWR1bGUgc2t5cGUgY2FsbHMgb24gd2Vla2VuZHMnKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jYWxsU2NoZWR1bGUudXNlcklkID0gdGhpcy5tb2RhbC5jb250ZXh0LnVzZXIudXNlcklkO1xuICAgICAgICAgICAgdGhpcy5jYWxsU2NoZWR1bGUucHJvamVjdElkID0gdGhpcy5tb2RhbC5jb250ZXh0LnByb2plY3RJZDtcbiAgICAgICAgICAgIHRoaXMuY2FsbFNjaGVkdWxlLnN0dWRlbnRJZCA9IHRoaXMubW9kYWwuY29udGV4dC5zdHVkZW50LnN0dWRlbnRJZDtcbiAgICAgICAgICAgIHRoaXMuY2FsbFNjaGVkdWxlLnRpbWVab25lID0gdGhpcy51c2VyVGltZXpvbmU7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkU2NoZWR1bGUoKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgYXN5bmMgYWRkU2NoZWR1bGUoKSB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9jYWxsU2NoZWR1bGVTZXJ2aWNlLmFkZENhbGxTY2hlZHVsZSh0aGlzLmNhbGxTY2hlZHVsZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgaWYocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhc1NjaGVkdWxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblRleHQgPSAnT2snO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdTdWNjZXNzIScsICdZb3VyIGNhbGwgaGFzIGJlZW4gc2NoZWR1bGVkLiBPbmNlIGl0IGlzIGNvbmZpcm1lZCBieSB5b3VyIHN0dWRlbnRcXCdzIGxvY2FsIGRpcmVjdG9yIHlvdVxcJ2xsIHJlY2VpdmUgYW4gZW1haWwgd2l0aCBpbnN0cnVjdGlvbnMgb24gaG93IHRvIG1ha2UgdGhlIGNhbGwuJyk7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vb3BzIScsIHJlcy5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vb3BzIScsICdTb21ldGhpbmcgd2VudCB3cm9uZy4gUGxlYXNlIHRyeSBhZ2FpbicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FERCBTQ0hFRFVMRSBFUlJPUicpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0Q2FsbFNjaGVkdWxlKHVzZXJJZCwgcHJvamVjdElkKSB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9jYWxsU2NoZWR1bGVTZXJ2aWNlLmdldENhbGxTY2hlZHVsZSh1c2VySWQsIHByb2plY3RJZCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgaWYocmVzLmRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhc1NjaGVkdWxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblRleHQgPSAnT2snO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbFNjaGVkdWxlLmRlc2VyaWFsaXplKHJlcy5kYXRhKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gdGhpcy5jYWxsU2NoZWR1bGUuZm9ybWF0RGF0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lID0gdGhpcy5jYWxsU2NoZWR1bGUuZm9ybWF0VGltZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nZXRTdHVkZW50TG9jYWxUaW1lKCk7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREZWZhdWx0RGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmdldEdlb2NvZGVBZGRyZXNzKCk7XG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJyoqKiBHRVQgQ0FMTCBTQ0hFRFVMRSBFUlJPUjonKVxuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGdldEdlb2NvZGVBZGRyZXNzKCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fY2FsbFNjaGVkdWxlU2VydmljZS5nZXRHZW9jb2RlQWRkcmVzcyhcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsLmNvbnRleHQuc2Nob29sQWRkcmVzc1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYocmVzLnJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBsYXQgPSByZXMucmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQ7XG4gICAgICAgICAgICAgICAgbGV0IGxuZyA9IHJlcy5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxuZztcblxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGltZXpvbmUobGF0LCBsbmcpO1xuXG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vb3BzIScsICdXZSBjb3VsZG5cXCd0IGZpbmQgeW91ciBjaXR5IGFuZCBjb3VudHJ5ISBwbGVhc2UgdXBkYXRlIGJ5IGdvaW5nIHRvIHlvdXIgcHJvZmlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcqKiogR0VUIEdFT0NPREUgQUREUkVTUyBFUlJPUjonKVxuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGdldFRpbWV6b25lKGxhdCwgbG5nKSB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9jYWxsU2NoZWR1bGVTZXJ2aWNlLmdldFRpbWVab25lKGxhdCwgbG5nKTtcblxuICAgICAgICAgICAgaWYocmVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyVGltZXpvbmUgPSByZXMudGltZVpvbmVJZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEF2YWlsYWJsZVRpbWUodGhpcy51c2VyVGltZXpvbmUpO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJyoqKiBHRVQgVElNRVpPTkUgRVJST1I6JylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBnZXRBdmFpbGFibGVUaW1lKHRpbWVab25lKSB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9jYWxsU2NoZWR1bGVTZXJ2aWNlLmdldEF2YWlsYWJsZVRpbWUodGhpcy51c2VySWQsIHRoaXMucHJvamVjdElkLCB0aW1lWm9uZSk7XG5cbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nQXZhaWxhYmxlVGltZXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuXG4gICAgICAgICAgICB0aGlzLmF2YWlsYWJsZVRpbWVzID0gcmVzLmRhdGE7XG4gICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkVGltZSkge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuYXZhaWxhYmxlVGltZXMuaW5kZXhPZih0aGlzLnNlbGVjdGVkVGltZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEF2YWlsYWJsZVRpbWUgPSBpbmRleDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb252ZXJUaW1lKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnKioqIEdFVCBBVkFJTEFCTEUgVElNRSBFUlJPUjonKVxuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=