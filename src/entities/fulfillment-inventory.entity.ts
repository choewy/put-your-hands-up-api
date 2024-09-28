import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { FulfillmentEntity } from './fulfillment.entity';
import { LocationEntity } from './location.entity';
import { ProductEntity } from './product.entity';

import { createForeignKeyConstraintName, InventoryStatus } from '@/constants';

@Entity({ name: 'fulfillment_inventory', comment: '풀필먼트 품목 재고' })
export class FulfillmentInventoryEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '풀필먼트 품목 재고 PK' })
  readonly id: number;

  @Column({ type: 'int', unsigned: true, comment: '수량' })
  count: number;

  @Column({ type: 'tinyint', unsigned: true, comment: '재고상태' })
  status: InventoryStatus;

  @ManyToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('fulfillment_inventory', 'product', 'id') })
  product: ProductEntity;

  @ManyToOne(() => FulfillmentEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('fulfillment_inventory', 'fulfillment', 'id') })
  fulfillment: FulfillmentEntity;

  @ManyToOne(() => LocationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('fulfillment_inventory', 'location', 'id') })
  location: LocationEntity;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
