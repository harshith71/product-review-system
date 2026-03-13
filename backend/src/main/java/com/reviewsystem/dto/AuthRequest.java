package com.reviewsystem.dto;

import jakarta.validation.constraints.*;

public class AuthRequest {
    @NotBlank private String username;
    @NotBlank private String password;

    public AuthRequest() {}
    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public void setUsername(String v) { this.username = v; }
    public void setPassword(String v) { this.password = v; }
}
