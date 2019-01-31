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
var SearchService = /** @class */ (function () {
    function SearchService(http, _configService) {
        this.http = http;
        this._configService = _configService;
        this.baseUrl = '';
        this.baseUrl = this._configService.getApiBaseUrl();
    }
    SearchService.prototype.searchAll = function (query, page, limit, orderBy) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get((this.baseUrl + "/search?query=" + query + "&page=" + page + "&limit=" + limit + "&orderBy=" + orderBy).replace(/ /g, "%20"), this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    SearchService.prototype.searchAvailableStudent = function (page, limit, query, lastId, genderFilter, countryFilter, bandsFilter) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get((this.baseUrl + "/search/available_students?query=" + query + "&lastId=" + lastId + "&genderFilter=" + genderFilter + "&countryFilter=" + countryFilter + "&bandsFilter=" + bandsFilter + "&page=" + page + "&limit=" + limit).replace(/ /g, "%20"), this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    SearchService.prototype.searchStudents = function (query, page, limit, orderBy) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get((this.baseUrl + "/search/students?query=" + query + "&page=" + page + "&limit=" + limit + "&orderBy=" + orderBy).replace(/ /g, "%20"), this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    SearchService.prototype.searchProjects = function (query, page, limit, orderBy) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get((this.baseUrl + "/search/projects?query=" + query + "&page=" + page + "&limit=" + limit + "&orderBy=" + orderBy).replace(/ /g, "%20"), this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    SearchService.prototype.searchSchools = function (query, page, limit, orderBy) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get((this.baseUrl + "/search/schools?query=" + query + "&page=" + page + "&limit=" + limit + "&orderBy=" + orderBy).replace(/ /g, "%20"), this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    SearchService.prototype.searchTeachers = function (query, page, limit, orderBy) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get((this.baseUrl + "/search/teachers?query=" + query + "&page=" + page + "&limit=" + limit + "&orderBy=" + orderBy).replace(/ /g, "%20"), this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    SearchService.prototype.searchAddressAutocomplete = function (searchAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get((this.baseUrl + "/search/address/autocomplete?input=" + searchAddress).replace(/ /g, "%20"), this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    SearchService.prototype.createHeader = function () {
        var currentUser = JSON.parse(appSettings.getString('currentUser') || '{}');
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + currentUser.token
        });
        return { headers: headers };
    };
    SearchService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            config_service_1.ConfigService])
    ], SearchService);
    return SearchService;
}());
exports.SearchService = SearchService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLDZDQUE2RTtBQUc3RSxtREFBaUQ7QUFFakQsa0RBQW9EO0FBR3BEO0lBSUMsdUJBQ1MsSUFBZ0IsRUFDaEIsY0FBNkI7UUFEN0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUp0QyxZQUFPLEdBQVcsRUFBRSxDQUFDO1FBTXBCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBRUssaUNBQVMsR0FBZixVQUFnQixLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPOzs7Ozs0QkFDM0IscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQU0sQ0FBRyxJQUFJLENBQUMsT0FBTyxzQkFBaUIsS0FBSyxjQUFTLElBQUksZUFBVSxLQUFLLGlCQUFZLE9BQVMsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUFqTCxRQUFRLEdBQUcsU0FBc0s7d0JBRXJMLHNCQUFPLFFBQVEsRUFBQzs7OztLQUNoQjtJQUVLLDhDQUFzQixHQUE1QixVQUE2QixJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBYSxFQUFFLGFBQWMsRUFBRSxXQUFZOzs7Ozs0QkFDcEYscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQU0sQ0FBRyxJQUFJLENBQUMsT0FBTyx5Q0FBb0MsS0FBSyxnQkFBVyxNQUFNLHNCQUFpQixZQUFZLHVC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Q0FBQztRQUN4RSxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLENBQUM7WUFDMUIsY0FBYyxFQUFFLGtCQUFrQjtZQUNsQyxlQUFlLEVBQUUsWUFBVSxXQUFXLENBQUMsS0FBTztTQUNqRCxDQUFDLENBQUE7UUFFRixPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUE3RFEsYUFBYTtRQUR6QixpQkFBVSxFQUFFO3lDQU1HLGlCQUFVO1lBQ0EsOEJBQWE7T0FOMUIsYUFBYSxDQThEekI7SUFBRCxvQkFBQztDQUFBLEFBOURELElBOERDO0FBOURZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5cblxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gXCIuL2NvbmZpZy5zZXJ2aWNlXCI7XG5cbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiOyBcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlcnZpY2Uge1xuXG5cdGJhc2VVcmw6IHN0cmluZyA9ICcnO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcblx0XHRwcml2YXRlIF9jb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlXG5cdCkge1xuXHRcdHRoaXMuYmFzZVVybCA9IHRoaXMuX2NvbmZpZ1NlcnZpY2UuZ2V0QXBpQmFzZVVybCgpO1xuXHR9XG5cblx0YXN5bmMgc2VhcmNoQWxsKHF1ZXJ5LCBwYWdlLCBsaW1pdCwgb3JkZXJCeSkge1xuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQ8YW55PihgJHt0aGlzLmJhc2VVcmx9L3NlYXJjaD9xdWVyeT0ke3F1ZXJ5fSZwYWdlPSR7cGFnZX0mbGltaXQ9JHtsaW1pdH0mb3JkZXJCeT0ke29yZGVyQnl9YC5yZXBsYWNlKC8gL2csIFwiJTIwXCIpLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGFzeW5jIHNlYXJjaEF2YWlsYWJsZVN0dWRlbnQocGFnZSwgbGltaXQsIHF1ZXJ5LCBsYXN0SWQsIGdlbmRlckZpbHRlcj8sIGNvdW50cnlGaWx0ZXI/LCBiYW5kc0ZpbHRlcj8pIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS9zZWFyY2gvYXZhaWxhYmxlX3N0dWRlbnRzP3F1ZXJ5PSR7cXVlcnl9Jmxhc3RJZD0ke2xhc3RJZH0mZ2VuZGVyRmlsdGVyPSR7Z2VuZGVyRmlsdGVyfSZjb3VudHJ5RmlsdGVyPSR7Y291bnRyeUZpbHRlcn0mYmFuZHNGaWx0ZXI9JHtiYW5kc0ZpbHRlcn0mcGFnZT0ke3BhZ2V9JmxpbWl0PSR7bGltaXR9YC5yZXBsYWNlKC8gL2csIFwiJTIwXCIpLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGFzeW5jIHNlYXJjaFN0dWRlbnRzKHF1ZXJ5LCBwYWdlLCBsaW1pdCwgb3JkZXJCeSkge1xuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQ8YW55PihgJHt0aGlzLmJhc2VVcmx9L3NlYXJjaC9zdHVkZW50cz9xdWVyeT0ke3F1ZXJ5fSZwYWdlPSR7cGFnZX0mbGltaXQ9JHtsaW1pdH0mb3JkZXJCeT0ke29yZGVyQnl9YC5yZXBsYWNlKC8gL2csIFwiJTIwXCIpLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGFzeW5jIHNlYXJjaFByb2plY3RzKHF1ZXJ5LCBwYWdlLCBsaW1pdCwgb3JkZXJCeSkge1xuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQ8YW55PihgJHt0aGlzLmJhc2VVcmx9L3NlYXJjaC9wcm9qZWN0cz9xdWVyeT0ke3F1ZXJ5fSZwYWdlPSR7cGFnZX0mbGltaXQ9JHtsaW1pdH0mb3JkZXJCeT0ke29yZGVyQnl9YC5yZXBsYWNlKC8gL2csIFwiJTIwXCIpLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGFzeW5jIHNlYXJjaFNjaG9vbHMocXVlcnksIHBhZ2UsIGxpbWl0LCBvcmRlckJ5KSB7XG5cdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZVVybH0vc2VhcmNoL3NjaG9vbHM/cXVlcnk9JHtxdWVyeX0mcGFnZT0ke3BhZ2V9JmxpbWl0PSR7bGltaXR9Jm9yZGVyQnk9JHtvcmRlckJ5fWAucmVwbGFjZSgvIC9nLCBcIiUyMFwiKSwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHRhc3luYyBzZWFyY2hUZWFjaGVycyhxdWVyeSwgcGFnZSwgbGltaXQsIG9yZGVyQnkpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS9zZWFyY2gvdGVhY2hlcnM/cXVlcnk9JHtxdWVyeX0mcGFnZT0ke3BhZ2V9JmxpbWl0PSR7bGltaXR9Jm9yZGVyQnk9JHtvcmRlckJ5fWAucmVwbGFjZSgvIC9nLCBcIiUyMFwiKSwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHRhc3luYyBzZWFyY2hBZGRyZXNzQXV0b2NvbXBsZXRlKHNlYXJjaEFkZHJlc3MpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS9zZWFyY2gvYWRkcmVzcy9hdXRvY29tcGxldGU/aW5wdXQ9JHtzZWFyY2hBZGRyZXNzfWAucmVwbGFjZSgvIC9nLCBcIiUyMFwiKSwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7IFxuXHR9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUhlYWRlcigpIHtcbiAgICBcdGxldCBjdXJyZW50VXNlciA9IEpTT04ucGFyc2UoYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKCdjdXJyZW50VXNlcicpIHx8ICd7fScpO1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7Y3VycmVudFVzZXIudG9rZW59YFxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiB7IGhlYWRlcnM6IGhlYWRlcnMgfTtcbiAgICB9XG59XG4iXX0=