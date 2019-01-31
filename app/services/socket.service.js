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
var user_service_1 = require("./user.service");
var config_service_1 = require("./config.service");
// require("nativescript-nodeify");
var SocketIO = require("nativescript-socket.io");
var SocketService = /** @class */ (function () {
    function SocketService(_userService, _configService) {
        this._userService = _userService;
        this._configService = _configService;
        this.options = {
            log: true,
            secure: false,
            forceWebsockets: true,
        };
    }
    SocketService.prototype.connect = function () {
        this.instance = SocketIO.connect(this._configService.getBaseUrl(), this.options);
    };
    SocketService.prototype.isConnected = function () {
        return (this.instance) ? true : false;
    };
    SocketService.prototype.getSocketInstance = function () {
        return this.instance;
    };
    SocketService.prototype.joinRoom = function (room) {
        this.instance.emit('room', room);
    };
    SocketService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_service_1.UserService,
            config_service_1.ConfigService])
    ], SocketService);
    return SocketService;
}());
exports.SocketService = SocketService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzb2NrZXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUUzQywrQ0FBNkM7QUFDN0MsbURBQWlEO0FBRWpELG1DQUFtQztBQUNuQyxpREFBbUQ7QUFHbkQ7SUFVQyx1QkFDUyxZQUF5QixFQUN6QixjQUE2QjtRQUQ3QixpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUN6QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQVJ0QyxZQUFPLEdBQVE7WUFDZCxHQUFHLEVBQUUsSUFBSTtZQUNILE1BQU0sRUFBRSxLQUFLO1lBQ2IsZUFBZSxFQUFFLElBQUk7U0FDM0IsQ0FBQTtJQUtFLENBQUM7SUFFSiwrQkFBTyxHQUFQO1FBQ0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLEVBQTBCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQsbUNBQVcsR0FBWDtRQUNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3RDLENBQUM7SUFFRCx5Q0FBaUIsR0FBakI7UUFDQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdEIsQ0FBQztJQUVELGdDQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUE3QlcsYUFBYTtRQUR6QixpQkFBVSxFQUFFO3lDQVlXLDBCQUFXO1lBQ1QsOEJBQWE7T0FaMUIsYUFBYSxDQStCekI7SUFBRCxvQkFBQztDQUFBLEFBL0JELElBK0JDO0FBL0JZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4vdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSBcIi4vY29uZmlnLnNlcnZpY2VcIjtcblxuLy8gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1ub2RlaWZ5XCIpO1xuaW1wb3J0ICogYXMgU29ja2V0SU8gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zb2NrZXQuaW9cIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNvY2tldFNlcnZpY2Uge1xuXG5cdGluc3RhbmNlOiBhbnk7XG5cblx0b3B0aW9uczogYW55ID0ge1xuXHRcdGxvZzogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcbiAgICAgICAgZm9yY2VXZWJzb2NrZXRzOiB0cnVlLFxuXHR9XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuXHRcdHByaXZhdGUgX2NvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2Vcblx0KSB7fVxuXG5cdGNvbm5lY3QoKSB7XG5cdFx0dGhpcy5pbnN0YW5jZSA9IFNvY2tldElPLmNvbm5lY3QodGhpcy5fY29uZmlnU2VydmljZS5nZXRCYXNlVXJsKCksIDxTb2NrZXRJTy5Tb2NrZXRPcHRpb25zPnRoaXMub3B0aW9ucyk7XG5cdH1cblxuXHRpc0Nvbm5lY3RlZCgpIHtcblx0XHRyZXR1cm4gKHRoaXMuaW5zdGFuY2UpPyB0cnVlIDogZmFsc2U7XG5cdH1cblxuXHRnZXRTb2NrZXRJbnN0YW5jZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5pbnN0YW5jZTtcblx0fVxuXG5cdGpvaW5Sb29tKHJvb20pIHtcblx0XHR0aGlzLmluc3RhbmNlLmVtaXQoJ3Jvb20nLCByb29tKVxuXHR9XG5cbn0iXX0=