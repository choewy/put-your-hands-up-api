package com.put_your_hands_up.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.put_your_hands_up.dto.CreateQrCodeRequestDTO;
import com.put_your_hands_up.service.QrCodeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("qr-code")
public class QrCodeController {
  private final QrCodeService qrCodeService;

  @PostMapping()
  public ResponseEntity<byte[]> createQrCode(@RequestBody @Valid CreateQrCodeRequestDTO body) throws Exception {
    return ResponseEntity.status(201)
        .contentType(MediaType.IMAGE_PNG)
        .body(qrCodeService.createQrCode(body));
  }
}
