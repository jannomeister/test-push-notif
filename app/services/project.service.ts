import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


import { ConfigService } from "./config.service";

import * as appSettings from "application-settings"; 

@Injectable()
export class ProjectService {

	baseUrl: string = '';

	constructor(
		private http: HttpClient,
		private _configService: ConfigService
	) {
		this.baseUrl = this._configService.getApiBaseUrl();
	}

	async getCities(query) {
		let response = await this.http.get<any>(`${this.baseUrl}/places/autocomplete?input=${query}`.replace(/ /g, "%20"), this.createHeader()).toPromise();

		return response;
	}

	async getAllProject(page, limit, orderBy) {
		let response = await this.http.get<any>(`${this.baseUrl}/projects?page=${page}&limit=${limit}&orderBy=${orderBy}`, this.createHeader()).toPromise();

		return response;
	}

	async getUserAllProject(userId, page, limit, orderBy) {
		let response = await this.http.get<any>(`${this.baseUrl}/projects/users/${userId}?page=${page}&limit=${limit}&orderBy=${orderBy}`, this.createHeader()).toPromise();

		return response;
	}

	async getProject(projectId) {
		let response = await this.http.get<any>(`${this.baseUrl}/projects/${projectId}`, this.createHeader()).toPromise();

		return response;
	}

	// async getProjectProgress(userId, projectId) {
	// 	let response = await this.http.get<any>(`${this.baseUrl}/projects/${projectId}/users/${userId}/current_progress`, this.createHeader()).toPromise();

	// 	return response;
	// }

	async getProgress(projectId) {
		let response = await this.http.get<any>(`${this.baseUrl}/projects/${projectId}/progress`, this.createHeader()).toPromise();

		return response;
	}

	async createProject(data) {
		let response = await this.http.post<any>(`${this.baseUrl}/projects`, data, this.createHeader()).toPromise();

		return response;
	}

	async updateProject(projectId, data) {
		let response = await this.http.put<any>(`${this.baseUrl}/projects/${projectId}`, data, this.createHeader()).toPromise();

		return response;
	}

	async updateProjectApproved(projectId, data) {
		let response = await this.http.put<any>(`${this.baseUrl}/projects/${projectId}/approved`, data, this.createHeader()).toPromise();

		return response;
	}

	async checkProjectDone(projectId) {
		let response = await this.http.get<any>(`${this.baseUrl}/projects/${projectId}/check_status`, this.createHeader()).toPromise();

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