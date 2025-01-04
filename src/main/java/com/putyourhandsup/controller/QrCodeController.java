package com.putyourhandsup.controller;

import org.apache.commons.lang3.ObjectUtils.Null;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.putyourhandsup.dto.CreateQrCodeRequestDTO;
import com.putyourhandsup.service.QrCodeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "QR 코드")
@RequiredArgsConstructor
@RestController
@RequestMapping("qr-code")
public class QrCodeController {
  private final QrCodeService qrCodeService;

  @GetMapping()
  @Operation(summary = "QR 코드 스캔 시 Redirect")
  public ResponseEntity<Null> scanQrCode(@RequestParam @NotNull @Positive Long id) throws Exception {
    return ResponseEntity
        .status(HttpStatus.FOUND)
        .header("Location", qrCodeService.scanQrCode(id))
        .build();
  }

  @PostMapping()
  @Operation(summary = "QR 코드 생성")
  public ResponseEntity<byte[]> createQrCode(@RequestBody @Valid CreateQrCodeRequestDTO body) throws Exception {
    return ResponseEntity
        .status(HttpStatus.CREATED)
        .contentType(MediaType.IMAGE_PNG)
        .body(qrCodeService.createQrCode(body));
  }
}
