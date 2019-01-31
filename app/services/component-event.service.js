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
var nativescript_loading_indicator_1 = require("nativescript-loading-indicator");
var router_1 = require("nativescript-angular/router");
var nativescript_camera_1 = require("nativescript-camera");
var nativescript_feedback_1 = require("nativescript-feedback");
var color_1 = require("tns-core-modules/color");
var nativescript_fancyalert_1 = require("nativescript-fancyalert");
var nativescript_imagecropper_1 = require("nativescript-imagecropper");
// OTHERS
var moment = require("moment");
var httpModule = require("http");
var dialogs = require("ui/dialogs");
var fs = require("tns-core-modules/file-system");
var appSettings = require("application-settings");
var bghttp = require("nativescript-background-http");
var imagepicker = require("nativescript-imagepicker");
var imageSource = require("tns-core-modules/image-source");
var pushPlugin = require("nativescript-push-notifications");
var connectivityModule = require("tns-core-modules/connectivity");
var nativescript_local_notifications_1 = require("nativescript-local-notifications");
// SERVICES
var user_service_1 = require("./user.service");
var config_service_1 = require("./config.service");
var ComponentEventService = /** @class */ (function () {
    function ComponentEventService(_userService, _configService, _routerExtensions) {
        this._userService = _userService;
        this._configService = _configService;
        this._routerExtensions = _routerExtensions;
        this.titleBar = new core_1.EventEmitter();
        this.hasNotif = new core_1.EventEmitter();
        this.notification = new core_1.EventEmitter();
        this.searchQuery = new core_1.EventEmitter();
        this.isTourDone = new core_1.EventEmitter();
        this.isProjectDone = new core_1.EventEmitter();
        this.isUserRemoved = new core_1.EventEmitter();
        this.selectedStudent = new core_1.EventEmitter();
        this.feedback = new nativescript_feedback_1.Feedback();
        this.imageCropper = new nativescript_imagecropper_1.ImageCropper();
        this.loader = new nativescript_loading_indicator_1.LoadingIndicator();
        this.imageCropperOpt = { width: 400, height: 400, keepAspectRatio: true, lockSquare: true };
    }
    /*
    * NOTIFICATIONS
    */
    ComponentEventService.prototype.localNotifCallBack = function () {
        nativescript_local_notifications_1.LocalNotifications.addOnMessageReceivedCallback(function (notificationData) {
            console.log("SNAUROT");
            console.log(notificationData);
        }).then(function () { return console.log("Listener added!!!"); });
    };
    ComponentEventService.prototype.hasScheduledNotif = function (projectId) {
        return new Promise(function (resolve) {
            nativescript_local_notifications_1.LocalNotifications.getScheduledIds().then(function (ids) {
                if (ids.length > 0) {
                    var notifId = ids[0];
                    var notifProjectId = notifId.toString().split('.');
                    if (projectId == notifProjectId) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    ComponentEventService.prototype.removeAllLocalNotifications = function () {
        nativescript_local_notifications_1.LocalNotifications.cancelAll();
    };
    ComponentEventService.prototype.scheduleNotification = function (data) {
        console.log("Schedule notif!!");
        console.log("PROJECT ID: " + data.projectId);
        console.log("DATE START: " + data.dateStart);
        console.log("DATE END: " + data.dateEnd);
        var dateStart = new Date(data.dateStart);
        var dateEnd = new Date(data.dateEnd);
        var before14days = new Date(dateStart.getTime() - ((14 * 24 * 60 * 60 * 1000))), before7days = new Date(dateStart.getTime() - ((7 * 24 * 60 * 60 * 1000))), before2days = new Date(dateStart.getTime() - ((2 * 24 * 60 * 60 * 1000))), after3days = new Date(dateStart.getTime() + ((3 * 24 * 60 * 60 * 1000))), after7days = new Date(dateEnd.getTime() - ((4 * 24 * 60 * 60 * 1000))), after10days = new Date(dateEnd.getTime() - ((1 * 24 * 60 * 60 * 1000))), projectDone = new Date(dateEnd.getTime() + ((1 * 24 * 60 * 60 * 1000)));
        nativescript_local_notifications_1.LocalNotifications.schedule([
            {
                id: parseFloat(data.projectId + ".1001"),
                title: "100 Seconds from now!",
                body: "Make sure to order your Yuda Bands to start your sales!",
                at: new Date(new Date().getTime() + (10 * 1000)),
                forceShowWhenInForeground: true
            }
            // {
            // 	id: parseFloat(`${data.projectId}.1001`),
            // 	title: "Band Ordering Deadline",
            // 	body: "Make sure to order your Yuda Bands to start your sales!",
            // 	badge: 1,
            // 	at: before14days // 10 seconds from now
            // },
            // {
            // 	id: parseFloat(`${data.projectId}.1002`),
            // 	title: "Student selection deadline",
            // 	body: "Hello! don't forget to select a student to sponsor!",
            // 	badge: 1,
            // 	at: new Date(before14days.getTime() + (1800 * 1000)) // 30 seconds from now
            // },
            // {
            // 	id: parseFloat(`${data.projectId}.1003`),
            // 	title: "Free shirt PROMO!",
            // 	body: "FREE SHIRT SHIPPING ENDS TODAY! Plus there are other deadlines today, open the app and make sure you've completed all of your steps",
            // 	badge: 1,
            // 	at: new Date(before14days.setHours(11)) // 60 seconds from now
            // },
            // {
            // 	id: parseFloat(`${data.projectId}.1004`),
            // 	title: "Shirt Ordering Deadline",
            // 	body: "Hello leader! today is the deadline to order a shirt!",
            // 	badge: 1,
            // 	at: before7days // 90 seconds from now
            // },
            // {
            // 	id: parseFloat(`${data.projectId}.1005`),
            // 	title: "ADVERTISING WEEK!",
            // 	body: "Open the app and go to resources tab to learn more!",
            // 	badge: 1,
            // 	at: new Date(before7days.setHours(11)) // 100 seconds from now
            // },
            // {
            // 	id: parseFloat(`${data.projectId}.1006`),
            // 	title: "Yuda PROMO!",
            // 	body: "Free HOODIE? 300 bands sold = 3 awesome colorful hoodies! Ask your Project Leader about the details",
            // 	badge: 1,
            // 	at: before2days // 120 seconds from now
            // },
            // {
            // 	id: parseFloat(`${data.projectId}.1007`),
            // 	title: "FIRST DAY!",
            // 	body: "Today is your first day of sales! Make sure you have a picture of your student at the sales table!",
            // 	badge: 1,
            // 	at: dateStart // 140 seconds from now
            // },
            // {
            // 	id: parseFloat(`${data.projectId}.1008`),
            // 	title: "NEED MORE BANDS?",
            // 	body: "Count your bands today so you can decide if you need to order more.",
            // 	badge: 1,
            // 	at: after3days // 160 seconds from now
            // },
            // {
            // 	id: parseFloat(`${data.projectId}.1009`),
            // 	title: "HALFWAY THERE!",
            // 	body: "Blast out some more social posts to remind everyone to get their band before Friday.",
            // 	badge: 1,
            // 	at: after7days // 180 seconds from now
            // },
            // {
            // 	id: parseFloat(`${data.projectId}.1010`),
            // 	title: "MEMBER REMINDER",
            // 	body: "Remind your volunteers to bring all $$ and leftover bands back to you by Friday.",
            // 	badge: 1,
            // 	at: after10days // 200 seconds from now
            // },
            // {
            // 	id: parseFloat(`${data.projectId}.1011`),
            // 	title: "ONE MORE DAY!",
            // 	body: "Make sure to finalize everything for tomorrow.",
            // 	badge: 1,
            // 	at: dateEnd // 200 seconds from now
            // },
            // {
            // 	id: parseFloat(`${data.projectId}.1012`),
            // 	title: "PROJECT COMPLETED!",
            // 	body: "Your project is officially over! Congratulations, we hope it was a success. Open your project to report your numbers.",
            // 	badge: 1,
            // 	at: projectDone // 250 seconds from now
            // }
        ]).then(function () { return console.log("successfully scheduled notifs"); }, function (error) { return console.log("scheduling error: " + error); });
    };
    /*
    * END OF NOTIFICATIONS
    */
    /*
    * LISTENERS
    */
    ComponentEventService.prototype.receivedNotification = function (data) {
        this.notification.emit(data);
    };
    ComponentEventService.prototype.hasNotification = function (hasNotif) {
        this.hasNotif.emit(hasNotif);
    };
    ComponentEventService.prototype.titleBarChanged = function (name) {
        this.titleBar.emit(name);
    };
    ComponentEventService.prototype.searchBarChanged = function (searchQuery) {
        this.searchQuery.emit(searchQuery);
    };
    ComponentEventService.prototype.tourChanged = function (isTourDone) {
        this.isTourDone.emit(isTourDone);
    };
    ComponentEventService.prototype.projectChanged = function (isProjectDone) {
        this.isProjectDone.emit(isProjectDone);
    };
    ComponentEventService.prototype.userRemoval = function (isUserRemoved) {
        this.isUserRemoved.emit(isUserRemoved);
    };
    ComponentEventService.prototype.selectStudent = function (data) {
        this.selectedStudent.emit(data);
    };
    /*
    * END OF LISTENERS
    */
    ComponentEventService.prototype.getYoutubeId = function (url) {
        var id = '';
        url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== undefined) {
            id = url[2].split(/[^0-9a-z_\-]/i);
            id = id[0];
        }
        else {
            id = url;
        }
        return id;
    };
    ComponentEventService.prototype.setModalVcRef = function (vcRef) {
        this.vcRef = vcRef;
    };
    ComponentEventService.prototype.getModalOptions = function (context, hasTransition, fullscreen, animated) {
        if (hasTransition === void 0) { hasTransition = true; }
        if (fullscreen === void 0) { fullscreen = true; }
        if (animated === void 0) { animated = true; }
        var opt = {
            context: context,
            fullscreen: fullscreen,
            viewContainerRef: this.vcRef,
            animated: animated,
            transition: {
                name: "slideTop",
                duration: 200,
                curve: "ease"
            }
        };
        if (!hasTransition)
            delete opt.transition;
        return opt;
    };
    ComponentEventService.prototype.getRouteOptions = function () {
        return {
            animated: true,
            clearHistory: false,
            transition: {
                name: 'slideLeft',
                duration: 0,
                curve: 'ease'
            },
            queryParams: {}
        };
    };
    ComponentEventService.prototype.checkIfLinkIsValid = function (url) {
        httpModule.getFile(url)
            .then(function (resultFile) {
            console.log(resultFile);
        }, function (e) {
            console.log("ERROR:::");
            console.log(e);
        });
    };
    ComponentEventService.prototype.hasInternetConnection = function () {
        var connType = connectivityModule.getConnectionType();
        var none = connectivityModule.connectionType.none;
        return (connType === none) ? false : true;
    };
    ComponentEventService.prototype.objIsEmpty = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    };
    /*
    * ALERTS
    */
    ComponentEventService.prototype.showAlert = function (title, message) {
        dialogs.alert({
            title: title,
            message: message,
            okButtonText: 'OK'
        }).then(function () { });
    };
    ComponentEventService.prototype.showPhoneAlert = function () {
        return new Promise(function (resolve, reject) {
            dialogs.action({
                message: 'Options',
                cancelButtonText: 'Cancel',
                actions: ['Call', 'Text']
            }).then(function (result) {
                resolve(result);
            });
        });
    };
    ComponentEventService.prototype.showItemConfirmationAlert = function () {
        return new Promise(function (resolve, reject) {
            dialogs.alert({
                title: 'Success!',
                message: 'Number of Bands confirmed. You can now start with your project. Goodluck!',
                okButtonText: 'Go to project'
            }).then(function () {
                resolve(true);
            });
        });
    };
    ComponentEventService.prototype.showUserRemovalAlert = function () {
        return new Promise(function (resolve, reject) {
            dialogs.alert({
                title: 'Ooops!',
                message: 'Your account has been removed by the project manager. You will be redirected to the home page.',
                okButtonText: 'OK'
            }).then(function () {
                resolve(true);
            });
        });
    };
    ComponentEventService.prototype.showAlertStartProject = function () {
        var _this = this;
        var cachedData = this._userService.getStartProjectData();
        return new Promise(function (resolve, reject) {
            var noCachedMsg = 'You don\'t have a project. Why not create one?';
            var hasCachedMsg = 'It looks like you haven\'t finished the sign up process. Would you like to complete that now?';
            dialogs.confirm({
                title: 'Ooops!',
                message: (_this.objIsEmpty(cachedData)) ? noCachedMsg : hasCachedMsg,
                okButtonText: (_this.objIsEmpty(cachedData)) ? 'Create' : 'Continue',
                cancelButtonText: 'Cancel',
            }).then(function (result) {
                if (result) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
            });
        });
    };
    ComponentEventService.prototype.showRefreshAlert = function () {
        return new Promise(function (resolve, reject) {
            dialogs.alert({
                title: 'Ooops!',
                message: 'Unable to get your skype schedule. You can try refreshing it.',
                okButtonText: 'Refresh'
            }).then(function () {
                resolve(true);
            });
        });
    };
    ComponentEventService.prototype.showAnauthorizedAlert = function (route) {
        var _this = this;
        dialogs.alert({
            title: 'Session Expired',
            message: 'Please re-login to renew your session',
            okButtonText: 'OK'
        }).then(function () {
            _this.updateUserDeviceLogoutStatus();
        });
    };
    ComponentEventService.prototype.showBandsConfirmationAlert = function (totalBands, dateStart) {
        return new Promise(function (resolve, reject) {
            var date = new Date(dateStart);
            date.setDate(date.getDate() - 12);
            var dateStr = moment(date).format('ll');
            dialogs.alert({
                title: 'Confirm',
                message: "You are about to order " + totalBands + " bands for your school which will be shipped on " + dateStr + ".",
                okButtonText: 'OK'
            }).then(function () {
                resolve(true);
            });
        });
    };
    /*
    * END OF ALERTS
    */
    ComponentEventService.prototype.saveProjectManager = function (data) {
        appSettings.setString("project-manager", JSON.stringify(data));
    };
    ComponentEventService.prototype.getProjectManager = function () {
        var data = appSettings.getString("project-manager");
        return (data) ? JSON.parse(data) : {};
    };
    ComponentEventService.prototype.removeProjectManager = function () {
        appSettings.remove("project-manager");
    };
    ComponentEventService.prototype.saveSelectedStudent = function (data) {
        appSettings.setString("selected-student", JSON.stringify(data));
    };
    ComponentEventService.prototype.getSelectedStudent = function () {
        var data = appSettings.getString("selected-student");
        return (data) ? JSON.parse(data) : {};
    };
    ComponentEventService.prototype.removeSelectedStudent = function () {
        appSettings.remove("selected-student");
    };
    ComponentEventService.prototype.unregisterToken = function () {
        pushPlugin.unregister(function (result) { }, function (err) { console.log(err); }, this._configService.pushSettings());
    };
    ComponentEventService.prototype.showFancyAlertInfo = function (title, message) {
        nativescript_fancyalert_1.TNSFancyAlert.showInfo(title, message, 'Ok');
    };
    ComponentEventService.prototype.validateEmail = function (email) {
        var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        var valid = emailRegEx.test(email);
        return valid;
    };
    ComponentEventService.prototype.validatePhoneNumber = function (number) {
        var phoneRegEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return phoneRegEx.test(number);
    };
    ComponentEventService.prototype.showLoader = function (message) {
        var options = {
            message: message,
            progress: 0.65,
            android: {},
            ios: {}
        };
        this.loader.show(options);
    };
    ComponentEventService.prototype.hideLoader = function () {
        this.loader.hide();
    };
    ComponentEventService.prototype.showSuccessFeedback = function (title, message) {
        this.feedback.success({
            title: title,
            message: message,
            duration: 3000,
            backgroundColor: new color_1.Color("#00a9ec"),
            onTap: function () { console.log("showSuccess tapped"); }
        });
    };
    ComponentEventService.prototype.showErrorFeedback = function (title, message) {
        this.feedback.show({
            title: title,
            message: message,
            duration: 2000,
            position: nativescript_feedback_1.FeedbackPosition.Bottom,
            type: nativescript_feedback_1.FeedbackType.Error,
            onTap: function () { console.log("showErrorBottom tapped"); }
        });
    };
    ComponentEventService.prototype.changeImage = function (height, width) {
        var _this = this;
        height = (height) ? height : 100;
        width = (width) ? width : 100;
        var promise = new Promise(function (resolve, reject) {
            dialogs.action({
                cancelButtonText: "Cancel",
                actions: ["Choose from photos", "Open Camera"]
            }).then(function (result) {
                if (result == 'Choose from photos') {
                    _this.showGallery(height, width)
                        .then(function (res) {
                        resolve(res);
                    })
                        .catch(function (err) {
                        reject(err);
                    });
                }
                else if (result == 'Open Camera') {
                    _this.showCamera(height, width)
                        .then(function (res) {
                        resolve(res);
                    })
                        .catch(function (err) {
                        reject(err);
                    });
                }
            });
        });
        return promise;
    };
    ComponentEventService.prototype.showCamera = function (height, width) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            nativescript_camera_1.requestPermissions()
                .then(function () {
                nativescript_camera_1.takePicture({ width: width, height: height, keepAspectRatio: true, saveToGallery: false })
                    .then(function (imageAsset) {
                    _this.showCropper(imageAsset)
                        .then(function (res) {
                        resolve(res);
                    }).catch(function (err) {
                        reject(err);
                    });
                }, function (err) {
                    reject(err);
                });
            }, function () {
                reject('Permission rejected');
            });
        });
        return promise;
    };
    ComponentEventService.prototype.showGallery = function (height, width) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var context = imagepicker.create({
                mode: "single"
            });
            context
                .authorize()
                .then(function () {
                return context.present();
            })
                .then(function (selection) {
                selection[0].options.width = width;
                selection[0].options.height = height;
                var imageAsset = selection[0];
                _this.showCropper(imageAsset)
                    .then(function (res) {
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    ComponentEventService.prototype.showCropper = function (imageAsset) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var source = new imageSource.ImageSource();
            source.fromAsset(imageAsset).then(function (src) {
                _this.imageCropper
                    .show(src, _this.imageCropperOpt)
                    .then(function (args) {
                    if (args.image !== null) {
                        resolve(args.image);
                    }
                    else {
                        reject("crop error");
                    }
                })
                    .catch(function (err) {
                    reject(err);
                });
            });
        });
    };
    ComponentEventService.prototype.decodeUTF8 = function (str) {
        try {
            return decodeURIComponent(escape(str));
        }
        catch (e) {
            return str;
        }
    };
    ComponentEventService.prototype.isImageUrlCloudinary = function (imageUrl) {
        var imgArr = imageUrl.trim().split('/');
        return imgArr[2] === 'res.cloudinary.com';
    };
    ComponentEventService.prototype.getImageCover = function (imageUrl) {
        if (this.isImageUrlCloudinary(imageUrl)) {
            var imageUrlArr = imageUrl.split('/');
            var imageName = imageUrlArr[imageUrlArr.length - 1];
            var cloudinaryBaseUrl = 'https://res.cloudinary.com/dbi1b3kf0/image/upload';
            return cloudinaryBaseUrl + "/w_505,h_460,c_fill/v1/yudabands/" + imageName;
        }
        else {
            return imageUrl;
        }
    };
    ComponentEventService.prototype.getImageFeed = function (imageUrl) {
        if (this.isImageUrlCloudinary(imageUrl)) {
            var imageUrlArr = imageUrl.split('/');
            var imageName = imageUrlArr[imageUrlArr.length - 1];
            var cloudinaryBaseUrl = 'https://res.cloudinary.com/dbi1b3kf0/image/upload';
            // return `${cloudinaryBaseUrl}/w_400,h_250,c_pad,b_black,c_fill,q_50/v1/yudabands/${imageName}`;
            return cloudinaryBaseUrl + "/w_700,c_fill,q_50/v1/yudabands/" + imageName;
            // return `${cloudinaryBaseUrl}/w_400,c_fill,q_50/v1/yudabands/project_4f67cc6d-a4f7-432c-9317-a5f8f5fcdb9e.jpg`;
        }
        else {
            return imageUrl;
        }
    };
    ComponentEventService.prototype.getImageProfile = function (imageUrl) {
        if (this.isImageUrlCloudinary(imageUrl)) {
            var imageUrlArr = imageUrl.split('/');
            var imageName = imageUrlArr[imageUrlArr.length - 1];
            var cloudinaryBaseUrl = 'https://res.cloudinary.com/dbi1b3kf0/image/upload';
            return cloudinaryBaseUrl + "/w_180,h_180,c_scale/v1/yudabands/" + imageName;
        }
        else {
            return imageUrl;
        }
    };
    ComponentEventService.prototype.getProjectManageProfile = function (imageUrl) {
        if (this.isImageUrlCloudinary(imageUrl)) {
            var imageUrlArr = imageUrl.split('/');
            var imageName = imageUrlArr[imageUrlArr.length - 1];
            var cloudinaryBaseUrl = 'https://res.cloudinary.com/dbi1b3kf0/image/upload';
            return cloudinaryBaseUrl + "/w_200,h_200,c_thumb,g_face/v1/yudabands/" + imageName;
        }
        else {
            return imageUrl;
        }
    };
    ComponentEventService.prototype.getImageProfileV2 = function (imageUrl) {
        if (this.isImageUrlCloudinary(imageUrl)) {
            var imageUrlArr = imageUrl.split('/');
            var imageName = imageUrlArr[imageUrlArr.length - 1];
            var cloudinaryBaseUrl = 'https://res.cloudinary.com/dbi1b3kf0/image/upload';
            return cloudinaryBaseUrl + "/w_180,c_scale/v1/yudabands/" + imageName;
        }
        else {
            return imageUrl;
        }
    };
    ComponentEventService.prototype.getImagePath = function (imageAsset) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            imageSource.fromAsset(imageAsset)
                .then(function (imgSrc) {
                var documents = fs.knownFolders.documents();
                var path = fs.path.join(documents.path, _this.generateUID() + ".jpg");
                var saved = imgSrc.saveToFile(path, "jpg");
                if (saved) {
                    resolve(path);
                }
                else {
                    reject('Error in saving image');
                }
            });
        });
        return promise;
    };
    ComponentEventService.prototype.getImageSourcePath = function (imgSrc) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var documents = fs.knownFolders.documents();
            var path = fs.path.join(documents.path, _this.generateUID() + ".jpg");
            var saved = imgSrc.saveToFile(path, "jpg");
            if (saved) {
                resolve(path);
            }
            else {
                reject('Error in saving image');
            }
        });
    };
    ComponentEventService.prototype.generateUID = function () {
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        var firstStr = ("000" + firstPart.toString(36)).slice(-3);
        var secondStr = ("000" + secondPart.toString(36)).slice(-3);
        return firstStr + secondStr;
    };
    ComponentEventService.prototype.uploadImage = function (id, type, imageSource) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.getImageSourcePath(imageSource)
                .then(function (path) {
                var session = bghttp.session('image-upload');
                var fileNameArr = path.split('/');
                var fileName = fileNameArr[fileNameArr.length - 1];
                var imageUrl = path;
                var shouldFail = false;
                var task;
                var apiBaseUrl = _this._configService.getApiBaseUrl();
                var request = {
                    url: apiBaseUrl + "/file/upload_cloudinary",
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/octet-stream",
                        "File-Name": fileName
                    },
                    description: 'test upload'
                };
                if (shouldFail) {
                    request.headers["Should-Fail"] = true;
                }
                var params = [
                    { name: 'type', value: type },
                    { name: 'id', value: id.toString() },
                    { name: 'file', filename: imageUrl }
                ];
                task = session.multipartUpload(params, request);
                task.on("error", function (e) {
                    reject(e);
                });
                task.on("responded", function (e) {
                    var result = JSON.parse(e.data);
                    if (result.code === 500 && result.error.code === "E_EXCEEDS_UPLOAD_LIMIT") {
                        resolve({ success: false, message: 'File exceeded upload limit of 10MB' });
                    }
                    else {
                        var file = fs.File.fromPath(path);
                        file.remove().then(function (fileRes) {
                            resolve({ success: true, data: result.data.imageUrl });
                        }, function (error) {
                            reject('Could not delete file');
                        });
                    }
                });
            })
                .catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    ComponentEventService.prototype.updateUserDeviceLogoutStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userId, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = this._userService.getCurrentUserId();
                        this.showLoader('Logging out...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._userService.updateUserDeviceLogoutStatus(userId)];
                    case 2:
                        res = _a.sent();
                        this.hideLoader();
                        this._userService.removeCurrentUser();
                        this.unregisterToken();
                        this.getRouteOptions().clearHistory = true;
                        this.getRouteOptions().transition.name = 'slideRight';
                        this._routerExtensions.navigate(['/home'], this.getRouteOptions());
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.hideLoader();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ComponentEventService.supportedTimezones = [
        'America/Guatemala',
        'Africa/Harare'
    ];
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ComponentEventService.prototype, "titleBar", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ComponentEventService.prototype, "hasNotif", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ComponentEventService.prototype, "notification", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ComponentEventService.prototype, "searchQuery", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ComponentEventService.prototype, "isTourDone", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ComponentEventService.prototype, "isProjectDone", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ComponentEventService.prototype, "isUserRemoved", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ComponentEventService.prototype, "selectedStudent", void 0);
    ComponentEventService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_service_1.UserService,
            config_service_1.ConfigService,
            router_1.RouterExtensions])
    ], ComponentEventService);
    return ComponentEventService;
}());
exports.ComponentEventService = ComponentEventService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWV2ZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21wb25lbnQtZXZlbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW1GO0FBQ25GLGlGQUFrRTtBQUNsRSxzREFBK0Q7QUFDL0QsMkRBQXNFO0FBQ3RFLCtEQUFpRjtBQUNqRixnREFBK0M7QUFDL0MsbUVBQXdEO0FBQ3hELHVFQUF5RDtBQUV6RCxTQUFTO0FBQ1QsK0JBQWlDO0FBQ2pDLGlDQUFtQztBQUNuQyxvQ0FBc0M7QUFDdEMsaURBQW1EO0FBQ25ELGtEQUFvRDtBQUNwRCxxREFBdUQ7QUFDdkQsc0RBQXdEO0FBQ3hELDJEQUE2RDtBQUM3RCw0REFBOEQ7QUFDOUQsa0VBQW9FO0FBQ3BFLHFGQUFzRTtBQUV0RSxXQUFXO0FBQ1gsK0NBQTZDO0FBQzdDLG1EQUFpRDtBQUdqRDtJQXdCQywrQkFDUyxZQUF5QixFQUN6QixjQUE2QixFQUM3QixpQkFBbUM7UUFGbkMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQXpCbEMsYUFBUSxHQUF5QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNwRCxhQUFRLEdBQTBCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3JELGlCQUFZLEdBQXlCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3hELGdCQUFXLEdBQXlCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3ZELGVBQVUsR0FBMEIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDdkQsa0JBQWEsR0FBMEIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDMUQsa0JBQWEsR0FBMEIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDMUQsb0JBQWUsR0FBc0IsSUFBSSxtQkFB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QjtJQUNwRDtRQUFULGFBQU0sRUFBRTtrQ0FBVyxtQkFBWTsyREFBK0I7SUFDckQ7UUFBVCxhQUFNLEVBQUU7a0NBQWUsbUJBQVk7K0RBQThCO0lBQ3hEO1FBQVQsYUFBTSxFQUFFO2tDQUFjLG1CQUFZOzhEQUE4QjtJQUN2RDtRQUFULGFBQU0sRUFBRTtrQ0FBYSxtQkFBWTs2REFBK0I7SUFDdkQ7UUFBVCxhQUFNLEVBQUU7a0NBQWdCLG1CQUFZO2dFQUErQjtJQUMxRDtRQUFULGFBQU0sRUFBRTtrQ0FBZ0IsbUJBQVk7Z0VBQStCO0lBQzFEO1FBQVQsYUFBTSxFQUFFO2tDQUFrQixtQkFBWTtrRUFBMkI7SUFUdEQscUJBQXFCO1FBRGpDLGlCQUFVLEVBQUU7eUNBMEJXLDBCQUFXO1lBQ1QsOEJBQWE7WUFDVix5QkFBZ0I7T0EzQmhDLHFCQUFxQixDQWd6QmpDO0lBQUQsNEJBQUM7Q0FBQSxBQWh6QkQsSUFnekJDO0FBaHpCWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9hZGluZ0luZGljYXRvciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyB0YWtlUGljdHVyZSwgcmVxdWVzdFBlcm1pc3Npb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNhbWVyYSc7XG5pbXBvcnQgeyBGZWVkYmFjaywgRmVlZGJhY2tUeXBlLCBGZWVkYmFja1Bvc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1mZWVkYmFja1wiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xuaW1wb3J0IHsgVE5TRmFuY3lBbGVydCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1mYW5jeWFsZXJ0JztcbmltcG9ydCB7IEltYWdlQ3JvcHBlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtaW1hZ2Vjcm9wcGVyXCI7XG5cbi8vIE9USEVSU1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCAqIGFzIGh0dHBNb2R1bGUgZnJvbSBcImh0dHBcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCAqIGFzIGJnaHR0cCBmcm9tIFwibmF0aXZlc2NyaXB0LWJhY2tncm91bmQtaHR0cFwiO1xuaW1wb3J0ICogYXMgaW1hZ2VwaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xuaW1wb3J0ICogYXMgaW1hZ2VTb3VyY2UgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgKiBhcyBwdXNoUGx1Z2luIGZyb20gXCJuYXRpdmVzY3JpcHQtcHVzaC1ub3RpZmljYXRpb25zXCI7XG5pbXBvcnQgKiBhcyBjb25uZWN0aXZpdHlNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvY29ubmVjdGl2aXR5XCI7XG5pbXBvcnQgeyBMb2NhbE5vdGlmaWNhdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvY2FsLW5vdGlmaWNhdGlvbnNcIjtcblxuLy8gU0VSVklDRVNcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4vdXNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSBcIi4vY29uZmlnLnNlcnZpY2VcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbXBvbmVudEV2ZW50U2VydmljZSB7XG5cdFxuXHRAT3V0cHV0KCkgdGl0bGVCYXI6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXHRAT3V0cHV0KCkgaGFzTm90aWY6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblx0QE91dHB1dCgpIG5vdGlmaWNhdGlvbjogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdEBPdXRwdXQoKSBzZWFyY2hRdWVyeTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdEBPdXRwdXQoKSBpc1RvdXJEb25lOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdEBPdXRwdXQoKSBpc1Byb2plY3REb25lOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdEBPdXRwdXQoKSBpc1VzZXJSZW1vdmVkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdEBPdXRwdXQoKSBzZWxlY3RlZFN0dWRlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdGZlZWRiYWNrOiBGZWVkYmFjayA9IG5ldyBGZWVkYmFjaygpO1xuXHRpbWFnZUNyb3BwZXI6IEltYWdlQ3JvcHBlciA9IG5ldyBJbWFnZUNyb3BwZXIoKTtcblx0bG9hZGVyOiBhbnkgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xuXG5cdHZjUmVmOiBhbnk7XG5cblx0aW1hZ2VDcm9wcGVyT3B0OiBhbnkgPSB7IHdpZHRoOiA0MDAsIGhlaWdodDogNDAwLCBrZWVwQXNwZWN0UmF0aW86IHRydWUsIGxvY2tTcXVhcmU6IHRydWUgfTtcblxuXHRzdGF0aWMgc3VwcG9ydGVkVGltZXpvbmVzID0gW1xuXHRcdCdBbWVyaWNhL0d1YXRlbWFsYScsIFxuXHRcdCdBZnJpY2EvSGFyYXJlJ1xuXHRdO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcblx0XHRwcml2YXRlIF9jb25maWdTZXJ2aWNlOiBDb25maWdTZXJ2aWNlLFxuXHRcdHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG5cdCkge31cblxuXHQvKlxuXHQqIE5PVElGSUNBVElPTlNcblx0Ki9cblx0bG9jYWxOb3RpZkNhbGxCYWNrKCkge1xuXHRcdExvY2FsTm90aWZpY2F0aW9ucy5hZGRPbk1lc3NhZ2VSZWNlaXZlZENhbGxiYWNrKG5vdGlmaWNhdGlvbkRhdGEgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coXCJTTkFVUk9UXCIpXG5cdFx0XHRjb25zb2xlLmxvZyhub3RpZmljYXRpb25EYXRhKVxuXHRcdH0pLnRoZW4oKCkgPT4gY29uc29sZS5sb2coXCJMaXN0ZW5lciBhZGRlZCEhIVwiKSlcblx0fVxuXG5cdGhhc1NjaGVkdWxlZE5vdGlmKHByb2plY3RJZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0TG9jYWxOb3RpZmljYXRpb25zLmdldFNjaGVkdWxlZElkcygpLnRoZW4oKGlkcykgPT4ge1xuXHRcdFx0XHRpZihpZHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGxldCBub3RpZklkID0gaWRzWzBdO1xuXHRcdFx0XHRcdGxldCBub3RpZlByb2plY3RJZCA9IG5vdGlmSWQudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xuXG5cdFx0XHRcdFx0aWYocHJvamVjdElkID09IG5vdGlmUHJvamVjdElkKSB7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHRydWUpO1xuXHRcdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fSlcblx0fVxuXG5cdHJlbW92ZUFsbExvY2FsTm90aWZpY2F0aW9ucygpIHtcblx0XHRMb2NhbE5vdGlmaWNhdGlvbnMuY2FuY2VsQWxsKCk7XG5cdH1cblxuXHRzY2hlZHVsZU5vdGlmaWNhdGlvbihkYXRhKSB7XG5cdFx0Y29uc29sZS5sb2coXCJTY2hlZHVsZSBub3RpZiEhXCIpXG5cdFx0Y29uc29sZS5sb2coXCJQUk9KRUNUIElEOiBcIiArIGRhdGEucHJvamVjdElkKVxuXHRcdGNvbnNvbGUubG9nKFwiREFURSBTVEFSVDogXCIgKyBkYXRhLmRhdGVTdGFydClcblx0XHRjb25zb2xlLmxvZyhcIkRBVEUgRU5EOiBcIiArIGRhdGEuZGF0ZUVuZClcblx0XHRsZXQgZGF0ZVN0YXJ0ID0gbmV3IERhdGUoZGF0YS5kYXRlU3RhcnQpO1xuXHRcdGxldCBkYXRlRW5kID0gbmV3IERhdGUoZGF0YS5kYXRlRW5kKTtcblxuXHRcdGxldCBiZWZvcmUxNGRheXMgPSBuZXcgRGF0ZShkYXRlU3RhcnQuZ2V0VGltZSgpIC0gKCgxNCAqIDI0ICogNjAgKiA2MCAqIDEwMDApKSksXG5cdFx0XHRiZWZvcmU3ZGF5cyA9IG5ldyBEYXRlKGRhdGVTdGFydC5nZXRUaW1lKCkgLSAoKDcgKiAyNCAqIDYwICogNjAgKiAxMDAwKSkpLFxuXHRcdFx0YmVmb3JlMmRheXMgPSBuZXcgRGF0ZShkYXRlU3RhcnQuZ2V0VGltZSgpIC0gKCgyICogMjQgKiA2MCAqIDYwICogMTAwMCkpKSxcblx0XHRcdGFmdGVyM2RheXMgPSBuZXcgRGF0ZShkYXRlU3RhcnQuZ2V0VGltZSgpICsgKCgzICogMjQgKiA2MCAqIDYwICogMTAwMCkpKSxcblx0XHRcdGFmdGVyN2RheXMgPSBuZXcgRGF0ZShkYXRlRW5kLmdldFRpbWUoKSAtICgoNCAqIDI0ICogNjAgKiA2MCAqIDEwMDApKSksXG5cdFx0XHRhZnRlcjEwZGF5cyA9IG5ldyBEYXRlKGRhdGVFbmQuZ2V0VGltZSgpIC0gKCgxICogMjQgKiA2MCAqIDYwICogMTAwMCkpKSxcblx0XHRcdHByb2plY3REb25lID0gbmV3IERhdGUoZGF0ZUVuZC5nZXRUaW1lKCkgKyAoKDEgKiAyNCAqIDYwICogNjAgKiAxMDAwKSkpO1xuXG5cdFx0TG9jYWxOb3RpZmljYXRpb25zLnNjaGVkdWxlKFtcblx0XHRcdHtcblx0XHRcdFx0aWQ6IHBhcnNlRmxvYXQoYCR7ZGF0YS5wcm9qZWN0SWR9LjEwMDFgKSxcblx0XHRcdFx0dGl0bGU6IFwiMTAwIFNlY29uZHMgZnJvbSBub3chXCIsXG5cdFx0XHRcdGJvZHk6IFwiTWFrZSBzdXJlIHRvIG9yZGVyIHlvdXIgWXVkYSBCYW5kcyB0byBzdGFydCB5b3VyIHNhbGVzIVwiLFxuXHRcdFx0XHRhdDogbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoMTAgKiAxMDAwKSksIC8vIDEwIHNlY29uZHMgZnJvbSBub3dcblx0XHRcdFx0Zm9yY2VTaG93V2hlbkluRm9yZWdyb3VuZDogdHJ1ZVxuXHRcdFx0fVxuXHRcdFx0Ly8ge1xuXHRcdFx0Ly8gXHRpZDogcGFyc2VGbG9hdChgJHtkYXRhLnByb2plY3RJZH0uMTAwMWApLFxuXHRcdFx0Ly8gXHR0aXRsZTogXCJCYW5kIE9yZGVyaW5nIERlYWRsaW5lXCIsXG5cdFx0XHQvLyBcdGJvZHk6IFwiTWFrZSBzdXJlIHRvIG9yZGVyIHlvdXIgWXVkYSBCYW5kcyB0byBzdGFydCB5b3VyIHNhbGVzIVwiLFxuXHRcdFx0Ly8gXHRiYWRnZTogMSxcblx0XHRcdC8vIFx0YXQ6IGJlZm9yZTE0ZGF5cyAvLyAxMCBzZWNvbmRzIGZyb20gbm93XG5cdFx0XHQvLyB9LFxuXHRcdFx0Ly8ge1xuXHRcdFx0Ly8gXHRpZDogcGFyc2VGbG9hdChgJHtkYXRhLnByb2plY3RJZH0uMTAwMmApLFxuXHRcdFx0Ly8gXHR0aXRsZTogXCJTdHVkZW50IHNlbGVjdGlvbiBkZWFkbGluZVwiLFxuXHRcdFx0Ly8gXHRib2R5OiBcIkhlbGxvISBkb24ndCBmb3JnZXQgdG8gc2VsZWN0IGEgc3R1ZGVudCB0byBzcG9uc29yIVwiLFxuXHRcdFx0Ly8gXHRiYWRnZTogMSxcblx0XHRcdC8vIFx0YXQ6IG5ldyBEYXRlKGJlZm9yZTE0ZGF5cy5nZXRUaW1lKCkgKyAoMTgwMCAqIDEwMDApKSAvLyAzMCBzZWNvbmRzIGZyb20gbm93XG5cdFx0XHQvLyB9LFxuXHRcdFx0Ly8ge1xuXHRcdFx0Ly8gXHRpZDogcGFyc2VGbG9hdChgJHtkYXRhLnByb2plY3RJZH0uMTAwM2ApLFxuXHRcdFx0Ly8gXHR0aXRsZTogXCJGcmVlIHNoaXJ0IFBST01PIVwiLFxuXHRcdFx0Ly8gXHRib2R5OiBcIkZSRUUgU0hJUlQgU0hJUFBJTkcgRU5EUyBUT0RBWSEgUGx1cyB0aGVyZSBhcmUgb3RoZXIgZGVhZGxpbmVzIHRvZGF5LCBvcGVuIHRoZSBhcHAgYW5kIG1ha2Ugc3VyZSB5b3UndmUgY29tcGxldGVkIGFsbCBvZiB5b3VyIHN0ZXBzXCIsXG5cdFx0XHQvLyBcdGJhZGdlOiAxLFxuXHRcdFx0Ly8gXHRhdDogbmV3IERhdGUoYmVmb3JlMTRkYXlzLnNldEhvdXJzKDExKSkgLy8gNjAgc2Vjb25kcyBmcm9tIG5vd1xuXHRcdFx0Ly8gfSxcblx0XHRcdC8vIHtcblx0XHRcdC8vIFx0aWQ6IHBhcnNlRmxvYXQoYCR7ZGF0YS5wcm9qZWN0SWR9LjEwMDRgKSxcblx0XHRcdC8vIFx0dGl0bGU6IFwiU2hpcnQgT3JkZXJpbmcgRGVhZGxpbmVcIixcblx0XHRcdC8vIFx0Ym9keTogXCJIZWxsbyBsZWFkZXIhIHRvZGF5IGlzIHRoZSBkZWFkbGluZSB0byBvcmRlciBhIHNoaXJ0IVwiLFxuXHRcdFx0Ly8gXHRiYWRnZTogMSxcblx0XHRcdC8vIFx0YXQ6IGJlZm9yZTdkYXlzIC8vIDkwIHNlY29uZHMgZnJvbSBub3dcblx0XHRcdC8vIH0sXG5cdFx0XHQvLyB7XG5cdFx0XHQvLyBcdGlkOiBwYXJzZUZsb2F0KGAke2RhdGEucHJvamVjdElkfS4xMDA1YCksXG5cdFx0XHQvLyBcdHRpdGxlOiBcIkFEVkVSVElTSU5HIFdFRUshXCIsXG5cdFx0XHQvLyBcdGJvZHk6IFwiT3BlbiB0aGUgYXBwIGFuZCBnbyB0byByZXNvdXJjZXMgdGFiIHRvIGxlYXJuIG1vcmUhXCIsXG5cdFx0XHQvLyBcdGJhZGdlOiAxLFxuXHRcdFx0Ly8gXHRhdDogbmV3IERhdGUoYmVmb3JlN2RheXMuc2V0SG91cnMoMTEpKSAvLyAxMDAgc2Vjb25kcyBmcm9tIG5vd1xuXHRcdFx0Ly8gfSxcblx0XHRcdC8vIHtcblx0XHRcdC8vIFx0aWQ6IHBhcnNlRmxvYXQoYCR7ZGF0YS5wcm9qZWN0SWR9LjEwMDZgKSxcblx0XHRcdC8vIFx0dGl0bGU6IFwiWXVkYSBQUk9NTyFcIixcblx0XHRcdC8vIFx0Ym9keTogXCJGcmVlIEhPT0RJRT8gMzAwIGJhbmRzIHNvbGQgPSAzIGF3ZXNvbWUgY29sb3JmdWwgaG9vZGllcyEgQXNrIHlvdXIgUHJvamVjdCBMZWFkZXIgYWJvdXQgdGhlIGRldGFpbHNcIixcblx0XHRcdC8vIFx0YmFkZ2U6IDEsXG5cdFx0XHQvLyBcdGF0OiBiZWZvcmUyZGF5cyAvLyAxMjAgc2Vjb25kcyBmcm9tIG5vd1xuXHRcdFx0Ly8gfSxcblx0XHRcdC8vIHtcblx0XHRcdC8vIFx0aWQ6IHBhcnNlRmxvYXQoYCR7ZGF0YS5wcm9qZWN0SWR9LjEwMDdgKSxcblx0XHRcdC8vIFx0dGl0bGU6IFwiRklSU1QgREFZIVwiLFxuXHRcdFx0Ly8gXHRib2R5OiBcIlRvZGF5IGlzIHlvdXIgZmlyc3QgZGF5IG9mIHNhbGVzISBNYWtlIHN1cmUgeW91IGhhdmUgYSBwaWN0dXJlIG9mIHlvdXIgc3R1ZGVudCBhdCB0aGUgc2FsZXMgdGFibGUhXCIsXG5cdFx0XHQvLyBcdGJhZGdlOiAxLFxuXHRcdFx0Ly8gXHRhdDogZGF0ZVN0YXJ0IC8vIDE0MCBzZWNvbmRzIGZyb20gbm93XG5cdFx0XHQvLyB9LFxuXHRcdFx0Ly8ge1xuXHRcdFx0Ly8gXHRpZDogcGFyc2VGbG9hdChgJHtkYXRhLnByb2plY3RJZH0uMTAwOGApLFxuXHRcdFx0Ly8gXHR0aXRsZTogXCJORUVEIE1PUkUgQkFORFM/XCIsXG5cdFx0XHQvLyBcdGJvZHk6IFwiQ291bnQgeW91ciBiYW5kcyB0b2RheSBzbyB5b3UgY2FuIGRlY2lkZSBpZiB5b3UgbmVlZCB0byBvcmRlciBtb3JlLlwiLFxuXHRcdFx0Ly8gXHRiYWRnZTogMSxcblx0XHRcdC8vIFx0YXQ6IGFmdGVyM2RheXMgLy8gMTYwIHNlY29uZHMgZnJvbSBub3dcblx0XHRcdC8vIH0sXG5cdFx0XHQvLyB7XG5cdFx0XHQvLyBcdGlkOiBwYXJzZUZsb2F0KGAke2RhdGEucHJvamVjdElkfS4xMDA5YCksXG5cdFx0XHQvLyBcdHRpdGxlOiBcIkhBTEZXQVkgVEhFUkUhXCIsXG5cdFx0XHQvLyBcdGJvZHk6IFwiQmxhc3Qgb3V0IHNvbWUgbW9yZSBzb2NpYWwgcG9zdHMgdG8gcmVtaW5kIGV2ZXJ5b25lIHRvIGdldCB0aGVpciBiYW5kIGJlZm9yZSBGcmlkYXkuXCIsXG5cdFx0XHQvLyBcdGJhZGdlOiAxLFxuXHRcdFx0Ly8gXHRhdDogYWZ0ZXI3ZGF5cyAvLyAxODAgc2Vjb25kcyBmcm9tIG5vd1xuXHRcdFx0Ly8gfSxcblx0XHRcdC8vIHtcblx0XHRcdC8vIFx0aWQ6IHBhcnNlRmxvYXQoYCR7ZGF0YS5wcm9qZWN0SWR9LjEwMTBgKSxcblx0XHRcdC8vIFx0dGl0bGU6IFwiTUVNQkVSIFJFTUlOREVSXCIsXG5cdFx0XHQvLyBcdGJvZHk6IFwiUmVtaW5kIHlvdXIgdm9sdW50ZWVycyB0byBicmluZyBhbGwgJCQgYW5kIGxlZnRvdmVyIGJhbmRzIGJhY2sgdG8geW91IGJ5IEZyaWRheS5cIixcblx0XHRcdC8vIFx0YmFkZ2U6IDEsXG5cdFx0XHQvLyBcdGF0OiBhZnRlcjEwZGF5cyAvLyAyMDAgc2Vjb25kcyBmcm9tIG5vd1xuXHRcdFx0Ly8gfSxcblx0XHRcdC8vIHtcblx0XHRcdC8vIFx0aWQ6IHBhcnNlRmxvYXQoYCR7ZGF0YS5wcm9qZWN0SWR9LjEwMTFgKSxcblx0XHRcdC8vIFx0dGl0bGU6IFwiT05FIE1PUkUgREFZIVwiLFxuXHRcdFx0Ly8gXHRib2R5OiBcIk1ha2Ugc3VyZSB0byBmaW5hbGl6ZSBldmVyeXRoaW5nIGZvciB0b21vcnJvdy5cIixcblx0XHRcdC8vIFx0YmFkZ2U6IDEsXG5cdFx0XHQvLyBcdGF0OiBkYXRlRW5kIC8vIDIwMCBzZWNvbmRzIGZyb20gbm93XG5cdFx0XHQvLyB9LFxuXHRcdFx0Ly8ge1xuXHRcdFx0Ly8gXHRpZDogcGFyc2VGbG9hdChgJHtkYXRhLnByb2plY3RJZH0uMTAxMmApLFxuXHRcdFx0Ly8gXHR0aXRsZTogXCJQUk9KRUNUIENPTVBMRVRFRCFcIixcblx0XHRcdC8vIFx0Ym9keTogXCJZb3VyIHByb2plY3QgaXMgb2ZmaWNpYWxseSBvdmVyISBDb25ncmF0dWxhdGlvbnMsIHdlIGhvcGUgaXQgd2FzIGEgc3VjY2Vzcy4gT3BlbiB5b3VyIHByb2plY3QgdG8gcmVwb3J0IHlvdXIgbnVtYmVycy5cIixcblx0XHRcdC8vIFx0YmFkZ2U6IDEsXG5cdFx0XHQvLyBcdGF0OiBwcm9qZWN0RG9uZSAvLyAyNTAgc2Vjb25kcyBmcm9tIG5vd1xuXHRcdFx0Ly8gfVxuXHRcdF0pLnRoZW4oKCkgPT4gY29uc29sZS5sb2coXCJzdWNjZXNzZnVsbHkgc2NoZWR1bGVkIG5vdGlmc1wiKSwgXG5cdFx0KGVycm9yKSA9PiBjb25zb2xlLmxvZyhcInNjaGVkdWxpbmcgZXJyb3I6IFwiICsgZXJyb3IpKVxuXHR9XG5cdC8qXG5cdCogRU5EIE9GIE5PVElGSUNBVElPTlNcblx0Ki9cblxuXHQvKlxuXHQqIExJU1RFTkVSU1xuXHQqL1xuXHRyZWNlaXZlZE5vdGlmaWNhdGlvbihkYXRhKSB7XG5cdFx0dGhpcy5ub3RpZmljYXRpb24uZW1pdChkYXRhKTtcblx0fVxuXG5cdGhhc05vdGlmaWNhdGlvbihoYXNOb3RpZikge1xuXHRcdHRoaXMuaGFzTm90aWYuZW1pdChoYXNOb3RpZik7XG5cdH1cblxuXHR0aXRsZUJhckNoYW5nZWQobmFtZSkge1xuXHRcdHRoaXMudGl0bGVCYXIuZW1pdChuYW1lKTtcblx0fVxuXG5cdHNlYXJjaEJhckNoYW5nZWQoc2VhcmNoUXVlcnkpIHtcblx0XHR0aGlzLnNlYXJjaFF1ZXJ5LmVtaXQoc2VhcmNoUXVlcnkpO1xuXHR9XG5cblx0dG91ckNoYW5nZWQoaXNUb3VyRG9uZSkge1xuXHRcdHRoaXMuaXNUb3VyRG9uZS5lbWl0KGlzVG91ckRvbmUpO1xuXHR9XG5cblx0cHJvamVjdENoYW5nZWQoaXNQcm9qZWN0RG9uZSkge1xuXHRcdHRoaXMuaXNQcm9qZWN0RG9uZS5lbWl0KGlzUHJvamVjdERvbmUpO1xuXHR9XG5cblx0dXNlclJlbW92YWwoaXNVc2VyUmVtb3ZlZCkge1xuXHRcdHRoaXMuaXNVc2VyUmVtb3ZlZC5lbWl0KGlzVXNlclJlbW92ZWQpO1xuXHR9XG5cblx0c2VsZWN0U3R1ZGVudChkYXRhKSB7XG5cdFx0dGhpcy5zZWxlY3RlZFN0dWRlbnQuZW1pdChkYXRhKTtcblx0fVxuXHQvKlxuXHQqIEVORCBPRiBMSVNURU5FUlNcblx0Ki9cblx0Z2V0WW91dHViZUlkKHVybCkge1xuXHRcdGxldCBpZCA9ICcnO1xuXG5cdFx0dXJsID0gdXJsLnJlcGxhY2UoLyg+fDwpL2dpLCcnKS5zcGxpdCgvKHZpXFwvfHY9fFxcL3ZcXC98eW91dHVcXC5iZVxcL3xcXC9lbWJlZFxcLykvKTtcblxuXHRcdGlmKHVybFsyXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0ICAgIGlkID0gdXJsWzJdLnNwbGl0KC9bXjAtOWEtel9cXC1dL2kpO1xuXHRcdCAgICBpZCA9IGlkWzBdO1xuXHRcdH1lbHNlIHtcblx0XHRcdGlkID0gdXJsO1xuXHRcdH1cblxuXHRcdHJldHVybiBpZDtcblx0fVxuXG5cdHNldE1vZGFsVmNSZWYodmNSZWYpIHtcblx0XHR0aGlzLnZjUmVmID0gdmNSZWY7XG5cdH1cblxuXG5cdGdldE1vZGFsT3B0aW9ucyhjb250ZXh0LCBoYXNUcmFuc2l0aW9uID0gdHJ1ZSwgZnVsbHNjcmVlbiA9IHRydWUsIGFuaW1hdGVkID0gdHJ1ZSkge1xuXHRcdGxldCBvcHQgPSB7XG5cdFx0XHRjb250ZXh0OiBjb250ZXh0LFxuXHRcdFx0ZnVsbHNjcmVlbjogZnVsbHNjcmVlbixcblx0XHRcdHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXG5cdFx0XHRhbmltYXRlZDogYW5pbWF0ZWQsXG5cdFx0XHR0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZVRvcFwiLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZVwiXG4gICAgICAgICAgICB9XG5cdFx0fVxuXG5cdFx0aWYoIWhhc1RyYW5zaXRpb24pIGRlbGV0ZSBvcHQudHJhbnNpdGlvbjtcblxuXHRcdHJldHVybiBvcHQ7XG5cdH1cblxuXHRnZXRSb3V0ZU9wdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGFuaW1hdGVkOiB0cnVlLFxuXHRcdFx0Y2xlYXJIaXN0b3J5OiBmYWxzZSxcblx0XHRcdHRyYW5zaXRpb246IHtcblx0XHRcdFx0bmFtZTogJ3NsaWRlTGVmdCcsXG5cdFx0XHRcdGR1cmF0aW9uOiAwLFxuXHRcdFx0XHRjdXJ2ZTogJ2Vhc2UnXG5cdFx0XHR9LFxuXHRcdFx0cXVlcnlQYXJhbXM6IHt9XG5cdFx0fVxuXHR9XG5cblxuXHRjaGVja0lmTGlua0lzVmFsaWQodXJsKSB7XG5cdFx0aHR0cE1vZHVsZS5nZXRGaWxlKHVybClcblx0XHRcdC50aGVuKChyZXN1bHRGaWxlKSA9PiB7XG5cdFx0XHQgICAgY29uc29sZS5sb2cocmVzdWx0RmlsZSlcblx0XHRcdH0sIChlKSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiRVJST1I6OjpcIilcblx0XHRcdFx0Y29uc29sZS5sb2coZSlcblx0XHRcdH0pO1xuXHR9XG5cblx0aGFzSW50ZXJuZXRDb25uZWN0aW9uKCkge1xuXHRcdGxldCBjb25uVHlwZSA9IGNvbm5lY3Rpdml0eU1vZHVsZS5nZXRDb25uZWN0aW9uVHlwZSgpO1xuXHRcdGxldCBub25lID0gY29ubmVjdGl2aXR5TW9kdWxlLmNvbm5lY3Rpb25UeXBlLm5vbmU7XG5cblx0XHRyZXR1cm4gKGNvbm5UeXBlID09PSBub25lKT8gZmFsc2UgOiB0cnVlO1xuXHR9XG5cblx0b2JqSXNFbXB0eShvYmopIHtcblx0XHRmb3IodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdGlmKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8qXG5cdCogQUxFUlRTXG5cdCovXG5cdHNob3dBbGVydCh0aXRsZSwgbWVzc2FnZSkge1xuXHRcdGRpYWxvZ3MuYWxlcnQoe1xuXHRcdCAgICB0aXRsZTogdGl0bGUsXG5cdFx0ICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG5cdFx0ICAgIG9rQnV0dG9uVGV4dDogJ09LJ1xuXHRcdH0pLnRoZW4oKCkgPT4ge30pO1xuXHR9XG5cblx0c2hvd1Bob25lQWxlcnQoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGRpYWxvZ3MuYWN0aW9uKHtcblx0XHRcdFx0bWVzc2FnZTogJ09wdGlvbnMnLFxuXHRcdFx0XHRjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsJyxcblx0XHRcdFx0YWN0aW9uczogWydDYWxsJywgJ1RleHQnXVxuXHRcdFx0fSkudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRcdHJlc29sdmUocmVzdWx0KVxuXHRcdFx0fSlcblx0XHR9KVxuXHR9XG5cblx0c2hvd0l0ZW1Db25maXJtYXRpb25BbGVydCgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0ZGlhbG9ncy5hbGVydCh7XG5cdFx0XHQgICAgdGl0bGU6ICdTdWNjZXNzIScsXG5cdFx0XHQgICAgbWVzc2FnZTogJ051bWJlciBvZiBCYW5kcyBjb25maXJtZWQuIFlvdSBjYW4gbm93IHN0YXJ0IHdpdGggeW91ciBwcm9qZWN0LiBHb29kbHVjayEnLFxuXHRcdFx0ICAgIG9rQnV0dG9uVGV4dDogJ0dvIHRvIHByb2plY3QnXG5cdFx0XHR9KS50aGVuKCgpID0+IHtcblx0XHRcdFx0cmVzb2x2ZSh0cnVlKVxuXHRcdFx0fSk7XG5cdFx0fSlcblx0fVxuXG5cdHNob3dVc2VyUmVtb3ZhbEFsZXJ0KCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRkaWFsb2dzLmFsZXJ0KHtcblx0XHRcdCAgICB0aXRsZTogJ09vb3BzIScsXG5cdFx0XHQgICAgbWVzc2FnZTogJ1lvdXIgYWNjb3VudCBoYXMgYmVlbiByZW1vdmVkIGJ5IHRoZSBwcm9qZWN0IG1hbmFnZXIuIFlvdSB3aWxsIGJlIHJlZGlyZWN0ZWQgdG8gdGhlIGhvbWUgcGFnZS4nLFxuXHRcdFx0ICAgIG9rQnV0dG9uVGV4dDogJ09LJ1xuXHRcdFx0fSkudGhlbigoKSA9PiB7XG5cdFx0XHRcdHJlc29sdmUodHJ1ZSlcblx0XHRcdH0pO1xuXHRcdH0pXG5cdH1cblxuXHRzaG93QWxlcnRTdGFydFByb2plY3QoKSB7XG5cdFx0bGV0IGNhY2hlZERhdGEgPSB0aGlzLl91c2VyU2VydmljZS5nZXRTdGFydFByb2plY3REYXRhKCk7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG5vQ2FjaGVkTXNnID0gJ1lvdSBkb25cXCd0IGhhdmUgYSBwcm9qZWN0LiBXaHkgbm90IGNyZWF0ZSBvbmU/Jztcblx0XHRcdGxldCBoYXNDYWNoZWRNc2cgPSAnSXQgbG9va3MgbGlrZSB5b3UgaGF2ZW5cXCd0IGZpbmlzaGVkIHRoZSBzaWduIHVwIHByb2Nlc3MuIFdvdWxkIHlvdSBsaWtlIHRvIGNvbXBsZXRlIHRoYXQgbm93Pyc7XG5cblx0XHRcdGRpYWxvZ3MuY29uZmlybSh7XG5cdCAgICAgICAgICAgIHRpdGxlOiAnT29vcHMhJyxcblx0ICAgICAgICAgICAgbWVzc2FnZTogKHRoaXMub2JqSXNFbXB0eShjYWNoZWREYXRhKSk/IG5vQ2FjaGVkTXNnIDogaGFzQ2FjaGVkTXNnLFxuXHQgICAgICAgICAgICBva0J1dHRvblRleHQ6ICh0aGlzLm9iaklzRW1wdHkoY2FjaGVkRGF0YSkpPyAnQ3JlYXRlJyA6ICdDb250aW51ZScsXG5cdCAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWwnLFxuXHQgICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcblx0ICAgICAgICAgICAgaWYocmVzdWx0KSB7XG5cdCAgICAgICAgICAgIFx0cmVzb2x2ZSh0cnVlKVxuXHQgICAgICAgICAgICB9ZWxzZSB7XG5cdCAgICAgICAgICAgIFx0cmVqZWN0KGZhbHNlKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSk7XG5cdFx0fSlcblx0fVxuXG5cdHNob3dSZWZyZXNoQWxlcnQoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGRpYWxvZ3MuYWxlcnQoe1xuXHRcdFx0ICAgIHRpdGxlOiAnT29vcHMhJyxcblx0XHRcdCAgICBtZXNzYWdlOiAnVW5hYmxlIHRvIGdldCB5b3VyIHNreXBlIHNjaGVkdWxlLiBZb3UgY2FuIHRyeSByZWZyZXNoaW5nIGl0LicsXG5cdFx0XHQgICAgb2tCdXR0b25UZXh0OiAnUmVmcmVzaCdcblx0XHRcdH0pLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRyZXNvbHZlKHRydWUpXG5cdFx0XHR9KTtcblx0XHR9KVxuXHR9XG5cblx0c2hvd0FuYXV0aG9yaXplZEFsZXJ0KHJvdXRlKSB7XG5cdFx0ZGlhbG9ncy5hbGVydCh7XG5cdFx0XHR0aXRsZTogJ1Nlc3Npb24gRXhwaXJlZCcsXG5cdFx0XHRtZXNzYWdlOiAnUGxlYXNlIHJlLWxvZ2luIHRvIHJlbmV3IHlvdXIgc2Vzc2lvbicsXG5cdFx0XHRva0J1dHRvblRleHQ6ICdPSydcblx0XHR9KS50aGVuKCgpID0+IHtcblx0XHRcdHRoaXMudXBkYXRlVXNlckRldmljZUxvZ291dFN0YXR1cygpO1xuXHRcdH0pXG5cdH1cblxuXHRzaG93QmFuZHNDb25maXJtYXRpb25BbGVydCh0b3RhbEJhbmRzLCBkYXRlU3RhcnQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RhcnQpO1xuXG5cdFx0XHRkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSAxMik7XG5cblx0XHRcdGxldCBkYXRlU3RyID0gbW9tZW50KGRhdGUpLmZvcm1hdCgnbGwnKTtcblxuXHRcdFx0ZGlhbG9ncy5hbGVydCh7XG5cdFx0XHRcdHRpdGxlOiAnQ29uZmlybScsXG5cdFx0XHRcdG1lc3NhZ2U6IGBZb3UgYXJlIGFib3V0IHRvIG9yZGVyICR7dG90YWxCYW5kc30gYmFuZHMgZm9yIHlvdXIgc2Nob29sIHdoaWNoIHdpbGwgYmUgc2hpcHBlZCBvbiAke2RhdGVTdHJ9LmAsXG5cdFx0XHRcdG9rQnV0dG9uVGV4dDogJ09LJ1xuXHRcdFx0fSkudGhlbigoKSA9PiB7XG5cdFx0XHRcdHJlc29sdmUodHJ1ZSlcblx0XHRcdH0pXG5cdFx0fSlcblx0fVxuXHQvKlxuXHQqIEVORCBPRiBBTEVSVFNcblx0Ki9cblx0c2F2ZVByb2plY3RNYW5hZ2VyKGRhdGEpIHtcblx0XHRhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJwcm9qZWN0LW1hbmFnZXJcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHR9XG5cblx0Z2V0UHJvamVjdE1hbmFnZXIoKSB7XG5cdFx0bGV0IGRhdGEgPSBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJwcm9qZWN0LW1hbmFnZXJcIik7XG5cdFx0cmV0dXJuIChkYXRhKT8gSlNPTi5wYXJzZShkYXRhKSA6IHt9O1xuXHR9XG5cblx0cmVtb3ZlUHJvamVjdE1hbmFnZXIoKSB7XG5cdFx0YXBwU2V0dGluZ3MucmVtb3ZlKFwicHJvamVjdC1tYW5hZ2VyXCIpO1xuXHR9XG5cblx0c2F2ZVNlbGVjdGVkU3R1ZGVudChkYXRhKSB7XG5cdFx0YXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwic2VsZWN0ZWQtc3R1ZGVudFwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdH1cblxuXHRnZXRTZWxlY3RlZFN0dWRlbnQoKSB7XG5cdFx0bGV0IGRhdGEgPSBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJzZWxlY3RlZC1zdHVkZW50XCIpO1xuXHRcdHJldHVybiAoZGF0YSk/IEpTT04ucGFyc2UoZGF0YSkgOiB7fTtcblx0fVxuXG5cdHJlbW92ZVNlbGVjdGVkU3R1ZGVudCgpIHtcblx0XHRhcHBTZXR0aW5ncy5yZW1vdmUoXCJzZWxlY3RlZC1zdHVkZW50XCIpO1xuXHR9XG5cblx0dW5yZWdpc3RlclRva2VuKCkge1xuICAgICAgICBwdXNoUGx1Z2luLnVucmVnaXN0ZXIoXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB7fSwgXG4gICAgICAgICAgICAoZXJyKSA9PiB7IGNvbnNvbGUubG9nKGVycikgfSwgXG4gICAgICAgICAgICB0aGlzLl9jb25maWdTZXJ2aWNlLnB1c2hTZXR0aW5ncygpXG4gICAgICAgICk7XG4gICAgfVxuXG5cdHNob3dGYW5jeUFsZXJ0SW5mbyh0aXRsZSwgbWVzc2FnZSkge1xuXHRcdFROU0ZhbmN5QWxlcnQuc2hvd0luZm8odGl0bGUsIG1lc3NhZ2UsICdPaycpO1xuXHR9XG5cblx0dmFsaWRhdGVFbWFpbChlbWFpbCkge1xuXHRcdGxldCBlbWFpbFJlZ0V4ID0gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC9pO1xuXHRcdGxldCB2YWxpZCA9IGVtYWlsUmVnRXgudGVzdChlbWFpbCk7XG5cbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuXHR9XG5cblx0dmFsaWRhdGVQaG9uZU51bWJlcihudW1iZXIpIHtcblx0XHRsZXQgcGhvbmVSZWdFeCA9IC9eW1xcK10/WyhdP1swLTldezN9WyldP1stXFxzXFwuXT9bMC05XXszfVstXFxzXFwuXT9bMC05XXs0LDZ9JC9pbTtcblxuXHRcdHJldHVybiBwaG9uZVJlZ0V4LnRlc3QobnVtYmVyKTtcblx0fVxuXG5cdHNob3dMb2FkZXIobWVzc2FnZSkge1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHQgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG5cdCAgICAgICAgcHJvZ3Jlc3M6IDAuNjUsXG5cdCAgICAgICAgYW5kcm9pZDoge30sXG5cdCAgICAgICAgaW9zOiB7fVxuXHQgICAgfTtcblx0XHR0aGlzLmxvYWRlci5zaG93KG9wdGlvbnMpO1xuXHR9XG5cblx0aGlkZUxvYWRlcigpIHtcblx0XHR0aGlzLmxvYWRlci5oaWRlKCk7XG5cdH1cblxuXHRzaG93U3VjY2Vzc0ZlZWRiYWNrKHRpdGxlLCBtZXNzYWdlKSB7XG5cdFx0dGhpcy5mZWVkYmFjay5zdWNjZXNzKHtcbiAgICAgICAgXHR0aXRsZTogdGl0bGUsXG4gICAgXHRcdG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgIFx0ZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcihcIiMwMGE5ZWNcIiksXG4gICAgICAgIFx0b25UYXA6ICgpID0+IHsgY29uc29sZS5sb2coXCJzaG93U3VjY2VzcyB0YXBwZWRcIik7IH1cbiAgICAgICAgfSk7XG5cdH1cblxuXHRzaG93RXJyb3JGZWVkYmFjayh0aXRsZSwgbWVzc2FnZSkge1xuXHRcdHRoaXMuZmVlZGJhY2suc2hvdyh7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsXG4gICAgICAgICAgICBwb3NpdGlvbjogRmVlZGJhY2tQb3NpdGlvbi5Cb3R0b20sXG4gICAgICAgICAgICB0eXBlOiBGZWVkYmFja1R5cGUuRXJyb3IsXG4gICAgICAgICAgICBvblRhcDogKCkgPT4geyBjb25zb2xlLmxvZyhcInNob3dFcnJvckJvdHRvbSB0YXBwZWRcIik7IH1cbiAgICAgICAgfSk7XG5cdH1cblxuXHRjaGFuZ2VJbWFnZShoZWlnaHQ/LCB3aWR0aD8pIHtcblxuXHRcdGhlaWdodCA9IChoZWlnaHQpPyBoZWlnaHQgOiAxMDA7XG5cdFx0d2lkdGggID0gKHdpZHRoKT8gd2lkdGggOiAxMDA7XG5cblx0XHRsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGRpYWxvZ3MuYWN0aW9uKHtcblx0ICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcblx0ICAgICAgICAgICAgYWN0aW9uczogW1wiQ2hvb3NlIGZyb20gcGhvdG9zXCIsIFwiT3BlbiBDYW1lcmFcIl1cblx0ICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG5cblx0ICAgICAgICAgICAgaWYocmVzdWx0ID09ICdDaG9vc2UgZnJvbSBwaG90b3MnKXtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2hvd0dhbGxlcnkoaGVpZ2h0LCB3aWR0aClcblx0ICAgICAgICAgICAgICAgIFx0LnRoZW4oKHJlcykgPT4ge1xuXHQgICAgICAgICAgICAgICAgXHRcdHJlc29sdmUocmVzKTtcblx0ICAgICAgICAgICAgICAgIFx0fSlcblx0ICAgICAgICAgICAgICAgIFx0LmNhdGNoKChlcnIpID0+IHtcblx0ICAgICAgICAgICAgICAgIFx0XHRyZWplY3QoZXJyKTtcblx0ICAgICAgICAgICAgICAgIFx0fSlcblxuXHQgICAgICAgICAgICB9ZWxzZSBpZihyZXN1bHQgPT0gJ09wZW4gQ2FtZXJhJyl7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNob3dDYW1lcmEoaGVpZ2h0LCB3aWR0aClcblx0ICAgICAgICAgICAgICAgIFx0LnRoZW4oKHJlcykgPT4ge1xuXHQgICAgICAgICAgICAgICAgXHRcdHJlc29sdmUocmVzKVxuXHQgICAgICAgICAgICAgICAgXHR9KVxuXHQgICAgICAgICAgICAgICAgXHQuY2F0Y2goKGVycikgPT4ge1xuXHQgICAgICAgICAgICAgICAgXHRcdHJlamVjdChlcnIpXG5cdCAgICAgICAgICAgICAgICBcdH0pXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9KTtcblx0XHR9KVxuXG5cdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cblxuXHRzaG93Q2FtZXJhKGhlaWdodD8sIHdpZHRoPykge1xuXG5cdFx0bGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRyZXF1ZXN0UGVybWlzc2lvbnMoKVxuXHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0dGFrZVBpY3R1cmUoeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LCBrZWVwQXNwZWN0UmF0aW86IHRydWUsIHNhdmVUb0dhbGxlcnk6IGZhbHNlIH0pXG5cdFx0XHRcdFx0XHQudGhlbigoaW1hZ2VBc3NldDogYW55KSA9PiB7XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHR0aGlzLnNob3dDcm9wcGVyKGltYWdlQXNzZXQpXG5cdFx0XHQgICAgICAgIFx0XHRcdC50aGVuKChyZXMpID0+IHtcblx0XHRcdCAgICAgICAgXHRcdFx0XHRyZXNvbHZlKHJlcylcblx0XHRcdCAgICAgICAgXHRcdFx0fSkuY2F0Y2goKGVycikgPT4ge1xuXHRcdFx0ICAgICAgICBcdFx0XHRcdHJlamVjdChlcnIpXG5cdFx0XHQgICAgICAgIFx0XHRcdH0pXG5cblx0XHRcdFx0XHRcdH0sIChlcnIpID0+IHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycilcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0sICgpID0+IHtcblx0XHRcdFx0XHRyZWplY3QoJ1Blcm1pc3Npb24gcmVqZWN0ZWQnKVxuXHRcdFx0XHR9KVxuXHRcdFx0XG5cdFx0fSlcblxuXHRcdHJldHVybiBwcm9taXNlO1xuXHR9XG5cblx0c2hvd0dhbGxlcnkoaGVpZ2h0Pywgd2lkdGg/KSB7XG5cdFx0XG5cdFx0bGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cblx0XHRcdGxldCBjb250ZXh0ID0gaW1hZ2VwaWNrZXIuY3JlYXRlKHtcblx0ICAgICAgICAgICAgbW9kZTogXCJzaW5nbGVcIlxuXHQgICAgICAgIH0pO1xuXG5cdCAgICAgICAgY29udGV4dFxuXHQgICAgICAgIFx0LmF1dGhvcml6ZSgpXG5cdCAgICAgICAgXHQudGhlbigoKSA9PiB7XG5cdCAgICAgICAgXHRcdHJldHVybiBjb250ZXh0LnByZXNlbnQoKTtcblx0ICAgICAgICBcdH0pXG5cdCAgICAgICAgXHQudGhlbigoc2VsZWN0aW9uKSA9PiB7XG5cdCAgICAgICAgXHRcdHNlbGVjdGlvblswXS5vcHRpb25zLndpZHRoID0gd2lkdGg7XG5cdCAgICAgICAgXHRcdHNlbGVjdGlvblswXS5vcHRpb25zLmhlaWdodCA9IGhlaWdodDtcblxuXHQgICAgICAgIFx0XHRsZXQgaW1hZ2VBc3NldCA9IHNlbGVjdGlvblswXTtcblx0ICAgICAgICBcdFx0XG5cdCAgICAgICAgXHRcdHRoaXMuc2hvd0Nyb3BwZXIoaW1hZ2VBc3NldClcblx0ICAgICAgICBcdFx0XHQudGhlbigocmVzKSA9PiB7XG5cdCAgICAgICAgXHRcdFx0XHRyZXNvbHZlKHJlcylcblx0ICAgICAgICBcdFx0XHR9KS5jYXRjaCgoZXJyKSA9PiB7XG5cdCAgICAgICAgXHRcdFx0XHRyZWplY3QoZXJyKVxuXHQgICAgICAgIFx0XHRcdH0pXG5cdCAgICAgICAgXHRcdFxuXHQgICAgICAgIFx0fSlcblx0ICAgICAgICBcdC5jYXRjaCgoZXJyKSA9PiB7XG5cdCAgICAgICAgXHRcdHJlamVjdChlcnIpO1xuXHQgICAgICAgIFx0fSlcblx0XHR9KVxuXG5cdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cblxuXHRzaG93Q3JvcHBlcihpbWFnZUFzc2V0KSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBzb3VyY2UgPSBuZXcgaW1hZ2VTb3VyY2UuSW1hZ2VTb3VyY2UoKTtcblxuXHRcdFx0c291cmNlLmZyb21Bc3NldChpbWFnZUFzc2V0KS50aGVuKChzcmMpID0+IHtcblx0XHRcdFx0dGhpcy5pbWFnZUNyb3BwZXJcblx0XHRcdFx0XHQuc2hvdyhzcmMsIHRoaXMuaW1hZ2VDcm9wcGVyT3B0KVxuXHRcdFx0XHRcdC50aGVuKGFyZ3MgPT4ge1xuXHRcdFx0XHRcdFx0aWYoYXJncy5pbWFnZSAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKGFyZ3MuaW1hZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgXHRyZWplY3QoXCJjcm9wIGVycm9yXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY2F0Y2goKGVycikgPT4ge1xuXHRcdCAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxuXHRcdCAgICAgICAgICAgIH0pO1xuXHRcdFx0fSlcblx0XHR9KVxuXHR9XG5cblx0ZGVjb2RlVVRGOChzdHIpIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoc3RyKSk7XG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9XG4gICAgfVxuXG5cdGlzSW1hZ2VVcmxDbG91ZGluYXJ5KGltYWdlVXJsKTogYm9vbGVhbiB7XG5cdFx0bGV0IGltZ0FyciA9IGltYWdlVXJsLnRyaW0oKS5zcGxpdCgnLycpO1xuXG5cdFx0cmV0dXJuIGltZ0FyclsyXSA9PT0gJ3Jlcy5jbG91ZGluYXJ5LmNvbSc7XG5cdH1cblxuXHRnZXRJbWFnZUNvdmVyKGltYWdlVXJsKSB7XG5cdFx0aWYodGhpcy5pc0ltYWdlVXJsQ2xvdWRpbmFyeShpbWFnZVVybCkpIHtcblx0XHRcdGxldCBpbWFnZVVybEFyciA9IGltYWdlVXJsLnNwbGl0KCcvJyk7XG5cdCAgICAgICAgbGV0IGltYWdlTmFtZSA9IGltYWdlVXJsQXJyW2ltYWdlVXJsQXJyLmxlbmd0aCAtIDFdO1xuXHQgICAgICAgIGxldCBjbG91ZGluYXJ5QmFzZVVybCA9ICdodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kYmkxYjNrZjAvaW1hZ2UvdXBsb2FkJztcblxuXHQgICAgICAgIHJldHVybiBgJHtjbG91ZGluYXJ5QmFzZVVybH0vd181MDUsaF80NjAsY19maWxsL3YxL3l1ZGFiYW5kcy8ke2ltYWdlTmFtZX1gO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIGltYWdlVXJsO1xuXHRcdH1cblx0fVxuXG5cdGdldEltYWdlRmVlZChpbWFnZVVybCkge1xuXHRcdGlmKHRoaXMuaXNJbWFnZVVybENsb3VkaW5hcnkoaW1hZ2VVcmwpKSB7XG5cdFx0XHRsZXQgaW1hZ2VVcmxBcnIgPSBpbWFnZVVybC5zcGxpdCgnLycpO1xuXHQgICAgICAgIGxldCBpbWFnZU5hbWUgPSBpbWFnZVVybEFycltpbWFnZVVybEFyci5sZW5ndGggLSAxXTtcblx0ICAgICAgICBsZXQgY2xvdWRpbmFyeUJhc2VVcmwgPSAnaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGJpMWIza2YwL2ltYWdlL3VwbG9hZCc7XG5cblx0ICAgICAgICAvLyByZXR1cm4gYCR7Y2xvdWRpbmFyeUJhc2VVcmx9L3dfNDAwLGhfMjUwLGNfcGFkLGJfYmxhY2ssY19maWxsLHFfNTAvdjEveXVkYWJhbmRzLyR7aW1hZ2VOYW1lfWA7XG5cdCAgICAgICAgcmV0dXJuIGAke2Nsb3VkaW5hcnlCYXNlVXJsfS93XzcwMCxjX2ZpbGwscV81MC92MS95dWRhYmFuZHMvJHtpbWFnZU5hbWV9YDtcblx0ICAgICAgICAvLyByZXR1cm4gYCR7Y2xvdWRpbmFyeUJhc2VVcmx9L3dfNDAwLGNfZmlsbCxxXzUwL3YxL3l1ZGFiYW5kcy9wcm9qZWN0XzRmNjdjYzZkLWE0ZjctNDMyYy05MzE3LWE1ZjhmNWZjZGI5ZS5qcGdgO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIGltYWdlVXJsO1xuXHRcdH1cblx0fVxuXG5cdGdldEltYWdlUHJvZmlsZShpbWFnZVVybCkge1xuXHRcdGlmKHRoaXMuaXNJbWFnZVVybENsb3VkaW5hcnkoaW1hZ2VVcmwpKSB7XG5cdFx0XHRsZXQgaW1hZ2VVcmxBcnIgPSBpbWFnZVVybC5zcGxpdCgnLycpO1xuXHQgICAgICAgIGxldCBpbWFnZU5hbWUgPSBpbWFnZVVybEFycltpbWFnZVVybEFyci5sZW5ndGggLSAxXTtcblx0ICAgICAgICBsZXQgY2xvdWRpbmFyeUJhc2VVcmwgPSAnaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGJpMWIza2YwL2ltYWdlL3VwbG9hZCc7XG5cblx0ICAgICAgICByZXR1cm4gYCR7Y2xvdWRpbmFyeUJhc2VVcmx9L3dfMTgwLGhfMTgwLGNfc2NhbGUvdjEveXVkYWJhbmRzLyR7aW1hZ2VOYW1lfWA7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gaW1hZ2VVcmw7XG5cdFx0fVxuXHR9XG5cblx0Z2V0UHJvamVjdE1hbmFnZVByb2ZpbGUoaW1hZ2VVcmwpIHtcblx0XHRpZih0aGlzLmlzSW1hZ2VVcmxDbG91ZGluYXJ5KGltYWdlVXJsKSkge1xuXHRcdFx0bGV0IGltYWdlVXJsQXJyID0gaW1hZ2VVcmwuc3BsaXQoJy8nKTtcblx0ICAgICAgICBsZXQgaW1hZ2VOYW1lID0gaW1hZ2VVcmxBcnJbaW1hZ2VVcmxBcnIubGVuZ3RoIC0gMV07XG5cdCAgICAgICAgbGV0IGNsb3VkaW5hcnlCYXNlVXJsID0gJ2h0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RiaTFiM2tmMC9pbWFnZS91cGxvYWQnO1xuXG5cdCAgICAgICAgcmV0dXJuIGAke2Nsb3VkaW5hcnlCYXNlVXJsfS93XzIwMCxoXzIwMCxjX3RodW1iLGdfZmFjZS92MS95dWRhYmFuZHMvJHtpbWFnZU5hbWV9YDtcblx0XHR9ZWxzZSB7XG5cdFx0XHRyZXR1cm4gaW1hZ2VVcmw7XG5cdFx0fVxuXHR9XG5cblx0Z2V0SW1hZ2VQcm9maWxlVjIoaW1hZ2VVcmwpIHtcblx0XHRpZih0aGlzLmlzSW1hZ2VVcmxDbG91ZGluYXJ5KGltYWdlVXJsKSkge1xuXHRcdFx0bGV0IGltYWdlVXJsQXJyID0gaW1hZ2VVcmwuc3BsaXQoJy8nKTtcblx0ICAgICAgICBsZXQgaW1hZ2VOYW1lID0gaW1hZ2VVcmxBcnJbaW1hZ2VVcmxBcnIubGVuZ3RoIC0gMV07XG5cdCAgICAgICAgbGV0IGNsb3VkaW5hcnlCYXNlVXJsID0gJ2h0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RiaTFiM2tmMC9pbWFnZS91cGxvYWQnO1xuXG5cdCAgICAgICAgcmV0dXJuIGAke2Nsb3VkaW5hcnlCYXNlVXJsfS93XzE4MCxjX3NjYWxlL3YxL3l1ZGFiYW5kcy8ke2ltYWdlTmFtZX1gO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIGltYWdlVXJsO1xuXHRcdH1cblx0fVxuXG5cdGdldEltYWdlUGF0aChpbWFnZUFzc2V0KSB7XG5cdFx0bGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRpbWFnZVNvdXJjZS5mcm9tQXNzZXQoaW1hZ2VBc3NldClcblx0ICAgICAgICAgICAgLnRoZW4oaW1nU3JjID0+IHtcblx0ICAgICAgICAgICAgICAgIGxldCBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XG5cdCAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IGZzLnBhdGguam9pbihkb2N1bWVudHMucGF0aCwgYCR7dGhpcy5nZW5lcmF0ZVVJRCgpfS5qcGdgKTtcblxuXHQgICAgICAgICAgICAgICAgbGV0IHNhdmVkID0gaW1nU3JjLnNhdmVUb0ZpbGUocGF0aCwgXCJqcGdcIik7XG5cblx0ICAgICAgICAgICAgICAgIGlmIChzYXZlZCkge1xuXHRcdFx0XHQgICAgICAgIHJlc29sdmUocGF0aClcblx0XHRcdFx0ICAgIH1lbHNle1xuXHRcdFx0XHQgICAgXHRyZWplY3QoJ0Vycm9yIGluIHNhdmluZyBpbWFnZScpXG5cdFx0XHRcdCAgICB9XG5cdCAgICAgICAgICAgIH0pO1xuXHRcdH0pXG5cblx0XHRyZXR1cm4gcHJvbWlzZTtcblx0fVxuXG5cdGdldEltYWdlU291cmNlUGF0aChpbWdTcmMpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcblx0ICAgICAgICBsZXQgcGF0aCA9IGZzLnBhdGguam9pbihkb2N1bWVudHMucGF0aCwgYCR7dGhpcy5nZW5lcmF0ZVVJRCgpfS5qcGdgKTtcblxuXHQgICAgICAgIGxldCBzYXZlZCA9IGltZ1NyYy5zYXZlVG9GaWxlKHBhdGgsIFwianBnXCIpO1xuXG5cdCAgICAgICAgaWYgKHNhdmVkKSB7XG5cdFx0ICAgICAgICByZXNvbHZlKHBhdGgpXG5cdFx0ICAgIH1lbHNle1xuXHRcdCAgICBcdHJlamVjdCgnRXJyb3IgaW4gc2F2aW5nIGltYWdlJylcblx0XHQgICAgfVxuXHRcdH0pXG5cdH1cblxuXHRnZW5lcmF0ZVVJRCgpIHtcblx0XHRsZXQgZmlyc3RQYXJ0ID0gKE1hdGgucmFuZG9tKCkgKiA0NjY1NikgfCAwO1xuICAgIFx0bGV0IHNlY29uZFBhcnQgPSAoTWF0aC5yYW5kb20oKSAqIDQ2NjU2KSB8IDA7XG5cbiAgICBcdGxldCBmaXJzdFN0ciA9IChcIjAwMFwiICsgZmlyc3RQYXJ0LnRvU3RyaW5nKDM2KSkuc2xpY2UoLTMpO1xuICAgIFx0bGV0IHNlY29uZFN0ciA9IChcIjAwMFwiICsgc2Vjb25kUGFydC50b1N0cmluZygzNikpLnNsaWNlKC0zKTtcblxuICAgIFx0cmV0dXJuIGZpcnN0U3RyICsgc2Vjb25kU3RyO1xuXHR9XG5cblx0dXBsb2FkSW1hZ2UoaWQsIHR5cGUsIGltYWdlU291cmNlKSB7XG5cblx0XHRsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFxuXHRcdFx0dGhpcy5nZXRJbWFnZVNvdXJjZVBhdGgoaW1hZ2VTb3VyY2UpXG5cdFx0XHRcdC50aGVuKChwYXRoOiBhbnkpID0+IHtcblx0XHRcdFx0XHRsZXQgc2Vzc2lvbiA9IGJnaHR0cC5zZXNzaW9uKCdpbWFnZS11cGxvYWQnKTtcblx0XHRcdFx0XHRsZXQgZmlsZU5hbWVBcnIgPSBwYXRoLnNwbGl0KCcvJyk7XG5cdFx0XHRcdFx0bGV0IGZpbGVOYW1lID0gZmlsZU5hbWVBcnJbZmlsZU5hbWVBcnIubGVuZ3RoIC0gMV07XG5cdFx0XHRcdFx0bGV0IGltYWdlVXJsID0gcGF0aDtcblx0XHRcdFx0XHRsZXQgc2hvdWxkRmFpbCA9IGZhbHNlO1xuXHRcdCAgICAgICAgXHRsZXQgdGFzazogYmdodHRwLlRhc2s7XHRcblxuXHRcdCAgICAgICAgXHRsZXQgYXBpQmFzZVVybCA9IHRoaXMuX2NvbmZpZ1NlcnZpY2UuZ2V0QXBpQmFzZVVybCgpO1xuXG5cdFx0ICAgICAgICBcdGxldCByZXF1ZXN0ID0ge1xuXHRcdFx0ICAgICAgICAgICAgdXJsOiBgJHthcGlCYXNlVXJsfS9maWxlL3VwbG9hZF9jbG91ZGluYXJ5YCxcblx0XHRcdCAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0ICAgICAgICAgICAgaGVhZGVyczoge1xuXHRcdFx0ICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsXG5cdFx0XHQgICAgICAgICAgICAgICAgXCJGaWxlLU5hbWVcIjogZmlsZU5hbWUgXG5cdFx0XHQgICAgICAgICAgICB9LFxuXHRcdFx0ICAgICAgICAgICAgZGVzY3JpcHRpb246ICd0ZXN0IHVwbG9hZCdcblx0XHRcdCAgICAgICAgfTtcblxuXHRcdFx0ICAgICAgICBpZiAoc2hvdWxkRmFpbCkge1xuXHRcdFx0ICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzW1wiU2hvdWxkLUZhaWxcIl0gPSB0cnVlO1xuXHRcdFx0ICAgICAgICB9XG5cblx0XHRcdCAgICAgICAgbGV0IHBhcmFtcyA9IFtcblx0XHRcdCAgICAgICAgICAgIHsgbmFtZTogJ3R5cGUnLCB2YWx1ZTogdHlwZSB9LFxuXHRcdFx0ICAgICAgICAgICAgeyBuYW1lOiAnaWQnLCB2YWx1ZTogaWQudG9TdHJpbmcoKSB9LFxuXHRcdFx0ICAgICAgICAgICAgeyBuYW1lOiAnZmlsZScsIGZpbGVuYW1lOiBpbWFnZVVybCB9IFxuXHRcdFx0ICAgICAgICBdO1xuXG5cdFx0XHQgICAgICAgIHRhc2sgPSBzZXNzaW9uLm11bHRpcGFydFVwbG9hZChwYXJhbXMsIHJlcXVlc3QpO1xuXG5cdFx0XHQgICAgICAgIHRhc2sub24oXCJlcnJvclwiLCAoZSkgPT4ge1xuXHRcdFx0ICAgICAgICAgICAgcmVqZWN0KGUpXG5cdFx0XHQgICAgICAgIH0pO1xuXG5cdFx0XHQgICAgICAgIHRhc2sub24oXCJyZXNwb25kZWRcIiwgKGUpID0+IHtcblx0XHRcdCAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGUuZGF0YSk7XG5cblx0XHRcdCAgICAgICAgICAgIGlmKHJlc3VsdC5jb2RlID09PSA1MDAgJiYgcmVzdWx0LmVycm9yLmNvZGUgPT09IFwiRV9FWENFRURTX1VQTE9BRF9MSU1JVFwiKXtcblx0XHRcdCAgICAgICAgICAgIFx0cmVzb2x2ZSh7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnRmlsZSBleGNlZWRlZCB1cGxvYWQgbGltaXQgb2YgMTBNQicgfSk7XG5cdFx0XHQgICAgICAgICAgICB9ZWxzZXtcblx0XHRcdCAgICAgICAgICAgIFx0bGV0IGZpbGUgPSBmcy5GaWxlLmZyb21QYXRoKHBhdGgpO1xuXHRcdFx0ICAgICAgICAgICAgXHRmaWxlLnJlbW92ZSgpLnRoZW4oZmlsZVJlcyA9PiB7XG5cdFx0XHQgICAgICAgICAgICAgICAgXHRyZXNvbHZlKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogcmVzdWx0LmRhdGEuaW1hZ2VVcmwgfSk7XG5cdFx0XHQgICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICByZWplY3QoJ0NvdWxkIG5vdCBkZWxldGUgZmlsZScpO1xuXHRcdFx0ICAgICAgICAgICAgICAgIH0pO1xuXHRcdFx0ICAgICAgICAgICAgXHRcblx0XHRcdCAgICAgICAgICAgIH1cblx0XHRcdCAgICAgICAgfSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaCgoZXJyKSA9PiB7XG5cdFx0XHRcdFx0cmVqZWN0KGVycilcblx0XHRcdFx0fSlcblx0XHR9KVxuXG5cdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cblxuXHRhc3luYyB1cGRhdGVVc2VyRGV2aWNlTG9nb3V0U3RhdHVzKCkge1xuXHRcdGxldCB1c2VySWQgPSB0aGlzLl91c2VyU2VydmljZS5nZXRDdXJyZW50VXNlcklkKCk7XG5cblx0XHR0aGlzLnNob3dMb2FkZXIoJ0xvZ2dpbmcgb3V0Li4uJyk7XG5cblx0XHR0cnl7XG5cdFx0XHRsZXQgcmVzID0gYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UudXBkYXRlVXNlckRldmljZUxvZ291dFN0YXR1cyh1c2VySWQpO1xuXG5cdFx0XHR0aGlzLmhpZGVMb2FkZXIoKTtcblx0XHRcdHRoaXMuX3VzZXJTZXJ2aWNlLnJlbW92ZUN1cnJlbnRVc2VyKCk7XG5cdFx0XHR0aGlzLnVucmVnaXN0ZXJUb2tlbigpO1xuXHRcdFx0dGhpcy5nZXRSb3V0ZU9wdGlvbnMoKS5jbGVhckhpc3RvcnkgPSB0cnVlO1xuXHRcdFx0dGhpcy5nZXRSb3V0ZU9wdGlvbnMoKS50cmFuc2l0aW9uLm5hbWUgPSAnc2xpZGVSaWdodCc7XG5cdFx0XHR0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2hvbWUnXSwgdGhpcy5nZXRSb3V0ZU9wdGlvbnMoKSlcblx0XHR9Y2F0Y2goZSkge1xuXHRcdFx0dGhpcy5oaWRlTG9hZGVyKCk7XG5cdFx0XHQvLyBUT0RPIDogRE8gU09NRSBMT0dJQ1xuXHRcdH1cblx0fVxuXG59XG5cbiJdfQ==