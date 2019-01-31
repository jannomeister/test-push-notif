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
var search_service_1 = require("../../services/search.service");
var component_event_service_1 = require("../../services/component-event.service");
var SearchAddressModalComponent = /** @class */ (function () {
    function SearchAddressModalComponent(params, _searchService, _componentService) {
        this.params = params;
        this._searchService = _searchService;
        this._componentService = _componentService;
        this.isBusy = false;
        this.address = [];
    }
    SearchAddressModalComponent.prototype.ngOnInit = function () { };
    SearchAddressModalComponent.prototype.loadMoreItems = function () { };
    SearchAddressModalComponent.prototype.onClose = function () {
        this.params.closeCallback({ success: false });
    };
    SearchAddressModalComponent.prototype.search = function (args) {
        var _this = this;
        var searchBar = args.object;
        this.isBusy = true;
        setTimeout(function () {
            _this.searchAddressAutocomplete(searchBar.text);
        }, 900);
    };
    SearchAddressModalComponent.prototype.selectAddress = function (address) {
        var _this = this;
        this._componentService.showLoader('Selecting...');
        setTimeout(function () {
            _this._componentService.hideLoader();
            _this.params.closeCallback({ success: true, data: address.formattedName });
        }, 900);
    };
    SearchAddressModalComponent.prototype.searchAddressAutocomplete = function (searchQuery) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._searchService.searchAddressAutocomplete(searchQuery)];
                    case 1:
                        res = _a.sent();
                        this.isBusy = false;
                        if (res.data.length > 0) {
                            this.address = res.data;
                        }
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
    SearchAddressModalComponent = __decorate([
        core_1.Component({
            selector: "search-address-modal",
            moduleId: module.id,
            templateUrl: "./search-address-modal.component.html",
            styleUrls: ['./search-address-modal.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
            search_service_1.SearchService,
            component_event_service_1.ComponentEventService])
    ], SearchAddressModalComponent);
    return SearchAddressModalComponent;
}());
exports.SearchAddressModalComponent = SearchAddressModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWFkZHJlc3MtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoLWFkZHJlc3MtbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0U7QUFDaEUsbUVBQTRFO0FBRzVFLGdFQUE4RDtBQUM5RCxrRkFBK0U7QUFRL0U7SUFNQyxxQ0FDZSxNQUF5QixFQUN6QixjQUE2QixFQUM3QixpQkFBd0M7UUFGeEMsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF1QjtRQVBwRCxXQUFNLEdBQVksS0FBSyxDQUFDO1FBRXhCLFlBQU8sR0FBZSxFQUFFLENBQUM7SUFNckIsQ0FBQztJQUVSLDhDQUFRLEdBQVIsY0FBWSxDQUFDO0lBRVYsbURBQWEsR0FBYixjQUFpQixDQUFDO0lBRXJCLDZDQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRSw0Q0FBTSxHQUFOLFVBQU8sSUFBSTtRQUFYLGlCQVFDO1FBUEcsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUV2QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMseUJBQXlCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNYLENBQUM7SUFFRCxtREFBYSxHQUFiLFVBQWMsT0FBTztRQUFyQixpQkFPQztRQU5HLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFbEQsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3BDLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDOUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ1gsQ0FBQztJQUVLLCtEQUF5QixHQUEvQixVQUFnQyxXQUFXOzs7Ozs7O3dCQUV6QixxQkFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxFQUFBOzt3QkFBdEUsR0FBRyxHQUFHLFNBQWdFO3dCQUUxRSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzt3QkFDcEIsSUFBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7NEJBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQzt5QkFDM0I7Ozs7d0JBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQTs7Ozs7O0tBRXJCO0lBbERRLDJCQUEyQjtRQU52QyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxTQUFTLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztTQUN0RCxDQUFDO3lDQVFzQiwyQkFBaUI7WUFDVCw4QkFBYTtZQUNWLCtDQUFxQjtPQVQzQywyQkFBMkIsQ0FtRHZDO0lBQUQsa0NBQUM7Q0FBQSxBQW5ERCxJQW1EQztBQW5EWSxrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSG9zdExpc3RlbmVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcblxuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zZWFyY2guc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50RXZlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbXBvbmVudC1ldmVudC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNlYXJjaC1hZGRyZXNzLW1vZGFsXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NlYXJjaC1hZGRyZXNzLW1vZGFsLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLWFkZHJlc3MtbW9kYWwuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hBZGRyZXNzTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRcbiAgICBpc0J1c3k6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGFkZHJlc3M6IEFycmF5PGFueT4gPSBbXTtcblxuXHRjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxuICAgICAgICBwcml2YXRlIF9zZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9jb21wb25lbnRTZXJ2aWNlOiBDb21wb25lbnRFdmVudFNlcnZpY2VcbiAgICApIHsgfVxuXG5cdG5nT25Jbml0KCkge31cblxuICAgIGxvYWRNb3JlSXRlbXMoKSB7fVxuXG5cdG9uQ2xvc2UoKSB7XG4gICAgXHR0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHsgc3VjY2VzczogZmFsc2UgfSk7XG5cdH1cblxuICAgIHNlYXJjaChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuXG4gICAgICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoQWRkcmVzc0F1dG9jb21wbGV0ZShzZWFyY2hCYXIudGV4dCk7XG4gICAgICAgIH0sIDkwMClcbiAgICB9XG5cbiAgICBzZWxlY3RBZGRyZXNzKGFkZHJlc3Mpe1xuICAgICAgICB0aGlzLl9jb21wb25lbnRTZXJ2aWNlLnNob3dMb2FkZXIoJ1NlbGVjdGluZy4uLicpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50U2VydmljZS5oaWRlTG9hZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHsgc3VjY2VzczogdHJ1ZSwgZGF0YTogYWRkcmVzcy5mb3JtYXR0ZWROYW1lIH0pO1xuICAgICAgICB9LCA5MDApXG4gICAgfSAgICBcblxuICAgIGFzeW5jIHNlYXJjaEFkZHJlc3NBdXRvY29tcGxldGUoc2VhcmNoUXVlcnkpIHtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHRoaXMuX3NlYXJjaFNlcnZpY2Uuc2VhcmNoQWRkcmVzc0F1dG9jb21wbGV0ZShzZWFyY2hRdWVyeSk7XG5cbiAgICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgICBpZihyZXMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRyZXNzID0gcmVzLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1jYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICB9XG4gICAgfVxufSJdfQ==