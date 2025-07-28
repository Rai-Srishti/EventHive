package com.eventhive.scheduler;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.eventhive.entities.Event;
import com.eventhive.entities.enums.EventLifeCycleStatus;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventLifecycleService {

    private final ScheduleEventDao eventDao;
    @Scheduled(cron = "0 * * * * *")
    //	@Scheduled(cron = "0 0 * * * *") // Runs every hour
    public void updateCompletedEvents() {
        List<Event> pastEvents = eventDao.findByEventDateBeforeAndLifecycleStatus(
            LocalDateTime.now(), EventLifeCycleStatus.UPCOMING);

        for (Event event : pastEvents) {
            event.setLifecycleStatus(EventLifeCycleStatus.COMPLETED);
            event.setUpdatedAt(LocalDateTime.now());
        }

        if (!pastEvents.isEmpty()) {
            eventDao.saveAll(pastEvents);
        }
    }
}
