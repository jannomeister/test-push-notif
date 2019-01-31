import { Injectable, HostListener } from "@angular/core";
import { Color } from "tns-core-modules/color";
import { TNSCoachMarks, TNSCoachMark, ICoachMarkOptions } from 'nativescript-coachmarks';

import { UserService } from "./user.service";
import { ComponentEventService } from "./component-event.service";

declare var CGRectMake, UIScreen, UIColor;

@Injectable()
export class CoachMarkService {

	coachMark: any;
	currentTour: string;

    //actionbar
    notifButton: any;
    searchBar: any;

    //tabs
    homeTab: any;
    resourcesTab: any;
    projectTab: any;
    profileTab: any;
    settingsTab: any;

	constructor(
        private _userService: UserService,
        private _componentService: ComponentEventService
    ) {
		TNSCoachMarks.DEBUG = true;
	}

	actionBarTour(searchBar, notifButton) {
        this.currentTour = 'actionbar';
        this.searchBar = searchBar
        this.notifButton = notifButton;

        let isTourDone = this._userService.getTourStatus();

        if(!isTourDone) this.initCoachMarkConfig();
	}

    tabsTour() {
        this.currentTour = 'tabs';

        let isTourDone = this._userService.getTourStatus();

        if(!isTourDone) this.initCoachMarkConfig();
    }

    setTab(homeTab, resourcesTab, projectTab, profileTab, settingsTab) {
        this.homeTab = homeTab;
        this.resourcesTab = resourcesTab;
        this.projectTab = projectTab;
        this.profileTab = profileTab;
        this.settingsTab = settingsTab;
    }

	initCoachMarkConfig() {
		let marksOptions;

        this.coachMark = new TNSCoachMarks();
        this.coachMark.initEvents();
        this.setupEvents();

		if(this.currentTour === 'actionbar') {
			marksOptions = this.actionBarMarksOptions();
		}else if(this.currentTour === 'tabs') {
            marksOptions = this.tabsMarksOptions();
        }
		TNSCoachMarks.start(marksOptions, this.getICoachMarkOptions(), this.coachMark);
	}

	actionBarMarksOptions() {
		return [
			new TNSCoachMark({
				position: CGRectMake(
                    this.searchBar.originX, // x axis 
                    this.searchBar.originY, // y axis
                    this.searchBar.width, // width
                    this.searchBar.height // height
                ),
                caption: 'If you want to search something just click this search bar.',
                shape: TNSCoachMark.SHAPES.DEFAULT,
                labelPosition: TNSCoachMark.LABEL_POSITIONS.BOTTOM,
                labelAlignment: TNSCoachMark.LABEL_ALIGNMENTS.RIGHT,
                showArrow: true
			}), 
			new TNSCoachMark({
				position: CGRectMake(
                    this.notifButton.originX - 2.5, // x axis 
                    this.notifButton.originY - 2.5, // y axis
                    this.notifButton.width + 5, // width
                    this.notifButton.height + 5 // height
                ),
                caption: 'This is the notification icon. You can view all your notifications by clicking it.',
                shape: TNSCoachMark.SHAPES.CIRCLE,
                labelPosition: TNSCoachMark.LABEL_POSITIONS.LEFT,
                labelAlignment: TNSCoachMark.LABEL_ALIGNMENTS.LEFT,
                showArrow: true
			})
		]
	}

