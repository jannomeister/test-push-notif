import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


import { ConfigService } from "./config.service";

import * as appSettings from "application-settings"; 

@Injectable()
export class ProjectAlertService {

	baseUrl: string = ''; 

    constructor(
        private http: HttpClient,
        private _configService: ConfigService
    ) {
        this.baseUrl = this._configService.getApiBaseUrl();
    }

    async updateTips(data) {
        let response = await this.http.put<any>(`${this.baseUrl}/project_alerts/tips`, data, this.createHeader()).toPromise();

        return response;
    }

    async updateAlert(type, data) {
    	let response = await this.http.put<any>(`${this.baseUrl}/project_alerts?type=${type}`, data, this.createHeader()).toPromise();

		return response;
    }

    async getAlert(userId, projectId) {
    	let response = await this.http.get<any>(`${this.baseUrl}/project_alerts?projectId=${projectId}&userId=${userId}`, this.createHeader()).toPromise();

		return response;
    }

    async checkTips(userId, projectId, dateStart, dateEnd) {
        let response = await this.http.get<any>(`${this.baseUrl}/project_alerts/tips?projectId=${projectId}&userId=${userId}&dateStart=${dateStart}&dateEnd=${dateEnd}`, this.createHeader()).toPromise();

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