package com.eventhive.entities;



import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.eventhive.entities.enums.TicketPhaseName;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "event_phases")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventPhase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long phaseId;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @Enumerated(EnumType.STRING)
    @Column(name = "phase_name", length = 50, nullable = false)
    private TicketPhaseName phaseName;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer totalTickets;

    @Column(nullable = false)
    private Integer availableTickets;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;
    
    
    @OneToMany(mappedBy = "phase", cascade = CascadeType.ALL)
    private List<Ticket> tickets;
}
