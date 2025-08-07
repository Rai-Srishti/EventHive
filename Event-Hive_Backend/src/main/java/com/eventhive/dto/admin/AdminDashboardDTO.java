package com.eventhive.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AdminDashboardDTO {
	private long totalPendingEvents;
    private long totalApprovedEvents;
    private long totalRejectedEvents;
    private long totalEvents;
    private long totalUsers;
    private long totalHosts;
    private long totalAttendee;
}
