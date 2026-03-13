package com.reviewsystem.dto;

import java.time.LocalDateTime;

public class ProductDTO {
    private Long id;
    private String name, description, category, imageUrl;
    private Double price, averageRating;
    private Long totalReviews;
    private LocalDateTime createdAt;

    public ProductDTO() {}

    private ProductDTO(Builder b) {
        this.id = b.id; this.name = b.name; this.description = b.description;
        this.category = b.category; this.imageUrl = b.imageUrl; this.price = b.price;
        this.averageRating = b.averageRating; this.totalReviews = b.totalReviews;
        this.createdAt = b.createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id, totalReviews;
        private String name, description, category, imageUrl;
        private Double price, averageRating;
        private LocalDateTime createdAt;
        public Builder id(Long v)              { this.id = v; return this; }
        public Builder name(String v)          { this.name = v; return this; }
        public Builder description(String v)   { this.description = v; return this; }
        public Builder category(String v)      { this.category = v; return this; }
        public Builder imageUrl(String v)      { this.imageUrl = v; return this; }
        public Builder price(Double v)         { this.price = v; return this; }
        public Builder averageRating(Double v) { this.averageRating = v; return this; }
        public Builder totalReviews(Long v)    { this.totalReviews = v; return this; }
        public Builder createdAt(LocalDateTime v) { this.createdAt = v; return this; }
        public ProductDTO build()              { return new ProductDTO(this); }
    }

    public Long getId()              { return id; }
    public String getName()          { return name; }
    public String getDescription()   { return description; }
    public String getCategory()      { return category; }
    public String getImageUrl()      { return imageUrl; }
    public Double getPrice()         { return price; }
    public Double getAverageRating() { return averageRating; }
    public Long getTotalReviews()    { return totalReviews; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
