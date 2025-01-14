package com.putyourhandsup.persistence;

public class ServiceException extends RuntimeException {
  private String message;

  public ServiceException(String message) {
    this.message = message;
  }

  public String getMessage() {
    return this.message;
  }
}
