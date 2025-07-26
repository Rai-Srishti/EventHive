package com.eventhive.entities;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.eventhive.entities.enums.EventApprovalStatus;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "artists")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long artistId;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 255)
    private String genre;

    @Column(length = 255)
    private String bio;

    @Column(length = 100)
    private String country;

    @Column(length = 255)
    private String contactEmail;

    @Column(length = 255)
    private String photo;

    // One-to-Many with Event
    @OneToMany(mappedBy = "artist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Event> events = new ArrayList<>();
}
