import { Deserializable } from "./deserializable.model";

export class UserSetting implements Deserializable {

	userSettingId: number;
	userId: number;
	allowNotification: boolean;
	tourProgress: number;
	datetimeCreated: string;
	datetimeUpdated: string;
	status: string;

	deserialize(input: any): this {
	    Object.assign(this, input);
	    return this;
	}
}