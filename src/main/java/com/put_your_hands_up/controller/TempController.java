package com.put_your_hands_up.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.put_your_hands_up.domain.Temp;
import com.put_your_hands_up.service.TempService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@RestController
@RequestMapping("temp")
public class TempController {
  private final TempService tempService;

  @GetMapping()
  public List<Temp> getTemps() {
    return this.tempService.getTemps();
  }
}
