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
var Facebook = require("nativescript-facebook");
var httpModule = require("http");
var FacebookService = /** @class */ (function () {
    function FacebookService(http) {
        this.http = http;
        this.writePermissions = ["manage_pages", "publish_pages"];
        this.readPermissions = ["user_posts"];
        this.baseUrl = "https://graph.facebook.com";
        this.getAccessToken();
    }
    FacebookService.prototype.getAccessToken = function () {
        this.accessToken = (Facebook.getCurrentAccessToken()) ? Facebook.getCurrentAccessToken().accessToken : '';
    };
    FacebookService.prototype.connect = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            Facebook.requestReadPermissions(_this.readPermissions, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data.token);
                }
            });
        });
        return promise;
    };
    FacebookService.prototype.connectWithoutPermission = function () {
        var promise = new Promise(function (resolve, reject) {
            Facebook.login(function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data.token);
                }
            });
        });
        return promise;
    };
    FacebookService.prototype.logout = function () {
        Facebook.logout(function () { });
    };
    FacebookService.prototype.getData = function (token) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            httpModule.request({
                url: _this.baseUrl + "/me?fields=id,first_name,last_name,name,email,picture.type(large)&access_token=" + token,
                method: 'GET'
            }).then(function (res) {
                console.log("RESULT");
                resolve(res.content.toJSON());
            }, function (err) {
                console.log("ERROR");
                reject(err);
            });
        });
        return promise;
    };
    FacebookService.prototype.share = function (token) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            httpModule.request({
                url: (_this.baseUrl + "/me/feed?message=Sample Post!&link=http://www.yudabands.org/&access_token=" + token).replace(/ /g, "%20"),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                content: ''
            }).then(function (res) {
                resolve(res.content.toJSON());
            }, function (err) {
                reject(err);
            });
        });
        return promise;
    };
    FacebookService.prototype.getFacebookData = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/me?fields=id,first_name,last_name,name,email,picture.type(large)&access_token=" + accessToken).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    FacebookService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FacebookService);
    return FacebookService;
}());
exports.FacebookService = FacebookService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2suc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZhY2Vib29rLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBNkU7QUFHN0UsZ0RBQWtEO0FBQ2xELGlDQUFtQztBQUduQztJQVFDLHlCQUNlLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFKNUIscUJBQWdCLEdBQWtCLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3BFLG9CQUFlLEdBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFLbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztRQUM1QyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVJLHdDQUFjLEdBQXRCO1FBRUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFdBQVcsQ0FBQSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3RHLENBQUM7SUFFRCxpQ0FBTyxHQUFQO1FBQUEsaUJBWUM7UUFYRyxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3RDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFJLENBQUMsZUFBZSxFQUFFLFVBQUMsR0FBRyxFQUFFLElBQUk7Z0JBQzVELElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtpQkFDZDtxQkFBSTtvQkFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2lCQUN0QjtZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsa0RBQXdCLEdBQXhCO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN0QyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBRyxFQUFFLElBQUk7Z0JBQ3JCLElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtpQkFDZDtxQkFBSTtvQkFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2lCQUN0QjtZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsZ0NBQU0sR0FBTjtRQUNJLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBTyxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsaUNBQU8sR0FBUCxVQUFRLEtBQUs7UUFBYixpQkFpQkM7UUFoQkcsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUV0QyxVQUFVLENBQUMsT0FBTyxDQUFDO2dCQUNmLEdBQUcsRUFBSyxLQUFJLENBQUMsT0FBTyx1RkFBa0YsS0FBTztnQkFDN0csTUFBTSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7Z0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtnQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNsQyxDQUFDLEVBQUUsVUFBQyxHQUFHO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUVOLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELCtCQUFLLEdBQUwsVUFBTSxLQUFLO1FBQVgsaUJBZUM7UUFkRyxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3RDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2YsR0FBRyxFQUFFLENBQUcsS0FBSSxDQUFDLE9BQU8sa0ZBQTZFLEtBQU8sQ0FBQSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO2dCQUM3SCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUU7Z0JBQy9DLE9BQU8sRUFBRSxFQUFFO2FBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7Z0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNsQyxDQUFDLEVBQUUsVUFBQyxHQUFHO2dCQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVLLHlDQUFlLEdBQXJCLFVBQXNCLFdBQVc7Ozs7OzRCQUNmLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFTLElBQUksQ0FBQyxPQUFPLHVGQUFrRixXQUFhLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQS9KLFFBQVEsR0FBRyxTQUFvSjt3QkFFckssc0JBQU8sUUFBUSxFQUFDOzs7O0tBQ2hCO0lBNUZRLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTt5Q0FVUyxpQkFBVTtPQVRuQixlQUFlLENBNkYzQjtJQUFELHNCQUFDO0NBQUEsQUE3RkQsSUE2RkM7QUE3RlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcblxuXG5pbXBvcnQgKiBhcyBGYWNlYm9vayBmcm9tIFwibmF0aXZlc2NyaXB0LWZhY2Vib29rXCI7XG5pbXBvcnQgKiBhcyBodHRwTW9kdWxlIGZyb20gXCJodHRwXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGYWNlYm9va1NlcnZpY2Uge1xuXG5cdGJhc2VVcmw6IHN0cmluZztcblx0YWNjZXNzVG9rZW46IHN0cmluZztcblxuICAgIHdyaXRlUGVybWlzc2lvbnM6IEFycmF5PHN0cmluZz4gPSBbXCJtYW5hZ2VfcGFnZXNcIiwgXCJwdWJsaXNoX3BhZ2VzXCJdO1xuICAgIHJlYWRQZXJtaXNzaW9uczogQXJyYXk8c3RyaW5nPiA9IFtcInVzZXJfcG9zdHNcIl07XG5cblx0Y29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICApIHtcblx0XHR0aGlzLmJhc2VVcmwgPSBcImh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tXCI7XG5cdFx0dGhpcy5nZXRBY2Nlc3NUb2tlbigpO1xuICAgIH1cblxuXHRwcml2YXRlIGdldEFjY2Vzc1Rva2VuKCkge1xuXG5cdFx0dGhpcy5hY2Nlc3NUb2tlbiA9IChGYWNlYm9vay5nZXRDdXJyZW50QWNjZXNzVG9rZW4oKSk/IEZhY2Vib29rLmdldEN1cnJlbnRBY2Nlc3NUb2tlbigpLmFjY2Vzc1Rva2VuOiAnJztcbiAgICB9XG5cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIEZhY2Vib29rLnJlcXVlc3RSZWFkUGVybWlzc2lvbnModGhpcy5yZWFkUGVybWlzc2lvbnMsIChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycilcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnRva2VuKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIGNvbm5lY3RXaXRob3V0UGVybWlzc2lvbigpIHtcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBGYWNlYm9vay5sb2dpbigoZXJyLCBkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YS50b2tlbilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBsb2dvdXQoKSB7XG4gICAgICAgIEZhY2Vib29rLmxvZ291dCgoKSA9PiB7fSk7XG4gICAgfVxuXG4gICAgZ2V0RGF0YSh0b2tlbikge1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgaHR0cE1vZHVsZS5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6IGAke3RoaXMuYmFzZVVybH0vbWU/ZmllbGRzPWlkLGZpcnN0X25hbWUsbGFzdF9uYW1lLG5hbWUsZW1haWwscGljdHVyZS50eXBlKGxhcmdlKSZhY2Nlc3NfdG9rZW49JHt0b2tlbn1gLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVTVUxUXCIpXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuY29udGVudC50b0pTT04oKSk7XG4gICAgICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUlwiKVxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBzaGFyZSh0b2tlbikge1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGh0dHBNb2R1bGUucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsOiBgJHt0aGlzLmJhc2VVcmx9L21lL2ZlZWQ/bWVzc2FnZT1TYW1wbGUgUG9zdCEmbGluaz1odHRwOi8vd3d3Lnl1ZGFiYW5kcy5vcmcvJmFjY2Vzc190b2tlbj0ke3Rva2VufWAucmVwbGFjZSgvIC9nLCBcIiUyMFwiKSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnJ1xuICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuY29udGVudC50b0pTT04oKSk7XG4gICAgICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRGYWNlYm9va0RhdGEoYWNjZXNzVG9rZW4pIHtcbiAgICBcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZVVybH0vbWU/ZmllbGRzPWlkLGZpcnN0X25hbWUsbGFzdF9uYW1lLG5hbWUsZW1haWwscGljdHVyZS50eXBlKGxhcmdlKSZhY2Nlc3NfdG9rZW49JHthY2Nlc3NUb2tlbn1gKS50b1Byb21pc2UoKTtcblxuICAgIFx0cmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbn0iXX0=