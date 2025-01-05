package com.putyourhandsup.service;

import org.springframework.stereotype.Service;

import com.putyourhandsup.repository.RestaurantRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RestaurantService {
  private final RestaurantRepository restaurantRepository;
}
