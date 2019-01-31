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
// OTHERS
var utils = require("utils/utils");
var pushPlugin = require("nativescript-push-notifications");
// SERVICES
var user_service_1 = require("../../services/user.service");
var device_service_1 = require("../../services/device.service");
var facebook_service_1 = require("../../services/facebook.service");
var config_service_1 = require("../../services/config.service");
var component_event_service_1 = require("../../services/component-event.service");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(_configService, _routerExtensions, _ngZone, _userService, _deviceService, _facebookService, _componentService) {
        this._configService = _configService;
        this._routerExtensions = _routerExtensions;
        this._ngZone = _ngZone;
        this._userService = _userService;
        this._deviceService = _deviceService;
        this._facebookService = _facebookService;
        this._componentService = _componentService;
        this.userId = 0;
        this.userSettingsData = {};
        this.notificationIsAllowed = true;
        this.facebookName = '';
        this.hasFacebookLinkedAccount = false;
        this.twitterName = '';
        this.hasTwitterLinkedAccount = false;
        this.isInitialized = false;
        this.isUserSettingsInitialized = false;
        this.isAccountsInitialized = false;
        this.userId = this._userService.getCurrentUserId();
        this.navOptions = this._componentService.getRouteOptions();
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.getUserLinkedAccount();
        this.getUserSettings();
    };
    SettingsComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.isInitialized = true;
        }, 1000);
    };
    SettingsComponent.prototype.checkIsChange = function (event) {
        var switchChange = event.object;
        if (switchChange.checked) {
            this.registerDevice(this.userId);
            this.updateUserSetting(switchChange.checked);
        }
        else {
            this.unregisterToken();
            this.updateUserSetting(switchChange.checked);
        }
    };
    SettingsComponent.prototype.registerDevice = function (userId) {
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
    SettingsComponent.prototype.unregisterToken = function () {
        pushPlugin.unregister(function (result) {
            console.log('Device unregistered successfully');
        }, function (errorMessage) {
            console.dir(errorMessage);
        }, this._configService.pushSettings());
    };
    SettingsComponent.prototype.connect = function (type) {
        var _this = this;
        if (type === 'facebook') {
            if (!this.hasFacebookLinkedAccount) {
                this._facebookService.connectWithoutPermission()
                    .then(function (token) {
                    _this._componentService.showLoader('Connecting...');
                    _this._facebookService.getData(token)
                        .then(function (data) {
                        var linkedAccount = {
                            userId: _this.userId,
                            socialId: data.id,
                            socialName: data.name,
                            socialEmail: data.email,
                            socialAccessToken: token,
                            socialAccount: 'facebook'
                        };
                        _this.createUserLinkedAccount(linkedAccount);
                    }).catch(function (err) {
                        console.log('GET FACEBOOK DATA:');
                        console.log(err);
                        _this._componentService.hideLoader();
                    });
                }).catch(function (err) { });
            }
        }
        else if (type === 'twitter') {
            this._componentService.showLoader('Connecting...');
            setTimeout(function () {
                _this._componentService.hideLoader();
                _this._componentService.showAlert('Alert', 'This is still under development. Unable to process your request.');
            }, 1000);
        }
    };
    SettingsComponent.prototype.openUrl = function () {
        utils.openUrl("http://www.yudabands.org/faqs/");
    };
    SettingsComponent.prototype.gotoProfileInfo = function () {
        this.navOptions.transition.name = 'slideLeft';
        this._routerExtensions.navigate(['/profile-info'], this.navOptions);
    };
    SettingsComponent.prototype.editProfile = function () {
        this.navOptions.transition.name = 'slideLeft';
        this._routerExtensions.navigate(['/edit-profile'], this.navOptions);
    };
    SettingsComponent.prototype.changePassword = function () {
        this.navOptions.transition.name = 'slideTop';
        this._routerExtensions.navigate(['/change-password'], this.navOptions);
    };
    SettingsComponent.prototype.getUserSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userId, res, createRes, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = this._userService.getCurrentUserId();
                        this.isUserSettingsInitialized = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this._userService.getUserSetting(userId)];
                    case 2:
                        res = _a.sent();
                        if (!res.data) return [3 /*break*/, 3];
                        this.userSettingsData = res.data;
                        this.notificationIsAllowed = this.userSettingsData.allowNotification;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this._userService.createUserSetting({ userId: userId })];
                    case 4:
                        createRes = _a.sent();
                        this.userSettingsData = createRes.data;
                        this.notificationIsAllowed = this.userSettingsData.allowNotification;
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        this.isUserSettingsInitialized = true;
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SettingsComponent.prototype.updateUserSetting = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.userSettingsData.userSettingId) return [3 /*break*/, 4];
                        data = {
                            allowNotification: args
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._userService.updateUserSetting(this.userSettingsData.userSettingId, data)];
                    case 2:
                        res = _a.sent();
                        console.dir(res);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SettingsComponent.prototype.getUserLinkedAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, i, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userService.getUserLinkedAccount(this.userId)];
                    case 1:
                        res = _a.sent();
                        this.isAccountsInitialized = true;
                        if (res.data.length > 0) {
                            for (i = 0; i < res.data.length; i++) {
                                if (res.data[i].socialAccount === 'facebook') {
                                    this.facebookName = res.data[i].socialEmail;
                                    this.hasFacebookLinkedAccount = true;
                                }
                                if (res.data[i].socialAccount === 'twitter') {
                                    this.twitterName = res.data[i].socialEmail;
                                    this.hasTwitterLinkedAccount = true;
                                }
                            }
                        }
                        else {
                            this.hasFacebookLinkedAccount = false;
                            this.hasTwitterLinkedAccount = false;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        this.isAccountsInitialized = true;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SettingsComponent.prototype.createUserLinkedAccount = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res_1, e_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userService.createUserLinkedAccount(data)];
                    case 1:
                        res_1 = _a.sent();
                        this._componentService.hideLoader();
                        if (res_1.success) {
                            this._componentService.showSuccessFeedback('', 'Successfully connected!');
                            this._ngZone.run(function () {
                                _this.hasFacebookLinkedAccount = true;
                                _this.facebookName = res_1.data.socialEmail;
                            });
                        }
                        else {
                            this._componentService.showAlert('Ooops!', 'You can\'t connect using this facebook account. Log out and try another one.');
                            this._facebookService.logout();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        this._componentService.hideLoader();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: "settings-page",
            moduleId: module.id,
            templateUrl: "./settings-page.component.html",
            styleUrls: ['./settings-page.component.css'],
        }),
        __metadata("design:paramtypes", [config_service_1.ConfigService,
            router_1.RouterExtensions,
            core_1.NgZone,
            user_service_1.UserService,
            device_service_1.DeviceService,
            facebook_service_1.FacebookService,
            component_event_service_1.ComponentEventService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MtcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5ncy1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTBEO0FBRTFELHNEQUErRDtBQUkvRCxTQUFTO0FBQ1QsbUNBQXFDO0FBRXJDLDREQUE4RDtBQUc5RCxXQUFXO0FBQ1gsNERBQTBEO0FBQzFELGdFQUE4RDtBQUM5RCxvRUFBa0U7QUFDbEUsZ0VBQThEO0FBQzlELGtGQUErRTtBQVEvRTtJQWtCSSwyQkFDWSxjQUE2QixFQUM3QixpQkFBbUMsRUFDbkMsT0FBZSxFQUNmLFlBQXlCLEVBQ3pCLGNBQTZCLEVBQzdCLGdCQUFpQyxFQUNqQyxpQkFBd0M7UUFOeEMsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUNqQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBdkJwRCxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLHFCQUFnQixHQUFRLEVBQUUsQ0FBQztRQUMzQiwwQkFBcUIsR0FBWSxJQUFJLENBQUM7UUFFdEMsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsNkJBQXdCLEdBQVksS0FBSyxDQUFDO1FBRTFDLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLDRCQUF1QixHQUFZLEtBQUssQ0FBQztRQUV6QyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQiw4QkFBeUIsR0FBWSxLQUFLLENBQUM7UUFDM0MsMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBYW5DLElBQUksQ0FB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QUFDO2dDQUNiLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7Z0NBQ3JDLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7NEJBQzdDLENBQUMsQ0FBQyxDQUFBO3lCQUNMOzZCQUFJOzRCQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLDhFQUE4RSxDQUFDLENBQUM7NEJBQzNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt5QkFDbEM7Ozs7d0JBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFBOzs7Ozs7S0FFMUM7SUF4T1EsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztTQUMvQyxDQUFDO3lDQW9COEIsOEJBQWE7WUFDVix5QkFBZ0I7WUFDMUIsYUFBTTtZQUNELDBCQUFXO1lBQ1QsOEJBQWE7WUFDWCxrQ0FBZTtZQUNkLCtDQUFxQjtPQXpCM0MsaUJBQWlCLENBeU83QjtJQUFELHdCQUFDO0NBQUEsQUF6T0QsSUF5T0M7QUF6T1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBsb2dvdXQgYXMgZmJMb2dvdXQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWZhY2Vib29rXCI7XG5pbXBvcnQgeyBTd2l0Y2ggfSBmcm9tIFwidWkvc3dpdGNoXCI7XG5cbi8vIE9USEVSU1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcInV0aWxzL3V0aWxzXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgKiBhcyBwdXNoUGx1Z2luIGZyb20gXCJuYXRpdmVzY3JpcHQtcHVzaC1ub3RpZmljYXRpb25zXCI7XG5pbXBvcnQgKiBhcyBwbGF0Zm9ybU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xuXG4vLyBTRVJWSUNFU1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEZXZpY2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2RldmljZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGYWNlYm9va1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmFjZWJvb2suc2VydmljZVwiO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb25maWcuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50RXZlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbXBvbmVudC1ldmVudC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNldHRpbmdzLXBhZ2VcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2V0dGluZ3MtcGFnZS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL3NldHRpbmdzLXBhZ2UuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBTZXR0aW5nc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICB1c2VySWQ6IG51bWJlciA9IDA7XG4gICAgdXNlclNldHRpbmdzRGF0YTogYW55ID0ge307XG4gICAgbm90aWZpY2F0aW9uSXNBbGxvd2VkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGZhY2Vib29rTmFtZTogc3RyaW5nID0gJyc7XG4gICAgaGFzRmFjZWJvb2tMaW5rZWRBY2NvdW50OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICB0d2l0dGVyTmFtZTogc3RyaW5nID0gJyc7XG4gICAgaGFzVHdpdHRlckxpbmtlZEFjY291bnQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGlzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc1VzZXJTZXR0aW5nc0luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNBY2NvdW50c0luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBuYXZPcHRpb25zOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfZGV2aWNlU2VydmljZTogRGV2aWNlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfZmFjZWJvb2tTZXJ2aWNlOiBGYWNlYm9va1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcbiAgICApIHtcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLl91c2VyU2VydmljZS5nZXRDdXJyZW50VXNlcklkKCk7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucyA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0Um91dGVPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZ2V0VXNlckxpbmtlZEFjY291bnQoKTtcbiAgICAgICAgdGhpcy5nZXRVc2VyU2V0dGluZ3MoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgfSwgMTAwMClcbiAgICB9XG4gICAgXG4gICAgY2hlY2tJc0NoYW5nZShldmVudCkge1xuICAgICAgICBsZXQgc3dpdGNoQ2hhbmdlID0gPFN3aXRjaD5ldmVudC5vYmplY3Q7XG5cbiAgICAgICAgaWYoc3dpdGNoQ2hhbmdlLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEZXZpY2UodGhpcy51c2VySWQpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVVc2VyU2V0dGluZyhzd2l0Y2hDaGFuZ2UuY2hlY2tlZCk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHRoaXMudW5yZWdpc3RlclRva2VuKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXJTZXR0aW5nKHN3aXRjaENoYW5nZS5jaGVja2VkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyRGV2aWNlKHVzZXJJZCkge1xuICAgICAgICB0aGlzLl91c2VyU2VydmljZS5yZWdpc3RlclRva2VuVjIoKVxuICAgICAgICAgICAgLnRoZW4oKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnKioqIFRPS0VOICoqKiA9PT4gJyt0b2tlbilcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXZpY2VTZXJ2aWNlLnJlZ2lzdGVyRGV2aWNlKHRva2VuKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoZGV2aWNlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcqKiogREVWSUNFIERBVEEgKioqID09PicpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkZXZpY2UpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZS5yZWdpc3RlclVzZXJEZXZpY2UodXNlcklkLCBkZXZpY2UuZGF0YS5kZXZpY2VJZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodXNlckRldmljZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcqKiogVVNFUiBERVZJQ0UgREFUQSAqKiogPT0+JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlckRldmljZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coJ1JFR0lTVEVSIFVTRVIgREVWSUNFOiAnLGVycikpXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZygnUkVHSVNURVIgREVWSUNFIEVSUk9SOiAnLGVycikpXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coJ1JFR0lTRVIgVE9LRU4gRVJST1I6ICcsZXJyKSlcbiAgICB9XG5cbiAgICB1bnJlZ2lzdGVyVG9rZW4oKSB7XG4gICAgICAgIHB1c2hQbHVnaW4udW5yZWdpc3RlcihcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRGV2aWNlIHVucmVnaXN0ZXJlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgIH0sIFxuXG4gICAgICAgICAgICAoZXJyb3JNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9jb25maWdTZXJ2aWNlLnB1c2hTZXR0aW5ncygpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY29ubmVjdCh0eXBlKSB7XG5cbiAgICAgICAgaWYodHlwZSA9PT0gJ2ZhY2Vib29rJykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZighdGhpcy5oYXNGYWNlYm9va0xpbmtlZEFjY291bnQpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2ZhY2Vib29rU2VydmljZS5jb25uZWN0V2l0aG91dFBlcm1pc3Npb24oKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigodG9rZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignQ29ubmVjdGluZy4uLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmFjZWJvb2tTZXJ2aWNlLmdldERhdGEodG9rZW4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5rZWRBY2NvdW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2lhbElkOiBkYXRhLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29jaWFsTmFtZTogZGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29jaWFsRW1haWw6IGRhdGEuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2NpYWxBY2Nlc3NUb2tlbjogdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2NpYWxBY2NvdW50OiAnZmFjZWJvb2snXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVVzZXJMaW5rZWRBY2NvdW50KGxpbmtlZEFjY291bnQpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHRVQgRkFDRUJPT0sgREFUQTonKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHt9KVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB9ZWxzZSBpZih0eXBlID09PSAndHdpdHRlcicpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignQ29ubmVjdGluZy4uLicpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnQWxlcnQnLCAnVGhpcyBpcyBzdGlsbCB1bmRlciBkZXZlbG9wbWVudC4gVW5hYmxlIHRvIHByb2Nlc3MgeW91ciByZXF1ZXN0LicpO1xuICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvcGVuVXJsKCkge1xuICAgICAgICB1dGlscy5vcGVuVXJsKFwiaHR0cDovL3d3dy55dWRhYmFuZHMub3JnL2ZhcXMvXCIpO1xuICAgIH1cblxuICAgIGdvdG9Qcm9maWxlSW5mbygpe1xuICAgICAgICB0aGlzLm5hdk9wdGlvbnMudHJhbnNpdGlvbi5uYW1lID0gJ3NsaWRlTGVmdCc7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvcHJvZmlsZS1pbmZvJ10sIHRoaXMubmF2T3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZWRpdFByb2ZpbGUoKXtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zLnRyYW5zaXRpb24ubmFtZSA9ICdzbGlkZUxlZnQnO1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2VkaXQtcHJvZmlsZSddLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNoYW5nZVBhc3N3b3JkKCl7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucy50cmFuc2l0aW9uLm5hbWUgPSAnc2xpZGVUb3AnO1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2NoYW5nZS1wYXNzd29yZCddLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldFVzZXJTZXR0aW5ncygpIHtcbiAgICAgICAgbGV0IHVzZXJJZCA9IHRoaXMuX3VzZXJTZXJ2aWNlLmdldEN1cnJlbnRVc2VySWQoKTtcblxuICAgICAgICB0aGlzLmlzVXNlclNldHRpbmdzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3VzZXJTZXJ2aWNlLmdldFVzZXJTZXR0aW5nKHVzZXJJZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyU2V0dGluZ3NEYXRhID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25Jc0FsbG93ZWQgPSB0aGlzLnVzZXJTZXR0aW5nc0RhdGEuYWxsb3dOb3RpZmljYXRpb247XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgY3JlYXRlUmVzID0gYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UuY3JlYXRlVXNlclNldHRpbmcoeyB1c2VySWQ6IHVzZXJJZCB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMudXNlclNldHRpbmdzRGF0YSA9IGNyZWF0ZVJlcy5kYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uSXNBbGxvd2VkID0gdGhpcy51c2VyU2V0dGluZ3NEYXRhLmFsbG93Tm90aWZpY2F0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG5cbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNVc2VyU2V0dGluZ3NJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGVVc2VyU2V0dGluZyhhcmdzKSB7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLnVzZXJTZXR0aW5nc0RhdGEudXNlclNldHRpbmdJZCkge1xuXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBhbGxvd05vdGlmaWNhdGlvbjogYXJnc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UudXBkYXRlVXNlclNldHRpbmcodGhpcy51c2VyU2V0dGluZ3NEYXRhLnVzZXJTZXR0aW5nSWQsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHJlcylcbiAgICAgICAgICAgIH1jYXRjaChlKSB7fVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0VXNlckxpbmtlZEFjY291bnQoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UuZ2V0VXNlckxpbmtlZEFjY291bnQodGhpcy51c2VySWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmlzQWNjb3VudHNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICBpZihyZXMuZGF0YS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHJlcy5kYXRhLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGFbaV0uc29jaWFsQWNjb3VudCA9PT0gJ2ZhY2Vib29rJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWNlYm9va05hbWUgPSByZXMuZGF0YVtpXS5zb2NpYWxFbWFpbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzRmFjZWJvb2tMaW5rZWRBY2NvdW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhW2ldLnNvY2lhbEFjY291bnQgPT09ICd0d2l0dGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50d2l0dGVyTmFtZSA9IHJlcy5kYXRhW2ldLnNvY2lhbEVtYWlsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNUd2l0dGVyTGlua2VkQWNjb3VudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhc0ZhY2Vib29rTGlua2VkQWNjb3VudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFzVHdpdHRlckxpbmtlZEFjY291bnQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5pc0FjY291bnRzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgY3JlYXRlVXNlckxpbmtlZEFjY291bnQoZGF0YSkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UuY3JlYXRlVXNlckxpbmtlZEFjY291bnQoZGF0YSlcblxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICBpZihyZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd1N1Y2Nlc3NGZWVkYmFjaygnJywgJ1N1Y2Nlc3NmdWxseSBjb25uZWN0ZWQhJylcbiAgICAgICAgICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNGYWNlYm9va0xpbmtlZEFjY291bnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhY2Vib29rTmFtZSA9IHJlcy5kYXRhLnNvY2lhbEVtYWlsO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ1lvdSBjYW5cXCd0IGNvbm5lY3QgdXNpbmcgdGhpcyBmYWNlYm9vayBhY2NvdW50LiBMb2cgb3V0IGFuZCB0cnkgYW5vdGhlciBvbmUuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmFjZWJvb2tTZXJ2aWNlLmxvZ291dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKClcbiAgICAgICAgfVxuICAgIH0gXG59XG5cblxuXG5cbiJdfQ==