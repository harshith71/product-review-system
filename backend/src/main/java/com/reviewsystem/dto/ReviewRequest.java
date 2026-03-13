package com.reviewsystem.dto;

import jakarta.validation.constraints.*;

public class ReviewRequest {

    @NotBlank(message = "Reviewer name is required")
    private String reviewerName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String reviewerEmail;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
    private String title;

    @NotBlank(message = "Review content is required")
    @Size(min = 10, max = 2000, message = "Content must be between 10 and 2000 characters")
    private String content;

    public ReviewRequest() {}

    public String getReviewerName()  { return reviewerName; }
    public String getReviewerEmail() { return reviewerEmail; }
    public Integer getRating()       { return rating; }
    public String getTitle()         { return title; }
    public String getContent()       { return content; }

    public void setReviewerName(String v)  { this.reviewerName = v; }
    public void setReviewerEmail(String v) { this.reviewerEmail = v; }
    public void setRating(Integer v)       { this.rating = v; }
    public void setTitle(String v)         { this.title = v; }
    public void setContent(String v)       { this.content = v; }
}
