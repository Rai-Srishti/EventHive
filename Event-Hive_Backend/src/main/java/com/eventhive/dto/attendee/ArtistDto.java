package com.eventhive.dto.attendee;

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
