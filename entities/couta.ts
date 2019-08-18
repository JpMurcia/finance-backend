import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {movement} from "./movement";


@Entity("couta",{schema:"finance" } )
@Index("fk_couta_movement1_idx",["movementIdmovement",])
export class couta {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idcouta"
        })
    idcouta:number;
        

    @Column("double",{ 
        nullable:false,
        name:"cou_value"
        })
    cou_value:number;
        

   
    @ManyToOne(type=>movement, movement=>movement.coutas,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'movement_idmovement'})
    movementIdmovement:movement | null;

}
