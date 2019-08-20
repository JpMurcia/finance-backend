import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {movement} from "./movement";


@Entity("couta",{schema:"finance" } )
@Index("fk_couta_movement1_idx",["fkIdMovement",])
export class couta {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id_couta"
        })
    id_couta:number;
        

    @Column("double",{ 
        nullable:false,
        name:"cou_value"
        })
    cou_value:number;
        

   
    @ManyToOne(type=>movement, movement=>movement.coutas,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'fk_id_movement'})
    fkIdMovement:movement | null;


    @Column("date",{ 
        nullable:false,
        name:"date_couta"
        })
    date_couta:string;
        
}
