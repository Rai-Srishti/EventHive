package com.eventhive.dao.qrCode;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.QrCode;

public interface QrCodeDao extends JpaRepository<QrCode, Long>{

}
