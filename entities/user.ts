import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {person} from "./person";


@Entity("user",{schema:"finance" } )
@Index("fk_user_person_idx",["personIdperson",])
export class user {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"iduser"
        })
    iduser:number;
        

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
        

   
    @ManyToOne(type=>person, person=>person.users,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'person_idperson'})
    personIdperson:person | null;

}
