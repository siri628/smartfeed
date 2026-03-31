package com.feedback.controller;

import com.feedback.dto.FeedbackDTO;
import com.feedback.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {
    
    private final FeedbackService feedbackService;
    
    @PostMapping
    public ResponseEntity<FeedbackDTO> submitFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        FeedbackDTO savedFeedback = feedbackService.submitFeedback(feedbackDTO);
        return ResponseEntity.ok(savedFeedback);
    }
    
    @GetMapping
    public ResponseEntity<List<FeedbackDTO>> getAllFeedback() {
        List<FeedbackDTO> feedbackList = feedbackService.getAllFeedback();
        return ResponseEntity.ok(feedbackList);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<FeedbackDTO> getFeedbackById(@PathVariable Long id) {
        FeedbackDTO feedback = feedbackService.getFeedbackById(id);
        return ResponseEntity.ok(feedback);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/rating/{rating}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbackByRating(@PathVariable int rating) {
        List<FeedbackDTO> feedbackList = feedbackService.getFeedbackByRating(rating);
        return ResponseEntity.ok(feedbackList);
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbackByCategory(@PathVariable String category) {
        List<FeedbackDTO> feedbackList = feedbackService.getFeedbackByCategory(category);
        return ResponseEntity.ok(feedbackList);
    }
    
    @GetMapping("/sentiment/{sentiment}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbackBySentiment(@PathVariable String sentiment) {
        List<FeedbackDTO> feedbackList = feedbackService.getFeedbackBySentiment(sentiment);
        return ResponseEntity.ok(feedbackList);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<FeedbackDTO>> searchFeedback(@RequestParam String query) {
        List<FeedbackDTO> feedbackList = feedbackService.searchFeedback(query);
        return ResponseEntity.ok(feedbackList);
    }
    
    @GetMapping("/analytics/ratings")
    public ResponseEntity<Map<Integer, Long>> getRatingsAnalytics() {
        Map<Integer, Long> ratingsData = Map.of(
            1, feedbackService.getFeedbackCountByRating(1),
            2, feedbackService.getFeedbackCountByRating(2),
            3, feedbackService.getFeedbackCountByRating(3),
            4, feedbackService.getFeedbackCountByRating(4),
            5, feedbackService.getFeedbackCountByRating(5)
        );
        return ResponseEntity.ok(ratingsData);
    }
    
    @GetMapping("/analytics/sentiments")
    public ResponseEntity<Map<String, Long>> getSentimentsAnalytics() {
        Map<String, Long> sentimentsData = Map.of(
            "positive", feedbackService.getFeedbackCountBySentiment("positive"),
            "negative", feedbackService.getFeedbackCountBySentiment("negative"),
            "neutral", feedbackService.getFeedbackCountBySentiment("neutral")
        );
        return ResponseEntity.ok(sentimentsData);
    }
}
