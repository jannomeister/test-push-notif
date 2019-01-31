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
var auth_service_1 = require("../../services/auth.service");
var user_service_1 = require("../../services/user.service");
var component_event_service_1 = require("../../services/component-event.service");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
// OTHERS
var utils_1 = require("utils/utils");
// MODELS
var user_model_1 = require("../../models/user.model");
var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(page, vcRef, modal, _routerExtensions, _authService, _userService, _componentService) {
        this.page = page;
        this.vcRef = vcRef;
        this.modal = modal;
        this._routerExtensions = _routerExtensions;
        this._authService = _authService;
        this._userService = _userService;
        this._componentService = _componentService;
        this.isMatch = true;
        this.confirmationPassword = '';
        page.actionBarHidden = true;
        this.user = new user_model_1.User();
        this.user.deserialize({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: ''
        });
        this.navOptions = this._componentService.getRouteOptions();
    }
    SignUpComponent.prototype.ngOnInit = function () { };
    SignUpComponent.prototype.pass = function (event) {
        this.isMatch = false;
        var confirmpass = this.page.getViewById("confirmpass");
        if (this.user.password === confirmpass.text) {
            this.isMatch = true;
        }
    };
    SignUpComponent.prototype.goBack = function () {
        this.navOptions.transition.name = 'slideRight';
        this._routerExtensions.navigate(['/home'], this.navOptions);
    };
    SignUpComponent.prototype.signup = function () {
        var _this = this;
        if (!this._componentService.hasInternetConnection()) {
            this._componentService.showAlert('Ooops!', 'Internet connection not available');
            return;
        }
        else if (!this._componentService.validatePhoneNumber(this.user.phoneNumber)) {
            this._componentService.showAlert('Ooops!', 'Invalid Phone number');
            return;
        }
        else {
            this._componentService.showLoader('Creating...');
            setTimeout(function () {
                _this.register();
            }, 800);
        }
    };
    SignUpComponent.prototype.open = function (url) {
        utils_1.openUrl(url);
    };
    SignUpComponent.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._authService.register(this.user)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.success) {
                            if (res.data.status === "unverified") {
                                this.navOptions.clearHistory = false;
                                this._userService.saveCurrentUser(res);
                                this._routerExtensions.navigate(['/verification'], this.navOptions);
                            }
                        }
                        else {
                            this._componentService.showAlert('Ooops', res.message);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this._componentService.hideLoader();
                        this._componentService.showAlert('Ooops', 'Unable to create account. Please try again later.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SignUpComponent = __decorate([
        core_1.Component({
            selector: "signup-page",
            moduleId: module.id,
            templateUrl: "./signup-page.component.html",
            styleUrls: ['./signup-page.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            core_1.ViewContainerRef,
            dialogs_1.ModalDialogService,
            router_1.RouterExtensions,
            auth_service_1.AuthService,
            user_service_1.UserService,
            component_event_service_1.ComponentEventService])
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbnVwLXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2lnbnVwLXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBb0U7QUFFcEUsc0RBQStEO0FBRS9ELGlEQUFnRDtBQUVoRCw0REFBMEQ7QUFDMUQsNERBQTBEO0FBQzFELGtGQUErRTtBQUMvRSxtRUFBNkU7QUFFN0UsU0FBUztBQUNULHFDQUFzQztBQUV0QyxTQUFTO0FBQ1Qsc0RBQStDO0FBUS9DO0lBU0kseUJBQ1ksSUFBVSxFQUNWLEtBQXVCLEVBQ3ZCLEtBQXlCLEVBQ3pCLGlCQUFtQyxFQUNuQyxZQUF5QixFQUN6QixZQUF5QixFQUN6QixpQkFBd0M7UUFOeEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQWRwRCxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YseUJBQW9CLEdBQVcsRUFBRSxDQUFDO1FBZ0I5QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUU1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2xCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsUUFBUSxFQUFFLEVBQUU7WUFDWixLQUFLLEVBQUUsRUFBRTtZQUNULFdBQVcsRUFBRSxFQUFFO1lBQ2YsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDLENBQUE7UUFFRixJQUFJLENB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Q0FBQyw2QkFBNkIsQ0FBQztTQUM3QyxDQUFDO3lDQVdvQixXQUFJO1lBQ0gsdUJBQWdCO1lBQ2hCLDRCQUFrQjtZQUNOLHlCQUFnQjtZQUNyQiwwQkFBVztZQUNYLDBCQUFXO1lBQ04sK0NBQXFCO09BaEIzQyxlQUFlLENBd0YzQjtJQUFELHNCQUFDO0NBQUEsQUF4RkQsSUF3RkM7QUF4RlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcblxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuXG4vLyBPVEhFUlNcbmltcG9ydCB7IG9wZW5VcmwgfSBmcm9tIFwidXRpbHMvdXRpbHNcIjtcblxuLy8gTU9ERUxTXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy91c2VyLm1vZGVsXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNpZ251cC1wYWdlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NpZ251cC1wYWdlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2lnbnVwLXBhZ2UuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBTaWduVXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgaXNNYXRjaCA9IHRydWU7XG4gICAgY29uZmlybWF0aW9uUGFzc3dvcmQ6IHN0cmluZyA9ICcnO1xuXG4gICAgdXNlcjogVXNlcjtcblxuICAgIG5hdk9wdGlvbnM6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSwgXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgX2F1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9jb21wb25lbnRTZXJ2aWNlOiBDb21wb25lbnRFdmVudFNlcnZpY2UsXG4gICAgICAgIFxuICAgICkgeyBcbiAgICAgICAgcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlOyBcblxuICAgICAgICB0aGlzLnVzZXIgPSBuZXcgVXNlcigpO1xuICAgICAgICB0aGlzLnVzZXIuZGVzZXJpYWxpemUoe1xuICAgICAgICAgICAgZmlyc3ROYW1lOiAnJyxcbiAgICAgICAgICAgIGxhc3ROYW1lOiAnJyxcbiAgICAgICAgICAgIGVtYWlsOiAnJyxcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiAnJyxcbiAgICAgICAgICAgIHBhc3N3b3JkOiAnJ1xuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMubmF2T3B0aW9ucyA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0Um91dGVPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7fVxuXG4gICAgcGFzcyhldmVudCl7XG4gICAgICAgIHRoaXMuaXNNYXRjaCA9IGZhbHNlO1xuICAgICAgICBsZXQgY29uZmlybXBhc3MgPSA8VGV4dEZpZWxkPnRoaXMucGFnZS5nZXRWaWV3QnlJZChcImNvbmZpcm1wYXNzXCIpO1xuICAgICAgICBpZih0aGlzLnVzZXIucGFzc3dvcmQgPT09IGNvbmZpcm1wYXNzLnRleHQpe1xuICAgICAgICAgICAgdGhpcy5pc01hdGNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zLnRyYW5zaXRpb24ubmFtZSA9ICdzbGlkZVJpZ2h0JztcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9ob21lJ10sIHRoaXMubmF2T3B0aW9ucylcbiAgICB9XG5cbiAgICBzaWdudXAoKSB7XG4gICAgICAgIGlmKCF0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhhc0ludGVybmV0Q29ubmVjdGlvbigpKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ0ludGVybmV0IGNvbm5lY3Rpb24gbm90IGF2YWlsYWJsZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9ZWxzZSBpZighdGhpcy5fY29tcG9uZW50U2VydmljZS52YWxpZGF0ZVBob25lTnVtYmVyKHRoaXMudXNlci5waG9uZU51bWJlcikpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb29wcyEnLCAnSW52YWxpZCBQaG9uZSBudW1iZXInKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdDcmVhdGluZy4uLicpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlcigpO1xuICAgICAgICAgICAgfSwgODAwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3Blbih1cmwpIHtcbiAgICAgICAgb3BlblVybCh1cmwpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlZ2lzdGVyKCl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fYXV0aFNlcnZpY2UucmVnaXN0ZXIodGhpcy51c2VyKTtcblxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICBpZihyZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLnN0YXR1cyA9PT0gXCJ1bnZlcmlmaWVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZPcHRpb25zLmNsZWFySGlzdG9yeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyU2VydmljZS5zYXZlQ3VycmVudFVzZXIocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy92ZXJpZmljYXRpb24nXSwgdGhpcy5uYXZPcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ09vb3BzJywgcmVzLm1lc3NhZ2UpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMnLCAnVW5hYmxlIHRvIGNyZWF0ZSBhY2NvdW50LiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufVxuIl19