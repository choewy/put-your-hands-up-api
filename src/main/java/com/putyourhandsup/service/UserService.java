package com.putyourhandsup.service;

import org.springframework.stereotype.Service;

import com.putyourhandsup.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
  private final UserRepository userRepository;
}