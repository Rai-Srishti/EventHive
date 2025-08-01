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
public class QrCodeServiceImpl implements QrCodeService {

	private final QrCodeDao qrDao;
	private final QRCodeWriter qrWriter;

	private static final int QR_HEIGHT = 300;
	private static final int QR_WIDTH = 300;

	@Override
	public QrCode generateQrCode(Ticket ticket) {
		try {
			String content = buildQrContent(ticket);

			String base64Image = generateQrBase64(content);

			QrCode qrCode = new QrCode();
			qrCode.setId(UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE);
			qrCode.setStatus(QrCodeStatusEnum.ACTIVE);
			qrCode.setValue(base64Image);
			qrCode.setTicket(ticket);

			return qrDao.saveAndFlush(qrCode);
		} catch (IOException | WriterException ex) {
			throw new QrCodeGenerationException("Failed to generate a QR Code");
		}
	}

	private String buildQrContent(Ticket ticket) {
		return "TicketID:" + ticket.getTicketId() +
		       "|Event:" + ticket.getEvent().getEventName() +
		       "|Phase:" + ticket.getPhase().getPhaseName() +
		       "|Qty:" + ticket.getQuantity();
	}

	private String generateQrBase64(String content) throws WriterException, IOException {
		BitMatrix bitMatrix = qrWriter.encode(content, BarcodeFormat.QR_CODE, QR_WIDTH, QR_HEIGHT);
		BufferedImage qrCodeImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

		try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
			ImageIO.write(qrCodeImage, "PNG", baos);
			byte[] imageBytes = baos.toByteArray();
			return Base64.getEncoder().encodeToString(imageBytes);
		}
	}

	@Override
	public byte[] generateQrCodeAsBytes(Ticket ticket) {
		try {
			String content = buildQrContent(ticket);

			BitMatrix bitMatrix = qrWriter.encode(content, BarcodeFormat.QR_CODE, 250, 250);
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);

			return outputStream.toByteArray();
		} catch (Exception e) {
			throw new QrCodeGenerationException("Failed to generate QR Code");
		}
	}
}
