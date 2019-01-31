import { Component, OnInit, ViewContainerRef, ViewChild, NgZone, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Progress } from "ui/progress";
import { Page } from "tns-core-modules/ui/page";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { SelectedIndexChangedEventData, ValueList } from "nativescript-drop-down";
import { RouterExtensions } from "nativescript-angular/router";
import { DropDown } from 'nativescript-drop-down';
import { TokenModel, AutoCompleteEventData, RadAutoCompleteTextView } from "nativescript-ui-autocomplete";
import { RadAutoCompleteTextViewComponent } from "nativescript-ui-autocomplete/angular";

import { ReferenceListComponent } from "../../view/reference-list/reference-list.component";
import { SearchAddressModalComponent } from "../../view/search-address-modal/search-address-modal.component";
import { ProjectManagerInfoComponent } from "../../view/projectmanager-info-page/projectmanager-info-page.component";

// MODELS
import { User } from "../../models/user.model";
import { Project } from "../../models/project.model";

// SERVICES
import { UserService } from "../../services/user.service";
import { ConfigService } from "../../services/config.service";
import { ProjectService } from "../../services/project.service";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ComponentEventService } from "../../services/component-event.service";

// OTHERS
import * as dialogs from "ui/dialogs";
import * as httpModule from "http"; 
import * as moment from "moment";
import { openUrl } from "utils/utils";
import * as application from "application";
import { isIOS, isAndroid } from "platform";
import * as utils from "utils/utils";

@Component({
    selector: "start-project-page",
    moduleId: module.id,
    templateUrl: "./start-project-page.component.html",
    styleUrls: ['./start-project-page.component.css'],
})
export class StartProjectComponent implements OnInit {

    columns;

    // CURRENT DATES
    date: any = new Date();
    currentMonth: any = this.date.getMonth();
    currentYear: any = this.date.getFullYear();

    // PROGRESS VARIABLES
    formattedDateEnd: string = '';
    buttonText: string = 'Next';
    progressValue: number = 1;
    step: number = 1;
    // END OF PROGRESS VARIABLES

    // DROPDOWN CHOICES
    schoolClubTypes: Array<string> = [];
    affiliationTypes: Array<string> = [];
    affiliationStudentTypes: Array<string> = [];
    affiliationTeacherTypes: Array<string> = [];
    heardFromLists: Array<string> = [];
    days: Array<number> = [];
    years: Array<number> = [];
    months: Array<string> = [
        'January','February','March',
        'April','May','June','July',
        'August','September','October',
        'November','December'
    ]
    // END OF DROPDOWN CHOICES

    // DROPDOWN SELECTED VALUE
    affiliationSelected: number = 1;
    affiliationTypeSelected: number = 0;
    schoolClubSelected: number = 0;
    heardFromSelected: number = 0;
    monthSelected: number = 0;
    daySelected: number = 0;
    yearSelected: number = 0;
    // END OF DROPDOWN SELECTED VALUE

    // DROPDOWN BOOLEANS
    isStudentSelected: boolean = true;
    isSchoolClubOtherSelected: boolean = false;
    isHeardFromOtherSelected: boolean = false;
    isHeardFromConventionSelected: boolean = false;
    // END OF DROPDOWN BOOLEANS

    // ACTIVITY INDICATORS
    // isTeacherDataLoading: boolean = false;
    // END OF ACTIVITY INDICATORS

    isSubmitted: boolean = false;
    isChecked: boolean = false;
    hasValidSchoolAddress: boolean = false;

    routeName: string;
    navOptions: any;

    user: User;
    project: Project;

    dataItems: ObservableArray<TokenModel>;

    @ViewChild("checkbx") checkbx: ElementRef;
    @ViewChild("autoCmp") autoCmp: RadAutoCompleteTextViewComponent;

    constructor(
        private page: Page,
        private _ngZone: NgZone,
        private vcRef: ViewContainerRef,
        private _activatedRoute: ActivatedRoute,
        private _routerExtensions: RouterExtensions,

        private modal: ModalDialogService, 
        private _userService: UserService,
        private _projectService: ProjectService,
        private _configService: ConfigService,
        private _componentService: ComponentEventService,
    ) {
        page.actionBarHidden = true;

        this.user = new User();
        this.project = new Project();

        this.navOptions = this._componentService.getRouteOptions();
        this._activatedRoute.queryParams.subscribe(params => {
            this.routeName = params['route'];
        })

        this.initYear();

        setTimeout(() => {
            this.initMonth();
        }, 800)
    }

