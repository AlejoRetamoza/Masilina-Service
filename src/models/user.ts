import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity
} from "typeorm";
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({ nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;
}
