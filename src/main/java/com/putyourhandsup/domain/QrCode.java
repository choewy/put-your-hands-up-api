package com.putyourhandsup.domain;

import java.sql.Timestamp;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Builder
@Getter
@Setter
@AllArgsConstructor
@Comment(value = "QR Code")
@Entity(name = "qr_code")
public class QrCode {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", columnDefinition = "BIGINT UNSIGNED")
  @Comment(value = "QR Code PK")
  private Long id;

  @Column(name = "url", columnDefinition = "VARCHAR(1024)", nullable = false)
  @Comment(value = "URL")
  private String url;

  @Column(name = "scan_count", columnDefinition = "BIGINT UNSIGNED", nullable = false)
  @ColumnDefault(value = "0")
  @Comment(value = "스캔 횟수")
  private Long scanCount;

  @Column(name = "created_at", columnDefinition = "TIMESTAMP", nullable = false)
  @ColumnDefault(value = "CURRENT_TIMESTAMP")
  @Comment(value = "생성일시")
  private Timestamp createdAt;

  @Column(name = "updated_at", columnDefinition = "TIMESTAMP ON UPDATE CURRENT_TIMESTAMP", nullable = false)
  @ColumnDefault(value = "CURRENT_TIMESTAMP")
  @Comment(value = "수정일시")
  private Timestamp updatedAt;

  @Column(name = "deleted_at", columnDefinition = "TIMESTAMP")
  @ColumnDefault(value = "NULL")
  @Comment(value = "삭제일시")
  private Timestamp deletedAt;

  @PrePersist
  public void prePersist() {
    Timestamp timestamp = new Timestamp(System.currentTimeMillis());

    if (this.createdAt == null) {
      this.createdAt = timestamp;
    }
    if (this.updatedAt == null) {
      this.updatedAt = timestamp;
    }
  }
}
