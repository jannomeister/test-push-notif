"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.deserialize = function (input) {
        Object.assign(this, input);
        return this;
    };
    User.prototype.getUserName = function () {
        return "@" + this.firstName;
    };
    User.prototype.getFullName = function () {
        return this.toTitleCase(this.firstName + " " + this.lastName);
    };
    User.prototype.getMemberYear = function () {
        var date = new Date(this.datetimeCreated);
        return date.getFullYear();
    };
    User.prototype.getFormattedBirthday = function () {
        if (!this.birthDate)
            return '';
        var months = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];
        var date = new Date(this.birthDate);
        var month = months[date.getMonth()];
        var day = date.getDate();
        var year = date.getFullYear();
        return month + " " + day + ", " + year;
    };
    User.prototype.isRequiredFieldsNotEmpty = function () {
        if (!this.email ||
            !this.password) {
            return false;
        }
        else {
            return true;
        }
    };
    User.prototype.toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTtJQUFBO0lBNkVBLENBQUM7SUFyREEsMEJBQVcsR0FBWCxVQUFZLEtBQVU7UUFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDBCQUFXLEdBQVg7UUFDQyxPQUFPLE1BQUksSUFBSSxDQUFDLFNBQVcsQ0FBQztJQUM3QixDQUFDO0lBRUQsMEJBQVcsR0FBWDtRQUNDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBSSxJQUFJLENBQUMsU0FBUyxTQUFJLElBQUksQ0FBQyxRQUFVLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsNEJBQWEsR0FBYjtRQUNDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUUxQyxPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsbUNBQW9CLEdBQXBCO1FBQ0MsSUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFFOUIsSUFBSSxNQUFNLEdBQUc7WUFDWixTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPO1lBQ3ZDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVE7WUFDL0IsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVTtTQUM5QyxDQUFDO1FBRUYsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXBDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLEdBQUcsR0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0IsSUFBSSxJQUFJLEdBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRS9CLE9BQVUsS0FBSyxTQUFJLEdBQUcsVUFBSyxJQUFNLENBQUM7SUFDbkMsQ0FBQztJQUVELHVDQUF3QixHQUF4QjtRQUNDLElBQ0MsQ0FBQyxJQUFJLENBQUMsS0FBSztZQUNYLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFDYjtZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2I7YUFBSztZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ1o7SUFDRixDQUFDO0lBRUQsMEJBQVcsR0FBWCxVQUFZLEdBQUc7UUFDWCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQVMsR0FBRztZQUNyQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRixXQUFDO0FBQUQsQ0FBQyxBQTdFRCxJQTZFQztBQTdFWSxvQkFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlc2VyaWFsaXphYmxlIH0gZnJvbSBcIi4vZGVzZXJpYWxpemFibGUubW9kZWxcIjtcblxuZXhwb3J0IGNsYXNzIFVzZXIgaW1wbGVtZW50cyBEZXNlcmlhbGl6YWJsZSB7XG5cblx0dXNlcklkOiBudW1iZXI7XG5cdGZpcnN0TmFtZTogc3RyaW5nO1xuXHRsYXN0TmFtZTogc3RyaW5nO1xuXHRpbWFnZVVybDogYW55O1xuXHRlbWFpbDogc3RyaW5nO1xuXHRwYXNzd29yZDogc3RyaW5nO1xuXHRhZmZpbGlhdGlvbjogc3RyaW5nO1xuXHRjb21tdW5pdHlSb2xlOiBzdHJpbmc7XG5cdHNjaG9vbE5hbWU6IHN0cmluZztcblx0YmlydGhEYXRlOiBzdHJpbmc7XG5cdHBob25lTnVtYmVyOiBzdHJpbmc7XG5cdGFkZHJlc3M6IHN0cmluZztcblx0Y2l0eTogc3RyaW5nO1xuXHRjb3VudHJ5OiBzdHJpbmc7XG5cdGRhdGV0aW1lQ3JlYXRlZDogc3RyaW5nO1xuXHRkYXRldGltZVVwZGF0ZWQ6IHN0cmluZztcblx0dXNlclR5cGU6IHN0cmluZztcblx0bG9naW5UeXBlOiBzdHJpbmc7XG5cdHN0YXR1czogc3RyaW5nO1xuXG5cdHRvdGFsUHJvamVjdDogbnVtYmVyO1xuXG5cdGRlc2VyaWFsaXplKGlucHV0OiBhbnkpOiB0aGlzIHtcblx0ICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5wdXQpO1xuXHQgICAgcmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRVc2VyTmFtZSgpIHtcblx0XHRyZXR1cm4gYEAke3RoaXMuZmlyc3ROYW1lfWA7XG5cdH1cblxuXHRnZXRGdWxsTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy50b1RpdGxlQ2FzZShgJHt0aGlzLmZpcnN0TmFtZX0gJHt0aGlzLmxhc3ROYW1lfWApO1xuXHR9XG5cblx0Z2V0TWVtYmVyWWVhcigpIHtcblx0XHRsZXQgZGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZXRpbWVDcmVhdGVkKTtcblxuXHRcdHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cdH1cblxuXHRnZXRGb3JtYXR0ZWRCaXJ0aGRheSgpIHtcblx0XHRpZighdGhpcy5iaXJ0aERhdGUpIHJldHVybiAnJztcblxuXHRcdGxldCBtb250aHMgPSBbXG5cdFx0XHQnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsIFxuXHRcdFx0J01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgXG5cdFx0XHQnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXG5cdFx0XTtcblxuXHRcdGxldCBkYXRlID0gbmV3IERhdGUodGhpcy5iaXJ0aERhdGUpO1xuXG5cdFx0bGV0IG1vbnRoID0gbW9udGhzW2RhdGUuZ2V0TW9udGgoKV07XG5cdFx0bGV0IGRheSAgID0gZGF0ZS5nZXREYXRlKCk7XG5cdFx0bGV0IHllYXIgID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG5cdFx0cmV0dXJuIGAke21vbnRofSAke2RheX0sICR7eWVhcn1gO1xuXHR9XG5cblx0aXNSZXF1aXJlZEZpZWxkc05vdEVtcHR5KCkge1xuXHRcdGlmKFxuXHRcdFx0IXRoaXMuZW1haWwgfHxcblx0XHRcdCF0aGlzLnBhc3N3b3JkXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fWVsc2Uge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9XG5cblx0dG9UaXRsZUNhc2Uoc3RyKSB7XG5cdCAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcd1xcUyovZywgZnVuY3Rpb24odHh0KXtcblx0ICAgICAgICByZXR1cm4gdHh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdHh0LnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xuXHQgICAgfSk7XG5cdH1cbn0iXX0=