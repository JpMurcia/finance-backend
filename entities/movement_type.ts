import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {movement} from "./movement";


@Entity("movement_type",{schema:"finance" } )
export class movement_type {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idmovement_type"
        })
    idmovement_type:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"mt_name"
        })
    mt_name:string;
        

    @Column("date",{ 
        nullable:false,
        name:"mt_date_acction"
        })
    mt_date_acction:string;
        

   
    @OneToMany(type=>movement, movement=>movement.movementTypeIdmovementType,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    movements:movement[];
    
}
