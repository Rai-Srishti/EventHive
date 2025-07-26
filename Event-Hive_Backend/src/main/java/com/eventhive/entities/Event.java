package com.eventhive.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.eventhive.entities.enums.EventApprovalStatus;
import com.eventhive.entities.enums.EventLifeCycleStatus;
import com.eventhive.entities.enums.TicketStatus;

@Entity
@Table(name ="events")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    @ManyToOne
    @JoinColumn(name = "host_id", nullable = false)
    private User host; // Hosting user

    @Column(length = 100, nullable = false)
    private String eventName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 255)
    private String city;

    @Column(length = 255)
    private String address;

    private LocalDateTime eventDate;

    @Column(length = 50)
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private EventApprovalStatus status = EventApprovalStatus.PENDING;
    
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private EventLifeCycleStatus lifecycleStatus = EventLifeCycleStatus.UPCOMING;
    

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    @Column(length = 250)
    private String photo;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventPhase> phases;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ticket> tickets;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventApprovalLog> approvalLogs;
    
    @ManyToOne
    @JoinColumn(name = "artist_id", nullable = false)
    private Artist artist;
     
}