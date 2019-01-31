import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


import { ConfigService } from "./config.service";

import * as appSettings from "application-settings"; 

@Injectable()
export class SearchService {

	baseUrl: string = '';

	constructor(
		private http: HttpClient,
		private _configService: ConfigService
	) {
		this.baseUrl = this._configService.getApiBaseUrl();
	}

	async searchAll(query, page, limit, orderBy) {
		let response = await this.http.get<any>(`${this.baseUrl}/search?query=${query}&page=${page}&limit=${limit}&orderBy=${orderBy}`.replace(/ /g, "%20"), this.createHeader()).toPromise();

		return response;
	}

	async searchAvailableStudent(page, limit, query, lastId, genderFilter?, countryFilter?, bandsFilter?) {
		let response = await this.http.get<any>(`${this.baseUrl}/search/available_students?query=${query}&lastId=${lastId}&genderFilter=${genderFilter}&countryFilter=${countryFilter}&bandsFilter=${bandsFilter}&page=${page}&limit=${limit}`.replace(/ /g, "%20"), this.createHeader()).toPromise();

		return response;
	}

	async searchStudents(query, page, limit, orderBy) {
		let response = await this.http.get<any>(`${this.baseUrl}/search/students?query=${query}&page=${page}&limit=${limit}&orderBy=${orderBy}`.replace(/ /g, "%20"), this.createHeader()).toPromise();

		return response;
	}

	async searchProjects(query, page, limit, orderBy) {
		let response = await this.http.get<any>(`${this.baseUrl}/search/projects?query=${query}&page=${page}&limit=${limit}&orderBy=${orderBy}`.replace(/ /g, "%20"), this.createHeader()).toPromise();

		return response;
	}

	async searchSchools(query, page, limit, orderBy) {
		let response = await this.http.get<any>(`${this.baseUrl}/search/schools?query=${query}&page=${page}&limit=${limit}&orderBy=${orderBy}`.replace(/ /g, "%20"), this.createHeader()).toPromise();

		return response;
	}

	async searchTeachers(query, page, limit, orderBy) {
		let response = await this.http.get<any>(`${this.baseUrl}/search/teachers?query=${query}&page=${page}&limit=${limit}&orderBy=${orderBy}`.replace(/ /g, "%20"), this.createHeader()).toPromise();

		return response;
	}

	async searchAddressAutocomplete(searchAddress) {
		let response = await this.http.get<any>(`${this.baseUrl}/search/address/autocomplete?input=${searchAddress}`.replace(/ /g, "%20"), this.createHeader()).toPromise();

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
