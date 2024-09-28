import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tracking_number', comment: '송장번호' })
export class TrackingNumberEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '송장번호 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 20, comment: '송장번호' })
  trackingNumber: string;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
