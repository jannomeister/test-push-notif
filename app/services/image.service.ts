import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


import { ConfigService } from "./config.service";

import * as appSettings from "application-settings"; 

@Injectable()
export class ImageService {

	baseUrl: string = ''; 

    constructor(
        private http: HttpClient,
        private _configService: ConfigService
    ) {
        this.baseUrl = this._configService.getApiBaseUrl();
    }

    async upload(data) {
    	const response = await this.http.post<any>(`${this.baseUrl}/api/file/upload`, data, this.createHeader()).toPromise();
		return response;
    }

    private createHeader() {
        let currentUser = JSON.parse(appSettings.getString('currentUser') || '{}');
        let headers = new HttpHeaders({
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${currentUser.token}`
        })

        return { headers: headers };
    }
}