import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {movement} from "./movement";


@Entity("category",{schema:"finance" } )
@Index("fk_category_category1_idx",["categoryIdcategory",])
export class category {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idcategory"
        })
    idcategory:number;
        

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
        

   
    @ManyToOne(type=>category, category=>category.categorys,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'category_idcategory'})
    categoryIdcategory:category | null;


   
    @OneToMany(type=>category, category=>category.categoryIdcategory,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    categorys:category[];
    

   
    @OneToMany(type=>movement, movement=>movement.categoryIdcategory,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    movements:movement[];
    
}
