"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Shipment = /** @class */ (function () {
    function Shipment() {
    }
    Shipment.prototype.deserialize = function (input) {
        Object.assign(this, input);
        return this;
    };
    Shipment.prototype.isActive = function () {
        return (this.status === 'active') ? true : false;
    };
    Shipment.prototype.isDelivered = function () {
        return (this.confirmationStatus === 'unconfirmed' && this.status === 'delivered') ? true : false;
    };
    Shipment.prototype.getStatus = function () {
        var status = {
            none: false,
            active: false,
            delivered: false,
            confirmed: false
        };
        if (this.status === 'active') {
            status.active = true;
        }
        else if (this.status === 'delivered') {
            status.delivered = true;
        }
        else if (this.confirmationStatus === 'confirmed' && this.status === 'delivered') {
            status.confirmed = true;
        }
        else {
            status.none = true;
        }
        return status;
    };
    return Shipment;
}());
exports.Shipment = Shipment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcG1lbnQubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaGlwbWVudC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBQUE7SUFnREEsQ0FBQztJQWpDQSw4QkFBVyxHQUFYLFVBQVksS0FBVTtRQUNmLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwyQkFBUSxHQUFSO1FBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2pELENBQUM7SUFFRCw4QkFBVyxHQUFYO1FBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxhQUFhLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDakcsQ0FBQztJQUVELDRCQUFTLEdBQVQ7UUFDQyxJQUFJLE1BQU0sR0FBRztZQUNULElBQUksRUFBRSxLQUFLO1lBQ1gsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsS0FBSztZQUNoQixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDO1FBRUYsSUFBRyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM1QixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNyQjthQUFLLElBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUM7WUFDcEMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDeEI7YUFBSyxJQUFHLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7WUFDaEYsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDeEI7YUFBSztZQUNMLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ25CO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDZixDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFoREQsSUFnREM7QUFoRFksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZXNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL2Rlc2VyaWFsaXphYmxlLm1vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBTaGlwbWVudCBpbXBsZW1lbnRzIERlc2VyaWFsaXphYmxlIHtcblxuXHRzaGlwbWVudElkOiBudW1iZXI7XG5cdHByb2plY3RJZDogYW55O1xuXHRzZW5kZXJJZDogYW55O1xuXHRyZWNlaXZlcklkOiBhbnk7XG5cdHRyYWNraW5nTnVtYmVyOiBzdHJpbmc7XG5cdGJhbmRzUmVjZWl2ZWQ6IG51bWJlcjtcblx0dG90YWxCYW5kczogbnVtYmVyO1xuXHRwaWNrVXBEYXRlOiBzdHJpbmc7XG5cdGRhdGV0aW1lQ3JlYXRlZDogc3RyaW5nO1xuICAgIGRhdGV0aW1lVXBkYXRlZDogc3RyaW5nO1xuICAgIGNvbmZpcm1hdGlvblN0YXR1czogc3RyaW5nO1xuICAgIHN0YXR1czogc3RyaW5nO1xuXG5cdGRlc2VyaWFsaXplKGlucHV0OiBhbnkpOiB0aGlzIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbnB1dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlzQWN0aXZlKCkge1xuICAgIFx0cmV0dXJuICh0aGlzLnN0YXR1cyA9PT0gJ2FjdGl2ZScpPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgaXNEZWxpdmVyZWQoKSB7XG4gICAgXHRyZXR1cm4gKHRoaXMuY29uZmlybWF0aW9uU3RhdHVzID09PSAndW5jb25maXJtZWQnICYmIHRoaXMuc3RhdHVzID09PSAnZGVsaXZlcmVkJyk/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRTdGF0dXMoKSB7XG4gICAgXHRsZXQgc3RhdHVzID0ge1xuXHQgICAgICAgIG5vbmU6IGZhbHNlLFxuXHQgICAgICAgIGFjdGl2ZTogZmFsc2UsXG5cdCAgICAgICAgZGVsaXZlcmVkOiBmYWxzZSxcblx0ICAgICAgICBjb25maXJtZWQ6IGZhbHNlXG5cdCAgICB9O1xuXG5cdCAgICBpZih0aGlzLnN0YXR1cyA9PT0gJ2FjdGl2ZScpIHtcblx0ICAgIFx0c3RhdHVzLmFjdGl2ZSA9IHRydWU7XG5cdCAgICB9ZWxzZSBpZih0aGlzLnN0YXR1cyA9PT0gJ2RlbGl2ZXJlZCcpe1xuXHQgICAgXHRzdGF0dXMuZGVsaXZlcmVkID0gdHJ1ZTtcblx0ICAgIH1lbHNlIGlmKHRoaXMuY29uZmlybWF0aW9uU3RhdHVzID09PSAnY29uZmlybWVkJyAmJiB0aGlzLnN0YXR1cyA9PT0gJ2RlbGl2ZXJlZCcpIHtcblx0ICAgIFx0c3RhdHVzLmNvbmZpcm1lZCA9IHRydWU7XG5cdCAgICB9ZWxzZSB7XG5cdCAgICBcdHN0YXR1cy5ub25lID0gdHJ1ZTtcblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIHN0YXR1cztcbiAgICB9XG59Il19