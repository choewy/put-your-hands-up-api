package com.put_your_hands_up.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.put_your_hands_up.domain.Temp;
import com.put_your_hands_up.repository.TempRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TempService {
  private final TempRepository tempRepository;

  public List<Temp> getTemps() {
    return this.tempRepository.findAll();
  }
}
