package com.campus_connect.CampusConnect_Backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {
	public User() {}
    public User(int id, String username, String password, String role,String email) {
		super();
		this.id = id;
		this.name = username;
		this.password = password;
		this.role = role;
		
		this.email = email;
	}
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
  
    @Column( nullable = false)
    private String name;
    @Column(unique = true, nullable = false)
    private String email;
    private String year;
    private boolean isVerified = false;
    private String branch;
   
    private String verificationCode;
    
    public String getVerificationCode() {
		return verificationCode;
	}
	public void setVerificationCode(String verificationCode) {
		this.verificationCode = verificationCode;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
    public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}

	@Column(nullable = false)
    private String password;
    
    private String role ="USER";

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String username) {
		this.name = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", year=" + year + ", branch=" + branch
				+ ", password=" + password + ", role=" + role + "]";
	}
	public boolean isVerified() {
		return isVerified;
	}
	public void setVerified(boolean isVerified) {
		this.isVerified = isVerified;
	}
    
    
}
