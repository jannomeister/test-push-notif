import { Deserializable } from "./deserializable.model";

export class Member implements Deserializable {

	projectMemberId: number;
	userId: number;
	projectId: number;
	reason: string;
	datetimeCreated: string;
	datetimeUpdated: string;
	status: string;

	deserialize(input: any): this {
	    Object.assign(this, input);
	    return this;
	}
}