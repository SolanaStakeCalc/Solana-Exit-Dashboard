export default async function handler(req, res) {
  const indicators = [
    { indicator: "Unstaking Volume", conditionMet: true },
    { indicator: "Funding Rate", conditionMet: true },
    { indicator: "Price Drop from Peak", conditionMet: false },
    { indicator: "Social Sentiment Spike", conditionMet: true },
    { indicator: "Open Interest Drop", conditionMet: false },
    { indicator: "Whale Outflows", conditionMet: true }
  ];
  const allConfirmed = indicators.every(i => i.conditionMet);
  res.status(200).json({ indicators, allConfirmed });
}
