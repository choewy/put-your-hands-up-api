import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FulfillmentEntity } from './fulfillment.entity';
import { PartnerEntity } from './partner.entity';
import { UserEntity } from './user.entity';

import { createForeignKeyConstraintName } from '@/constants';

@Entity({ name: 'lock', comment: '중복실행 방지' })
export class LockEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('lock', 'user', 'id') })
  user: UserEntity | null;

  @ManyToOne(() => PartnerEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('lock', 'partner', 'id') })
  partner: PartnerEntity | null;

  @ManyToOne(() => FulfillmentEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('lock', 'fulfillmenet', 'id') })
  fulfillment: FulfillmentEntity | null;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date;
}
