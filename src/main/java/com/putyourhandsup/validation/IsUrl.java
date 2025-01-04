package com.putyourhandsup.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UrlValidator.class)
public @interface IsUrl {
  String message() default "잘못된 URL 형식입니다.";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}