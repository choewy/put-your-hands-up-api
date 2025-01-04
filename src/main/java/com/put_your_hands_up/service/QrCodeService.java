package com.put_your_hands_up.service;

import java.io.ByteArrayOutputStream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.put_your_hands_up.component.ApplicationProperties;
import com.put_your_hands_up.domain.QrCode;
import com.put_your_hands_up.dto.CreateQrCodeRequestDTO;
import com.put_your_hands_up.persistence.ServiceException;
import com.put_your_hands_up.repository.QrCodeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class QrCodeService {
  private final ApplicationProperties applicationProperties;
  private final QrCodeRepository qrCodeRepository;

  public String scanQrCode(Long id) throws ServiceException {
    QrCode qrCode = qrCodeRepository.findOneById(id)
        .orElseThrow(() -> new ServiceException("NotFound"));

    qrCode.setScanCount(qrCode.getScanCount() + 1);
    qrCodeRepository.save(qrCode);

    return qrCode.getUrl();
  }

  private String createQrCodeContents(QrCode qrCode) {
    String applicationDomain = applicationProperties.getDomain();
    return applicationDomain += ("/qr_codes?id=" + qrCode.getId().toString());
  }

  public byte[] createQrCode(CreateQrCodeRequestDTO body)
      throws ServiceException {
    QrCode qrCode = qrCodeRepository.findOneByUrl(body.getUrl())
        .orElse(QrCode.builder()
            .url(body.getUrl())
            .scanCount(0L)
            .build());

    if (qrCode.getId() == null) {
      qrCode = qrCodeRepository.save(qrCode);
    }

    try {
      String qrCodeContents = createQrCodeContents(qrCode);
      BitMatrix bitMatrix = new MultiFormatWriter().encode(qrCodeContents, BarcodeFormat.QR_CODE, 200, 200);
      ByteArrayOutputStream byteArrayOutStream = new ByteArrayOutputStream();
      MatrixToImageWriter.writeToStream(bitMatrix, "PNG", byteArrayOutStream);

      return byteArrayOutStream.toByteArray();
    } catch (Exception e) {
      throw new RuntimeException(e.getMessage());
    }
  }
}
