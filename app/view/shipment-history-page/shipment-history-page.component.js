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
var shipment_service_1 = require("../../services/shipment.service");
var ShipmentHistoryComponent = /** @class */ (function () {
    function ShipmentHistoryComponent(modal, _shipmentService) {
        this.modal = modal;
        this._shipmentService = _shipmentService;
        this.projectId = 0;
        this.shipmentHistory = [];
        this.projectId = this.modal.context.projectId;
    }
    ShipmentHistoryComponent.prototype.ngOnInit = function () {
        this.getProjectShipmentHistory();
    };
    ShipmentHistoryComponent.prototype.onClose = function () {
        this.modal.closeCallback(true);
    };
    ShipmentHistoryComponent.prototype.getDate = function (dateString) {
        var date = new Date(dateString);
        var dateTime;
        var months = [
            'January', 'February', 'March',
            'April', 'May', 'June', 'July',
            'August', 'September', 'October',
            'November', 'December'
        ];
        dateTime = months[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear();
        return dateTime;
    };
    ShipmentHistoryComponent.prototype.getProjectShipmentHistory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._shipmentService.getProjectShipmentHistory(this.projectId)];
                    case 1:
                        res = _a.sent();
                        this.shipmentHistory = res.data;
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
    ShipmentHistoryComponent = __decorate([
        core_1.Component({
            selector: "shipment-history-page",
            moduleId: module.id,
            templateUrl: "./shipment-history-page.component.html",
            styleUrls: ['./shipment-history-page.component.css'],
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
            shipment_service_1.ShipmentService])
    ], ShipmentHistoryComponent);
    return ShipmentHistoryComponent;
}());
exports.ShipmentHistoryComponent = ShipmentHistoryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcG1lbnQtaGlzdG9yeS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoaXBtZW50LWhpc3RvcnktcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCxtRUFBNEU7QUFFNUUsb0VBQWtFO0FBUWxFO0lBT0ksa0NBQ1ksS0FBd0IsRUFFeEIsZ0JBQWlDO1FBRmpDLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBRXhCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFSN0MsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUd6QixvQkFBZSxHQUFlLEVBQUUsQ0FBQTtRQU96QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsMkNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCwwQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELDBDQUFPLEdBQVAsVUFBUSxVQUFVO1FBQ2QsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsSUFBSSxRQUFRLENBQUM7UUFDYixJQUFJLE1BQU0sR0FBRztZQUNULFNBQVMsRUFBQyxVQUFVLEVBQUMsT0FBTztZQUM1QixPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNO1lBQzNCLFFBQVEsRUFBQyxXQUFXLEVBQUMsU0FBUztZQUM5QixVQUFVLEVBQUMsVUFBVTtTQUN4QixDQUFBO1FBRUosUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFckYsT0FBTyxRQUFRLENBQUM7SUFDakIsQ0FBQztJQUVLLDREQUF5QixHQUEvQjs7Ozs7Ozt3QkFFa0IscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQTs7d0JBQTNFLEdBQUcsR0FBRyxTQUFxRTt3QkFFL0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDOzs7O3dCQUVoQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFBOzs7Ozs7S0FFckI7SUE5Q1Esd0JBQXdCO1FBTnBDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0NBQXdDO1lBQ3JELFNBQVMsRUFBRSxDQUFDLHVDQUF1QyxDQUFDO1NBQ3ZELENBQUM7eUNBU3FCLDJCQUFpQjtZQUVOLGtDQUFlO09BVnBDLHdCQUF3QixDQStDcEM7SUFBRCwrQkFBQztDQUFBLEFBL0NELElBK0NDO0FBL0NZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuXG5pbXBvcnQgeyBTaGlwbWVudFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2hpcG1lbnQuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzaGlwbWVudC1oaXN0b3J5LXBhZ2VcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2hpcG1lbnQtaGlzdG9yeS1wYWdlLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2hpcG1lbnQtaGlzdG9yeS1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgU2hpcG1lbnRIaXN0b3J5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHByb2plY3RJZDogbnVtYmVyID0gMDtcblxuXHRcblx0c2hpcG1lbnRIaXN0b3J5OiBBcnJheTxhbnk+ID0gW11cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1BhcmFtcyxcblxuICAgICAgICBwcml2YXRlIF9zaGlwbWVudFNlcnZpY2U6IFNoaXBtZW50U2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLnByb2plY3RJZCA9IHRoaXMubW9kYWwuY29udGV4dC5wcm9qZWN0SWQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZ2V0UHJvamVjdFNoaXBtZW50SGlzdG9yeSgpO1xuICAgIH1cblxuICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgIHRoaXMubW9kYWwuY2xvc2VDYWxsYmFjayh0cnVlKTtcbiAgICB9XG5cbiAgICBnZXREYXRlKGRhdGVTdHJpbmcpIHtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcbiAgICAgICAgbGV0IGRhdGVUaW1lO1xuICAgICAgICBsZXQgbW9udGhzID0gW1xuICAgICAgICAgICAgJ0phbnVhcnknLCdGZWJydWFyeScsJ01hcmNoJyxcbiAgICAgICAgICAgICdBcHJpbCcsJ01heScsJ0p1bmUnLCdKdWx5JyxcbiAgICAgICAgICAgICdBdWd1c3QnLCdTZXB0ZW1iZXInLCdPY3RvYmVyJyxcbiAgICAgICAgICAgICdOb3ZlbWJlcicsJ0RlY2VtYmVyJ1xuICAgICAgICBdXG5cbiAgICBcdGRhdGVUaW1lID0gbW9udGhzW2RhdGUuZ2V0TW9udGgoKV0gKyBcIiBcIiArIGRhdGUuZ2V0RGF5KCkgKyBcIiwgXCIgKyBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICBcdHJldHVybiBkYXRlVGltZTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRQcm9qZWN0U2hpcG1lbnRIaXN0b3J5KCkge1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5fc2hpcG1lbnRTZXJ2aWNlLmdldFByb2plY3RTaGlwbWVudEhpc3RvcnkodGhpcy5wcm9qZWN0SWQpO1xuXG4gICAgICAgICAgICB0aGlzLnNoaXBtZW50SGlzdG9yeSA9IHJlcy5kYXRhO1xuICAgICAgICB9Y2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIl19