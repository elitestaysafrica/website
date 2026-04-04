"use client"

import { useEffect, useState } from "react"

type PhoneInputVariant = "dark" | "light"

type CountryOption = {
  code: string
  label: string
  flag: string
}

const COUNTRY_OPTIONS: CountryOption[] = [
  { code: "254", label: "Kenya", flag: "🇰🇪" },
  { code: "1", label: "US", flag: "🇺🇸" },
  { code: "44", label: "UK", flag: "🇬🇧" },
  { code: "971", label: "UAE", flag: "🇦🇪" },
  { code: "27", label: "South Africa", flag: "🇿🇦" },
  { code: "256", label: "Uganda", flag: "🇺🇬" },
  { code: "255", label: "Tanzania", flag: "🇹🇿" },
  { code: "91", label: "India", flag: "🇮🇳" },
  { code: "49", label: "Germany", flag: "🇩🇪" },
  { code: "33", label: "France", flag: "🇫🇷" },
  { code: "61", label: "Australia", flag: "🇦🇺" },
  { code: "86", label: "China", flag: "🇨🇳" },
]

type PhoneInputProps = {
  name: string
  id?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  variant?: PhoneInputVariant
  className?: string
  onValueChange?: (value: string) => void
}

export default function PhoneInput({
  name,
  id,
  placeholder,
  required = false,
  disabled = false,
  variant = "light",
  className,
  onValueChange,
}: PhoneInputProps) {
  const [countryCode, setCountryCode] = useState("254")
  const [localNumber, setLocalNumber] = useState("")

  const fullNumber = localNumber ? `${countryCode}${localNumber}` : ""

  useEffect(() => {
    onValueChange?.(fullNumber)
  }, [fullNumber, onValueChange])

  const baseClasses =
    variant === "dark"
      ? "border-gray-600 bg-gray-700 text-white"
      : "border-gray-300 bg-white text-gray-900"

  const focusClasses = "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

  return (
    <div className={className}>
      <div className="flex">
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          disabled={disabled}
          aria-label="Country code"
          className={`rounded-l-lg border px-3 py-3 ${baseClasses} ${focusClasses}`}
        >
          {COUNTRY_OPTIONS.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag} +{country.code} {country.label}
            </option>
          ))}
        </select>

        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={localNumber}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, "")
            const withoutLeadingZero = digitsOnly.replace(/^0+/, "")
            setLocalNumber(withoutLeadingZero)
          }}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full flex-1 rounded-r-lg border border-l-0 px-4 py-3 placeholder-gray-400 ${baseClasses} ${focusClasses}`}
        />
      </div>

      <input type="hidden" name={name} value={fullNumber} />
    </div>
  )
}
