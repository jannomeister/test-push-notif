import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


import { ConfigService } from "./config.service";

import * as appSettings from "application-settings"; 

@Injectable()
export class PostService {

	baseUrl: string = '';

	constructor(
		private http: HttpClient,
		private _configService: ConfigService
	) {
		this.baseUrl = this._configService.getApiBaseUrl();
	}

	async getAllPosts(page, limit, orderBy) {
		let response = await this.http.get<any>(`${this.baseUrl}/feed?page=${page}&limit=${limit}&orderBy=${orderBy}`, this.createHeader()).toPromise();

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