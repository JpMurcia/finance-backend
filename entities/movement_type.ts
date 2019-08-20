import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {category} from "./category";
import {movement} from "./movement";


@Entity("movement_type",{schema:"finance" } )
export class movement_type {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id_type_movement"
        })
    id_type_movement:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"mt_name"
        })
    mt_name:string;
        

   
    @OneToMany(type=>category, category=>category.fkTypeMovem,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    categorys:category[];
    

   
    @OneToMany(type=>movement, movement=>movement.fkTypeMovem,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    movements:movement[];
    
}
