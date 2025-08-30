import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
	OneToMany,
	DeleteDateColumn
} from "typeorm";
import { Product } from "./product";

@Entity()
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
	logoImage: string;
	
	@OneToMany(() => Product, (product) => product.brand)
	products: Product[];
	
	@DeleteDateColumn()
	deletedAt?: Date;
}
