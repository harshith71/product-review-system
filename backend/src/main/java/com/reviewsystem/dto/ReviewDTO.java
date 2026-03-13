package com.reviewsystem.dto;

import java.time.LocalDateTime;

public class ReviewDTO {
    private Long id, productId;
    private String productName, reviewerName, reviewerEmail, title, content;
    private Integer rating;
    private Boolean verified;
    private LocalDateTime createdAt;

    public ReviewDTO() {}

    private ReviewDTO(Builder b) {
        this.id = b.id; this.productId = b.productId; this.productName = b.productName;
        this.reviewerName = b.reviewerName; this.reviewerEmail = b.reviewerEmail;
        this.rating = b.rating; this.title = b.title; this.content = b.content;
        this.verified = b.verified; this.createdAt = b.createdAt;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id, productId;
        private String productName, reviewerName, reviewerEmail, title, content;
        private Integer rating;
        private Boolean verified;
        private LocalDateTime createdAt;
        public Builder id(Long v)              { this.id = v; return this; }
        public Builder productId(Long v)       { this.productId = v; return this; }
        public Builder productName(String v)   { this.productName = v; return this; }
        public Builder reviewerName(String v)  { this.reviewerName = v; return this; }
        public Builder reviewerEmail(String v) { this.reviewerEmail = v; return this; }
        public Builder rating(Integer v)       { this.rating = v; return this; }
        public Builder title(String v)         { this.title = v; return this; }
        public Builder content(String v)       { this.content = v; return this; }
        public Builder verified(Boolean v)     { this.verified = v; return this; }
        public Builder createdAt(LocalDateTime v) { this.createdAt = v; return this; }
        public ReviewDTO build()               { return new ReviewDTO(this); }
    }

    public Long getId()              { return id; }
    public Long getProductId()       { return productId; }
    public String getProductName()   { return productName; }
    public String getReviewerName()  { return reviewerName; }
    public String getReviewerEmail() { return reviewerEmail; }
    public Integer getRating()       { return rating; }
    public String getTitle()         { return title; }
    public String getContent()       { return content; }
    public Boolean getVerified()     { return verified; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
