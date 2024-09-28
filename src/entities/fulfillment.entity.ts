import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { FulfillmentDeliveryCompanySettingEntity } from './fulfillment-delivery-company-setting.entity';
import { LocationEntity } from './location.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'fulfillment', comment: '풀필먼트센터' })
export class FulfillmentEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '풀필먼트센터 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '풀필먼트센터 이름' })
  name: string;

  @OneToMany(() => FulfillmentDeliveryCompanySettingEntity, (e) => e.fulfillment, { cascade: true })
  @JoinTable()
  fulfillmentDeliveryCompanySettings: FulfillmentDeliveryCompanySettingEntity[];

  @OneToMany(() => UserEntity, (e) => e.fulfillment, { cascade: true })
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => LocationEntity, (e) => e.fulfillment, { cascade: true })
  @JoinTable()
  locations: LocationEntity[];

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
