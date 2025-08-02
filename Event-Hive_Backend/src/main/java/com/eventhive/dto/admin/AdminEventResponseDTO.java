package com.eventhive.dto.admin;

import java.time.LocalDateTime;

import com.eventhive.entities.Artist;
import com.eventhive.entities.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AdminEventResponseDTO {

    private Long eventId;

    private AdminHostDto host; 

    private String eventName;
    
    private String description;

    private String city;

    private String address;

    private LocalDateTime eventDate;

    private String category;

    private AdminArtistDTO artist;
}
