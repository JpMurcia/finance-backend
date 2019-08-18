import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {movement_type} from "./movement_type";
import {category} from "./category";
import {account} from "./account";
import {couta} from "./couta";


@Entity("movement",{schema:"finance" } )
@Index("fk_movement_movement_type1_idx",["movementTypeIdmovementType",])
@Index("fk_movement_category1_idx",["categoryIdcategory",])
@Index("fk_movement_account1_idx",["accountIdaccount",])
export class movement {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idmovement"
        })
    idmovement:number;
        

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
        enum:["active","inactive"],
        name:"mo_state"
        })
    mo_state:string;
        

   
    @ManyToOne(type=>movement_type, movement_type=>movement_type.movements,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'movement_type_idmovement_type'})
    movementTypeIdmovementType:movement_type | null;


   
    @ManyToOne(type=>category, category=>category.movements,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'category_idcategory'})
    categoryIdcategory:category | null;


   
    @ManyToOne(type=>account, account=>account.movements,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'account_idaccount'})
    accountIdaccount:account | null;


   
    @OneToMany(type=>couta, couta=>couta.movementIdmovement,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    coutas:couta[];
    
}
