import { Deserializable } from "./deserializable.model";

export class Report implements Deserializable {

	projectReportId: number;
	projectId: number;
	totalExtraBand: number;
	extraDonation: number;
	datetimeCreated: string;
	datetimeUpdated: string;
	status: string;

	deserialize(input: any): this {
	    Object.assign(this, input);
	    return this;
	}

	isRequiredFieldsNotEmpty() {
		if(
			!this.extraDonation
		) {
			return false;
		}else {
			return true;
		}
	}
}