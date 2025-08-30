import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
	OneToMany,
	ManyToOne,
	DeleteDateColumn
} from "typeorm";
import { Brand } from "./brand";
import { ProductCategory } from "./product_category";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    description: string;

	@Column({ nullable: false, type: 'float', default: 0 })
	price: number;
	
	@DeleteDateColumn()
	deletedAt?: Date;

    @Column({ default: true })
    isHomeProduct: boolean;

	@ManyToOne(() => Brand, brand => brand.products)
	brand: Brand;
	
	@OneToMany(() => ProductCategory, (product_category) => product_category.product, { cascade: true})
	categories: ProductCategory[];
}
