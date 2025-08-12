import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Project extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	title: string;

	@Column({ nullable: true })
	description: string;

	@Column({ nullable: true })
	googleMapsUrl: string;

	@Column({ nullable: true })
	address: string;

	@Column({ nullable: false })
	portrait: string;

	@Column('text', { array: true, default: '{}' })
  	images: string[];

	@Column({ nullable: true })
  	order: number;

	@Column({ default: 0 })
  	unitsAvailable: number;

	@Column({ default: 0 })
  	unitsTotal: number;
	
	@Column({ default: false })
	inProgress: boolean;
}
