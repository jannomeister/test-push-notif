import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs"

import { ConventionService } from "../../services/convention.service";

import { Convention } from "../../models/convention.model";

@Component({
    selector: "reference-list",
    moduleId: module.id,
    templateUrl: "./reference-list.component.html",
    styleUrls: ['./reference-list.component.css'],
})
export class ReferenceListComponent implements OnInit {

    isEmpty: boolean = false;
	conventions: Array<Convention> = [];

    page: number = 1;
    limit: number = 10;
    orderBy: string = 'DESC';

    constructor(
        private params: ModalDialogParams,
        private _conventionService: ConventionService,
    ) {} 

    ngOnInit() {
        this.getConventions();
    }

    onClose() {
    	this.params.closeCallback({ hasData: false });
	}

	onItemTap(args) {
        this.params.closeCallback({ hasData: true, data: this.conventions[args.index].name });
    }

    loadMoreItems() {
        this.page++;
        this.getConventions();
    }

    async getConventions() {
        try{
            let res = await this._conventionService.getConventions(this.page, this.limit, this.orderBy);
            
            for(let i = 0; i < res.data.length; i++) {
                this.conventions.push(res.data[i]);
            }

            this.isEmpty = (this.conventions.length === 0)? true : false;
        }catch(e) {

        }
    }
}