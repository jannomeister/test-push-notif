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
var page_1 = require("tns-core-modules/ui/page");
var router_1 = require("nativescript-angular/router");
var user_service_1 = require("../../services/user.service");
var component_event_service_1 = require("../../services/component-event.service");
var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(page, _routerExtensions, _userService, _componentService) {
        this.page = page;
        this._routerExtensions = _routerExtensions;
        this._userService = _userService;
        this._componentService = _componentService;
        this.userId = 0;
        this.user = {
            password: '',
            newPassword: '',
        };
        page.actionBarHidden = true;
        this.userId = this._userService.getCurrentUserId();
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
    };
    ChangePasswordComponent.prototype.save = function () {
        var _this = this;
        this._componentService.showLoader('Updating...');
        if (!this.user.password || !this.user.newPassword) {
            setTimeout(function () {
                _this._componentService.hideLoader();
                _this._componentService.showErrorFeedback('Ooops', 'All Fields are required.');
                return;
            }, 1200);
        }
        else {
            this.changePassword();
        }
    };
    ChangePasswordComponent.prototype.onClose = function () {
        this._routerExtensions.backToPreviousPage();
    };
    ChangePasswordComponent.prototype.changePassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userService.changePassword(this.userId, this.user)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.success) {
                            this._componentService.showSuccessFeedback('Success', 'Password successfully changed.');
                            this.onClose();
                        }
                        else {
                            this._componentService.showErrorFeedback('Ooops', 'Invalid password');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this._componentService.hideLoader();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChangePasswordComponent = __decorate([
        core_1.Component({
            selector: "change-password-page",
            moduleId: module.id,
            templateUrl: "./change-password-page.component.html",
            styleUrls: ['./change-password-page.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.RouterExtensions,
            user_service_1.UserService,
            component_event_service_1.ComponentEventService])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLXBhc3N3b3JkLXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hhbmdlLXBhc3N3b3JkLXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFFbEQsaURBQWdEO0FBQ2hELHNEQUErRDtBQUUvRCw0REFBMEQ7QUFDMUQsa0ZBQStFO0FBUS9FO0lBUUksaUNBQ1ksSUFBVSxFQUNoQixpQkFBbUMsRUFDN0IsWUFBeUIsRUFDekIsaUJBQXdDO1FBSHhDLFNBQUksR0FBSixJQUFJLENBQU07UUFDaEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUM3QixpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUN6QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBVnBELFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsU0FBSSxHQUFRO1lBQ1IsUUFBUSxFQUFFLEVBQUU7WUFDWixXQUFXLEVBQUUsRUFBRTtTQUNsQixDQUFBO1FBUUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFFNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVELDBDQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUQsc0NBQUksR0FBSjtRQUFBLGlCQVlDO1FBWEcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVqRCxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUM5QyxVQUFVLENBQUM7Z0JBQ1AsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNwQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLDBCQUEwQixDQUFDLENBQUM7Z0JBQzlFLE9BQU87WUFDWCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDWDthQUFJO1lBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQUVELHlDQUFPLEdBQVA7UUFDQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUssZ0RBQWMsR0FBcEI7Ozs7Ozs7d0JBR2tCLHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBcEUsR0FBRyxHQUFHLFNBQThEO3dCQUV4RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7d0JBRXBDLElBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRTs0QkFDWixJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLGdDQUFnQyxDQUFDLENBQUM7NEJBQ3hGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt5QkFDbEI7NkJBQUk7NEJBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO3lCQUN6RTs7Ozt3QkFHRixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7Ozs7OztLQUUxQztJQTFEUSx1QkFBdUI7UUFObkMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1Q0FBdUM7WUFDcEQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLENBQUM7U0FDdEQsQ0FBQzt5Q0FVb0IsV0FBSTtZQUNHLHlCQUFnQjtZQUNmLDBCQUFXO1lBQ04sK0NBQXFCO09BWjNDLHVCQUF1QixDQTREbkM7SUFBRCw4QkFBQztDQUFBLEFBNURELElBNERDO0FBNURZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50RXZlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbXBvbmVudC1ldmVudC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImNoYW5nZS1wYXNzd29yZC1wYWdlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NoYW5nZS1wYXNzd29yZC1wYWdlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2hhbmdlLXBhc3N3b3JkLXBhZ2UuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDaGFuZ2VQYXNzd29yZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgXG4gICAgdXNlcklkOiBudW1iZXIgPSAwO1xuICAgIHVzZXI6IGFueSA9IHtcbiAgICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgICBuZXdQYXNzd29yZDogJycsXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZSxcblx0XHRwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcbiAgICApIHtcbiAgICAgICAgcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuXG4gICAgICAgIHRoaXMudXNlcklkID0gdGhpcy5fdXNlclNlcnZpY2UuZ2V0Q3VycmVudFVzZXJJZCgpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdVcGRhdGluZy4uLicpO1xuXG4gICAgICAgIGlmKCF0aGlzLnVzZXIucGFzc3dvcmQgfHwgIXRoaXMudXNlci5uZXdQYXNzd29yZCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93RXJyb3JGZWVkYmFjaygnT29vcHMnLCAnQWxsIEZpZWxkcyBhcmUgcmVxdWlyZWQuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSwgMTIwMClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVBhc3N3b3JkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsb3NlKCkge1xuICAgIFx0dGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgICB9XG5cbiAgICBhc3luYyBjaGFuZ2VQYXNzd29yZCgpIHtcblxuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UuY2hhbmdlUGFzc3dvcmQodGhpcy51c2VySWQsIHRoaXMudXNlcik7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuXG4gICAgICAgICAgICBpZihyZXMuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd1N1Y2Nlc3NGZWVkYmFjaygnU3VjY2VzcycsICdQYXNzd29yZCBzdWNjZXNzZnVsbHkgY2hhbmdlZC4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0Vycm9yRmVlZGJhY2soJ09vb3BzJywgJ0ludmFsaWQgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgIFxufSJdfQ==