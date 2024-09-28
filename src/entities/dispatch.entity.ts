import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { DeliveryCompanyEntity } from './delivery-company.entity';
import { FulfillmentEntity } from './fulfillment.entity';

import { createForeignKeyConstraintName } from '@/constants';

@Entity({ name: 'dispatch', comment: '출고' })
export class DispatchEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '출고 PK' })
  readonly id: number;

  @ManyToOne(() => DeliveryCompanyEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('dispatch', 'fulfillment', 'id') })
  fulfillment: FulfillmentEntity | null;

  @ManyToOne(() => DeliveryCompanyEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('dispatch', 'delivery_company', 'id') })
  deliveryCompany: DeliveryCompanyEntity | null;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
