package com.example.demo.response;

import java.util.List;

public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private Long id;
  private String username;
  private Long hospitalId;
private String email;
  private List<String> roles;

  public JwtResponse(String accessToken, Long id, String username, Long hospitalId, String email, List<String> roles) {
    this.token = accessToken;
    this.id = id;
    this.username = username;
    this.hospitalId = hospitalId;
    this.email = email;
    this.roles = roles;
  }

  public String getAccessToken() {
    return token;
  }

  public void setAccessToken(String accessToken) {
    this.token = accessToken;
  }

  public String getTokenType() {
    return type;
  }

  public void setTokenType(String tokenType) {
    this.type = tokenType;
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
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }
  
  public Long getHospitalId() {
	return hospitalId;
}

public void setHospitalId(Long hospitalId) {
	this.hospitalId = hospitalId;
}


  public List<String> getRoles() {
    return roles;
  }
}