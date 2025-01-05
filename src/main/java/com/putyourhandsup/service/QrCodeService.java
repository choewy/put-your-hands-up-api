package com.putyourhandsup.service;

import java.io.ByteArrayOutputStream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.putyourhandsup.component.ApplicationProperties;
import com.putyourhandsup.domain.QrCode;
import com.putyourhandsup.domain.Restaurant;
import com.putyourhandsup.domain.RestaurantTable;
import com.putyourhandsup.dto.CreateQrCodeRequestDTO;
import com.putyourhandsup.persistence.ServiceException;
import com.putyourhandsup.repository.QrCodeRepository;
import com.putyourhandsup.repository.RestaurantTableRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class QrCodeService {
  private final ApplicationProperties applicationProperties;
  private final RestaurantTableRepository restaurantTableRepository;
  private final QrCodeRepository qrCodeRepository;

  public String scanQrCode(Long id) throws ServiceException {
    int updateResult = qrCodeRepository.incrementScanCountById(id);

    if (updateResult == 0) {
      throw new ServiceException("NotFound");
    }

    QrCode qrCode = qrCodeRepository.findByIdAndDeletedAtIsNull(id)
        .orElseThrow(() -> new ServiceException("NotFound"));

    String clientUrl = applicationProperties.getClientUrl();
    return clientUrl += ("/restaurant/"
        + qrCode.getRestaurant().getId().toString() + "/orders?tableId="
        + qrCode.getRestaurantTable().getId().toString());
  }

  private String createQrCodeContents(QrCode qrCode) {
    String serverUrl = applicationProperties.getServerUrl();
    return serverUrl += ("/qr_codes?id=" + qrCode.getId().toString());
  }

  public byte[] createQrCode(CreateQrCodeRequestDTO body)
      throws ServiceException {
    Long exampleRestaurantId = 1L;

    QrCode qrCode = qrCodeRepository
        .findByRestaurantIdAndRestaurantTableIdAndDeletedAtIsNull(exampleRestaurantId, body.getTableId())
        .orElse(QrCode.builder()
            .restaurant(Restaurant.builder().id(exampleRestaurantId).build())
            .restaurantTable(RestaurantTable.builder().id(body.getTableId()).build())
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
