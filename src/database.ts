import { DataSource } from "typeorm";
import { User } from "./models/user";
import { Project } from "./models/project";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "dba",
	password: "1234",
	database: "viare",
	synchronize: true,
	// logging: true,
	entities: [User, Project],
});
