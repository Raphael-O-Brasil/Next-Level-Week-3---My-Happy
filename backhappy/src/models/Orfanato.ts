import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Image from './Image';
import images_View from '../views/images_View';

@Entity('orfanato')
export default class Orfanato{

@PrimaryGeneratedColumn('increment')
id: number;

@Column()
name: string;

@Column()
latitude: number;

@Column()
longitude: number;

@Column()
about: string;

@Column()
instrucao: string;

@Column()
funcionamento: string;

@Column()
finaldesemana: boolean;

@OneToMany(()=>Image, image=>image.orfanato,{
 cascade:['insert', 'update']   
})
@JoinColumn({name:'orfanato_id'})
images:Image[];
}