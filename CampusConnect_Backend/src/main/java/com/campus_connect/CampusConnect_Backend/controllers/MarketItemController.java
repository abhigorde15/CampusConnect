//package com.campus_connect.CampusConnect_Backend.controllers;
//
//import com.campus_connect.CampusConnect_Backend.models.MarketItem;
//import com.campus_connect.CampusConnect_Backend.repository.MarketItemRepository;
//import com.campus_connect.CampusConnect_Backend.service.CloudinaryService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api")
//@CrossOrigin(origins = "*")
//public class MarketItemController {
//
//    @Autowired
//    private MarketItemRepository marketRepository;
//
//    @Autowired
//    private CloudinaryService cloudinaryService;
//
//    // Get all items
//    @GetMapping("/auth/items")
//    public ResponseEntity<?> getAllMarketItems() {
//        List<MarketItem> allMarketItems = marketRepository.findAll();
//        return ResponseEntity.ok(allMarketItems);
//    }
//
//    // Create item
//    @PostMapping("/item")
//    public ResponseEntity<?> createMarketItem(
//            @RequestParam("title") String title,
//            @RequestParam("price") double price,
//            @RequestParam("condition") String condition,
//            @RequestParam("category") String category,
//            @RequestParam("phone") String phone,
//            @RequestParam("availability") String availability,
//            @RequestParam("address") String address,
//            @RequestParam("image") MultipartFile file
//    ) {
//        try {
//            String imageUrl = cloudinaryService.uploadFile(file);
//
//            MarketItem item = new MarketItem();
//            item.setTitle(title);
//            item.setPrice(price);
//            item.setCondition(condition);
//            item.setCategory(category);
//            item.setPhone(phone);
//            item.setAvailability(availability);
//            item.setAddress(address);
//            item.setImageUrl(imageUrl);
//
//           
//            MarketItem savedItem = marketRepository.save(item);
//            return ResponseEntity.ok(savedItem);
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create item: " + e.getMessage());
//        }
//    }
//
//  
//    @DeleteMapping("/market/{id}")
//    public ResponseEntity<?> deleteMarketItem(@PathVariable Long id) {
//        Optional<MarketItem> optionalItem = marketRepository.findById(id);
//        if (optionalItem.isPresent()) {
//            marketRepository.deleteById(id);
//            return ResponseEntity.ok("Item deleted successfully.");
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found.");
//        }
//    }
//}
