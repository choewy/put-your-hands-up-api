package com.putyourhandsup.domain;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Comment(value = "식당")
@Entity(name = "restaurant")
public class Restaurant {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", columnDefinition = "BIGINT UNSIGNED")
  @Comment(value = "식당 PK")
  private Long id;

  @Column(name = "name", columnDefinition = "VARCHAR(50)")
  @Comment(value = "식당명")
  private String name;

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

  @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
  private List<User> users;

  @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
  private List<RestaurantTable> restaurantTables;

  @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
  private List<QrCode> qrCodes;

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
