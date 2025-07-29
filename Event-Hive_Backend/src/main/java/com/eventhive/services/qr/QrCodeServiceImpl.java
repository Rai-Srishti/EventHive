package com.eventhive.services.qr;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;

import com.eventhive.custom_exception.QrCodeGenerationException;
import com.eventhive.dao.qrCode.QrCodeDao;
import com.eventhive.entities.QrCode;
import com.eventhive.entities.Ticket;
import com.eventhive.entities.enums.QrCodeStatusEnum;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor

public class QrCodeServiceImpl implements QrCodeService{

	private final QrCodeDao qrDao ;
	private final QRCodeWriter qrWriter;
	
	private static final int QR_HEIGHT= 300;
	private static final int QR_WIDTH = 300;
	
	@Override
	public QrCode generateQrCode(Ticket ticket) {
		try {
			long uniqueId = UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE;

			String qrCodeImage =generateQrCode(uniqueId);
			
			QrCode qrCode = new QrCode();
			qrCode.setId(uniqueId);
			qrCode.setStatus(QrCodeStatusEnum.ACTIVE);
			qrCode.setValue(qrCodeImage);
			qrCode.setTicket(ticket);
			
			return qrDao.saveAndFlush(qrCode);
		}catch (IOException | WriterException ex) {
			throw new QrCodeGenerationException("Failed to generate a QR Code");
		}
		
	}

	private String generateQrCode(long uniqueId) throws WriterException, IOException {
		BitMatrix bitMatrix =
		qrWriter.encode(
				String.valueOf(uniqueId),
				BarcodeFormat.QR_CODE,
				QR_WIDTH,
				QR_HEIGHT
				);
		 BufferedImage qrCodeImage = MatrixToImageWriter.toBufferedImage(bitMatrix);
		try(ByteArrayOutputStream baos = new ByteArrayOutputStream()){
			ImageIO.write(qrCodeImage, "PNG", baos);
			byte[] imageBytes = baos.toByteArray();
			
			return Base64.getEncoder().encodeToString(imageBytes);
		}
		

	}

}
