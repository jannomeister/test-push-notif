import { Deserializable } from "./deserializable.model";

export class Convention implements Deserializable {

	conventionId: number;
	userId: number;
	name: string;
	description: string;
	datetimeCreated: string;
	datetimeUpdated: string;
	status: string;

	deserialize(input: any): this {
	    Object.assign(this, input);
	    return this;
	}
}