    ngOnInit() {
        this.initDropdownDatas();

        this.initProject();
        this.initSchoolClub();
        this.initAffiliationType();
        this.initAffiliation();
        this.initHeardFrom();
        
        this.getUserData();

        this.setProgressbarWidth(10);
    }

    setProgressbarWidth(percent) {
        this.columns = percent + "*," + (100 - percent) + "*";
    }

    initMonth() {
        let date = new Date();
        // let nextMonth = (date.getDate() === 1)? date.getMonth() : date.getMonth()+1;

        this.monthSelected = this.currentMonth;
        let currentMonth = this.currentMonth;
        this.getMondays(currentMonth+1, date.getFullYear());

    }

    initYear() {
        let currYear = new Date().getFullYear();
        let limitYear = currYear+15;

        while(currYear <= limitYear) {
            this.years.push(currYear);
            currYear++;
        }
    }

    initDropdownDatas() {
        this.schoolClubTypes = this.project.getSchoolClub();
        this.affiliationTypes = ['Student', 'Teacher'];
        this.affiliationStudentTypes = this.project.getAffiliation('student');
        this.affiliationTeacherTypes = this.project.getAffiliation('teacher');
        this.heardFromLists = this.project.getHeardFrom();
    }

    initProject() {
        let cd = this._userService.getStartProjectData();

        this.project.deserialize({
            userId:      0,
            studentId:   0,
            email:       null,
            phoneNumber: (cd.phoneNumber)? cd.phoneNumber : null,
            schoolName:  (cd.schoolName)? cd.schoolName : null,
            userSchoolAffiliation:     (cd.userSchoolAffiliation)? cd.userSchoolAffiliation : this.affiliationTypes[0],
            userSchoolAffiliationType: (cd.userSchoolAffiliationType)? cd.userSchoolAffiliationType : this.affiliationStudentTypes[0],
            clubSponsor: (cd.clubSponsor)? cd.clubSponsor : this.schoolClubTypes[0],
            teacherName: (cd.teacherName)? cd.teacherName : '',
            teacherEmail: (cd.teacherEmail)? cd.teacherEmail : '',
            schoolAddress: (cd.schoolAddress)? cd.schoolAddress : '',
            schoolEnrollees: (cd.schoolEnrollees)? cd.schoolEnrollees : null,
            dateStart:   (cd.dateStart)? cd.dateStart : '',
            dateEnd:     (cd.dateEnd)? cd.dateEnd : '',
            heardFrom:   (cd.heardFrom)? cd.heardFrom : this.heardFromLists[0]
        })

        this.saveToCache();
    }

    saveToCache() {
        this._userService.saveStartProjectData(this.project);
    }

    modelChange(data, type) {
        this.project[type] = data;
        this.saveToCache();
    }

    open(url) {
        openUrl(url);
    }

    openModal() {
        let opt = {
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true
        }

        this.modal.showModal(ReferenceListComponent, opt).then(res => {
            if(res.hasData) {
                this.isHeardFromConventionSelected = true;
                this.project.heardFrom = res.data;
            }else{
                this.isHeardFromOtherSelected = true;
                this.isHeardFromConventionSelected = false;
                this.project.heardFrom = null;
                this.heardFromSelected = this.heardFromLists.length - 1;
            }

            this.saveToCache();
        })
    }

    searchAddress() {
        let opt = {
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true
        }

        this.modal.showModal(SearchAddressModalComponent, opt).then(res => {
            if(res.success) {
                this.project.schoolAddress = res.data;
                this.saveToCache();
            }
        })
    }

    /** PROGRESS CONFIG **/
    progressBarLoaded(args) {
        let progressBar = <Progress>args.object;

        progressBar.value = this.step;
        progressBar.maxValue = 5;
    }

    progressValueChanged(args) {
        let progressBar = <Progress>args.object;
    }
    /** END OF PROGRESS CONFIG **/

    /** DROPDOWN CONFIG **/
    initSchoolClub() {
        this.schoolClubSelected = this.schoolClubTypes.indexOf(this.project.clubSponsor);
    }

