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
var ProjectReportService = /** @class */ (function () {
    function ProjectReportService(http, _configService) {
        this.http = http;
        this._configService = _configService;
        this.baseUrl = '';
        this.baseUrl = this._configService.getApiBaseUrl();
    }
    ProjectReportService.prototype.createReport = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post(this.baseUrl + "/projects/reports", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProjectReportService.prototype.checkHasReport = function (projectId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/projects/" + projectId + "/has_report?userId=" + userId, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProjectReportService.prototype.getSalesReport = function (projectId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/projects/" + projectId + "/sales_report", this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProjectReportService.prototype.createHeader = function () {
        var currentUser = JSON.parse(appSettings.getString('currentUser') || '{}');
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + currentUser.token
        });
        return { headers: headers };
    };
    ProjectReportService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            config_service_1.ConfigService])
    ], ProjectReportService);
    return ProjectReportService;
}());
exports.ProjectReportService = ProjectReportService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1yZXBvcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2plY3QtcmVwb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBNkU7QUFHN0UsbURBQWlEO0FBRWpELGtEQUFvRDtBQUdwRDtJQUlDLDhCQUNTLElBQWdCLEVBQ2hCLGNBQTZCO1FBRDdCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFKdEMsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQU1wQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVLLDJDQUFZLEdBQWxCLFVBQW1CLElBQUk7Ozs7OzRCQUNQLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFTLElBQUksQ0FBQyxPQUFPLHNCQUFtQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQS9HLFFBQVEsR0FBRyxTQUFvRzt3QkFFbkgsc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ2hCO0lBRUssNkNBQWMsR0FBcEIsVUFBcUIsU0FBUyxFQUFFLE1BQU07Ozs7OzRCQUN0QixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUyxJQUFJLENBQUMsT0FBTyxrQkFBYSxTQUFTLDJCQUFzQixNQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF6SSxRQUFRLEdBQUcsU0FBOEg7d0JBRTdJLHNCQUFPLFFBQVEsRUFBQzs7OztLQUNoQjtJQUVLLDZDQUFjLEdBQXBCLFVBQXFCLFNBQVM7Ozs7OzRCQUNkLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFTLElBQUksQ0FBQyxPQUFPLGtCQUFhLFNBQVMsa0JBQWUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQTFILFFBQVEsR0FBRyxTQUErRzt3QkFFOUgsc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ2hCO0lBRVUsMkNBQVksR0FBcEI7UUFDSSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDM0UsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxDQUFDO1lBQzFCLGNBQWMsRUFBRSxrQkFBa0I7WUFDbEMsZUFBZSxFQUFFLFlBQVUsV0FBVyxDQUFDLEtBQU87U0FDakQsQ0FBQyxDQUFBO1FBRUYsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBckNRLG9CQUFvQjtRQURoQyxpQkFBVSxFQUFFO3lDQU1HLGlCQUFVO1lBQ0EsOEJBQWE7T0FOMUIsb0JBQW9CLENBc0NoQztJQUFELDJCQUFDO0NBQUEsQUF0Q0QsSUFzQ0M7QUF0Q1ksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5cblxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gXCIuL2NvbmZpZy5zZXJ2aWNlXCI7XG5cbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiOyBcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFByb2plY3RSZXBvcnRTZXJ2aWNlIHtcblxuXHRiYXNlVXJsOiBzdHJpbmcgPSAnJztcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG5cdFx0cHJpdmF0ZSBfY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZVxuXHQpIHtcblx0XHR0aGlzLmJhc2VVcmwgPSB0aGlzLl9jb25maWdTZXJ2aWNlLmdldEFwaUJhc2VVcmwoKTtcblx0fVxuXG5cdGFzeW5jIGNyZWF0ZVJlcG9ydChkYXRhKSB7XG5cdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8YW55PihgJHt0aGlzLmJhc2VVcmx9L3Byb2plY3RzL3JlcG9ydHNgLCBkYXRhLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGFzeW5jIGNoZWNrSGFzUmVwb3J0KHByb2plY3RJZCwgdXNlcklkKSB7XG5cdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZVVybH0vcHJvamVjdHMvJHtwcm9qZWN0SWR9L2hhc19yZXBvcnQ/dXNlcklkPSR7dXNlcklkfWAsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cblx0YXN5bmMgZ2V0U2FsZXNSZXBvcnQocHJvamVjdElkKSB7XG5cdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZVVybH0vcHJvamVjdHMvJHtwcm9qZWN0SWR9L3NhbGVzX3JlcG9ydGAsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUhlYWRlcigpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShhcHBTZXR0aW5ncy5nZXRTdHJpbmcoJ2N1cnJlbnRVc2VyJykgfHwgJ3t9Jyk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtjdXJyZW50VXNlci50b2tlbn1gXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHsgaGVhZGVyczogaGVhZGVycyB9O1xuICAgIH1cbn0iXX0=