import { Role, Status } from "../../generated/prisma/enums";

export interface IRequestUser {
    userId: string;
    role: Role;
    email: string;
    status: Status;
}
