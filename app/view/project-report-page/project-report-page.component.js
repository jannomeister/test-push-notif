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
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var project_report_service_1 = require("../../services/project-report.service");
var component_event_service_1 = require("../../services/component-event.service");
var report_model_1 = require("../../models/report.model");
var ProjectReportComponent = /** @class */ (function () {
    function ProjectReportComponent(_page, _activatedRoute, _routerExtensions, _projectReportService, _componentService) {
        var _this = this;
        this._page = _page;
        this._activatedRoute = _activatedRoute;
        this._routerExtensions = _routerExtensions;
        this._projectReportService = _projectReportService;
        this._componentService = _componentService;
        this.pageNum = 1;
        this.data = {
            bandsShipped: 0,
            bandsReceived: 0,
            bandsSold: 0,
            raisedMoney: 0
        };
        _page.actionBarHidden = true;
        this.report = new report_model_1.Report();
        this.report.deserialize({
            projectId: 0,
            totalExtraBand: 0,
            extraDonation: 0
        });
        this._activatedRoute.queryParams.subscribe(function (params) {
            _this.report.projectId = parseInt(params['projectId']);
        });
    }
    ProjectReportComponent.prototype.ngOnInit = function () {
        this._componentService.showLoader('Loading...');
        this.getSalesReport();
    };
    ProjectReportComponent.prototype.onClose = function () {
        this._routerExtensions.back();
    };
    ProjectReportComponent.prototype.getTotalRaisedMoney = function () {
        return Number(this.data.raisedMoney) + Number(this.report.extraDonation);
    };
    ProjectReportComponent.prototype.submit = function () {
        // this.report.totalExtraBand = this.report.totalExtraBand;
        // this.report.extraDonation = this.report.extraDonation;
        if (!this.report.isRequiredFieldsNotEmpty()) {
            this._componentService.showAlert('Ooops!', 'Raised money is required.');
            return;
        }
        else if (Number(this.report.totalExtraBand) > Number(this.data.bandsReceived)) {
            this._componentService.showAlert('Ooops!', 'Extra should not exceed bands received');
            return;
        }
        this.createReport();
    };
    ProjectReportComponent.prototype.done = function () {
        this._routerExtensions.back();
    };
    ProjectReportComponent.prototype.createReport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._componentService.showLoader('Loading...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._projectReportService.createReport(this.report)];
                    case 2:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        this.pageNum = (res.data) ? 2 : this.pageNum;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this._componentService.hideLoader();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProjectReportComponent.prototype.getSalesReport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._projectReportService.getSalesReport(this.report.projectId)];
                    case 1:
                        res = _a.sent();
                        this._componentService.hideLoader();
                        this.data = res;
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        this._componentService.hideLoader();
                        this._componentService.showErrorFeedback('Oopps!', 'Something went wrong. Please try again later.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProjectReportComponent = __decorate([
        core_1.Component({
            selector: "project-report-page",
            moduleId: module.id,
            templateUrl: "./project-report-page.component.html",
            styleUrls: ['./project-report-page.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.ActivatedRoute,
            router_2.RouterExtensions,
            project_report_service_1.ProjectReportService,
            component_event_service_1.ComponentEventService])
    ], ProjectReportComponent);
    return ProjectReportComponent;
}());
exports.ProjectReportComponent = ProjectReportComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1yZXBvcnQtcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9qZWN0LXJlcG9ydC1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUNqRCxzREFBK0Q7QUFDL0QsZ0NBQStCO0FBRS9CLGdGQUE2RTtBQUM3RSxrRkFBK0U7QUFFL0UsMERBQW1EO0FBUW5EO0lBWUksZ0NBQ1ksS0FBVyxFQUNYLGVBQStCLEVBQy9CLGlCQUFtQyxFQUNuQyxxQkFBMkMsRUFDM0MsaUJBQXdDO1FBTHBELGlCQW1CQztRQWxCVyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzQjtRQUMzQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBZnZELFlBQU8sR0FBVyxDQUFDLENBQUM7UUFHakIsU0FBSSxHQUFRO1lBQ1IsWUFBWSxFQUFFLENBQUM7WUFDZixhQUFhLEVBQUUsQ0FBQztZQUNoQixTQUFTLEVBQUUsQ0FBQztZQUNaLFdBQVcsRUFBRSxDQUFDO1NBQ2pCLENBQUE7UUFTRyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUU3QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUkscUJBQU0sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3BCLFNBQVMsRUFBRSxDQUFDO1lBQ1osY0FBYyxFQUFFLENBQUM7WUFDakIsYUFBYSxFQUFFLENBQUM7U0FDbkIsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUM3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QjtPQWpCM0Msc0JBQXNCLENBNkZsQztJQUFELDZCQUFDO0NBQUEsQUE3RkQsSUE2RkM7QUE3Rlksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbmltcG9ydCB7IFByb2plY3RSZXBvcnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3Byb2plY3QtcmVwb3J0LnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuXG5pbXBvcnQgeyBSZXBvcnQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3JlcG9ydC5tb2RlbFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwcm9qZWN0LXJlcG9ydC1wYWdlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Byb2plY3QtcmVwb3J0LXBhZ2UuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9qZWN0LXJlcG9ydC1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdFJlcG9ydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgXG5cdHBhZ2VOdW06IG51bWJlciA9IDE7XG4gICAgcmVwb3J0OiBSZXBvcnQ7XG5cbiAgICBkYXRhOiBhbnkgPSB7XG4gICAgICAgIGJhbmRzU2hpcHBlZDogMCxcbiAgICAgICAgYmFuZHNSZWNlaXZlZDogMCxcbiAgICAgICAgYmFuZHNTb2xkOiAwLFxuICAgICAgICByYWlzZWRNb25leTogMFxuICAgIH1cbiAgICBcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfcGFnZTogUGFnZSxcbiAgICAgICAgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIF9wcm9qZWN0UmVwb3J0U2VydmljZTogUHJvamVjdFJlcG9ydFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZSxcbiAgICApIHtcbiAgICAgICAgX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnJlcG9ydCA9IG5ldyBSZXBvcnQoKTtcbiAgICAgICAgdGhpcy5yZXBvcnQuZGVzZXJpYWxpemUoe1xuICAgICAgICAgICAgcHJvamVjdElkOiAwLFxuICAgICAgICAgICAgdG90YWxFeHRyYUJhbmQ6IDAsXG4gICAgICAgICAgICBleHRyYURvbmF0aW9uOiAwXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5fYWN0aXZhdGVkUm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydC5wcm9qZWN0SWQgPSBwYXJzZUludChwYXJhbXNbJ3Byb2plY3RJZCddKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5zaG93TG9hZGVyKCdMb2FkaW5nLi4uJylcbiAgICAgICAgdGhpcy5nZXRTYWxlc1JlcG9ydCgpO1xuICAgIH1cblxuICAgIG9uQ2xvc2UoKXtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0VG90YWxSYWlzZWRNb25leSgpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLmRhdGEucmFpc2VkTW9uZXkpICsgTnVtYmVyKHRoaXMucmVwb3J0LmV4dHJhRG9uYXRpb24pO1xuICAgIH1cblxuICAgIHN1Ym1pdCgpIHtcbiAgICAgICAgLy8gdGhpcy5yZXBvcnQudG90YWxFeHRyYUJhbmQgPSB0aGlzLnJlcG9ydC50b3RhbEV4dHJhQmFuZDtcbiAgICAgICAgLy8gdGhpcy5yZXBvcnQuZXh0cmFEb25hdGlvbiA9IHRoaXMucmVwb3J0LmV4dHJhRG9uYXRpb247XG5cbiAgICAgICAgaWYoIXRoaXMucmVwb3J0LmlzUmVxdWlyZWRGaWVsZHNOb3RFbXB0eSgpKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dBbGVydCgnT29vcHMhJywgJ1JhaXNlZCBtb25leSBpcyByZXF1aXJlZC4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfWVsc2UgaWYoTnVtYmVyKHRoaXMucmVwb3J0LnRvdGFsRXh0cmFCYW5kKSA+IE51bWJlcih0aGlzLmRhdGEuYmFuZHNSZWNlaXZlZCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0FsZXJ0KCdPb29wcyEnLCAnRXh0cmEgc2hvdWxkIG5vdCBleGNlZWQgYmFuZHMgcmVjZWl2ZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3JlYXRlUmVwb3J0KCk7XG4gICAgfVxuXG4gICAgZG9uZSgpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgY3JlYXRlUmVwb3J0KCkge1xuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ0xvYWRpbmcuLi4nKVxuXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB0aGlzLl9wcm9qZWN0UmVwb3J0U2VydmljZS5jcmVhdGVSZXBvcnQodGhpcy5yZXBvcnQpO1xuXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5wYWdlTnVtID0gKHJlcy5kYXRhKT8gMiA6IHRoaXMucGFnZU51bTtcblxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBnZXRTYWxlc1JlcG9ydCgpIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3Byb2plY3RSZXBvcnRTZXJ2aWNlLmdldFNhbGVzUmVwb3J0KHRoaXMucmVwb3J0LnByb2plY3RJZCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2UuaGlkZUxvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzO1xuXG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLmhpZGVMb2FkZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFNlcnZpY2Uuc2hvd0Vycm9yRmVlZGJhY2soJ09vcHBzIScsICdTb21ldGhpbmcgd2VudCB3cm9uZy4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nKVxuICAgICAgICB9XG4gICAgfVxuICAgXG59Il19