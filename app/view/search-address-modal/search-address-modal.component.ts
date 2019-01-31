import { Component, OnInit, HostListener } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { SearchBar } from "ui/search-bar";

import { SearchService } from "../../services/search.service";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "search-address-modal",
    moduleId: module.id,
    templateUrl: "./search-address-modal.component.html",
    styleUrls: ['./search-address-modal.component.css'],
})
export class SearchAddressModalComponent implements OnInit {
	
    isBusy: boolean = false;

    address: Array<any> = [];

	constructor(
        private params: ModalDialogParams,
        private _searchService: SearchService,
        private _componentService: ComponentEventService
    ) { }

	ngOnInit() {}

    loadMoreItems() {}

	onClose() {
    	this.params.closeCallback({ success: false });
	}

    search(args) {
        let searchBar = <SearchBar>args.object;

        this.isBusy = true;

        setTimeout(() => {
            this.searchAddressAutocomplete(searchBar.text);
        }, 900)
    }

    selectAddress(address){
        this._componentService.showLoader('Selecting...');

        setTimeout(() => {
            this._componentService.hideLoader();
            this.params.closeCallback({ success: true, data: address.formattedName });
        }, 900)
    }    

    async searchAddressAutocomplete(searchQuery) {
        try{
            let res = await this._searchService.searchAddressAutocomplete(searchQuery);

            this.isBusy = false;
            if(res.data.length > 0) {
                this.address = res.data;
            }
        }catch(e) {
            console.log(e)
        }
    }
}