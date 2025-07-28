package com.campus_connect.CampusConnect_Backend.models;

import jakarta.persistence.*;


import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class MarketItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String price;
    @Column(name="condition_item")
    private String condition;
    private String category;
    private String phone;
    private String address;
    private String availability;
    private String imageUrl;

    private LocalDate date = LocalDate.now();
    public MarketItem() {}
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User uploadedBy;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAvailability() {
		return availability;
	}

	public void setAvailability(String availability) {
		this.availability = availability;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public User getUploadedBy() {
		return uploadedBy;
	}

	public void setUploadedBy(User uploadedBy) {
		this.uploadedBy = uploadedBy;
	}

	public MarketItem(String title, String price, String condition, String category, String phone,
			String address, String availability, String imageUrl, LocalDate date, User uploadedBy) {
		super();
		this.title = title;
		this.price = price;
		this.condition = condition;
		this.category = category;
		this.phone = phone;
		this.address = address;
		this.availability = availability;
		this.imageUrl = imageUrl;
		this.date = date;
		this.uploadedBy = uploadedBy;
	}
    
}
