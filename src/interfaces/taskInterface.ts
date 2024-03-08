import { Status } from "./status";
import { UserInterface } from "./userInterface";

export  interface TaskInterface {
    id: number;
    title: string;
    description: string;
    status: Status;
    user: UserInterface;
}