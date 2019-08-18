import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {person} from "./person";


@Entity("debtor",{schema:"finance" } )
@Index("fk_debtor_person1_idx",["personIdperson",])
export class debtor {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"iddebtor"
        })
    iddebtor:number;
        

    @Column("enum",{ 
        nullable:false,
        default: () => "'active'",
        enum:["active","inactive"],
        name:"de_state"
        })
    de_state:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:200,
        name:"de_description"
        })
    de_description:string | null;
        

   
    @ManyToOne(type=>person, person=>person.debtors,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'person_idperson'})
    personIdperson:person | null;

}
