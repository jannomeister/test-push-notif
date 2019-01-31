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
var CallScheduleService = /** @class */ (function () {
    function CallScheduleService(http, _configService) {
        this.http = http;
        this._configService = _configService;
        this.baseUrl = '';
        this.baseUrl = this._configService.getApiBaseUrl();
    }
    CallScheduleService.prototype.getCallSchedule = function (userId, projectId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/users/" + userId + "/" + projectId + "/call_schedule", this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CallScheduleService.prototype.getAvailableTime = function (userId, projectId, timeZone) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/users/" + userId + "/" + projectId + "/available_time?timeZone=" + timeZone, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CallScheduleService.prototype.updateReminder = function (callScheduleId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.put(this.baseUrl + "/users/call_schedule/" + callScheduleId + "/reminder_status", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CallScheduleService.prototype.addCallSchedule = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post(this.baseUrl + "/users/call_schedule", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CallScheduleService.prototype.createCalendarEvent = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post(this.baseUrl + "/calendar/event", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CallScheduleService.prototype.getCalendarEvent = function (eventId, timeZone) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/calendar/event/" + eventId + "?timeZone=" + timeZone, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CallScheduleService.prototype.updateCalendarEvent = function (eventId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.put(this.baseUrl + "/calendar/event/" + eventId, data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CallScheduleService.prototype.deleteCalendarEvent = function (eventId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.delete(this.baseUrl + "/calendar/event/" + eventId, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CallScheduleService.prototype.getGeocodeAddress = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get((this.baseUrl + "/geocode/place?address=" + address).replace(/ /g, "%20"), this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CallScheduleService.prototype.getTimeZone = function (lat, lng) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/timezone/location/" + lat + "/" + lng, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CallScheduleService.prototype.createHeader = function () {
        var currentUser = JSON.parse(appSettings.getString('currentUser') || '{}');
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + currentUser.token
        });
        return { headers: headers };
    };
    CallScheduleService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            config_service_1.ConfigService])
    ], CallScheduleService);
    return CallScheduleService;
}());
exports.CallScheduleService = CallScheduleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbC1zY2hlZHVsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FsbC1zY2hlZHVsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsNkNBQTZFO0FBRTdFLG1EQUFpRDtBQUVqRCxrREFBb0Q7QUFHcEQ7SUFJSSw2QkFDWSxJQUFnQixFQUNoQixjQUE2QjtRQUQ3QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBSjVDLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFNZCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVLLDZDQUFlLEdBQXJCLFVBQXNCLE1BQU0sRUFBRSxTQUFTOzs7Ozs0QkFDcEIscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVMsSUFBSSxDQUFDLE9BQU8sZUFBVSxNQUFNLFNBQUksU0FBUyxtQkFBZ0IsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQWxJLFFBQVEsR0FBRyxTQUF1SDt3QkFFdEksc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ25CO0lBRUssOENBQWdCLEdBQXRCLFVBQXVCLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUTs7Ozs7NEJBQy9CLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFTLElBQUksQ0FBQyxPQUFPLGVBQVUsTUFBTSxTQUFJLFNBQVMsaUNBQTRCLFFBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXhKLFFBQVEsR0FBRyxTQUE2STt3QkFFNUosc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ25CO0lBRUssNENBQWMs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MENBQVksR0FBcEI7UUFDSSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDM0UsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxDQUFDO1lBQzFCLGNBQWMsRUFBRSxrQkFBa0I7WUFDbEMsZUFBZSxFQUFFLFlBQVUsV0FBVyxDQUFDLEtBQU87U0FDakQsQ0FBQyxDQUFBO1FBRUYsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBL0VRLG1CQUFtQjtRQUQvQixpQkFBVSxFQUFFO3lDQU1TLGlCQUFVO1lBQ0EsOEJBQWE7T0FOaEMsbUJBQW1CLENBZ0YvQjtJQUFELDBCQUFDO0NBQUEsQUFoRkQsSUFnRkM7QUFoRlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5cbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tIFwiLi9jb25maWcuc2VydmljZVwiO1xuXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjsgXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYWxsU2NoZWR1bGVTZXJ2aWNlIHtcblxuXHRiYXNlVXJsOiBzdHJpbmcgPSAnJzsgXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICBwcml2YXRlIF9jb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMuYmFzZVVybCA9IHRoaXMuX2NvbmZpZ1NlcnZpY2UuZ2V0QXBpQmFzZVVybCgpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldENhbGxTY2hlZHVsZSh1c2VySWQsIHByb2plY3RJZCkge1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS91c2Vycy8ke3VzZXJJZH0vJHtwcm9qZWN0SWR9L2NhbGxfc2NoZWR1bGVgLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0QXZhaWxhYmxlVGltZSh1c2VySWQsIHByb2plY3RJZCwgdGltZVpvbmUpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZVVybH0vdXNlcnMvJHt1c2VySWR9LyR7cHJvamVjdElkfS9hdmFpbGFibGVfdGltZT90aW1lWm9uZT0ke3RpbWVab25lfWAsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGVSZW1pbmRlcihjYWxsU2NoZWR1bGVJZCwgZGF0YSkge1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucHV0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS91c2Vycy9jYWxsX3NjaGVkdWxlLyR7Y2FsbFNjaGVkdWxlSWR9L3JlbWluZGVyX3N0YXR1c2AsIGRhdGEsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBhc3luYyBhZGRDYWxsU2NoZWR1bGUoZGF0YSkge1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxhbnk+KGAke3RoaXMuYmFzZVVybH0vdXNlcnMvY2FsbF9zY2hlZHVsZWAsIGRhdGEsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBhc3luYyBjcmVhdGVDYWxlbmRhckV2ZW50KGRhdGEpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8YW55PihgJHt0aGlzLmJhc2VVcmx9L2NhbGVuZGFyL2V2ZW50YCwgZGF0YSwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIGFzeW5jIGdldENhbGVuZGFyRXZlbnQoZXZlbnRJZCwgdGltZVpvbmUpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZVVybH0vY2FsZW5kYXIvZXZlbnQvJHtldmVudElkfT90aW1lWm9uZT0ke3RpbWVab25lfWAsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGVDYWxlbmRhckV2ZW50KGV2ZW50SWQsIGRhdGEpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnB1dDxhbnk+KGAke3RoaXMuYmFzZVVybH0vY2FsZW5kYXIvZXZlbnQvJHtldmVudElkfWAsIGRhdGEsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBhc3luYyBkZWxldGVDYWxlbmRhckV2ZW50KGV2ZW50SWQpIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmRlbGV0ZTxhbnk+KGAke3RoaXMuYmFzZVVybH0vY2FsZW5kYXIvZXZlbnQvJHtldmVudElkfWAsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRHZW9jb2RlQWRkcmVzcyhhZGRyZXNzKSB7XG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQ8YW55PihgJHt0aGlzLmJhc2VVcmx9L2dlb2NvZGUvcGxhY2U/YWRkcmVzcz0ke2FkZHJlc3N9YC5yZXBsYWNlKC8gL2csIFwiJTIwXCIpLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRUaW1lWm9uZShsYXQsIGxuZykge1xuICAgIFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZVVybH0vdGltZXpvbmUvbG9jYXRpb24vJHtsYXR9LyR7bG5nfWAsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlSGVhZGVyKCkge1xuICAgICAgICBsZXQgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGFwcFNldHRpbmdzLmdldFN0cmluZygnY3VycmVudFVzZXInKSB8fCAne30nKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2N1cnJlbnRVc2VyLnRva2VufWBcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4geyBoZWFkZXJzOiBoZWFkZXJzIH07XG4gICAgfVxufSJdfQ==