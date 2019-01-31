import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { ConfigService } from "./config.service";

import * as appSettings from "application-settings"; 

@Injectable()
export class ShipmentService {

	baseUrl: string = '';

	constructor(
		private http: HttpClient,
		private _configService: ConfigService
	) {
		this.baseUrl = this._configService.getApiBaseUrl();
	}

	async confirm(shipmentId, data) {
		let response = await this.http.put<any>(`${this.baseUrl}/ups/${shipmentId}/confirm`, data, this.createHeader()).toPromise();

		return response;
	}

	async checkShipmentStatus(data) {
		let response = await this.http.post<any>(`${this.baseUrl}/ups/track`, data, this.createHeader()).toPromise();

		return response;
	}

	async getProjectShipmentHistory(projectId) {
		let response = await this.http.get<any>(`${this.baseUrl}/ups/projects/${projectId}/history`, this.createHeader()).toPromise();

		return response;
	}

	async getProjectShipment(projectId) {
		let response = await this.http.get<any>(`${this.baseUrl}/ups/projects/${projectId}/shipments`, this.createHeader()).toPromise();

		return response;
	}

	async trackShipment(projectId) {
		let response = await this.http.get<any>(`${this.baseUrl}/ups/projects/${projectId}/track_shipment`, this.createHeader()).toPromise();

		return response; 
	}

	async getCurrentShipment(projectId) {
		let response = await this.http.get<any>(`${this.baseUrl}/ups/projects/${projectId}/current_shipment`, this.createHeader()).toPromise();

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