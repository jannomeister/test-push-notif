import { Deserializable } from "./deserializable.model";

export class StudentNeed implements Deserializable {

	studentNeedId: number;
	studentId: any;
	totalBands: number;
	cost: number;
	year: number;
	message: string;
	statusNeed: string;
	status: string;

	deserialize(input: any): this {
	    Object.assign(this, input);
	    return this;
	}
}