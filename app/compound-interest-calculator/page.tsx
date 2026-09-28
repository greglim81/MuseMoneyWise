"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, ChartLineIcon, WalletIcon } from "lucide-react";
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
import { compoundGrowth, formatCurrency, sliderValue } from "@/lib/calculations";

export default function CompoundInterestCalculatorPage() {
  const [initialDeposit, setInitialDeposit] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);

  const schedule = useMemo(
    () => compoundGrowth(initialDeposit, monthlyContribution, rate, years),
    [initialDeposit, monthlyContribution, rate, years],
  );
  const finalYear = schedule[schedule.length - 1] ?? {
    balance: 0,
    contributions: 0,
    interest: 0,
  };

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
            <ChartLineIcon className="size-7 text-primary" />
            Compound Interest Calculator
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Adjust the sliders to see how your savings grow with monthly
            contributions and compounding returns.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Savings details</CardTitle>
              <CardDescription>
                Interest compounds monthly. Drag a slider or type an exact value.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="initial-deposit">Initial deposit</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={[initialDeposit]}
                    onValueChange={(value) => setInitialDeposit(sliderValue(value, 0))}
                    min={0}
                    max={500000}
                    step={1000}
                    aria-label="Initial deposit"
                  />
                  <Input
                    id="initial-deposit"
                    type="number"
                    className="w-32"
                    value={initialDeposit}
                    min={0}
                    onChange={(event) =>
                      setInitialDeposit(Number(event.target.value) || 0)
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="monthly-contribution">Monthly contribution</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={[monthlyContribution]}
                    onValueChange={(value) =>
                      setMonthlyContribution(sliderValue(value, 0))
                    }
                    min={0}
                    max={10000}
                    step={50}
                    aria-label="Monthly contribution"
                  />
                  <Input
                    id="monthly-contribution"
                    type="number"
                    className="w-32"
                    value={monthlyContribution}
                    min={0}
                    onChange={(event) =>
                      setMonthlyContribution(Number(event.target.value) || 0)
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="rate">Annual return (%)</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={[rate]}
                    onValueChange={(value) => setRate(sliderValue(value, 0))}
                    min={0}
                    max={15}
                    step={0.25}
                    aria-label="Annual return"
                  />
                  <Input
                    id="rate"
                    type="number"
                    className="w-32"
                    value={rate}
                    min={0}
                    step={0.25}
                    onChange={(event) =>
                      setRate(Number(event.target.value) || 0)
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="years">Time horizon (years)</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={[years]}
                    onValueChange={(value) => setYears(sliderValue(value, 1))}
                    min={1}
                    max={50}
                    step={1}
                    aria-label="Time horizon"
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
              <CardTitle>Your projection</CardTitle>
              <CardDescription>
                Balance after {years} years at {rate}% annual return.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="rounded-lg bg-muted/50 p-6 text-center">
                <p className="text-sm text-muted-foreground">Future balance</p>
                <p className="text-4xl font-semibold tracking-tight">
                  {formatCurrency(finalYear.balance)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">
                    Total contributions
                  </p>
                  <p className="text-xl font-semibold">
                    {formatCurrency(finalYear.contributions)}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Interest earned</p>
                  <p className="text-xl font-semibold">
                    {formatCurrency(finalYear.interest)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Year-by-year growth</CardTitle>
            <CardDescription>
              How your balance, contributions, and interest evolve each year.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead className="text-right">Contributions</TableHead>
                  <TableHead className="text-right">Interest earned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.balance)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.contributions)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.interest)}
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
