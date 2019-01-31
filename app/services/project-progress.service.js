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
var ProjectProgressService = /** @class */ (function () {
    function ProjectProgressService(http, _configService) {
        this.http = http;
        this._configService = _configService;
        this.baseUrl = '';
        this.baseUrl = this._configService.getApiBaseUrl();
    }
    ProjectProgressService.prototype.getProgress = function (userId, projectId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/projects/" + projectId + "/finalization_progress?userId=" + userId, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProjectProgressService.prototype.updateProgress = function (projectId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.put(this.baseUrl + "/projects/" + projectId + "/finalization_progress", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProjectProgressService.prototype.createHeader = function () {
        var currentUser = JSON.parse(appSettings.getString('currentUser') || '{}');
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + currentUser.token
        });
        return { headers: headers };
    };
    ProjectProgressService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            config_service_1.ConfigService])
    ], ProjectProgressService);
    return ProjectProgressService;
}());
exports.ProjectProgressService = ProjectProgressService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1wcm9ncmVzcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvamVjdC1wcm9ncmVzcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsNkNBQTZFO0FBRTdFLG1EQUFpRDtBQUVqRCxrREFBb0Q7QUFHcEQ7SUFJQyxnQ0FDUyxJQUFnQixFQUNoQixjQUE2QjtRQUQ3QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBSnRDLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFNcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFFSyw0Q0FBVyxHQUFqQixVQUFrQixNQUFNLEVBQUUsU0FBUzs7Ozs7NEJBQ25CLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFTLElBQUksQ0FBQyxPQUFPLGtCQUFhLFNBQVMsc0NBQWlDLE1BQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXBKLFFBQVEsR0FBRyxTQUF5STt3QkFFeEosc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ2hCO0lBRUssK0NBQWMsR0FBcEIsVUFBcUIsU0FBUyxFQUFFLElBQUk7Ozs7OzRCQUNwQixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUyxJQUFJLENBQUMsT0FBTyxrQkFBYSxTQUFTLDJCQUF3QixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXpJLFFBQVEsR0FBRyxTQUE4SDt3QkFFN0ksc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ2hCO0lBRU8sNkNBQVksR0FBcEI7UUFDSSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDeEUsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxDQUFDO1lBQzFCLGNBQWMsRUFBRSxrQkFBa0I7WUFDbEMsZUFBZSxFQUFFLFlBQVUsV0FBVyxDQUFDLEtBQU87U0FDakQsQ0FBQyxDQUFBO1FBRUYsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBL0JRLHNCQUFzQjtRQURsQyxpQkFBVSxFQUFFO3lDQU1HLGlCQUFVO1lBQ0EsOEJBQWE7T0FOMUIsc0JBQXNCLENBZ0NsQztJQUFELDZCQUFDO0NBQUEsQUFoQ0QsSUFnQ0M7QUFoQ1ksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5cbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tIFwiLi9jb25maWcuc2VydmljZVwiO1xuXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjsgXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcm9qZWN0UHJvZ3Jlc3NTZXJ2aWNlIHtcblxuXHRiYXNlVXJsOiBzdHJpbmcgPSAnJztcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG5cdFx0cHJpdmF0ZSBfY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZVxuXHQpIHtcblx0XHR0aGlzLmJhc2VVcmwgPSB0aGlzLl9jb25maWdTZXJ2aWNlLmdldEFwaUJhc2VVcmwoKTtcblx0fVxuXG5cdGFzeW5jIGdldFByb2dyZXNzKHVzZXJJZCwgcHJvamVjdElkKSB7XG5cdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZVVybH0vcHJvamVjdHMvJHtwcm9qZWN0SWR9L2ZpbmFsaXphdGlvbl9wcm9ncmVzcz91c2VySWQ9JHt1c2VySWR9YCwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHRhc3luYyB1cGRhdGVQcm9ncmVzcyhwcm9qZWN0SWQsIGRhdGEpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucHV0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS9wcm9qZWN0cy8ke3Byb2plY3RJZH0vZmluYWxpemF0aW9uX3Byb2dyZXNzYCwgZGF0YSwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHRwcml2YXRlIGNyZWF0ZUhlYWRlcigpIHtcbiAgICBcdGxldCBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UoYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKCdjdXJyZW50VXNlcicpIHx8ICd7fScpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7Y3VycmVudFVzZXIudG9rZW59YFxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiB7IGhlYWRlcnM6IGhlYWRlcnMgfTtcbiAgICB9XG59Il19