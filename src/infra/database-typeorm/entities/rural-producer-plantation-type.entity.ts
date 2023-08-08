import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RuralProducerEntity } from './rural-producer.entity';
import { PlantationTypeEntity } from './plantation-type.entity';

@Entity({ name: 'ta_rural_producer_plantation_type' })
export class RuralProducerPlantationTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => RuralProducerEntity,
    (ruralProducer) => ruralProducer.ruralProducerPlantationTypes,
  )
  @JoinColumn({ name: 'rural_producer_id' })
  ruralProducer: RuralProducerEntity;

  @Column({ name: 'rural_producer_id' })
  ruralProducerId: number;

  @ManyToOne(
    () => PlantationTypeEntity,
    (plantationType) => plantationType.ruralProducerPlantationTypes,
  )
  @JoinColumn({ name: 'plantation_type_id' })
  plantationType: PlantationTypeEntity;

  @Column({ name: 'plantation_type_id' })
  plantationTypeId: number;
}
