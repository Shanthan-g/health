package com.example.demo.response;

import java.util.List;
public class UserInfoResponse {

	private Long id;
	private String userName;
	private String email;
	private List<String> roles;

	public UserInfoResponse(Long id, String userName, String email, List<String> roles) {
		this.id = id;
		this.userName = userName;
		this.email = email;
		this.roles = roles;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return userName;
	}

	public void setUsername(String userName) {
		this.userName = userName;
	}

	public List<String> getRoles() {
		return roles;
	}
}