import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {account} from "./account";
import {debtor} from "./debtor";
import {user1} from "./user1";


@Entity("person",{schema:"finance" } )
export class person {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id_person"
        })
    id_person:number;
        

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
        

   
    @OneToMany(type=>account, account=>account.fkIdPerson,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    accounts:account[];
    

   
    @OneToMany(type=>debtor, debtor=>debtor.fkIdPerson,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    debtors:debtor[];
    

   
    @OneToMany(type=>user1, user1=>user1.fkIdPerson,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    users:user1[];
    
}
