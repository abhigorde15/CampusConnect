//package com.campus_connect.CampusConnect_Backend.models;
//
//import java.time.LocalDateTime;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//
//@Entity
//@Table(name ="market_item")
//public class MarketItem {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//
//    private String title;
//    private double price;
//    private String condition;
//    private String category;
//    private String imageUrl;
//    private String phone;
//    private String address;
//    private String availability;
//    private LocalDateTime datePosted = LocalDateTime.now();
//
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//    public MarketItem() {}
//	public MarketItem(Integer id, String title, double price, String condition, String category, String imageUrl,
//			String phone, String address, String availability, LocalDateTime datePosted, User user) {
//		super();
//		this.id = id;
//		this.title = title;
//		this.price = price;
//		this.condition = condition;
//		this.category = category;
//		this.imageUrl = imageUrl;
//		this.phone = phone;
//		this.address = address;
//		this.availability = availability;
//		this.datePosted = datePosted;
//		this.user = user;
//	}
//
//	public Integer getId() {
//		return id;
//	}
//
//	public void setId(Integer id) {
//		this.id = id;
//	}
//
//	public String getTitle() {
//		return title;
//	}
//
//	public void setTitle(String title) {
//		this.title = title;
//	}
//
//	public double getPrice() {
//		return price;
//	}
//
//	public void setPrice(double price) {
//		this.price = price;
//	}
//
//	public String getCondition() {
//		return condition;
//	}
//
//	public void setCondition(String condition) {
//		this.condition = condition;
//	}
//
//	public String getCategory() {
//		return category;
//	}
//
//	public void setCategory(String category) {
//		this.category = category;
//	}
//
//	public String getImageUrl() {
//		return imageUrl;
//	}
//
//	public void setImageUrl(String imageUrl) {
//		this.imageUrl = imageUrl;
//	}
//
//	public String getPhone() {
//		return phone;
//	}
//
//	public void setPhone(String phone) {
//		this.phone = phone;
//	}
//
//	public String getAddress() {
//		return address;
//	}
//
//	public void setAddress(String address) {
//		this.address = address;
//	}
//
//	public String getAvailability() {
//		return availability;
//	}
//
//	public void setAvailability(String availability) {
//		this.availability = availability;
//	}
//
//	public LocalDateTime getDatePosted() {
//		return datePosted;
//	}
//
//	public void setDatePosted(LocalDateTime datePosted) {
//		this.datePosted = datePosted;
//	}
//
//	public User getUser() {
//		return user;
//	}
//
//	public void setUser(User user) {
//		this.user = user;
//	}
//    
//}
