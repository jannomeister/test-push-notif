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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("nativescript-angular/router");
var operators_1 = require("rxjs/operators");
var user_service_1 = require("./user.service");
var config_service_1 = require("./config.service");
var component_event_service_1 = require("./component-event.service");
var HttpInterceptorService = /** @class */ (function () {
    function HttpInterceptorService(injector) {
        var _this = this;
        this.injector = injector;
        this.unauthorizedNotifIsDone = false;
        setTimeout(function () {
            _this._userService = _this.injector.get(user_service_1.UserService);
            _this._configService = _this.injector.get(config_service_1.ConfigService);
            _this._componentService = _this.injector.get(component_event_service_1.ComponentEventService);
            _this._routerExtensions = _this.injector.get(router_1.RouterExtensions);
        });
    }
    HttpInterceptorService.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).pipe(operators_1.tap(function (event) {
            console.log('******** RESPONSE **********');
            console.log(event);
            console.log('******** END OF RES ********');
        }, function (err) {
            _this.processRequestError(err);
        }));
    };
    HttpInterceptorService.prototype.processRequestError = function (err) {
        if (err instanceof http_1.HttpErrorResponse) {
            var endpointArr = err.url.split(this._configService.getBaseUrl());
            var endpoint = endpointArr[1];
            this.logRequestError(err);
            if (err.status === 0) { // Unknown error / No Internet Connection
                this._componentService.showAlert('No Internet Connection', 'Please check your connection and try again');
            }
            else if (err.status === 400) { // Bad Request
                // this._componentService.showAlert(
                // 	'Alert',
                // 	err.error.error
                // )
            }
            else if (err.status === 401) { // Unauthorized
                if (!this.unauthorizedNotifIsDone && endpoint !== '/api/v1/authenticate') {
                    this._componentService.showAnauthorizedAlert('/home');
                    this.unauthorizedNotifIsDone = true;
                }
            }
            else if (err.status === 403) { // Forbidden
                // this._componentService.showAlert(
                // 	'Alert',
                // 	err.error.error
                // )
            }
            else if (err.status === 404) { // Not Found
                // this._componentService.showAlert(
                // 	'Alert',
                // 	err.error.error
                // )
            }
            else if (err.status === 409) { // Conflict
                // this._componentService.showAlert(
                // 	'Alert', 
                // 	err.error.error
                // )
            }
            else if (err.status === 500) { // Internal Server Error
                // this._componentService.showAlert(
                // 	'Alert', 
                // 	err.error.error
                // )
                // this._userService.removeCurrentUser();
                // this._routerExtensions.navigate(['/home'], { clearHistory: true });
            }
            else if (err.status === 502) { // Bad Gateway Error
                // this._componentService.showAlert(
                // 	'Alert', 
                // 	err.error.error
                // )
                // this._userService.removeCurrentUser();
                // this._routerExtensions.navigate(['/home'], { clearHistory: true });
            }
            else {
                this._componentService.showAlert('Ooops!', 'Something went wrong. Please try again later.');
            }
        }
    };
    HttpInterceptorService.prototype.logRequestError = function (err) {
        console.log('******* ERROR INFORMATION *********');
        console.log('***********************************');
        console.log('URL: ' + err.url);
        console.log('MESSAGE: ' + err.message);
        console.log('STATUS CODE: ' + err.status);
        console.log('***********************************');
        console.log('***********************************');
    };
    HttpInterceptorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.Injector])
    ], HttpInterceptorService);
    return HttpInterceptorService;
}());
exports.HttpInterceptorService = HttpInterceptorService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1pbnRlcmNlcHRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaHR0cC1pbnRlcmNlcHRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXFEO0FBQ3JELDZDQU84QjtBQUM5QixzREFBK0Q7QUFJL0QsNENBQXFDO0FBRXJDLCtDQUE2QztBQUM3QyxtREFBaUQ7QUFDakQscUVBQWtFO0FBR2xFO0lBU0MsZ0NBQW9CLFFBQWtCO1FBQXRDLGlCQVFDO1FBUm1CLGFBQVEsR0FBUixRQUFRLENBQVU7UUFQdEMsNEJBQXVCLEdBQVksS0FBSyxDQUFDO1FBUXhDLFVBQVUsQ0FBQztZQUNWLEtBQUksQ0FBQyxZQUFZLEdBQU0sS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsMEJBQVcsQ0FBQyxDQUFBO1lBQ3JELEtBQUksQ0FBQyxjQUFjLEdBQU0sS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsOEJBQWEsQ0FBQyxDQUFBO1lBQ3pELEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQywrQ0FBcUIsQ0FBQyxDQUFBO1lBRWpFLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyx5QkFBZ0IsQ0FBQyxDQUFBO1FBQzdELENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVELDBDQUFTLEdBQVQsVUFBVSxPQUF5QixFQUFFLElBQWlCO1FBQXRELGlCQVdDO1FBVEEsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDdEIsZUFBRyxDQUFDLFVBQUEsS0FBSztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQTtZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJB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eEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFBO1FBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0lBM0dXLHNCQUFzQjtRQURsQyxpQkFBVSxFQUFFO3lDQVVrQixlQUFRO09BVDFCLHNCQUFzQixDQTRHbEM7SUFBRCw2QkFBQztDQUFBLEFBNUdELElBNEdDO0FBNUdZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gIEh0dHBSZXF1ZXN0LFxuICBIdHRwSGFuZGxlcixcbiAgSHR0cEV2ZW50LFxuICBIdHRwUmVzcG9uc2UsXG4gIEh0dHBFcnJvclJlc3BvbnNlLFxuICBIdHRwSW50ZXJjZXB0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5cbmltcG9ydCB7IHRhcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gXCIuL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gXCIuL2NvbmZpZy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb21wb25lbnRFdmVudFNlcnZpY2UgfSBmcm9tIFwiLi9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cEludGVyY2VwdG9yU2VydmljZSBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG5cblx0dW5hdXRob3JpemVkTm90aWZJc0RvbmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuXHRfcm91dGVyRXh0ZW5zaW9uczogYW55O1xuXHRfdXNlclNlcnZpY2U6IGFueTtcblx0X2NvbmZpZ1NlcnZpY2U6IGFueTtcblx0X2NvbXBvbmVudFNlcnZpY2U6IGFueTtcblx0XG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLl91c2VyU2VydmljZVx0ICAgPSB0aGlzLmluamVjdG9yLmdldChVc2VyU2VydmljZSlcblx0XHRcdHRoaXMuX2NvbmZpZ1NlcnZpY2UgICAgPSB0aGlzLmluamVjdG9yLmdldChDb25maWdTZXJ2aWNlKVxuXHRcdFx0dGhpcy5fY29tcG9uZW50U2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KENvbXBvbmVudEV2ZW50U2VydmljZSlcblxuXHRcdFx0dGhpcy5fcm91dGVyRXh0ZW5zaW9ucyA9IHRoaXMuaW5qZWN0b3IuZ2V0KFJvdXRlckV4dGVuc2lvbnMpXG5cdFx0fSlcblx0fVxuXG5cdGludGVyY2VwdChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcblxuXHRcdHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KS5waXBlKFxuICAgICAgICAgICAgdGFwKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIFx0Y29uc29sZS5sb2coJyoqKioqKioqIFJFU1BPTlNFICoqKioqKioqKionKVxuICAgICAgICAgICAgXHRjb25zb2xlLmxvZyhldmVudClcbiAgICAgICAgICAgIFx0Y29uc29sZS5sb2coJyoqKioqKioqIEVORCBPRiBSRVMgKioqKioqKionKVxuICAgICAgICAgICAgfSwgKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICBcdHRoaXMucHJvY2Vzc1JlcXVlc3RFcnJvcihlcnIpXG4gICAgICAgICAgICB9KVxuICAgICAgICApOyBcblx0fVxuXG5cdHByb2Nlc3NSZXF1ZXN0RXJyb3IoZXJyKSB7XG5cdFx0aWYoZXJyIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcblxuXHRcdFx0bGV0IGVuZHBvaW50QXJyID0gZXJyLnVybC5zcGxpdCh0aGlzLl9jb25maWdTZXJ2aWNlLmdldEJhc2VVcmwoKSk7XG5cdFx0XHRsZXQgZW5kcG9pbnQgPSBlbmRwb2ludEFyclsxXTtcblxuXHRcdFx0dGhpcy5sb2dSZXF1ZXN0RXJyb3IoZXJyKVxuXG5cdFx0XHRpZihlcnIuc3RhdHVzID09PSAwKSB7IC8vIFVua25vd24gZXJyb3IgLyBObyBJbnRlcm5ldCBDb25uZWN0aW9uXG5cdFx0XHRcdHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KFxuXHRcdFx0XHRcdCdObyBJbnRlcm5ldCBDb25uZWN0aW9uJywgXG5cdFx0XHRcdFx0J1BsZWFzZSBjaGVjayB5b3VyIGNvbm5lY3Rpb24gYW5kIHRyeSBhZ2Fpbidcblx0XHRcdFx0KTtcblxuXHRcdFx0fWVsc2UgaWYoZXJyLnN0YXR1cyA9PT0gNDAwKSB7IC8vIEJhZCBSZXF1ZXN0XG5cdFx0XHRcdC8vIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KFxuXHRcdFx0XHQvLyBcdCdBbGVydCcsXG5cdFx0XHRcdC8vIFx0ZXJyLmVycm9yLmVycm9yXG5cdFx0XHRcdC8vIClcblxuXHRcdFx0fWVsc2UgaWYoZXJyLnN0YXR1cyA9PT0gNDAxKSB7IC8vIFVuYXV0aG9yaXplZFxuXHRcdFx0XHRpZighdGhpcy51bmF1dGhvcml6ZWROb3RpZklzRG9uZSAmJiBlbmRwb2ludCAhPT0gJy9hcGkvdjEvYXV0aGVudGljYXRlJykge1xuXHRcdFx0XHRcdHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FuYXV0aG9yaXplZEFsZXJ0KCcvaG9tZScpO1xuXHRcdFx0XHRcdHRoaXMudW5hdXRob3JpemVkTm90aWZJc0RvbmUgPSB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1lbHNlIGlmKGVyci5zdGF0dXMgPT09IDQwMykgeyAvLyBGb3JiaWRkZW5cblx0XHRcdFx0Ly8gdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoXG5cdFx0XHRcdC8vIFx0J0FsZXJ0Jyxcblx0XHRcdFx0Ly8gXHRlcnIuZXJyb3IuZXJyb3Jcblx0XHRcdFx0Ly8gKVxuXG5cdFx0XHR9ZWxzZSBpZihlcnIuc3RhdHVzID09PSA0MDQpIHsgLy8gTm90IEZvdW5kXG5cdFx0XHRcdC8vIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KFxuXHRcdFx0XHQvLyBcdCdBbGVydCcsXG5cdFx0XHRcdC8vIFx0ZXJyLmVycm9yLmVycm9yXG5cdFx0XHRcdC8vIClcblxuXHRcdFx0fWVsc2UgaWYoZXJyLnN0YXR1cyA9PT0gNDA5KSB7IC8vIENvbmZsaWN0XG5cdFx0XHRcdC8vIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KFxuXHRcdFx0XHQvLyBcdCdBbGVydCcsIFxuXHRcdFx0XHQvLyBcdGVyci5lcnJvci5lcnJvclxuXHRcdFx0XHQvLyApXG5cblx0XHRcdH1lbHNlIGlmKGVyci5zdGF0dXMgPT09IDUwMCkgeyAvLyBJbnRlcm5hbCBTZXJ2ZXIgRXJyb3Jcblx0XHRcdFx0Ly8gdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoXG5cdFx0XHRcdC8vIFx0J0FsZXJ0JywgXG5cdFx0XHRcdC8vIFx0ZXJyLmVycm9yLmVycm9yXG5cdFx0XHRcdC8vIClcblx0XHRcdFx0Ly8gdGhpcy5fdXNlclNlcnZpY2UucmVtb3ZlQ3VycmVudFVzZXIoKTtcblx0XHRcdFx0Ly8gdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9ob21lJ10sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuXHRcdFx0fWVsc2UgaWYoZXJyLnN0YXR1cyA9PT0gNTAyKSB7IC8vIEJhZCBHYXRld2F5IEVycm9yXG5cdFx0XHRcdC8vIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KFxuXHRcdFx0XHQvLyBcdCdBbGVydCcsIFxuXHRcdFx0XHQvLyBcdGVyci5lcnJvci5lcnJvclxuXHRcdFx0XHQvLyApXG5cdFx0XHRcdC8vIHRoaXMuX3VzZXJTZXJ2aWNlLnJlbW92ZUN1cnJlbnRVc2VyKCk7XG5cdFx0XHRcdC8vIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvaG9tZSddLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydChcblx0XHRcdFx0XHQnT29vcHMhJyxcblx0XHRcdFx0XHQnU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuJ1xuXHRcdFx0XHQpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bG9nUmVxdWVzdEVycm9yKGVycikge1xuXHRcdGNvbnNvbGUubG9nKCcqKioqKioqIEVSUk9SIElORk9STUFUSU9OICoqKioqKioqKicpXG5cdFx0Y29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJylcblx0XHRjb25zb2xlLmxvZygnVVJMOiAnKyBlcnIudXJsKVxuXHRcdGNvbnNvbGUubG9nKCdNRVNTQUdFOiAnKyBlcnIubWVzc2FnZSlcblx0XHRjb25zb2xlLmxvZygnU1RBVFVTIENPREU6ICcrIGVyci5zdGF0dXMpXG5cdFx0Y29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJylcblx0XHRjb25zb2xlLmxvZygnKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKionKVxuXHR9XG59XG5cbiJdfQ==