import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'delivery_company', comment: '택배사' })
export class DeliveryCompanyEntity {
  @PrimaryColumn({ type: 'int', unsigned: true, comment: '택배사 PK' })
  readonly id: number;

  @Column({ type: 'varchar', length: 50, comment: '택배사 이름' })
  name: string;

  @CreateDateColumn({ type: 'timestamp', comment: '생성일시' })
  readonly createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', comment: '수정일시' })
  readonly updatedAt: Date;

  @CreateDateColumn({ type: 'timestamp', comment: '삭제일시' })
  readonly deletedAt: Date | null;
}
