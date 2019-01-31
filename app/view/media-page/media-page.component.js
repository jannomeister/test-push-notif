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
var page_1 = require("tns-core-modules/ui/page");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var router_1 = require("nativescript-angular/router");
var shareproject_page_component_1 = require("../../view/shareproject-page/shareproject-page.component");
var segmented_bar_1 = require("ui/segmented-bar");
// SERVICES
var media_service_1 = require("../../services/media.service");
var component_event_service_1 = require("../../services/component-event.service");
var MediaComponent = /** @class */ (function () {
    function MediaComponent(_page, vcRef, routerExtensions, modal, _mediaService, _componentService) {
        this._page = _page;
        this.vcRef = vcRef;
        this.routerExtensions = routerExtensions;
        this.modal = modal;
        this._mediaService = _mediaService;
        this._componentService = _componentService;
        this.isBusy = true;
        this.categories = ['Photos', 'InstaBlitz Videos'];
        this.items = [];
        this.selectedIndex = 1;
        this.isPhotoSelected = false;
        this.isVideoSelected = true;
        this.isFilteringEnabled = true;
        this.myFilteringFunc = function (item) {
            return item.type.includes("image");
        };
    }
    MediaComponent.prototype.ngOnInit = function () {
        this.getMedias();
        this.generateSegmentBar();
    };
    Object.defineProperty(MediaComponent.prototype, "myFilteringFunc", {
        get: function () {
            return this._myFilteringFunc;
        },
        set: function (value) {
            this._myFilteringFunc = value;
        },
        enumerable: true,
        configurable: true
    });
    MediaComponent.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    MediaComponent.prototype.openMedia = function (data) {
        var opt = {
            context: data,
            fullscreen: true,
            viewContainerRef: this.vcRef,
            animated: true,
            transition: {
                name: "slideTop",
                duration: 200,
                curve: "ease"
            }
        };
        this.modal.showModal(shareproject_page_component_1.ShareProjectComponent, opt).then(function (response) {
            console.log(response);
        });
    };
    MediaComponent.prototype.generateSegmentBar = function () {
        for (var i = 0; i < this.categories.length; i++) {
            var segmentedBarItem = new segmented_bar_1.SegmentedBarItem();
            segmentedBarItem.title = this.categories[i];
            this.items.push(segmentedBarItem);
        }
    };
    MediaComponent.prototype.onSelectedIndexChange = function (args) {
        var _this = this;
        var segmetedBar = args.object;
        this.selectedIndex = segmetedBar.selectedIndex;
        this.isBusy = true;
        setTimeout(function () {
            _this.isBusy = false;
        }, 1000);
        switch (this.selectedIndex) {
            case 0:
                this.myFilteringFunc = function (item) {
                    return item.type.includes("image");
                };
                break;
            case 1:
                this.myFilteringFunc = function (item) {
                    return item.type.includes("video");
                };
                break;
            default:
                break;
        }
    };
    MediaComponent.prototype.getMedias = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._mediaService.getMedias()];
                    case 1:
                        res = _a.sent();
                        if (res.data.length > 0) {
                            this.medias = new observable_array_1.ObservableArray(res.data);
                        }
                        this.isBusy = false;
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MediaComponent = __decorate([
        core_1.Component({
            selector: "media-page",
            moduleId: module.id,
            templateUrl: "./media-page.component.html",
            styleUrls: ['./media-page.component.css'],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            core_1.ViewContainerRef,
            router_1.RouterExtensions,
            dialogs_1.ModalDialogService,
            media_service_1.MediaService,
            component_event_service_1.ComponentEventService])
    ], MediaComponent);
    return MediaComponent;
}());
exports.MediaComponent = MediaComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZWRpYS1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQStFO0FBQy9FLGlEQUFnRDtBQUNoRCwyRUFBeUU7QUFDekUsbUVBQTZFO0FBQzdFLHNEQUE4RDtBQUM5RCx3R0FBaUc7QUFDakcsa0RBQWtFO0FBTWxFLFdBQVc7QUFDWCw4REFBNEQ7QUFDNUQsa0ZBQStFO0FBUS9FO0lBY0ksd0JBQ1ksS0FBVyxFQUNqQixLQUF1QixFQUN2QixnQkFBa0MsRUFFNUIsS0FBeUIsRUFDekIsYUFBMkIsRUFDM0IsaUJBQXdDO1FBTnhDLFVBQUssR0FBTCxLQUFLLENBQU07UUFDakIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUU1QixVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUN6QixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBbkJwRCxXQUFNLEdBQVksSUFBSSxDQUFDO1FBR3ZCLGVBQVUsR0FBUSxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xELFVBQUssR0FBNEIsRUFBRSxDQUFDO1FBQ3BDLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLG9CQUFlLEdBQVksSUFBSSxDQUFDO1FBQ2hDLHVCQUFrQixHQUFZLElBQUksQ0FBQztRQWEvQixJQUFJLENBQUMsZUFBZSxHQUFHLFVBQUMsSUFBVztZQUMvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0ks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LE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUE7Ozs7OztLQUVyQjtJQS9HUSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUM1QyxDQUFDO3lDQWdCcUIsV0FBSTtZQUNWLHVCQUFnQjtZQUNMLHlCQUFnQjtZQUVyQiw0QkFBa0I7WUFDViw0QkFBWTtZQUNSLCtDQUFxQjtPQXJCM0MsY0FBYyxDQWdIMUI7SUFBRCxxQkFBQztDQUFBLEFBaEhELElBZ0hDO0FBaEhZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiXG5pbXBvcnQgeyBTaGFyZVByb2plY3RDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vdmlldy9zaGFyZXByb2plY3QtcGFnZS9zaGFyZXByb2plY3QtcGFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XG5pbXBvcnQgeyBSYWRMaXN0Vmlld0NvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcvYW5ndWxhclwiO1xuXG4vLyBNT0RFTFNcbmltcG9ydCB7IE1lZGlhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9tZWRpYS5tb2RlbFwiO1xuXG4vLyBTRVJWSUNFU1xuaW1wb3J0IHsgTWVkaWFTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL21lZGlhLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvbXBvbmVudEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb21wb25lbnQtZXZlbnQuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJtZWRpYS1wYWdlXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL21lZGlhLXBhZ2UuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9tZWRpYS1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTWVkaWFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgaXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIG1lZGlhczogT2JzZXJ2YWJsZUFycmF5PE1lZGlhPjtcbiAgICBjYXRlZ29yaWVzOiBhbnkgPSBbJ1Bob3RvcycsICdJbnN0YUJsaXR6IFZpZGVvcyddO1xuICAgIGl0ZW1zOiBBcnJheTxTZWdtZW50ZWRCYXJJdGVtPiA9IFtdO1xuICAgIHNlbGVjdGVkSW5kZXg6IG51bWJlciA9IDE7XG4gICAgaXNQaG90b1NlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNWaWRlb1NlbGVjdGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgICBpc0ZpbHRlcmluZ0VuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBfbXlGaWx0ZXJpbmdGdW5jOiAoaXRlbTogYW55KSA9PiBhbnk7XG4gICAgXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG5cdFx0cHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgXG5cdFx0cHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuXG4gICAgICAgIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfbWVkaWFTZXJ2aWNlOiBNZWRpYVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFNlcnZpY2U6IENvbXBvbmVudEV2ZW50U2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLm15RmlsdGVyaW5nRnVuYyA9IChpdGVtOiBNZWRpYSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udHlwZS5pbmNsdWRlcyhcImltYWdlXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmdldE1lZGlhcygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlU2VnbWVudEJhcigpO1xuICAgIH1cblxuICAgIGdldCBteUZpbHRlcmluZ0Z1bmMoKTogKGl0ZW06IGFueSkgPT4gYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX215RmlsdGVyaW5nRnVuYztcbiAgICB9XG5cbiAgICBzZXQgbXlGaWx0ZXJpbmdGdW5jKHZhbHVlOiAoaXRlbTogYW55KSA9PiBhbnkpIHtcbiAgICAgICAgdGhpcy5fbXlGaWx0ZXJpbmdGdW5jID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ29CYWNrKCkge1xuXHQgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcblx0fVxuXG4gICAgb3Blbk1lZGlhKGRhdGEpIHtcbiAgICAgICAgbGV0IG9wdCA9IHtcbiAgICAgICAgICAgIGNvbnRleHQ6IGRhdGEsXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVUb3BcIixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChTaGFyZVByb2plY3RDb21wb25lbnQsIG9wdCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZW5lcmF0ZVNlZ21lbnRCYXIoKSB7XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuY2F0ZWdvcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNlZ21lbnRlZEJhckl0ZW0gPSA8U2VnbWVudGVkQmFySXRlbT5uZXcgU2VnbWVudGVkQmFySXRlbSgpO1xuICAgICAgICAgICAgc2VnbWVudGVkQmFySXRlbS50aXRsZSA9IHRoaXMuY2F0ZWdvcmllc1tpXTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChzZWdtZW50ZWRCYXJJdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XG4gICAgICAgIGxldCBzZWdtZXRlZEJhciA9IDxTZWdtZW50ZWRCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHNlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXg7XG5cbiAgICAgICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwMClcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMubXlGaWx0ZXJpbmdGdW5jID0gKGl0ZW06IE1lZGlhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnR5cGUuaW5jbHVkZXMoXCJpbWFnZVwiKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMubXlGaWx0ZXJpbmdGdW5jID0gKGl0ZW06IE1lZGlhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnR5cGUuaW5jbHVkZXMoXCJ2aWRlb1wiKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0TWVkaWFzKCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fbWVkaWFTZXJ2aWNlLmdldE1lZGlhcygpO1xuXG4gICAgICAgICAgICBpZihyZXMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZWRpYXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PE1lZGlhPihyZXMuZGF0YSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcblxuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=