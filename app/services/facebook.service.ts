import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


import * as Facebook from "nativescript-facebook";
import * as httpModule from "http";

@Injectable()
export class FacebookService {

	baseUrl: string;
	accessToken: string;

    writePermissions: Array<string> = ["manage_pages", "publish_pages"];
    readPermissions: Array<string> = ["user_posts"];

	constructor(
        private http: HttpClient,
    ) {
		this.baseUrl = "https://graph.facebook.com";
		this.getAccessToken();
    }

	private getAccessToken() {

		this.accessToken = (Facebook.getCurrentAccessToken())? Facebook.getCurrentAccessToken().accessToken: '';
    }

    connect() {
        let promise = new Promise((resolve, reject) => {
            Facebook.requestReadPermissions(this.readPermissions, (err, data) => {
                if(err) {
                    reject(err)
                }else{
                    resolve(data.token)
                }
            })
        });

        return promise;
    }

    connectWithoutPermission() {
        let promise = new Promise((resolve, reject) => {
            Facebook.login((err, data) => {
                if(err) {
                    reject(err)
                }else{
                    resolve(data.token)
                }
            })
        });

        return promise;
    }

    logout() {
        Facebook.logout(() => {});
    }

    getData(token) {
        let promise = new Promise((resolve, reject) => {

            httpModule.request({
                url: `${this.baseUrl}/me?fields=id,first_name,last_name,name,email,picture.type(large)&access_token=${token}`,
                method: 'GET'
            }).then((res) => {
                console.log("RESULT")
                resolve(res.content.toJSON());
            }, (err) => {
                console.log("ERROR")
                reject(err);
            })

        });

        return promise;
    }

    share(token) {
        let promise = new Promise((resolve, reject) => {
            httpModule.request({
                url: `${this.baseUrl}/me/feed?message=Sample Post!&link=http://www.yudabands.org/&access_token=${token}`.replace(/ /g, "%20"),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                content: ''
            }).then((res) => {
                resolve(res.content.toJSON());
            }, (err) => {
                reject(err);
            })
        });

        return promise;
    }

    async getFacebookData(accessToken) {
    	const response = await this.http.get<any>(`${this.baseUrl}/me?fields=id,first_name,last_name,name,email,picture.type(large)&access_token=${accessToken}`).toPromise();

    	return response;
    }
}