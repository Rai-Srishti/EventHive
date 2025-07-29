package com.eventhive.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.eventhive.entities.enums.QrCodeStatusEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "qr_codes")
@EntityListeners(AuditingEntityListener.class) //Enables per-entity audit tracking
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QrCode {
	@Id
 	@Column(name = "id", nullable = false, updatable = false)
 	private Long id;
	
	@Column(name = "status", nullable = false)
	@Enumerated(EnumType.STRING)
	private QrCodeStatusEnum status;
	
	@Column(name = "value", columnDefinition = "TEXT", nullable = false)
	private String value;
	  
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ticket_id")
	private Ticket ticket;
	
	@CreatedDate
	@Column(name = "created_at", updatable = false, nullable = false)
	private LocalDateTime createdAt;
	 
	@LastModifiedDate //Automatically updated before update
	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;

	@Override
	public int hashCode() {
		return Objects.hash(id, ticket, updatedAt);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!(obj instanceof QrCode))
			return false;
		QrCode other = (QrCode) obj;
		return Objects.equals(id, other.id) && Objects.equals(ticket, other.ticket)
				&& Objects.equals(updatedAt, other.updatedAt);
	}
	
	
 
}
