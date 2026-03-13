package com.reviewsystem.dto;

import jakarta.validation.constraints.*;

public class ProductRequest {

    @NotBlank(message = "Product name is required")
    private String name;

    @Size(max = 1000, message = "Description must be at most 1000 characters")
    private String description;

    private String category;
    private String imageUrl;

    @DecimalMin(value = "0.0", message = "Price must be non-negative")
    private Double price;

    public ProductRequest() {}

    public String getName()        { return name; }
    public String getDescription() { return description; }
    public String getCategory()    { return category; }
    public String getImageUrl()    { return imageUrl; }
    public Double getPrice()       { return price; }

    public void setName(String v)        { this.name = v; }
    public void setDescription(String v) { this.description = v; }
    public void setCategory(String v)    { this.category = v; }
    public void setImageUrl(String v)    { this.imageUrl = v; }
    public void setPrice(Double v)       { this.price = v; }
}
