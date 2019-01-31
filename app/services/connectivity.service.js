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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var connectivity = require("connectivity");
var ConnectivityService = /** @class */ (function () {
    function ConnectivityService() {
        this._offlineConnectedStatusType = connectivity.connectionType.none;
        this._connectionStatusChangedCallbacks = [];
        this._connectionStatusChangedToOnlineCallbacks = [];
        this._connectionStatusChangedToOfflineCallbacks = [];
    }
    ConnectivityService.prototype.startMonitoring = function () {
        console.log("** Monitoring Connection Status");
        connectivity.startMonitoring(this.monitorConnectionStatus);
    };
    ConnectivityService.prototype.addConnectionStatusChangedToOnlineCallback = function (callback) {
        this._connectionStatusChangedToOnlineCallbacks.push(callback);
    };
    ConnectivityService.prototype.addConnectionStatusChangedToOfflineCallback = function (callback) {
        this._connectionStatusChangedToOfflineCallbacks.push(callback);
    };
    ConnectivityService.prototype.monitorConnectionStatus = function (newConnectionType) {
        console.log("** Connection Status Changed To: " + newConnectionType);
        if (newConnectionType === 0) {
            // Went offline, kick off any changed to offline callbacks
            this.processCallbacksWithoutParam(this._connectionStatusChangedToOfflineCallbacks);
        }
        else {
            // Came online, kick off any changed to online callbacks
            // At this time Online = connectionType.wifi || connectionType.mobile
            this.processCallbacksWithoutParam(this._connectionStatusChangedToOnlineCallbacks);
        }
        // Process any connection status changed callbacks
        this.processCallbacks(newConnectionType, this._connectionStatusChangedCallbacks);
    };
    ConnectivityService.prototype.processCallbacksWithoutParam = function (callbacks) {
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i]();
        }
    };
    ConnectivityService.prototype.processCallbacks = function (newConnectionType, callbacks) {
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](newConnectionType);
        }
    };
    ConnectivityService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ConnectivityService);
    return ConnectivityService;
}());
exports.ConnectivityService = ConnectivityService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGl2aXR5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25uZWN0aXZpdHkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUUzQywyQ0FBNkM7QUFHN0M7SUFPQztRQUxBLGdDQUEyQixHQUFXLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1FBTXRFLElBQUksQ0FBQyxpQ0FBaUMsR0FBRyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLHlDQUF5QyxHQUFHLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsMENBQTBDLEdBQUcsRUFBRSxDQUFDO0lBQzVELENBQUM7SUFFRCw2Q0FBZSxHQUFmO1FBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQy9DLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHdFQUEwQyxHQUExQyxVQUEyQyxRQUFvQjtRQUN4RCxJQUFJLENBQUMseUNBQXlDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCx5RUFBMkMsR0FBM0MsVUFBNEMsUUFBb0I7UUFDNUQsSUFBSSxDQUFDLDBDQUEwQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUoscURBQXVCLEdBQXZCLFVBQXdCLGlCQUF5QjtRQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxHQUFHLGlCQUFpQixDQUFDLENBQUM7UUFFckUsSUFBRyxpQkFBaUIsS0FBSyxDQUFDLEVBQUU7WUFDM0IsMERBQTBEO1lBQ2pELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUM1RjthQUNJO1lBQ0osd0RBQXdEO1lBQy9DLHFFQUFxRTtZQUNyRSxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7U0FDM0Y7UUFFRCxrREFBa0Q7UUFDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRCwwREFBNEIsR0FBNUIsVUFBNkIsU0FBeUI7UUFDL0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBRUQsOENBQWdCLEdBQWhCLFVBQWlCLGlCQUF5QixFQUFFLFNBQWlEO1FBQ3pGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQXJEUSxtQkFBbUI7UUFEL0IsaUJBQVUsRUFBRTs7T0FDQSxtQkFBbUIsQ0F1RC9CO0lBQUQsMEJBQUM7Q0FBQSxBQXZERCxJQXVEQztBQXZEWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0ICogYXMgY29ubmVjdGl2aXR5IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpdml0eVNlcnZpY2Uge1xuXG5cdF9vZmZsaW5lQ29ubmVjdGVkU3RhdHVzVHlwZTogbnVtYmVyID0gY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm5vbmU7XG5cdF9jb25uZWN0aW9uU3RhdHVzQ2hhbmdlZENhbGxiYWNrczogeyAoY29ubmVjdGlvblN0YXR1czogbnVtYmVyKTogdm9pZCB9W107XG5cdF9jb25uZWN0aW9uU3RhdHVzQ2hhbmdlZFRvT25saW5lQ2FsbGJhY2tzOiB7ICgpOiB2b2lkIH1bXTtcblx0X2Nvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkVG9PZmZsaW5lQ2FsbGJhY2tzOiB7ICgpOiB2b2lkIH1bXTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLl9jb25uZWN0aW9uU3RhdHVzQ2hhbmdlZENhbGxiYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLl9jb25uZWN0aW9uU3RhdHVzQ2hhbmdlZFRvT25saW5lQ2FsbGJhY2tzID0gW107XG4gICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkVG9PZmZsaW5lQ2FsbGJhY2tzID0gW107XG5cdH1cblxuXHRzdGFydE1vbml0b3JpbmcoKSB7XG5cdFx0Y29uc29sZS5sb2coXCIqKiBNb25pdG9yaW5nIENvbm5lY3Rpb24gU3RhdHVzXCIpO1xuXHRcdGNvbm5lY3Rpdml0eS5zdGFydE1vbml0b3JpbmcodGhpcy5tb25pdG9yQ29ubmVjdGlvblN0YXR1cyk7XG5cdH1cblxuXHRhZGRDb25uZWN0aW9uU3RhdHVzQ2hhbmdlZFRvT25saW5lQ2FsbGJhY2soY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvblN0YXR1c0NoYW5nZWRUb09ubGluZUNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG4gXG4gICAgYWRkQ29ubmVjdGlvblN0YXR1c0NoYW5nZWRUb09mZmxpbmVDYWxsYmFjayhjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLl9jb25uZWN0aW9uU3RhdHVzQ2hhbmdlZFRvT2ZmbGluZUNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cblx0bW9uaXRvckNvbm5lY3Rpb25TdGF0dXMobmV3Q29ubmVjdGlvblR5cGU6IG51bWJlcikge1xuXHRcdGNvbnNvbGUubG9nKFwiKiogQ29ubmVjdGlvbiBTdGF0dXMgQ2hhbmdlZCBUbzogXCIgKyBuZXdDb25uZWN0aW9uVHlwZSk7XG5cblx0XHRpZihuZXdDb25uZWN0aW9uVHlwZSA9PT0gMCkge1xuXHRcdFx0Ly8gV2VudCBvZmZsaW5lLCBraWNrIG9mZiBhbnkgY2hhbmdlZCB0byBvZmZsaW5lIGNhbGxiYWNrc1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzQ2FsbGJhY2tzV2l0aG91dFBhcmFtKHRoaXMuX2Nvbm5lY3Rpb25TdGF0dXNDaGFuZ2VkVG9PZmZsaW5lQ2FsbGJhY2tzKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQvLyBDYW1lIG9ubGluZSwga2ljayBvZmYgYW55IGNoYW5nZWQgdG8gb25saW5lIGNhbGxiYWNrc1xuICAgICAgICAgICAgLy8gQXQgdGhpcyB0aW1lIE9ubGluZSA9IGNvbm5lY3Rpb25UeXBlLndpZmkgfHwgY29ubmVjdGlvblR5cGUubW9iaWxlXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NDYWxsYmFja3NXaXRob3V0UGFyYW0odGhpcy5fY29ubmVjdGlvblN0YXR1c0NoYW5nZWRUb09ubGluZUNhbGxiYWNrcyk7XG5cdFx0fVxuXG5cdFx0Ly8gUHJvY2VzcyBhbnkgY29ubmVjdGlvbiBzdGF0dXMgY2hhbmdlZCBjYWxsYmFja3NcbiAgICAgICAgdGhpcy5wcm9jZXNzQ2FsbGJhY2tzKG5ld0Nvbm5lY3Rpb25UeXBlLCB0aGlzLl9jb25uZWN0aW9uU3RhdHVzQ2hhbmdlZENhbGxiYWNrcyk7XG5cdH1cblxuXHRwcm9jZXNzQ2FsbGJhY2tzV2l0aG91dFBhcmFtKGNhbGxiYWNrczogeyAoKTogdm9pZCB9W10pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNhbGxiYWNrc1tpXSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc0NhbGxiYWNrcyhuZXdDb25uZWN0aW9uVHlwZTogbnVtYmVyLCBjYWxsYmFja3M6IHsgKGNvbm5lY3Rpb25TdGF0dXM6IG51bWJlcik6IHZvaWQgfVtdKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjYWxsYmFja3NbaV0obmV3Q29ubmVjdGlvblR5cGUpO1xuICAgICAgICB9XG4gICAgfVxuXG59Il19