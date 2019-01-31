import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { RouterExtensions } from "nativescript-angular/router";
import { SearchBar } from "ui/search-bar";
import { StudentInfoModalComponent } from "../student-info-modal/student-info-modal.component";

// SERVICES
import { UserService } from "../../services/user.service";
import { SearchService } from "../../services/search.service";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ComponentEventService } from "../../services/component-event.service";


import * as dialogs from "ui/dialogs";

@Component({
    selector: "general-search",
    moduleId: module.id,
    templateUrl: "./general-search.component.html",
    styleUrls: ['./general-search.component.css'],
})
export class SearchComponent implements OnInit {

    /* SEGMENT BAR VARIABLES */
    items: Array<SegmentedBarItem>;
    selectedIndex = 0;
    visibility1 = true;
    visibility2 = false;
    visibility3 = false;

    categories: any = ['All', 'Student', 'Projects'];

    /* DATA TO DISPLAY */
    isEmpty: boolean = false;
    isInitialized: boolean = true;
    isSearchBusy: boolean = false;
    lists: any = [];
    studentLists: any = [];
    projectLists: any = [];
    lastId: number = 0;
    pageList: number = 1;
    pageStudentList: number = 1;
    pageProjectList: number = 1;
    limit: number = 2;
    orderBy: string = 'DESC';

    searchQuery: string;

    constructor(
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private _routerExtensions: RouterExtensions,
        private _userService: UserService,
        private _searchService: SearchService,
        private _componentService: ComponentEventService,
    ) {
        this.items = [];
            
        for(let i=0; i<this.categories.length; i++) {
            let segmentedBarItem = <SegmentedBarItem>new SegmentedBarItem();
            segmentedBarItem.title = this.categories[i];
            this.items.push(segmentedBarItem);
        }

        this.selectedIndex = 0;

        this.listenSearchBarTextChange();
    }

    ngOnInit() {}

    goTo(data, type) {
        if(type === 'project') {
            this.openProjectInfo(data);
        }else{
            this.openStudentInfo(data);
        }
    }

    openProjectInfo(data) {
        this._routerExtensions.navigate(['/project', data.projectId],{
            animated: true,
            transition: {
                name: "slideLeft",
                duration: 200,
                curve: "ease"
            }})
    }

    openStudentInfo(data) {
        let opt = {
            context: {
                studentId: data.studentId,
                type: 'search-student'
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
            console.log(res)
        });

    }

    listenSearchBarTextChange() {
        this._componentService.searchQuery.subscribe(searchQuery => {
            this.searchQuery = searchQuery;
            this.onSearch();
        })
    }

    onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;

        this.selectedIndex = segmetedBar.selectedIndex;

        switch (this.selectedIndex) {
            case 0:
               
                if(this.searchQuery) {
                    this.pageList = 1
                    this.lists = []
                    this.isInitialized = false;
                    this.searchAll();
                }

                this.visibility1 = true;
                this.visibility2 = false;
                this.visibility3 = false;
                break;
            case 1:
                
                if(this.searchQuery) {
                    this.pageStudentList = 1
                    this.studentLists = []
                    this.isInitialized = false;
                    this.searchStudents();
                }

                this.visibility1 = false;
                this.visibility2 = true;
                this.visibility3 = false;
                break;
            case 2:
                
                if(this.searchQuery) {
                    this.pageProjectList = 1
                    this.projectLists = []
                    this.isInitialized = false;
                    this.searchProjects();
                }

                this.visibility1 = false;
                this.visibility2 = false;
                this.visibility3 = true;
                break;
            default:
                break;
        }
    }

    alltemplateSelector(item: any, index: number, items: any) {
        if (item.searchType === "project") {
            return "project"
        } 
          
        if (item.searchType === "student") {
            return "student";
        }
          
        throw new Error("Unrecognized template!")
    }

    loadMoreItems(tab) {

        if(tab === 'all') {
            this.pageList += 1;
            this.searchAll();

        }else if(tab === 'student') {
            this.pageStudentList += 1;
            this.searchStudents();

        }else if(tab === 'project') {
            this.pageProjectList += 1;
            this.searchProjects();
        }
    }

    onSearch() {

        if(this.selectedIndex === 0) {

            this.pageList = 1
            this.lists = [];
            this.isEmpty = false;
            this.isInitialized = false;
            this.searchAll();

        }else if(this.selectedIndex === 1) {

            this.pageStudentList = 1
            this.studentLists = [];
            this.isEmpty = false;
            this.isInitialized = false;
            this.searchStudents();

        }else if(this.selectedIndex === 2) {

            this.pageProjectList = 1
            this.projectLists = [];
            this.isEmpty = false;
            this.isInitialized = false;
            this.searchProjects();

        }
    }

    async searchAll() {
        try{
            let res = await this._searchService.searchAll(this.searchQuery, this.pageList, this.limit+3, this.orderBy);
            
            this.isInitialized = true;
            if(res.data.length > 0) {
                for(let i = 0; i < res.data.length; i++) {

                    res.data[i].name = this._componentService.decodeUTF8(res.data[i].name)
                    res.data[i].imageUrl = this._componentService.getImageProfileV2(res.data[i].imageUrl);

                    this.lists.push(res.data[i])
                }
            }

            this.isEmpty = (this.lists.length === 0)? true : false;
        }catch(e) {
            this.isInitialized = true;
        }
    }

    async searchStudents() {
        try{
            let res = await this._searchService.searchAvailableStudent(this.pageStudentList, this.limit+8, this.searchQuery, this.lastId, '', '', '');
            
            this.isInitialized = true;

            this.lastId = (res.data.length > 0)? res.data[res.data.length - 1].studentId : 0;

            if(res.data) {
                for(let i = 0; i < res.data.length; i++) {

                    res.data[i].firstName = this._componentService.decodeUTF8(res.data[i].firstName)
                    res.data[i].lastName = this._componentService.decodeUTF8(res.data[i].lastName)
                    res.data[i].imageUrl = this._componentService.getImageProfileV2(res.data[i].imageUrl);

                    this.studentLists.push(res.data[i])
                }
            }

            this.isEmpty = (this.studentLists.length === 0)? true : false;
        }catch(e) {
            this.isInitialized = true;
        }
    }

    async searchProjects() {
        try{
            let res = await this._searchService.searchProjects(this.searchQuery, this.pageProjectList, this.limit+8, this.orderBy);
            
            this.isInitialized = true;
            if(res.data) {
                for(let i = 0; i < res.data.length; i++) {

                    res.data[i].imageUrl = this._componentService.getImageProfileV2(res.data[i].imageUrl);
                    
                    this.projectLists.push(res.data[i])
                }
            }

            this.isEmpty = (this.projectLists.length === 0)? true : false;
        }catch(e) {
            this.isInitialized = true;
        }
    }
}