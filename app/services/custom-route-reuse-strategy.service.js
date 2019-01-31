"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var ns_location_strategy_1 = require("nativescript-angular/router/ns-location-strategy");
var ns_route_reuse_strategy_1 = require("nativescript-angular/router/ns-route-reuse-strategy");
var CustomRouteReuseStrategy = /** @class */ (function (_super) {
    __extends(CustomRouteReuseStrategy, _super);
    function CustomRouteReuseStrategy(location) {
        return _super.call(this, location) || this;
    }
    CustomRouteReuseStrategy.prototype.shouldReuseRoute = function (future, current) {
        // first use the global Reuse Strategy evaluation function,
        // which will return true, when we are navigating from the same component to itself
        var shouldReuse = _super.prototype.shouldReuseRoute.call(this, future, current);
        // then check if the noReuse flag is set to true
        if (shouldReuse && current.data.noReuse) {
            // if true, then don't reuse this component
            shouldReuse = false;
        }
        console.log("Should Reuse: " + shouldReuse);
        return shouldReuse;
    };
    CustomRouteReuseStrategy = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ns_location_strategy_1.NSLocationStrategy])
    ], CustomRouteReuseStrategy);
    return CustomRouteReuseStrategy;
}(ns_route_reuse_strategy_1.NSRouteReuseStrategy));
exports.CustomRouteReuseStrategy = CustomRouteReuseStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXJvdXRlLXJldXNlLXN0cmF0ZWd5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjdXN0b20tcm91dGUtcmV1c2Utc3RyYXRlZ3kuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFFM0MseUZBQXNGO0FBQ3RGLCtGQUEyRjtBQUczRjtJQUE4Qyw0Q0FBb0I7SUFFOUQsa0NBQVksUUFBNEI7ZUFDcEMsa0JBQU0sUUFBUSxDQUFDO0lBQ25CLENBQUM7SUFFRCxtREFBZ0IsR0FBaEIsVUFBaUIsTUFBOEIsRUFBRSxPQUErQjtRQUM1RSwyREFBMkQ7UUFDM0QsbUZBQW1GO1FBQ25GLElBQUksV0FBVyxHQUFHLGlCQUFNLGdCQUFnQixZQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUxRCxnREFBZ0Q7UUFDaEQsSUFBSSxXQUFXLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDckMsMkNBQTJDO1lBQzNDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDdkI7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFpQixXQUFhLENBQUMsQ0FBQztRQUM1QyxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBbkJRLHdCQUF3QjtRQURwQyxpQkFBVSxFQUFFO3lDQUdhLHlDQUFrQjtPQUYvQix3QkFBd0IsQ0FvQnBDO0lBQUQsK0JBQUM7Q0FBQSxBQXBCRCxDQUE4Qyw4Q0FBb0IsR0FvQmpFO0FBcEJZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTlNMb2NhdGlvblN0cmF0ZWd5IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyL25zLWxvY2F0aW9uLXN0cmF0ZWd5JztcbmltcG9ydCB7IE5TUm91dGVSZXVzZVN0cmF0ZWd5IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyL25zLXJvdXRlLXJldXNlLXN0cmF0ZWd5JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEN1c3RvbVJvdXRlUmV1c2VTdHJhdGVneSBleHRlbmRzIE5TUm91dGVSZXVzZVN0cmF0ZWd5IHtcblxuICAgIGNvbnN0cnVjdG9yKGxvY2F0aW9uOiBOU0xvY2F0aW9uU3RyYXRlZ3kpIHtcbiAgICAgICAgc3VwZXIobG9jYXRpb24pO1xuICAgIH1cblxuICAgIHNob3VsZFJldXNlUm91dGUoZnV0dXJlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBjdXJyZW50OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogYm9vbGVhbiB7XG4gICAgICAgIC8vIGZpcnN0IHVzZSB0aGUgZ2xvYmFsIFJldXNlIFN0cmF0ZWd5IGV2YWx1YXRpb24gZnVuY3Rpb24sXG4gICAgICAgIC8vIHdoaWNoIHdpbGwgcmV0dXJuIHRydWUsIHdoZW4gd2UgYXJlIG5hdmlnYXRpbmcgZnJvbSB0aGUgc2FtZSBjb21wb25lbnQgdG8gaXRzZWxmXG4gICAgICAgIGxldCBzaG91bGRSZXVzZSA9IHN1cGVyLnNob3VsZFJldXNlUm91dGUoZnV0dXJlLCBjdXJyZW50KTtcblxuICAgICAgICAvLyB0aGVuIGNoZWNrIGlmIHRoZSBub1JldXNlIGZsYWcgaXMgc2V0IHRvIHRydWVcbiAgICAgICAgaWYgKHNob3VsZFJldXNlICYmIGN1cnJlbnQuZGF0YS5ub1JldXNlKSB7XG4gICAgICAgICAgICAvLyBpZiB0cnVlLCB0aGVuIGRvbid0IHJldXNlIHRoaXMgY29tcG9uZW50XG4gICAgICAgICAgICBzaG91bGRSZXVzZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coYFNob3VsZCBSZXVzZTogJHtzaG91bGRSZXVzZX1gKTtcbiAgICAgICAgcmV0dXJuIHNob3VsZFJldXNlO1xuICAgIH1cbn0iXX0=