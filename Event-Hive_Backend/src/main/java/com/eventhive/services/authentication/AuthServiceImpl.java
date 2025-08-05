package com.eventhive.services.authentication;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eventhive.config.UserPrincipal;
import com.eventhive.custom_exception.ApiException;
import com.eventhive.custom_exception.EmailAlreadyExistsException;
import com.eventhive.dao.authentication.AuthUserDao;
import com.eventhive.dao.authentication.WalletDao;
import com.eventhive.dao.host.EventDao;
import com.eventhive.dto.authentication.LoginRequestDto;
import com.eventhive.dto.authentication.LoginResponseDto;
import com.eventhive.dto.authentication.SignupRequestDto;
import com.eventhive.dto.host.ApiResponse;
import com.eventhive.entities.User;
import com.eventhive.entities.Wallet;
import com.eventhive.entities.enums.Role;
import com.eventhive.entities.enums.UserStatus;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthUserDao userDao;
    
    private WalletDao walletDao; 

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    @Autowired
    AuthenticationManager authManager;   // reference of authmanager
    
    @Autowired
    private JWTService jwtService;

    @Override
    public ApiResponse register(SignupRequestDto dto) {

        // Validate allowed roles
    	// Not needed on Front End Though
        if (dto.getRole() != Role.ATTENDEE && dto.getRole() != Role.HOST) {
            throw new ApiException("Only HOST and ATTENDEE can register.");
        }

        // Check duplicate email
        if (userDao.existsByEmail(dto.getEmail())) {
            throw new EmailAlreadyExistsException("Email is already registered.");
        }

        // Create user
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setCity(dto.getCity());
        user.setState(dto.getState());
        user.setCountry(dto.getCountry());
        user.setRole(dto.getRole());
        user.setStatus(UserStatus.ACTIVE);
        user.setSignupDate(LocalDateTime.now());

        // Encrypt password
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
  
        userDao.save(user);
        
     //Create wallet only if role is ATTENDEE
        if (user.getRole() == Role.ATTENDEE) {
            Wallet wallet = new Wallet();
            wallet.setUser(user);
            wallet.setBalance(BigDecimal.ZERO); // Initial balance
            walletDao.save(wallet); 
        }

        return new ApiResponse("User registered successfully");
    }

    @Override
    public LoginResponseDto login(LoginRequestDto dto) {
        Authentication authentication = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );

        if (!authentication.isAuthenticated()) {
            throw new ApiException("Invalid credentials.");
        }

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userPrincipal.getUser();

        String token = jwtService.generateToken(userPrincipal);  

        return new LoginResponseDto(
            user.getUserId(),
            user.getFirstName() + " " + user.getLastName(),
            user.getRole(),
            token,
            "Login successful"
        );
    }

//    public LoginResponseDto login(LoginRequestDto dto) {
//
//        User user = userDao.findByEmail(dto.getEmail())
//                .orElseThrow(() -> new ApiException("Invalid email or password."));
//
//        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
//            throw new ApiException("Invalid email or password.");
//        }
//
//        return new LoginResponseDto(
//                user.getUserId(),
//                user.getFirstName() + " " + user.getLastName(),
//                user.getRole(),
//                token
//                "Login successful"
//        );
//    }

//	@Override
//	public String verify(LoginRequestDto dto) {
//		//passing the email and password and authenticating them and then saving them in authentication reference
//		Authentication authentication = 
//				authManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
//		
//		// checking if credentials are authenticated
//		if(authentication.isAuthenticated()) {
//			 UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
//			   return jwtService.generateToken(userPrincipal);        //return "Success"; //rather than returning string we want to generate token of successful login
//			   //sending userPrincipal(id, email, password) to generate the token
//		}
//		return "fail";
//	}
}
