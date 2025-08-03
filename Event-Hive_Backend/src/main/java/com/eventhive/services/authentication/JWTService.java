package com.eventhive.services.authentication;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.eventhive.config.UserPrincipal;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

@Service
public class JWTService {
	
	private static final String secretKey = "2KhjgbYnQBWYlEdgN1QXgC6Usa8Y89WD";
	
	private final SecretKey key;   // return SecretKey
	
	
	public JWTService() {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }
	
	public String generateToken(UserPrincipal userPrincipal) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("role", userPrincipal.getUser().getRole().name());
		
		return Jwts.builder()
				.claims()
				.add(claims)
				.subject(String.valueOf(userPrincipal.getUserId()))  // subject is basically userID
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis()+1000 * 60 * 60 * 1))   //setting expiration time
				.and()
				.signWith(key)  //here pass the secret
				.compact();  //key will be made here				
	}

	public Long extractUserId(String token) {
		try {
	        return Long.valueOf(extractClaim(token, Claims::getSubject));
	    } catch (NumberFormatException e) {
	        throw new IllegalArgumentException("Invalid token subject. Not a valid user ID.");
	    }
	}
	
	private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
		final Claims claims = extractAllClaim(token);
		return claimResolver.apply(claims);
	}


	private Claims extractAllClaim(String token) {
		return Jwts.parser()
				.verifyWith(key)
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}

	public boolean validateToken(String token, UserPrincipal userPrincipal) {
		final Long userId = extractUserId(token);
		Long actualUserId = userPrincipal.getUserId();
		return userId.equals(actualUserId) && !isTokenExpired(token);
	}

	private boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}
	

	public String extractUserRole(String token) {
	    return extractClaim(token, claims -> claims.get("role", String.class));
	}

	
	//adding this method to extract the userId from jwt Token
	public Long extractUserIdFromContext() {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	    if (authentication != null && authentication.getPrincipal() instanceof UserPrincipal userPrincipal) {
	        return userPrincipal.getUserId();
	    }

	    throw new IllegalStateException("Authentication token is invalid or user not authenticated");

	}
}
