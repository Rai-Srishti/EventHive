// src/data/mockPhases.js

const mockPhases = [
  {
    phaseId: 1,
    title: "Silver",
    price: 1000,
    availableSeats: 50,
    highlight: false,
    features: [
      { name: "Standard Seat", included: true },
      { name: "1 Free Drink", included: true },
      { name: "Backstage Access", included: false }
    ]
  },
  {
    phaseId: 2,
    title: "Platinum",
    price: 2000,
    availableSeats: 20,
    highlight: true,
    features: [
      { name: "VIP Seat", included: true },
      { name: "Unlimited Drinks", included: true },
      { name: "Backstage Access", included: true }
    ]
  },
  {
    phaseId: 3,
    title: "Gold",
    price: 1500,
    availableSeats: 30,
    highlight: false,
    features: [
      { name: "Premium Seat", included: true },
      { name: "2 Free Drinks", included: true },
      { name: "Backstage Access", included: false }
    ]
  }
];

export default mockPhases;
