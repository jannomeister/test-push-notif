import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


import { ConfigService } from "./config.service";

import * as appSettings from "application-settings";
import * as platformModule from "tns-core-modules/platform";
import * as httpModule from "http";

@Injectable()
export class DeviceService {

	baseUrl: string = '';

	constructor(
		private http: HttpClient,
		private _configService: ConfigService
	) {
		this.baseUrl = this._configService.getApiBaseUrl();
	}

	getDeviceToken() {
		let token = appSettings.getString('deviceToken') || '';

		return token;
	}

	registerDevice(deviceToken) {
		let promise = new Promise((resolve, reject) => {

			// let plugin = require("nativescript-ios-uuid");
			let data = {
				deviceUUID: platformModule.device.uuid, //plugin.getUUID(),
				deviceToken: deviceToken,
				deviceOS: platformModule.device.os,
				deviceModel: platformModule.device.model,
				deviceType: platformModule.device.deviceType,
			}

			httpModule.request({
				url: `${this.baseUrl}/devices`,
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

	/* DEPRECATED (NOT USED) */
	async createDevice(data) {
		let response = await this.http.post<any>(`${this.baseUrl}/devices`, data, this.createHeader()).toPromise();

		return response;
	}

	async findOne(deviceToken) {
		let response = await this.http.get<any>(`${this.baseUrl}/devices/${deviceToken}`, this.createHeader()).toPromise();

		return response;
	}

    private createHeader() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        return { headers: headers };
    }
}