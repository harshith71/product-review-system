package com.reviewsystem.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private boolean enabled = true;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() { this.createdAt = LocalDateTime.now(); }

    public enum Role { ROLE_USER, ROLE_ADMIN }

    public User() {}

    public Long getId()               { return id; }
    public String getUsername()       { return username; }
    public String getEmail()          { return email; }
    public String getPassword()       { return password; }
    public Role getRole()             { return role; }
    public boolean isEnabled()        { return enabled; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setUsername(String v)  { this.username = v; }
    public void setEmail(String v)     { this.email = v; }
    public void setPassword(String v)  { this.password = v; }
    public void setRole(Role v)        { this.role = v; }
    public void setEnabled(boolean v)  { this.enabled = v; }
}
