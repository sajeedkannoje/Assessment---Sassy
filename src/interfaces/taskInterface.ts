import { Status }        from "./status";
import { UserInterface } from "./userInterface";

/**
 * TaskInterface
 */
export interface TaskInterface {
	id : number;
	title : string;
	description : string;
	status : Status;
	user : UserInterface;
}