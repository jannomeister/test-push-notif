import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Progress } from "ui/progress";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Observable } from "tns-core-modules/data/observable";

// MODELS
import { Feedback } from "../../models/feedback.model";

// SERVICES
import { UserService } from "../../services/user.service";
import { ProjectFeedbackService } from "../../services/project-feedback.service";
import { ComponentEventService } from "../../services/component-event.service";

@Component({
    selector: "feedback-page",
    moduleId: module.id,
    templateUrl: "./feedback-page.component.html",
    styleUrls: ['./feedback-page.component.css'],
})
export class FeedbackComponent implements OnInit {

	progressValue: number;
    pageNum: number;

    feedback: Feedback;

    data = new Observable();

    @ViewChild('rating') rt: ElementRef;

    constructor(
        private params: ModalDialogParams,
        private _userService: UserService,
        private _componentService: ComponentEventService,
        private _projectFeedbackService: ProjectFeedbackService,
    ) {
        this.feedback = new Feedback();
        this.feedback.deserialize({
            projectId: 0,
            userId: 0,
            rating: 0,
            concern: ''
        });

        this.data.set('rating', 0);
    }

    ngOnInit() {
        this.feedback.userId = this._userService.getCurrentUserId();
        this.feedback.projectId = this.params.context.projectId;
        
     	this.progressValue = 1;
        this.pageNum = 1;
    }

    ngAfterViewInit() {
        let rating = this.rt.nativeElement;

        rating.on('valueChange', (args) => {
            const value = args.object.get('value');

            this.feedback.rating = value;
        })
    }

    onValueChanged(args) {
        let progressBar = <Progress>args.object;
    }

    onClose() {
        this.params.closeCallback(false);
    }

    next() {
        if(this.feedback.rating > 0) {
            this.progressValue += 1;
            this.pageNum += 1;
        }else {
            this._componentService.showAlert('Ooops!', 'Do you mind giving us a star?')
        }
    }

    submit() {
        this._componentService.showLoader('Loading...')

        setTimeout(() => {
            this.createFeedback();
        })
    }

    async createFeedback() {
        try{
            let res = await this._projectFeedbackService.createFeedback(this.feedback);
            
            this._componentService.hideLoader();
            if(res.data){
                this._componentService.showSuccessFeedback('Success!', 'Thanks for submitting feedback');
                this.params.closeCallback(true);
            }else {
                this._componentService.showErrorFeedback('Ooops!', 'Something went wrong. Please try again.');
            }

        }catch(e) {
            console.log('CREATE FEEDBACK ERROR:')
            console.log(e)
            this._componentService.hideLoader();
            this._componentService.showErrorFeedback('Ooops!', 'Something went wrong. Please try again.')
        }
    }
   
}




