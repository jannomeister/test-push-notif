"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var observable_1 = require("tns-core-modules/data/observable");
// MODELS
var feedback_model_1 = require("../../models/feedback.model");
// SERVICES
var user_service_1 = require("../../services/user.service");
var project_feedback_service_1 = require("../../services/project-feedback.service");
var component_event_service_1 = require("../../services/component-event.service");
var FeedbackComponent = /** @class */ (function () {
    function FeedbackComponent(params, _userService, _componentService, _projectFeedbackService) {
        this.params = params;
        this._userService = _userService;
        this._componentService = _componentService;
        this._projectFeedbackService = _projectFeedbackService;
        this.data = new observable_1.Observable();
        this.feedback = new feedback_model_1.Feedback();
        this.feedback.deserialize({
            projectId: 0,
            userId: 0,
            rating: 0,
            concern: ''
        });
        this.data.set('rating', 0);
    }
    FeedbackComponent.prototype.ngOnInit = function () {
        this.feedback.userId = this._userService.getCurrentUserId();
        this.feedback.projectId = this.params.context.projectId;
        this.progressValue = 1;
        this.pageNum = 1;
    };
    FeedbackComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var rating = this.rt.nativeElement;
        rating.on('valueChange', function (args) {
            var value = args.object.get('value');
            _this.feedback.rating = value;
        });
    };
    FeedbackComponent.prototype.onValueChanged = function (args) {
        var progressBar = args.object;
    };
    FeedbackComponent.prototype.onClose = function () {
        this.params.closeCallback(false);
    };
    FeedbackComponent.prototype.next = function () {
        if (this.feedback.rating > 0) {
            this.progressValue += 1;
            this.pageNum += 1;
        }
        else {
            this._componentService.showAlert('Ooops!', 'Do you mind giving us a star?');
        }
    };
    FeedbackComponent.prototype.submit = function () {
        var _this = this;
        this._componentService.showLoader('Loading...');
        setTimeout(function () {
            _this.createFeedback();
        });
    };
    FeedbackComponent.prototype.createFeedback = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._projectFeedbackService.createFeedback(this.feedback)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        if (res.data) {
                            this._componentService.showSuccessFeedback('Success!', 'Thanks for submitting feedback');
                            this.params.closeCallback(true);
                        }
                        else {
                            this._componentService.showErrorFeedback('Ooops!', 'Something went wrong. Please try again.');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log('CREATE FEEDBACK ERROR:');
                        console.log(e_1);
                        this._componentService.hideLoader();
                        this._componentService.showErrorFeedback('Ooops!', 'Something went wrong. Please try again.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild('rating'),
        __metadata("design:type", core_1.ElementRef)
    ], FeedbackComponent.prototype, "rt", void 0);
    FeedbackComponent = __decorate([
        core_1.Component({
            selector: "feedback-page",
            moduleId: module.id,
            templateUrl: "./feedback-page.component.html",
            styleUrls: ['./feedback-page.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
            user_service_1.UserService,
            component_event_service_1.ComponentEventService,
            project_feedback_service_1.ProjectFeedbackService])
    ], FeedbackComponent);
    return FeedbackComponent;
}());
exports.FeedbackComponent = FeedbackComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVlZGJhY2stcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmZWVkYmFjay1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXlFO0FBR3pFLG1FQUE0RTtBQUM1RSwrREFBOEQ7QUFFOUQsU0FBUztBQUNULDhEQUF1RDtBQUV2RCxXQUFXO0FBQ1gsNERBQTBEO0FBQzFELG9GQUFpRjtBQUNqRixrRkFBK0U7QUFRL0U7SUFXSSwyQkFDWSxNQUF5QixFQUN6QixZQUF5QixFQUN6QixpQkFBd0MsRUFDeEMsdUJBQStDO1FBSC9DLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3pCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBdUI7UUFDeEMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQVIzRCxTQUFJLEdBQUcsSUFBSSx1QkFBVSxFQUFFLENBQUM7UUFVcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHlCQUFRLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUN0QixTQUFTLEVBQUUsQ0FBQztZQUNaLE1BQU0sRUFBRSxDQUFDO1lBQ1QsTUFBTSxFQUFFLENBQUM7WUFDVCxPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1RCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFFMUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELDJDQUFlLEdBQWY7UUFBQSxpQkFRQztRQVBHLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBRW5DLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFVBQUMsSUFBSTtZQUMxQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV2QyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsMENBQWMsR0FBZCxVQUFlLElBQUk7UUFDZixJQUFJLFdBQVcsR0FBYSxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzVDLENBQUM7SUFFRCxtQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELGdDQUFJLEdBQUo7UUFDSSxJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztTQUNyQjthQUFLO1lBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsK0JBQStCLENBQUMsQ0FBQTtTQUM5RTtJQUNMLENBQUM7SUFFRCxrQ0FBTSxHQUFOO1FBQUEsaUJBTUM7UUFMRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBRS9DLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFSywwQ0FBYyxHQUFwQjs7Ozs7Ozt3QkFFa0IscUJBQU0sSUFBSSxDQUFDLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUE7O3dCQUF0RSxHQUFHLEdBQUcsU0FBZ0U7d0JBRTFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDcEMsSUFBRyxHQUFHLENBQUMsSUFBSSxFQUFDOzRCQUNSLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQzs0QkFDekYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQ25DOzZCQUFLOzRCQUNGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUseUNBQXlDLENBQUMsQ0FBQzt5QkFDakc7Ozs7d0JBR0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO3dCQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFBO3dCQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSx5Q0FBeUMsQ0FBQyxDQUFBOzs7Ozs7S0FFcEc7SUFoRm9CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFLLGlCQUFVO2lEQUFDO0lBVDNCLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7U0FDL0MsQ0FBQzt5Q0Fhc0IsMkJBQWlCO1lBQ1gsMEJBQVc7WUFDTiwrQ0FBcUI7WUFDZixpREFBc0I7T0FmbEQsaUJBQWlCLENBMkY3QjtJQUFELHdCQUFDO0NBQUEsQUEzRkQsSUEyRkM7QUEzRlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFByb2dyZXNzIH0gZnJvbSBcInVpL3Byb2dyZXNzXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcblxuLy8gTU9ERUxTXG5pbXBvcnQgeyBGZWVkYmFjayB9IGZyb20gXCIuLi8uLi9tb2RlbHMvZmVlZGJhY2subW9kZWxcIjtcblxuLy8gU0VSVklDRVNcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgUHJvamVjdEZlZWRiYWNrU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9wcm9qZWN0LWZlZWRiYWNrLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJmZWVkYmFjay1wYWdlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2ZlZWRiYWNrLXBhZ2UuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9mZWVkYmFjay1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgRmVlZGJhY2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdHByb2dyZXNzVmFsdWU6IG51bWJlcjtcbiAgICBwYWdlTnVtOiBudW1iZXI7XG5cbiAgICBmZWVkYmFjazogRmVlZGJhY2s7XG5cbiAgICBkYXRhID0gbmV3IE9ic2VydmFibGUoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ3JhdGluZycpIHJ0OiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcyxcbiAgICAgICAgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9jb21wb25lbnRTZXJ2aWNlOiBDb21wb25lbnRFdmVudFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3Byb2plY3RGZWVkYmFja1NlcnZpY2U6IFByb2plY3RGZWVkYmFja1NlcnZpY2UsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuZmVlZGJhY2sgPSBuZXcgRmVlZGJhY2soKTtcbiAgICAgICAgdGhpcy5mZWVkYmFjay5kZXNlcmlhbGl6ZSh7XG4gICAgICAgICAgICBwcm9qZWN0SWQ6IDAsXG4gICAgICAgICAgICB1c2VySWQ6IDAsXG4gICAgICAgICAgICByYXRpbmc6IDAsXG4gICAgICAgICAgICBjb25jZXJuOiAnJ1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRhdGEuc2V0KCdyYXRpbmcnLCAwKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5mZWVkYmFjay51c2VySWQgPSB0aGlzLl91c2VyU2VydmljZS5nZXRDdXJyZW50VXNlcklkKCk7XG4gICAgICAgIHRoaXMuZmVlZGJhY2sucHJvamVjdElkID0gdGhpcy5wYXJhbXMuY29udGV4dC5wcm9qZWN0SWQ7XG4gICAgICAgIFxuICAgICBcdHRoaXMucHJvZ3Jlc3NWYWx1ZSA9IDE7XG4gICAgICAgIHRoaXMucGFnZU51bSA9IDE7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBsZXQgcmF0aW5nID0gdGhpcy5ydC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIHJhdGluZy5vbigndmFsdWVDaGFuZ2UnLCAoYXJncykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBhcmdzLm9iamVjdC5nZXQoJ3ZhbHVlJyk7XG5cbiAgICAgICAgICAgIHRoaXMuZmVlZGJhY2sucmF0aW5nID0gdmFsdWU7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25WYWx1ZUNoYW5nZWQoYXJncykge1xuICAgICAgICBsZXQgcHJvZ3Jlc3NCYXIgPSA8UHJvZ3Jlc3M+YXJncy5vYmplY3Q7XG4gICAgfVxuXG4gICAgb25DbG9zZSgpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhmYWxzZSk7XG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgaWYodGhpcy5mZWVkYmFjay5yYXRpbmcgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzVmFsdWUgKz0gMTtcbiAgICAgICAgICAgIHRoaXMucGFnZU51bSArPSAxO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ0RvIHlvdSBtaW5kIGdpdmluZyB1cyBhIHN0YXI/JylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN1Ym1pdCgpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdMb2FkaW5nLi4uJylcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRmVlZGJhY2soKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyBjcmVhdGVGZWVkYmFjaygpIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3Byb2plY3RGZWVkYmFja1NlcnZpY2UuY3JlYXRlRmVlZGJhY2sodGhpcy5mZWVkYmFjayk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgaWYocmVzLmRhdGEpe1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd1N1Y2Nlc3NGZWVkYmFjaygnU3VjY2VzcyEnLCAnVGhhbmtzIGZvciBzdWJtaXR0aW5nIGZlZWRiYWNrJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh0cnVlKTtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dFcnJvckZlZWRiYWNrKCdPb29wcyEnLCAnU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWNhdGNoKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDUkVBVEUgRkVFREJBQ0sgRVJST1I6JylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0Vycm9yRmVlZGJhY2soJ09vb3BzIScsICdTb21ldGhpbmcgd2VudCB3cm9uZy4gUGxlYXNlIHRyeSBhZ2Fpbi4nKVxuICAgICAgICB9XG4gICAgfVxuICAgXG59XG5cblxuXG5cbiJdfQ==