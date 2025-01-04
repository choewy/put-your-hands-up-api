package com.putyourhandsup.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import com.putyourhandsup.domain.QrCode;

import jakarta.persistence.LockModeType;

public interface QrCodeRepository extends JpaRepository<QrCode, Long> {
  @Lock(LockModeType.PESSIMISTIC_WRITE)
  public Optional<QrCode> findOneById(Long id);

  public Optional<QrCode> findOneByUrl(String url);
}
