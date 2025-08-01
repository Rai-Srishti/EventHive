package com.eventhive.services.Attendee;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.eventhive.dao.attendee.AttendeeBookingDao;

import com.eventhive.dto.attendee.MyBookingDto;
import com.eventhive.entities.Ticket;
import com.eventhive.entities.enums.EventLifeCycleStatus;
import com.eventhive.entities.enums.TicketStatus;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class AttendeeBookingServiceImpl implements AttendeeBookingService {

    private final AttendeeBookingDao ticketDao;

    @Override
    public List<MyBookingDto> getBookingsByAttendeeId(Long userId) {
        List<Ticket> tickets = ticketDao.findUpcomingBookingsByAttendeeId(userId);

        return tickets.stream()
                .filter(ticket -> ticket.getEvent().getLifecycleStatus() == EventLifeCycleStatus.UPCOMING) // ✅ upcoming only
                .filter(ticket -> ticket.getStatus() == TicketStatus.BOOKED)
                .map(ticket -> {
                    MyBookingDto dto = new MyBookingDto();
                    dto.setTicketId(ticket.getTicketId());
                    dto.setEventId(ticket.getEvent().getEventId());
                    dto.setEventName(ticket.getEvent().getEventName());
                    dto.setCategory(ticket.getEvent().getCategory());
                    dto.setPhoto(ticket.getEvent().getPhoto());
                    dto.setEventDate(ticket.getEvent().getEventDate());

                    dto.setPhaseName(ticket.getPhase().getPhaseName().name());
                    dto.setQuantity(ticket.getQuantity());
                    dto.setTotalPrice(ticket.getTotalPrice());
                    dto.setBookingDate(ticket.getBookingDate());
                    dto.setTicketStatus(ticket.getStatus().name());

                    return dto;
                })
                .collect(Collectors.toList());
    }
}
