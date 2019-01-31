import { Deserializable } from "./deserializable.model";

export class Feedback implements Deserializable {

	projectFeedbackId: number;
	projectId: number;
	userId: number;
	rating: number;
	concern: string;
	datetimeCreated: string;
	datetimeUpdated: string;
	status: string;

	deserialize(input: any): this {
	    Object.assign(this, input);
	    return this;
	}
}