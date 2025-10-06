package com.rasmus.helmes.repository;

import com.rasmus.helmes.model.UserData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDataRepository extends JpaRepository<UserData, Long> {
}