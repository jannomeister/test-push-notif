import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


import { ConfigService } from "./config.service";

@Injectable()
export class VerificationService {

	baseUrl: string = '';

	constructor(
		private http: HttpClient,
		private _configService: ConfigService
	) {
		this.baseUrl = this._configService.getApiBaseUrl();
	}

	async resend(data) {
		const response = await this.http.post<any>(`${this.baseUrl}/users/verifications/resend`, data, this.createHeader()).toPromise();

		return response;
	}

	async verify(userId, code) {
		const response = await this.http.put<any>(`${this.baseUrl}/users/${userId}/verifications/${code}`, {}, this.createHeader()).toPromise();

		return response;
	}

    private createHeader() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        return { headers: headers };
    }
}