    initAffiliationType() {
        this.affiliationSelected = this.affiliationTypes.indexOf(this.project.userSchoolAffiliation)

        this.isStudentSelected = (this.affiliationSelected > 0)? false : true;
    }

    initAffiliation() {  
        if(this.affiliationSelected == 0) {
            this.affiliationTypeSelected = this.affiliationStudentTypes.indexOf(this.project.userSchoolAffiliationType);
        }else if(this.affiliationSelected == 1) {
            this.affiliationTypeSelected = this.affiliationTeacherTypes.indexOf(this.project.userSchoolAffiliationType);
        }
    }

    initHeardFrom() {
        this.heardFromSelected = this.heardFromLists.indexOf(this.project.heardFrom);
    }

    onDropdownChanged(args: SelectedIndexChangedEventData, field) {

        if(field === 'affiliation') {
            if(args.newIndex === 1) this.project.clearTeacher();

            this.project.userSchoolAffiliation = this.affiliationTypes[args.newIndex];
            this.project.userSchoolAffiliationType = (args.newIndex === 1)? this.affiliationTeacherTypes[0] : this.affiliationStudentTypes[0];
        
            this.affiliationTypeSelected = 0;
        }else if(field === 'affiliation-type') {
            this.project.userSchoolAffiliationType = (this.affiliationSelected === 1)? this.affiliationTeacherTypes[args.newIndex] : this.affiliationStudentTypes[args.newIndex]; 
        }else if(field === 'heard-from') {
            let arrLength = this.heardFromLists.length-1;

            if(args.newIndex === arrLength) {
                this.isHeardFromOtherSelected = true;
            }else{
                this.isHeardFromOtherSelected = false;
                this.project.heardFrom = this.heardFromLists[args.newIndex];
            }
        }else if(field === 'school-club') {
            let arrLength = this.schoolClubTypes.length-1;

            if(args.newIndex === arrLength) {
                this.isSchoolClubOtherSelected = true;
            }else{
                this.isSchoolClubOtherSelected = false;
                this.project.clubSponsor = this.schoolClubTypes[args.newIndex];
            }
        }

        this.saveToCache();
    }

    onDropdownClose(field) {

        setTimeout(() => {

            if(field === 'affiliation') {

                this.isStudentSelected = (this.affiliationSelected > 0)? false : true;

            }else if(field === 'school-club') {

                let arrLength = this.schoolClubTypes.length-1;

                if(this.schoolClubSelected === arrLength) {
                    this.project.clubSponsor = null;
                    this.isSchoolClubOtherSelected = true;
                }else{
                    this.project.clubSponsor = this.schoolClubTypes[this.schoolClubSelected];
                    this.isSchoolClubOtherSelected = false;
                }

            }else if(field === 'heard-from') {

                let arrLength = this.heardFromLists.length;
                let ifOther = arrLength - 1
                let ifConventions = arrLength - 2;

                if(this.heardFromSelected === ifOther) {
                    this.project.heardFrom = null;
                    this.isHeardFromOtherSelected = true;
                    this.isHeardFromConventionSelected = false;
                }else if(this.heardFromSelected === ifConventions) {
                    this._componentService.showLoader('Opening...')

                    setTimeout(() => {
                        this._componentService.hideLoader();
                        this.openModal();
                    }, 500)
                }else{
                    this.project.heardFrom = this.heardFromLists[this.heardFromSelected];
                    this.isHeardFromOtherSelected = false;
                    this.isHeardFromConventionSelected = false;
                }
            }

            this.saveToCache();

        }, 400)
    }
    /** END OF DROPDOWN CONFIG **/

    /** CHECKBOX CONFIG **/
    checkedBoxChanged(checkbx) {
        this.isChecked = checkbx.checked;
    }
    /** END OF CHECKBOX CONFIG **/

    /** DATE CONFIGS (PAGE FOUR) **/
    onChangeMonth(event: SelectedIndexChangedEventData) {
        let selectedMonth = event.newIndex;

        this.configureDate(selectedMonth, this.currentMonth);
    }

    onChangeDay(event: SelectedIndexChangedEventData) {
        this.daySelected = event.newIndex;
        this.validateDate();
    }

