package com.eventhive.services.Admin;


import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.eventhive.custom_exception.ApiException;
import com.eventhive.custom_exception.UserNotFoundException;
import com.eventhive.dao.admin.AdminEventDao;
import com.eventhive.dao.admin.AdminTicketDao;
import com.eventhive.dao.admin.AdminUserDao;
import com.eventhive.dto.admin.AdminProfileResponseDTO;
import com.eventhive.dto.admin.AdminUserRequestDTO;
import com.eventhive.dto.admin.AdminUserResponseDTO;
import com.eventhive.dto.host.ApiResponse;
import com.eventhive.entities.User;
import com.eventhive.entities.enums.Role;
import com.eventhive.entities.enums.UserStatus;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class AdminServiceImpl implements AdminService{
	
	private final AdminUserDao adminUserDao;
	private final AdminEventDao adminEventDao;
	private final AdminTicketDao adminTicketDao;
	private final ModelMapper mapper;
	
	//------------------Manage Host --------
	
	@Override
	public List<AdminUserResponseDTO> fetchAllHosts() {
		List<User> hostList = adminUserDao.findByRole(Role.HOST);
		if(hostList.isEmpty()) {
			throw new UserNotFoundException("No Host found!!");
		}
		return hostList.stream()
				.map(h->mapper.map(h,AdminUserResponseDTO.class))
				.toList();
	}

	@Override
	public ApiResponse updateHost(Long hostId) {
		User host = adminUserDao.findById(hostId)
				.orElseThrow(()->new UserNotFoundException("Host Not Found!!"));
		
		int countCancelEvent = adminEventDao.countCancelledEventsByHost(hostId);
		
		if(countCancelEvent>5) {
			host.setStatus(UserStatus.BLOCKED);
			adminUserDao.save(host);
			return new ApiResponse("Host has been blocked due to excessive cancellations.");
		}
		
		
		return new ApiResponse("Host has cancelled "+countCancelEvent+" Events — threshold not reached.");
	}

	@Override
	public ApiResponse unblockHost(Long hostId) {
		User host = adminUserDao.findById(hostId)
				.orElseThrow(()->new UserNotFoundException("Host Not Found!!"));
		host.setStatus(UserStatus.ACTIVE);
		adminUserDao.save(host);
		return new ApiResponse("Host has been Unblocked!!");
	}

	
	//------------------Manage Attendee --------
	@Override
	public List<AdminUserResponseDTO> fetchAllAttendee() {
		List<User> attendeeList = adminUserDao.findByRole(Role.ATTENDEE);
		if(attendeeList.isEmpty()) {
			throw new UserNotFoundException("No Attendee found!!");
		}
		return attendeeList.stream()
				.map(att->mapper.map(att,AdminUserResponseDTO.class))
				.toList();
	}

	@Override
	public ApiResponse updateAttendee(Long attId) {
		User attendee = adminUserDao.findById(attId)
				.orElseThrow(()->new UserNotFoundException("Attendee Not Found!!"));
		
		int countCancelEvent = adminTicketDao.countCancelledTicketByAttendee(attId);
		
		if(countCancelEvent>5) {
			attendee.setStatus(UserStatus.BLOCKED);
			adminUserDao.save(attendee);
			return new ApiResponse("Attendee has been blocked due to excessive cancellations.");
		}
		return new ApiResponse("Attendee has cancelled "+countCancelEvent+" Events — threshold not reached.");	
	}

	@Override
	public ApiResponse unblockAttendee(Long attId) {
		User attendee = adminUserDao.findById(attId)
				.orElseThrow(()->new UserNotFoundException("Attendee Not Found!!"));
		attendee.setStatus(UserStatus.ACTIVE);
		adminUserDao.save(attendee);
		return new ApiResponse("Attendee has been Unblocked!!");
	}
	
	//------------------Manage Profile --------

	@Override
	public AdminProfileResponseDTO fetchProfile(Long adminId) {
		User admin = adminUserDao.findById(adminId)
				.orElseThrow(()->new UserNotFoundException("Admin Not Found!!"));
		
		if (admin.getRole() != Role.SUPERADMIN) {
	        throw new ApiException("Access denied: Not a SuperAdmin");
	    }
		
		return mapper.map(admin,AdminProfileResponseDTO.class);
	}

	@Override
	public ApiResponse updateProfile(Long adminId, AdminUserRequestDTO dto) {
		User admin = adminUserDao.findById(adminId)
				.orElseThrow(()->new UserNotFoundException("Admin Not Found!!"));
		
		mapper.map(dto, admin);
		return new ApiResponse("updated Successfully!!");
	}
	
	
	
}
