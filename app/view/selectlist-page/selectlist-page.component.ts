import { Component, OnInit, ViewContainerRef, ChangeDetectorRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { SearchBar } from "ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Page } from "tns-core-modules/ui/page";
import { StudentInfoModalComponent } from "../student-info-modal/student-info-modal.component";
import { SelectedIndexChangedEventData, ValueList } from "nativescript-drop-down";

import { ListViewLinearLayout, ListViewEventData, LoadOnDemandListViewEventData } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular";

// OTHERS
import * as moment from "moment";
import * as application from "tns-core-modules/application";

// MODELS
import { Student } from "../../models/student.model";

// SERVICES
import { SearchService } from "../../services/search.service";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "selectlist-page",
    moduleId: module.id,
    templateUrl: "./selectlist-page.component.html",
    styleUrls: ['./selectlist-page.component.css'],
})
export class SelectListComponent implements OnInit {

    isDone: boolean = false;
    isBusy: boolean = true;
    isIOS: boolean = false;
    isAndroid: boolean = false;
    isLoadingItems: boolean = false;

    projectId: number;
    lastId: number = 0;
    dateStart: string;

    layout: ListViewLinearLayout;

    lists: any = [];
    numberOfAddedItems: number = 0;
    page: number = 1;
    limit: number = 15;
    totalRows: number = 100;
    query: string = '';
    genderFilter: string;
    countryFilter: string;
    bandsFilter: string;
    
    navOptions: any;

    genders: ValueList<any>;
    countries: ValueList<any>;
    bands: ValueList<any>;
    selectedGender: number = 0;
    selectedCountry: number = 0;
    selectedBandsNeeded: number = 0;

    @ViewChild('myListView') listViewComp: RadListViewComponent;

    constructor(
        private _page: Page,
        private vcRef: ViewContainerRef,
        private _changeDetectionRef: ChangeDetectorRef,

        private modal: ModalDialogService,
        private params: ModalDialogParams,
        private _searchService: SearchService,
        private _activatedRoute: ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private _componentService: ComponentEventService,
    ) {

        this.isIOS = (application.ios)? true : false
        this.isAndroid = (application.android)? true : false;
        this.navOptions = this._componentService.getRouteOptions();

        // this._activatedRoute.queryParams.subscribe(params => {
        //     this.projectId = params['projectId'];
        //     this.dateStart = params['dateStart'];
        // })

        this.projectId = this.params.context.projectId;
        this.dateStart = this.params.context.dateStart;

        this.initDDValues();
    }

    ngOnInit() {
        this.layout = new ListViewLinearLayout();
        this.layout.scrollDirection = "Vertical";
        this.searchStudents();
        this._changeDetectionRef.detectChanges();
    }

    initDDValues() {
        this.genders = new ValueList<any>();
        this.countries = new ValueList<any>();
        this.bands = new ValueList<any>();

        let genders   = [{ value: 'All', display: 'Gender' }, { value: 'Male', display: 'Male' }, { value: 'Female', display: 'Female' }];
        let countries = [{ value: 'All', display: 'Country' }, { value: 'Guatemala', display: 'Guatemala' }, { value: 'Zimbabwe', display: 'Zimbabwe' }];
        let bands     = [{ value: 'All', display: 'Bands' }, { value: '0-300', display: '0-300' }, { value: '300-700', display: '300-700' }, { value: '700+', display: '700+' }]

        for(let g = 0; g < genders.length; g++) {
            this.genders.push(genders[g]);
        }

        for(let c = 0; c < countries.length; c++) {
            this.countries.push(countries[c]);
        }

        for(let b = 0; b < bands.length; b++) {
            this.bands.push(bands[b]);
        }

        this.genderFilter = this.genders.getValue(this.selectedGender)
        this.countryFilter = this.countries.getValue(this.selectedCountry)
        this.bandsFilter = this.bands.getValue(this.selectedBandsNeeded)
    }

    openStudentInfo(student) {
        let opt = {
            context: {
                studentId: student.studentId,
                type: 'project-approved'
            },
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true,
                transition: {
                    name: "slideLeft",
                    duration: 200,
                    curve: "ease"
                }
        }

        this.modal.showModal(StudentInfoModalComponent, opt).then(res => {
            if(res.success) {
                this._componentService.showLoader('Completing...');
                this._componentService.saveSelectedStudent(res.data);
                setTimeout(() => {
                    this._componentService.hideLoader();
                    this.onClose();

                }, 800)
            }
        });
    }

    onClose(){
        this.params.closeCallback({ 
            success: true, 
            projectId: this.projectId,
            dateStart: this.dateStart
        });
    }

    refresh(args: ListViewEventData) {
        this.resetParams();
        this.searchStudents()
    }

    loadMoreItems(args: ListViewEventData) {

        this.limit = 15;
        this.page += 1;

        this.isLoadingItems = true;

        this.searchStudents();
    }

    onSearch(args) {
        if (args.object.android) {
            args.object.dismissSoftInput();
            args.object.android.clearFocus();
            args.object.android.setFocusable(false);
        }
        
        let searchBar = <SearchBar>args.object;

        if(searchBar.text.length < 4) {
            this._componentService.showAlert("Ooops!", "Search query too short. Try to search more than 4 letters")
        }else {
            this.query = searchBar.text;

            if(!this.query) {
                return;
            }

            this.resetParams();
            this.searchStudents();
        }
    }

    onDDChange(name) {
        if(name === 'gender') {
            this.genderFilter = this.genders.getValue(this.selectedGender);
        }else if(name === 'country') {
            this.countryFilter = this.countries.getValue(this.selectedCountry);
        }else if(name === 'bands') {
            this.bandsFilter = this.bands.getValue(this.selectedBandsNeeded);
        }
        
        this.resetParams();
        this.searchStudents();
    }

    resetParams() {
        this.lastId = 0;
        this.page = 1;
        this.lists = [];
        this.isDone = false;
        this.isBusy = true;
    }

    getAge(birthDate) {
        let date = new Date(birthDate);

        return 'Age: ' + moment().diff(date, 'years');
    }

    toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    async searchStudents() {
        try{
            let res = await this._searchService.searchAvailableStudent(this.page, this.limit, this.query, this.lastId, this.genderFilter, this.countryFilter, this.bandsFilter);
            
            this.isBusy = false;
            this.isLoadingItems = false;
            this.totalRows = res.totalRows;

            this.lastId = (res.data.length > 0)? res.data[res.data.length - 1].studentId : 0;

            if(res.data.length > 0) {
                for(let i=0;i<res.data.length;i++) {
                    res.data[i].country = this.toTitleCase(res.data[i].country);
                    res.data[i].firstName = this._componentService.decodeUTF8(res.data[i].firstName);
                    res.data[i].lastName = this._componentService.decodeUTF8(res.data[i].lastName);
                    res.data[i].imageUrl = this._componentService.getImageProfileV2(res.data[i].imageUrl);
                    this.lists.push(res.data[i])
                }
            }
            
            if(this.lists.length === this.totalRows) {
                this.listViewComp.listView.notifyLoadOnDemandFinished(true);
            }

            setTimeout(() => {
                this.listViewComp.listView.notifyLoadOnDemandFinished();
                this.listViewComp.listView.notifyPullToRefreshFinished();
            })

        }catch(e) {
            this.isBusy = false;
            this.isLoadingItems = false;
        }
    }
}




