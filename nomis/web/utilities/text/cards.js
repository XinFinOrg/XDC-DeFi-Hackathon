const cards = {
  age: {
    title: [
      "At the Beginning of the Path",
      "Just a Beginner",
      "Crypto-Friendly Wallet",
      "A Pretty Old Wallet",
    ],
    text: [
      "Welcome to the Web3 world..",
      "This wallet was created {month} months ago",
    ],
  },
  pulse: {
    title: ["Inactive Wallet", " Wallet's Pulse"],
    text: [
      "Here you will see an activity pulse after a couple of transactions",
      "This is the wallet's on-chain activity. The most active month is {month}",
    ],
  },
  score: {
    title: ["Nomis Score"],
    text: [
      "Here you will see a Nomis score after a couple of transactions",
      "The overall Nomis score is {score}/100",
    ],
  },
  turnover: {
    title: [
      "Little Activity",
      "Active User",
      "Should Be a Trader",
      "A Big Spender",
    ],
    text: [
      "This wallet has total spendings of less than {count} {coin}",
      "This wallet has total spendings of more than {count} {coin}",
    ],
  },
};

export default cards;
