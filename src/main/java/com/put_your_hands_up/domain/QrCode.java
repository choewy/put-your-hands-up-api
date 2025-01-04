package com.put_your_hands_up.domain;

import java.sql.Timestamp;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

  @Column(name = "url", columnDefinition = "VARCHAR(2048)")
  @Comment(value = "URL")
  private String url;

  @Column(name = "scan_count", columnDefinition = "BIGINT UNSIGNED")
  @ColumnDefault(value = "0")
  @Comment(value = "스캔 횟수")
  private Long scanCount;

  @Column(name = "created_at", columnDefinition = "TIMESTAMP")
  @ColumnDefault(value = "CURRENT_TIMESTAMP")
  @Comment(value = "생성일시")
  private Timestamp createdAt;

  @Column(name = "updated_at", columnDefinition = "TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
  @ColumnDefault(value = "CURRENT_TIMESTAMP")
  @Comment(value = "수정일시")
  private Timestamp updatedAt;
}
