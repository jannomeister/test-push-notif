import { Component, OnInit, HostListener, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Vibrate } from "nativescript-vibrate";
import { TNSFancyAlert } from 'nativescript-fancyalert';
import { 
	on as applicationOn, 
	launchEvent, 
	suspendEvent, 
	resumeEvent, 
	exitEvent, 
	lowMemoryEvent, 
	uncaughtErrorEvent, 
	ApplicationEventData 
} from "application";

// OTHERS 
import * as moment from 'moment';
import * as LocalNotifications from "nativescript-local-notifications";

// SERVICES
import { UserService } from "./services/user.service";
import { SocketService } from "./services/socket.service";
import { ProjectAlertService } from "./services/project-alert.service";
import { ShipmentService } from "./services/shipment.service";
import { ComponentEventService } from "./services/component-event.service";
import { CallScheduleService } from "./services/call-schedule.service";


@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit {

	userId: number = 0;
	projectId: number = 0;

	constructor(
		private _routerExtensions: RouterExtensions,
		private _userService: UserService,
		private _socketService: SocketService,
		private _projectAlertService: ProjectAlertService,
		private _shipmentService: ShipmentService,
		private _componentService: ComponentEventService,
		private _callScheduleService: CallScheduleService,
	) {
		// this.processLocalData();
		let user = this._userService.getCurrentUser();

		if(user.data && user.token) {
			if(user.data.status === 'unverified') {
				this._routerExtensions.navigate(['/verification'], { clearHistory: true });
			}else{
				this._socketService.connect();
				this._routerExtensions.navigate(['/dashboard'], { clearHistory: true });
			}
		}else{
			this._routerExtensions.navigate(['/home']);
		}
	}

	ngOnInit() {
		// this.socketListener();
		// this.initApplicationState();
	}

	initApplicationState() {

		applicationOn(resumeEvent, (args: ApplicationEventData) => {
			this.processLocalData();
		})
	}

	socketListener() {
		if(this._socketService.isConnected()) {
			let userId = this._userService.getCurrentUserId();
			let socket = `USER-${userId}`;

			this._socketService.getSocketInstance()
				.on(socket, (data) => {
					if(data.hasNotif) this.processSocketData(data);
				})
		}
	}

	processLocalData() {
		let user = this._userService.getCurrentUser();

		this._componentService.showLoader('Refreshing...');

		if(user.data && user.token) {
			this._socketService.connect();
			this.checkUserVerification(user.data.userId, user);
		}else {
			this._componentService.hideLoader();
			this._routerExtensions.navigate(['/home']);
		}
	}

	processSocketData(data) {
		this.broadcastEvent(data);
	}

	@HostListener('change')
	broadcastEvent(data) {
		if(data.data.type === 'tips') {
			if(data.data.isDone) this._componentService.projectChanged(data.data.isDone); 
		}else if(data.data.type === 'user') {
			if(data.data.isRemoved) this._componentService.userRemoval(data.data.isRemoved);
		}else {
			this._componentService.hasNotification(true);
		}
	}

	async checkUserVerification(userId, data) {
		try{
			let res = await this._userService.checkUserVerification(userId);

			this._componentService.hideLoader();
			if(res.success) {
				let route = (res.isVerified)? '/dashboard' : '/verification';

				data.data = res.data;

				this._userService.saveCurrentUser(data)
				this._routerExtensions.navigate([route], { clearHistory: true });
			}else {
				this._componentService.showErrorFeedback('Ooops!', res.message);
				this._userService.removeCurrentUser();
				this._routerExtensions.navigate(['/home']);
			}
		}catch(e) {
			let route = (data.data.status === 'unverified')? '/verification' : ((data.data.status !== 'unverified')? '/dashboard' : '/home');
			
			this._componentService.hideLoader();
			this._routerExtensions.navigate([route], { clearHistory: true });
		}
	}
}


