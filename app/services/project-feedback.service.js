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
var ProjectFeedbackService = /** @class */ (function () {
    function ProjectFeedbackService(http, _configService) {
        this.http = http;
        this._configService = _configService;
        this.baseUrl = '';
        this.baseUrl = this._configService.getApiBaseUrl();
    }
    ProjectFeedbackService.prototype.createFeedback = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post(this.baseUrl + "/projects/feedback", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ProjectFeedbackService.prototype.createHeader = function () {
        var currentUser = JSON.parse(appSettings.getString('currentUser') || '{}');
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + currentUser.token
        });
        return { headers: headers };
    };
    ProjectFeedbackService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            config_service_1.ConfigService])
    ], ProjectFeedbackService);
    return ProjectFeedbackService;
}());
exports.ProjectFeedbackService = ProjectFeedbackService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1mZWVkYmFjay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvamVjdC1mZWVkYmFjay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsNkNBQTZFO0FBRzdFLG1EQUFpRDtBQUVqRCxrREFBb0Q7QUFHcEQ7SUFJQyxnQ0FDUyxJQUFnQixFQUNoQixjQUE2QjtRQUQ3QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBSnRDLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFNcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFFSywrQ0FBYyxHQUFwQixVQUFxQixJQUFJOzs7Ozs0QkFDVCxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBUyxJQUFJLENBQUMsT0FBTyx1QkFBb0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUFoSCxRQUFRLEdBQUcsU0FBcUc7d0JBRXBILHNCQUFPLFFBQVEsRUFBQzs7OztLQUNoQjtJQUVVLDZDQUFZLEdBQXBCO1FBQ0MsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ3hFLElBQUksT0FBTyxHQUFHLElBQUksa0JBQVcsQ0FBQztZQUMxQixjQUFjLEVBQUUsa0JBQWtCO1lBQ2xDLGVBQWUsRUFBRSxZQUFVLFdBQVcsQ0FBQyxLQUFPO1NBQ2pELENBQUMsQ0FBQTtRQUVGLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQXpCUSxzQkFBc0I7UUFEbEMsaUJBQVUsRUFBRTt5Q0FNRyxpQkFBVTtZQUNBLDhCQUFhO09BTjFCLHNCQUFzQixDQTBCbEM7SUFBRCw2QkFBQztDQUFBLEFBMUJELElBMEJDO0FBMUJZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuXG5cbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tIFwiLi9jb25maWcuc2VydmljZVwiO1xuXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjsgXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcm9qZWN0RmVlZGJhY2tTZXJ2aWNlIHtcblxuXHRiYXNlVXJsOiBzdHJpbmcgPSAnJztcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG5cdFx0cHJpdmF0ZSBfY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZVxuXHQpIHtcblx0XHR0aGlzLmJhc2VVcmwgPSB0aGlzLl9jb25maWdTZXJ2aWNlLmdldEFwaUJhc2VVcmwoKTtcblx0fVxuXG5cdGFzeW5jIGNyZWF0ZUZlZWRiYWNrKGRhdGEpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxhbnk+KGAke3RoaXMuYmFzZVVybH0vcHJvamVjdHMvZmVlZGJhY2tgLCBkYXRhLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVIZWFkZXIoKSB7XG4gICAgXHRsZXQgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGFwcFNldHRpbmdzLmdldFN0cmluZygnY3VycmVudFVzZXInKSB8fCAne30nKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2N1cnJlbnRVc2VyLnRva2VufWBcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4geyBoZWFkZXJzOiBoZWFkZXJzIH07XG4gICAgfVxufSJdfQ==