    onChangeYear(event: SelectedIndexChangedEventData) {
        this.yearSelected = event.newIndex;

        this.configureDate(this.monthSelected, this.currentMonth);
    }

    configureDate(selectedMonth, currentMonth) {

        let selectedYear = this.years[this.yearSelected];

        let isCurrentYear = (this.currentYear === selectedYear)? true : false;

        if(isCurrentYear) {
            if(selectedMonth < currentMonth) {
                setTimeout(() => {
                    this.monthSelected = currentMonth;

                    setTimeout(() => {
                        this.getMondays(currentMonth+1, selectedYear);
                    }, 500)
                }, 100)
            }else {
                setTimeout(() => {
                    this.getMondays(selectedMonth+1, selectedYear);
                }, 100)
            }
        }else {
            setTimeout(() => {
                this.getMondays(selectedMonth+1, selectedYear);
            }, 100)
        }
    }

    validateDate() {

        let start = this.project.formatProjectDurationDate(
            this.monthSelected, 
            this.days[this.daySelected],
            this.years[this.yearSelected],
            'start'
        );

        let end = this.project.formatProjectDurationDate(
            this.monthSelected, 
            this.days[this.daySelected],
            this.years[this.yearSelected],
            'end'
        );

        this.project.dateStart = start.date;
        this.project.dateEnd = end.date;
        this.formattedDateEnd = end.formatted;
        this.saveToCache();
    }

    getMondays(month?, year?) {

        console.log("month: "+month)
        console.log("year: "+year)

        this.days = [];
        let dayArr = [];
  
        let currDate = new Date();
        let currMonth = currDate.getMonth()+1;
        let currYear = currDate.getFullYear();
          
        let isCurrMonth = (currMonth === month)? true : false;
          /* let isAfterCurrMonth = (currMonth+1 === month)? true : false; */
        let isCurrYear = (currYear === year)? true : false;
          
        let currDay  = (isCurrMonth)? currDate.getDate() : 1;

        let selectedDate = new Date(`${year}/${month}/${currDay}`);

        if((isCurrMonth) && isCurrYear ) {
            selectedDate.setDate(selectedDate.getDate()+14)
        }

        while(selectedDate.getDay() !== 1) {
            selectedDate.setDate(selectedDate.getDate() + 1);
        }

        let days = moment(selectedDate).daysInMonth();
        let currentDay = selectedDate.getDate();
          
        while(currentDay <= days) {
            let tempYear = selectedDate.getFullYear();
            let tempMonth = selectedDate.getMonth()+1;
            let date = new Date(`${tempYear}/${tempMonth}/${currentDay}`);

            if(date.getDay() === 1) {
                dayArr.push(date.getDate())
            }

            currentDay++;
        }

        setTimeout(() => {
            this.days = dayArr;
            this.daySelected = 0;

            this.monthSelected = selectedDate.getMonth();
            this.yearSelected = this.years.indexOf(selectedDate.getFullYear());
            this.validateDate();
        }, 100)

    }
    /** END OF DATE CONFIGS (PAGE FOUR) **/

    next() {
        this.validatePage();
        // this.incrementStep();
    }

