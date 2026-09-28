"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, HouseIcon, WalletIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  amortizationSchedule,
  calculateMortgage,
  formatCurrency,
  sliderValue,
} from "@/lib/calculations";

export default function MortgageCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(400000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const result = useMemo(
    () => calculateMortgage(loanAmount, rate, years),
    [loanAmount, rate, years],
  );
  const schedule = useMemo(
    () => amortizationSchedule(loanAmount, rate, years),
    [loanAmount, rate, years],
  );

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="border-b">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <WalletIcon className="size-5 text-primary" />
            MoneyWise
          </Link>
          <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/" />}>
            <ArrowLeftIcon data-icon="inline-start" />
            Home
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="flex items-center gap-2 text-3xl font-semibold tracking-tight">
            <HouseIcon className="size-7 text-primary" />
            Mortgage Repayment Calculator
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Adjust the sliders to estimate your monthly payment and see how
            principal and interest split over time.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Loan details</CardTitle>
              <CardDescription>Drag a slider or type an exact value.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="loan-amount">Loan amount</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(sliderValue(value, 0))}
                    min={10000}
                    max={2000000}
                    step={5000}
                    aria-label="Loan amount"
                  />
                  <Input
                    id="loan-amount"
                    type="number"
                    className="w-32"
                    value={loanAmount}
                    min={0}
                    onChange={(event) =>
                      setLoanAmount(Number(event.target.value) || 0)
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="rate">Interest rate (%)</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={[rate]}
                    onValueChange={(value) => setRate(sliderValue(value, 0))}
                    min={0}
                    max={15}
                    step={0.125}
                    aria-label="Interest rate"
                  />
                  <Input
                    id="rate"
                    type="number"
                    className="w-32"
                    value={rate}
                    min={0}
                    step={0.125}
                    onChange={(event) =>
                      setRate(Number(event.target.value) || 0)
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="years">Loan term (years)</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={[years]}
                    onValueChange={(value) => setYears(sliderValue(value, 1))}
                    min={1}
                    max={30}
                    step={1}
                    aria-label="Loan term"
                  />
                  <Input
                    id="years"
                    type="number"
                    className="w-32"
                    value={years}
                    min={1}
                    onChange={(event) =>
                      setYears(Number(event.target.value) || 1)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Your estimate</CardTitle>
              <CardDescription>
                Monthly payment for a {formatCurrency(loanAmount)} loan at{" "}
                {rate}% over {years} years.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="rounded-lg bg-muted/50 p-6 text-center">
                <p className="text-sm text-muted-foreground">Monthly payment</p>
                <p className="text-4xl font-semibold tracking-tight">
                  {formatCurrency(result.monthlyPayment)}/mo
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Total paid</p>
                  <p className="text-xl font-semibold">
                    {formatCurrency(result.totalPayment)}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Total interest</p>
                  <p className="text-xl font-semibold">
                    {formatCurrency(result.totalInterest)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Year-by-year amortization</CardTitle>
            <CardDescription>
              How each year splits between principal and interest.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Principal paid</TableHead>
                  <TableHead className="text-right">Interest paid</TableHead>
                  <TableHead className="text-right">Remaining balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.principalPaid)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.interestPaid)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.remainingBalance)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <footer>
        <Separator />
        <div className="mx-auto w-full max-w-5xl px-4 py-6 text-sm text-muted-foreground sm:px-6">
          Estimates only, not financial advice.
        </div>
      </footer>
    </div>
  );
}
