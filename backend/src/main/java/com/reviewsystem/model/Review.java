package com.reviewsystem.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private String reviewerName;

    @Column(nullable = false)
    private String reviewerEmail;

    @Column(nullable = false)
    private Integer rating;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000, nullable = false)
    private String content;

    private Boolean verified;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        if (this.verified == null) this.verified = false;
    }

    public Review() {}

    private Review(Builder b) {
        this.product = b.product; this.reviewerName = b.reviewerName;
        this.reviewerEmail = b.reviewerEmail; this.rating = b.rating;
        this.title = b.title; this.content = b.content; this.verified = b.verified;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Product product;
        private String reviewerName, reviewerEmail, title, content;
        private Integer rating;
        private Boolean verified;
        public Builder product(Product v)       { this.product = v; return this; }
        public Builder reviewerName(String v)   { this.reviewerName = v; return this; }
        public Builder reviewerEmail(String v)  { this.reviewerEmail = v; return this; }
        public Builder rating(Integer v)        { this.rating = v; return this; }
        public Builder title(String v)          { this.title = v; return this; }
        public Builder content(String v)        { this.content = v; return this; }
        public Builder verified(Boolean v)      { this.verified = v; return this; }
        public Review build()                   { return new Review(this); }
    }

    public Long getId()              { return id; }
    public Product getProduct()      { return product; }
    public String getReviewerName()  { return reviewerName; }
    public String getReviewerEmail() { return reviewerEmail; }
    public Integer getRating()       { return rating; }
    public String getTitle()         { return title; }
    public String getContent()       { return content; }
    public Boolean getVerified()     { return verified; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
