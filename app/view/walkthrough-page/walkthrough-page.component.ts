import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { YoutubePlayer } from "nativescript-youtubeplayer";

// SERVICES
import { UserService } from "../../services/user.service";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "walkthrough-page",
    moduleId: module.id,
    templateUrl: "./walkthrough-page.component.html",
    styleUrls: ['./walkthrough-page.component.css'],
})
export class WalkThroughComponent implements OnInit {

	userId: number = 0;

	opt: any = {}

	data: any = {
		title: "",
		description: "",
		videos: []
	}

	videoLinks: any = {
		sell: [
			"https://youtu.be/H8gWdaCoygA",
			"https://youtu.be/5gBSzMttsXs",
			"https://youtu.be/kIULVBJKZgg",
			"https://youtu.be/hB9B4gu4iL0",
			"https://youtu.be/mpj8RpJOlK8",
			"https://youtu.be/y5f0MU7QPQQ",
			"https://youtu.be/1IdwsZrm7IE"
		],

		word: [
			"https://youtu.be/ZeaANdW7Dbs",
			"https://youtu.be/PmE-12pVPUc",
			"https://youtu.be/67kLj3cnbgs",
			"https://youtu.be/pTk3Xn8kwBE"
		]
	}

	constructor(
		private modal: ModalDialogParams,

		private _userService: UserService,
		private _componentService: ComponentEventService
	){}

	ngOnInit(){
		this.userId = this._userService.getCurrentUserId();

		this.initData();
		
	}

	initData() {
		if(this.modal.context.type === 'sell') {

			this.data.title = "How to Sell the Bands";
			this.data.description = "These short instructional videos will walk you through setting up, running, and finalizing your Yuda Bands project.";

			for(let i=0; i<this.videoLinks.sell.length; i++) {
				this.data.videos.push(this._componentService.getYoutubeId(this.videoLinks.sell[i]));
			}

		}else if(this.modal.context.type === 'word') {

			this.data.title = "How to Get the Word Out";
			this.data.description = "These short videos are full of ideas to help you publicize your project.";

			for(let i=0; i<this.videoLinks.word.length; i++) {
				this.data.videos.push(this._componentService.getYoutubeId(this.videoLinks.word[i]));
			}

		}else if(this.modal.context.type === 'sponsor') {

			this.data.title = " ";
			this.data.description = "";

			this.data.videos.push(this._componentService.getYoutubeId(this.videoLinks.sell[1]));
		}
	}

	onClose() {
        this.modal.closeCallback(true);
    }
}