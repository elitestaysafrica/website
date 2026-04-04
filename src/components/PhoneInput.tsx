"use client"

import { useEffect, useState } from "react"

type PhoneInputVariant = "dark" | "light"

type CountryOption = {
  code: string
  label: string
  flag: string
}

// Kenya first (default), then everything else A-Z
const COUNTRY_OPTIONS: CountryOption[] = [
  { code: "254", label: "Kenya", flag: "🇰🇪" },
  { code: "213", label: "Algeria", flag: "🇩🇿" },
  { code: "244", label: "Angola", flag: "🇦🇴" },
  { code: "54", label: "Argentina", flag: "🇦🇷" },
  { code: "61", label: "Australia", flag: "🇦🇺" },
  { code: "43", label: "Austria", flag: "🇦🇹" },
  { code: "973", label: "Bahrain", flag: "🇧🇭" },
  { code: "880", label: "Bangladesh", flag: "🇧🇩" },
  { code: "32", label: "Belgium", flag: "🇧🇪" },
  { code: "229", label: "Benin", flag: "🇧🇯" },
  { code: "591", label: "Bolivia", flag: "🇧🇴" },
  { code: "267", label: "Botswana", flag: "🇧🇼" },
  { code: "55", label: "Brazil", flag: "🇧🇷" },
  { code: "359", label: "Bulgaria", flag: "🇧🇬" },
  { code: "226", label: "Burkina Faso", flag: "🇧🇫" },
  { code: "257", label: "Burundi", flag: "🇧🇮" },
  { code: "237", label: "Cameroon", flag: "🇨🇲" },
  { code: "238", label: "Cape Verde", flag: "🇨🇻" },
  { code: "236", label: "Central African Republic", flag: "🇨🇫" },
  { code: "235", label: "Chad", flag: "🇹🇩" },
  { code: "56", label: "Chile", flag: "🇨🇱" },
  { code: "86", label: "China", flag: "🇨🇳" },
  { code: "57", label: "Colombia", flag: "🇨🇴" },
  { code: "269", label: "Comoros", flag: "🇰🇲" },
  { code: "242", label: "Congo", flag: "🇨🇬" },
  { code: "506", label: "Costa Rica", flag: "🇨🇷" },
  { code: "385", label: "Croatia", flag: "🇭🇷" },
  { code: "357", label: "Cyprus", flag: "🇨🇾" },
  { code: "420", label: "Czech Republic", flag: "🇨🇿" },
  { code: "243", label: "DR Congo", flag: "🇨🇩" },
  { code: "45", label: "Denmark", flag: "🇩🇰" },
  { code: "253", label: "Djibouti", flag: "🇩🇯" },
  { code: "1809", label: "Dominican Republic", flag: "🇩🇴" },
  { code: "593", label: "Ecuador", flag: "🇪🇨" },
  { code: "20", label: "Egypt", flag: "🇪🇬" },
  { code: "503", label: "El Salvador", flag: "🇸🇻" },
  { code: "240", label: "Equatorial Guinea", flag: "🇬🇶" },
  { code: "291", label: "Eritrea", flag: "🇪🇷" },
  { code: "372", label: "Estonia", flag: "🇪🇪" },
  { code: "268", label: "Eswatini", flag: "🇸🇿" },
  { code: "251", label: "Ethiopia", flag: "🇪🇹" },
  { code: "679", label: "Fiji", flag: "🇫🇯" },
  { code: "358", label: "Finland", flag: "🇫🇮" },
  { code: "33", label: "France", flag: "🇫🇷" },
  { code: "241", label: "Gabon", flag: "🇬🇦" },
  { code: "49", label: "Germany", flag: "🇩🇪" },
  { code: "233", label: "Ghana", flag: "🇬🇭" },
  { code: "30", label: "Greece", flag: "🇬🇷" },
  { code: "502", label: "Guatemala", flag: "🇬🇹" },
  { code: "224", label: "Guinea", flag: "🇬🇳" },
  { code: "509", label: "Haiti", flag: "🇭🇹" },
  { code: "504", label: "Honduras", flag: "🇭🇳" },
  { code: "852", label: "Hong Kong", flag: "🇭🇰" },
  { code: "36", label: "Hungary", flag: "🇭🇺" },
  { code: "354", label: "Iceland", flag: "🇮🇸" },
  { code: "91", label: "India", flag: "🇮🇳" },
  { code: "62", label: "Indonesia", flag: "🇮🇩" },
  { code: "98", label: "Iran", flag: "🇮🇷" },
  { code: "964", label: "Iraq", flag: "🇮🇶" },
  { code: "353", label: "Ireland", flag: "🇮🇪" },
  { code: "972", label: "Israel", flag: "🇮🇱" },
  { code: "39", label: "Italy", flag: "🇮🇹" },
  { code: "225", label: "Ivory Coast", flag: "🇨🇮" },
  { code: "1876", label: "Jamaica", flag: "🇯🇲" },
  { code: "81", label: "Japan", flag: "🇯🇵" },
  { code: "962", label: "Jordan", flag: "🇯🇴" },
  { code: "965", label: "Kuwait", flag: "🇰🇼" },
  { code: "371", label: "Latvia", flag: "🇱🇻" },
  { code: "961", label: "Lebanon", flag: "🇱🇧" },
  { code: "266", label: "Lesotho", flag: "🇱🇸" },
  { code: "231", label: "Liberia", flag: "🇱🇷" },
  { code: "218", label: "Libya", flag: "🇱🇾" },
  { code: "370", label: "Lithuania", flag: "🇱🇹" },
  { code: "352", label: "Luxembourg", flag: "🇱🇺" },
  { code: "261", label: "Madagascar", flag: "🇲🇬" },
  { code: "265", label: "Malawi", flag: "🇲🇼" },
  { code: "60", label: "Malaysia", flag: "🇲🇾" },
  { code: "223", label: "Mali", flag: "🇲🇱" },
  { code: "356", label: "Malta", flag: "🇲🇹" },
  { code: "222", label: "Mauritania", flag: "🇲🇷" },
  { code: "230", label: "Mauritius", flag: "🇲🇺" },
  { code: "52", label: "Mexico", flag: "🇲🇽" },
  { code: "212", label: "Morocco", flag: "🇲🇦" },
  { code: "258", label: "Mozambique", flag: "🇲🇿" },
  { code: "95", label: "Myanmar", flag: "🇲🇲" },
  { code: "264", label: "Namibia", flag: "🇳🇦" },
  { code: "977", label: "Nepal", flag: "🇳🇵" },
  { code: "31", label: "Netherlands", flag: "🇳🇱" },
  { code: "64", label: "New Zealand", flag: "🇳🇿" },
  { code: "505", label: "Nicaragua", flag: "🇳🇮" },
  { code: "227", label: "Niger", flag: "🇳🇪" },
  { code: "234", label: "Nigeria", flag: "🇳🇬" },
  { code: "47", label: "Norway", flag: "🇳🇴" },
  { code: "968", label: "Oman", flag: "🇴🇲" },
  { code: "92", label: "Pakistan", flag: "🇵🇰" },
  { code: "507", label: "Panama", flag: "🇵🇦" },
  { code: "675", label: "Papua New Guinea", flag: "🇵🇬" },
  { code: "595", label: "Paraguay", flag: "🇵🇾" },
  { code: "51", label: "Peru", flag: "🇵🇪" },
  { code: "63", label: "Philippines", flag: "🇵🇭" },
  { code: "48", label: "Poland", flag: "🇵🇱" },
  { code: "351", label: "Portugal", flag: "🇵🇹" },
  { code: "974", label: "Qatar", flag: "🇶🇦" },
  { code: "40", label: "Romania", flag: "🇷🇴" },
  { code: "7", label: "Russia", flag: "🇷🇺" },
  { code: "250", label: "Rwanda", flag: "🇷🇼" },
  { code: "966", label: "Saudi Arabia", flag: "🇸🇦" },
  { code: "221", label: "Senegal", flag: "🇸🇳" },
  { code: "381", label: "Serbia", flag: "🇷🇸" },
  { code: "248", label: "Seychelles", flag: "🇸🇨" },
  { code: "232", label: "Sierra Leone", flag: "🇸🇱" },
  { code: "65", label: "Singapore", flag: "🇸🇬" },
  { code: "421", label: "Slovakia", flag: "🇸🇰" },
  { code: "386", label: "Slovenia", flag: "🇸🇮" },
  { code: "252", label: "Somalia", flag: "🇸🇴" },
  { code: "27", label: "South Africa", flag: "🇿🇦" },
  { code: "82", label: "South Korea", flag: "🇰🇷" },
  { code: "211", label: "South Sudan", flag: "🇸🇸" },
  { code: "34", label: "Spain", flag: "🇪🇸" },
  { code: "94", label: "Sri Lanka", flag: "🇱🇰" },
  { code: "249", label: "Sudan", flag: "🇸🇩" },
  { code: "46", label: "Sweden", flag: "🇸🇪" },
  { code: "41", label: "Switzerland", flag: "🇨🇭" },
  { code: "239", label: "São Tomé", flag: "🇸🇹" },
  { code: "886", label: "Taiwan", flag: "🇹🇼" },
  { code: "255", label: "Tanzania", flag: "🇹🇿" },
  { code: "66", label: "Thailand", flag: "🇹🇭" },
  { code: "228", label: "Togo", flag: "🇹🇬" },
  { code: "1868", label: "Trinidad", flag: "🇹🇹" },
  { code: "216", label: "Tunisia", flag: "🇹🇳" },
  { code: "90", label: "Turkey", flag: "🇹🇷" },
  { code: "971", label: "UAE", flag: "🇦🇪" },
  { code: "44", label: "UK", flag: "🇬🇧" },
  { code: "1", label: "US/Canada", flag: "🇺🇸" },
  { code: "256", label: "Uganda", flag: "🇺🇬" },
  { code: "380", label: "Ukraine", flag: "🇺🇦" },
  { code: "598", label: "Uruguay", flag: "🇺🇾" },
  { code: "58", label: "Venezuela", flag: "🇻🇪" },
  { code: "84", label: "Vietnam", flag: "🇻🇳" },
  { code: "260", label: "Zambia", flag: "🇿🇲" },
  { code: "263", label: "Zimbabwe", flag: "🇿🇼" },
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
          className={`rounded-l-lg border px-2 py-3 text-sm ${baseClasses} ${focusClasses}`}
          style={{ minWidth: "120px" }}
        >
          {COUNTRY_OPTIONS.map((country, i) => (
            <option key={`${country.code}-${i}`} value={country.code}>
              {country.label} {country.flag} +{country.code}
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
