import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { WalkThroughComponent } from "../../view/walkthrough-page/walkthrough-page.component";
import { RouterExtensions } from "nativescript-angular/router"

import { YoutubePlayer } from "nativescript-youtubeplayer"

// OTHERS
import { openUrl } from "utils/utils";

// SERVICES
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "resources-page",
    moduleId: module.id,
    templateUrl: "./resources-page.component.html",
    styleUrls: ['./resources-page.component.css'],
})
export class ResourcesComponent implements OnInit {

    @ViewChild("videoPlayer") videoPlayer: ElementRef;

    navOptions: any;

    youtubeLink: string;
    options = { rel: 1, autoplay: 1 };

    videoSrc: string = 'https://res.cloudinary.com/dbi1b3kf0/video/upload/v1546581007/yudabands/resources/How_to_use_the_app_resources.mp4';
    
    constructor(
        private _page: Page,
        private vcRef: ViewContainerRef,
        private _routerExtensions: RouterExtensions,

        private _modal: ModalDialogService,
        private _componentService: ComponentEventService
    ) {
        this.navOptions = this._componentService.getRouteOptions();
        this.navOptions.transition.name = "slideTop";
    }

    ngOnInit() {
        this.youtubeLink = this._componentService.getYoutubeId('https://youtu.be/gOYceWtTzWE');

        this._page.on('navigatingTo', (data) => {
            this.videoPlayer.nativeElement.src = 'https://res.cloudinary.com/dbi1b3kf0/video/upload/v1546581007/yudabands/resources/How_to_use_the_app_resources.mp4';
        })

        this._page.on('navigatingFrom', (data) => {
            this.videoPlayer.nativeElement.src = '';
        })
    }

    // showModal(index){
    //     let opt = {
    //         context: { index: index },
    //         fullscreen: true,
    //         viewContainerRef: this.vcRef,
    //         animated: true
    //     }
        
    //     this._modal.showModal(InformationModalComponent, opt)
    //         .then(response => {
    //             console.log(response)
    //         })
    // }

    openWalkthrough(type) {
        this.videoPlayer.nativeElement.pause();

        let opt = {
            context: { type: type },
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true
        }
        
        this._modal.showModal(WalkThroughComponent, opt).then(response => {
            this.videoPlayer.nativeElement.play();
        })
    }

   	open(url) {
        openUrl(url);
   	}

    openMedia() {
        this._routerExtensions.navigate(['media'], this.navOptions)
    }
}