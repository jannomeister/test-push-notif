import { Injectable } from "@angular/core";

import { UserService } from "./user.service";
import { ConfigService } from "./config.service";

// require("nativescript-nodeify");
import * as SocketIO from "nativescript-socket.io";

@Injectable()
export class SocketService {

	instance: any;

	options: any = {
		log: true,
        secure: false,
        forceWebsockets: true,
	}

	constructor(
		private _userService: UserService,
		private _configService: ConfigService
	) {}

	connect() {
		this.instance = SocketIO.connect(this._configService.getBaseUrl(), <SocketIO.SocketOptions>this.options);
	}

	isConnected() {
		return (this.instance)? true : false;
	}

	getSocketInstance() {
		return this.instance;
	}

	joinRoom(room) {
		this.instance.emit('room', room)
	}

}