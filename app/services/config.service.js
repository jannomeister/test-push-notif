"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ConfigService = /** @class */ (function () {
    function ConfigService() {
    }
    ConfigService.prototype.getApiBaseUrl = function () {
        return this.getBaseUrl() + "/api/v1";
    };
    ConfigService.prototype.getWebBaseUrl = function () {
        // return 'http://192.168.1.5:4200';
        return 'https://cms.yudabands.org'; //production
    };
    ConfigService.prototype.getBaseUrl = function () {
        return 'http://192.168.1.9:1337';
        // return 'http://139.59.109.3:8080';
        // return 'https://api.yudabands.org'; //production
    };
    ConfigService.prototype.pushSettings = function () {
        return {
            senderID: '34320956349',
            badge: true,
            sound: true,
            alert: true,
            clearBadge: false,
            interactiveSettings: {
                actions: [{
                        identifier: 'READ_IDENTIFIER',
                        title: 'Read',
                        activationMode: "foreground",
                        destructive: false,
                        authenticationRequired: true
                    }, {
                        identifier: 'CANCEL_IDENTIFIER',
                        title: 'Cancel',
                        activationMode: "foreground",
                        destructive: true,
                        authenticationRequired: true
                    }],
                categories: [{
                        identifier: 'READ_CATEGORY',
                        actionsForDefaultContext: ['READ_IDENTIFIER', 'CANCEL_IDENTIFIER'],
                        actionsForMinimalContext: ['READ_IDENTIFIER', 'CANCEL_IDENTIFIER']
                    }]
            },
            notificationCallbackIOS: function (message) {
                console.log('*** MESSAGE RECEIVED!!! ***');
                console.log('************************');
                console.log(message);
                console.log('************************');
            }
        };
    };
    ConfigService = __decorate([
        core_1.Injectable()
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyQztBQUczQztJQUFBO0lBb0RBLENBQUM7SUFsREEscUNBQWEsR0FBYjtRQUNDLE9BQVUsSUFBSSxDQUFDLFVBQVUsRUFBRSxZQUFTLENBQUM7SUFDdEMsQ0FBQztJQUVFLHFDQUFhLEdBQWI7UUFDSSxvQ0FBb0M7UUFDcEMsT0FBTywyQkFBMkIsQ0FBQyxDQUFDLFlBQVk7SUFDcEQsQ0FBQztJQUVKLGtDQUFVLEdBQVY7UUFDTyxPQUFPLHlCQUF5QixDQUFDO1FBQ3ZDLHFDQUFxQztRQUMvQixtREFBbUQ7SUFDMUQsQ0FBQztJQUVELG9DQUFZLEdBQVo7UUFDQyxPQUFPO1lBQ0csUUFBUSxFQUFFLGFBQWE7WUFDdkIsS0FBSyxFQUFFLElBQUk7WUFDWCxLQUFLLEVBQUUsSUFBSTtZQUNYLEtBQUssRUFBRSxJQUFJO1lBQ1gsVUFBVSxFQUFFLEtBQUs7WUFDakIsbUJBQW1CLEVBQUU7Z0JBQ2pCLE9BQU8sRUFBRSxDQUFDO3dCQUNOLFVBQVUsRUFBRSxpQkFBaUI7d0JBQzdCLEtBQUssRUFBRSxNQUFNO3dCQUNiLGNBQWMsRUFBRSxZQUFZO3dCQUM1QixXQUFXLEVBQUUsS0FBSzt3QkFDbEIsc0JBQXNCLEVBQUUsSUFBSTtxQkFDL0IsRUFBRTt3QkFDQyxVQUFVLEVBQUUsbUJBQW1CO3dCQUMvQixLQUFLLEVBQUUsUUFBUTt3QkFDZixjQUFjLEVBQUUsWUFBWTt3QkFDNUIsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLHNCQUFzQixFQUFFLElBQUk7cUJBQy9CLENBQUM7Z0JBQ0YsVUFBVSxFQUFFLENBQUM7d0JBQ1QsVUFBVSxFQUFFLGVBQWU7d0JBQzNCLHdCQUF3QixFQUFFLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUM7d0JBQ2xFLHdCQUF3QixFQUFFLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUM7cUJBQ3JFLENBQUM7YUFDTDtZQUNELHVCQUF1QixFQUFFLFVBQUMsT0FBWTtnQkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO2dCQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUE7Z0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtZQUMzQyxDQUFDO1NBQ0osQ0FBQTtJQUNSLENBQUM7SUFuRFcsYUFBYTtRQUR6QixpQkFBVSxFQUFFO09BQ0EsYUFBYSxDQW9EekI7SUFBRCxvQkFBQztDQUFBLEFBcERELElBb0RDO0FBcERZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcblxuXHRnZXRBcGlCYXNlVXJsKCkge1xuXHRcdHJldHVybiBgJHt0aGlzLmdldEJhc2VVcmwoKX0vYXBpL3YxYDsgXG5cdH1cblxuICAgIGdldFdlYkJhc2VVcmwoKSB7XG4gICAgICAgIC8vIHJldHVybiAnaHR0cDovLzE5Mi4xNjguMS41OjQyMDAnO1xuICAgICAgICByZXR1cm4gJ2h0dHBzOi8vY21zLnl1ZGFiYW5kcy5vcmcnOyAvL3Byb2R1Y3Rpb25cbiAgICB9XG5cblx0Z2V0QmFzZVVybCgpIHtcbiAgICAgICAgcmV0dXJuICdodHRwOi8vMTkyLjE2OC4xLjk6MTMzNyc7XG5cdFx0Ly8gcmV0dXJuICdodHRwOi8vMTM5LjU5LjEwOS4zOjgwODAnO1xuICAgICAgICAvLyByZXR1cm4gJ2h0dHBzOi8vYXBpLnl1ZGFiYW5kcy5vcmcnOyAvL3Byb2R1Y3Rpb25cblx0fVxuXG5cdHB1c2hTZXR0aW5ncygpIHtcblx0XHRyZXR1cm4ge1xuICAgICAgICAgICAgc2VuZGVySUQ6ICczNDMyMDk1NjM0OScsXG4gICAgICAgICAgICBiYWRnZTogdHJ1ZSxcbiAgICAgICAgICAgIHNvdW5kOiB0cnVlLFxuICAgICAgICAgICAgYWxlcnQ6IHRydWUsXG4gICAgICAgICAgICBjbGVhckJhZGdlOiBmYWxzZSxcbiAgICAgICAgICAgIGludGVyYWN0aXZlU2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zOiBbe1xuICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiAnUkVBRF9JREVOVElGSUVSJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdSZWFkJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZhdGlvbk1vZGU6IFwiZm9yZWdyb3VuZFwiLFxuICAgICAgICAgICAgICAgICAgICBkZXN0cnVjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6ICdDQU5DRUxfSURFTlRJRklFUicsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ2FuY2VsJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZhdGlvbk1vZGU6IFwiZm9yZWdyb3VuZFwiLFxuICAgICAgICAgICAgICAgICAgICBkZXN0cnVjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0aGVudGljYXRpb25SZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6ICdSRUFEX0NBVEVHT1JZJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uc0ZvckRlZmF1bHRDb250ZXh0OiBbJ1JFQURfSURFTlRJRklFUicsICdDQU5DRUxfSURFTlRJRklFUiddLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zRm9yTWluaW1hbENvbnRleHQ6IFsnUkVBRF9JREVOVElGSUVSJywgJ0NBTkNFTF9JREVOVElGSUVSJ11cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbkNhbGxiYWNrSU9TOiAobWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyoqKiBNRVNTQUdFIFJFQ0VJVkVEISEhICoqKicpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKioqKicpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSlcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnKioqKioqKioqKioqKioqKioqKioqKioqJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXHR9XG59Il19