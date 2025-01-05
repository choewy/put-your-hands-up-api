package com.putyourhandsup.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.putyourhandsup.domain.QrCode;

public interface QrCodeRepository extends JpaRepository<QrCode, Long> {
  @Modifying
  @Query(value = "UPDATE qr_code SET scan_count = scan_count + 1 WHERE id = :id AND deleted_at IS NULL", nativeQuery = true)
  public int incrementScanCountById(@Param("id") Long id);

  public Optional<QrCode> findByIdAndDeletedAtIsNull(Long id);

  public Optional<QrCode> findByRestaurantIdAndRestaurantTableIdAndDeletedAtIsNull(
      Long restaurantId,
      Long restaurantTableId);
}
