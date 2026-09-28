import Link from "next/link";
import {
  ArrowRightIcon,
  BadgePercentIcon,
  CalendarClockIcon,
  ChartLineIcon,
  CheckIcon,
  HouseIcon,
  PiggyBankIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WalletIcon,
  ZapIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const mortgageFeatures = [
  "Monthly payment breakdown of principal vs. interest",
  "Total interest paid over the life of the loan",
  "Year-by-year amortization schedule",
  "Compare loan terms from 5 to 30 years",
];

const compoundFeatures = [
  "Project growth with monthly contributions",
  "See contributions vs. interest earned side by side",
  "Year-by-year balance projection table",
  "Model any rate from 0% to 15%",
];

const faqs = [
  {
    question: "How is the monthly mortgage payment calculated?",
    answer:
      "We use the standard amortization formula: M = P × r(1+r)ⁿ / ((1+r)ⁿ − 1), where P is the loan amount, r is the monthly interest rate, and n is the total number of payments. With a 0% rate it simply divides the loan evenly across all months.",
  },
  {
    question: "How does the compound interest calculator work?",
    answer:
      "Interest compounds monthly: each month your balance earns balance × (annual rate / 12), then your monthly contribution is added. The projection table shows how your balance, total contributions, and earned interest evolve every year.",
  },
  {
    question: "Is my financial data stored anywhere?",
    answer:
      "No. Every calculation runs entirely in your browser. Nothing you enter is sent to a server, stored, or tracked.",
  },
  {
    question: "Are these calculators free to use?",
    answer:
      "Yes — both calculators are completely free, with no account, no signup, and no limits.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <WalletIcon className="size-5 text-primary" />
            MoneyWise
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/mortgage-calculator" />}>
              <HouseIcon data-icon="inline-start" />
              <span className="hidden sm:inline">Mortgage</span>
            </Button>
            <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/compound-interest-calculator" />}>
              <ChartLineIcon data-icon="inline-start" />
              <span className="hidden sm:inline">Compound Interest</span>
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-4 py-12 sm:px-6 sm:py-16">
        {/* Hero */}
        <section className="flex flex-col items-center gap-6 text-center">
          <Badge variant="secondary">
            <SparklesIcon data-icon="inline-start" />
            Free financial calculators
          </Badge>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Know your numbers before you sign or save
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            MoneyWise helps you plan a home loan you can afford and watch your
            savings compound over time — no signup, no spreadsheets, no guesswork.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" nativeButton={false} render={<Link href="/mortgage-calculator" />}>
              <HouseIcon data-icon="inline-start" />
              Calculate mortgage
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/compound-interest-calculator" />}>
              <PiggyBankIcon data-icon="inline-start" />
              Grow your savings
            </Button>
          </div>
        </section>

        {/* Feature cards */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Two calculators, zero guesswork
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Borrowing or saving — get instant, transparent answers for the
              biggest money decisions.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">
                    <ZapIcon data-icon="inline-start" />
                    Instant
                  </Badge>
                </CardAction>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <HouseIcon className="size-5" />
                </div>
                <CardTitle className="text-xl">Mortgage Repayment Calculator</CardTitle>
                <CardDescription>
                  Estimate your monthly payment and see exactly where every
                  dollar goes over the life of your loan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2.5">
                  {mortgageFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" nativeButton={false} render={<Link href="/mortgage-calculator" />}>
                  Try the mortgage calculator
                  <ArrowRightIcon data-icon="inline-end" />
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">
                    <ZapIcon data-icon="inline-start" />
                    Instant
                  </Badge>
                </CardAction>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ChartLineIcon className="size-5" />
                </div>
                <CardTitle className="text-xl">Compound Interest Calculator</CardTitle>
                <CardDescription>
                  See how regular contributions snowball into long-term wealth,
                  month by month and year by year.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2.5">
                  {compoundFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" nativeButton={false} render={<Link href="/compound-interest-calculator" />}>
                  Try the compound calculator
                  <ArrowRightIcon data-icon="inline-end" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Why MoneyWise */}
        <section className="flex flex-col gap-6">
          <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            Built for confident decisions
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <Card size="sm">
              <CardHeader>
                <BadgePercentIcon className="size-5 text-primary" />
                <CardTitle>Transparent math</CardTitle>
                <CardDescription>
                  Standard amortization and compounding formulas — the same ones
                  banks use, shown step by step.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card size="sm">
              <CardHeader>
                <CalendarClockIcon className="size-5 text-primary" />
                <CardTitle>Year-by-year detail</CardTitle>
                <CardDescription>
                  Go beyond a single number with full schedules that show how
                  each year changes the picture.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card size="sm">
              <CardHeader>
                <ShieldCheckIcon className="size-5 text-primary" />
                <CardTitle>Private by design</CardTitle>
                <CardDescription>
                  Everything runs in your browser. Your numbers never leave your
                  device.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto flex w-full max-w-2xl flex-col gap-6">
          <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            Frequently asked questions
          </h2>
          <Accordion>
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center gap-4 rounded-xl bg-muted/50 px-6 py-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Ready to run your numbers?
          </h2>
          <p className="max-w-md text-muted-foreground">
            It takes less than a minute — adjust the sliders and get answers
            instantly.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button nativeButton={false} render={<Link href="/mortgage-calculator" />}>
              <HouseIcon data-icon="inline-start" />
              Mortgage calculator
            </Button>
            <Button variant="outline" nativeButton={false} render={<Link href="/compound-interest-calculator" />}>
              <PiggyBankIcon data-icon="inline-start" />
              Compound interest calculator
            </Button>
          </div>
        </section>
      </main>

      <footer>
        <Separator />
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <span className="flex items-center gap-2">
            <WalletIcon className="size-4" />
            MoneyWise — plan, borrow, and save smarter.
          </span>
          <span>Estimates only, not financial advice.</span>
        </div>
      </footer>
    </div>
  );
}
