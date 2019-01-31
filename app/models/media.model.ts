import { Deserializable } from "./deserializable.model";

export class Media implements Deserializable {

	mediaResourceId?: number;
	link?: string;
	type?: string;
	status?: string;

	deserialize(input: any): this {
	    Object.assign(this, input);
	    return this;
	}
}