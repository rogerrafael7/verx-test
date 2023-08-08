import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RuralProducerPlantationTypeEntity } from './rural-producer-plantation-type.entity';

@Entity({ name: 'tb_rural_producer' })
export class RuralProducerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column()
  name: string;

  @Column({ unique: true, name: 'tax_id' })
  taxId: string;

  @Column({ name: 'farm_name' })
  farmName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ name: 'total_area_ha' })
  totalAreaHa: number;

  @Column({ name: 'arable_area_ha' })
  arableAreaHa: number;

  @Column({ name: 'vegetation_area_ha' })
  vegetationAreaHa: number;

  @OneToMany(
    () => RuralProducerPlantationTypeEntity,
    (relation) => relation.ruralProducer,
  )
  ruralProducerPlantationTypes: RuralProducerPlantationTypeEntity[];
}
