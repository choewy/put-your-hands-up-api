package com.putyourhandsup.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class UrlValidator implements ConstraintValidator<IsUrl, String> {

  private static final String URL_REGEX = "^(https?)://[^\s/$.?#].[^\s]*(:\\d+)?(/.*)?$";
  private static final Pattern URL_PATTERN = Pattern.compile(URL_REGEX);

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value == null || value.isBlank()) {
      return true;
    }

    return URL_PATTERN.matcher(value).matches();
  }
}