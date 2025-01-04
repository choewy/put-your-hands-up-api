package com.put_your_hands_up.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.put_your_hands_up.domain.Temp;

public interface TempRepository extends JpaRepository<Temp, Long> {

}
