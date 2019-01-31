import { Deserializable } from "./deserializable.model";

export class Shipment implements Deserializable {

	shipmentId: number;
	projectId: any;
	senderId: any;
	receiverId: any;
	trackingNumber: string;
	bandsReceived: number;
	totalBands: number;
	pickUpDate: string;
	datetimeCreated: string;
    datetimeUpdated: string;
    confirmationStatus: string;
    status: string;

	deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    isActive() {
    	return (this.status === 'active')? true : false;
    }

    isDelivered() {
    	return (this.confirmationStatus === 'unconfirmed' && this.status === 'delivered')? true : false;
    }

    getStatus() {
    	let status = {
	        none: false,
	        active: false,
	        delivered: false,
	        confirmed: false
	    };

	    if(this.status === 'active') {
	    	status.active = true;
	    }else if(this.status === 'delivered'){
	    	status.delivered = true;
	    }else if(this.confirmationStatus === 'confirmed' && this.status === 'delivered') {
	    	status.confirmed = true;
	    }else {
	    	status.none = true;
	    }

	    return status;
    }
}