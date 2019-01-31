import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { ConfigService } from "./config.service";

import * as appSettings from "application-settings"; 

@Injectable()
export class MediaService {

	baseUrl: string = ''; 

    constructor(
        private http: HttpClient,
        private _configService: ConfigService
    ) {
        this.baseUrl = this._configService.getApiBaseUrl();
    }

    async getMedias() {
    	let response = await this.http.get<any>(`${this.baseUrl}/resources`, this.createHeader()).toPromise();
		return response;    
	}

    async getMedia(mediaResourceId) {
        let response = await this.http.get<any>(`${this.baseUrl}/resources/${mediaResourceId}`, this.createHeader()).toPromise();
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