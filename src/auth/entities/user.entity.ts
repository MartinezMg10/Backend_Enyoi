import { Task } from "src/task/entities/task.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text')
    firstName:string;

    @Column('text')
    lastName:string;

    @Column('text',{
        unique:true
    })
    email:string;

    @Column('text',{
        select:false
    })
    password:string;

    @Column('text',{
        default:"Image.jpg"
    })
    image:String;

    @Column('bool',{
        default:true
    })
    isActive:boolean;


    @Column('text',{
        array:true,
        default: ['user']
    })
    roles:string[];

    @OneToMany(
        () => Task,
        ( task ) => task.user
    )
    task: Task;


    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLocaleLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdatet(){
        this.checkFieldsBeforeInsert();
    }


}

