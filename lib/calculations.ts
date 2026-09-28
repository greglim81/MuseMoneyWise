export interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export interface AmortizationYear {
  year: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export function calculateMortgage(
  principal: number,
  annualRatePct: number,
  years: number,
): MortgageResult {
  const months = Math.max(1, Math.round(years * 12));
  const monthlyRate = annualRatePct / 100 / 12;
  let monthlyPayment: number;
  if (monthlyRate <= 0) {
    monthlyPayment = principal / months;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    monthlyPayment = (principal * monthlyRate * factor) / (factor - 1);
  }
  return {
    monthlyPayment,
    totalPayment: monthlyPayment * months,
    totalInterest: monthlyPayment * months - principal,
  };
}

export function amortizationSchedule(
  principal: number,
  annualRatePct: number,
  years: number,
): AmortizationYear[] {
  const { monthlyPayment } = calculateMortgage(principal, annualRatePct, years);
  const monthlyRate = annualRatePct / 100 / 12;
  const rows: AmortizationYear[] = [];
  let balance = principal;
  for (let year = 1; year <= years; year++) {
    let principalPaid = 0;
    let interestPaid = 0;
    for (let m = 0; m < 12 && balance > 0; m++) {
      const interest = balance * monthlyRate;
      const principalPortion = Math.min(monthlyPayment - interest, balance);
      interestPaid += interest;
      principalPaid += principalPortion;
      balance -= principalPortion;
    }
    rows.push({
      year,
      principalPaid,
      interestPaid,
      remainingBalance: Math.max(0, balance),
    });
    if (balance <= 0) break;
  }
  return rows;
}

export interface GrowthYear {
  year: number;
  balance: number;
  contributions: number;
  interest: number;
}

export function compoundGrowth(
  initialDeposit: number,
  monthlyContribution: number,
  annualRatePct: number,
  years: number,
): GrowthYear[] {
  const monthlyRate = annualRatePct / 100 / 12;
  const rows: GrowthYear[] = [];
  let balance = initialDeposit;
  let contributions = initialDeposit;
  for (let year = 1; year <= years; year++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      contributions += monthlyContribution;
    }
    rows.push({
      year,
      balance,
      contributions,
      interest: balance - contributions,
    });
  }
  return rows;
}

export function sliderValue(
  value: number | readonly number[],
  fallback = 0,
): number {
  if (typeof value === "number") return value;
  return value[0] ?? fallback;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
