"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Report = /** @class */ (function () {
    function Report() {
    }
    Report.prototype.deserialize = function (input) {
        Object.assign(this, input);
        return this;
    };
    Report.prototype.isRequiredFieldsNotEmpty = function () {
        if (!this.extraDonation) {
            return false;
        }
        else {
            return true;
        }
    };
    return Report;
}());
exports.Report = Report;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVwb3J0Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFBQTtJQXdCQSxDQUFDO0lBZEEsNEJBQVcsR0FBWCxVQUFZLEtBQVU7UUFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHlDQUF3QixHQUF4QjtRQUNDLElBQ0MsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUNsQjtZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2I7YUFBSztZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ1o7SUFDRixDQUFDO0lBQ0YsYUFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF4Qlksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZXNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL2Rlc2VyaWFsaXphYmxlLm1vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBSZXBvcnQgaW1wbGVtZW50cyBEZXNlcmlhbGl6YWJsZSB7XG5cblx0cHJvamVjdFJlcG9ydElkOiBudW1iZXI7XG5cdHByb2plY3RJZDogbnVtYmVyO1xuXHR0b3RhbEV4dHJhQmFuZDogbnVtYmVyO1xuXHRleHRyYURvbmF0aW9uOiBudW1iZXI7XG5cdGRhdGV0aW1lQ3JlYXRlZDogc3RyaW5nO1xuXHRkYXRldGltZVVwZGF0ZWQ6IHN0cmluZztcblx0c3RhdHVzOiBzdHJpbmc7XG5cblx0ZGVzZXJpYWxpemUoaW5wdXQ6IGFueSk6IHRoaXMge1xuXHQgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbnB1dCk7XG5cdCAgICByZXR1cm4gdGhpcztcblx0fVxuXG5cdGlzUmVxdWlyZWRGaWVsZHNOb3RFbXB0eSgpIHtcblx0XHRpZihcblx0XHRcdCF0aGlzLmV4dHJhRG9uYXRpb25cblx0XHQpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9ZWxzZSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdH1cbn0iXX0=