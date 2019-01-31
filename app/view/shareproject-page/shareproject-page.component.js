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
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var page_1 = require("ui/page");
var dialogs_2 = require("ui/dialogs");
// MODELS
var media_model_1 = require("../../models/media.model");
// SERVICES
var user_service_1 = require("../../services/user.service");
var media_service_1 = require("../../services/media.service");
var facebook_service_1 = require("../../services/facebook.service");
var user_progress_service_1 = require("../../services/user-progress.service");
var component_event_service_1 = require("../../services/component-event.service");
var httpModule = require("http");
var application = require("tns-core-modules/application");
var fileSystemModule = require("tns-core-modules/file-system");
var ShareProjectComponent = /** @class */ (function () {
    function ShareProjectComponent(page, params, _userService, _mediaService, _facebookService, _componentService, _userProgressService) {
        this.page = page;
        this.params = params;
        this._userService = _userService;
        this._mediaService = _mediaService;
        this._facebookService = _facebookService;
        this._componentService = _componentService;
        this._userProgressService = _userProgressService;
        this.userId = 0;
        this.media = new media_model_1.Media();
    }
    ShareProjectComponent.prototype.ngOnInit = function () {
        this.userId = this._userService.getCurrentUserId();
        this.getMedia();
    };
    ShareProjectComponent.prototype.close = function () {
        if (this.params.context.type === 'video') {
            this.destroyVideo();
        }
        this.params.closeCallback({ success: true });
    };
    ShareProjectComponent.prototype.saveVideo = function () {
        this.saveVideoToGallery();
    };
    ShareProjectComponent.prototype.destroyVideo = function () {
        this.videoPlayer.nativeElement.destroy();
    };
    ShareProjectComponent.prototype.saveMedia = function () {
        var _this = this;
        var options = {
            title: "Media Option",
            cancelButtonText: "Cancel",
            actions: ["Save Media"]
        };
        dialogs_2.action(options).then(function (result) {
            if (result !== 'Cancel') {
                if (_this.media.type === 'image') {
                    _this.saveImageToGallery();
                }
                else if (_this.media.type === 'video') {
                    _this.saveVideoToGallery();
                }
            }
        });
    };
    ShareProjectComponent.prototype.saveImageToGallery = function () {
        var _this = this;
        this._componentService.showLoader("Saving...");
        httpModule.getImage(this.media.link).then(function (imgSource) {
            if (application.ios) {
                _this.toIOSGallery(imgSource).then(function (res) {
                    _this._componentService.hideLoader();
                    _this._componentService.showAlert("Success!", "Image successfully saved!");
                }).catch(function (e) {
                    _this._componentService.hideLoader();
                    _this._componentService.showAlert("Ooops!", e.data);
                });
            }
            else {
                _this.toAndroidGallery(imgSource).then(function (res) {
                    _this._componentService.hideLoader();
                    _this._componentService.showAlert("Success!", "Image successfully saved!");
                }).catch(function (e) {
                    _this._componentService.hideLoader();
                    _this._componentService.showAlert("Ooops!", e.data);
                });
            }
        }, function (e) {
            _this._componentService.hideLoader();
        });
    };
    ShareProjectComponent.prototype.saveVideoToGallery = function () {
        var _this = this;
        this._componentService.showLoader("Saving...");
        httpModule.getFile(this.media.link).then(function (resultFile) {
            if (application.ios) {
                _this.saveVideoToIOSGallery(resultFile.path).then(function (res) {
                    _this._componentService.hideLoader();
                    _this._componentService.showAlert("Success!", "Video successfully saved!");
                }).catch(function (e) {
                    _this._componentService.hideLoader();
                    _this._componentService.showAlert("Ooops!", e.data);
                });
            }
            _this.updateUserProgress();
        }, function (e) {
            console.log(e);
            _this._componentService.hideLoader();
        });
    };
    ShareProjectComponent.prototype.saveVideoToIOSGallery = function (path) {
        var successMsg = { success: true, data: "Video successfully saved!" };
        var errMsg = { success: false, data: "Something went wrong. Unable to save video." };
        return new Promise(function (resolve, reject) {
            if (!path) {
                reject(errMsg);
            }
            else {
                UISaveVideoAtPathToSavedPhotosAlbum(path, null, null, null);
                resolve(successMsg);
            }
        });
    };
    ShareProjectComponent.prototype.toAndroidGallery = function (imageSource) {
        var _this = this;
        var successMsg = { success: true, data: "Image successfully saved!" };
        var errMsg = { success: false, data: "Something went wrong. Unable to save image." };
        return new Promise(function (resolve, reject) {
            if (!imageSource) {
                reject(errMsg);
            }
            else {
                var folderPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_PICTURES).toString();
                var fileName = 'img_' + new Date().getTime() + '.jpg';
                var path = fileSystemModule.path.join(folderPath, fileName);
                var exists = fileSystemModule.File.exists(path);
                if (!exists) {
                    var saved = imageSource.saveToFile(path, enums.ImageFormat.jpeg);
                    if (saved) {
                        _this.broadCast(new java.io.File(path));
                        resolve(successMsg);
                    }
                    else {
                        reject(errMsg);
                    }
                }
                else {
                    reject(errMsg);
                }
            }
        });
    };
    ShareProjectComponent.prototype.broadCast = function (imageFile) {
        var mediaScanIntent = new android.content.Intent(android.content.Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
        var contentUri = android.net.Uri.fromFile(imageFile);
        mediaScanIntent.setData(contentUri);
        application.android.foregroundActivity.sendBroadcast(mediaScanIntent);
    };
    ShareProjectComponent.prototype.toIOSGallery = function (imgSource) {
        var successMsg = { success: true, data: "Image successfully saved!" };
        var errMsg = { success: false, data: "Something went wrong. Unable to save image." };
        return new Promise(function (resolve, reject) {
            if (!imgSource) {
                reject(errMsg);
            }
            else {
                var CompletionTarget = NSObject.extend({
                    "thisImage:hasBeenSavedInPhotoAlbumWithError:usingContextInfo:": function (image, error, context) {
                        if (error) {
                            reject(errMsg);
                        }
                    }
                }, {
                    exposedMethods: {
                        "thisImage:hasBeenSavedInPhotoAlbumWithError:usingContextInfo:": {
                            returns: interop.types.void,
                            params: [UIImage, NSError, interop.Pointer]
                        }
                    }
                });
                var completionTarget = CompletionTarget.new();
                UIImageWriteToSavedPhotosAlbum(imgSource.ios, completionTarget, "thisImage:hasBeenSavedInPhotoAlbumWithError:usingContextInfo:", null);
                resolve(successMsg);
            }
        });
    };
    ShareProjectComponent.prototype.getMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._mediaService.getMedia(this.params.context.mediaResourceId)];
                    case 1:
                        res = _a.sent();
                        if (res.data) {
                            this.media.deserialize(res.data);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShareProjectComponent.prototype.updateUserProgress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._userProgressService.updateProgress(this.userId, { downloadVideos: 'done' })];
                    case 1:
                        res = _a.sent();
                        console.log(res);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild("videoPlayer"),
        __metadata("design:type", core_1.ElementRef)
    ], ShareProjectComponent.prototype, "videoPlayer", void 0);
    ShareProjectComponent = __decorate([
        core_1.Component({
            selector: "shareproject-page",
            moduleId: module.id,
            templateUrl: "./shareproject-page.component.html",
            styleUrls: ['./shareproject-page.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            dialogs_1.ModalDialogParams,
            user_service_1.UserService,
            media_service_1.MediaService,
            facebook_service_1.FacebookService,
            component_event_service_1.ComponentEventService,
            user_progress_service_1.UserProgressService])
    ], ShareProjectComponent);
    return ShareProjectComponent;
}());
exports.ShareProjectComponent = ShareProjectComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVwcm9qZWN0LXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhcmVwcm9qZWN0LXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBeUU7QUFHekUsbUVBQTRFO0FBRTVFLGdDQUErQjtBQUMvQixzQ0FBb0M7QUFFcEMsU0FBUztBQUNULHdEQUFpRDtBQUVqRCxXQUFXO0FBQ1gsNERBQTBEO0FBQzFELDhEQUE0RDtBQUM1RCxvRUFBa0U7QUFDbEUsOEVBQTJFO0FBQzNFLGtGQUErRTtBQUkvRSxpQ0FBbUM7QUFDbkMsMERBQTREO0FBRTVELCtEQUFpRTtBQWdCakU7SUFRSSwrQkFDWSxJQUFVLEVBQ1YsTUFBeUIsRUFDekIsWUFBeUIsRUFDekIsYUFBMkIsRUFDM0IsZ0JBQWlDLEVBQ2pDLGlCQUF3QyxFQUN4QyxvQkFBeUM7UUFOekMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3pCLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQzNCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBWHJELFdBQU0sR0FBVyxDQUFDLENBQUM7UUFhZixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksbUJBQUssRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFbkQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxxQ0FBSyxHQUFMO1FBQ0ksSUFBRyxJ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Ozs7Ozs7O3dCQUVrQixxQkFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBQTs7d0JBQTdGLEdBQUcsR0FBRyxTQUF1Rjt3QkFFakcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTs7Ozt3QkFFaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQTs7Ozs7O0tBRXJCO0lBM055QjtRQUF6QixnQkFBUyxDQUFDLGFBQWEsQ0FBQztrQ0FBYyxpQkFBVTs4REFBQztJQUZ6QyxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7U0FDbkQsQ0FBQzt5Q0FVb0IsV0FBSTtZQUNGLDJCQUFpQjtZQUNYLDBCQUFXO1lBQ1YsNEJBQVk7WUFDVCxrQ0FBZTtZQUNkLCtDQUFxQjtZQUNsQiwyQ0FBbUI7T0FmNUMscUJBQXFCLENBOE5qQztJQUFELDRCQUFDO0NBQUEsQUE5TkQsSUE4TkM7QUE5Tlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFZpZGVvIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXZpZGVvcGxheWVyJztcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcblxuLy8gTU9ERUxTXG5pbXBvcnQgeyBNZWRpYSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvbWVkaWEubW9kZWxcIjtcblxuLy8gU0VSVklDRVNcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgTWVkaWFTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL21lZGlhLnNlcnZpY2VcIjtcbmltcG9ydCB7IEZhY2Vib29rU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9mYWNlYm9vay5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VyUHJvZ3Jlc3NTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXItcHJvZ3Jlc3Muc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50RXZlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbXBvbmVudC1ldmVudC5zZXJ2aWNlXCI7XG5cbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIGxvZGFzaCBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgKiBhcyBodHRwTW9kdWxlIGZyb20gXCJodHRwXCI7XG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2VNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgKiBhcyBmaWxlU3lzdGVtTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XG5cbmRlY2xhcmUgdmFyIE5TT2JqZWN0OiBhbnk7XG5kZWNsYXJlIHZhciBpbnRlcm9wOiBhbnk7XG5kZWNsYXJlIHZhciBVSUltYWdlOiBhbnk7XG5kZWNsYXJlIHZhciBOU0Vycm9yOiBhbnk7XG5kZWNsYXJlIHZhciBVSUltYWdlV3JpdGVUb1NhdmVkUGhvdG9zQWxidW06IGFueTtcbmRlY2xhcmUgdmFyIFVJU2F2ZVZpZGVvQXRQYXRoVG9TYXZlZFBob3Rvc0FsYnVtOiBhbnk7XG5kZWNsYXJlIHZhciBlbnVtczogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzaGFyZXByb2plY3QtcGFnZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zaGFyZXByb2plY3QtcGFnZS5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogWycuL3NoYXJlcHJvamVjdC1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVQcm9qZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBWaWV3Q2hpbGQoXCJ2aWRlb1BsYXllclwiKSB2aWRlb1BsYXllcjogRWxlbWVudFJlZjtcblxuICAgIHVzZXJJZDogbnVtYmVyID0gMDtcblxuICAgIG1lZGlhOiBNZWRpYTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcyxcbiAgICAgICAgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9tZWRpYVNlcnZpY2U6IE1lZGlhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfZmFjZWJvb2tTZXJ2aWNlOiBGYWNlYm9va1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfdXNlclByb2dyZXNzU2VydmljZTogVXNlclByb2dyZXNzU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLm1lZGlhID0gbmV3IE1lZGlhKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKXtcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLl91c2VyU2VydmljZS5nZXRDdXJyZW50VXNlcklkKCk7XG5cbiAgICAgICAgdGhpcy5nZXRNZWRpYSgpO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICBpZih0aGlzLnBhcmFtcy5jb250ZXh0LnR5cGUgPT09ICd2aWRlbycpe1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95VmlkZW8oKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgc2F2ZVZpZGVvKCkge1xuICAgICAgICB0aGlzLnNhdmVWaWRlb1RvR2FsbGVyeSgpO1xuICAgIH1cblxuICAgIGRlc3Ryb3lWaWRlbygpIHtcbiAgICAgICAgdGhpcy52aWRlb1BsYXllci5uYXRpdmVFbGVtZW50LmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBzYXZlTWVkaWEoKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGl0bGU6IFwiTWVkaWEgT3B0aW9uXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiLFxuICAgICAgICAgICAgYWN0aW9uczogW1wiU2F2ZSBNZWRpYVwiXVxuICAgICAgICB9O1xuXG4gICAgICAgIGFjdGlvbihvcHRpb25zKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3VsdCAhPT0gJ0NhbmNlbCcpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLm1lZGlhLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlSW1hZ2VUb0dhbGxlcnkoKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLm1lZGlhLnR5cGUgPT09ICd2aWRlbycpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVWaWRlb1RvR2FsbGVyeSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2F2ZUltYWdlVG9HYWxsZXJ5KCkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoXCJTYXZpbmcuLi5cIik7XG5cbiAgICAgICAgaHR0cE1vZHVsZS5nZXRJbWFnZSh0aGlzLm1lZGlhLmxpbmspLnRoZW4oKGltZ1NvdXJjZSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihhcHBsaWNhdGlvbi5pb3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvSU9TR2FsbGVyeShpbWdTb3VyY2UpLnRoZW4oKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydChcIlN1Y2Nlc3MhXCIsIFwiSW1hZ2Ugc3VjY2Vzc2Z1bGx5IHNhdmVkIVwiKVxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoXCJPb29wcyFcIiwgZS5kYXRhKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b0FuZHJvaWRHYWxsZXJ5KGltZ1NvdXJjZSkudGhlbigocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KFwiU3VjY2VzcyFcIiwgXCJJbWFnZSBzdWNjZXNzZnVsbHkgc2F2ZWQhXCIpXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydChcIk9vb3BzIVwiLCBlLmRhdGEpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNhdmVWaWRlb1RvR2FsbGVyeSgpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKFwiU2F2aW5nLi4uXCIpO1xuXG4gICAgICAgIGh0dHBNb2R1bGUuZ2V0RmlsZSh0aGlzLm1lZGlhLmxpbmspLnRoZW4oKHJlc3VsdEZpbGUpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoYXBwbGljYXRpb24uaW9zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlVmlkZW9Ub0lPU0dhbGxlcnkocmVzdWx0RmlsZS5wYXRoKS50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93QWxlcnQoXCJTdWNjZXNzIVwiLCBcIlZpZGVvIHN1Y2Nlc3NmdWxseSBzYXZlZCFcIilcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KFwiT29vcHMhXCIsIGUuZGF0YSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXJQcm9ncmVzcygpO1xuICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzYXZlVmlkZW9Ub0lPU0dhbGxlcnkocGF0aCkge1xuICAgICAgICBsZXQgc3VjY2Vzc01zZyA9IHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogXCJWaWRlbyBzdWNjZXNzZnVsbHkgc2F2ZWQhXCIgfVxuICAgICAgICBsZXQgZXJyTXNnID0geyBzdWNjZXNzOiBmYWxzZSwgZGF0YTogXCJTb21ldGhpbmcgd2VudCB3cm9uZy4gVW5hYmxlIHRvIHNhdmUgdmlkZW8uXCIgfTsgXG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmKCFwYXRoKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVyck1zZyk7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgVUlTYXZlVmlkZW9BdFBhdGhUb1NhdmVkUGhvdG9zQWxidW0oXG4gICAgICAgICAgICAgICAgICAgIHBhdGgsIFxuICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICBudWxsKTtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzc01zZylcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRvQW5kcm9pZEdhbGxlcnkoaW1hZ2VTb3VyY2UpIHtcbiAgICAgICAgbGV0IHN1Y2Nlc3NNc2cgPSB7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IFwiSW1hZ2Ugc3VjY2Vzc2Z1bGx5IHNhdmVkIVwiIH1cbiAgICAgICAgbGV0IGVyck1zZyA9IHsgc3VjY2VzczogZmFsc2UsIGRhdGE6IFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuIFVuYWJsZSB0byBzYXZlIGltYWdlLlwiIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmKCFpbWFnZVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJNc2cpXG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvbGRlclBhdGggPSBhbmRyb2lkLm9zLkVudmlyb25tZW50LmdldEV4dGVybmFsU3RvcmFnZVB1YmxpY0RpcmVjdG9yeShhbmRyb2lkLm9zLkVudmlyb25tZW50LkRJUkVDVE9SWV9QSUNUVVJFUykudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZU5hbWUgPSAnaW1nXycgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKSArICcuanBnJztcbiAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IGZpbGVTeXN0ZW1Nb2R1bGUucGF0aC5qb2luKGZvbGRlclBhdGgsIGZpbGVOYW1lKTtcbiAgICAgICAgICAgICAgICBsZXQgZXhpc3RzID0gZmlsZVN5c3RlbU1vZHVsZS5GaWxlLmV4aXN0cyhwYXRoKTtcblxuICAgICAgICAgICAgICAgIGlmKCFleGlzdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNhdmVkID0gaW1hZ2VTb3VyY2Uuc2F2ZVRvRmlsZShwYXRoLCBlbnVtcy5JbWFnZUZvcm1hdC5qcGVnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2F2ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnJvYWRDYXN0KG5ldyBqYXZhLmlvLkZpbGUocGF0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzTXNnKVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJNc2cpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJNc2cpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGJyb2FkQ2FzdChpbWFnZUZpbGUpIHtcbiAgICAgICAgbGV0IG1lZGlhU2NhbkludGVudCA9IG5ldyBhbmRyb2lkLmNvbnRlbnQuSW50ZW50KGFuZHJvaWQuY29udGVudC5JbnRlbnQuQUNUSU9OX01FRElBX1NDQU5ORVJfU0NBTl9GSUxFKTtcbiAgICAgICAgbGV0IGNvbnRlbnRVcmkgPSBhbmRyb2lkLm5ldC5VcmkuZnJvbUZpbGUoaW1hZ2VGaWxlKTtcbiAgICAgICAgbWVkaWFTY2FuSW50ZW50LnNldERhdGEoY29udGVudFVyaSk7XG4gICAgICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQuZm9yZWdyb3VuZEFjdGl2aXR5LnNlbmRCcm9hZGNhc3QobWVkaWFTY2FuSW50ZW50KTtcbiAgICB9XG5cbiAgICB0b0lPU0dhbGxlcnkoaW1nU291cmNlKSB7XG4gICAgICAgIGxldCBzdWNjZXNzTXNnID0geyBzdWNjZXNzOiB0cnVlLCBkYXRhOiBcIkltYWdlIHN1Y2Nlc3NmdWxseSBzYXZlZCFcIiB9XG4gICAgICAgIGxldCBlcnJNc2cgPSB7IHN1Y2Nlc3M6IGZhbHNlLCBkYXRhOiBcIlNvbWV0aGluZyB3ZW50IHdyb25nLiBVbmFibGUgdG8gc2F2ZSBpbWFnZS5cIiB9O1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZighaW1nU291cmNlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVyck1zZylcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgQ29tcGxldGlvblRhcmdldCA9IE5TT2JqZWN0LmV4dGVuZCh7XG4gICAgICAgICAgICAgICAgICAgIFwidGhpc0ltYWdlOmhhc0JlZW5TYXZlZEluUGhvdG9BbGJ1bVdpdGhFcnJvcjp1c2luZ0NvbnRleHRJbmZvOlwiOiBmdW5jdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlLCBlcnJvciwgY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVyck1zZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGV4cG9zZWRNZXRob2RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRoaXNJbWFnZTpoYXNCZWVuU2F2ZWRJblBob3RvQWxidW1XaXRoRXJyb3I6dXNpbmdDb250ZXh0SW5mbzpcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybnM6IGludGVyb3AudHlwZXMudm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IFtVSUltYWdlLCBOU0Vycm9yLCBpbnRlcm9wLlBvaW50ZXJdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGxldCBjb21wbGV0aW9uVGFyZ2V0ID0gQ29tcGxldGlvblRhcmdldC5uZXcoKTtcblxuICAgICAgICAgICAgICAgIFVJSW1hZ2VXcml0ZVRvU2F2ZWRQaG90b3NBbGJ1bShcbiAgICAgICAgICAgICAgICAgICAgaW1nU291cmNlLmlvcywgXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRpb25UYXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIFwidGhpc0ltYWdlOmhhc0JlZW5TYXZlZEluUGhvdG9BbGJ1bVdpdGhFcnJvcjp1c2luZ0NvbnRleHRJbmZvOlwiLFxuICAgICAgICAgICAgICAgICAgICBudWxsKTtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzc01zZylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyBnZXRNZWRpYSgpIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX21lZGlhU2VydmljZS5nZXRNZWRpYSh0aGlzLnBhcmFtcy5jb250ZXh0Lm1lZGlhUmVzb3VyY2VJZCk7XG4gICAgICAgICAgICBpZihyZXMuZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVkaWEuZGVzZXJpYWxpemUocmVzLmRhdGEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgdXBkYXRlVXNlclByb2dyZXNzKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3VzZXJQcm9ncmVzc1NlcnZpY2UudXBkYXRlUHJvZ3Jlc3ModGhpcy51c2VySWQsIHsgZG93bmxvYWRWaWRlb3M6ICdkb25lJyB9KTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIl19