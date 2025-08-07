package com.eventhive.services.Admin;

import java.util.List;

import com.eventhive.dto.admin.AdminDashboardDTO;
import com.eventhive.dto.admin.AdminProfileResponseDTO;
import com.eventhive.dto.admin.AdminUserRequestDTO;
import com.eventhive.dto.admin.AdminUserResponseDTO;
import com.eventhive.dto.host.ApiResponse;

public interface AdminService {
	
	//Hosts
	
	List<AdminUserResponseDTO> fetchAllHosts();

	ApiResponse updateHost(Long hostId);

	ApiResponse unblockHost(Long hostId);
	
	ApiResponse validateHost(Long hostId);
	
	
	//Attendee

	List<AdminUserResponseDTO> fetchAllAttendee();

	ApiResponse updateAttendee(Long attId);

	ApiResponse unblockAttendee(Long attId);
	
	ApiResponse validateAttendee(Long attId);
	
	
	// Profile

	AdminProfileResponseDTO fetchProfile(Long adminId);

	ApiResponse updateProfile(Long adminId, AdminUserRequestDTO dto);
	
	// Dashboard

	AdminDashboardDTO getDashboardStats();


	
}
