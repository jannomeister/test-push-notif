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
var convention_service_1 = require("../../services/convention.service");
var ReferenceListComponent = /** @class */ (function () {
    function ReferenceListComponent(params, _conventionService) {
        this.params = params;
        this._conventionService = _conventionService;
        this.isEmpty = false;
        this.conventions = [];
        this.page = 1;
        this.limit = 10;
        this.orderBy = 'DESC';
    }
    ReferenceListComponent.prototype.ngOnInit = function () {
        this.getConventions();
    };
    ReferenceListComponent.prototype.onClose = function () {
        this.params.closeCallback({ hasData: false });
    };
    ReferenceListComponent.prototype.onItemTap = function (args) {
        this.params.closeCallback({ hasData: true, data: this.conventions[args.index].name });
    };
    ReferenceListComponent.prototype.loadMoreItems = function () {
        this.page++;
        this.getConventions();
    };
    ReferenceListComponent.prototype.getConventions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, i, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._conventionService.getConventions(this.page, this.limit, this.orderBy)];
                    case 1:
                        res = _a.sent();
                        for (i = 0; i < res.data.length; i++) {
                            this.conventions.push(res.data[i]);
                        }
                        this.isEmpty = (this.conventions.length === 0) ? true : false;
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReferenceListComponent = __decorate([
        core_1.Component({
            selector: "reference-list",
            moduleId: module.id,
            templateUrl: "./reference-list.component.html",
            styleUrls: ['./reference-list.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
            convention_service_1.ConventionService])
    ], ReferenceListComponent);
    return ReferenceListComponent;
}());
exports.ReferenceListComponent = ReferenceListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmZXJlbmNlLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVmZXJlbmNlLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsbUVBQTJFO0FBRTNFLHdFQUFzRTtBQVV0RTtJQVNJLGdDQUNZLE1BQXlCLEVBQ3pCLGtCQUFxQztRQURyQyxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUN6Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBVGpELFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDNUIsZ0JBQVcsR0FBc0IsRUFBRSxDQUFDO1FBRWpDLFNBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixZQUFPLEdBQVcsTUFBTSxDQUFDO0lBS3RCLENBQUM7SUFFSix5Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCx3Q0FBTyxHQUFQO1FBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsMENBQVMsR0FBVCxVQUFVLElBQUk7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUVELDhDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVLLCtDQUFjLEdBQXBCOzs7Ozs7O3dCQUVrQixxQkFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUF2RixHQUFHLEdBQUcsU0FBaUY7d0JBRTNGLEtBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7NEJBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDdEM7d0JBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7O0tBSXBFO0lBM0NRLHNCQUFzQjtRQU5sQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztTQUNoRCxDQUFDO3lDQVdzQiwyQkFBaUI7WUFDTCxzQ0FBaUI7T0FYeEMsc0JBQXNCLENBNENsQztJQUFELDZCQUFDO0NBQUEsQUE1Q0QsSUE0Q0M7QUE1Q1ksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCJcblxuaW1wb3J0IHsgQ29udmVudGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29udmVudGlvbi5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7IENvbnZlbnRpb24gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvbnZlbnRpb24ubW9kZWxcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwicmVmZXJlbmNlLWxpc3RcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcmVmZXJlbmNlLWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFsnLi9yZWZlcmVuY2UtbGlzdC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFJlZmVyZW5jZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgaXNFbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xuXHRjb252ZW50aW9uczogQXJyYXk8Q29udmVudGlvbj4gPSBbXTtcblxuICAgIHBhZ2U6IG51bWJlciA9IDE7XG4gICAgbGltaXQ6IG51bWJlciA9IDEwO1xuICAgIG9yZGVyQnk6IHN0cmluZyA9ICdERVNDJztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsXG4gICAgICAgIHByaXZhdGUgX2NvbnZlbnRpb25TZXJ2aWNlOiBDb252ZW50aW9uU2VydmljZSxcbiAgICApIHt9IFxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZ2V0Q29udmVudGlvbnMoKTtcbiAgICB9XG5cbiAgICBvbkNsb3NlKCkge1xuICAgIFx0dGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh7IGhhc0RhdGE6IGZhbHNlIH0pO1xuXHR9XG5cblx0b25JdGVtVGFwKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh7IGhhc0RhdGE6IHRydWUsIGRhdGE6IHRoaXMuY29udmVudGlvbnNbYXJncy5pbmRleF0ubmFtZSB9KTtcbiAgICB9XG5cbiAgICBsb2FkTW9yZUl0ZW1zKCkge1xuICAgICAgICB0aGlzLnBhZ2UrKztcbiAgICAgICAgdGhpcy5nZXRDb252ZW50aW9ucygpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldENvbnZlbnRpb25zKCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fY29udmVudGlvblNlcnZpY2UuZ2V0Q29udmVudGlvbnModGhpcy5wYWdlLCB0aGlzLmxpbWl0LCB0aGlzLm9yZGVyQnkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmVzLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnZlbnRpb25zLnB1c2gocmVzLmRhdGFbaV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmlzRW1wdHkgPSAodGhpcy5jb252ZW50aW9ucy5sZW5ndGggPT09IDApPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIH1jYXRjaChlKSB7XG5cbiAgICAgICAgfVxuICAgIH1cbn0iXX0=