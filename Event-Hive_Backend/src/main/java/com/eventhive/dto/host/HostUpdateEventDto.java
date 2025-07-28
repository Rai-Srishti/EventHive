package com.eventhive.dto.host;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HostUpdateEventDto {
    private String eventName;
    private String description;
    private String address;
    private String artistName;
}
