package com.eventhive.config;

import java.util.List;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.eventhive.services.authentication.JwtFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private UserDetailsService userDetailsService;   //our own user detail service by creating our own class
	
	@Autowired
	private JwtFilter jwtFilter;   // we do not have this filter by default so we need to create class for it 
		
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    return http
	        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
	        .csrf(csrf -> csrf.disable())
	        .authorizeHttpRequests(auth -> auth
	        	.requestMatchers("/auth/**", "/swagger-ui/**", "/v3/api-docs/**", "/home","/","/events",
	                    "/event-details/**",
	                    "/artists","/uploads/**").permitAll()
	            .requestMatchers("/admin/**").hasRole("SUPERADMIN")
	            .requestMatchers("/host/**").hasRole("HOST")
	            .requestMatchers("/attendee/**").hasRole("ATTENDEE")
	            .anyRequest().authenticated()
	        )
	        .sessionManagement(session -> session
	            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        )
	        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
	        .build();
	}

	
	
	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // OR use allowedOriginPatterns
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
	
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
	       return new BCryptPasswordEncoder();
	 }
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
		
		return config.getAuthenticationManager();
	}
	
}