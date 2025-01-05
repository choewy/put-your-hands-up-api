package com.putyourhandsup.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.putyourhandsup.domain.RestaurantTable;

public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {

}
