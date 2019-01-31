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
var http_1 = require("@angular/common/http");
var config_service_1 = require("./config.service");
var appSettings = require("application-settings");
var platformModule = require("tns-core-modules/platform");
var httpModule = require("http");
var DeviceService = /** @class */ (function () {
    function DeviceService(http, _configService) {
        this.http = http;
        this._configService = _configService;
        this.baseUrl = '';
        this.baseUrl = this._configService.getApiBaseUrl();
    }
    DeviceService.prototype.getDeviceToken = function () {
        var token = appSettings.getString('deviceToken') || '';
        return token;
    };
    DeviceService.prototype.registerDevice = function (deviceToken) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            // let plugin = require("nativescript-ios-uuid");
            var data = {
                deviceUUID: platformModule.device.uuid,
                deviceToken: deviceToken,
                deviceOS: platformModule.device.os,
                deviceModel: platformModule.device.model,
                deviceType: platformModule.device.deviceType,
            };
            httpModule.request({
                url: _this.baseUrl + "/devices",
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                content: JSON.stringify(data)
            }).then(function (res) {
                resolve(res.content.toJSON());
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    /* DEPRECATED (NOT USED) */
    DeviceService.prototype.createDevice = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post(this.baseUrl + "/devices", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    DeviceService.prototype.findOne = function (deviceToken) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/devices/" + deviceToken, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    DeviceService.prototype.createHeader = function () {
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
        return { headers: headers };
    };
    DeviceService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            config_service_1.ConfigService])
    ], DeviceService);
    return DeviceService;
}());
exports.DeviceService = DeviceService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXZpY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLDZDQUE2RTtBQUc3RSxtREFBaUQ7QUFFakQsa0RBQW9EO0FBQ3BELDBEQUE0RDtBQUM1RCxpQ0FBbUM7QUFHbkM7SUFJQyx1QkFDUyxJQUFnQixFQUNoQixjQUE2QjtRQUQ3QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBSnRDLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFNcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFFRCxzQ0FBYyxHQUFkO1FBQ0MsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdkQsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRUQsc0NBQWMsR0FBZCxVQUFlLFdBQVc7UUFBMUIsaUJBeUJDO1FBeEJBLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFFekMsaURBQWlEO1lBQ2pELElBQUksSUFBSSxHQUFHO2dCQUNWLFVBQVUsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUk7Z0JBQ3RDLFdBQVcsRUFBRSxXQUFXO2dCQUN4QixRQUFRLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNsQyxXQUFXLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLO2dCQUN4QyxVQUFVLEVBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFVO2FBQzVDLENBQUE7WUFFRCxVQUFVLENBQUMsT0FBTyxDQUFDO2dCQUNsQixHQUFHLEVBQUssS0FBSSxDQUFDLE9BQU8sYUFBVTtnQkFDOUIsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFO2dCQUMvQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7Z0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDOUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBUTtnQkFDakIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ1osQ0FBQyxDQUFDLENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUFFRCwyQkFBMkI7SUFDckIsb0NBQVksR0FBbEIsVUFBbUIsSUFBSTs7Ozs7NEJBQ1AscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQVMsSUFBSSxDQUFDLE9BQU8sYUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXRHLFFBQVEsR0FBRyxTQUEyRjt3QkFFMUcsc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ2hCO0lBRUssK0JBQU8sR0FBYixVQUFjLFdBQVc7Ozs7OzRCQUNULHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFTLElBQUksQ0FBQyxPQUFPLGlCQUFZLFdBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQTlHLFFBQVEsR0FBRyxTQUFtRzt3QkFFbEgsc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ2hCO0lBRVUsb0NBQVksR0FBcEI7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLENBQUM7WUFDMUIsY0FBYyxFQUFFLGtCQUFrQjtTQUNyQyxDQUFDLENBQUE7UUFFRixPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUEvRFEsYUFBYTtRQUR6QixpQkFBVSxFQUFFO3lDQU1HLGlCQUFVO1lBQ0EsOEJBQWE7T0FOMUIsYUFBYSxDQWdFekI7SUFBRCxvQkFBQztDQUFBLEFBaEVELElBZ0VDO0FBaEVZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5cblxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gXCIuL2NvbmZpZy5zZXJ2aWNlXCI7XG5cbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgcGxhdGZvcm1Nb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcbmltcG9ydCAqIGFzIGh0dHBNb2R1bGUgZnJvbSBcImh0dHBcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERldmljZVNlcnZpY2Uge1xuXG5cdGJhc2VVcmw6IHN0cmluZyA9ICcnO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcblx0XHRwcml2YXRlIF9jb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlXG5cdCkge1xuXHRcdHRoaXMuYmFzZVVybCA9IHRoaXMuX2NvbmZpZ1NlcnZpY2UuZ2V0QXBpQmFzZVVybCgpO1xuXHR9XG5cblx0Z2V0RGV2aWNlVG9rZW4oKSB7XG5cdFx0bGV0IHRva2VuID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKCdkZXZpY2VUb2tlbicpIHx8ICcnO1xuXG5cdFx0cmV0dXJuIHRva2VuO1xuXHR9XG5cblx0cmVnaXN0ZXJEZXZpY2UoZGV2aWNlVG9rZW4pIHtcblx0XHRsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuXHRcdFx0Ly8gbGV0IHBsdWdpbiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtaW9zLXV1aWRcIik7XG5cdFx0XHRsZXQgZGF0YSA9IHtcblx0XHRcdFx0ZGV2aWNlVVVJRDogcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLnV1aWQsIC8vcGx1Z2luLmdldFVVSUQoKSxcblx0XHRcdFx0ZGV2aWNlVG9rZW46IGRldmljZVRva2VuLFxuXHRcdFx0XHRkZXZpY2VPUzogcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLm9zLFxuXHRcdFx0XHRkZXZpY2VNb2RlbDogcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLm1vZGVsLFxuXHRcdFx0XHRkZXZpY2VUeXBlOiBwbGF0Zm9ybU1vZHVsZS5kZXZpY2UuZGV2aWNlVHlwZSxcblx0XHRcdH1cblxuXHRcdFx0aHR0cE1vZHVsZS5yZXF1ZXN0KHtcblx0XHRcdFx0dXJsOiBgJHt0aGlzLmJhc2VVcmx9L2RldmljZXNgLFxuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG5cdFx0XHRcdGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG5cdFx0XHR9KS50aGVuKChyZXM6IGFueSkgPT4ge1xuXHRcdFx0XHRyZXNvbHZlKHJlcy5jb250ZW50LnRvSlNPTigpKVxuXHRcdFx0fSkuY2F0Y2goKGVycjogYW55KSA9PiB7XG5cdFx0XHRcdHJlamVjdChlcnIpXG5cdFx0XHR9KVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cblxuXHQvKiBERVBSRUNBVEVEIChOT1QgVVNFRCkgKi9cblx0YXN5bmMgY3JlYXRlRGV2aWNlKGRhdGEpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxhbnk+KGAke3RoaXMuYmFzZVVybH0vZGV2aWNlc2AsIGRhdGEsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cblx0YXN5bmMgZmluZE9uZShkZXZpY2VUb2tlbikge1xuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQ8YW55PihgJHt0aGlzLmJhc2VVcmx9L2RldmljZXMvJHtkZXZpY2VUb2tlbn1gLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVIZWFkZXIoKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4geyBoZWFkZXJzOiBoZWFkZXJzIH07XG4gICAgfVxufSJdfQ==