    tabsMarksOptions() {
        return [
            new TNSCoachMark({
                position: CGRectMake(
                    this.homeTab.originX,
                    this.homeTab.originY,
                    this.homeTab.width,
                    this.homeTab.height
                ),
                caption: 'You can view active projects here.',
                shape: TNSCoachMark.SHAPES.DEFAULT,
                labelPosition: TNSCoachMark.LABEL_POSITIONS.TOP,
                labelAlignment: TNSCoachMark.LABEL_ALIGNMENTS.LEFT,
                showArrow: true
            }),

            new TNSCoachMark({
                position: CGRectMake(
                    this.resourcesTab.originX,
                    this.resourcesTab.originY,
                    this.resourcesTab.width,
                    this.resourcesTab.height
                ),
                caption: 'You can access all the media resources here.',
                shape: TNSCoachMark.SHAPES.DEFAULT,
                labelPosition: TNSCoachMark.LABEL_POSITIONS.TOP,
                labelAlignment: TNSCoachMark.LABEL_ALIGNMENTS.CENTER,
                showArrow: true
            }),

            new TNSCoachMark({
                position: CGRectMake(
                    this.projectTab.originX,
                    this.projectTab.originY,
                    this.projectTab.width,
                    this.projectTab.height
                ),
                caption: 'You can add/view your own project by clicking this.',
                shape: TNSCoachMark.SHAPES.DEFAULT,
                labelPosition: TNSCoachMark.LABEL_POSITIONS.TOP,
                labelAlignment: TNSCoachMark.LABEL_ALIGNMENTS.RIGHT,
                showArrow: true
            }),

            new TNSCoachMark({
                position: CGRectMake(
                    this.profileTab.originX,
                    this.profileTab.originY,
                    this.profileTab.width,
                    this.profileTab.height
                ),
                caption: 'Click this to view your profile.',
                shape: TNSCoachMark.SHAPES.DEFAULT,
                labelPosition: TNSCoachMark.LABEL_POSITIONS.TOP, //BOTTOM,LEFT,TOP,RIGHT,RIGHT_BOTTOM
                labelAlignment: TNSCoachMark.LABEL_ALIGNMENTS.RIGHT, //CENTER,LEFT,RIGHT
                showArrow: true
            }),

            new TNSCoachMark({
                position: CGRectMake(
                    this.settingsTab.originX,
                    this.settingsTab.originY,
                    this.settingsTab.width,
                    this.settingsTab.height
                ),
                caption: 'Check your settings by clicking this.',
                shape: TNSCoachMark.SHAPES.DEFAULT,
                labelPosition: TNSCoachMark.LABEL_POSITIONS.LEFT,
                labelAlignment: TNSCoachMark.LABEL_ALIGNMENTS.LEFT,
                showArrow: true
            })
        ]
    }

	getICoachMarkOptions() {
        let options: ICoachMarkOptions = {
            continueLabelText: '',
            skipButtonText: 'Skip',
            lblSpacing: 30,
            // maskColor: UIColor.colorWithRedGreenBlueAlpha(0.30, 0.46, 0.89, .9)
        };

        return options;
    }

	setupEvents() {
        this.coachMark.events.on('navigate', (eventData) => {
            // you can customize buttons and bar at each step
            this.customizeStyle(eventData.data);
        });

        this.coachMark.events.on('click', (eventData) => {});

        this.coachMark.events.on('cleanup', (eventData) => {
            console.log(`ready to cleanup in demo.`);
            console.log(this.currentTour)
            this.coachMark = undefined;

            if(this.currentTour === 'actionbar') {
                this.tabsTour();
            }else{
                if(this.currentTour === 'tabs') {
                    this._userService.saveTourStatus(true);
                }
            }
        });
    }

    customizeStyle(data: any) {
        // console.log(data.instance.arrowImage.image);
        // could customize the arrowImage at each step 
        // data.instance.arrowImage.image = UIImage.imageNamed('someimage.png');
        // console.log(data.instance.btnSkipCoach);
        // console.log(data.instance.lblCaption);
        // console.log(data.instance.lblContinue);
        if (data.instance.lblContinue) {
            // only available when 'ready' is called
            // it disappears after the first tap and advance to next step
            // let labelContinue = data.instance.lblContinue.frame; // -20
            // data.instance.lblContinue.frame = CGRectMake(labelContinue.origin.x, labelContinue.origin.y - 200, labelContinue.size.width, labelContinue.size.height + 20);
            data.instance.lblContinue.backgroundColor = new Color(0.9,0,0,0).ios; 
              //0,0,0 alpha 0.9
            // custom caption color
            data.instance.lblCaption.textColor = new Color('#FFE108').ios;  

            // customize skip button
            let btnSkip = data.instance.btnSkipCoach.frame;
            data.instance.btnSkipCoach.frame = CGRectMake(btnSkip.origin.x, btnSkip.origin.y - 300, btnSkip.size.width, btnSkip.size.height + 20);
            data.instance.btnSkipCoach.backgroundColor = new Color('#FFE108').ios;
            data.instance.btnSkipCoach.textColor = new Color('#000000').ios; 
        }    
    }

    @HostListener('change')
    tourChangeListener(isTourDone) {
        this._componentService.tourChanged(isTourDone);
    }
}