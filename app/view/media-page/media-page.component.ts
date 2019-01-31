import { Component, OnInit, ViewContainerRef, ViewChild } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { RouterExtensions } from "nativescript-angular/router"
import { ShareProjectComponent } from "../../view/shareproject-page/shareproject-page.component";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { RadListViewComponent } from "nativescript-ui-listview/angular";

// MODELS
import { Media } from "../../models/media.model";

// SERVICES
import { MediaService } from "../../services/media.service";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "media-page",
    moduleId: module.id,
    templateUrl: "./media-page.component.html",
    styleUrls: ['./media-page.component.css'],
})
export class MediaComponent implements OnInit {

    isBusy: boolean = true;

    medias: ObservableArray<Media>;
    categories: any = ['Photos', 'InstaBlitz Videos'];
    items: Array<SegmentedBarItem> = [];
    selectedIndex: number = 1;
    isPhotoSelected: boolean = false;
    isVideoSelected: boolean = true;
    isFilteringEnabled: boolean = true;

    private _myFilteringFunc: (item: any) => any;
    
    constructor(
        private _page: Page,
		private vcRef: ViewContainerRef, 
		private routerExtensions: RouterExtensions,

        private modal: ModalDialogService,
        private _mediaService: MediaService,
        private _componentService: ComponentEventService
    ) {
        this.myFilteringFunc = (item: Media) => {
            return item.type.includes("image");
        };
    }

    ngOnInit() {
        this.getMedias();
        this.generateSegmentBar();
    }

    get myFilteringFunc(): (item: any) => any {
        return this._myFilteringFunc;
    }

    set myFilteringFunc(value: (item: any) => any) {
        this._myFilteringFunc = value;
    }

    goBack() {
	    this.routerExtensions.back();
	}

    openMedia(data) {
        let opt = {
            context: data,
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true,
            transition: {
                name: "slideTop",
                duration: 200,
                curve: "ease"
            }
        }
        
        this.modal.showModal(ShareProjectComponent, opt).then(response => {
            console.log(response)
        })
    }

    generateSegmentBar() {
        for(let i=0; i<this.categories.length; i++) {
            let segmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
            segmentedBarItem.title = this.categories[i];
            this.items.push(segmentedBarItem);
        }
    }

    onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;
        this.selectedIndex = segmetedBar.selectedIndex;

        this.isBusy = true;

        setTimeout(() => {
            this.isBusy = false;
        }, 1000)

        switch (this.selectedIndex) {
            case 0:
                this.myFilteringFunc = (item: Media) => {
                    return item.type.includes("image");
                };
                break;
            case 1:
                this.myFilteringFunc = (item: Media) => {
                    return item.type.includes("video");
                };
                break;
            
            default:
                break;
        }
    }

    async getMedias() {
        try{
            let res = await this._mediaService.getMedias();

            if(res.data.length > 0) {
                this.medias = new ObservableArray<Media>(res.data)
            }

            this.isBusy = false;

        }catch(e) {
            console.log(e)
        }
    }
}