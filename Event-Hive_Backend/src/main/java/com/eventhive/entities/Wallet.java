package com.eventhive.entities;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.*;


@Entity
@Table(name = "wallet")
public class Wallet {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long walletId;

	    @OneToOne
	    @JoinColumn(name = "user_id", nullable = false, unique = true)
	    private User user;

	    @Column(precision = 10, scale = 2, nullable = false)
	    private BigDecimal balance = BigDecimal.ZERO;

	  
    @OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL)
    private List<WalletTransactions> transactions;
}
