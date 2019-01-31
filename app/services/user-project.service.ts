import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { ConfigService } from "./config.service";

import * as appSettings from "application-settings"; 

@Injectable()
export class UserProjectService {

	baseUrl: string = ''; 

    constructor(
        private http: HttpClient,
        private _configService: ConfigService
    ) {
        this.baseUrl = this._configService.getApiBaseUrl();
    }

    async checkUserCurrentProject(userId) {
    	let response = await this.http.get<any>(`${this.baseUrl}/users/${userId}/current_project`, this.createHeader()).toPromise();
    
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