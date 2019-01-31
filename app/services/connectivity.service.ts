import { Injectable } from "@angular/core";

import * as connectivity from "connectivity";

@Injectable()
export class ConnectivityService {

	_offlineConnectedStatusType: number = connectivity.connectionType.none;
	_connectionStatusChangedCallbacks: { (connectionStatus: number): void }[];
	_connectionStatusChangedToOnlineCallbacks: { (): void }[];
	_connectionStatusChangedToOfflineCallbacks: { (): void }[];

	constructor() {
		this._connectionStatusChangedCallbacks = [];
        this._connectionStatusChangedToOnlineCallbacks = [];
        this._connectionStatusChangedToOfflineCallbacks = [];
	}

	startMonitoring() {
		console.log("** Monitoring Connection Status");
		connectivity.startMonitoring(this.monitorConnectionStatus);
	}

	addConnectionStatusChangedToOnlineCallback(callback: () => void) {
        this._connectionStatusChangedToOnlineCallbacks.push(callback);
    }
 
    addConnectionStatusChangedToOfflineCallback(callback: () => void) {
        this._connectionStatusChangedToOfflineCallbacks.push(callback);
    }

	monitorConnectionStatus(newConnectionType: number) {
		console.log("** Connection Status Changed To: " + newConnectionType);

		if(newConnectionType === 0) {
			// Went offline, kick off any changed to offline callbacks
            this.processCallbacksWithoutParam(this._connectionStatusChangedToOfflineCallbacks);
		}
		else {
			// Came online, kick off any changed to online callbacks
            // At this time Online = connectionType.wifi || connectionType.mobile
            this.processCallbacksWithoutParam(this._connectionStatusChangedToOnlineCallbacks);
		}

		// Process any connection status changed callbacks
        this.processCallbacks(newConnectionType, this._connectionStatusChangedCallbacks);
	}

	processCallbacksWithoutParam(callbacks: { (): void }[]) {
        for (let i = 0; i < callbacks.length; i++) {
            callbacks[i]();
        }
    }

    processCallbacks(newConnectionType: number, callbacks: { (connectionStatus: number): void }[]) {
        for (let i = 0; i < callbacks.length; i++) {
            callbacks[i](newConnectionType);
        }
    }

}