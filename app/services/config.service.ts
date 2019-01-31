import { Injectable } from "@angular/core";

@Injectable()
export class ConfigService {

	getApiBaseUrl() {
		return `${this.getBaseUrl()}/api/v1`; 
	}

    getWebBaseUrl() {
        // return 'http://192.168.1.5:4200';
        return 'https://cms.yudabands.org'; //production
    }

	getBaseUrl() {
        return 'http://192.168.1.9:1337';
		// return 'http://139.59.109.3:8080';
        // return 'https://api.yudabands.org'; //production
	}

	pushSettings() {
		return {
            senderID: '34320956349',
            badge: true,
            sound: true,
            alert: true,
            clearBadge: false,
            interactiveSettings: {
                actions: [{
                    identifier: 'READ_IDENTIFIER',
                    title: 'Read',
                    activationMode: "foreground",
                    destructive: false,
                    authenticationRequired: true
                }, {
                    identifier: 'CANCEL_IDENTIFIER',
                    title: 'Cancel',
                    activationMode: "foreground",
                    destructive: true,
                    authenticationRequired: true
                }],
                categories: [{
                    identifier: 'READ_CATEGORY',
                    actionsForDefaultContext: ['READ_IDENTIFIER', 'CANCEL_IDENTIFIER'],
                    actionsForMinimalContext: ['READ_IDENTIFIER', 'CANCEL_IDENTIFIER']
                }]
            },
            notificationCallbackIOS: (message: any) => {
                console.log('*** MESSAGE RECEIVED!!! ***')
                console.log('************************')
                console.log(message)
                console.log('************************')
            }
        }
	}
}