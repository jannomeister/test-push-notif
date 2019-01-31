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
var messaging_1 = require("nativescript-plugin-firebase/messaging");
// OTHERS
var utils_1 = require("utils/utils");
// MODELS
var user_model_1 = require("../../models/user.model");
// SERVICES
var auth_service_1 = require("../../services/auth.service");
var user_service_1 = require("../../services/user.service");
var device_service_1 = require("../../services/device.service");
var config_service_1 = require("../../services/config.service");
var component_event_service_1 = require("../../services/component-event.service");
var SignInComponent = /** @class */ (function () {
    function SignInComponent(page, _routerExtensions, _authService, _userService, _deviceService, _configService, _componentService) {
        this.page = page;
        this._routerExtensions = _routerExtensions;
        this._authService = _authService;
        this._userService = _userService;
        this._deviceService = _deviceService;
        this._configService = _configService;
        this._componentService = _componentService;
        page.actionBarHidden = true;
        this.user = new user_model_1.User();
        this.navOptions = this._componentService.getRouteOptions();
    }
    SignInComponent.prototype.ngOnInit = function () {
        this.initUser();
    };
    SignInComponent.prototype.initUser = function () {
        this.user.deserialize({
            email: 'jannodejesus22@gmail.com',
            password: 'password',
            loginType: 'manual'
        });
    };
    SignInComponent.prototype.gotoHome = function () {
        this.navOptions.transition.name = 'slideRight';
        this._routerExtensions.navigate(['/home'], this.navOptions);
    };
    SignInComponent.prototype.forgetPass = function () {
        this.navOptions.transition.name = 'slideTop';
        this._routerExtensions.navigate(['/forget-password'], this.navOptions);
    };
    SignInComponent.prototype.signIn = function () {
        messaging_1.messaging.getCurrentPushToken()
            .then(function (token) { return console.log("Current push token: " + token); });
        // messaging.registerForPushNotifications({
        //     onPushTokenReceivedCallback: (token: string): void => {
        //         console.log("XXX token: " + token)
        //     },
        //     onMessageReceivedCallback: (message: Message) => {
        //       console.log("Push message received: " + message.title);
        //     }
        // }).then(() => console.log("Registered for push"));
        // let email = <TextField>this.page.getViewById("email");
        // let pass = <TextField>this.page.getViewById("pass");
        // email.dismissSoftInput();
        // pass.dismissSoftInput();
        // if(!this.user.isRequiredFieldsNotEmpty()) {
        //     this._componentService.showLoader('Signing in...');
        //     setTimeout(() => {
        //         this._componentService.hideLoader();
        //         this._componentService.showAlert('Ooops!', 'All fields are required');
        //         return;
        //     }, 800);
        // }else if(!this._componentService.hasInternetConnection()) {
        //     this._componentService.showAlert('Ooops!', 'Internet connection not available');
        //     return;
        // }else {
        //     this._componentService.showLoader('Signing in...');
        //     this.authenticate();
        // }
    };
    SignInComponent.prototype.registerDevice = function (userId) {
        this._userService.registerTokenV2()
            .then(function (token) {
            console.log("registerDevice: " + token);
            // console.log('*** TOKEN (V2) *** ==> '+token)
            // this._deviceService.registerDevice(token)
            //     .then((device: any) => {
            //         console.log('*** DEVICE DATA *** ==>')
            //         console.log(device)
            //         this._userService.registerUserDevice(userId, device.data.deviceId)
            //             .then((userDevice: any) => {
            //                 console.log('*** USER DEVICE DATA *** ==>')
            //                 console.log(userDevice)
            //             }).catch(err => console.log('REGISTER USER DEVICE: ',err))
            //     }).catch(err => console.log('REGISTER DEVICE ERROR: ',err))
        });
    };
    SignInComponent.prototype.open = function (url) {
        utils_1.openUrl(url);
    };
    SignInComponent.prototype.authenticate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._authService.authenticate(this.user)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        this.registerDevice(res.data.userId);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        this._componentService.hideLoader();
                        if (e_1.error.error)
                            this._componentService.showAlert('Unauthorized!', e_1.error.error);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SignInComponent.prototype.updateUserDeviceLoginStatus = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_2;
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
                            this._routerExtensions.navigate(['/dashboard'], this.navOptions);
                        }
                        else {
                            this._userService.removeCurrentUser();
                            this._componentService.showErrorFeedback('Ooops!', 'Something went wrong');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        this._componentService.hideLoader();
                        this._userService.removeCurrentUser();
                        this._componentService.showErrorFeedback('Ooops!', 'Something went wrong');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SignInComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "signin",
            templateUrl: './signin-page.component.html',
            styleUrls: ['./signin-page.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.RouterExtensions,
            auth_service_1.AuthService,
            user_service_1.UserService,
            device_service_1.DeviceService,
            config_service_1.ConfigService,
            component_event_service_1.ComponentEventService])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmluLXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2lnbmluLXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFFbEQsc0RBQStEO0FBRS9ELGlEQUFnRDtBQUNoRCxvRUFBNEU7QUFFNUUsU0FBUztBQUNULHFDQUFzQztBQUV0QyxTQUFTO0FBQ1Qsc0RBQStDO0FBRS9DLFdBQVc7QUFDWCw0REFBMEQ7QUFDMUQsNERBQTBEO0FBQzFELGdFQUE4RDtBQUM5RCxnRUFBOEQ7QUFDOUQsa0ZBQStFO0FBUS9FO0lBTUkseUJBQ1ksSUFBVSxFQUNWLGlCQUFtQyxFQUNuQyxZQUF5QixFQUN6QixZQUF5QixFQUN6QixjQUE2QixFQUM3QixjQUE2QixFQUM3QixpQkFBd0M7UUFOeEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0IsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQUVoRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUU1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQy9ELENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7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b3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IG1lc3NhZ2luZywgTWVzc2FnZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL21lc3NhZ2luZ1wiO1xuXG4vLyBPVEhFUlNcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcblxuLy8gTU9ERUxTXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy91c2VyLm1vZGVsXCI7XG5cbi8vIFNFUlZJQ0VTXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgRGV2aWNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9kZXZpY2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb25maWcuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50RXZlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbXBvbmVudC1ldmVudC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwic2lnbmluXCIsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NpZ25pbi1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zaWduaW4tcGFnZS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFNpZ25JbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgXG4gICAgbmF2T3B0aW9uczogYW55O1xuXG4gICAgdXNlcjogVXNlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgX2F1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9kZXZpY2VTZXJ2aWNlOiBEZXZpY2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9jb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9jb21wb25lbnRTZXJ2aWNlOiBDb21wb25lbnRFdmVudFNlcnZpY2UsXG4gICAgKSB7IFxuICAgICAgICBwYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7IFxuXG4gICAgICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKCk7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucyA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0Um91dGVPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdFVzZXIoKTtcbiAgICB9XG5cbiAgICBpbml0VXNlcigpIHtcbiAgICAgICAgdGhpcy51c2VyLmRlc2VyaWFsaXplKHtcbiAgICAgICAgICAgIGVtYWlsOiAnamFubm9kZWplc3VzMjJAZ21haWwuY29tJyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQnLFxuICAgICAgICAgICAgbG9naW5UeXBlOiAnbWFudWFsJ1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdvdG9Ib21lKCkge1xuICAgICAgICB0aGlzLm5hdk9wdGlvbnMudHJhbnNpdGlvbi5uYW1lID0gJ3NsaWRlUmlnaHQnO1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2hvbWUnXSwgdGhpcy5uYXZPcHRpb25zKTtcbiAgICB9XG5cbiAgICBmb3JnZXRQYXNzKCkge1xuICAgICAgICB0aGlzLm5hdk9wdGlvbnMudHJhbnNpdGlvbi5uYW1lID0gJ3NsaWRlVG9wJztcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9mb3JnZXQtcGFzc3dvcmQnXSwgdGhpcy5uYXZPcHRpb25zKTtcbiAgICB9XG5cbiAgICBzaWduSW4oKSB7XG4gICAgICAgIG1lc3NhZ2luZy5nZXRDdXJyZW50UHVzaFRva2VuKClcbiAgICAgICAgICAgIC50aGVuKHRva2VuID0+IGNvbnNvbGUubG9nKGBDdXJyZW50IHB1c2ggdG9rZW46ICR7dG9rZW59YCkpO1xuICAgICAgICAvLyBtZXNzYWdpbmcucmVnaXN0ZXJGb3JQdXNoTm90aWZpY2F0aW9ucyh7XG4gICAgICAgIC8vICAgICBvblB1c2hUb2tlblJlY2VpdmVkQ2FsbGJhY2s6ICh0b2tlbjogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJYWFggdG9rZW46IFwiICsgdG9rZW4pXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAgIFxuICAgICAgICAvLyAgICAgb25NZXNzYWdlUmVjZWl2ZWRDYWxsYmFjazogKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgLy8gICAgICAgY29uc29sZS5sb2coXCJQdXNoIG1lc3NhZ2UgcmVjZWl2ZWQ6IFwiICsgbWVzc2FnZS50aXRsZSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pLnRoZW4oKCkgPT4gY29uc29sZS5sb2coXCJSZWdpc3RlcmVkIGZvciBwdXNoXCIpKTtcbiAgICAgICAgLy8gbGV0IGVtYWlsID0gPFRleHRGaWVsZD50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoXCJlbWFpbFwiKTtcbiAgICAgICAgLy8gbGV0IHBhc3MgPSA8VGV4dEZpZWxkPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcInBhc3NcIik7XG5cbiAgICAgICAgLy8gZW1haWwuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICAvLyBwYXNzLmRpc21pc3NTb2Z0SW5wdXQoKTtcblxuICAgICAgICAvLyBpZighdGhpcy51c2VyLmlzUmVxdWlyZWRGaWVsZHNOb3RFbXB0eSgpKSB7XG4gICAgICAgIC8vICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ1NpZ25pbmcgaW4uLi4nKTtcbiAgICAgICAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb29wcyEnLCAnQWxsIGZpZWxkcyBhcmUgcmVxdWlyZWQnKTtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm47XG4gICAgICAgIC8vICAgICB9LCA4MDApO1xuICAgICAgICAvLyB9ZWxzZSBpZighdGhpcy5fY29tcG9uZW50U2VydmljZS5oYXNJbnRlcm5ldENvbm5lY3Rpb24oKSkge1xuICAgICAgICAvLyAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vb3BzIScsICdJbnRlcm5ldCBjb25uZWN0aW9uIG5vdCBhdmFpbGFibGUnKTtcbiAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgLy8gfWVsc2Uge1xuICAgICAgICAvLyAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdTaWduaW5nIGluLi4uJyk7XG4gICAgICAgIC8vICAgICB0aGlzLmF1dGhlbnRpY2F0ZSgpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJEZXZpY2UodXNlcklkKSB7XG4gICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLnJlZ2lzdGVyVG9rZW5WMigpXG4gICAgICAgICAgICAudGhlbigodG9rZW4pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyRGV2aWNlOiBcIiArIHRva2VuKVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCcqKiogVE9LRU4gKFYyKSAqKiogPT0+ICcrdG9rZW4pXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fZGV2aWNlU2VydmljZS5yZWdpc3RlckRldmljZSh0b2tlbilcbiAgICAgICAgICAgICAgICAvLyAgICAgLnRoZW4oKGRldmljZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZygnKioqIERFVklDRSBEQVRBICoqKiA9PT4nKVxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZGV2aWNlKVxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5fdXNlclNlcnZpY2UucmVnaXN0ZXJVc2VyRGV2aWNlKHVzZXJJZCwgZGV2aWNlLmRhdGEuZGV2aWNlSWQpXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgLnRoZW4oKHVzZXJEZXZpY2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnKioqIFVTRVIgREVWSUNFIERBVEEgKioqID09PicpXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJEZXZpY2UpXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKCdSRUdJU1RFUiBVU0VSIERFVklDRTogJyxlcnIpKVxuICAgICAgICAgICAgICAgIC8vICAgICB9KS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coJ1JFR0lTVEVSIERFVklDRSBFUlJPUjogJyxlcnIpKVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb3Blbih1cmwpIHtcbiAgICAgICAgb3BlblVybCh1cmwpO1xuICAgIH1cblxuICAgIGFzeW5jIGF1dGhlbnRpY2F0ZSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9hdXRoU2VydmljZS5hdXRoZW50aWNhdGUodGhpcy51c2VyKTtcblxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRGV2aWNlKHJlcy5kYXRhLnVzZXJJZCk7XG4gICAgICAgICAgICAvLyBpZihyZXMuZGF0YS5zdGF0dXMgIT09ICd1bnZlcmlmaWVkJykge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMucmVnaXN0ZXJEZXZpY2UocmVzLmRhdGEudXNlcklkKTtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnVwZGF0ZVVzZXJEZXZpY2VMb2dpblN0YXR1cyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAvLyB9ZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5uYXZPcHRpb25zLmNsZWFySGlzdG9yeSA9IGZhbHNlXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy92ZXJpZmljYXRpb24nXSwgdGhpcy5uYXZPcHRpb25zKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgaWYoZS5lcnJvci5lcnJvcikgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ1VuYXV0aG9yaXplZCEnLCBlLmVycm9yLmVycm9yKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgdXBkYXRlVXNlckRldmljZUxvZ2luU3RhdHVzKHVzZXIpIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3VzZXJTZXJ2aWNlLnVwZGF0ZVVzZXJEZXZpY2VMb2dpblN0YXR1cyh1c2VyLnVzZXJJZCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgaWYocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdk9wdGlvbnMuY2xlYXJIaXN0b3J5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLnJlbW92ZUN1cnJlbnRVc2VyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93RXJyb3JGZWVkYmFjaygnT29vcHMhJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZS5yZW1vdmVDdXJyZW50VXNlcigpO1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93RXJyb3JGZWVkYmFjaygnT29vcHMhJywgJ1NvbWV0aGluZyB3ZW50IHdyb25nJylcbiAgICAgICAgfVxuICAgIH0gXG59XG4iXX0=