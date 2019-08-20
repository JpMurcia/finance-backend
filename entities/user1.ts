import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {person} from "./person";


@Entity("user1",{schema:"finance" } )
@Index("fk_user_person_idx",["fkIdPerson",])
export class user1 {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id_user"
        })
    id_user:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"email"
        })
    email:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"password"
        })
    password:string;
        

   
    @ManyToOne(type=>person, person=>person.users,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_id_person'})
    fkIdPerson:person | null;

}
