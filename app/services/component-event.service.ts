import { Injectable, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { LoadingIndicator } from "nativescript-loading-indicator";
import { RouterExtensions } from "nativescript-angular/router";
import { takePicture, requestPermissions } from 'nativescript-camera';
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
import { TNSFancyAlert } from 'nativescript-fancyalert';
import { ImageCropper } from "nativescript-imagecropper";

// OTHERS
import * as moment from "moment";
import * as httpModule from "http";
import * as dialogs from "ui/dialogs";
import * as fs from "tns-core-modules/file-system";
import * as appSettings from "application-settings";
import * as bghttp from "nativescript-background-http";
import * as imagepicker from "nativescript-imagepicker";
import * as imageSource from "tns-core-modules/image-source";
import * as pushPlugin from "nativescript-push-notifications";
import * as connectivityModule from "tns-core-modules/connectivity";
import { LocalNotifications } from "nativescript-local-notifications";

// SERVICES
import { UserService } from "./user.service";
import { ConfigService } from "./config.service";

@Injectable()
export class ComponentEventService {
	
	@Output() titleBar: EventEmitter<string> = new EventEmitter();
	@Output() hasNotif: EventEmitter<boolean> = new EventEmitter();
	@Output() notification: EventEmitter<string> = new EventEmitter();
	@Output() searchQuery: EventEmitter<string> = new EventEmitter();
	@Output() isTourDone: EventEmitter<boolean> = new EventEmitter();
	@Output() isProjectDone: EventEmitter<boolean> = new EventEmitter();
	@Output() isUserRemoved: EventEmitter<boolean> = new EventEmitter();
	@Output() selectedStudent: EventEmitter<any> = new EventEmitter();

	feedback: Feedback = new Feedback();
	imageCropper: ImageCropper = new ImageCropper();
	loader: any = new LoadingIndicator();

	vcRef: any;

	imageCropperOpt: any = { width: 400, height: 400, keepAspectRatio: true, lockSquare: true };

	static supportedTimezones = [
		'America/Guatemala', 
		'Africa/Harare'
	];

	constructor(
		private _userService: UserService,
		private _configService: ConfigService,
		private _routerExtensions: RouterExtensions,
	) {}

	/*
	* NOTIFICATIONS
	*/
	localNotifCallBack() {
		LocalNotifications.addOnMessageReceivedCallback(notificationData => {
			console.log("SNAUROT")
			console.log(notificationData)
		}).then(() => console.log("Listener added!!!"))
	}

	hasScheduledNotif(projectId) {
		return new Promise((resolve) => {
			LocalNotifications.getScheduledIds().then((ids) => {
				if(ids.length > 0) {
					let notifId = ids[0];
					let notifProjectId = notifId.toString().split('.');

					if(projectId == notifProjectId) {
						resolve(true);
					}else {
						resolve(false);
					}

				}else {
					resolve(false);
				}
			})
		})
	}

	removeAllLocalNotifications() {
		LocalNotifications.cancelAll();
	}

	scheduleNotification(data) {
		console.log("Schedule notif!!")
		console.log("PROJECT ID: " + data.projectId)
		console.log("DATE START: " + data.dateStart)
		console.log("DATE END: " + data.dateEnd)
		let dateStart = new Date(data.dateStart);
		let dateEnd = new Date(data.dateEnd);

		let before14days = new Date(dateStart.getTime() - ((14 * 24 * 60 * 60 * 1000))),
			before7days = new Date(dateStart.getTime() - ((7 * 24 * 60 * 60 * 1000))),
			before2days = new Date(dateStart.getTime() - ((2 * 24 * 60 * 60 * 1000))),
			after3days = new Date(dateStart.getTime() + ((3 * 24 * 60 * 60 * 1000))),
			after7days = new Date(dateEnd.getTime() - ((4 * 24 * 60 * 60 * 1000))),
			after10days = new Date(dateEnd.getTime() - ((1 * 24 * 60 * 60 * 1000))),
			projectDone = new Date(dateEnd.getTime() + ((1 * 24 * 60 * 60 * 1000)));

		LocalNotifications.schedule([
			{
				id: parseFloat(`${data.projectId}.1001`),
				title: "100 Seconds from now!",
				body: "Make sure to order your Yuda Bands to start your sales!",
				at: new Date(new Date().getTime() + (10 * 1000)), // 10 seconds from now
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
		]).then(() => console.log("successfully scheduled notifs"), 
		(error) => console.log("scheduling error: " + error))
	}
	/*
	* END OF NOTIFICATIONS
	*/

	/*
	* LISTENERS
	*/
	receivedNotification(data) {
		this.notification.emit(data);
	}

	hasNotification(hasNotif) {
		this.hasNotif.emit(hasNotif);
	}

	titleBarChanged(name) {
		this.titleBar.emit(name);
	}

	searchBarChanged(searchQuery) {
		this.searchQuery.emit(searchQuery);
	}

	tourChanged(isTourDone) {
		this.isTourDone.emit(isTourDone);
	}

	projectChanged(isProjectDone) {
		this.isProjectDone.emit(isProjectDone);
	}

	userRemoval(isUserRemoved) {
		this.isUserRemoved.emit(isUserRemoved);
	}

	selectStudent(data) {
		this.selectedStudent.emit(data);
	}
	/*
	* END OF LISTENERS
	*/
	getYoutubeId(url) {
		let id = '';

		url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

		if(url[2] !== undefined) {
		    id = url[2].split(/[^0-9a-z_\-]/i);
		    id = id[0];
		}else {
			id = url;
		}

		return id;
	}

	setModalVcRef(vcRef) {
		this.vcRef = vcRef;
	}


	getModalOptions(context, hasTransition = true, fullscreen = true, animated = true) {
		let opt = {
			context: context,
			fullscreen: fullscreen,
			viewContainerRef: this.vcRef,
			animated: animated,
			transition: {
                name: "slideTop",
                duration: 200,
                curve: "ease"
            }
		}

		if(!hasTransition) delete opt.transition;

		return opt;
	}

	getRouteOptions() {
		return {
			animated: true,
			clearHistory: false,
			transition: {
				name: 'slideLeft',
				duration: 0,
				curve: 'ease'
			},
			queryParams: {}
		}
	}


	checkIfLinkIsValid(url) {
		httpModule.getFile(url)
			.then((resultFile) => {
			    console.log(resultFile)
			}, (e) => {
				console.log("ERROR:::")
				console.log(e)
			});
	}

	hasInternetConnection() {
		let connType = connectivityModule.getConnectionType();
		let none = connectivityModule.connectionType.none;

		return (connType === none)? false : true;
	}

	objIsEmpty(obj) {
		for(var key in obj) {
			if(obj.hasOwnProperty(key)) {
				return false;
			}
		}

		return true;
	}

	/*
	* ALERTS
	*/
	showAlert(title, message) {
		dialogs.alert({
		    title: title,
		    message: message,
		    okButtonText: 'OK'
		}).then(() => {});
	}

	showPhoneAlert() {
		return new Promise((resolve, reject) => {
			dialogs.action({
				message: 'Options',
				cancelButtonText: 'Cancel',
				actions: ['Call', 'Text']
			}).then((result) => {
				resolve(result)
			})
		})
	}

	showItemConfirmationAlert() {
		return new Promise((resolve, reject) => {
			dialogs.alert({
			    title: 'Success!',
			    message: 'Number of Bands confirmed. You can now start with your project. Goodluck!',
			    okButtonText: 'Go to project'
			}).then(() => {
				resolve(true)
			});
		})
	}

	showUserRemovalAlert() {
		return new Promise((resolve, reject) => {
			dialogs.alert({
			    title: 'Ooops!',
			    message: 'Your account has been removed by the project manager. You will be redirected to the home page.',
			    okButtonText: 'OK'
			}).then(() => {
				resolve(true)
			});
		})
	}

	showAlertStartProject() {
		let cachedData = this._userService.getStartProjectData();

		return new Promise((resolve, reject) => {
			let noCachedMsg = 'You don\'t have a project. Why not create one?';
			let hasCachedMsg = 'It looks like you haven\'t finished the sign up process. Would you like to complete that now?';

			dialogs.confirm({
	            title: 'Ooops!',
	            message: (this.objIsEmpty(cachedData))? noCachedMsg : hasCachedMsg,
	            okButtonText: (this.objIsEmpty(cachedData))? 'Create' : 'Continue',
	            cancelButtonText: 'Cancel',
	        }).then(result => {
	            if(result) {
	            	resolve(true)
	            }else {
	            	reject(false)
	            }
	        });
		})
	}

	showRefreshAlert() {
		return new Promise((resolve, reject) => {
			dialogs.alert({
			    title: 'Ooops!',
			    message: 'Unable to get your skype schedule. You can try refreshing it.',
			    okButtonText: 'Refresh'
			}).then(() => {
				resolve(true)
			});
		})
	}

	showAnauthorizedAlert(route) {
		dialogs.alert({
			title: 'Session Expired',
			message: 'Please re-login to renew your session',
			okButtonText: 'OK'
		}).then(() => {
			this.updateUserDeviceLogoutStatus();
		})
	}

	showBandsConfirmationAlert(totalBands, dateStart) {
		return new Promise((resolve, reject) => {
			let date = new Date(dateStart);

			date.setDate(date.getDate() - 12);

			let dateStr = moment(date).format('ll');

			dialogs.alert({
				title: 'Confirm',
				message: `You are about to order ${totalBands} bands for your school which will be shipped on ${dateStr}.`,
				okButtonText: 'OK'
			}).then(() => {
				resolve(true)
			})
		})
	}
	/*
	* END OF ALERTS
	*/
	saveProjectManager(data) {
		appSettings.setString("project-manager", JSON.stringify(data));
	}

	getProjectManager() {
		let data = appSettings.getString("project-manager");
		return (data)? JSON.parse(data) : {};
	}

	removeProjectManager() {
		appSettings.remove("project-manager");
	}

	saveSelectedStudent(data) {
		appSettings.setString("selected-student", JSON.stringify(data));
	}

	getSelectedStudent() {
		let data = appSettings.getString("selected-student");
		return (data)? JSON.parse(data) : {};
	}

	removeSelectedStudent() {
		appSettings.remove("selected-student");
	}

	unregisterToken() {
        pushPlugin.unregister(
            (result) => {}, 
            (err) => { console.log(err) }, 
            this._configService.pushSettings()
        );
    }

	showFancyAlertInfo(title, message) {
		TNSFancyAlert.showInfo(title, message, 'Ok');
	}

	validateEmail(email) {
		let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
		let valid = emailRegEx.test(email);

        return valid;
	}

	validatePhoneNumber(number) {
		let phoneRegEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

		return phoneRegEx.test(number);
	}

	showLoader(message) {
		let options = {
	        message: message,
	        progress: 0.65,
	        android: {},
	        ios: {}
	    };
		this.loader.show(options);
	}

	hideLoader() {
		this.loader.hide();
	}

	showSuccessFeedback(title, message) {
		this.feedback.success({
        	title: title,
    		message: message,
        	duration: 3000,
            backgroundColor: new Color("#00a9ec"),
        	onTap: () => { console.log("showSuccess tapped"); }
        });
	}

	showErrorFeedback(title, message) {
		this.feedback.show({
            title: title,
            message: message,
            duration: 2000,
            position: FeedbackPosition.Bottom,
            type: FeedbackType.Error,
            onTap: () => { console.log("showErrorBottom tapped"); }
        });
	}

	changeImage(height?, width?) {

		height = (height)? height : 100;
		width  = (width)? width : 100;

		let promise = new Promise((resolve, reject) => {
			dialogs.action({
	            cancelButtonText: "Cancel",
	            actions: ["Choose from photos", "Open Camera"]
	        }).then(result => {

	            if(result == 'Choose from photos'){
	                this.showGallery(height, width)
	                	.then((res) => {
	                		resolve(res);
	                	})
	                	.catch((err) => {
	                		reject(err);
	                	})

	            }else if(result == 'Open Camera'){
	                this.showCamera(height, width)
	                	.then((res) => {
	                		resolve(res)
	                	})
	                	.catch((err) => {
	                		reject(err)
	                	})
	            }
	        });
		})

		return promise;
	}

	showCamera(height?, width?) {

		let promise = new Promise((resolve, reject) => {
			requestPermissions()
				.then(() => {
					takePicture({ width: width, height: height, keepAspectRatio: true, saveToGallery: false })
						.then((imageAsset: any) => {
							
							this.showCropper(imageAsset)
			        			.then((res) => {
			        				resolve(res)
			        			}).catch((err) => {
			        				reject(err)
			        			})

						}, (err) => {
							reject(err)
						})
				}, () => {
					reject('Permission rejected')
				})
			
		})

		return promise;
	}

	showGallery(height?, width?) {
		
		let promise = new Promise((resolve, reject) => {

			let context = imagepicker.create({
	            mode: "single"
	        });

	        context
	        	.authorize()
	        	.then(() => {
	        		return context.present();
	        	})
	        	.then((selection) => {
	        		selection[0].options.width = width;
	        		selection[0].options.height = height;

	        		let imageAsset = selection[0];
	        		
	        		this.showCropper(imageAsset)
	        			.then((res) => {
	        				resolve(res)
	        			}).catch((err) => {
	        				reject(err)
	        			})
	        		
	        	})
	        	.catch((err) => {
	        		reject(err);
	        	})
		})

		return promise;
	}

	showCropper(imageAsset) {
		return new Promise((resolve, reject) => {
			let source = new imageSource.ImageSource();

			source.fromAsset(imageAsset).then((src) => {
				this.imageCropper
					.show(src, this.imageCropperOpt)
					.then(args => {
						if(args.image !== null) {
							resolve(args.image);
                        }else {
                        	reject("crop error")
                        }
					})
					.catch((err) => {
		                reject(err)
		            });
			})
		})
	}

	decodeUTF8(str) {
        try{
            return decodeURIComponent(escape(str));
        }catch(e) {
            return str;
        }
    }

	isImageUrlCloudinary(imageUrl): boolean {
		let imgArr = imageUrl.trim().split('/');

		return imgArr[2] === 'res.cloudinary.com';
	}

	getImageCover(imageUrl) {
		if(this.isImageUrlCloudinary(imageUrl)) {
			let imageUrlArr = imageUrl.split('/');
	        let imageName = imageUrlArr[imageUrlArr.length - 1];
	        let cloudinaryBaseUrl = 'https://res.cloudinary.com/dbi1b3kf0/image/upload';

	        return `${cloudinaryBaseUrl}/w_505,h_460,c_fill/v1/yudabands/${imageName}`;
		}else{
			return imageUrl;
		}
	}

	getImageFeed(imageUrl) {
		if(this.isImageUrlCloudinary(imageUrl)) {
			let imageUrlArr = imageUrl.split('/');
	        let imageName = imageUrlArr[imageUrlArr.length - 1];
	        let cloudinaryBaseUrl = 'https://res.cloudinary.com/dbi1b3kf0/image/upload';

	        // return `${cloudinaryBaseUrl}/w_400,h_250,c_pad,b_black,c_fill,q_50/v1/yudabands/${imageName}`;
	        return `${cloudinaryBaseUrl}/w_700,c_fill,q_50/v1/yudabands/${imageName}`;
	        // return `${cloudinaryBaseUrl}/w_400,c_fill,q_50/v1/yudabands/project_4f67cc6d-a4f7-432c-9317-a5f8f5fcdb9e.jpg`;
		}else{
			return imageUrl;
		}
	}

	getImageProfile(imageUrl) {
		if(this.isImageUrlCloudinary(imageUrl)) {
			let imageUrlArr = imageUrl.split('/');
	        let imageName = imageUrlArr[imageUrlArr.length - 1];
	        let cloudinaryBaseUrl = 'https://res.cloudinary.com/dbi1b3kf0/image/upload';

	        return `${cloudinaryBaseUrl}/w_180,h_180,c_scale/v1/yudabands/${imageName}`;
		}else{
			return imageUrl;
		}
	}

	getProjectManageProfile(imageUrl) {
		if(this.isImageUrlCloudinary(imageUrl)) {
			let imageUrlArr = imageUrl.split('/');
	        let imageName = imageUrlArr[imageUrlArr.length - 1];
	        let cloudinaryBaseUrl = 'https://res.cloudinary.com/dbi1b3kf0/image/upload';

	        return `${cloudinaryBaseUrl}/w_200,h_200,c_thumb,g_face/v1/yudabands/${imageName}`;
		}else {
			return imageUrl;
		}
	}

	getImageProfileV2(imageUrl) {
		if(this.isImageUrlCloudinary(imageUrl)) {
			let imageUrlArr = imageUrl.split('/');
	        let imageName = imageUrlArr[imageUrlArr.length - 1];
	        let cloudinaryBaseUrl = 'https://res.cloudinary.com/dbi1b3kf0/image/upload';

	        return `${cloudinaryBaseUrl}/w_180,c_scale/v1/yudabands/${imageName}`;
		}else{
			return imageUrl;
		}
	}

	getImagePath(imageAsset) {
		let promise = new Promise((resolve, reject) => {
			imageSource.fromAsset(imageAsset)
	            .then(imgSrc => {
	                let documents = fs.knownFolders.documents();
	                let path = fs.path.join(documents.path, `${this.generateUID()}.jpg`);

	                let saved = imgSrc.saveToFile(path, "jpg");

	                if (saved) {
				        resolve(path)
				    }else{
				    	reject('Error in saving image')
				    }
	            });
		})

		return promise;
	}

	getImageSourcePath(imgSrc) {
		return new Promise((resolve, reject) => {
			let documents = fs.knownFolders.documents();
	        let path = fs.path.join(documents.path, `${this.generateUID()}.jpg`);

	        let saved = imgSrc.saveToFile(path, "jpg");

	        if (saved) {
		        resolve(path)
		    }else{
		    	reject('Error in saving image')
		    }
		})
	}

	generateUID() {
		let firstPart = (Math.random() * 46656) | 0;
    	let secondPart = (Math.random() * 46656) | 0;

    	let firstStr = ("000" + firstPart.toString(36)).slice(-3);
    	let secondStr = ("000" + secondPart.toString(36)).slice(-3);

    	return firstStr + secondStr;
	}

	uploadImage(id, type, imageSource) {

		let promise = new Promise((resolve, reject) => {
			
			this.getImageSourcePath(imageSource)
				.then((path: any) => {
					let session = bghttp.session('image-upload');
					let fileNameArr = path.split('/');
					let fileName = fileNameArr[fileNameArr.length - 1];
					let imageUrl = path;
					let shouldFail = false;
		        	let task: bghttp.Task;	

		        	let apiBaseUrl = this._configService.getApiBaseUrl();

		        	let request = {
			            url: `${apiBaseUrl}/file/upload_cloudinary`,
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

			        let params = [
			            { name: 'type', value: type },
			            { name: 'id', value: id.toString() },
			            { name: 'file', filename: imageUrl } 
			        ];

			        task = session.multipartUpload(params, request);

			        task.on("error", (e) => {
			            reject(e)
			        });

			        task.on("responded", (e) => {
			            let result = JSON.parse(e.data);

			            if(result.code === 500 && result.error.code === "E_EXCEEDS_UPLOAD_LIMIT"){
			            	resolve({ success: false, message: 'File exceeded upload limit of 10MB' });
			            }else{
			            	let file = fs.File.fromPath(path);
			            	file.remove().then(fileRes => {
			                	resolve({ success: true, data: result.data.imageUrl });
			                }, error => {
			                    reject('Could not delete file');
			                });
			            	
			            }
			        });
				})
				.catch((err) => {
					reject(err)
				})
		})

		return promise;
	}

	async updateUserDeviceLogoutStatus() {
		let userId = this._userService.getCurrentUserId();

		this.showLoader('Logging out...');

		try{
			let res = await this._userService.updateUserDeviceLogoutStatus(userId);

			this.hideLoader();
			this._userService.removeCurrentUser();
			this.unregisterToken();
			this.getRouteOptions().clearHistory = true;
			this.getRouteOptions().transition.name = 'slideRight';
			this._routerExtensions.navigate(['/home'], this.getRouteOptions())
		}catch(e) {
			this.hideLoader();
			// TODO : DO SOME LOGIC
		}
	}

}

