package com.eventhive.dao.qrCode;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.QrCode;

public interface QrCodeDao extends JpaRepository<QrCode, Long>{
       // findByTicketId(Long ticketId);


}

