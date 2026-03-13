package com.reviewsystem.config;

import com.reviewsystem.model.*;
import com.reviewsystem.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(ProductRepository productRepository, ReviewRepository reviewRepository,
                      UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Seed admin user
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@reviewhub.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(User.Role.ROLE_ADMIN);
            userRepository.save(admin);
            System.out.println("✓ Admin created  →  username: admin  |  password: admin123");
        }

        // Seed demo user
        if (!userRepository.existsByUsername("user1")) {
            User user = new User();
            user.setUsername("user1");
            user.setEmail("user1@reviewhub.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setRole(User.Role.ROLE_USER);
            userRepository.save(user);
            System.out.println("✓ Demo user created  →  username: user1  |  password: user123");
        }

        if (productRepository.count() > 0) return;

        Product p1 = productRepository.save(Product.builder()
                .name("Sony WH-1000XM5 Headphones")
                .description("Industry-leading noise canceling headphones with exceptional sound quality and 30-hour battery life.")
                .category("Electronics").price(349.99)
                .imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400").build());

        Product p2 = productRepository.save(Product.builder()
                .name("Apple MacBook Pro 14\"")
                .description("Supercharged by M3 Pro chip. Immersive Liquid Retina XDR display. All-day battery life.")
                .category("Electronics").price(1999.99)
                .imageUrl("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400").build());

        Product p3 = productRepository.save(Product.builder()
                .name("Ergonomic Office Chair")
                .description("Premium lumbar support, breathable mesh, adjustable armrests.")
                .category("Furniture").price(499.99)
                .imageUrl("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400").build());

        Product p4 = productRepository.save(Product.builder()
                .name("Nike Air Max 270")
                .description("Lifestyle shoe featuring Max Air unit for all-day comfort.")
                .category("Footwear").price(150.00)
                .imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400").build());

        reviewRepository.save(Review.builder().product(p1).reviewerName("Alex M.").reviewerEmail("alex@mail.com").rating(5).title("Best headphones ever!").content("The noise cancellation is absolutely incredible. Sound quality is top-notch.").verified(true).build());
        reviewRepository.save(Review.builder().product(p1).reviewerName("Sarah K.").reviewerEmail("sarah@mail.com").rating(4).title("Great but pricey").content("Sound is amazing, comfort is excellent. Only giving 4 stars because of the price tag.").verified(false).build());
        reviewRepository.save(Review.builder().product(p2).reviewerName("Dev Singh").reviewerEmail("dev@mail.com").rating(5).title("Blisteringly fast").content("The M3 Pro is a beast. Best machine I have owned.").verified(true).build());
        reviewRepository.save(Review.builder().product(p3).reviewerName("Marcus J.").reviewerEmail("marcus@mail.com").rating(5).title("Back pain gone!").content("After switching to this chair my back pain disappeared. Lumbar support is perfect.").verified(true).build());
        reviewRepository.save(Review.builder().product(p4).reviewerName("Jordan L.").reviewerEmail("jordan@mail.com").rating(4).title("Super comfortable").content("These are my go-to shoes now. Only issue is they run slightly large.").verified(true).build());
    }
}
