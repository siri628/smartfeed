package com.feedback.repository;

import com.feedback.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    
    List<Feedback> findByRating(int rating);
    
    List<Feedback> findByCategory(String category);
    
    List<Feedback> findBySentiment(String sentiment);
    
    @Query("SELECT f FROM Feedback f WHERE f.name LIKE %:name% OR f.email LIKE %:email% OR f.message LIKE %:message%")
    List<Feedback> searchFeedback(@Param("name") String name, @Param("email") String email, @Param("message") String message);
    
    @Query("SELECT COUNT(f) FROM Feedback f WHERE f.rating = :rating")
    long countByRating(@Param("rating") int rating);
    
    @Query("SELECT COUNT(f) FROM Feedback f WHERE f.sentiment = :sentiment")
    long countBySentiment(@Param("sentiment") String sentiment);
}
