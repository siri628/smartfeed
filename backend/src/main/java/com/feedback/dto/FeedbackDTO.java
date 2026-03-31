package com.feedback.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO {
    private Long id;
    private String name;
    private String email;
    private int rating;
    private String message;
    private String category;
    private String sentiment;
    private String createdAt;
}
