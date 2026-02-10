"use client"

import { Price } from "@/components/Price"

interface StatItem {
  value?: string | number
  label: string
  /** If the value is KES amount, provide it here for conversion */
  kesAmount?: number
  /** Use compact format (180K instead of 180,000) */
  compact?: boolean
}

interface StatsWithCurrencyProps {
  stats: StatItem[]
  className?: string
  valueClassName?: string
  labelClassName?: string
}

export function StatsWithCurrency({ 
  stats, 
  className = "grid grid-cols-3 gap-6 text-center",
  valueClassName = "text-3xl font-bold text-white",
  labelClassName = "mt-1 text-sm text-gray-400"
}: StatsWithCurrencyProps) {
  return (
    <div className={className}>
      {stats.map((stat, i) => (
        <div key={i}>
          <div className={valueClassName}>
            {stat.kesAmount ? (
              <><Price amount={stat.kesAmount} compact={stat.compact} />+</>
            ) : (
              stat.value
            )}
          </div>
          <div className={labelClassName}>{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

// Simple single price display for inline use
export function InlinePrice({ 
  amount, 
  suffix = "",
  className = "" 
}: { 
  amount: number
  suffix?: string
  className?: string 
}) {
  return (
    <span className={className}>
      <Price amount={amount} compact />{suffix}
    </span>
  )
}
