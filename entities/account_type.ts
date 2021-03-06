import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {account} from "./account";


@Entity("account_type",{schema:"finance" } )
export class account_type {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id_account_type"
        })
    id_account_type:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"at_name"
        })
    at_name:string | null;
        

    @Column("enum",{ 
        nullable:true,
        default: () => "'active'",
        enum:["active","inactive"],
        name:"at_state"
        })
    at_state:string | null;
        

   
    @OneToMany(type=>account, account=>account.fkTypeAcco,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    accounts:account[];
    
}
