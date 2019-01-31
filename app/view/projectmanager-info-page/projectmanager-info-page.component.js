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
var router_1 = require("@angular/router");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
// OTHERS
var TNSPhone = require("nativescript-phone");
// MODELS
var user_model_1 = require("../../models/user.model");
// SERVICES
var user_service_1 = require("../../services/user.service");
var component_event_service_1 = require("../../services/component-event.service");
var ProjectManagerInfoComponent = /** @class */ (function () {
    function ProjectManagerInfoComponent(params, _activatedRoute, _userService, _componentService) {
        this.params = params;
        this._activatedRoute = _activatedRoute;
        this._userService = _userService;
        this._componentService = _componentService;
        this.userId = 0;
        this.isInitialized = false;
        this.user = new user_model_1.User();
        this.userId = this.params.context.userId;
    }
    ProjectManagerInfoComponent.prototype.ngOnInit = function () {
        var user = this._componentService.getProjectManager();
        if (user.userId) {
            this.user.deserialize(user);
        }
        else {
            this.getUserData();
        }
    };
    ProjectManagerInfoComponent.prototype.onClose = function () {
        this.params.closeCallback(false);
    };
    ProjectManagerInfoComponent.prototype.mailTo = function () {
        var utilsModule = require("tns-core-modules/utils/utils");
        utilsModule.openUrl("mailto:janno@hyperstacksinc.com.com?Subject=Hello%20again");
    };
    ProjectManagerInfoComponent.prototype.showPhoneOption = function () {
        var _this = this;
        this._componentService.showPhoneAlert()
            .then(function (result) {
            (result === 'Call') ? _this.call() : _this.text();
        });
    };
    ProjectManagerInfoComponent.prototype.call = function () {
        var _this = this;
        TNSPhone.requestCallPermission('You should accept the permission to be able to make a direct phone call.')
            .then(function () { return TNSPhone.dial(_this.user.phoneNumber, false); })
            .catch(function () { return TNSPhone.dial(_this.user.phoneNumber, true); });
    };
    ProjectManagerInfoComponent.prototype.text = function () {
        console.log('text...');
        this._componentService.showAlert('Sorry!', 'This feature is still under development.');
    };
    ProjectManagerInfoComponent.prototype.getUserData = function () {
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
                            this.user.imageUrl = this._componentService.getProjectManageProfile(this.user.imageUrl);
                            this._componentService.saveProjectManager(this.user);
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
    ProjectManagerInfoComponent = __decorate([
        core_1.Component({
            selector: "projectmanager-info-page",
            moduleId: module.id,
            templateUrl: "./projectmanager-info-page.component.html",
            styleUrls: ['./projectmanager-info-page.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
            router_1.ActivatedRoute,
            user_service_1.UserService,
            component_event_service_1.ComponentEventService])
    ], ProjectManagerInfoComponent);
    return ProjectManagerInfoComponent;
}());
exports.ProjectManagerInfoComponent = ProjectManagerInfoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdG1hbmFnZXItaW5mby1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2plY3RtYW5hZ2VyLWluZm8tcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsbUVBQTRFO0FBRTVFLFNBQVM7QUFDVCw2Q0FBK0M7QUFFL0MsU0FBUztBQUNULHNEQUErQztBQUUvQyxXQUFXO0FBQ1gsNERBQTBEO0FBQzFELGtGQUErRTtBQVEvRTtJQVFJLHFDQUNZLE1BQXlCLEVBQzVCLGVBQStCLEVBQzVCLFlBQXlCLEVBQ3pCLGlCQUF3QztRQUh4QyxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUM1QixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQVZwRCxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBRW5CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBVTNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxFQUFFLENBQUM7UUFFdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDN0MsQ0FBQztJQUVELDhDQUFRLEdBQVI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV0RCxJQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUM5QjthQUFLO1lBQ0YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVELDZDQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsNENBQU0sR0FBTjtRQUNJLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzFELFdBQVcsQ0FBQyxPQUFPLENBQUMsMkRBQTJELENBQUMsQ0FBQTtJQUNwRixDQUFDO0lBRUQscURBQWUsR0FBZjtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRTthQUNsQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ1QsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUEsQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25ELENBQUMsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQUVELDBDQUFJLEdBQUo7UUFBQSxpQkFJQztRQUhHLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQywwRUFBMEUsQ0FBQzthQUNyRyxJQUFJLENBQUMsY0FBTSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQTNDLENBQTJDLENBQUM7YUFDdkQsS0FBSyxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUExQyxDQUEwQyxDQUFDLENBQUE7SUFDaEUsQ0FBQztJQUVELDBDQUFJLEdBQUo7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLDBDQUEwQyxDQUFDLENBQUE7SUFDMUYsQ0FBQztJQUVLLGlEQUFXLEdBQWpCOzs7Ozs7O3dCQUdZLHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQXRELEdBQUcsR0FBRyxTQUFnRDt3QkFFcEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7d0JBQzFCLElBQUcsR0FBRyxDQUFDLElBQUksRUFBRTs0QkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUV4RixJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO3lCQUN2RDs7Ozt3QkFHRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzs7Ozs7O0tBRWpDO0lBeEVRLDJCQUEyQjtRQU52QyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJDQUEyQztZQUN4RCxTQUFTLEVBQUUsQ0FBQywwQ0FBMEMsQ0FBQztTQUMxRCxDQUFDO3lDQVVzQiwyQkFBaUI7WUFDWCx1QkFBYztZQUNkLDBCQUFXO1lBQ04sK0NBQXFCO09BWjNDLDJCQUEyQixDQTBFdkM7SUFBRCxrQ0FBQztDQUFBLEFBMUVELElBMEVDO0FBMUVZLGtFQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5cbi8vIE9USEVSU1xuaW1wb3J0ICogYXMgVE5TUGhvbmUgZnJvbSBcIm5hdGl2ZXNjcmlwdC1waG9uZVwiO1xuXG4vLyBNT0RFTFNcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcblxuLy8gU0VSVklDRVNcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50RXZlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbXBvbmVudC1ldmVudC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInByb2plY3RtYW5hZ2VyLWluZm8tcGFnZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wcm9qZWN0bWFuYWdlci1pbmZvLXBhZ2UuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9qZWN0bWFuYWdlci1pbmZvLXBhZ2UuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9qZWN0TWFuYWdlckluZm9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIFxuICAgIHVzZXJJZDogbnVtYmVyID0gMDtcblxuICAgIGlzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHVzZXI6IFVzZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxuICAgIFx0cHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcbiAgICApIHtcbiAgICAgICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcblxuICAgICAgICB0aGlzLnVzZXJJZCA9IHRoaXMucGFyYW1zLmNvbnRleHQudXNlcklkOyAgICAgXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGxldCB1c2VyID0gdGhpcy5fY29tcG9uZW50U2VydmljZS5nZXRQcm9qZWN0TWFuYWdlcigpO1xuXG4gICAgICAgIGlmKHVzZXIudXNlcklkKSB7XG4gICAgICAgICAgICB0aGlzLnVzZXIuZGVzZXJpYWxpemUodXNlcilcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nZXRVc2VyRGF0YSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DbG9zZSgpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhmYWxzZSk7XG4gICAgfVxuXG4gICAgbWFpbFRvKCkge1xuICAgICAgICB2YXIgdXRpbHNNb2R1bGUgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91dGlscy91dGlsc1wiKTtcbiAgICAgICAgdXRpbHNNb2R1bGUub3BlblVybChcIm1haWx0bzpqYW5ub0BoeXBlcnN0YWNrc2luYy5jb20uY29tP1N1YmplY3Q9SGVsbG8lMjBhZ2FpblwiKVxuICAgIH1cblxuICAgIHNob3dQaG9uZU9wdGlvbigpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93UGhvbmVBbGVydCgpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgKHJlc3VsdCA9PT0gJ0NhbGwnKT8gdGhpcy5jYWxsKCkgOiB0aGlzLnRleHQoKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgY2FsbCgpIHsgXG4gICAgICAgIFROU1Bob25lLnJlcXVlc3RDYWxsUGVybWlzc2lvbignWW91IHNob3VsZCBhY2NlcHQgdGhlIHBlcm1pc3Npb24gdG8gYmUgYWJsZSB0byBtYWtlIGEgZGlyZWN0IHBob25lIGNhbGwuJylcbiAgICAgICAgICAgIC50aGVuKCgpID0+IFROU1Bob25lLmRpYWwodGhpcy51c2VyLnBob25lTnVtYmVyLCBmYWxzZSkpXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4gVE5TUGhvbmUuZGlhbCh0aGlzLnVzZXIucGhvbmVOdW1iZXIsIHRydWUpKVxuICAgIH1cblxuICAgIHRleHQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0ZXh0Li4uJylcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoJ1NvcnJ5IScsICdUaGlzIGZlYXR1cmUgaXMgc3RpbGwgdW5kZXIgZGV2ZWxvcG1lbnQuJylcbiAgICB9XG5cbiAgICBhc3luYyBnZXRVc2VyRGF0YSgpIHtcblxuICAgIFx0dHJ5e1xuICAgIFx0XHRsZXQgcmVzID0gYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UuZ2V0VXNlckRhdGEodGhpcy51c2VySWQpO1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmKHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyLmRlc2VyaWFsaXplKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXIuaW1hZ2VVcmwgPSB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmdldFByb2plY3RNYW5hZ2VQcm9maWxlKHRoaXMudXNlci5pbWFnZVVybCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNhdmVQcm9qZWN0TWFuYWdlcih0aGlzLnVzZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICBcdH1jYXRjaChlKXtcbiAgICAgICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgXHR9XG4gICAgfVxuICAgXG59Il19