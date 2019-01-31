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
var page_1 = require("tns-core-modules/ui/page");
var verification_service_1 = require("../../services/verification.service");
var user_service_1 = require("../../services/user.service");
var config_service_1 = require("../../services/config.service");
var device_service_1 = require("../../services/device.service");
var component_event_service_1 = require("../../services/component-event.service");
var socket_service_1 = require("../../services/socket.service");
var VerificationComponent = /** @class */ (function () {
    function VerificationComponent(page, _routerExtensions, _userService, _deviceService, _configService, _socketService, _componentService, _verificationService) {
        this.page = page;
        this._routerExtensions = _routerExtensions;
        this._userService = _userService;
        this._deviceService = _deviceService;
        this._configService = _configService;
        this._socketService = _socketService;
        this._componentService = _componentService;
        this._verificationService = _verificationService;
        this.userId = 0;
        page.actionBarHidden = true;
        this.navOptions = this._componentService.getRouteOptions();
    }
    VerificationComponent.prototype.ngOnInit = function () {
        this.userId = this._userService.getCurrentUserId();
    };
    VerificationComponent.prototype.goBack = function () {
        console.log("go back");
        this._routerExtensions.back();
    };
    VerificationComponent.prototype.onEnterCode = function (event, no) {
        // textfields
        var textField1 = this.page.getViewById("tf-1");
        var textField2 = this.page.getViewById("tf-2");
        var textField3 = this.page.getViewById("tf-3");
        var textField4 = this.page.getViewById("tf-4");
        if (no === 1) {
            this.tf1 = textField1.text;
            if (textField1.text) {
                setTimeout(function () {
                    textField2.focus();
                }, 150);
            }
        }
        if (no === 2) {
            this.tf2 = textField2.text;
            if (textField2.text) {
                setTimeout(function () {
                    textField3.focus();
                }, 150);
            }
        }
        if (no === 3) {
            this.tf3 = textField3.text;
            if (textField3.text) {
                setTimeout(function () {
                    textField4.focus();
                }, 150);
            }
        }
        else {
            this.tf4 = textField4.text;
        }
        if (textField1.text && textField2.text && textField3.text && textField4.text) {
            setTimeout(function () {
                textField1.dismissSoftInput();
                textField2.dismissSoftInput();
                textField3.dismissSoftInput();
                textField4.dismissSoftInput();
            }, 200);
        }
    };
    VerificationComponent.prototype.resendCode = function () {
        this._componentService.showLoader('Sending...');
        this.resend({ userId: this.userId });
    };
    VerificationComponent.prototype.registerDevice = function (userId) {
        var _this = this;
        this._userService.registerTokenV2()
            .then(function (token) {
            console.log('*** TOKEN *** ==> ' + token);
            _this._deviceService.registerDevice(token)
                .then(function (device) {
                console.log('*** DEVICE DATA *** ==>');
                console.log(device);
                _this._userService.registerUserDevice(userId, device.data.deviceId)
                    .then(function (userDevice) {
                    console.log('*** USER DEVICE DATA *** ==>');
                    console.log(userDevice);
                }).catch(function (err) { return console.log('REGISTER USER DEVICE: ', err); });
            }).catch(function (err) { return console.log('REGISTER DEVICE ERROR: ', err); });
        }).catch(function (err) { return console.log('REGISER TOKEN ERROR: ', err); });
    };
    VerificationComponent.prototype.clearFields = function () {
        this.tf1 = '';
        this.tf2 = '';
        this.tf3 = '';
        this.tf4 = '';
    };
    VerificationComponent.prototype.verifyCode = function () {
        var _this = this;
        this._componentService.showLoader('Verifying...');
        var code = "" + this.tf1 + this.tf2 + this.tf3 + this.tf4;
        setTimeout(function () {
            if (code.length === 4) {
                _this.verify(code);
            }
            else {
                _this._componentService.hideLoader();
                _this._componentService.showAlert('Verification failed', 'Invalid Code. Please try again.');
            }
        }, 300);
    };
    VerificationComponent.prototype.verify = function (cleanedCode) {
        return __awaiter(this, void 0, void 0, function () {
            var res, currentUser, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._verificationService.verify(this.userId, cleanedCode)];
                    case 1:
                        res = _a.sent();
                        if (res.success) {
                            currentUser = this._userService.getCurrentUser();
                            currentUser.data.status = res.data.status;
                            this._socketService.connect();
                            this._userService.saveCurrentUser(currentUser);
                            this.getUserData();
                        }
                        else {
                            this._componentService.hideLoader();
                            this.clearFields();
                            this._componentService.showAlert('Ooops!', res.data);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this._componentService.hideLoader();
                        this._componentService.showErrorFeedback('Ooops!', 'Something went wrong');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VerificationComponent.prototype.getUserData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userId, res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = this._userService.getCurrentUserId();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._userService.getUserData(userId)];
                    case 2:
                        res = _a.sent();
                        if (res.data) {
                            this.registerDevice(res.data.userId);
                            this.updateUserDeviceLoginStatus(res.data);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this._componentService.hideLoader();
                        this._componentService.showErrorFeedback('Ooops!', 'Something went wrong');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VerificationComponent.prototype.updateUserDeviceLoginStatus = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userService.updateUserDeviceLoginStatus(user.userId)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.success) {
                            this.navOptions.clearHistory = true;
                            this._routerExtensions.navigate(['/user-alert'], this.navOptions);
                        }
                        else {
                            this._userService.removeCurrentUser();
                            this._componentService.showErrorFeedback('Ooops!', 'Something went wrong');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        this._componentService.hideLoader();
                        this._userService.removeCurrentUser();
                        this._componentService.showErrorFeedback('Ooops!', 'Something went wrong');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VerificationComponent.prototype.resend = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._verificationService.resend(data)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.success) {
                            this._componentService.showAlert('Success!', res.data);
                        }
                        else {
                            this._componentService.showAlert('Ooops!', 'Unable to send a new code. Please try again.');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        this._componentService.hideLoader();
                        this._componentService.showAlert('Ooops!', 'Unable to send a new code. Please try again.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VerificationComponent = __decorate([
        core_1.Component({
            selector: "verification-page",
            moduleId: module.id,
            templateUrl: "./verification-page.component.html",
            styleUrls: ['./verification-page.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.RouterExtensions,
            user_service_1.UserService,
            device_service_1.DeviceService,
            config_service_1.ConfigService,
            socket_service_1.SocketService,
            component_event_service_1.ComponentEventService,
            verification_service_1.VerificationService])
    ], VerificationComponent);
    return VerificationComponent;
}());
exports.VerificationComponent = VerificationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZpY2F0aW9uLXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmVyaWZpY2F0aW9uLXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzQ0FBa0Q7QUFFbEQsc0RBQStEO0FBQy9ELGlEQUFnRDtBQUdoRCw0RUFBMEU7QUFDMUUsNERBQTBEO0FBQzFELGdFQUE4RDtBQUM5RCxnRUFBOEQ7QUFDOUQsa0ZBQStFO0FBQy9FLGdFQUE4RDtBQVk5RDtJQVdJLCtCQUNZLElBQVUsRUFDVixpQkFBbUMsRUFDbkMsWUFBeUIsRUFDekIsY0FBNkIsRUFDN0IsY0FBNkIsRUFDN0IsY0FBNkIsRUFDN0IsaUJBQXdDLEVBQ3hDLG9CQUF5QztRQVB6QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUN6QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFackQsV0FBTSxHQUFXLENBQUMsQ0FBQztRQWNmLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQy9ELENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVELHNDQUFNLEdBQU47UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFD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QUNiLDhCQUFhO1lBQ1YsK0NBQXFCO1lBQ2xCLDBDQUFtQjtPQW5CNUMscUJBQXFCLENBeU1qQztJQUFELDRCQUFDO0NBQUEsQUF6TUQsSUF5TUM7QUF6TVksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcblxuaW1wb3J0IHsgVmVyaWZpY2F0aW9uU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy92ZXJpZmljYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEZXZpY2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2RldmljZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21wb25lbnRFdmVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29tcG9uZW50LWV2ZW50LnNlcnZpY2VcIjtcbmltcG9ydCB7IFNvY2tldFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc29ja2V0LnNlcnZpY2VcIjtcblxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgcGxhdGZvcm1Nb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcbmltcG9ydCAqIGFzIHB1c2hQbHVnaW4gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wdXNoLW5vdGlmaWNhdGlvbnNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwidmVyaWZpY2F0aW9uLXBhZ2VcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdmVyaWZpY2F0aW9uLXBhZ2UuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi92ZXJpZmljYXRpb24tcGFnZS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFZlcmlmaWNhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICB0ZjE6IGFueTtcbiAgICB0ZjI6IGFueTtcbiAgICB0ZjM6IGFueTtcbiAgICB0ZjQ6IGFueTtcblxuICAgIHVzZXJJZDogbnVtYmVyID0gMDtcblxuICAgIG5hdk9wdGlvbnM6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfZGV2aWNlU2VydmljZTogRGV2aWNlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfc29ja2V0U2VydmljZTogU29ja2V0U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfY29tcG9uZW50U2VydmljZTogQ29tcG9uZW50RXZlbnRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF92ZXJpZmljYXRpb25TZXJ2aWNlOiBWZXJpZmljYXRpb25TZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRSb3V0ZU9wdGlvbnMoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLl91c2VyU2VydmljZS5nZXRDdXJyZW50VXNlcklkKCk7XG4gICAgfVxuXG4gICAgZ29CYWNrKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImdvIGJhY2tcIilcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuXG4gICAgb25FbnRlckNvZGUoZXZlbnQsIG5vKSB7XG5cbiAgICAgICAgLy8gdGV4dGZpZWxkc1xuICAgICAgICBsZXQgdGV4dEZpZWxkMSA9IDxUZXh0RmllbGQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwidGYtMVwiKTtcbiAgICAgICAgbGV0IHRleHRGaWVsZDIgPSA8VGV4dEZpZWxkPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcInRmLTJcIik7XG4gICAgICAgIGxldCB0ZXh0RmllbGQzID0gPFRleHRGaWVsZD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJ0Zi0zXCIpO1xuICAgICAgICBsZXQgdGV4dEZpZWxkNCA9IDxUZXh0RmllbGQ+dGhpcy5wYWdlLmdldFZpZXdCeUlkKFwidGYtNFwiKTtcblxuICAgICAgICBpZihubyA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy50ZjEgPSB0ZXh0RmllbGQxLnRleHQ7XG4gICAgICAgICAgICBpZih0ZXh0RmllbGQxLnRleHQpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dEZpZWxkMi5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH0sIDE1MClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihubyA9PT0gMikge1xuICAgICAgICAgICAgdGhpcy50ZjIgPSB0ZXh0RmllbGQyLnRleHQ7XG4gICAgICAgICAgICBpZih0ZXh0RmllbGQyLnRleHQpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dEZpZWxkMy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH0sIDE1MClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihubyA9PT0gMykge1xuICAgICAgICAgICAgdGhpcy50ZjMgPSB0ZXh0RmllbGQzLnRleHQ7XG4gICAgICAgICAgICBpZih0ZXh0RmllbGQzLnRleHQpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dEZpZWxkNC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH0sIDE1MClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdGhpcy50ZjQgPSB0ZXh0RmllbGQ0LnRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0ZXh0RmllbGQxLnRleHQgJiYgdGV4dEZpZWxkMi50ZXh0ICYmIHRleHRGaWVsZDMudGV4dCAmJiB0ZXh0RmllbGQ0LnRleHQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRleHRGaWVsZDEuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICAgICAgICAgIHRleHRGaWVsZDIuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICAgICAgICAgIHRleHRGaWVsZDMuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICAgICAgICAgIHRleHRGaWVsZDQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICAgICAgfSwgMjAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZW5kQ29kZSgpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdTZW5kaW5nLi4uJyk7XG5cbiAgICAgICAgdGhpcy5yZXNlbmQoeyB1c2VySWQ6IHRoaXMudXNlcklkIH0pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyRGV2aWNlKHVzZXJJZCkge1xuICAgICAgICB0aGlzLl91c2VyU2VydmljZS5yZWdpc3RlclRva2VuVjIoKVxuICAgICAgICAgICAgLnRoZW4oKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnKioqIFRPS0VOICoqKiA9PT4gJyt0b2tlbilcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXZpY2VTZXJ2aWNlLnJlZ2lzdGVyRGV2aWNlKHRva2VuKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoZGV2aWNlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcqKiogREVWSUNFIERBVEEgKioqID09PicpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkZXZpY2UpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZS5yZWdpc3RlclVzZXJEZXZpY2UodXNlcklkLCBkZXZpY2UuZGF0YS5kZXZpY2VJZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodXNlckRldmljZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcqKiogVVNFUiBERVZJQ0UgREFUQSAqKiogPT0+JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlckRldmljZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coJ1JFR0lTVEVSIFVTRVIgREVWSUNFOiAnLGVycikpXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZygnUkVHSVNURVIgREVWSUNFIEVSUk9SOiAnLGVycikpXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coJ1JFR0lTRVIgVE9LRU4gRVJST1I6ICcsZXJyKSlcbiAgICB9XG5cbiAgICBjbGVhckZpZWxkcygpIHtcbiAgICAgICAgdGhpcy50ZjEgPSAnJztcbiAgICAgICAgdGhpcy50ZjIgPSAnJztcbiAgICAgICAgdGhpcy50ZjMgPSAnJztcbiAgICAgICAgdGhpcy50ZjQgPSAnJztcbiAgICB9XG5cbiAgICB2ZXJpZnlDb2RlKCkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ1ZlcmlmeWluZy4uLicpO1xuXG4gICAgICAgIGxldCBjb2RlID0gYCR7dGhpcy50ZjF9JHt0aGlzLnRmMn0ke3RoaXMudGYzfSR7dGhpcy50ZjR9YDtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmKGNvZGUubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZXJpZnkoY29kZSk7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ1ZlcmlmaWNhdGlvbiBmYWlsZWQnLCAnSW52YWxpZCBDb2RlLiBQbGVhc2UgdHJ5IGFnYWluLicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDMwMCk7XG4gICAgfVxuXG4gICAgYXN5bmMgdmVyaWZ5KGNsZWFuZWRDb2RlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fdmVyaWZpY2F0aW9uU2VydmljZS52ZXJpZnkodGhpcy51c2VySWQsIGNsZWFuZWRDb2RlKTtcblxuICAgICAgICAgICAgaWYocmVzLnN1Y2Nlc3Mpe1xuXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gdGhpcy5fdXNlclNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKTtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnRVc2VyLmRhdGEuc3RhdHVzID0gcmVzLmRhdGEuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NvY2tldFNlcnZpY2UuY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLnNhdmVDdXJyZW50VXNlcihjdXJyZW50VXNlcik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmdldFVzZXJEYXRhKCk7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckZpZWxkcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb29wcyEnLCByZXMuZGF0YSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0Vycm9yRmVlZGJhY2soJ09vb3BzIScsICdTb21ldGhpbmcgd2VudCB3cm9uZycpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBnZXRVc2VyRGF0YSgpIHtcbiAgICAgICAgbGV0IHVzZXJJZCA9IHRoaXMuX3VzZXJTZXJ2aWNlLmdldEN1cnJlbnRVc2VySWQoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5nZXRVc2VyRGF0YSh1c2VySWQpO1xuICAgICAgICAgICAgaWYocmVzLmRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRGV2aWNlKHJlcy5kYXRhLnVzZXJJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVc2VyRGV2aWNlTG9naW5TdGF0dXMocmVzLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0Vycm9yRmVlZGJhY2soJ09vb3BzIScsICdTb21ldGhpbmcgd2VudCB3cm9uZycpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGVVc2VyRGV2aWNlTG9naW5TdGF0dXModXNlcikge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UudXBkYXRlVXNlckRldmljZUxvZ2luU3RhdHVzKHVzZXIudXNlcklkKTtcblxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICBpZihyZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHRoaXMubmF2T3B0aW9ucy5jbGVhckhpc3RvcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvdXNlci1hbGVydCddLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLnJlbW92ZUN1cnJlbnRVc2VyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93RXJyb3JGZWVkYmFjaygnT29vcHMhJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZS5yZW1vdmVDdXJyZW50VXNlcigpO1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93RXJyb3JGZWVkYmFjaygnT29vcHMhJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nJylcbiAgICAgICAgfVxuICAgIH0gXG5cbiAgICBhc3luYyByZXNlbmQoZGF0YSkge1xuICAgICAgICB0cnl7XG5cbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl92ZXJpZmljYXRpb25TZXJ2aWNlLnJlc2VuZChkYXRhKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICBpZihyZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdTdWNjZXNzIScsIHJlcy5kYXRhKTtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ1VuYWJsZSB0byBzZW5kIGEgbmV3IGNvZGUuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vb3BzIScsICdVbmFibGUgdG8gc2VuZCBhIG5ldyBjb2RlLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19