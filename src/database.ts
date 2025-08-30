import { DataSource } from "typeorm";
import { User } from "./models/user";
import { Project } from "./models/project";
import { Brand } from "./models/brand";
import { Category } from "./models/category";
import { Product } from "./models/product";
import { ProductCategory } from "./models/product_category";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "dba",
	password: "1234",
	database: "pgequipamientos",
	synchronize: true,
	// logging: true,
	entities: [User, Project, Brand, Category, Product, ProductCategory],
});
