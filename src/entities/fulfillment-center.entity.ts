import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DeliveryCompanyEntity } from './delivery-company.entity';
import { LocationEntity } from './location.entity';
import { UserEntity } from './user.entity';

import { createForeignKeyConstraintName } from '@/constants';

@Entity({ name: 'fulfillment_center', comment: '풀필먼트센터' })
export class FulfillmentCenterEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '풀필먼트센터 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '풀필먼트센터 이름' })
  name: string;

  @ManyToOne(() => DeliveryCompanyEntity, (e) => e.fulfillmentCenters, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('fulfillment_center', 'delivery_company', 'id') })
  defaultDeliveryCompany: DeliveryCompanyEntity;

  @OneToMany(() => UserEntity, (e) => e.fulfillmentCenter, { cascade: true })
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => LocationEntity, (e) => e.fulfillmentCenter, { cascade: true })
  @JoinTable()
  locations: LocationEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
