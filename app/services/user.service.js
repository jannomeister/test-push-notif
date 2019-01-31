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
var httpModule = require("http");
var appSettings = require("application-settings");
var platformModule = require("tns-core-modules/platform");
var pushPlugin = require("nativescript-push-notifications");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var messaging_1 = require("nativescript-plugin-firebase/messaging");
var UserService = /** @class */ (function () {
    function UserService(http, _configService) {
        this.http = http;
        this._configService = _configService;
        this.baseUrl = '';
        this.baseUrl = this._configService.getApiBaseUrl();
    }
    UserService.prototype.getCurrentUserId = function () {
        var currentUser = JSON.parse(appSettings.getString('currentUser') || '{}');
        if (currentUser.data) {
            return currentUser.data.userId;
        }
        else {
            return 0;
        }
    };
    UserService.prototype.getTourStatus = function () {
        return appSettings.getBoolean('isTourDone', false);
    };
    UserService.prototype.getCurrentUser = function () {
        return JSON.parse(appSettings.getString('currentUser') || '{}');
    };
    UserService.prototype.getStartProjectData = function () {
        return JSON.parse(appSettings.getString('startProjectData') || '{}');
    };
    UserService.prototype.saveStartProjectData = function (data) {
        appSettings.setString('startProjectData', JSON.stringify(data));
    };
    UserService.prototype.saveTourStatus = function (status) {
        appSettings.setBoolean('isTourDone', status);
    };
    UserService.prototype.saveCurrentUser = function (user) {
        appSettings.setString('currentUser', JSON.stringify(user));
    };
    UserService.prototype.removeStartProjectData = function () {
        appSettings.remove('startProjectData');
    };
    UserService.prototype.removeTourStatus = function () {
        appSettings.remove('isTourDone');
    };
    UserService.prototype.removeCurrentUser = function () {
        appSettings.remove('currentUser');
    };
    UserService.prototype.removeStartProjectCurrentProgress = function () {
        appSettings.remove('startProjectProgress');
    };
    UserService.prototype.registerToken = function () {
        var iosSettings = this._configService.pushSettings();
        var promise = new Promise(function (resolve, reject) {
            pushPlugin.register(iosSettings, function (token) {
                if (iosSettings.interactiveSettings) {
                    pushPlugin.registerUserNotificationSettings(function () {
                        resolve(token);
                    }, function (err) {
                        reject('Interactive push error: ' + err);
                    });
                }
            }, function (err) {
                reject(err);
            });
        });
        return promise;
    };
    UserService.prototype.registerTokenV2 = function () {
        // return new Promise((resolve, reject) => {
        // 	this.doRegisterForPushNotifications().then(() => {
        // 		messaging.getCurrentPushToken()
        // 			.then((token) => resolve(token))
        // 			.catch((err) => reject(err))
        // 	}).catch(err => reject(err))
        // })
        return new Promise(function (resolve, reject) {
            messaging_1.messaging.registerForPushNotifications({
                onPushTokenReceivedCallback: function (token) {
                    dialogs_1.alert({
                        title: 'TOKEN!!!',
                        message: token,
                        okButtonText: "OK!!!"
                    });
                },
                onMessageReceivedCallback: function (message) {
                    console.log("Push message received: " + message.title);
                }
            }).then(function () { return resolve("Registered for push"); });
        });
    };
    UserService.prototype.doRegisterForPushNotifications = function () {
        return new Promise(function (resolve, reject) {
            messaging_1.messaging.registerForPushNotifications({
                onPushTokenReceivedCallback: function (token) { console.log("token notification"); },
                onMessageReceivedCallback: function (message) { console.log("onMessageReceivedCallback"); },
                showNotifications: true,
                showNotificationsWhenInForeground: true
            }).then(function () { return resolve(true); }).catch(function (err) { return reject(err); });
        });
    };
    UserService.prototype.registerUserDevice = function (userId, deviceId) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var data = {
                userId: userId,
                deviceId: deviceId
            };
            httpModule.request({
                url: _this.baseUrl + "/users/devices",
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
    UserService.prototype.getUserData = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/users/" + userId, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.checkUserVerification = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/users/" + userId + "/check_verification", this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.createUserSetting = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post(this.baseUrl + "/users/settings", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.updateUser = function (userId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.put(this.baseUrl + "/users/" + userId, data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.changePassword = function (userId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.put(this.baseUrl + "/users/" + userId + "/change_password", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.getUserSetting = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/users/" + userId + "/settings", this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.updateTourProgress = function (userId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.put(this.baseUrl + "/users/" + userId + "/settings/update_tour", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.updateUserSetting = function (userSettingId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.put(this.baseUrl + "/settings/" + userSettingId, data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.getUserCurrentProject = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/users/" + userId + "/project/current", this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.getUserLatestProject = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/users/" + userId + "/project/latest", this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /* DEPRECATED (NOT USED) */
    UserService.prototype.createUserDevice = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post(this.baseUrl + "/users/devices", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.updateUserDevice = function (userId, deviceUUID) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.put(this.baseUrl + "/users/" + userId + "/devices/" + deviceUUID, {}, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.updateUserDeviceLoginStatus = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var deviceUUID, data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deviceUUID = platformModule.device.uuid;
                        data = {
                            deviceOS: platformModule.device.os,
                            deviceModel: platformModule.device.model,
                            deviceType: platformModule.device.deviceType
                        };
                        return [4 /*yield*/, this.http.put(this.baseUrl + "/users/" + userId + "/devices/" + deviceUUID + "/login", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.updateUserDeviceLogoutStatus = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var deviceUUID, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deviceUUID = platformModule.device.uuid;
                        return [4 /*yield*/, this.http.put(this.baseUrl + "/users/" + userId + "/devices/" + deviceUUID + "/logout", {}, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.createUserSharedPost = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post(this.baseUrl + "/users/share_post", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.getUserSharedPost = function (userId, postId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/users/" + userId + "/posts/" + postId + "/shares", this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.createUserLinkedAccount = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post(this.baseUrl + "/linked_account", data, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.getUserLinkedAccount = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.baseUrl + "/linked_account/" + userId, this.createHeader()).toPromise()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserService.prototype.createHeader = function () {
        var currentUser = JSON.parse(appSettings.getString('currentUser') || '{}');
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + currentUser.token
        });
        return { headers: headers };
    };
    UserService.APP_REGISTERED_FOR_NOTIFICATIONS = "APP_REGISTERED_FOR_NOTIFICATIONS";
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            config_service_1.ConfigService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsNkNBQTZFO0FBRTdFLG1EQUFpRDtBQUVqRCxpQ0FBbUM7QUFDbkMsa0RBQW9EO0FBQ3BELDBEQUE0RDtBQUM1RCw0REFBOEQ7QUFDOUQsdURBQTZEO0FBRTdELG9FQUE0RTtBQUc1RTtJQU1DLHFCQUNTLElBQWdCLEVBQ2hCLGNBQTZCO1FBRDdCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFOdEMsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQVFwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVELHNDQUFnQixHQUFoQjtRQUNDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUUzRSxJQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDcEIsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUMvQjthQUFLO1lBQ0wsT0FBTyxDQUFDLENBQUM7U0FDVDtJQUNGLENBQUM7SUFFRCxtQ0FBYSxHQUFiO1FBQ0MsT0FBTyxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsb0NBQWMsR0FBZDtRQUNDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCx5Q0FBbUIsR0FBbkI7UUFDQyxPQUFPLElB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RSxZQUFVLFdBQVcsQ0FBQyxLQUFPO1NBQ2pELENBQUMsQ0FBQTtRQUVGLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQTlRVyw0Q0FBZ0MsR0FBRyxrQ0FBa0MsQ0FBQztJQUp6RSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBUUcsaUJBQVU7WUFDQSw4QkFBYTtPQVIxQixXQUFXLENBbVJ2QjtJQUFELGtCQUFDO0NBQUEsQUFuUkQsSUFtUkM7QUFuUlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcblxuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gXCIuL2NvbmZpZy5zZXJ2aWNlXCI7XG5cbmltcG9ydCAqIGFzIGh0dHBNb2R1bGUgZnJvbSBcImh0dHBcIjtcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiOyBcbmltcG9ydCAqIGFzIHBsYXRmb3JtTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XG5pbXBvcnQgKiBhcyBwdXNoUGx1Z2luIGZyb20gXCJuYXRpdmVzY3JpcHQtcHVzaC1ub3RpZmljYXRpb25zXCI7XG5pbXBvcnQgeyBhbGVydCwgY29uZmlybSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcblxuaW1wb3J0IHsgbWVzc2FnaW5nLCBNZXNzYWdlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvbWVzc2FnaW5nXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSB7XG5cblx0YmFzZVVybDogc3RyaW5nID0gJyc7XG5cdFxuXHRwcml2YXRlIHN0YXRpYyBBUFBfUkVHSVNURVJFRF9GT1JfTk9USUZJQ0FUSU9OUyA9IFwiQVBQX1JFR0lTVEVSRURfRk9SX05PVElGSUNBVElPTlNcIjtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG5cdFx0cHJpdmF0ZSBfY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZVxuXHQpIHtcblx0XHR0aGlzLmJhc2VVcmwgPSB0aGlzLl9jb25maWdTZXJ2aWNlLmdldEFwaUJhc2VVcmwoKTtcblx0fVxuXG5cdGdldEN1cnJlbnRVc2VySWQoKSB7XG5cdFx0bGV0IGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShhcHBTZXR0aW5ncy5nZXRTdHJpbmcoJ2N1cnJlbnRVc2VyJykgfHwgJ3t9Jyk7XG5cblx0XHRpZihjdXJyZW50VXNlci5kYXRhKSB7XG5cdFx0XHRyZXR1cm4gY3VycmVudFVzZXIuZGF0YS51c2VySWQ7XG5cdFx0fWVsc2Uge1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXHR9XG5cblx0Z2V0VG91clN0YXR1cygpIHtcblx0XHRyZXR1cm4gYXBwU2V0dGluZ3MuZ2V0Qm9vbGVhbignaXNUb3VyRG9uZScsIGZhbHNlKTtcblx0fVxuXG5cdGdldEN1cnJlbnRVc2VyKCkge1xuXHRcdHJldHVybiBKU09OLnBhcnNlKGFwcFNldHRpbmdzLmdldFN0cmluZygnY3VycmVudFVzZXInKSB8fCAne30nKTtcblx0fVxuXG5cdGdldFN0YXJ0UHJvamVjdERhdGEoKSB7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKCdzdGFydFByb2plY3REYXRhJykgfHwgJ3t9Jylcblx0fVxuXG5cdHNhdmVTdGFydFByb2plY3REYXRhKGRhdGEpIHtcblx0XHRhcHBTZXR0aW5ncy5zZXRTdHJpbmcoJ3N0YXJ0UHJvamVjdERhdGEnLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdH1cblxuXHRzYXZlVG91clN0YXR1cyhzdGF0dXMpIHtcblx0XHRhcHBTZXR0aW5ncy5zZXRCb29sZWFuKCdpc1RvdXJEb25lJywgc3RhdHVzKVxuXHR9XG5cblx0c2F2ZUN1cnJlbnRVc2VyKHVzZXIpIHtcblx0XHRhcHBTZXR0aW5ncy5zZXRTdHJpbmcoJ2N1cnJlbnRVc2VyJywgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuXHR9XG5cblx0cmVtb3ZlU3RhcnRQcm9qZWN0RGF0YSgpIHtcblx0XHRhcHBTZXR0aW5ncy5yZW1vdmUoJ3N0YXJ0UHJvamVjdERhdGEnKVxuXHR9XG5cblx0cmVtb3ZlVG91clN0YXR1cygpIHtcblx0XHRhcHBTZXR0aW5ncy5yZW1vdmUoJ2lzVG91ckRvbmUnKTtcblx0fVxuXG5cdHJlbW92ZUN1cnJlbnRVc2VyKCkge1xuXHRcdGFwcFNldHRpbmdzLnJlbW92ZSgnY3VycmVudFVzZXInKTtcblx0fVxuXG5cdHJlbW92ZVN0YXJ0UHJvamVjdEN1cnJlbnRQcm9ncmVzcygpIHtcblx0XHRhcHBTZXR0aW5ncy5yZW1vdmUoJ3N0YXJ0UHJvamVjdFByb2dyZXNzJyk7XG5cdH1cblxuXHRyZWdpc3RlclRva2VuKCkgeyAvLyBERVBSRUNBVEVEXG5cdFx0bGV0IGlvc1NldHRpbmdzID0gdGhpcy5fY29uZmlnU2VydmljZS5wdXNoU2V0dGluZ3MoKTtcblxuXHRcdGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG5cdFx0XHRwdXNoUGx1Z2luLnJlZ2lzdGVyKGlvc1NldHRpbmdzLCAodG9rZW4pID0+IHtcblx0XHRcdFx0aWYoaW9zU2V0dGluZ3MuaW50ZXJhY3RpdmVTZXR0aW5ncykge1xuXHRcdFx0XHRcdHB1c2hQbHVnaW4ucmVnaXN0ZXJVc2VyTm90aWZpY2F0aW9uU2V0dGluZ3MoKCkgPT4ge1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSh0b2tlbik7XG5cdFx0XHRcdFx0fSwgKGVycikgPT4ge1xuXHRcdFx0XHRcdFx0cmVqZWN0KCdJbnRlcmFjdGl2ZSBwdXNoIGVycm9yOiAnK2Vycilcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cblx0XHRcdH0sIChlcnIpID0+IHtcblx0XHRcdFx0cmVqZWN0KGVycilcblx0XHRcdH0pXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gcHJvbWlzZTtcblx0fVxuXHRcblx0cmVnaXN0ZXJUb2tlblYyKCkge1xuXHRcdC8vIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0Ly8gXHR0aGlzLmRvUmVnaXN0ZXJGb3JQdXNoTm90aWZpY2F0aW9ucygpLnRoZW4oKCkgPT4ge1xuXHRcdC8vIFx0XHRtZXNzYWdpbmcuZ2V0Q3VycmVudFB1c2hUb2tlbigpXG5cdFx0Ly8gXHRcdFx0LnRoZW4oKHRva2VuKSA9PiByZXNvbHZlKHRva2VuKSlcblx0XHQvLyBcdFx0XHQuY2F0Y2goKGVycikgPT4gcmVqZWN0KGVycikpXG5cdFx0Ly8gXHR9KS5jYXRjaChlcnIgPT4gcmVqZWN0KGVycikpXG5cdFx0Ly8gfSlcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bWVzc2FnaW5nLnJlZ2lzdGVyRm9yUHVzaE5vdGlmaWNhdGlvbnMoe1xuXHRcdFx0XHRvblB1c2hUb2tlblJlY2VpdmVkQ2FsbGJhY2s6ICh0b2tlbjogc3RyaW5nKTogdm9pZCA9PiB7XG5cdFx0XHRcdFx0YWxlcnQoe1xuXHRcdFx0XHRcdFx0dGl0bGU6ICdUT0tFTiEhIScsXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiB0b2tlbixcblx0XHRcdFx0XHRcdG9rQnV0dG9uVGV4dDogXCJPSyEhIVwiXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSxcblx0XHRcdCAgXG5cdFx0XHRcdG9uTWVzc2FnZVJlY2VpdmVkQ2FsbGJhY2s6IChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG5cdFx0XHRcdCAgY29uc29sZS5sb2coXCJQdXNoIG1lc3NhZ2UgcmVjZWl2ZWQ6IFwiICsgbWVzc2FnZS50aXRsZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pLnRoZW4oKCkgPT4gcmVzb2x2ZShcIlJlZ2lzdGVyZWQgZm9yIHB1c2hcIikpO1xuXHRcdH0pXG5cdH1cblxuXHRkb1JlZ2lzdGVyRm9yUHVzaE5vdGlmaWNhdGlvbnMoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG1lc3NhZ2luZy5yZWdpc3RlckZvclB1c2hOb3RpZmljYXRpb25zKHtcblx0XHRcdFx0b25QdXNoVG9rZW5SZWNlaXZlZENhbGxiYWNrOiAodG9rZW46IHN0cmluZyk6IHZvaWQgPT4geyBjb25zb2xlLmxvZyhcInRva2VuIG5vdGlmaWNhdGlvblwiKSB9LFxuXHRcdFx0XHRvbk1lc3NhZ2VSZWNlaXZlZENhbGxiYWNrOiAobWVzc2FnZTogTWVzc2FnZSkgPT4geyBjb25zb2xlLmxvZyhcIm9uTWVzc2FnZVJlY2VpdmVkQ2FsbGJhY2tcIikgfSxcblx0XHRcdFx0c2hvd05vdGlmaWNhdGlvbnM6IHRydWUsXG5cdFx0XHRcdHNob3dOb3RpZmljYXRpb25zV2hlbkluRm9yZWdyb3VuZDogdHJ1ZVxuXHRcdFx0fSkudGhlbigoKSA9PiByZXNvbHZlKHRydWUpKS5jYXRjaChlcnIgPT4gcmVqZWN0KGVycikpO1xuXHRcdH0pXG5cdH1cblxuXHRyZWdpc3RlclVzZXJEZXZpY2UodXNlcklkLCBkZXZpY2VJZCkge1xuXHRcdGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHRcdHVzZXJJZDogdXNlcklkLFxuXHRcdFx0XHRkZXZpY2VJZDogZGV2aWNlSWRcblx0XHRcdH1cblxuXHRcdFx0aHR0cE1vZHVsZS5yZXF1ZXN0KHtcblx0XHRcdFx0dXJsOiBgJHt0aGlzLmJhc2VVcmx9L3VzZXJzL2RldmljZXNgLFxuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0aGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG5cdFx0XHRcdGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG5cdFx0XHR9KS50aGVuKChyZXM6IGFueSkgPT4ge1xuXHRcdFx0XHRyZXNvbHZlKHJlcy5jb250ZW50LnRvSlNPTigpKVxuXHRcdFx0fSkuY2F0Y2goKGVycjogYW55KSA9PiB7XG5cdFx0XHRcdHJlamVjdChlcnIpXG5cdFx0XHR9KVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cblxuXHRhc3luYyBnZXRVc2VyRGF0YSh1c2VySWQ6IG51bWJlcikge1xuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQ8YW55PihgJHt0aGlzLmJhc2VVcmx9L3VzZXJzLyR7dXNlcklkfWAsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cblx0YXN5bmMgY2hlY2tVc2VyVmVyaWZpY2F0aW9uKHVzZXJJZCkge1xuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQ8YW55PihgJHt0aGlzLmJhc2VVcmx9L3VzZXJzLyR7dXNlcklkfS9jaGVja192ZXJpZmljYXRpb25gLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGFzeW5jIGNyZWF0ZVVzZXJTZXR0aW5nKGRhdGEpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxhbnk+KGAke3RoaXMuYmFzZVVybH0vdXNlcnMvc2V0dGluZ3NgLCBkYXRhLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZVVzZXIodXNlcklkLCBkYXRhKSB7XG5cdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLnB1dDxhbnk+KGAke3RoaXMuYmFzZVVybH0vdXNlcnMvJHt1c2VySWR9YCwgZGF0YSwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHRhc3luYyBjaGFuZ2VQYXNzd29yZCh1c2VySWQsIGRhdGEpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucHV0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS91c2Vycy8ke3VzZXJJZH0vY2hhbmdlX3Bhc3N3b3JkYCwgZGF0YSwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHRhc3luYyBnZXRVc2VyU2V0dGluZyh1c2VySWQ6IG51bWJlcikge1xuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQ8YW55PihgJHt0aGlzLmJhc2VVcmx9L3VzZXJzLyR7dXNlcklkfS9zZXR0aW5nc2AsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cblx0YXN5bmMgdXBkYXRlVG91clByb2dyZXNzKHVzZXJJZDogbnVtYmVyLCBkYXRhOiBhbnkpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucHV0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS91c2Vycy8ke3VzZXJJZH0vc2V0dGluZ3MvdXBkYXRlX3RvdXJgLCBkYXRhLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZVVzZXJTZXR0aW5nKHVzZXJTZXR0aW5nSWQsIGRhdGEpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucHV0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS9zZXR0aW5ncy8ke3VzZXJTZXR0aW5nSWR9YCwgZGF0YSwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHRhc3luYyBnZXRVc2VyQ3VycmVudFByb2plY3QodXNlcklkOiBzdHJpbmcpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS91c2Vycy8ke3VzZXJJZH0vcHJvamVjdC9jdXJyZW50YCwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHRhc3luYyBnZXRVc2VyTGF0ZXN0UHJvamVjdCh1c2VySWQ6IG51bWJlcikge1xuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5nZXQ8YW55PihgJHt0aGlzLmJhc2VVcmx9L3VzZXJzLyR7dXNlcklkfS9wcm9qZWN0L2xhdGVzdGAsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cblx0LyogREVQUkVDQVRFRCAoTk9UIFVTRUQpICovXG5cdGFzeW5jIGNyZWF0ZVVzZXJEZXZpY2UoZGF0YSkge1xuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS91c2Vycy9kZXZpY2VzYCwgZGF0YSwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHRhc3luYyB1cGRhdGVVc2VyRGV2aWNlKHVzZXJJZCwgZGV2aWNlVVVJRCkge1xuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wdXQ8YW55PihgJHt0aGlzLmJhc2VVcmx9L3VzZXJzLyR7dXNlcklkfS9kZXZpY2VzLyR7ZGV2aWNlVVVJRH1gLCB7fSwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cdFxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZVVzZXJEZXZpY2VMb2dpblN0YXR1cyh1c2VySWQpIHtcblx0XHQvLyBsZXQgcGx1Z2luID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1pb3MtdXVpZFwiKTtcblx0XHQvLyBsZXQgZGV2aWNlVVVJRCA9IHBsdWdpbi5nZXRVVUlEKCk7XG5cdFx0bGV0IGRldmljZVVVSUQgPSBwbGF0Zm9ybU1vZHVsZS5kZXZpY2UudXVpZDtcblxuXHRcdGxldCBkYXRhID0ge1xuXHRcdFx0ZGV2aWNlT1M6IHBsYXRmb3JtTW9kdWxlLmRldmljZS5vcyxcblx0XHRcdGRldmljZU1vZGVsOiBwbGF0Zm9ybU1vZHVsZS5kZXZpY2UubW9kZWwsXG5cdFx0XHRkZXZpY2VUeXBlOiBwbGF0Zm9ybU1vZHVsZS5kZXZpY2UuZGV2aWNlVHlwZVxuXHRcdH1cblxuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wdXQ8YW55PihgJHt0aGlzLmJhc2VVcmx9L3VzZXJzLyR7dXNlcklkfS9kZXZpY2VzLyR7ZGV2aWNlVVVJRH0vbG9naW5gLCBkYXRhLCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGFzeW5jIHVwZGF0ZVVzZXJEZXZpY2VMb2dvdXRTdGF0dXModXNlcklkKSB7XG5cdFx0Ly8gbGV0IHBsdWdpbiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtaW9zLXV1aWRcIik7XG5cdFx0Ly8gbGV0IGRldmljZVVVSUQgPSBwbHVnaW4uZ2V0VVVJRCgpO1xuXHRcdGxldCBkZXZpY2VVVUlEID0gcGxhdGZvcm1Nb2R1bGUuZGV2aWNlLnV1aWQ7XG5cblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucHV0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS91c2Vycy8ke3VzZXJJZH0vZGV2aWNlcy8ke2RldmljZVVVSUR9L2xvZ291dGAsIHt9LCB0aGlzLmNyZWF0ZUhlYWRlcigpKS50b1Byb21pc2UoKTtcblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGFzeW5jIGNyZWF0ZVVzZXJTaGFyZWRQb3N0KGRhdGEpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAucG9zdDxhbnk+KGAke3RoaXMuYmFzZVVybH0vdXNlcnMvc2hhcmVfcG9zdGAsIGRhdGEsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cblx0YXN5bmMgZ2V0VXNlclNoYXJlZFBvc3QodXNlcklkLCBwb3N0SWQpIHtcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS91c2Vycy8ke3VzZXJJZH0vcG9zdHMvJHtwb3N0SWR9L3NoYXJlc2AsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cblx0YXN5bmMgY3JlYXRlVXNlckxpbmtlZEFjY291bnQoZGF0YSkge1xuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cC5wb3N0PGFueT4oYCR7dGhpcy5iYXNlVXJsfS9saW5rZWRfYWNjb3VudGAsIGRhdGEsIHRoaXMuY3JlYXRlSGVhZGVyKCkpLnRvUHJvbWlzZSgpO1xuXG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cblx0YXN5bmMgZ2V0VXNlckxpbmtlZEFjY291bnQodXNlcklkKSB7XG5cdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwLmdldDxhbnk+KGAke3RoaXMuYmFzZVVybH0vbGlua2VkX2FjY291bnQvJHt1c2VySWR9YCwgdGhpcy5jcmVhdGVIZWFkZXIoKSkudG9Qcm9taXNlKCk7XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuICAgIHByaXZhdGUgY3JlYXRlSGVhZGVyKCkge1xuICAgIFx0bGV0IGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShhcHBTZXR0aW5ncy5nZXRTdHJpbmcoJ2N1cnJlbnRVc2VyJykgfHwgJ3t9Jyk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtjdXJyZW50VXNlci50b2tlbn1gXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHsgaGVhZGVyczogaGVhZGVycyB9O1xuICAgIH1cbn0iXX0=