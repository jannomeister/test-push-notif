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
var ProjectMemberService = /** @class */ (function () {
    function ProjectMemberService(http, _configService) {
        this.http = http;
        this._configService = _configService;
        this.baseUrl = '';
        this.baseUrl = this._configService.getApiBaseUrl();
    }
    ProjectMemberService.prototype.createProjectMember = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post(this.baseUrl + "/projects/members/join", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProjectMemberService.prototype.getProjectMembers = function (projectId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/projects/" + projectId + "/members", this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProjectMemberService.prototype.checkIfMember = function (projectId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/projects/" + projectId + "/members/" + userId + "/verify", this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProjectMemberService.prototype.checkIfHasProject = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/projects/members/" + userId + "/check", this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProjectMemberService.prototype.approveRequest = function (projectMemberId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.put(this.baseUrl + "/projects/members/" + projectMemberId + "/request/approval", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProjectMemberService.prototype.createHeader = function () {
        var currentUser = JSON.parse(appSettings.getString('currentUser') || '{}');
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + currentUser.token
        });
        return { headers: headers };
    };
    ProjectMemberService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            config_service_1.ConfigService])
    ], ProjectMemberService);
    return ProjectMemberService;
}());
exports.ProjectMemberService = ProjectMemberService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1tZW1iZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2plY3QtbWVtYmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBNkU7QUFHN0UsbURBQWlEO0FBRWpELGtEQUFvRDtBQUdwRDtJQUlDLDhCQUNTLElBQWdCLEVBQ2hCLGNBQTZCO1FBRDdCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFKdEMsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQU1wQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVLLGtEQUFtQixHQUF6QixVQUEwQixJQUFJOzs7Ozs0QkFDZCxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBUyxJQUFJLENBQUMsT0FBTywyQkFBd0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUFwSCxRQUFRLEdBQUcsU0FBeUc7d0JBRXhILHNCQUFPLFFBQVEsRUFBQzs7OztLQUNoQjtJQUVLLGdEQUFpQixHQUF2QixVQUF3QixTQUFTOzs7Ozs0QkFDakIscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVMsSUFBSSxDQUFDLE9BQU8sa0JBQWEsU0FBUyxhQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUFySCxRQUFRLEdBQUcsU0FBMEc7d0JBRXpILHNCQUFPLFFBQVEsRUFBQzs7OztLQUNoQjtJQUVLLDRDQUFhLEdBQW5CLFVBQW9CLFNBQVMsRUFBRSxNQUFNOzs7Ozs0QkFDckIscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVMsSUFBSSxDQUFDLE9BQU8sa0JBQWEsU0FBUyxpQkFBWSxNQUFNLFlBQVMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXRJLFFBQVEsR0FBRyxTQUEySDt3QkFFMUksc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ2hCO0lBRUssZ0RBQWlCLEdBQXZCLFVBQXdCLE1BQU07Ozs7OzRCQUNkLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFTLElBQUksQ0FBQyxPQUFPLDBCQUFxQixNQUFNLFdBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXhILFFBQVEsR0FBRyxTQUE2Rzt3QkFFNUgsc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ2hCO0lBRUssNkNBQWMsR0FBcEIsVUFBcUIsZUFBZSxFQUFFLElBQUk7Ozs7OzRCQUMxQixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUyxJQUFJLENBQUMsT0FBTywwQkFBcUIsZUFBZSxzQkFBbUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUFsSixRQUFRLEdBQUcsU0FBdUk7d0JBRXRKLHNCQUFPLFFBQVEsRUFBQzs7OztLQUNoQjtJQUVVLDJDQUFZLEdBQXBCO1FBQ0ksSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQzNFLElBQUksT0FBTyxHQUFHLElBQUksa0JBQVcsQ0FBQztZQUMxQixjQUFjLEVBQUUsa0JBQWtCO1lBQ2xDLGVBQWUsRUFBRSxZQUFVLFdBQVcsQ0FBQyxLQUFPO1NBQ2pELENBQUMsQ0FBQTtRQUVGLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQWpEUSxvQkFBb0I7UUFEaEMsaUJBQVUsRUFBRTt5Q0FNRyxpQkFBVTtZQUNBLDhCQUFhO09BTjFCLG9CQUFvQixDQWtEaEM7SUFBRCwyQkFBQztDQUFBLEFBbERELElBa0RDO0FBbERZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuXG5cbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tIFwiLi9jb25maWcuc2VydmljZVwiO1xuXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjsgXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcm9qZWN0TWVtYmVyU2VydmljZSB7XG5cblx0YmFzZVVybDogc3RyaW5nID0gJyc7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuXHRcdHByaXZhdGUgX2NvbmZpZ1NlcnZpY2U6IENvbmZpZ1NlcnZpY2Vcblx0KSB7XG5cdFx0dGhpcy5iYXNlVXJsID0gdGhpcy5fY29uZmlnU2VydmljZS5nZXRBcGlCYXNlVXJsKCk7XG5cdH1cblxuXHRhc3luYyBjcmVhdGVQcm9qZWN0TWVtYmVyKGRhdGEpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxhbnk+KGAke3RoaXMuYmFzZVVybH0vcHJvamVjdHMvbWVtYmVycy9qb2luYCwgZGF0YSwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHRhc3luYyBnZXRQcm9qZWN0TWVtYmVycyhwcm9qZWN0SWQpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS9wcm9qZWN0cy8ke3Byb2plY3RJZH0vbWVtYmVyc2AsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cblx0YXN5bmMgY2hlY2tJZk1lbWJlcihwcm9qZWN0SWQsIHVzZXJJZCkge1xuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQ8YW55PihgJHt0aGlzLmJhc2VVcmx9L3Byb2plY3RzLyR7cHJvamVjdElkfS9tZW1iZXJzLyR7dXNlcklkfS92ZXJpZnlgLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGFzeW5jIGNoZWNrSWZIYXNQcm9qZWN0KHVzZXJJZCkge1xuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQ8YW55PihgJHt0aGlzLmJhc2VVcmx9L3Byb2plY3RzL21lbWJlcnMvJHt1c2VySWR9L2NoZWNrYCwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHRhc3luYyBhcHByb3ZlUmVxdWVzdChwcm9qZWN0TWVtYmVySWQsIGRhdGEpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucHV0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS9wcm9qZWN0cy9tZW1iZXJzLyR7cHJvamVjdE1lbWJlcklkfS9yZXF1ZXN0L2FwcHJvdmFsYCwgZGF0YSwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuICAgIHByaXZhdGUgY3JlYXRlSGVhZGVyKCkge1xuICAgICAgICBsZXQgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGFwcFNldHRpbmdzLmdldFN0cmluZygnY3VycmVudFVzZXInKSB8fCAne30nKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2N1cnJlbnRVc2VyLnRva2VufWBcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4geyBoZWFkZXJzOiBoZWFkZXJzIH07XG4gICAgfVxufSJdfQ==