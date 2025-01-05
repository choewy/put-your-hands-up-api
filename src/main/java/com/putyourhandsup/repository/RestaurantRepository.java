package com.putyourhandsup.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.putyourhandsup.domain.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

}
