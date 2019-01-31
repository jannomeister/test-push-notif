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
// OTHERS
var utils_1 = require("utils/utils");
// SERVICES
var auth_service_1 = require("../../services/auth.service");
var user_service_1 = require("../../services/user.service");
var device_service_1 = require("../../services/device.service");
var config_service_1 = require("../../services/config.service");
var facebook_service_1 = require("../../services/facebook.service");
var component_event_service_1 = require("../../services/component-event.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_page, _routerExtensions, _authService, _userService, _deviceService, _facebookService, _configService, _componentService) {
        this._page = _page;
        this._routerExtensions = _routerExtensions;
        this._authService = _authService;
        this._userService = _userService;
        this._deviceService = _deviceService;
        this._facebookService = _facebookService;
        this._configService = _configService;
        this._componentService = _componentService;
        _page.actionBarHidden = true;
        this.navOptions = this._componentService.getRouteOptions();
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this._facebookService.connectWithoutPermission()
            .then(function (token) {
            _this._componentService.showLoader('Signing in...');
            _this._facebookService.getData(token)
                .then(function (data) {
                // this._componentService.hideLoader();
                var user = {
                    firstName: data.first_name,
                    lastName: data.last_name,
                    imageUrl: data.picture.data.url,
                    email: data.email,
                    loginType: 'facebook',
                    facebook: {
                        socialId: data.id,
                        socialName: data.name,
                        socialEmail: data.email,
                        socialAccessToken: token,
                        socialAccount: 'facebook'
                    }
                };
                // this._componentService.showAlert('facebook data', JSON.stringify(user));
                _this.authenticate(user);
            }).catch(function (err) {
                console.log(err);
                _this._componentService.hideLoader();
                _this._routerExtensions.navigate(['/home']);
            });
        }).catch(function (err) { console.log(err); });
    };
    LoginComponent.prototype.registerDevice = function (userId) {
        var _this = this;
        console.log("REGISTER DEVICE!!!!!!");
        this._userService.registerTokenV2()
            .then(function (token) {
            console.log('*** TOKEN (V2) *** ==> ' + token);
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
    LoginComponent.prototype.open = function (url) {
        utils_1.openUrl(url);
    };
    LoginComponent.prototype.authenticate = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._authService.authenticate(user)];
                    case 1:
                        res = _a.sent();
                        if (res.data) {
                            this.getUserData();
                        }
                        else {
                            this._componentService.hideLoader();
                            this._componentService.showErrorFeedback('Ooops!', 'Something went wrong');
                            this._routerExtensions.navigate(["/home"]);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this._componentService.hideLoader();
                        this._componentService.showAlert('Ooops!', e_1.error.error);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.getUserData = function () {
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
                            this.registerDevice(userId);
                            this.updateUserDeviceLoginStatus(res.data);
                        }
                        else {
                            this._componentService.hideLoader();
                            this._componentService.showErrorFeedback('Ooops!', 'Something went wrong');
                            this._routerExtensions.navigate(["/home"]);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this._componentService.hideLoader();
                        this._componentService.showErrorFeedback('Ooops!', 'Something went wrong');
                        this._routerExtensions.navigate(["/home"]);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.updateUserDeviceLoginStatus = function (user) {
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
    LoginComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./login-page.component.html",
            styleUrls: ['./login-page.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.RouterExtensions,
            auth_service_1.AuthService,
            user_service_1.UserService,
            device_service_1.DeviceService,
            facebook_service_1.FacebookService,
            config_service_1.ConfigService,
            component_event_service_1.ComponentEventService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBRWxELHNEQUErRDtBQUMvRCxnQ0FBK0I7QUFFL0IsU0FBUztBQUNULHFDQUFzQztBQUV0QyxXQUFXO0FBQ1gsNERBQTBEO0FBQzFELDREQUEwRDtBQUMxRCxnRUFBOEQ7QUFDOUQsZ0VBQThEO0FBQzlELG9FQUFrRTtBQUNsRSxrRkFBK0U7QUFRL0U7SUFJSSx3QkFDWSxLQUFXLEVBQ1gsaUJBQW1DLEVBQ25DLFlBQXlCLEVBQ3pCLFlBQXlCLEVBQ3pCLGNBQTZCLEVBQzdCLGdCQUFpQyxFQUNqQyxjQUE2QixFQUM3QixpQkFBd0M7UUFQeEMsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUNqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBRWhELEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBRTdCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQy9ELENBQUM7SUFFRCxpQ0FBUSxHQUFSLGNBQVksQ0FBQztJQUViLDhCQUFLLEdBQUw7UUFBQSxpQkFpQ0M7UUFoQ0csSUFBSSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixFQUFFO2FBQzNDLElBQUksQ0FBQyxVQUFDLEtBQUs7WUFDUixLQUFJLENBQUMs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QWlCLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLHNCQUFzQixDQUFDLENBQUM7Ozs7OztLQUVsRjtJQXhJUSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUM1QyxDQUFDO3lDQU1xQixXQUFJO1lBQ1EseUJBQWdCO1lBQ3JCLDBCQUFXO1lBQ1gsMEJBQVc7WUFDVCw4QkFBYTtZQUNYLGtDQUFlO1lBQ2pCLDhCQUFhO1lBQ1YsK0NBQXFCO09BWjNDLGNBQWMsQ0F5STFCO0lBQUQscUJBQUM7Q0FBQSxBQXpJRCxJQXlJQztBQXpJWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuXG4vLyBPVEhFUlNcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcblxuLy8gU0VSVklDRVNcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2F1dGguc2VydmljZVwiO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEZXZpY2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2RldmljZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGYWNlYm9va1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmFjZWJvb2suc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50RXZlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbXBvbmVudC1ldmVudC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2xvZ2luLXBhZ2UuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9sb2dpbi1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgbmF2T3B0aW9uczogYW55O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgX2F1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9kZXZpY2VTZXJ2aWNlOiBEZXZpY2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9mYWNlYm9va1NlcnZpY2U6IEZhY2Vib29rU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfY29tcG9uZW50U2VydmljZTogQ29tcG9uZW50RXZlbnRTZXJ2aWNlLFxuICAgICkge1xuICAgICAgICBfcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuXG4gICAgICAgIHRoaXMubmF2T3B0aW9ucyA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0Um91dGVPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7fVxuXG4gICAgbG9naW4oKSB7XG4gICAgICAgIHRoaXMuX2ZhY2Vib29rU2VydmljZS5jb25uZWN0V2l0aG91dFBlcm1pc3Npb24oKVxuICAgICAgICAgICAgLnRoZW4oKHRva2VuKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdTaWduaW5nIGluLi4uJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmFjZWJvb2tTZXJ2aWNlLmdldERhdGEodG9rZW4pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhOiBhbnkpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXNlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IGRhdGEuZmlyc3RfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZTogZGF0YS5sYXN0X25hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmw6IGRhdGEucGljdHVyZS5kYXRhLnVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogZGF0YS5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dpblR5cGU6ICdmYWNlYm9vaycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjZWJvb2s6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29jaWFsSWQ6IGRhdGEuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2lhbE5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29jaWFsRW1haWw6IGRhdGEuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2lhbEFjY2Vzc1Rva2VuOiB0b2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29jaWFsQWNjb3VudDogJ2ZhY2Vib29rJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdmYWNlYm9vayBkYXRhJywgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZSh1c2VyKVxuXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9ob21lJ10pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7IGNvbnNvbGUubG9nKGVycikgfSlcbiAgICB9XG5cbiAgICByZWdpc3RlckRldmljZSh1c2VySWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSRUdJU1RFUiBERVZJQ0UhISEhISFcIilcbiAgICAgICAgdGhpcy5fdXNlclNlcnZpY2UucmVnaXN0ZXJUb2tlblYyKClcbiAgICAgICAgICAgIC50aGVuKCh0b2tlbjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyoqKiBUT0tFTiAoVjIpICoqKiA9PT4gJyt0b2tlbilcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXZpY2VTZXJ2aWNlLnJlZ2lzdGVyRGV2aWNlKHRva2VuKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoZGV2aWNlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcqKiogREVWSUNFIERBVEEgKioqID09PicpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkZXZpY2UpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZS5yZWdpc3RlclVzZXJEZXZpY2UodXNlcklkLCBkZXZpY2UuZGF0YS5kZXZpY2VJZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodXNlckRldmljZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcqKiogVVNFUiBERVZJQ0UgREFUQSAqKiogPT0+JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlckRldmljZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coJ1JFR0lTVEVSIFVTRVIgREVWSUNFOiAnLGVycikpXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZygnUkVHSVNURVIgREVWSUNFIEVSUk9SOiAnLGVycikpXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coJ1JFR0lTRVIgVE9LRU4gRVJST1I6ICcsZXJyKSlcbiAgICB9XG5cbiAgICBvcGVuKHVybCkge1xuICAgICAgICBvcGVuVXJsKHVybClcbiAgICB9XG5cbiAgICBhc3luYyBhdXRoZW50aWNhdGUodXNlcikge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlKHVzZXIpO1xuXG4gICAgICAgICAgICBpZihyZXMuZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VXNlckRhdGEoKTtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93RXJyb3JGZWVkYmFjaygnT29vcHMhJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nJylcbiAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0pOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vb3BzIScsIGUuZXJyb3IuZXJyb3IpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBnZXRVc2VyRGF0YSgpIHtcbiAgICAgICAgbGV0IHVzZXJJZCA9IHRoaXMuX3VzZXJTZXJ2aWNlLmdldEN1cnJlbnRVc2VySWQoKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3VzZXJTZXJ2aWNlLmdldFVzZXJEYXRhKHVzZXJJZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlckRldmljZSh1c2VySWQpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVXNlckRldmljZUxvZ2luU3RhdHVzKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0Vycm9yRmVlZGJhY2soJ09vb3BzIScsICdTb21ldGhpbmcgd2VudCB3cm9uZycpXG4gICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZVwiXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93RXJyb3JGZWVkYmFjaygnT29vcHMhJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nJylcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWVcIl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgdXBkYXRlVXNlckRldmljZUxvZ2luU3RhdHVzKHVzZXIpIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3VzZXJTZXJ2aWNlLnVwZGF0ZVVzZXJEZXZpY2VMb2dpblN0YXR1cyh1c2VyLnVzZXJJZCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgaWYocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdk9wdGlvbnMuY2xlYXJIaXN0b3J5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3VzZXItYWxlcnQnXSwgdGhpcy5uYXZPcHRpb25zKTtcblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlclNlcnZpY2UucmVtb3ZlQ3VycmVudFVzZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dFcnJvckZlZWRiYWNrKCdPb29wcyEnLCAnU29tZXRoaW5nIHdlbnQgd3JvbmcnKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLnJlbW92ZUN1cnJlbnRVc2VyKCk7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dFcnJvckZlZWRiYWNrKCdPb29wcyEnLCAnU29tZXRoaW5nIHdlbnQgd3JvbmcnKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=