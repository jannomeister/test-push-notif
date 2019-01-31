import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";

import { ProjectReportService } from "../../services/project-report.service";
import { ComponentEventService } from "../../services/component-event.service";

import { Report } from "../../models/report.model";

@Component({
    selector: "project-report-page",
    moduleId: module.id,
    templateUrl: "./project-report-page.component.html",
    styleUrls: ['./project-report-page.component.css'],
})
export class ProjectReportComponent implements OnInit {
    
	pageNum: number = 1;
    report: Report;

    data: any = {
        bandsShipped: 0,
        bandsReceived: 0,
        bandsSold: 0,
        raisedMoney: 0
    }
    
    constructor(
        private _page: Page,
        private _activatedRoute: ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private _projectReportService: ProjectReportService,
        private _componentService: ComponentEventService,
    ) {
        _page.actionBarHidden = true;

        this.report = new Report();
        this.report.deserialize({
            projectId: 0,
            totalExtraBand: 0,
            extraDonation: 0
        })

        this._activatedRoute.queryParams.subscribe(params => {
            this.report.projectId = parseInt(params['projectId']);
        })
    }

    ngOnInit() {
        this._componentService.showLoader('Loading...')
        this.getSalesReport();
    }

    onClose(){
        this._routerExtensions.back();
    }

    getTotalRaisedMoney() {
        return Number(this.data.raisedMoney) + Number(this.report.extraDonation);
    }

    submit() {
        // this.report.totalExtraBand = this.report.totalExtraBand;
        // this.report.extraDonation = this.report.extraDonation;

        if(!this.report.isRequiredFieldsNotEmpty()) {
            this._componentService.showAlert('Ooops!', 'Raised money is required.');
            return;
        }else if(Number(this.report.totalExtraBand) > Number(this.data.bandsReceived)) {
            this._componentService.showAlert('Ooops!', 'Extra should not exceed bands received');
            return;
        }

        this.createReport();
    }

    done() {
        this._routerExtensions.back();
    }

    async createReport() {
        this._componentService.showLoader('Loading...')

        try{
            let res = await this._projectReportService.createReport(this.report);

            this._componentService.hideLoader();

            this.pageNum = (res.data)? 2 : this.pageNum;

        }catch(e) {
            this._componentService.hideLoader();
        }
    }

    async getSalesReport() {
        try{
            let res = await this._projectReportService.getSalesReport(this.report.projectId);

            this._componentService.hideLoader();
            this.data = res;

        }catch(e) {
            this._componentService.hideLoader();
            this._componentService.showErrorFeedback('Oopps!', 'Something went wrong. Please try again later.')
        }
    }
   
}