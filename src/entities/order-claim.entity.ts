import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderProductEntity } from './order-product.entity';
import { OrderEntity } from './order.entity';

import { createForeignKeyConstraintName, OrderClaimType } from '@/constants';

@Entity({ name: 'order_claim', comment: '주문 클레임' })
export class OrderClaimEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '주문 클레임 PK' })
  readonly id: number;

  @Column({ type: 'tinyint', unsigned: true, comment: '클레임 종류' })
  type: OrderClaimType;

  @Column({ type: 'varchar', length: 50, comment: '클레임 사유' })
  reason: string;

  @Column({ type: 'varchar', length: 1024, comment: '클레임 상세 사유' })
  reasonDetail: string;

  @ManyToOne(() => OrderEntity, (e) => e.orderClaims, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('order_claim', 'order', 'id') })
  order: OrderEntity;

  @ManyToOne(() => OrderProductEntity, (e) => e.orderClaims, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('order_claim', 'order_product', 'id') })
  orderProduct: OrderProductEntity;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
