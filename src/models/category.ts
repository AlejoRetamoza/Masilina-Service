import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
	OneToMany,
	ManyToOne,
	DeleteDateColumn
} from "typeorm";
import { ProductCategory } from "./product_category";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;
	
	@OneToMany(() => ProductCategory, (product_category) => product_category.category, { onDelete: 'CASCADE' })
	products: ProductCategory[];
	
	@DeleteDateColumn()
	deletedAt?: Date;
}
