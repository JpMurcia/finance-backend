import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {person} from "./person";


@Entity("debtor",{schema:"finance" } )
@Index("fk_debtor_person1_idx",["fkIdPerson",])
export class debtor {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id_debtor"
        })
    id_debtor:number;
        

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
        

   
    @ManyToOne(type=>person, person=>person.debtors,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_id_person'})
    fkIdPerson:person | null;


    @Column("double",{ 
        nullable:true,
        name:"values_debtor"
        })
    values_debtor:number | null;
        

    @Column("date",{ 
        nullable:true,
        name:"date_debtor"
        })
    date_debtor:string | null;
        
}
