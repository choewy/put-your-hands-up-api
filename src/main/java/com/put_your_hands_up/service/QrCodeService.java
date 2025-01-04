package com.put_your_hands_up.service;

import java.io.ByteArrayOutputStream;

import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.put_your_hands_up.dto.CreateQrCodeRequestDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QrCodeService {
  public byte[] createQrCode(CreateQrCodeRequestDTO body) throws Exception {
    try {
      BitMatrix bitMatrix = new MultiFormatWriter().encode(body.getUrl(), BarcodeFormat.QR_CODE, 200, 200);
      ByteArrayOutputStream byteArrayOutStream = new ByteArrayOutputStream();
      MatrixToImageWriter.writeToStream(bitMatrix, "PNG", byteArrayOutStream);

      return byteArrayOutStream.toByteArray();
    } catch (Exception e) {
      throw new Exception(e.getMessage());
    }
  }
}
