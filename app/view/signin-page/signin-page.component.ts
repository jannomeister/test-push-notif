import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { TextField } from "ui/text-field";
import { Page } from "tns-core-modules/ui/page";
import { messaging, Message } from "nativescript-plugin-firebase/messaging";

// OTHERS
import { openUrl } from "utils/utils";

// MODELS
import { User } from "../../models/user.model";

// SERVICES
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { DeviceService } from "../../services/device.service";
import { ConfigService } from "../../services/config.service";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    moduleId: module.id,
    selector: "signin",
    templateUrl: './signin-page.component.html',
    styleUrls: ['./signin-page.component.css'],
})
export class SignInComponent implements OnInit {

    constructor() { }

    ngOnInit() {}

    signIn() {
        messaging.registerForPushNotifications({
            onPushTokenReceivedCallback: (token: string): void => {
                console.log("Token: " + token)
            },
          
            onMessageReceivedCallback: (message: Message) => {
              console.log("Push message received: " + message.title);
            }
        }).then(() => console.log("Registered for push"));
    }
}
