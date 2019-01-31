import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { ConfigService } from "./config.service";

import * as httpModule from "http";
import * as appSettings from "application-settings"; 
import * as platformModule from "tns-core-modules/platform";
import * as pushPlugin from "nativescript-push-notifications";
import { alert, confirm } from "tns-core-modules/ui/dialogs";

import { messaging, Message } from "nativescript-plugin-firebase/messaging";

@Injectable()
export class UserService {

	baseUrl: string = '';
	
	private static APP_REGISTERED_FOR_NOTIFICATIONS = "APP_REGISTERED_FOR_NOTIFICATIONS";

	constructor(
		private http: HttpClient,
		private _configService: ConfigService
	) {
		this.baseUrl = this._configService.getApiBaseUrl();
	}

	getCurrentUserId() {
		let currentUser = JSON.parse(appSettings.getString('currentUser') || '{}');

		if(currentUser.data) {
			return currentUser.data.userId;
		}else {
			return 0;
		}
	}

	getTourStatus() {
		return appSettings.getBoolean('isTourDone', false);
	}

	getCurrentUser() {
		return JSON.parse(appSettings.getString('currentUser') || '{}');
	}

	getStartProjectData() {
		return JSON.parse(appSettings.getString('startProjectData') || '{}')
	}

	saveStartProjectData(data) {
		appSettings.setString('startProjectData', JSON.stringify(data));
	}

	saveTourStatus(status) {
		appSettings.setBoolean('isTourDone', status)
	}

	saveCurrentUser(user) {
		appSettings.setString('currentUser', JSON.stringify(user));
	}

	removeStartProjectData() {
		appSettings.remove('startProjectData')
	}

	removeTourStatus() {
		appSettings.remove('isTourDone');
	}

	removeCurrentUser() {
		appSettings.remove('currentUser');
	}

	removeStartProjectCurrentProgress() {
		appSettings.remove('startProjectProgress');
	}

	registerToken() { // DEPRECATED
		let iosSettings = this._configService.pushSettings();

		let promise = new Promise((resolve, reject) => {

			pushPlugin.register(iosSettings, (token) => {
				if(iosSettings.interactiveSettings) {
					pushPlugin.registerUserNotificationSettings(() => {
						resolve(token);
					}, (err) => {
						reject('Interactive push error: '+err)
					})
				}

			}, (err) => {
				reject(err)
			})
		});

		return promise;
	}
	
	registerTokenV2() {
		// return new Promise((resolve, reject) => {
		// 	this.doRegisterForPushNotifications().then(() => {
		// 		messaging.getCurrentPushToken()
		// 			.then((token) => resolve(token))
		// 			.catch((err) => reject(err))
		// 	}).catch(err => reject(err))
		// })
		return new Promise((resolve, reject) => {
			messaging.registerForPushNotifications({
				onPushTokenReceivedCallback: (token: string): void => {
					alert({
						title: 'TOKEN!!!',
						message: token,
						okButtonText: "OK!!!"
					})
				},
			  
				onMessageReceivedCallback: (message: Message) => {
				  console.log("Push message received: " + message.title);
				}
			}).then(() => resolve("Registered for push"));
		})
	}

	doRegisterForPushNotifications() {
		return new Promise((resolve, reject) => {
			messaging.registerForPushNotifications({
				onPushTokenReceivedCallback: (token: string): void => { console.log("token notification") },
				onMessageReceivedCallback: (message: Message) => { console.log("onMessageReceivedCallback") },
				showNotifications: true,
				showNotificationsWhenInForeground: true
			}).then(() => resolve(true)).catch(err => reject(err));
		})
	}

	registerUserDevice(userId, deviceId) {
		let promise = new Promise((resolve, reject) => {
			let data = {
				userId: userId,
				deviceId: deviceId
			}

			httpModule.request({
				url: `${this.baseUrl}/users/devices`,
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				content: JSON.stringify(data)
			}).then((res: any) => {
				resolve(res.content.toJSON())
			}).catch((err: any) => {
				reject(err)
			})
		});

		return promise;
	}

	async getUserData(userId: number) {
		let response = await this.http.get<any>(`${this.baseUrl}/users/${userId}`, this.createHeader()).toPromise();

		return response;
	}

