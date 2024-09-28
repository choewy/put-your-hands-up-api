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

import { EcommerceChannelEntity } from './e-commerce-channel.entity';
import { PartnerGroupEntity } from './partner-group.entity';
import { ProductEntity } from './product.entity';
import { PurchaserEntity } from './purchaser.entity';
import { UserEntity } from './user.entity';

import { createForeignKeyConstraintName } from '@/constants';

@Entity({ name: 'partner', comment: '고객사' })
export class PartnerEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '고객사 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '고객사 이름' })
  name: string;

  @ManyToOne(() => PartnerGroupEntity, (e) => e.partners, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: createForeignKeyConstraintName('partner', 'partner_group', 'id') })
  partnerGroup: PartnerGroupEntity;

  @OneToMany(() => UserEntity, (e) => e.partner, { cascade: true })
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => ProductEntity, (e) => e.partner, { cascade: true })
  @JoinTable()
  products: ProductEntity[];

  @OneToMany(() => PurchaserEntity, (e) => e.partner, { cascade: true })
  @JoinTable()
  purchasers: PurchaserEntity[];

  @OneToMany(() => EcommerceChannelEntity, (e) => e.partner, { cascade: true })
  @JoinTable()
  ecommerceChannels: EcommerceChannelEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
