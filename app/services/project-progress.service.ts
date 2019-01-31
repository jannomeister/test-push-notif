import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { ConfigService } from "./config.service";

import * as appSettings from "application-settings"; 

@Injectable()
export class ProjectProgressService {

	baseUrl: string = '';

	constructor(
		private http: HttpClient,
		private _configService: ConfigService
	) {
		this.baseUrl = this._configService.getApiBaseUrl();
	}

	async getProgress(userId, projectId) {
		let response = await this.http.get<any>(`${this.baseUrl}/projects/${projectId}/finalization_progress?userId=${userId}`, this.createHeader()).toPromise();

		return response;
	}

	async updateProgress(projectId, data) {
		let response = await this.http.put<any>(`${this.baseUrl}/projects/${projectId}/finalization_progress`, data, this.createHeader()).toPromise();

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