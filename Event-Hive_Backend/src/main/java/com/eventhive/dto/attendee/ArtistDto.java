package com.eventhive.dto.attendee;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArtistDto {
	
    private Long artistId;

    private String name;

    private String genre;

    private String bio;

    private String country;

    private String contactEmail;

    private String photo;
}
