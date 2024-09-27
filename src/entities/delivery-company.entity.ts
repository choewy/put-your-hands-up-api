import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { FulfillmentCenterEntity } from './fulfillment-center.entity';

@Entity({ name: 'delivery_company', comment: '택배사' })
export class DeliveryCompanyEntity {
  @PrimaryColumn({ type: 'int', unsigned: true, comment: '택배사 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '택배사 이름' })
  name: string;

  @Column({ type: 'boolean', default: false, comment: '기본설정여부' })
  isDefault: boolean;

  @OneToMany(() => FulfillmentCenterEntity, (e) => e.defaultDeliveryCompany, { cascade: ['remove', 'soft-remove'] })
  @JoinTable()
  fulfillmentCenters: FulfillmentCenterEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
