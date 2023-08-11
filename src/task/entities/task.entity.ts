import { User } from "src/auth/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'tasks'})
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column('text')
    state: string;


    @Column('text')
    prioridad: string;


    @Column('text')
    fecha: string;


    @ManyToOne(
        () => User,
        ( user ) => user.task,
        { eager: true }
    )
    user: User

}
