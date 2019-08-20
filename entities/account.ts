import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {person} from "./person";
import {account_type} from "./account_type";
import {movement} from "./movement";


@Entity("account",{schema:"finance" } )
@Index("fk_account_person1_idx",["fkIdPerson",])
@Index("fk_account_account_type1_idx",["fkTypeAcco",])
export class account {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id_account"
        })
    id_account:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"acc_title"
        })
    acc_title:string;
        

    @Column("double",{ 
        nullable:false,
        name:"acc_initial_value"
        })
    acc_initial_value:number;
        

   
    @ManyToOne(type=>person, person=>person.accounts,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_id_person'})
    fkIdPerson:person | null;


   
    @ManyToOne(type=>account_type, account_type=>account_type.accounts,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_type_acco'})
    fkTypeAcco:account_type | null;


   
    @OneToMany(type=>movement, movement=>movement.fkIdAccount,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    movements:movement[];
    
}
