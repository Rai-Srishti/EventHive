package com.eventhive.services.authentication;

import com.eventhive.dto.authentication.LoginRequestDto;
import com.eventhive.dto.authentication.LoginResponseDto;
import com.eventhive.dto.authentication.SignupRequestDto;
import com.eventhive.dto.host.ApiResponse;

public interface AuthService {
    ApiResponse register(SignupRequestDto dto);
    LoginResponseDto login(LoginRequestDto dto);
}
