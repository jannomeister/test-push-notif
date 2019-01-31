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
var application_1 = require("application");
// SERVICES
var user_service_1 = require("./services/user.service");
var socket_service_1 = require("./services/socket.service");
var project_alert_service_1 = require("./services/project-alert.service");
var shipment_service_1 = require("./services/shipment.service");
var component_event_service_1 = require("./services/component-event.service");
var call_schedule_service_1 = require("./services/call-schedule.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(_routerExtensions, _userService, _socketService, _projectAlertService, _shipmentService, _componentService, _callScheduleService) {
        this._routerExtensions = _routerExtensions;
        this._userService = _userService;
        this._socketService = _socketService;
        this._projectAlertService = _projectAlertService;
        this._shipmentService = _shipmentService;
        this._componentService = _componentService;
        this._callScheduleService = _callScheduleService;
        this.userId = 0;
        this.projectId = 0;
        // this.processLocalData();
        var user = this._userService.getCurrentUser();
        if (user.data && user.token) {
            if (user.data.status === 'unverified') {
                this._routerExtensions.navigate(['/verification'], { clearHistory: true });
            }
            else {
                this._socketService.connect();
                this._routerExtensions.navigate(['/dashboard'], { clearHistory: true });
            }
        }
        else {
            this._routerExtensions.navigate(['/home']);
        }
    }
    AppComponent.prototype.ngOnInit = function () {
        // this.socketListener();
        // this.initApplicationState();
    };
    AppComponent.prototype.initApplicationState = function () {
        var _this = this;
        application_1.on(application_1.resumeEvent, function (args) {
            _this.processLocalData();
        });
    };
    AppComponent.prototype.socketListener = function () {
        var _this = this;
        if (this._socketService.isConnected()) {
            var userId = this._userService.getCurrentUserId();
            var socket_1 = "USER-" + userId;
            this._socketService.getSocketInstance()
                .on(socket_1, function (data) {
                if (data.hasNotif)
                    _this.processSocketData(data);
            });
        }
    };
    AppComponent.prototype.processLocalData = function () {
        var user = this._userService.getCurrentUser();
        this._componentService.showLoader('Refreshing...');
        if (user.data && user.token) {
            this._socketService.connect();
            this.checkUserVerification(user.data.userId, user);
        }
        else {
            this._componentService.hideLoader();
            this._routerExtensions.navigate(['/home']);
        }
    };
    AppComponent.prototype.processSocketData = function (data) {
        this.broadcastEvent(data);
    };
    AppComponent.prototype.broadcastEvent = function (data) {
        if (data.data.type === 'tips') {
            if (data.data.isDone)
                this._componentService.projectChanged(data.data.isDone);
        }
        else if (data.data.type === 'user') {
            if (data.data.isRemoved)
                this._componentService.userRemoval(data.data.isRemoved);
        }
        else {
            this._componentService.hasNotification(true);
        }
    };
    AppComponent.prototype.checkUserVerification = function (userId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, route, e_1, route;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userService.checkUserVerification(userId)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.success) {
                            route = (res.isVerified) ? '/dashboard' : '/verification';
                            data.data = res.data;
                            this._userService.saveCurrentUser(data);
                            this._routerExtensions.navigate([route], { clearHistory: true });
                        }
                        else {
                            this._componentService.showErrorFeedback('Ooops!', res.message);
                            this._userService.removeCurrentUser();
                            this._routerExtensions.navigate(['/home']);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        route = (data.data.status === 'unverified') ? '/verification' : ((data.data.status !== 'unverified') ? '/dashboard' : '/home');
                        this._componentService.hideLoader();
                        this._routerExtensions.navigate([route], { clearHistory: true });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.HostListener('change'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "broadcastEvent", null);
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html",
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            user_service_1.UserService,
            socket_service_1.SocketService,
            project_alert_service_1.ProjectAlertService,
            shipment_service_1.ShipmentService,
            component_event_service_1.ComponentEventService,
            call_schedule_service_1.CallScheduleService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFrRjtBQUNsRixzREFBK0Q7QUFHL0QsMkNBU3FCO0FBTXJCLFdBQVc7QUFDWCx3REFBc0Q7QUFDdEQsNERBQTBEO0FBQzFELDBFQUF1RTtBQUN2RSxnRUFBOEQ7QUFDOUQsOEVBQTJFO0FBQzNFLDBFQUF1RTtBQVF2RTtJQUtDLHNCQUNTLGlCQUFtQyxFQUNuQyxZQUF5QixFQUN6QixjQUE2QixFQUM3QixvQkFBeUMsRUFDekMsZ0JBQWlDLEVBQ2pDLGlCQUF3QyxFQUN4QyxvQkFBeUM7UUFOekMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUN6QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3pDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBVmxELFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsY0FBUyxHQUFXLENBQUMsQ0FBQztRQVdyQiwyQkFBMkI7UUFDM0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUU5QyxJQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMzQixJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFlBQVksRUFBRTtnQkFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFB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LEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzs7Ozs7O0tBRWxFO0lBakNEO1FBREMsbUJBQVksQ0FBQyxRQUFRLENBQUM7Ozs7c0RBU3RCO0lBaEZXLFlBQVk7UUFMeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7U0FDcEMsQ0FBQzt5Q0FRMkIseUJBQWdCO1lBQ3JCLDBCQUFXO1lBQ1QsOEJBQWE7WUFDUCwyQ0FBbUI7WUFDdkIsa0NBQWU7WUFDZCwrQ0FBcUI7WUFDbEIsMkNBQW1CO09BWnRDLFlBQVksQ0EwR3hCO0lBQUQsbUJBQUM7Q0FBQSxBQTFHRCxJQTBHQztBQTFHWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBIb3N0TGlzdGVuZXIsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFZpYnJhdGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXZpYnJhdGVcIjtcbmltcG9ydCB7IFROU0ZhbmN5QWxlcnQgfSBmcm9tICduYXRpdmVzY3JpcHQtZmFuY3lhbGVydCc7XG5pbXBvcnQgeyBcblx0b24gYXMgYXBwbGljYXRpb25PbiwgXG5cdGxhdW5jaEV2ZW50LCBcblx0c3VzcGVuZEV2ZW50LCBcblx0cmVzdW1lRXZlbnQsIFxuXHRleGl0RXZlbnQsIFxuXHRsb3dNZW1vcnlFdmVudCwgXG5cdHVuY2F1Z2h0RXJyb3JFdmVudCwgXG5cdEFwcGxpY2F0aW9uRXZlbnREYXRhIFxufSBmcm9tIFwiYXBwbGljYXRpb25cIjtcblxuLy8gT1RIRVJTIFxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgKiBhcyBMb2NhbE5vdGlmaWNhdGlvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1sb2NhbC1ub3RpZmljYXRpb25zXCI7XG5cbi8vIFNFUlZJQ0VTXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgU29ja2V0U2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3NvY2tldC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQcm9qZWN0QWxlcnRTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvcHJvamVjdC1hbGVydC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTaGlwbWVudFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9zaGlwbWVudC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21wb25lbnRFdmVudFNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuaW1wb3J0IHsgQ2FsbFNjaGVkdWxlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2NhbGwtc2NoZWR1bGUuc2VydmljZVwiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWFwcFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiLFxufSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0dXNlcklkOiBudW1iZXIgPSAwO1xuXHRwcm9qZWN0SWQ6IG51bWJlciA9IDA7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcblx0XHRwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG5cdFx0cHJpdmF0ZSBfc29ja2V0U2VydmljZTogU29ja2V0U2VydmljZSxcblx0XHRwcml2YXRlIF9wcm9qZWN0QWxlcnRTZXJ2aWNlOiBQcm9qZWN0QWxlcnRTZXJ2aWNlLFxuXHRcdHByaXZhdGUgX3NoaXBtZW50U2VydmljZTogU2hpcG1lbnRTZXJ2aWNlLFxuXHRcdHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcblx0XHRwcml2YXRlIF9jYWxsU2NoZWR1bGVTZXJ2aWNlOiBDYWxsU2NoZWR1bGVTZXJ2aWNlLFxuXHQpIHtcblx0XHQvLyB0aGlzLnByb2Nlc3NMb2NhbERhdGEoKTtcblx0XHRsZXQgdXNlciA9IHRoaXMuX3VzZXJTZXJ2aWNlLmdldEN1cnJlbnRVc2VyKCk7XG5cblx0XHRpZih1c2VyLmRhdGEgJiYgdXNlci50b2tlbikge1xuXHRcdFx0aWYodXNlci5kYXRhLnN0YXR1cyA9PT0gJ3VudmVyaWZpZWQnKSB7XG5cdFx0XHRcdHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvdmVyaWZpY2F0aW9uJ10sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuX3NvY2tldFNlcnZpY2UuY29ubmVjdCgpO1xuXHRcdFx0XHR0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2Rhc2hib2FyZCddLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvaG9tZSddKTtcblx0XHR9XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHQvLyB0aGlzLnNvY2tldExpc3RlbmVyKCk7XG5cdFx0Ly8gdGhpcy5pbml0QXBwbGljYXRpb25TdGF0ZSgpO1xuXHR9XG5cblx0aW5pdEFwcGxpY2F0aW9uU3RhdGUoKSB7XG5cblx0XHRhcHBsaWNhdGlvbk9uKHJlc3VtZUV2ZW50LCAoYXJnczogQXBwbGljYXRpb25FdmVudERhdGEpID0+IHtcblx0XHRcdHRoaXMucHJvY2Vzc0xvY2FsRGF0YSgpO1xuXHRcdH0pXG5cdH1cblxuXHRzb2NrZXRMaXN0ZW5lcigpIHtcblx0XHRpZih0aGlzLl9zb2NrZXRTZXJ2aWNlLmlzQ29ubmVjdGVkKCkpIHtcblx0XHRcdGxldCB1c2VySWQgPSB0aGlzLl91c2VyU2VydmljZS5nZXRDdXJyZW50VXNlcklkKCk7XG5cdFx0XHRsZXQgc29ja2V0ID0gYFVTRVItJHt1c2VySWR9YDtcblxuXHRcdFx0dGhpcy5fc29ja2V0U2VydmljZS5nZXRTb2NrZXRJbnN0YW5jZSgpXG5cdFx0XHRcdC5vbihzb2NrZXQsIChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0aWYoZGF0YS5oYXNOb3RpZikgdGhpcy5wcm9jZXNzU29ja2V0RGF0YShkYXRhKTtcblx0XHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHRwcm9jZXNzTG9jYWxEYXRhKCkge1xuXHRcdGxldCB1c2VyID0gdGhpcy5fdXNlclNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKTtcblxuXHRcdHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0xvYWRlcignUmVmcmVzaGluZy4uLicpO1xuXG5cdFx0aWYodXNlci5kYXRhICYmIHVzZXIudG9rZW4pIHtcblx0XHRcdHRoaXMuX3NvY2tldFNlcnZpY2UuY29ubmVjdCgpO1xuXHRcdFx0dGhpcy5jaGVja1VzZXJWZXJpZmljYXRpb24odXNlci5kYXRhLnVzZXJJZCwgdXNlcik7XG5cdFx0fWVsc2Uge1xuXHRcdFx0dGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG5cdFx0XHR0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2hvbWUnXSk7XG5cdFx0fVxuXHR9XG5cblx0cHJvY2Vzc1NvY2tldERhdGEoZGF0YSkge1xuXHRcdHRoaXMuYnJvYWRjYXN0RXZlbnQoZGF0YSk7XG5cdH1cblxuXHRASG9zdExpc3RlbmVyKCdjaGFuZ2UnKVxuXHRicm9hZGNhc3RFdmVudChkYXRhKSB7XG5cdFx0aWYoZGF0YS5kYXRhLnR5cGUgPT09ICd0aXBzJykge1xuXHRcdFx0aWYoZGF0YS5kYXRhLmlzRG9uZSkgdGhpcy5fY29tcG9uZW50U2VydmljZS5wcm9qZWN0Q2hhbmdlZChkYXRhLmRhdGEuaXNEb25lKTsgXG5cdFx0fWVsc2UgaWYoZGF0YS5kYXRhLnR5cGUgPT09ICd1c2VyJykge1xuXHRcdFx0aWYoZGF0YS5kYXRhLmlzUmVtb3ZlZCkgdGhpcy5fY29tcG9uZW50U2VydmljZS51c2VyUmVtb3ZhbChkYXRhLmRhdGEuaXNSZW1vdmVkKTtcblx0XHR9ZWxzZSB7XG5cdFx0XHR0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhhc05vdGlmaWNhdGlvbih0cnVlKTtcblx0XHR9XG5cdH1cblxuXHRhc3luYyBjaGVja1VzZXJWZXJpZmljYXRpb24odXNlcklkLCBkYXRhKSB7XG5cdFx0dHJ5e1xuXHRcdFx0bGV0IHJlcyA9IGF3YWl0IHRoaXMuX3VzZXJTZXJ2aWNlLmNoZWNrVXNlclZlcmlmaWNhdGlvbih1c2VySWQpO1xuXG5cdFx0XHR0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcblx0XHRcdGlmKHJlcy5zdWNjZXNzKSB7XG5cdFx0XHRcdGxldCByb3V0ZSA9IChyZXMuaXNWZXJpZmllZCk/ICcvZGFzaGJvYXJkJyA6ICcvdmVyaWZpY2F0aW9uJztcblxuXHRcdFx0XHRkYXRhLmRhdGEgPSByZXMuZGF0YTtcblxuXHRcdFx0XHR0aGlzLl91c2VyU2VydmljZS5zYXZlQ3VycmVudFVzZXIoZGF0YSlcblx0XHRcdFx0dGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbcm91dGVdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0dGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93RXJyb3JGZWVkYmFjaygnT29vcHMhJywgcmVzLm1lc3NhZ2UpO1xuXHRcdFx0XHR0aGlzLl91c2VyU2VydmljZS5yZW1vdmVDdXJyZW50VXNlcigpO1xuXHRcdFx0XHR0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2hvbWUnXSk7XG5cdFx0XHR9XG5cdFx0fWNhdGNoKGUpIHtcblx0XHRcdGxldCByb3V0ZSA9IChkYXRhLmRhdGEuc3RhdHVzID09PSAndW52ZXJpZmllZCcpPyAnL3ZlcmlmaWNhdGlvbicgOiAoKGRhdGEuZGF0YS5zdGF0dXMgIT09ICd1bnZlcmlmaWVkJyk/ICcvZGFzaGJvYXJkJyA6ICcvaG9tZScpO1xuXHRcdFx0XG5cdFx0XHR0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcblx0XHRcdHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW3JvdXRlXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG5cdFx0fVxuXHR9XG59XG5cblxuIl19