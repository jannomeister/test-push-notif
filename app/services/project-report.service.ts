import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


import { ConfigService } from "./config.service";

import * as appSettings from "application-settings"; 

@Injectable()
export class ProjectReportService {

	baseUrl: string = '';

	constructor(
		private http: HttpClient,
		private _configService: ConfigService
	) {
		this.baseUrl = this._configService.getApiBaseUrl();
	}

	async createReport(data) {
		let response = await this.http.post<any>(`${this.baseUrl}/projects/reports`, data, this.createHeader()).toPromise();

		return response;
	}

	async checkHasReport(projectId, userId) {
		let response = await this.http.get<any>(`${this.baseUrl}/projects/${projectId}/has_report?userId=${userId}`, this.createHeader()).toPromise();

		return response;
	}

	async getSalesReport(projectId) {
		let response = await this.http.get<any>(`${this.baseUrl}/projects/${projectId}/sales_report`, this.createHeader()).toPromise();

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