package com.feedback.service;

import com.feedback.dto.FeedbackDTO;
import com.feedback.entity.Feedback;
import com.feedback.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    
    private final FeedbackRepository feedbackRepository;
    
    public FeedbackDTO submitFeedback(FeedbackDTO feedbackDTO) {
        Feedback feedback = convertToEntity(feedbackDTO);
        Feedback savedFeedback = feedbackRepository.save(feedback);
        return convertToDTO(savedFeedback);
    }
    
    public List<FeedbackDTO> getAllFeedback() {
        return feedbackRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public FeedbackDTO getFeedbackById(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found with id: " + id));
        return convertToDTO(feedback);
    }
    
    public void deleteFeedback(Long id) {
        if (!feedbackRepository.existsById(id)) {
            throw new RuntimeException("Feedback not found with id: " + id);
        }
        feedbackRepository.deleteById(id);
    }
    
    public List<FeedbackDTO> getFeedbackByRating(int rating) {
        return feedbackRepository.findByRating(rating).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<FeedbackDTO> getFeedbackByCategory(String category) {
        return feedbackRepository.findByCategory(category).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<FeedbackDTO> getFeedbackBySentiment(String sentiment) {
        return feedbackRepository.findBySentiment(sentiment).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<FeedbackDTO> searchFeedback(String query) {
        return feedbackRepository.searchFeedback(query, query, query).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public long getFeedbackCountByRating(int rating) {
        return feedbackRepository.countByRating(rating);
    }
    
    public long getFeedbackCountBySentiment(String sentiment) {
        return feedbackRepository.countBySentiment(sentiment);
    }
    
    private Feedback convertToEntity(FeedbackDTO dto) {
        Feedback feedback = new Feedback();
        feedback.setId(dto.getId());
        feedback.setName(dto.getName());
        feedback.setEmail(dto.getEmail());
        feedback.setRating(dto.getRating());
        feedback.setMessage(dto.getMessage());
        feedback.setCategory(dto.getCategory());
        feedback.setSentiment(dto.getSentiment());
        return feedback;
    }
    
    private FeedbackDTO convertToDTO(Feedback entity) {
        FeedbackDTO dto = new FeedbackDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        dto.setRating(entity.getRating());
        dto.setMessage(entity.getMessage());
        dto.setCategory(entity.getCategory());
        dto.setSentiment(entity.getSentiment());
        dto.setCreatedAt(entity.getCreatedAt() != null ? 
            entity.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null);
        return dto;
    }
}
