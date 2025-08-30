import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, DeleteDateColumn } from "typeorm";
import { Product } from "./product";
import { Category } from "./category";

@Entity()
export class ProductCategory extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Product, (product) => product.categories, {
		onDelete: "CASCADE",
	})
	product: Product;

	@ManyToOne(() => Category, (category) => category.products, {
		onDelete: "CASCADE",
	})
	category: Category;

	@DeleteDateColumn()
	deletedAt?: Date;
}
