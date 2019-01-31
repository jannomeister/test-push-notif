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
var ShipmentService = /** @class */ (function () {
    function ShipmentService(http, _configService) {
        this.http = http;
        this._configService = _configService;
        this.baseUrl = '';
        this.baseUrl = this._configService.getApiBaseUrl();
    }
    ShipmentService.prototype.confirm = function (shipmentId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.put(this.baseUrl + "/ups/" + shipmentId + "/confirm", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ShipmentService.prototype.checkShipmentStatus = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post(this.baseUrl + "/ups/track", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ShipmentService.prototype.getProjectShipmentHistory = function (projectId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/ups/projects/" + projectId + "/history", this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ShipmentService.prototype.getProjectShipment = function (projectId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/ups/projects/" + projectId + "/shipments", this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ShipmentService.prototype.trackShipment = function (projectId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/ups/projects/" + projectId + "/track_shipment", this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ShipmentService.prototype.getCurrentShipment = function (projectId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/ups/projects/" + projectId + "/current_shipment", this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ShipmentService.prototype.createHeader = function () {
        var currentUser = JSON.parse(appSettings.getString('currentUser') || '{}');
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + currentUser.token
        });
        return { headers: headers };
    };
    ShipmentService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            config_service_1.ConfigService])
    ], ShipmentService);
    return ShipmentService;
}());
exports.ShipmentService = ShipmentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcG1lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoaXBtZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBNkU7QUFFN0UsbURBQWlEO0FBRWpELGtEQUFvRDtBQUdwRDtJQUlDLHlCQUNTLElBQWdCLEVBQ2hCLGNBQTZCO1FBRDdCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFKdEMsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQU1wQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVLLGlDQUFPLEdBQWIsVUFBYyxVQUFVLEVBQUUsSUFBSTs7Ozs7NEJBQ2QscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVMsSUFBSSxDQUFDLE9BQU8sYUFBUSxVQUFVLGFBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUF2SCxRQUFRLEdBQUcsU0FBNEc7d0JBRTNILHNCQUFPLFFBQVEsRUFBQzs7OztLQUNoQjtJQUVLLDZDQUFtQixHQUF6QixVQUEwQixJQUFJOzs7Ozs0QkFDZCxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBUyxJQUFJLENBQUMsT0FBTyxlQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBeEcsUUFBUSxHQUFHLFNBQTZGO3dCQUU1RyxzQkFBTyxRQUFRLEVBQUM7Ozs7S0FDaEI7SUFFSyxtREFBeUIsR0FBL0IsVUFBZ0MsU0FBUzs7Ozs7NEJBQ3pCLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFTLElBQUksQ0FBQyxPQUFPLHNCQUFpQixTQUFTLGFBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQXpILFFBQVEsR0FBRyxTQUE4Rzt3QkFFN0gsc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ2hCO0lBRUssNENBQWtCLEdBQXhCLFVBQXlCLFNBQVM7Ozs7OzRCQUNsQixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUyxJQUFJLENBQUMsT0FBTyxzQkFBaUIsU0FBUyxlQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUEzSCxRQUFRLEdBQUcsU0FBZ0g7d0JBRS9ILHNCQUFPLFFBQVEsRUFBQzs7OztLQUNoQjtJQUVLLHVDQUFhLEdBQW5CLFVBQW9CLFNBQVM7Ozs7OzRCQUNiLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFTLElBQUksQ0FBQyxPQUFPLHNCQUFpQixTQUFTLG9CQUFpQixFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBaEksUUFBUSxHQUFHLFNBQXFIO3dCQUVwSSxzQkFBTyxRQUFRLEVBQUM7Ozs7S0FDaEI7SUFFSyw0Q0FBa0IsR0FBeEIsVUFBeUIsU0FBUzs7Ozs7NEJBQ2xCLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFTLElBQUksQ0FBQyxPQUFPLHNCQUFpQixTQUFTLHNCQUFtQixFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFBOzt3QkFBbEksUUFBUSxHQUFHLFNBQXVIO3dCQUV0SSxzQkFBTyxRQUFRLEVBQUM7Ozs7S0FDaEI7SUFFVSxzQ0FBWSxHQUFwQjtRQUNDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUN4RSxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLENBQUM7WUFDMUIsY0FBYyxFQUFFLGtCQUFrQjtZQUNsQyxlQUFlLEVBQUUsWUFBVSxXQUFXLENBQUMsS0FBTztTQUNqRCxDQUFDLENBQUE7UUFFRixPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUF2RFEsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQU1HLGlCQUFVO1lBQ0EsOEJBQWE7T0FOMUIsZUFBZSxDQXdEM0I7SUFBRCxzQkFBQztDQUFBLEFBeERELElBd0RDO0FBeERZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5cbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tIFwiLi9jb25maWcuc2VydmljZVwiO1xuXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjsgXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaGlwbWVudFNlcnZpY2Uge1xuXG5cdGJhc2VVcmw6IHN0cmluZyA9ICcnO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcblx0XHRwcml2YXRlIF9jb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlXG5cdCkge1xuXHRcdHRoaXMuYmFzZVVybCA9IHRoaXMuX2NvbmZpZ1NlcnZpY2UuZ2V0QXBpQmFzZVVybCgpO1xuXHR9XG5cblx0YXN5bmMgY29uZmlybShzaGlwbWVudElkLCBkYXRhKSB7XG5cdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnB1dDxhbnk+KGAke3RoaXMuYmFzZVVybH0vdXBzLyR7c2hpcG1lbnRJZH0vY29uZmlybWAsIGRhdGEsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cblx0YXN5bmMgY2hlY2tTaGlwbWVudFN0YXR1cyhkYXRhKSB7XG5cdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnBvc3Q8YW55PihgJHt0aGlzLmJhc2VVcmx9L3Vwcy90cmFja2AsIGRhdGEsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cblx0YXN5bmMgZ2V0UHJvamVjdFNoaXBtZW50SGlzdG9yeShwcm9qZWN0SWQpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS91cHMvcHJvamVjdHMvJHtwcm9qZWN0SWR9L2hpc3RvcnlgLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGFzeW5jIGdldFByb2plY3RTaGlwbWVudChwcm9qZWN0SWQpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS91cHMvcHJvamVjdHMvJHtwcm9qZWN0SWR9L3NoaXBtZW50c2AsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cblx0YXN5bmMgdHJhY2tTaGlwbWVudChwcm9qZWN0SWQpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS91cHMvcHJvamVjdHMvJHtwcm9qZWN0SWR9L3RyYWNrX3NoaXBtZW50YCwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7IFxuXHR9XG5cblx0YXN5bmMgZ2V0Q3VycmVudFNoaXBtZW50KHByb2plY3RJZCkge1xuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQ8YW55PihgJHt0aGlzLmJhc2VVcmx9L3Vwcy9wcm9qZWN0cy8ke3Byb2plY3RJZH0vY3VycmVudF9zaGlwbWVudGAsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlOyBcblx0fVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVIZWFkZXIoKSB7XG4gICAgXHRsZXQgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKGFwcFNldHRpbmdzLmdldFN0cmluZygnY3VycmVudFVzZXInKSB8fCAne30nKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2N1cnJlbnRVc2VyLnRva2VufWBcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4geyBoZWFkZXJzOiBoZWFkZXJzIH07XG4gICAgfVxufSJdfQ==