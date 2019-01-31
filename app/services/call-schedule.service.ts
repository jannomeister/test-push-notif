import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { ConfigService } from "./config.service";

import * as appSettings from "application-settings"; 

@Injectable()
export class CallScheduleService {

	baseUrl: string = ''; 

    constructor(
        private http: HttpClient,
        private _configService: ConfigService
    ) {
        this.baseUrl = this._configService.getApiBaseUrl();
    }

    async getCallSchedule(userId, projectId) {
        let response = await this.http.get<any>(`${this.baseUrl}/users/${userId}/${projectId}/call_schedule`, this.createHeader()).toPromise();

        return response;
    }

    async getAvailableTime(userId, projectId, timeZone) {
        let response = await this.http.get<any>(`${this.baseUrl}/users/${userId}/${projectId}/available_time?timeZone=${timeZone}`, this.createHeader()).toPromise();

        return response;
    }

    async updateReminder(callScheduleId, data) {
        let response = await this.http.put<any>(`${this.baseUrl}/users/call_schedule/${callScheduleId}/reminder_status`, data, this.createHeader()).toPromise();

        return response;
    }

    async addCallSchedule(data) {
        let response = await this.http.post<any>(`${this.baseUrl}/users/call_schedule`, data, this.createHeader()).toPromise();

        return response;
    }

    async createCalendarEvent(data) {
        let response = await this.http.post<any>(`${this.baseUrl}/calendar/event`, data, this.createHeader()).toPromise();

        return response;
    }

    async getCalendarEvent(eventId, timeZone) {
        let response = await this.http.get<any>(`${this.baseUrl}/calendar/event/${eventId}?timeZone=${timeZone}`, this.createHeader()).toPromise();

        return response;
    }

    async updateCalendarEvent(eventId, data) {
        let response = await this.http.put<any>(`${this.baseUrl}/calendar/event/${eventId}`, data, this.createHeader()).toPromise();

        return response;
    }

    async deleteCalendarEvent(eventId) {
        let response = await this.http.delete<any>(`${this.baseUrl}/calendar/event/${eventId}`, this.createHeader()).toPromise();

        return response;
    }

    async getGeocodeAddress(address) {
        let response = await this.http.get<any>(`${this.baseUrl}/geocode/place?address=${address}`.replace(/ /g, "%20"), this.createHeader()).toPromise();
        
        return response;
    }

    async getTimeZone(lat, lng) {
    	let response = await this.http.get<any>(`${this.baseUrl}/timezone/location/${lat}/${lng}`, this.createHeader()).toPromise();

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