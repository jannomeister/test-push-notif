"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var Project = /** @class */ (function () {
    function Project() {
    }
    Project.prototype.deserialize = function (input) {
        Object.assign(this, input);
        return this;
    };
    Project.prototype.getAffiliation = function (type) {
        var data = {
            student: [
                '7th grade student',
                '8th grade student',
                '9th grade student',
                '10th grade student',
                '11th grade student',
                '12th grade student',
                'College'
            ],
            teacher: [
                'Elementary School Teacher',
                'Middle School Teacher',
                'High School Teacher',
                'College Professor'
            ]
        };
        return data[type];
    };
    Project.prototype.getSchoolClub = function () {
        return [
            'Beta Club',
            'DECA',
            'FBLA',
            'FCCLA',
            'Interact Club',
            'Key Club',
            'NHS',
            'Spanish Club',
            'Student Council',
            'Other'
        ];
    };
    Project.prototype.getHeardFrom = function () {
        return [
            'Referred by someone who has done the project',
            'My school has done the project before',
            'Google Search',
            'Instagram',
            'Facebook',
            'Twitter',
            'Conventions',
            'Other'
        ];
    };
    Project.prototype.getDateDuration = function () {
        var dateStart = moment("" + this.dateStart, 'YYYY-MM-DD').format('ll');
        var dateEnd = moment("" + this.dateEnd, 'YYYY-MM-DD').format('ll');
        return dateStart + " - " + dateEnd;
    };
    Project.prototype.getDuration2 = function () {
        var d1 = this.dateStart.split('-');
        var d2 = this.dateEnd.split('-');
        var months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Dec'
        ];
        var ds = {
            year: d1[0],
            month: parseInt(d1[1]) - 1,
            day: d1[2]
        };
        var de = {
            year: d2[0],
            month: parseInt(d2[1]) - 1,
            day: d2[2]
        };
        var dateStart = ds.month + " " + ds.day + ", " + ds.year;
        var dateEnd = de.month + " " + de.day + ", " + de.year;
        return dateStart + " - " + dateEnd;
    };
    Project.prototype.getSchoolName = function () {
        return this.toTitleCase(this.schoolName);
    };
    Project.prototype.getCurrentYear = function () {
        var date = new Date();
        return date.getFullYear();
    };
    Project.prototype.formatProjectDurationDate = function (month, day, year, type) {
        var date = new Date(year + "/" + (month + 1) + "/" + day);
        if (type === 'start') {
            return {
                date: moment(date).format('L')
            };
        }
        else {
            date.setDate(date.getDate() + 11);
            return {
                formatted: moment(date).format('LL'),
                date: moment(date).format('L')
            };
        }
    };
    Project.prototype.isStepClean = function (step) {
        if (step === 1) {
            if (!this.email ||
                !this.phoneNumber) {
                return false;
            }
            else {
                return true;
            }
        }
        else if (step === 2) {
            if (!this.schoolName ||
                !this.schoolAddress ||
                !this.clubSponsor ||
                !this.schoolEnrollees) {
                return false;
            }
            else {
                return true;
            }
        }
        else if (step === 3) {
            if (!this.teacherName ||
                !this.teacherEmail) {
                return false;
            }
            else {
                return true;
            }
        }
        else if (step === 4) {
            return true;
        }
        else if (step === 5) {
            if (!this.heardFrom) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    Project.prototype.hasStudent = function () {
        return (!this.studentId || !this.studentId.studentId) ? false : true;
    };
    Project.prototype.getRaisedMoney = function () {
        var raisedMoney = parseInt(this.bandsSold) * 7;
        raisedMoney = this.kFormatter(raisedMoney);
        return "$ " + raisedMoney;
    };
    Project.prototype.checkUpdateBands = function (newNumber) {
        newNumber = parseInt(newNumber);
        return {
            success: (newNumber > this.totalBands) ? false : true,
            message: (newNumber > this.totalBands) ? 'Bands entered excedeed the total bands' : ''
        };
    };
    Project.prototype.getOrderDeadLine = function () {
        var date = new Date(this.dateStart);
        date.setDate(date.getDate() - 13);
        var deadline = moment(date).format('L');
        return deadline;
    };
    Project.prototype.kFormatter = function (num) {
        return num > 999 ? (num / 1000).toFixed(1) + 'k' : num;
    };
    Project.prototype.clearTeacher = function () {
        this.teacherName = '';
        this.teacherEmail = '';
    };
    Project.prototype.toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
    return Project;
}());
exports.Project = Project;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2plY3QubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwrQkFBaUM7QUFFakM7SUFBQTtJQTRPQSxDQUFDO0lBNU1BLDZCQUFXLEdBQVgsVUFBWSxLQUFVO1FBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxnQ0FBYyxHQUFkLFVBQWUsSUFBSTtRQUVsQixJQUFJLElBQUksR0FBRztZQUNWLE9BQU8sRUFBRTtnQkFDUixtQkFBbUI7Z0JBQ25CLG1CQUFtQjtnQkFDbkIsbUJBQW1CO2dCQUNuQixvQkFBb0I7Z0JBQ3BCLG9CQUFvQjtnQkFDcEIsb0JBQW9CO2dCQUNwQixTQUFTO2FBQ1Q7WUFFRCxPQUFPLEVBQUU7Z0JBQ1IsMkJBQTJCO2dCQUMzQix1QkFBdUI7Z0JBQ3ZCLHFCQUFxQjtnQkFDckIsbUJBQW1CO2FBQ25CO1NBQ0QsQ0FBQTtRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCwrQkFBYSxHQUFiO1FBQ0MsT0FBTztZQUNOLFdBQVc7WUFDWCxNQUFNO1lBQ04sTUFBTTtZQUNOLE9BQU87WUFDUCxlQUFlO1lBQ2YsVUFBVTtZQUNWLEtBQUs7WUFDTCxjQUFjO1lBQ2QsaUJBQWlCO1lBQ2pCLE9BQU87U0FDUCxDQUFBO0lBQ0YsQ0FBQztJQUVELDhCQUFZLEdBQVo7UUFDQyxPQUFPO1lBQ04sOENBQThDO1lBQzlDLHVDQUF1QztZQUN2QyxlQUFlO1lBQ2YsV0FBVztZQUNYLFVBQVU7WUFDVixTQUFTO1lBQ1QsYUFBYTtZQUNiLE9BQU87U0FDUCxDQUFBO0lBQ0YsQ0FBQztJQUVELGlDQUFlLEdBQWY7UUFDQyxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBRyxJQUFJLENBQUMsU0FBVyxFQUFF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ckMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0YsY0FBQztBQUFELENBQUMsQUE1T0QsSUE0T0M7QUE1T1ksMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZXNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL2Rlc2VyaWFsaXphYmxlLm1vZGVsXCI7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdCBpbXBsZW1lbnRzIERlc2VyaWFsaXphYmxlIHtcblxuXHRwcm9qZWN0SWQ/OiBudW1iZXI7XG5cdGVtYWlsPzogc3RyaW5nO1xuXHRwaG9uZU51bWJlcj86IHN0cmluZztcblx0c2Nob29sTmFtZT86IHN0cmluZztcblx0c2Nob29sQWRkcmVzcz86IHN0cmluZztcblx0dXNlclNjaG9vbEFmZmlsaWF0aW9uPzogc3RyaW5nO1xuXHR1c2VyU2Nob29sQWZmaWxpYXRpb25UeXBlPzogc3RyaW5nO1xuXHRzY2hvb2xFbnJvbGxlZXM/OiBzdHJpbmc7XG5cdGNsdWJTcG9uc29yPzogc3RyaW5nO1xuXHR0ZWFjaGVyTmFtZT86IHN0cmluZztcblx0dGVhY2hlckVtYWlsPzogc3RyaW5nO1xuXHRwcm9qZWN0RGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cdHZpZGVvTGluaz86IHN0cmluZztcblx0aW1hZ2VVcmw/OiBhbnk7XG5cdHJhaXNlZE1vbmV5Pzogc3RyaW5nO1xuXHRiYW5kc1NvbGQ/OiBzdHJpbmc7XG5cdHRvdGFsQmFuZHM/OiBudW1iZXI7XG5cdGRhdGVTdGFydD86IHN0cmluZztcblx0ZGF0ZUVuZD86IHN0cmluZztcblx0aGVhcmRGcm9tPzogc3RyaW5nO1xuXHRkYXRldGltZUNyZWF0ZWQ/OiBzdHJpbmc7XG5cdGRhdGV0aW1lVXBkYXRlZD86IHN0cmluZztcblx0c3R1ZGVudEFwcHJvdmFsPzogc3RyaW5nO1xuXHRzaGlwbWVudEFwcHJvdmFsPzogc3RyaW5nO1xuXHRzdGF0dXM/OiBzdHJpbmc7XG5cblx0dXNlcklkPzogYW55O1xuXHRzdHVkZW50SWQ/OiBhbnk7XG5cdG1hbmFnZXI/OiBhbnk7XG5cblx0ZGVzZXJpYWxpemUoaW5wdXQ6IGFueSk6IHRoaXMge1xuXHQgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbnB1dCk7XG5cdCAgICByZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEFmZmlsaWF0aW9uKHR5cGUpIHtcblxuXHRcdGxldCBkYXRhID0ge1xuXHRcdFx0c3R1ZGVudDogW1xuXHRcdFx0XHQnN3RoIGdyYWRlIHN0dWRlbnQnLFxuXHRcdFx0XHQnOHRoIGdyYWRlIHN0dWRlbnQnLFxuXHRcdFx0XHQnOXRoIGdyYWRlIHN0dWRlbnQnLFxuXHRcdFx0XHQnMTB0aCBncmFkZSBzdHVkZW50Jyxcblx0XHRcdFx0JzExdGggZ3JhZGUgc3R1ZGVudCcsXG5cdFx0XHRcdCcxMnRoIGdyYWRlIHN0dWRlbnQnLFxuXHRcdFx0XHQnQ29sbGVnZSdcblx0XHRcdF0sXG5cblx0XHRcdHRlYWNoZXI6IFtcblx0XHRcdFx0J0VsZW1lbnRhcnkgU2Nob29sIFRlYWNoZXInLFxuXHRcdFx0XHQnTWlkZGxlIFNjaG9vbCBUZWFjaGVyJyxcblx0XHRcdFx0J0hpZ2ggU2Nob29sIFRlYWNoZXInLFxuXHRcdFx0XHQnQ29sbGVnZSBQcm9mZXNzb3InXG5cdFx0XHRdXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRhdGFbdHlwZV07XG5cdH1cblxuXHRnZXRTY2hvb2xDbHViKCkge1xuXHRcdHJldHVybiBbXG5cdFx0XHQnQmV0YSBDbHViJyxcblx0XHRcdCdERUNBJyxcblx0XHRcdCdGQkxBJyxcblx0XHRcdCdGQ0NMQScsXG5cdFx0XHQnSW50ZXJhY3QgQ2x1YicsXG5cdFx0XHQnS2V5IENsdWInLFxuXHRcdFx0J05IUycsXG5cdFx0XHQnU3BhbmlzaCBDbHViJyxcblx0XHRcdCdTdHVkZW50IENvdW5jaWwnLFxuXHRcdFx0J090aGVyJ1xuXHRcdF1cblx0fVxuXG5cdGdldEhlYXJkRnJvbSgpIHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0J1JlZmVycmVkIGJ5IHNvbWVvbmUgd2hvIGhhcyBkb25lIHRoZSBwcm9qZWN0Jyxcblx0XHRcdCdNeSBzY2hvb2wgaGFzIGRvbmUgdGhlIHByb2plY3QgYmVmb3JlJyxcblx0XHRcdCdHb29nbGUgU2VhcmNoJyxcblx0XHRcdCdJbnN0YWdyYW0nLFxuXHRcdFx0J0ZhY2Vib29rJyxcblx0XHRcdCdUd2l0dGVyJyxcblx0XHRcdCdDb252ZW50aW9ucycsXG5cdFx0XHQnT3RoZXInXG5cdFx0XVxuXHR9XG5cblx0Z2V0RGF0ZUR1cmF0aW9uKCkge1xuXHRcdGxldCBkYXRlU3RhcnQgPSBtb21lbnQoYCR7dGhpcy5kYXRlU3RhcnR9YCwgJ1lZWVktTU0tREQnKS5mb3JtYXQoJ2xsJyk7XG5cdFx0bGV0IGRhdGVFbmQgPSBtb21lbnQoYCR7dGhpcy5kYXRlRW5kfWAsICdZWVlZLU1NLUREJykuZm9ybWF0KCdsbCcpO1xuXG5cdFx0cmV0dXJuIGAke2RhdGVTdGFydH0gLSAke2RhdGVFbmR9YDtcblx0fVxuXG5cdGdldER1cmF0aW9uMigpIHtcblx0XHRsZXQgZDEgPSB0aGlzLmRhdGVTdGFydC5zcGxpdCgnLScpO1xuXHRcdGxldCBkMiA9IHRoaXMuZGF0ZUVuZC5zcGxpdCgnLScpO1xuXG5cdFx0bGV0IG1vbnRocyA9IFtcblx0XHRcdCdKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5Jyxcblx0XHRcdCdKdW4nLCAnSnVseScsICdBdWcnLCAnU2VwJywgJ09jdCcsICdEZWMnXG5cdFx0XTtcblxuXHRcdGxldCBkcyA9IHtcblx0XHRcdHllYXI6IGQxWzBdLFxuXHRcdFx0bW9udGg6IHBhcnNlSW50KGQxWzFdKS0xLFxuXHRcdFx0ZGF5OiBkMVsyXVxuXHRcdH1cblxuXHRcdGxldCBkZSA9IHtcblx0XHRcdHllYXI6IGQyWzBdLFxuXHRcdFx0bW9udGg6IHBhcnNlSW50KGQyWzFdKS0xLFxuXHRcdFx0ZGF5OiBkMlsyXVxuXHRcdH1cblxuXHRcdGxldCBkYXRlU3RhcnQgPSBgJHtkcy5tb250aH0gJHtkcy5kYXl9LCAke2RzLnllYXJ9YDtcblx0XHRsZXQgZGF0ZUVuZCA9IGAke2RlLm1vbnRofSAke2RlLmRheX0sICR7ZGUueWVhcn1gO1xuXG5cdFx0cmV0dXJuIGAke2RhdGVTdGFydH0gLSAke2RhdGVFbmR9YDtcblx0fVxuXG5cdGdldFNjaG9vbE5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMudG9UaXRsZUNhc2UodGhpcy5zY2hvb2xOYW1lKVxuXHR9XG5cblx0Z2V0Q3VycmVudFllYXIoKSB7XG5cdFx0bGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuXG5cdFx0cmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKTtcblx0fVxuXG5cdGZvcm1hdFByb2plY3REdXJhdGlvbkRhdGUobW9udGgsIGRheSwgeWVhciwgdHlwZT8pIHtcblx0XHRsZXQgZGF0ZSA9IG5ldyBEYXRlKGAke3llYXJ9LyR7bW9udGgrMX0vJHtkYXl9YCk7XG5cblx0XHRpZih0eXBlID09PSAnc3RhcnQnKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRkYXRlOiBtb21lbnQoZGF0ZSkuZm9ybWF0KCdMJylcblx0XHRcdH1cblx0XHR9ZWxzZSB7XG5cdFx0XHRkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyAxMSk7XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGZvcm1hdHRlZDogbW9tZW50KGRhdGUpLmZvcm1hdCgnTEwnKSxcblx0XHRcdFx0ZGF0ZTogbW9tZW50KGRhdGUpLmZvcm1hdCgnTCcpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aXNTdGVwQ2xlYW4oc3RlcCkge1xuXHRcdGlmKHN0ZXAgPT09IDEpIHtcblx0XHRcdGlmKFxuXHRcdFx0XHQhdGhpcy5lbWFpbCB8fCBcblx0XHRcdFx0IXRoaXMucGhvbmVOdW1iZXJcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKHN0ZXAgPT09IDIpIHtcblx0XHRcdGlmKFxuXHRcdFx0XHQhdGhpcy5zY2hvb2xOYW1lIFx0fHxcblx0XHRcdFx0IXRoaXMuc2Nob29sQWRkcmVzcyB8fFxuXHRcdFx0XHQhdGhpcy5jbHViU3BvbnNvciBcdHx8XG5cdFx0XHRcdCF0aGlzLnNjaG9vbEVucm9sbGVlc1xuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fWVsc2UgaWYoc3RlcCA9PT0gMykge1xuXHRcdFx0aWYoXG5cdFx0XHRcdCF0aGlzLnRlYWNoZXJOYW1lIHx8XG5cdFx0XHRcdCF0aGlzLnRlYWNoZXJFbWFpbFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fWVsc2UgaWYoc3RlcCA9PT0gNCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fWVsc2UgaWYoc3RlcCA9PT0gNSkge1xuXHRcdFx0aWYoIXRoaXMuaGVhcmRGcm9tKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aGFzU3R1ZGVudCgpIHtcblx0XHRyZXR1cm4gKCF0aGlzLnN0dWRlbnRJZCB8fCAhdGhpcy5zdHVkZW50SWQuc3R1ZGVudElkKT8gZmFsc2UgOiB0cnVlO1xuXHR9XG5cblx0Z2V0UmFpc2VkTW9uZXkoKSB7XG5cdFx0bGV0IHJhaXNlZE1vbmV5ID0gcGFyc2VJbnQodGhpcy5iYW5kc1NvbGQpKjc7XG5cblx0XHRyYWlzZWRNb25leSA9IHRoaXMua0Zvcm1hdHRlcihyYWlzZWRNb25leSk7XG5cdFx0XG5cdFx0cmV0dXJuIGAkICR7cmFpc2VkTW9uZXl9YDtcblx0fVxuXG5cdGNoZWNrVXBkYXRlQmFuZHMobmV3TnVtYmVyKSB7XG5cdFx0bmV3TnVtYmVyID0gcGFyc2VJbnQobmV3TnVtYmVyKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRzdWNjZXNzOiAobmV3TnVtYmVyID4gdGhpcy50b3RhbEJhbmRzKT8gZmFsc2UgOiB0cnVlLFxuXHRcdFx0bWVzc2FnZTogKG5ld051bWJlciA+IHRoaXMudG90YWxCYW5kcyk/ICdCYW5kcyBlbnRlcmVkIGV4Y2VkZWVkIHRoZSB0b3RhbCBiYW5kcycgOiAnJ1xuXHRcdH1cblx0fVxuXG5cdGdldE9yZGVyRGVhZExpbmUoKSB7XG5cdFx0bGV0IGRhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGVTdGFydCk7XG5cblx0XHRkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSAxMyk7XG5cblx0XHRsZXQgZGVhZGxpbmUgPSBtb21lbnQoZGF0ZSkuZm9ybWF0KCdMJyk7XG5cblx0XHRyZXR1cm4gZGVhZGxpbmU7XG5cdH1cblxuXHRrRm9ybWF0dGVyKG51bSkge1xuXHRcdHJldHVybiBudW0gPiA5OTkgPyAobnVtLzEwMDApLnRvRml4ZWQoMSkgKyAnaycgOiBudW1cblx0fVxuXG5cdGNsZWFyVGVhY2hlcigpIHtcblx0XHR0aGlzLnRlYWNoZXJOYW1lICA9ICcnO1xuICAgICAgICB0aGlzLnRlYWNoZXJFbWFpbCA9ICcnOyBcblx0fVxuXG5cdHRvVGl0bGVDYXNlKHN0cikge1xuXHQgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHdcXFMqL2csIGZ1bmN0aW9uKHR4dCl7XG5cdCAgICAgICAgcmV0dXJuIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcblx0ICAgIH0pO1xuXHR9XG59XG5cblxuXG4iXX0=