    validatePage() {
        if(this.step == 1) {
            if(!this.project.isStepClean(this.step)) {
                this._componentService.showAlert('Ooops!', 'All Fields are required');
            }else if(!this.user.getFullName()) {
                this._componentService.showAlert('Ooops!', 'Name is required! You can update your name by going to settings > Edit Profile Info.')
            }else if(!this._componentService.validateEmail(this.project.email)) {
                this._componentService.showAlert('Ooops!', 'Invalid Email Address')
            }else if(!this._componentService.validatePhoneNumber(this.project.phoneNumber)) {
                this._componentService.showAlert('Ooops!', 'Invalid Phone number')
            }else {
                if (isIOS) {
                    utils.ios.getter(UIApplication, UIApplication.sharedApplication)
                        .keyWindow
                        .endEditing(true);
                }
                this.incrementStep();
                this.saveToCache();
            }
            
        }else if(this.step === 2) {
            if(!this.project.isStepClean(this.step)) {
                this._componentService.showAlert('Ooops!', 'All Fields are required')
            }else {
                if (isIOS) {
                    utils.ios.getter(UIApplication, UIApplication.sharedApplication)
                        .keyWindow
                        .endEditing(true);
                }
                this.incrementStep();
                this.saveToCache();
            }

        }else if(this.step === 3) {
            if((this.affiliationSelected === 0) && (!this.project.isStepClean(this.step))) {
                this._componentService.showAlert('Ooops!', 'Teacher\'s name and email are required')
            }else if((this.affiliationSelected === 0) && !this._componentService.validateEmail(this.project.teacherEmail)) {
                this._componentService.showAlert('Ooops!', 'Invalid Email Address')
            }else {
                if (isIOS) {
                    utils.ios.getter(UIApplication, UIApplication.sharedApplication)
                        .keyWindow
                        .endEditing(true);
                }
                this.incrementStep();
                this.saveToCache();
            }

        }else if(this.step === 4) {
            this.incrementStep();
            this.buttonText = 'Submit';
        }else if(this.step === 5) {
            if(!this.project.isStepClean(this.step)) {
                this._componentService.showAlert('Ooops!', 'All Fields are required')
            }else if(!this.isChecked) {
                this._componentService.showAlert('Ooops!', 'Are you allowed by your school?')
            }else {
                this.add();
            }
        }
    }

    incrementStep() {
        this.progressValue += 1;
        this.step += 1;
    }

    add() {
        this._componentService.showLoader('Submitting...')
        this.createProject();
    }

    onClose(){
        this._routerExtensions.back();
        // this.navOptions.clearHistory = true;
        // this.navOptions.transition.name = 'slideRight';
        // this._routerExtensions.navigate(['/dashboard'], this.navOptions);
    }

    goTo() {
        if(this.routeName === 'tabs') {
            this.navOptions.clearHistory = true;
            this.navOptions.transition.name = 'slideLeft';
            this._routerExtensions.navigate(['/resources'], this.navOptions);
        }else if(this.routeName === 'start'){
            this.navOptions.clearHistory = true;
            this.navOptions.transition.name = 'slideLeft';
            this._routerExtensions.navigate(['/resources'], this.navOptions);
        }else {
            this._routerExtensions.back();
        }
    }

    help() {
        let userId = this._userService.getCurrentUserId();
        dialogs.action({
            message: "Need Help?",
            cancelButtonText: "Cancel",
            actions: ["Contact Yuda Bands representative now", "Visit FAQ Page"]
        }).then((result) => {
            if(result === "Visit FAQ Page"){
                openUrl("http://www.yudabands.org/faqs/");
            }else if(result === "Contact Yuda Bands representative now") {
                // this.navOptions.transition.curve = 'linear';
                // this.navOptions.queryParams = { userId: 1 };
                // this._routerExtensions.navigate(['/project-manager-info'], this.navOptions);
                let opt = {
                    context: { 
                        userId: 1
                    },
                    fullscreen: true,
                    viewContainerRef: this.vcRef,
                    animated: true,
                    transition: {
                        name: "slideTop",
                        duration: 200,
                        curve: "ease"
                    }
                }

                this.modal.showModal(ProjectManagerInfoComponent, opt).then(response => {
                    console.log(response)
                })
            }else {
                console.log(result)
            }
        });
    }

    async getUserData() {
        let userId = this._userService.getCurrentUserId();
        let cd = this._userService.getStartProjectData();

        this._componentService.showLoader('Loading...')

        try{
            let res = await this._userService.getUserData(userId);

            this._componentService.hideLoader();

            this.user.deserialize(res.data);
            this.project.userId = this.user.userId;
            this.project.phoneNumber = (cd.phoneNumber)? cd.phoneNumber : this.user.phoneNumber;
            this.project.email = this.user.email;
            this.saveToCache();

        }catch(e){
            this._componentService.hideLoader();
        }
    }

    async createProject() {
        try{
            let res = await this._projectService.createProject(this.project);

            this._componentService.hideLoader();

            this.isSubmitted = true;
            this._userService.removeStartProjectData();

            dialogs.alert({
                title: "Well Done!",
                message: "Your project will be approved shortly! In the meantime, please explore the videos under the resources tab",
                okButtonText: "Done"
            }).then(() => {
                this.goTo();
            });
            
        }catch(e) {
            this._componentService.hideLoader();
        }
    }

}