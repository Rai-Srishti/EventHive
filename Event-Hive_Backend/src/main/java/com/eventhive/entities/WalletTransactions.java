package com.eventhive.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.eventhive.entities.enums.TransactionType;

import jakarta.persistence.*;

@Entity
@Table(name = "wallet_transactions")
public class WalletTransactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @ManyToOne
    @JoinColumn(name = "wallet_id")
    private Wallet wallet;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    @Column(precision = 10, scale = 2)
    private BigDecimal amount;

    private LocalDateTime transactionDate;
}
