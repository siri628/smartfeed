package com.feedback.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "feedback")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String email;
    
    @Column(nullable = false)
    private int rating;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;
    
    @Column
    private String category;
    
    @Column
    private String sentiment;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (sentiment == null) {
            sentiment = analyzeSentiment(message);
        }
    }
    
    private String analyzeSentiment(String message) {
        if (message == null || message.trim().isEmpty()) {
            return "neutral";
        }
        
        String lowerMessage = message.toLowerCase();
        
        String[] positiveWords = {"good", "great", "excellent", "amazing", "fantastic", "wonderful", "best", "love", "perfect", "awesome", "nice", "happy", "satisfied"};
        String[] negativeWords = {"bad", "terrible", "awful", "horrible", "worst", "hate", "disappointed", "poor", "sad", "angry", "frustrated", "useless", "waste"};
        
        int positiveCount = 0;
        int negativeCount = 0;
        
        for (String word : positiveWords) {
            if (lowerMessage.contains(word)) {
                positiveCount++;
            }
        }
        
        for (String word : negativeWords) {
            if (lowerMessage.contains(word)) {
                negativeCount++;
            }
        }
        
        if (positiveCount > negativeCount) {
            return "positive";
        } else if (negativeCount > positiveCount) {
            return "negative";
        } else {
            return "neutral";
        }
    }
}
