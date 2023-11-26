import { UserDtoRole } from "@api/services/models";

export type Route = {
	path: string;
	Component: React.ComponentType;
	roles?: UserDtoRole[];
};
