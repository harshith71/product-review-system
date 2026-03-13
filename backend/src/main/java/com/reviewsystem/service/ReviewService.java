package com.reviewsystem.service;

import com.reviewsystem.dto.*;
import com.reviewsystem.exception.BadRequestException;
import com.reviewsystem.exception.ResourceNotFoundException;
import com.reviewsystem.model.Product;
import com.reviewsystem.model.Review;
import com.reviewsystem.repository.ProductRepository;
import com.reviewsystem.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public ReviewService(ReviewRepository reviewRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
    }

    public List<ReviewDTO> getReviewsByProduct(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ReviewDTO getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));
        return toDTO(review);
    }

    public Map<String, Object> getRatingStats(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }
        Map<String, Object> stats = new LinkedHashMap<>();
        Double avg = reviewRepository.findAverageRatingByProductId(productId);
        Long total = reviewRepository.countByProductId(productId);
        stats.put("averageRating", avg != null ? Math.round(avg * 10.0) / 10.0 : 0.0);
        stats.put("totalReviews", total);
        Map<Integer, Long> distribution = new LinkedHashMap<>();
        for (int i = 5; i >= 1; i--) {
            distribution.put(i, reviewRepository.countByProductIdAndRating(productId, i));
        }
        stats.put("distribution", distribution);
        return stats;
    }

    @Transactional
    public ReviewDTO addReview(Long productId, ReviewRequest request) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        if (reviewRepository.existsByProductIdAndReviewerEmail(productId, request.getReviewerEmail())) {
            throw new BadRequestException("You have already reviewed this product.");
        }

        Review review = Review.builder()
                .product(product)
                .reviewerName(request.getReviewerName())
                .reviewerEmail(request.getReviewerEmail())
                .rating(request.getRating())
                .title(request.getTitle())
                .content(request.getContent())
                .build();
        return toDTO(reviewRepository.save(review));
    }

    @Transactional
    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new ResourceNotFoundException("Review not found with id: " + id);
        }
        reviewRepository.deleteById(id);
    }

    private ReviewDTO toDTO(Review review) {
        return ReviewDTO.builder()
                .id(review.getId())
                .productId(review.getProduct().getId())
                .productName(review.getProduct().getName())
                .reviewerName(review.getReviewerName())
                .reviewerEmail(review.getReviewerEmail())
                .rating(review.getRating())
                .title(review.getTitle())
                .content(review.getContent())
                .verified(review.getVerified())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
