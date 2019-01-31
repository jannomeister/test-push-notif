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
var nativescript_vibrate_1 = require("nativescript-vibrate");
var user_service_1 = require("../../services/user.service");
var socket_service_1 = require("../../services/socket.service");
var config_service_1 = require("../../services/config.service");
var facebook_service_1 = require("../../services/facebook.service");
var coachmark_service_1 = require("../../services/coachmark.service");
var component_event_service_1 = require("../../services/component-event.service");
var dialogs = require("ui/dialogs");
var pushPlugin = require("nativescript-push-notifications");
var nativescript_local_notifications_1 = require("nativescript-local-notifications");
var ActionBarComponent = /** @class */ (function () {
    function ActionBarComponent(page, _ngZone, _routerExtensions, _userService, _configService, _socketService, _facebookService, _coachMarkService, _componentService) {
        this.page = page;
        this._ngZone = _ngZone;
        this._routerExtensions = _routerExtensions;
        this._userService = _userService;
        this._configService = _configService;
        this._socketService = _socketService;
        this._facebookService = _facebookService;
        this._coachMarkService = _coachMarkService;
        this._componentService = _componentService;
        this.userId = 0;
        this.isBadgeVisible = false;
        this.isSearchBarVisible = true;
        this.isBackButtonVisible = true;
        this.isNotifButtonVisible = true;
        this.buttonColor = '#000000';
        this.vibrator = new nativescript_vibrate_1.Vibrate();
        this.userId = this._userService.getCurrentUserId();
        this.navOptions = this._componentService.getRouteOptions();
        // this.hasNotificationListener();
        this.testNewNotificationListener();
    }
    ActionBarComponent.prototype.ngOnInit = function () {
        this.setBackButton();
        this.setNotifButton();
        this.setItemVisibilityConfig();
    };
    ActionBarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            var searchBarData = _this.getMockSearchBarPosAndSize();
            var notifBtnData = _this.getBellPosAndSize();
            _this._coachMarkService.actionBarTour(searchBarData, notifBtnData);
        }, 1000);
    };
    ActionBarComponent.prototype.getMockSearchBarPosAndSize = function () {
        var searchBar = this.page.getViewById('mockSearch');
        var size = searchBar.getActualSize();
        var position = searchBar.getLocationOnScreen();
        return {
            originX: position.x,
            originY: position.y,
            width: size.width,
            height: size.height
        };
    };
    ActionBarComponent.prototype.getBellPosAndSize = function () {
        var bellIcon = this.page.getViewById('notifButton');
        var size = bellIcon.getActualSize();
        var position = bellIcon.getLocationOnScreen();
        return {
            originX: position.x,
            originY: position.y,
            width: size.width,
            height: size.height
        };
    };
    ActionBarComponent.prototype.testNewNotificationListener = function () {
        // LocalNotifications.hasPermission();
        nativescript_local_notifications_1.LocalNotifications.addOnMessageReceivedCallback(function (notification) {
            console.log("HAHANOTIFHAHAHAX");
            console.log(notification);
            // if(notification.notifData) {
            //     let data = JSON.parse(notification.notifData)
            //     if(data.type === 'project_approval') {
            //         this._componentService.showAlert(data.title, data.message)
            //     }
            //     this._ngZone.run(() => {
            //         this.isBadgeVisible = true;
            //     })
            // }else {
            //     console.log("NOTIFFFFSASDADAD")
            //     console.log(notification)
            //     this._componentService.showAlert(notification.title, notification.body);
            // }
        }).then(function () { return console.log("Listener added!!!"); });
    };
    ActionBarComponent.prototype.hasNotificationListener = function () {
        var _this = this;
        this._componentService.hasNotif.subscribe(function (hasNotif) {
            _this._ngZone.run(function () {
                _this.isBadgeVisible = true;
            });
        });
    };
    ActionBarComponent.prototype.setBackButton = function () {
        var pageName = this.pageName || '';
        if (pageName === 'home' ||
            pageName === 'settings' ||
            pageName === 'profile' ||
            pageName === 'project' ||
            pageName === 'resources') {
            this.isBackButtonVisible = false;
        }
        else {
            this.isBackButtonVisible = true;
        }
    };
    ActionBarComponent.prototype.setNotifButton = function () {
        var pageName = this.pageName || '';
        this.isNotifButtonVisible = (pageName === 'settings') ? false : true;
    };
    ActionBarComponent.prototype.setItemVisibilityConfig = function () {
        var pageName = this.pageName || '';
        if (pageName === 'edit-profile' ||
            pageName === 'edit-project' ||
            pageName === 'profile-info' ||
            pageName === 'profile' ||
            pageName === 'project' ||
            pageName === 'projectmanager-info' ||
            pageName === 'resources') {
            this.isSearchBarVisible = false;
        }
        else {
            this.isSearchBarVisible = true;
        }
    };
    ActionBarComponent.prototype.onTap = function () {
        this.isBadgeVisible = false;
        this.navOptions.queryParams = { activeTab: this.pageName };
        this._routerExtensions.navigate(['/notification'], this.navOptions);
    };
    ActionBarComponent.prototype.logout = function () {
        var _this = this;
        dialogs.action({
            message: 'Are you sure you want to log out?',
            cancelButtonText: 'Cancel',
            actions: ['Log Out']
        }).then(function (result) {
            if (result === 'Log Out') {
                _this._componentService.showLoader('Logging out...');
                _this.unregisterToken();
                _this._componentService.removeProjectManager();
                _this._componentService.removeAllLocalNotifications();
                _this._facebookService.logout();
                _this._socketService.getSocketInstance().disconnect();
                _this._userService.removeCurrentUser();
                _this._userService.removeTourStatus();
                _this._userService.removeStartProjectData();
                _this.navOptions.transition.name = "slideRight";
                _this.navOptions.clearHistory = true;
                _this.updateUserDeviceLogoutStatus();
            }
        });
    };
    ActionBarComponent.prototype.unregisterToken = function () {
        pushPlugin.unregister(function (result) {
            console.log('Device unregistered successfully');
        }, function (errorMessage) {
            console.dir(errorMessage);
        }, this._configService.pushSettings());
    };
    ActionBarComponent.prototype.goToSearch = function () {
        this._routerExtensions.navigate(['/search'], this.navOptions);
    };
    ActionBarComponent.prototype.searchBarLoaded = function (args) {
        var searchBar = args.object;
        searchBar.focus();
    };
    ActionBarComponent.prototype.onSearch = function (args) {
        var searchBar = args.object;
        args.object.dismissSoftInput();
        var searchQuery = searchBar.text.trim();
        this.searchBarTextChanged(searchQuery);
    };
    ActionBarComponent.prototype.animate = function () {
        var view = this.page.getViewById('notifButton');
        var animation1 = view.createAnimation({ opacity: 0 });
        var animation2 = view.createAnimation({ opacity: 1 });
        animation1.play()
            .then(function () { return animation2.play(); })
            .then(function () { return animation1.play(); })
            .then(function () { return animation2.play(); })
            .then(function () { })
            .catch(function (e) {
            console.log(e.message);
        });
    };
    // listeners
    ActionBarComponent.prototype.searchBarTextChanged = function (searchQuery) {
        this._componentService.searchBarChanged(searchQuery);
    };
    ActionBarComponent.prototype.updateUserDeviceLogoutStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userService.updateUserDeviceLogoutStatus(this.userId)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.success) {
                            this._routerExtensions.navigate(['/home'], this.navOptions);
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
    __decorate([
        core_1.Input('pageName'),
        __metadata("design:type", String)
    ], ActionBarComponent.prototype, "pageName", void 0);
    __decorate([
        core_1.HostListener('change'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ActionBarComponent.prototype, "searchBarTextChanged", null);
    ActionBarComponent = __decorate([
        core_1.Component({
            selector: "actionbar",
            moduleId: module.id,
            templateUrl: "./action-bar.component.html",
            styleUrls: ['./action-bar.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            core_1.NgZone,
            router_1.RouterExtensions,
            user_service_1.UserService,
            config_service_1.ConfigService,
            socket_service_1.SocketService,
            facebook_service_1.FacebookService,
            coachmark_service_1.CoachMarkService,
            component_event_service_1.ComponentEventService])
    ], ActionBarComponent);
    return ActionBarComponent;
}());
exports.ActionBarComponent = ActionBarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY3Rpb24tYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBUXVCO0FBQ3ZCLHNEQUErRDtBQUMvRCxnQ0FBK0I7QUFHL0IsNkRBQStDO0FBRS9DLDREQUEwRDtBQUMxRCxnRUFBOEQ7QUFDOUQsZ0VBQThEO0FBQzlELG9FQUFrRTtBQUNsRSxzRUFBb0U7QUFDcEUsa0ZBQStFO0FBRS9FLG9DQUFzQztBQUN0Qyw0REFBOEQ7QUFDOUQscUZBQXNFO0FBUXRFO0lBaUJJLDRCQUNZLElBQVUsRUFDVixPQUFlLEVBQ2YsaUJBQW1DLEVBQ25DLFlBQXlCLEVBQ3pCLGNBQTZCLEVBQzdCLGNBQTZCLEVBQzdCLGdCQUFpQyxFQUNqQyxpQkFBbUMsRUFDbkMsaUJBQXdDO1FBUnhDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUN6QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQXhCcEQsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUVuQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyx1QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFDbkMsd0JBQW1CLEdBQVksSUFBSSxDQUFDO1FBQ3BDLHlCQUFvQixHQUFZLElBQUksQ0FBQztRQUVyQyxnQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUloQyxhQUFRLEdBQUcsSUFB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Q0FBQyxRQUFRLENBQUM7Ozs7a0VBR3RCO0lBL09RLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7U0FDNUMsQ0FBQzt5Q0FtQm9CLFdBQUk7WUFDRCxhQUFNO1lBQ0kseUJBQWdCO1lBQ3JCLDBCQUFXO1lBQ1QsOEJBQWE7WUFDYiw4QkFBYTtZQUNYLGtDQUFlO1lBQ2Qsb0NBQWdCO1lBQ2hCLCtDQUFxQjtPQTFCM0Msa0JBQWtCLENBK1A5QjtJQUFELHlCQUFDO0NBQUEsQUEvUEQsSUErUEM7QUEvUFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgXG4gICAgQ29tcG9uZW50LCBcbiAgICBPbkluaXQsIFxuICAgIE5nWm9uZSwgXG4gICAgSW5wdXQsIFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBWaWV3Q2hpbGQsXG4gICAgRWxlbWVudFJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQgeyBWaWJyYXRlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC12aWJyYXRlXCI7XG5cbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgU29ja2V0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zb2NrZXQuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb25maWcuc2VydmljZVwiO1xuaW1wb3J0IHsgRmFjZWJvb2tTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZhY2Vib29rLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvYWNoTWFya1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29hY2htYXJrLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgKiBhcyBwdXNoUGx1Z2luIGZyb20gXCJuYXRpdmVzY3JpcHQtcHVzaC1ub3RpZmljYXRpb25zXCI7XG5pbXBvcnQgeyBMb2NhbE5vdGlmaWNhdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvY2FsLW5vdGlmaWNhdGlvbnNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiYWN0aW9uYmFyXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2FjdGlvbi1iYXIuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9hY3Rpb24tYmFyLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQWN0aW9uQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHVzZXJJZDogbnVtYmVyID0gMDtcbiAgICBcbiAgICBpc0JhZGdlVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzU2VhcmNoQmFyVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7IFxuICAgIGlzQmFja0J1dHRvblZpc2libGU6IGJvb2xlYW4gPSB0cnVlOyBcbiAgICBpc05vdGlmQnV0dG9uVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7ICBcblxuICAgIGJ1dHRvbkNvbG9yOiBzdHJpbmcgPSAnIzAwMDAwMCc7XG5cbiAgICBuYXZPcHRpb25zOiBhbnk7XG5cbiAgICB2aWJyYXRvciA9IG5ldyBWaWJyYXRlKCk7XG5cbiAgICBASW5wdXQoJ3BhZ2VOYW1lJykgcGFnZU5hbWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3NvY2tldFNlcnZpY2U6IFNvY2tldFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2ZhY2Vib29rU2VydmljZTogRmFjZWJvb2tTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9jb2FjaE1hcmtTZXJ2aWNlOiBDb2FjaE1hcmtTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9jb21wb25lbnRTZXJ2aWNlOiBDb21wb25lbnRFdmVudFNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLl91c2VyU2VydmljZS5nZXRDdXJyZW50VXNlcklkKCk7XG4gICAgICAgIHRoaXMubmF2T3B0aW9ucyA9IHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuZ2V0Um91dGVPcHRpb25zKCk7XG5cbiAgICAgICAgLy8gdGhpcy5oYXNOb3RpZmljYXRpb25MaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnRlc3ROZXdOb3RpZmljYXRpb25MaXN0ZW5lcigpO1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0QmFja0J1dHRvbigpO1xuICAgICAgICB0aGlzLnNldE5vdGlmQnV0dG9uKCk7XG4gICAgICAgIHRoaXMuc2V0SXRlbVZpc2liaWxpdHlDb25maWcoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgc2VhcmNoQmFyRGF0YSA9IHRoaXMuZ2V0TW9ja1NlYXJjaEJhclBvc0FuZFNpemUoKTtcbiAgICAgICAgICAgIGxldCBub3RpZkJ0bkRhdGEgID0gdGhpcy5nZXRCZWxsUG9zQW5kU2l6ZSgpO1xuXG4gICAgICAgICAgICB0aGlzLl9jb2FjaE1hcmtTZXJ2aWNlLmFjdGlvbkJhclRvdXIoc2VhcmNoQmFyRGF0YSwgbm90aWZCdG5EYXRhKTtcbiAgICAgICAgXG4gICAgICAgIH0sIDEwMDApXG4gICAgfVxuXG4gICAgZ2V0TW9ja1NlYXJjaEJhclBvc0FuZFNpemUoKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8Vmlldz50aGlzLnBhZ2UuZ2V0Vmlld0J5SWQoJ21vY2tTZWFyY2gnKTtcblxuICAgICAgICBsZXQgc2l6ZSA9IHNlYXJjaEJhci5nZXRBY3R1YWxTaXplKCk7XG4gICAgICAgIGxldCBwb3NpdGlvbiAgPSBzZWFyY2hCYXIuZ2V0TG9jYXRpb25PblNjcmVlbigpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvcmlnaW5YOiBwb3NpdGlvbi54LFxuICAgICAgICAgICAgb3JpZ2luWTogcG9zaXRpb24ueSxcbiAgICAgICAgICAgIHdpZHRoOiBzaXplLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLmhlaWdodFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QmVsbFBvc0FuZFNpemUoKSB7XG4gICAgICAgIGxldCBiZWxsSWNvbiA9IDxWaWV3PnRoaXMucGFnZS5nZXRWaWV3QnlJZCgnbm90aWZCdXR0b24nKTtcblxuICAgICAgICBsZXQgc2l6ZSA9IGJlbGxJY29uLmdldEFjdHVhbFNpemUoKTtcbiAgICAgICAgbGV0IHBvc2l0aW9uICA9IGJlbGxJY29uLmdldExvY2F0aW9uT25TY3JlZW4oKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb3JpZ2luWDogcG9zaXRpb24ueCxcbiAgICAgICAgICAgIG9yaWdpblk6IHBvc2l0aW9uLnksXG4gICAgICAgICAgICB3aWR0aDogc2l6ZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogc2l6ZS5oZWlnaHRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRlc3ROZXdOb3RpZmljYXRpb25MaXN0ZW5lcigpIHtcbiAgICAgICAgLy8gTG9jYWxOb3RpZmljYXRpb25zLmhhc1Blcm1pc3Npb24oKTtcblxuICAgICAgICBMb2NhbE5vdGlmaWNhdGlvbnMuYWRkT25NZXNzYWdlUmVjZWl2ZWRDYWxsYmFjayhub3RpZmljYXRpb24gPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIQUhBTk9USUZIQUhBSEFYXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobm90aWZpY2F0aW9uKVxuICAgICAgICAgICAgLy8gaWYobm90aWZpY2F0aW9uLm5vdGlmRGF0YSkge1xuICAgICAgICAgICAgLy8gICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShub3RpZmljYXRpb24ubm90aWZEYXRhKVxuXG4gICAgICAgICAgICAvLyAgICAgaWYoZGF0YS50eXBlID09PSAncHJvamVjdF9hcHByb3ZhbCcpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoZGF0YS50aXRsZSwgZGF0YS5tZXNzYWdlKVxuICAgICAgICAgICAgLy8gICAgIH1cblxuICAgICAgICAgICAgLy8gICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmlzQmFkZ2VWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vICAgICB9KVxuICAgICAgICAgICAgLy8gfWVsc2Uge1xuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiTk9USUZGRkZTQVNEQURBRFwiKVxuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKG5vdGlmaWNhdGlvbilcbiAgICAgICAgICAgIC8vICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydChub3RpZmljYXRpb24udGl0bGUsIG5vdGlmaWNhdGlvbi5ib2R5KTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSkudGhlbigoKSA9PiBjb25zb2xlLmxvZyhcIkxpc3RlbmVyIGFkZGVkISEhXCIpKVxuICAgIH1cblxuICAgIGhhc05vdGlmaWNhdGlvbkxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhhc05vdGlmLnN1YnNjcmliZShoYXNOb3RpZiA9PiB7XG4gICAgICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQmFkZ2VWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2V0QmFja0J1dHRvbigpIHtcbiAgICAgICAgbGV0IHBhZ2VOYW1lID0gdGhpcy5wYWdlTmFtZSB8fCAnJztcblxuICAgICAgICBpZihcbiAgICAgICAgICAgIHBhZ2VOYW1lID09PSAnaG9tZScgICAgIHx8IFxuICAgICAgICAgICAgcGFnZU5hbWUgPT09ICdzZXR0aW5ncycgfHxcbiAgICAgICAgICAgIHBhZ2VOYW1lID09PSAncHJvZmlsZScgIHx8XG4gICAgICAgICAgICBwYWdlTmFtZSA9PT0gJ3Byb2plY3QnICB8fFxuICAgICAgICAgICAgcGFnZU5hbWUgPT09ICdyZXNvdXJjZXMnXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5pc0JhY2tCdXR0b25WaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5pc0JhY2tCdXR0b25WaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldE5vdGlmQnV0dG9uKCkge1xuICAgICAgICBsZXQgcGFnZU5hbWUgPSB0aGlzLnBhZ2VOYW1lIHx8ICcnO1xuXG4gICAgICAgIHRoaXMuaXNOb3RpZkJ1dHRvblZpc2libGUgPSAocGFnZU5hbWUgPT09ICdzZXR0aW5ncycpPyBmYWxzZSA6IHRydWU7XG4gICAgfVxuXG4gICAgc2V0SXRlbVZpc2liaWxpdHlDb25maWcoKSB7XG4gICAgICAgIGxldCBwYWdlTmFtZSA9IHRoaXMucGFnZU5hbWUgfHwgJyc7XG5cbiAgICAgICAgaWYoXG4gICAgICAgICAgICBwYWdlTmFtZSA9PT0gJ2VkaXQtcHJvZmlsZScgfHxcbiAgICAgICAgICAgIHBhZ2VOYW1lID09PSAnZWRpdC1wcm9qZWN0JyB8fFxuICAgICAgICAgICAgcGFnZU5hbWUgPT09ICdwcm9maWxlLWluZm8nIHx8XG4gICAgICAgICAgICBwYWdlTmFtZSA9PT0gJ3Byb2ZpbGUnICAgICAgfHxcbiAgICAgICAgICAgIHBhZ2VOYW1lID09PSAncHJvamVjdCcgICAgICB8fFxuICAgICAgICAgICAgcGFnZU5hbWUgPT09ICdwcm9qZWN0bWFuYWdlci1pbmZvJyB8fFxuICAgICAgICAgICAgcGFnZU5hbWUgPT09ICdyZXNvdXJjZXMnXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5pc1NlYXJjaEJhclZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc1NlYXJjaEJhclZpc2libGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25UYXAoKSB7XG4gICAgICAgIHRoaXMuaXNCYWRnZVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5uYXZPcHRpb25zLnF1ZXJ5UGFyYW1zID0geyBhY3RpdmVUYWI6IHRoaXMucGFnZU5hbWUgfVxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL25vdGlmaWNhdGlvbiddLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgIH1cblxuICAgIGxvZ291dCgpIHtcbiAgICAgICAgZGlhbG9ncy5hY3Rpb24oe1xuICAgICAgICAgICAgbWVzc2FnZTogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsb2cgb3V0PycsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsJyxcbiAgICAgICAgICAgIGFjdGlvbnM6IFsnTG9nIE91dCddXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3VsdCA9PT0gJ0xvZyBPdXQnKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ0xvZ2dpbmcgb3V0Li4uJyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVucmVnaXN0ZXJUb2tlbigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UucmVtb3ZlUHJvamVjdE1hbmFnZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnJlbW92ZUFsbExvY2FsTm90aWZpY2F0aW9ucygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZhY2Vib29rU2VydmljZS5sb2dvdXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zb2NrZXRTZXJ2aWNlLmdldFNvY2tldEluc3RhbmNlKCkuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLnJlbW92ZUN1cnJlbnRVc2VyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlclNlcnZpY2UucmVtb3ZlVG91clN0YXR1cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLnJlbW92ZVN0YXJ0UHJvamVjdERhdGEoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdk9wdGlvbnMudHJhbnNpdGlvbi5uYW1lID0gXCJzbGlkZVJpZ2h0XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5uYXZPcHRpb25zLmNsZWFySGlzdG9yeSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXJEZXZpY2VMb2dvdXRTdGF0dXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5yZWdpc3RlclRva2VuKCkge1xuICAgICAgICBwdXNoUGx1Z2luLnVucmVnaXN0ZXIoXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0RldmljZSB1bnJlZ2lzdGVyZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICB9LCBcblxuICAgICAgICAgICAgKGVycm9yTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5fY29uZmlnU2VydmljZS5wdXNoU2V0dGluZ3MoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdvVG9TZWFyY2goKSB7IFxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3NlYXJjaCddLCB0aGlzLm5hdk9wdGlvbnMpO1xuICAgIH1cblxuICAgIHNlYXJjaEJhckxvYWRlZChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIHNlYXJjaEJhci5mb2N1cygpO1xuICAgIH1cblxuICAgIG9uU2VhcmNoKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG5cbiAgICAgICAgYXJncy5vYmplY3QuZGlzbWlzc1NvZnRJbnB1dCgpO1xuXG4gICAgICAgIGxldCBzZWFyY2hRdWVyeSA9IHNlYXJjaEJhci50ZXh0LnRyaW0oKTtcblxuICAgICAgICB0aGlzLnNlYXJjaEJhclRleHRDaGFuZ2VkKHNlYXJjaFF1ZXJ5KTtcblxuICAgIH1cblxuICAgIGFuaW1hdGUoKSB7XG4gICAgICAgIGxldCB2aWV3ID0gPFZpZXc+dGhpcy5wYWdlLmdldFZpZXdCeUlkKCdub3RpZkJ1dHRvbicpO1xuXG4gICAgICAgIHZhciBhbmltYXRpb24xID0gdmlldy5jcmVhdGVBbmltYXRpb24oe29wYWNpdHk6IDB9KTtcbiAgICAgICAgdmFyIGFuaW1hdGlvbjIgPSB2aWV3LmNyZWF0ZUFuaW1hdGlvbih7b3BhY2l0eTogMX0pO1xuXG4gICAgICAgIGFuaW1hdGlvbjEucGxheSgpXG4gICAgICAgICAgICAudGhlbigoKT0+YW5pbWF0aW9uMi5wbGF5KCkpXG4gICAgICAgICAgICAudGhlbigoKT0+YW5pbWF0aW9uMS5wbGF5KCkpXG4gICAgICAgICAgICAudGhlbigoKT0+YW5pbWF0aW9uMi5wbGF5KCkpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7fSlcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBsaXN0ZW5lcnNcbiAgICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnKVxuICAgIHNlYXJjaEJhclRleHRDaGFuZ2VkKHNlYXJjaFF1ZXJ5KSB7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2VhcmNoQmFyQ2hhbmdlZChzZWFyY2hRdWVyeSk7XG4gICAgfVxuXG4gICAgYXN5bmMgdXBkYXRlVXNlckRldmljZUxvZ291dFN0YXR1cygpIHtcbiAgICBcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3VzZXJTZXJ2aWNlLnVwZGF0ZVVzZXJEZXZpY2VMb2dvdXRTdGF0dXModGhpcy51c2VySWQpO1xuXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIGlmKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9ob21lJ10sIHRoaXMubmF2T3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbn0iXX0=