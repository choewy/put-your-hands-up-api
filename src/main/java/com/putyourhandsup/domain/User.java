package com.putyourhandsup.domain;

import java.sql.Timestamp;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Comment(value = "사용자")
@Entity(name = "user")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", columnDefinition = "BIGINT UNSIGNED")
  @Comment(value = "사용자 PK")
  private Long id;

  @Column(name = "email", columnDefinition = "VARCHAR(340)", nullable = false, unique = true)
  @Comment(value = "이메일")
  private String email;

  @Column(name = "password", columnDefinition = "VARCHAR(255)", nullable = false)
  @Comment(value = "비밀번호")
  private String password;

  @Column(name = "name", columnDefinition = "VARCHAR(50)", nullable = false)
  @Comment(value = "이름")
  private String name;

  @Column(name = "created_at", columnDefinition = "TIMESTAMP", nullable = false)
  @ColumnDefault(value = "CURRENT_TIMESTAMP")
  @Comment(value = "생성일시")
  private Timestamp createdAt;

  @Column(name = "updated_at", columnDefinition = "TIMESTAMP ON UPDATE CURRENT_TIMESTAMP", nullable = false)
  @ColumnDefault(value = "CURRENT_TIMESTAMP")
  @Comment(value = "수정일시")
  private Timestamp updatedAt;

  @Column(name = "deleted_at", columnDefinition = "TIMESTAMP", nullable = true)
  @ColumnDefault(value = "NULL")
  @Comment(value = "삭제일시")
  private Timestamp deletedAt;

  @ManyToOne
  @JoinColumn(name = "restaurant_id", nullable = true)
  private Restaurant restaurant;

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
