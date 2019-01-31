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
var ProjectAlertService = /** @class */ (function () {
    function ProjectAlertService(http, _configService) {
        this.http = http;
        this._configService = _configService;
        this.baseUrl = '';
        this.baseUrl = this._configService.getApiBaseUrl();
    }
    ProjectAlertService.prototype.updateTips = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.put(this.baseUrl + "/project_alerts/tips", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProjectAlertService.prototype.updateAlert = function (type, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.put(this.baseUrl + "/project_alerts?type=" + type, data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProjectAlertService.prototype.getAlert = function (userId, projectId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/project_alerts?projectId=" + projectId + "&userId=" + userId, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProjectAlertService.prototype.checkTips = function (userId, projectId, dateStart, dateEnd) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/project_alerts/tips?projectId=" + projectId + "&userId=" + userId + "&dateStart=" + dateStart + "&dateEnd=" + dateEnd, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProjectAlertService.prototype.createHeader = function () {
        var currentUser = JSON.parse(appSettings.getString('currentUser') || '{}');
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + currentUser.token
        });
        return { headers: headers };
    };
    ProjectAlertService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            config_service_1.ConfigService])
    ], ProjectAlertService);
    return ProjectAlertService;
}());
exports.ProjectAlertService = ProjectAlertService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1hbGVydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvamVjdC1hbGVydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsNkNBQTZFO0FBRzdFLG1EQUFpRDtBQUVqRCxrREFBb0Q7QUFHcEQ7SUFJSSw2QkFDWSxJQUFnQixFQUNoQixjQUE2QjtRQUQ3QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBSjVDLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFNZCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVLLHdDQUFVLEdBQWhCLFVBQWlCLElBQUk7Ozs7OzRCQUNGLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFTLElBQUksQ0FBQyxPQUFPLHlCQUFzQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQWpILFFBQVEsR0FBRyxTQUFzRzt3QkFFckgsc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ25CO0lBRUsseUNBQVcsR0FBakIsVUFBa0IsSUFBSSxFQUFFLElBQUk7Ozs7OzRCQUNaLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFTLElBQUksQ0FBQyxPQUFPLDZCQUF3QixJQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBekgsUUFBUSxHQUFHLFNBQThHO3dCQUVoSSxzQkFBTyxRQUFRLEVBQUM7Ozs7S0FDYjtJQUVLLHNDQUFRLEdBQWQsVUFBZSxNQUFNLEVBQUUsU0FBUzs7Ozs7NEJBQ2hCLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFTLElBQUksQ0FBQyxPQUFPLGtDQUE2QixTQUFTLGdCQUFXLE1BQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQTlJLFFBQVEsR0FBRyxTQUFtSTt3QkFFckosc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ2I7SUFFSyx1Q0FBUyxHQUFmLFVBQWdCLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE9BQU87Ozs7OzRCQUNsQyxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUyxJQUFJLENBQUMsT0FBTyx1Q0FBa0MsU0FBUyxnQkFBVyxNQUFNLG1CQUFjLFNBQVMsaUJBQVksT0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBN0wsUUFBUSxHQUFHLFNBQWtMO3dCQUVqTSxzQkFBTyxRQUFRLEVBQUM7Ozs7S0FDbkI7SUFFTywwQ0FBWSxHQUFwQjtRQUNJLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUMzRSxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLENBQUM7WUFDMUIsY0FBYyxFQUFFLGtCQUFrQjtZQUNsQyxlQUFlLEVBQUUsWUFBVSxXQUFXLENBQUMsS0FBTztTQUNqRCxDQUFDLENBQUE7UUFFRixPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUEzQ1EsbUJBQW1CO1FBRC9CLGlCQUFVLEVBQUU7eUNBTVMsaUJBQVU7WUFDQSw4QkFBYTtPQU5oQyxtQkFBbUIsQ0E2Qy9CO0lBQUQsMEJBQUM7Q0FBQSxBQTdDRCxJQTZDQztBQTdDWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcblxuXG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSBcIi4vY29uZmlnLnNlcnZpY2VcIjtcblxuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7IFxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHJvamVjdEFsZXJ0U2VydmljZSB7XG5cblx0YmFzZVVybDogc3RyaW5nID0gJyc7IFxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICAgICAgcHJpdmF0ZSBfY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSB0aGlzLl9jb25maWdTZXJ2aWNlLmdldEFwaUJhc2VVcmwoKTtcbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGVUaXBzKGRhdGEpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnB1dDxhbnk+KGAke3RoaXMuYmFzZVVybH0vcHJvamVjdF9hbGVydHMvdGlwc2AsIGRhdGEsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGVBbGVydCh0eXBlLCBkYXRhKSB7XG4gICAgXHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucHV0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS9wcm9qZWN0X2FsZXJ0cz90eXBlPSR7dHlwZX1gLCBkYXRhLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuXHRcdHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRBbGVydCh1c2VySWQsIHByb2plY3RJZCkge1xuICAgIFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZVVybH0vcHJvamVjdF9hbGVydHM/cHJvamVjdElkPSR7cHJvamVjdElkfSZ1c2VySWQ9JHt1c2VySWR9YCwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgYXN5bmMgY2hlY2tUaXBzKHVzZXJJZCwgcHJvamVjdElkLCBkYXRlU3RhcnQsIGRhdGVFbmQpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZVVybH0vcHJvamVjdF9hbGVydHMvdGlwcz9wcm9qZWN0SWQ9JHtwcm9qZWN0SWR9JnVzZXJJZD0ke3VzZXJJZH0mZGF0ZVN0YXJ0PSR7ZGF0ZVN0YXJ0fSZkYXRlRW5kPSR7ZGF0ZUVuZH1gLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVIZWFkZXIoKSB7XG4gICAgICAgIGxldCBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UoYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKCdjdXJyZW50VXNlcicpIHx8ICd7fScpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7Y3VycmVudFVzZXIudG9rZW59YFxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiB7IGhlYWRlcnM6IGhlYWRlcnMgfTtcbiAgICB9XG5cbn0iXX0=