import { Deserializable } from "./deserializable.model";

export class UserProgress implements Deserializable {

	userProgressId?: number;
	userId?: number;
	watchVideos?: string;
	downloadVideos?: string;
	printStudentProfile?: string;
	orderShirt?: string;

	deserialize(input: any): this {
	    Object.assign(this, input);
	    return this;
	}

	getProgress() {
		return {
			watchVideos: (this.watchVideos === 'pending')? false : true,
			printedStudentProfile: (this.printStudentProfile === 'pending')? false : true,
			hasSharedVideos: (this.downloadVideos === 'pending')? false : true,
			hasOrderedShirts: (this.orderShirt === 'pending')? false : true
		}
	}
}