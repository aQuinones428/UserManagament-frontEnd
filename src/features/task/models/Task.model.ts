import { User } from "../../users/models/User.model";

export interface Task {
    id?: number;
    title: string;
    status?: string;
    newStatus?: number;
    user: User;
}