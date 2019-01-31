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
var page_1 = require("ui/page");
var user_service_1 = require("../../services/user.service");
var facebook_service_1 = require("../../services/facebook.service");
var component_event_service_1 = require("../../services/component-event.service");
// OTHERS
var lodash = require("lodash");
var utils_1 = require("utils/utils");
var LoginToComponent = /** @class */ (function () {
    function LoginToComponent(_routerExtensions, _ngZone, _page, _userService, _componentService, _facebookService) {
        this._routerExtensions = _routerExtensions;
        this._ngZone = _ngZone;
        this._page = _page;
        this._userService = _userService;
        this._componentService = _componentService;
        this._facebookService = _facebookService;
        this.userId = 0;
        this.facebookName = 'Sign in with Facebook';
        this.twitterName = 'Sign in with twitter';
        this.hasTwitter = false;
        this.hasFacebook = false;
        this.hasTwitterLinkedAccount = false;
        this.hasFacebookLinkedAccount = false;
        this.isInitialized = false;
        _page.actionBarHidden = true;
        var currentUser = this._userService.getCurrentUser();
        this.userId = this._userService.getCurrentUserId();
        this.navOptions = this._componentService.getRouteOptions();
        this.hasFacebook = (currentUser.data.loginType === "facebook") ? true : false;
        this.getUserLinkedAccount();
        this.hasTwitterLinkedAccount = false;
    }
    LoginToComponent.prototype.ngOnInit = function () { };
    LoginToComponent.prototype.connectToFacebook = function () {
        var _this = this;
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
                _this._componentService.hideLoader();
                _this._componentService.showErrorFeedback('Ooops!', 'Something went wrong. Please try again later');
            });
        }).catch(function (err) { });
    };
    LoginToComponent.prototype.connectToTwitter = function () {
        this._componentService.showAlert('Alert', 'This is still under development. Sorry for inconvenience.');
        // this._componentService.showErrorFeedback('Oops!', 'This is still under development. Sorry for inconvenience.');
    };
    LoginToComponent.prototype.skip = function () {
        this.navOptions.clearHistory = true;
        this._routerExtensions.navigate(['/dashboard'], this.navOptions);
    };
    LoginToComponent.prototype.facebookLogout = function () {
        this._facebookService.logout();
    };
    LoginToComponent.prototype.open = function (url) {
        utils_1.openUrl(url);
    };
    LoginToComponent.prototype.getUserLinkedAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, facebook, twitter, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userService.getUserLinkedAccount(this.userId)];
                    case 1:
                        res = _a.sent();
                        this.isInitialized = true;
                        if (res.data.length > 0) {
                            facebook = lodash.find(res.data, ['socialAccount', 'facebook']);
                            twitter = lodash.find(res.data, ['socialAccount', 'twitter']);
                            if (facebook) {
                                this.hasFacebook = true;
                                this.hasFacebookLinkedAccount = true;
                            }
                            if (twitter) { }
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
    LoginToComponent.prototype.createUserLinkedAccount = function (linkedAccount) {
        return __awaiter(this, void 0, void 0, function () {
            var res_1, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userService.createUserLinkedAccount(linkedAccount)];
                    case 1:
                        res_1 = _a.sent();
                        this._componentService.hideLoader();
                        if (!res_1.success) {
                            this._componentService.showErrorFeedback('Ooops!', "You can't connect using this " + linkedAccount.socialAccount + " account. Log out and try another one.");
                            if (linkedAccount.socialAccount === 'facebook') {
                                this.facebookLogout();
                            }
                        }
                        else {
                            this._componentService.showSuccessFeedback('', 'Successfully connected!');
                            this._ngZone.run(function () {
                                if (linkedAccount.socialAccount === 'facebook') {
                                    _this.hasFacebookLinkedAccount = true;
                                    _this.facebookName = res_1.data.socialEmail;
                                }
                                else if (linkedAccount.socialAccount === 'twitter') {
                                    _this.hasTwitterLinkedAccount = true;
                                    _this.twitterName = res_1.data.socialEmail;
                                }
                            });
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
    __decorate([
        core_1.ViewChild('twitter'),
        __metadata("design:type", core_1.ElementRef)
    ], LoginToComponent.prototype, "twitter", void 0);
    LoginToComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./loginto-page.component.html",
            styleUrls: ['./login-page.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            core_1.NgZone,
            page_1.Page,
            user_service_1.UserService,
            component_event_service_1.ComponentEventService,
            facebook_service_1.FacebookService])
    ], LoginToComponent);
    return LoginToComponent;
}());
exports.LoginToComponent = LoginToComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW50by1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ2ludG8tcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFpRjtBQUNqRixzREFBK0Q7QUFDL0QsZ0NBQStCO0FBRS9CLDREQUEwRDtBQUMxRCxvRUFBa0U7QUFDbEUsa0ZBQStFO0FBRS9FLFNBQVM7QUFDVCwrQkFBaUM7QUFDakMscUNBQXNDO0FBUXRDO0lBaUJJLDBCQUNZLGlCQUFtQyxFQUNuQyxPQUFlLEVBQ2YsS0FBVyxFQUNYLFlBQXlCLEVBQ3pCLGlCQUF3QyxFQUN4QyxnQkFBaUM7UUFMakMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3pCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFDeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQXJCN0MsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixpQkFBWSxHQUFXLHVCQUF1QixDQUFDO1FBQy9DLGdCQUFXLEdBQVcsc0JBQXNCLENBQUM7UUFFN0MsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3Qiw0QkFBdUIsR0FBWSxLQUFLLENBQUM7UUFDekMsNkJBQXdCLEdBQVksS0FBSyxDQUFDO1FBRTFDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBYzNCLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFD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QUM7b0NBQ3BDLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7aUNBQzNDOzRCQUNMLENBQUMsQ0FBQyxDQUFBO3lCQUVMOzs7O3dCQUdELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7Ozs7O0tBRTNDO0lBM0hxQjtRQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQztrQ0FBVSxpQkFBVTtxREFBQztJQWZqQyxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQzVDLENBQUM7eUNBbUJpQyx5QkFBZ0I7WUFDMUIsYUFBTTtZQUNSLFdBQUk7WUFDRywwQkFBVztZQUNOLCtDQUFxQjtZQUN0QixrQ0FBZTtPQXZCcEMsZ0JBQWdCLENBNEk1QjtJQUFELHVCQUFDO0NBQUEsQUE1SUQsSUE0SUM7QUE1SVksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcblxuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGYWNlYm9va1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmFjZWJvb2suc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50RXZlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbXBvbmVudC1ldmVudC5zZXJ2aWNlXCI7XG5cbi8vIE9USEVSU1xuaW1wb3J0ICogYXMgbG9kYXNoIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbG9naW50by1wYWdlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vbG9naW4tcGFnZS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luVG9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgdXNlcklkOiBudW1iZXIgPSAwO1xuICAgIGZhY2Vib29rTmFtZTogc3RyaW5nID0gJ1NpZ24gaW4gd2l0aCBGYWNlYm9vayc7XG4gICAgdHdpdHRlck5hbWU6IHN0cmluZyA9ICdTaWduIGluIHdpdGggdHdpdHRlcic7XG5cbiAgICBoYXNUd2l0dGVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgaGFzRmFjZWJvb2s6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBoYXNUd2l0dGVyTGlua2VkQWNjb3VudDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGhhc0ZhY2Vib29rTGlua2VkQWNjb3VudDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgbmF2T3B0aW9uczogYW55O1xuXG4gICAgQFZpZXdDaGlsZCgndHdpdHRlcicpIHR3aXR0ZXI6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfY29tcG9uZW50U2VydmljZTogQ29tcG9uZW50RXZlbnRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9mYWNlYm9va1NlcnZpY2U6IEZhY2Vib29rU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gdGhpcy5fdXNlclNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKTtcblxuICAgICAgICB0aGlzLnVzZXJJZCA9IHRoaXMuX3VzZXJTZXJ2aWNlLmdldEN1cnJlbnRVc2VySWQoKTtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRSb3V0ZU9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5oYXNGYWNlYm9vayA9IChjdXJyZW50VXNlci5kYXRhLmxvZ2luVHlwZSA9PT0gXCJmYWNlYm9va1wiKT8gdHJ1ZTogZmFsc2U7XG4gICAgICAgIHRoaXMuZ2V0VXNlckxpbmtlZEFjY291bnQoKTtcbiAgICAgICAgdGhpcy5oYXNUd2l0dGVyTGlua2VkQWNjb3VudCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge31cblxuICAgIGNvbm5lY3RUb0ZhY2Vib29rKCkge1xuICAgICAgICB0aGlzLl9mYWNlYm9va1NlcnZpY2UuY29ubmVjdFdpdGhvdXRQZXJtaXNzaW9uKClcbiAgICAgICAgICAgIC50aGVuKCh0b2tlbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignQ29ubmVjdGluZy4uLicpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZhY2Vib29rU2VydmljZS5nZXREYXRhKHRva2VuKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogYW55KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5rZWRBY2NvdW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29jaWFsSWQ6IGRhdGEuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29jaWFsTmFtZTogZGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2lhbEVtYWlsOiBkYXRhLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2lhbEFjY2Vzc1Rva2VuOiB0b2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2NpYWxBY2NvdW50OiAnZmFjZWJvb2snXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVVzZXJMaW5rZWRBY2NvdW50KGxpbmtlZEFjY291bnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93RXJyb3JGZWVkYmFjaygnT29vcHMhJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7fSlcbiAgICB9XG5cbiAgICBjb25uZWN0VG9Ud2l0dGVyKCkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnQWxlcnQnLCAnVGhpcyBpcyBzdGlsbCB1bmRlciBkZXZlbG9wbWVudC4gU29ycnkgZm9yIGluY29udmVuaWVuY2UuJyk7XG4gICAgICAgIC8vIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0Vycm9yRmVlZGJhY2soJ09vcHMhJywgJ1RoaXMgaXMgc3RpbGwgdW5kZXIgZGV2ZWxvcG1lbnQuIFNvcnJ5IGZvciBpbmNvbnZlbmllbmNlLicpO1xuICAgIH1cblxuICAgIHNraXAoKSB7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucy5jbGVhckhpc3RvcnkgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgIH1cblxuICAgIGZhY2Vib29rTG9nb3V0KCkge1xuICAgICAgIHRoaXMuX2ZhY2Vib29rU2VydmljZS5sb2dvdXQoKTtcbiAgICB9XG5cbiAgICBvcGVuKHVybCkge1xuICAgICAgICBvcGVuVXJsKHVybCk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0VXNlckxpbmtlZEFjY291bnQoKSB7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5nZXRVc2VyTGlua2VkQWNjb3VudCh0aGlzLnVzZXJJZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICBpZihyZXMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZhY2Vib29rID0gbG9kYXNoLmZpbmQocmVzLmRhdGEsIFsnc29jaWFsQWNjb3VudCcsICdmYWNlYm9vayddKTtcbiAgICAgICAgICAgICAgICBsZXQgdHdpdHRlciA9IGxvZGFzaC5maW5kKHJlcy5kYXRhLCBbJ3NvY2lhbEFjY291bnQnLCAndHdpdHRlciddKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKGZhY2Vib29rKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzRmFjZWJvb2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0ZhY2Vib29rTGlua2VkQWNjb3VudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYodHdpdHRlcikge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBjcmVhdGVVc2VyTGlua2VkQWNjb3VudChsaW5rZWRBY2NvdW50KSB7XG4gICAgICAgIHRyeXtcblxuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3VzZXJTZXJ2aWNlLmNyZWF0ZVVzZXJMaW5rZWRBY2NvdW50KGxpbmtlZEFjY291bnQpO1xuXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIGlmKCFyZXMuc3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93RXJyb3JGZWVkYmFjaygnT29vcHMhJywgYFlvdSBjYW4ndCBjb25uZWN0IHVzaW5nIHRoaXMgJHtsaW5rZWRBY2NvdW50LnNvY2lhbEFjY291bnR9IGFjY291bnQuIExvZyBvdXQgYW5kIHRyeSBhbm90aGVyIG9uZS5gKVxuXG4gICAgICAgICAgICAgICAgaWYobGlua2VkQWNjb3VudC5zb2NpYWxBY2NvdW50ID09PSAnZmFjZWJvb2snKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFjZWJvb2tMb2dvdXQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1lbHNlIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd1N1Y2Nlc3NGZWVkYmFjaygnJywgJ1N1Y2Nlc3NmdWxseSBjb25uZWN0ZWQhJylcblxuICAgICAgICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGxpbmtlZEFjY291bnQuc29jaWFsQWNjb3VudCA9PT0gJ2ZhY2Vib29rJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0ZhY2Vib29rTGlua2VkQWNjb3VudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZhY2Vib29rTmFtZSA9IHJlcy5kYXRhLnNvY2lhbEVtYWlsO1xuXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGxpbmtlZEFjY291bnQuc29jaWFsQWNjb3VudCA9PT0gJ3R3aXR0ZXInKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzVHdpdHRlckxpbmtlZEFjY291bnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50d2l0dGVyTmFtZSA9IHJlcy5kYXRhLnNvY2lhbEVtYWlsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=