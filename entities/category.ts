import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {movement_type} from "./movement_type";
import {movement} from "./movement";


@Entity("category",{schema:"finance" } )
@Index("fk_category_category1_idx",["fkIdCategory",])
@Index("FK_category_movement_type",["fkTypeMovem",])
export class category {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id_category"
        })
    id_category:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"ca_name"
        })
    ca_name:string;
        

    @Column("enum",{ 
        nullable:false,
        default: () => "'active'",
        enum:["active","inactive"],
        name:"ca_state"
        })
    ca_state:string;
        

   
    @ManyToOne(type=>category, category=>category.categorys,{ onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_id_category'})
    fkIdCategory:category | null;


   
    @ManyToOne(type=>movement_type, movement_type=>movement_type.categorys,{ onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_type_movem'})
    fkTypeMovem:movement_type | null;


   
    @OneToMany(type=>category, category=>category.fkIdCategory,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    categorys:category[];
    

   
    @OneToMany(type=>movement, movement=>movement.fkIdCategory,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    movements:movement[];
    
}
