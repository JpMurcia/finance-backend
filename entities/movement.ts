import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {movement_type} from "./movement_type";
import {category} from "./category";
import {account} from "./account";
import {couta} from "./couta";


@Entity("movement",{schema:"finance" } )
@Index("fk_movement_movement_type1_idx",["fkTypeMovem",])
@Index("fk_movement_category1_idx",["fkIdCategory",])
@Index("fk_movement_account1_idx",["fkIdAccount",])
export class movement {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id_movement"
        })
    id_movement:number;
        

    @Column("double",{ 
        nullable:false,
        name:"mo_value"
        })
    mo_value:number;
        

    @Column("date",{ 
        nullable:false,
        name:"mo_date"
        })
    mo_date:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"mo_description"
        })
    mo_description:string;
        

    @Column("enum",{ 
        nullable:false,
        default: () => "'active'",
        enum:["active","inactive","Pendiente"],
        name:"mo_state"
        })
    mo_state:string;
        

   
    @ManyToOne(type=>movement_type, movement_type=>movement_type.movements,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_type_movem'})
    fkTypeMovem:movement_type | null;


   
    @ManyToOne(type=>category, category=>category.movements,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_id_category'})
    fkIdCategory:category | null;


   
    @ManyToOne(type=>account, account=>account.movements,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_id_account'})
    fkIdAccount:account | null;


   
    @OneToMany(type=>couta, couta=>couta.fkIdMovement,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    coutas:couta[];
    
}
