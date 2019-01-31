import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


import { ConfigService } from "./config.service";

import * as appSettings from "application-settings"; 

@Injectable()
export class ProjectMemberService {

	baseUrl: string = '';

	constructor(
		private http: HttpClient,
		private _configService: ConfigService
	) {
		this.baseUrl = this._configService.getApiBaseUrl();
	}

	async createProjectMember(data) {
		let response = await this.http.post<any>(`${this.baseUrl}/projects/members/join`, data, this.createHeader()).toPromise();

		return response;
	}

	async getProjectMembers(projectId) {
		let response = await this.http.get<any>(`${this.baseUrl}/projects/${projectId}/members`, this.createHeader()).toPromise();

		return response;
	}

	async checkIfMember(projectId, userId) {
		let response = await this.http.get<any>(`${this.baseUrl}/projects/${projectId}/members/${userId}/verify`, this.createHeader()).toPromise();

		return response;
	}

	async checkIfHasProject(userId) {
		let response = await this.http.get<any>(`${this.baseUrl}/projects/members/${userId}/check`, this.createHeader()).toPromise();

		return response;
	}

	async approveRequest(projectMemberId, data) {
		let response = await this.http.put<any>(`${this.baseUrl}/projects/members/${projectMemberId}/request/approval`, data, this.createHeader()).toPromise();

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