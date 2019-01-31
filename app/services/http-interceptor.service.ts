import { Injectable, Injector } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { RouterExtensions } from "nativescript-angular/router";

import { Observable } from "rxjs";

import { tap } from "rxjs/operators";

import { UserService } from "./user.service";
import { ConfigService } from "./config.service";
import { ComponentEventService } from "./component-event.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

	unauthorizedNotifIsDone: boolean = false;

	_routerExtensions: any;
	_userService: any;
	_configService: any;
	_componentService: any;
	
	constructor(private injector: Injector) {
		setTimeout(() => {
			this._userService	   = this.injector.get(UserService)
			this._configService    = this.injector.get(ConfigService)
			this._componentService = this.injector.get(ComponentEventService)

			this._routerExtensions = this.injector.get(RouterExtensions)
		})
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(request).pipe(
            tap(event => {
            	console.log('******** RESPONSE **********')
            	console.log(event)
            	console.log('******** END OF RES ********')
            }, (err: any) => {
            	this.processRequestError(err)
            })
        ); 
	}

	processRequestError(err) {
		if(err instanceof HttpErrorResponse) {

			let endpointArr = err.url.split(this._configService.getBaseUrl());
			let endpoint = endpointArr[1];

			this.logRequestError(err)

			if(err.status === 0) { // Unknown error / No Internet Connection
				this._componentService.showAlert(
					'No Internet Connection', 
					'Please check your connection and try again'
				);

			}else if(err.status === 400) { // Bad Request
				// this._componentService.showAlert(
				// 	'Alert',
				// 	err.error.error
				// )

			}else if(err.status === 401) { // Unauthorized
				if(!this.unauthorizedNotifIsDone && endpoint !== '/api/v1/authenticate') {
					this._componentService.showAnauthorizedAlert('/home');
					this.unauthorizedNotifIsDone = true;
				}

			}else if(err.status === 403) { // Forbidden
				// this._componentService.showAlert(
				// 	'Alert',
				// 	err.error.error
				// )

			}else if(err.status === 404) { // Not Found
				// this._componentService.showAlert(
				// 	'Alert',
				// 	err.error.error
				// )

			}else if(err.status === 409) { // Conflict
				// this._componentService.showAlert(
				// 	'Alert', 
				// 	err.error.error
				// )

			}else if(err.status === 500) { // Internal Server Error
				// this._componentService.showAlert(
				// 	'Alert', 
				// 	err.error.error
				// )
				// this._userService.removeCurrentUser();
				// this._routerExtensions.navigate(['/home'], { clearHistory: true });
			}else if(err.status === 502) { // Bad Gateway Error
				// this._componentService.showAlert(
				// 	'Alert', 
				// 	err.error.error
				// )
				// this._userService.removeCurrentUser();
				// this._routerExtensions.navigate(['/home'], { clearHistory: true });
			}else{
				this._componentService.showAlert(
					'Ooops!',
					'Something went wrong. Please try again later.'
				)
			}
		}
	}

	logRequestError(err) {
		console.log('******* ERROR INFORMATION *********')
		console.log('***********************************')
		console.log('URL: '+ err.url)
		console.log('MESSAGE: '+ err.message)
		console.log('STATUS CODE: '+ err.status)
		console.log('***********************************')
		console.log('***********************************')
	}
}

