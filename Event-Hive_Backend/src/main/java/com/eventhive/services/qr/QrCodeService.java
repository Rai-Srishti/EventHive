package com.eventhive.services.qr;

import com.eventhive.entities.QrCode;
import com.eventhive.entities.Ticket;

public interface QrCodeService {

	QrCode generateQrCode(Ticket ticket);
	byte[] generateQrCodeAsBytes(Ticket ticket);
}
