package com.eventhive.services;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.eventhive.entities.Ticket;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService {
	
	private JavaMailSender mailSender;
	
	public void sendTicketConfirmationEmail(String toEmail, String subject, String body, byte[] qrCodeImage) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true); // true enables multipart

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(body, true); // HTML enabled

            // Add QR code image as attachment
            helper.addAttachment("qr-code.png", new org.springframework.core.io.ByteArrayResource(qrCodeImage));

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email with QR code: " + e.getMessage(), e);
        }
    }
	
	public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
    
    
}

