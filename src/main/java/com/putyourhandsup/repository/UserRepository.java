package com.putyourhandsup.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.putyourhandsup.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
