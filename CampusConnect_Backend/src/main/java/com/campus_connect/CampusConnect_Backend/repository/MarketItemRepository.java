package com.campus_connect.CampusConnect_Backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.campus_connect.CampusConnect_Backend.models.MarketItem;

import java.util.List;

public interface MarketItemRepository extends JpaRepository<MarketItem, Integer> {
    List<MarketItem> findByUploadedById(Long userId);
}
