package com.eventhive.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.eventhive.entities.enums.ApprovalAction;

@Entity
@Table(name = "event_approval_log")
public class EventApprovalLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long approvalId;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "superadmin_id", nullable = false)
    private User superadmin;

    @Enumerated(EnumType.STRING)
    @Column(length = 10, nullable = false)
    private ApprovalAction action;

    @Column(name = "action_date", updatable = false)
    private LocalDateTime actionDate = LocalDateTime.now();

    @Column(columnDefinition = "TEXT")
    private String comments;
}