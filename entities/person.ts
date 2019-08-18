import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {account} from "./account";
import {debtor} from "./debtor";
import {user} from "./user";


@Entity("person",{schema:"finance" } )
export class person {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idperson"
        })
    idperson:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"per_name"
        })
    per_name:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"per_lastname"
        })
    per_lastname:string;
        

    @Column("enum",{ 
        nullable:false,
        enum:["MASCULINO","FEMENINO"],
        name:"per_gender"
        })
    per_gender:string;
        

   
    @OneToMany(type=>account, account=>account.personIdperson,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    accounts:account[];
    

   
    @OneToMany(type=>debtor, debtor=>debtor.personIdperson,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    debtors:debtor[];
    

   
    @OneToMany(type=>user, user=>user.personIdperson,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    users:user[];
    
}
