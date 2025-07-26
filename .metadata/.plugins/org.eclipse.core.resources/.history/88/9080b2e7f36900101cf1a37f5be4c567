package com.eventhive.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.eventhive.entities.enums.EventApprovalStatus;
import com.eventhive.entities.enums.EventLifeCycleStatus;
import com.eventhive.entities.enums.Role;
import com.eventhive.entities.enums.UserStatus;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(length = 50)
    private String firstName;

    @Column(length = 50)
    private String lastName;

    @Column(length = 100, unique = true, nullable = false)
    private String email;

    @Column(length = 255, nullable = false)
    private String password;

    @Column(length = 20)
    private String phoneNumber;

    @Column(length = 50)
    private String city;

    @Column(length = 50)
    private String state;

    @Column(length = 50)
    private String country;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Role role = Role.ATTENDEE;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private UserStatus status = UserStatus.ACTIVE;

    @Column(name = "signup_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime signupDate;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Wallet wallet;

    @OneToMany(mappedBy = "attendee", cascade = CascadeType.ALL)
    private List<Ticket> tickets= new ArrayList<>();
    
    @OneToMany(mappedBy = "host", cascade = CascadeType.ALL)
    private List<Event> events = new ArrayList<>();
    
    //Helper Method 
    public void addEvent(Event event) {
        events.add(event);
        event.setHost(this);
    }

    
    
    
}
