package com.eventhive.services.authentication;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.eventhive.config.MyUserDetailsService;
import com.eventhive.config.UserPrincipal;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter{   //oncePerRequestFilter is abstract class having doFilter method

	@Autowired
	private JWTService jwtService;
	
	@Autowired
	ApplicationContext context;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		 // Skip filtering for public endpoints
	    String path = request.getRequestURI();
	    if (path.startsWith("/auth/") || path.startsWith("/swagger-ui") || path.startsWith("/v3/api-docs")) {
	        filterChain.doFilter(request, response);
	        return;
	    }
		// we have to work with request, we will get bearer token i.e Bearer someTokenHere
		String authHeader = request.getHeader("Authorization");
		String token = null;
		Long userId =null;
		
		if(authHeader!=null && authHeader.startsWith("Bearer")) {
			token = authHeader.substring(7);  //token start from index-7
			userId = jwtService.extractUserId(token);
		}
		
		if(userId!=null && SecurityContextHolder.getContext().getAuthentication()==null) { // checking if already authenticated
			
			MyUserDetailsService userDetailsService = context.getBean(MyUserDetailsService.class);
			
			//to get the user detailsByID  we have to define this in implementation of UserDetail service
			UserPrincipal userDetails = (UserPrincipal) userDetailsService.loadUserById(userId);  
			if(jwtService.validateToken(token,userDetails)) {
				
				// authToken knows about the token but have no idea about request object (request data)
				UsernamePasswordAuthenticationToken authToken = 
						new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));// adding request data to token
				SecurityContextHolder.getContext().setAuthentication(authToken);  // adding token to the chain // adding to context
				
			}
		}
		
		filterChain.doFilter(request, response); // once above steps are done then continue with other filter
	}

}
