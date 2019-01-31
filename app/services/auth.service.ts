import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


import { ConfigService } from "./config.service";
import { SocketService } from "./socket.service";

import * as appSettings from "application-settings"; 

@Injectable()
export class AuthService {

	baseUrl: string = ''; 

    constructor(
        private http: HttpClient,
        private _configService: ConfigService,
        private _socketService: SocketService
    ) {
        this.baseUrl = this._configService.getApiBaseUrl();
    }

    isLoggedIn() {
        let currentUser = JSON.parse(appSettings.getString('currentUser') || '{}');
        
        return !!currentUser.token;
    }

    async register(data: any) {
        const response = await this.http.post<any>(`${this.baseUrl}/signup`, data, this.createHeader()).toPromise();
        return response;
    }

    async authenticate(data) {
        const response = await this.http.post<any>(`${this.baseUrl}/authenticate`, data, this.createHeader()).toPromise();

        // if(response && response.token) {
        //     appSettings.setString('currentUser', JSON.stringify(response));
        //     this._socketService.connect();
        // }

        return response;
    }

    async forgotPassword(email: string) {
        const response = await this.http.post<any>(`${this.baseUrl}/forgot_password`, { email: email }, this.createHeader()).toPromise();
        return response;
    }

    private createHeader() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        return { headers: headers };
    }
}