import { DollarSign, AlertTriangle, Info } from 'lucide-react'
import { FEES, FINES, CITY_NAME } from '@/lib/constants'

const feeSchedule = [
  { item: 'Annual registration / renewal', amount: `$${FEES.annualPerUnit.toFixed(2)} per residential unit` },
  { item: 'Building audit administration', amount: `$${FEES.buildingAuditAdmin.toFixed(2)}` },
  { item: 'Audit inspection', amount: `$${FEES.auditInspectionPerHour.toFixed(2)}/hr per officer` },
  { item: 'Re-evaluation', amount: `$${FEES.reEvaluation.toFixed(2)} per building` },
  { item: 'Colour-coded sign replacement', amount: `$${FEES.signReplacementMin.toFixed(2)}–$${FEES.signReplacementMax.toFixed(2)} + tax` },
]

const finesSchedule = [
  { offence: 'Fail to register building', fine: FINES.failToRegister, max: false },
  { offence: 'Registration not up to date', fine: FINES.registrationNotUpToDate, max: false },
  { offence: 'No tenant notification board', fine: FINES.noNotificationBoard, max: false },
  { offence: 'Urgent request not answered within 24 hours', fine: FINES.urgentRequestNotAnswered, max: false },
  { offence: 'No pest inspection every 30 days', fine: FINES.noPestInspection, max: false },
  { offence: 'Renting unit with pest infestation', fine: FINES.rentingWithPests, max: false },
  { offence: 'Court conviction', fine: FINES.courtConvictionMax, max: true },
]

export default function Fees() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Fees &amp; Fines</h1>
        <p className="mt-1 text-gray-600">
          2026 {CITY_NAME} Apartment Compliance fee schedule and common fine amounts.
        </p>
      </div>

      {/* Info alert */}
      <div className="mb-6 flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Fees are waived for qualifying non-profit social housing providers.
          Contact us to confirm eligibility.
        </p>
      </div>

      {/* Fee Schedule */}
      <div className="mb-8 rounded-lg border overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b bg-white">
          <DollarSign className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">2026 Fee Schedule</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-gray-700">Fee Item</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-700">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {feeSchedule.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium text-gray-800">{row.item}</td>
                <td className="px-6 py-3 text-right tabular-nums text-gray-700">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fines */}
      <div className="rounded-lg border overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b bg-white">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <h2 className="text-lg font-semibold text-gray-900">Common Fines</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-gray-700">Offence</th>
              <th className="text-right px-6 py-3 font-semibold text-gray-700">Fine</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {finesSchedule.map((row, i) => (
              <tr key={i} className={row.max ? 'bg-red-50' : 'hover:bg-gray-50'}>
                <td className="px-6 py-3 font-medium text-gray-800">{row.offence}</td>
                <td className="px-6 py-3 text-right tabular-nums font-semibold text-red-700">
                  {row.max ? `Up to $${row.fine.toLocaleString()}` : `$${row.fine.toFixed(2)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        All amounts in Canadian dollars. Fees and fines subject to change without notice.
      </p>
    </div>
  )
}
