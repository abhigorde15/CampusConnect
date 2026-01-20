package com.campus_connect.CampusConnect_Backend.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.campus_connect.CampusConnect_Backend.config.JwtUtil;
import com.campus_connect.CampusConnect_Backend.models.MarketItem;
import com.campus_connect.CampusConnect_Backend.models.User;
import com.campus_connect.CampusConnect_Backend.repository.MarketItemRepository;
import com.campus_connect.CampusConnect_Backend.repository.UserRepository;
import com.campus_connect.CampusConnect_Backend.service.CloudinaryService;

import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:5173/")
public class MarketItemController {

    @Autowired
    private MarketItemRepository itemRepo;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CloudinaryService cloudinaryService;

    
    @PostMapping("item")
    public ResponseEntity<MarketItem> createItem(
            @RequestParam String title,
            @RequestParam String price,
            @RequestParam String condition_item,
            @RequestParam String category,
            @RequestParam String phone,
            @RequestParam String address,
            @RequestParam String availability,
            @RequestParam MultipartFile image,
            HttpServletRequest request
    ) throws IOException {
    	String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        User user = userRepo.findByEmail(email).orElseThrow();
        System.out.println("User.........."+user);
        String imageUrl =  "https://res.cloudinary.com/dguygzrkp/image/upload/v1751135815/notes/yxumfpbtkjmmflga2g3z.png" ;// cloudinaryService.uploadFile(image);

        MarketItem item = new MarketItem(
        	    title,
        	    price,
        	    condition_item,
        	    category,
        	    phone,
        	    address,
        	    availability,
        	    imageUrl,
        	    LocalDate.now(),         
        	    user                     
        	);

        return ResponseEntity.ok(itemRepo.save(item));
    }

   
    @GetMapping("public/market/items")
    public ResponseEntity<List<MarketItem>> getAllItems() {
        return ResponseEntity.ok(itemRepo.findAll());
    }

    @GetMapping("public/market/items/{userId}")
    public ResponseEntity<List<MarketItem>> getItemsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(itemRepo.findByUploadedById(userId));
    }

    
    @DeleteMapping("market/items/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable int id) {
        itemRepo.deleteById(id);
        return ResponseEntity.ok("Item deleted successfully");
    }
}
