package com.put_your_hands_up.dto;

import com.put_your_hands_up.validation.IsUrl;

import jakarta.validation.constraints.NotBlank;
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
public class CreateQrCodeRequestDTO {
  @NotBlank
  @IsUrl
  private String url;
}
