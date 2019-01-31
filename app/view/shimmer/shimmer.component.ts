import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "shimmer",
    moduleId: module.id,
    templateUrl: "./shimmer.component.html",
    styleUrls: ['./shimmer.component.css'],
})
export class ShimmerComponent implements OnInit {

	@Input('type') type: string;

    constructor() {}

    ngOnInit() {
    	console.log('type: '+this.type)
    }
}