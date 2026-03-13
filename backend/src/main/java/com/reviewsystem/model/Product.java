package com.reviewsystem.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    private String category;
    private String imageUrl;
    private Double price;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews;

    @PrePersist
    public void prePersist() { this.createdAt = LocalDateTime.now(); }

    public Product() {}

    private Product(Builder b) {
        this.name = b.name; this.description = b.description;
        this.category = b.category; this.imageUrl = b.imageUrl;
        this.price = b.price;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String name, description, category, imageUrl;
        private Double price;
        public Builder name(String v)        { this.name = v; return this; }
        public Builder description(String v) { this.description = v; return this; }
        public Builder category(String v)    { this.category = v; return this; }
        public Builder imageUrl(String v)    { this.imageUrl = v; return this; }
        public Builder price(Double v)       { this.price = v; return this; }
        public Product build()               { return new Product(this); }
    }

    public Long getId()               { return id; }
    public String getName()           { return name; }
    public String getDescription()    { return description; }
    public String getCategory()       { return category; }
    public String getImageUrl()       { return imageUrl; }
    public Double getPrice()          { return price; }
    public LocalDateTime getCreatedAt(){ return createdAt; }
    public List<Review> getReviews()  { return reviews; }

    public void setName(String v)        { this.name = v; }
    public void setDescription(String v) { this.description = v; }
    public void setCategory(String v)    { this.category = v; }
    public void setImageUrl(String v)    { this.imageUrl = v; }
    public void setPrice(Double v)       { this.price = v; }
}
