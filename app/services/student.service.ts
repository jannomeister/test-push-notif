import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { ConfigService } from "./config.service";

import * as appSettings from "application-settings"; 

@Injectable()
export class StudentService {

	baseUrl: string = '';

	constructor(
		private http: HttpClient,
		private _configService: ConfigService
	) {
		this.baseUrl = this._configService.getApiBaseUrl();
	}

	async getStudent(studentId: number) {
		let response = await this.http.get<any>(`${this.baseUrl}/students/${studentId}`, this.createHeader()).toPromise();
		return response;
	}

	// NEEDS
	async getStudentCurrentNeed(studentId: number) {
		let response = await this.http.get<any>(`${this.baseUrl}/students/${studentId}/needs/current`, this.createHeader()).toPromise();
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

