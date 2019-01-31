import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { UserService } from "../../services/user.service";
import { ComponentEventService } from "../../services/component-event.service";

import { User } from "../../models/user.model";

@Component({
    selector: "profile-info-page",
    moduleId: module.id,
    templateUrl: "./profile-info-page.component.html",
    styleUrls: ['./profile-info-page.component.css'],
})
export class ProfileInfoComponent implements OnInit {
    
    userId: number = 0; 
    isInitialized: boolean = false;
    
    user: User;

    constructor(
    	private _userService: UserService,
        private _componentService: ComponentEventService,
    ) {
    	this.user = new User();
    }

    ngOnInit() {
        this.userId = this._userService.getCurrentUserId();

        this.getUserData();
    }

    async getUserData() {
    	try{

    		let res = await this._userService.getUserData(this.userId);

            this.isInitialized = true;
            if(res.data) {
                this.user.deserialize(res.data);
                this.user.imageUrl = this._componentService.getImageProfile(this.user.imageUrl);
            }

    	}catch(e){
            this.isInitialized = true;
    	}
    }
   
}