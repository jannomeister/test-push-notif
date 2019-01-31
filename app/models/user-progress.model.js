"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserProgress = /** @class */ (function () {
    function UserProgress() {
    }
    UserProgress.prototype.deserialize = function (input) {
        Object.assign(this, input);
        return this;
    };
    UserProgress.prototype.getProgress = function () {
        return {
            watchVideos: (this.watchVideos === 'pending') ? false : true,
            printedStudentProfile: (this.printStudentProfile === 'pending') ? false : true,
            hasSharedVideos: (this.downloadVideos === 'pending') ? false : true,
            hasOrderedShirts: (this.orderShirt === 'pending') ? false : true
        };
    };
    return UserProgress;
}());
exports.UserProgress = UserProgress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9ncmVzcy5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXItcHJvZ3Jlc3MubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTtJQUFBO0lBc0JBLENBQUM7SUFiQSxrQ0FBVyxHQUFYLFVBQVksS0FBVTtRQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsa0NBQVcsR0FBWDtRQUNDLE9BQU87WUFDTixXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDM0QscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEtBQUssU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM3RSxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDbEUsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUk7U0FDL0QsQ0FBQTtJQUNGLENBQUM7SUFDRixtQkFBQztBQUFELENBQUMsQUF0QkQsSUFzQkM7QUF0Qlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZXNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL2Rlc2VyaWFsaXphYmxlLm1vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VyUHJvZ3Jlc3MgaW1wbGVtZW50cyBEZXNlcmlhbGl6YWJsZSB7XG5cblx0dXNlclByb2dyZXNzSWQ/OiBudW1iZXI7XG5cdHVzZXJJZD86IG51bWJlcjtcblx0d2F0Y2hWaWRlb3M/OiBzdHJpbmc7XG5cdGRvd25sb2FkVmlkZW9zPzogc3RyaW5nO1xuXHRwcmludFN0dWRlbnRQcm9maWxlPzogc3RyaW5nO1xuXHRvcmRlclNoaXJ0Pzogc3RyaW5nO1xuXG5cdGRlc2VyaWFsaXplKGlucHV0OiBhbnkpOiB0aGlzIHtcblx0ICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5wdXQpO1xuXHQgICAgcmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQcm9ncmVzcygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0d2F0Y2hWaWRlb3M6ICh0aGlzLndhdGNoVmlkZW9zID09PSAncGVuZGluZycpPyBmYWxzZSA6IHRydWUsXG5cdFx0XHRwcmludGVkU3R1ZGVudFByb2ZpbGU6ICh0aGlzLnByaW50U3R1ZGVudFByb2ZpbGUgPT09ICdwZW5kaW5nJyk/IGZhbHNlIDogdHJ1ZSxcblx0XHRcdGhhc1NoYXJlZFZpZGVvczogKHRoaXMuZG93bmxvYWRWaWRlb3MgPT09ICdwZW5kaW5nJyk/IGZhbHNlIDogdHJ1ZSxcblx0XHRcdGhhc09yZGVyZWRTaGlydHM6ICh0aGlzLm9yZGVyU2hpcnQgPT09ICdwZW5kaW5nJyk/IGZhbHNlIDogdHJ1ZVxuXHRcdH1cblx0fVxufSJdfQ==