	async checkUserVerification(userId) {
		let response = await this.http.get<any>(`${this.baseUrl}/users/${userId}/check_verification`, this.createHeader()).toPromise();

		return response;
	}

	async createUserSetting(data) {
		let response = await this.http.post<any>(`${this.baseUrl}/users/settings`, data, this.createHeader()).toPromise();

		return response;
	}

	async updateUser(userId, data) {
		let response = await this.http.put<any>(`${this.baseUrl}/users/${userId}`, data, this.createHeader()).toPromise();

		return response;
	}

	async changePassword(userId, data) {
		let response = await this.http.put<any>(`${this.baseUrl}/users/${userId}/change_password`, data, this.createHeader()).toPromise();

		return response;
	}

	async getUserSetting(userId: number) {
		let response = await this.http.get<any>(`${this.baseUrl}/users/${userId}/settings`, this.createHeader()).toPromise();

		return response;
	}

	async updateTourProgress(userId: number, data: any) {
		let response = await this.http.put<any>(`${this.baseUrl}/users/${userId}/settings/update_tour`, data, this.createHeader()).toPromise();

		return response;
	}

	async updateUserSetting(userSettingId, data) {
		let response = await this.http.put<any>(`${this.baseUrl}/settings/${userSettingId}`, data, this.createHeader()).toPromise();

		return response;
	}

	async getUserCurrentProject(userId: string) {
		let response = await this.http.get<any>(`${this.baseUrl}/users/${userId}/project/current`, this.createHeader()).toPromise();

		return response;
	}

	async getUserLatestProject(userId: number) {
		let response = await this.http.get<any>(`${this.baseUrl}/users/${userId}/project/latest`, this.createHeader()).toPromise();

		return response;
	}

	/* DEPRECATED (NOT USED) */
	async createUserDevice(data) {
		let response = await this.http.post<any>(`${this.baseUrl}/users/devices`, data, this.createHeader()).toPromise();

		return response;
	}

	async updateUserDevice(userId, deviceUUID) {
		let response = await this.http.put<any>(`${this.baseUrl}/users/${userId}/devices/${deviceUUID}`, {}, this.createHeader()).toPromise();
	
		return response;
	}

	async updateUserDeviceLoginStatus(userId) {
		// let plugin = require("nativescript-ios-uuid");
		// let deviceUUID = plugin.getUUID();
		let deviceUUID = platformModule.device.uuid;

		let data = {
			deviceOS: platformModule.device.os,
			deviceModel: platformModule.device.model,
			deviceType: platformModule.device.deviceType
		}

		let response = await this.http.put<any>(`${this.baseUrl}/users/${userId}/devices/${deviceUUID}/login`, data, this.createHeader()).toPromise();

		return response;
	}

	async updateUserDeviceLogoutStatus(userId) {
		// let plugin = require("nativescript-ios-uuid");
		// let deviceUUID = plugin.getUUID();
		let deviceUUID = platformModule.device.uuid;

		let response = await this.http.put<any>(`${this.baseUrl}/users/${userId}/devices/${deviceUUID}/logout`, {}, this.createHeader()).toPromise();

		return response;
	}

	async createUserSharedPost(data) {
		let response = await this.http.post<any>(`${this.baseUrl}/users/share_post`, data, this.createHeader()).toPromise();

		return response;
	}

	async getUserSharedPost(userId, postId) {
		let response = await this.http.get<any>(`${this.baseUrl}/users/${userId}/posts/${postId}/shares`, this.createHeader()).toPromise();

		return response;
	}

	async createUserLinkedAccount(data) {
		let response = await this.http.post<any>(`${this.baseUrl}/linked_account`, data, this.createHeader()).toPromise();

		return response;
	}

	async getUserLinkedAccount(userId) {
		let response = await this.http.get<any>(`${this.baseUrl}/linked_account/${userId}`, this.createHeader()).toPromise();

		return response;
	}

    private createHeader() {
    	let currentUser = JSON.parse(appSettings.getString('currentUser') || '{}');
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}`
        })

        return { headers: headers };
    }
}