import { PlantationTypeModelDomain } from '@/domain/models/plantation-type-model.domain';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RuralProducerPlantationTypeEntity } from './rural-producer-plantation-type.entity';

@Entity({ name: 'td_plantation_type' })
export class PlantationTypeEntity implements PlantationTypeModelDomain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(
    () => RuralProducerPlantationTypeEntity,
    (relation) => relation.plantationType,
  )
  ruralProducerPlantationTypes: RuralProducerPlantationTypeEntity[];
}
