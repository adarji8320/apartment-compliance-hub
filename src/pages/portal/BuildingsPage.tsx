import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useBuildings } from '@/hooks/useBuildings'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ColourRatingBadge } from '@/components/badges/ColourRatingBadge'
import { StatusBadge } from '@/components/badges/StatusBadge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { ColourRating, RegistrationStatus } from '@/types'

export default function BuildingsPage() {
  const { buildings, allBuildings, filters, setFilters } = useBuildings()

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Buildings</h1>
        <p className="text-sm text-gray-500">Manage your registered apartment buildings</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Search by address…"
            className="pl-9"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            aria-label="Search buildings by address"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gray-500" aria-hidden="true" />
          <Select
            value={filters.status}
            onValueChange={(v) =>
              setFilters({ ...filters, status: v as RegistrationStatus | 'all' })
            }
          >
            <SelectTrigger className="w-40" aria-label="Filter by status">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Renewal Due">Renewal Due</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.colourRating}
            onValueChange={(v) =>
              setFilters({ ...filters, colourRating: v as ColourRating | 'all' })
            }
          >
            <SelectTrigger className="w-44" aria-label="Filter by colour rating">
              <SelectValue placeholder="All Ratings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="green">Green — Good Standing</SelectItem>
              <SelectItem value="yellow">Yellow — Needs Improvement</SelectItem>
              <SelectItem value="red">Red — Significant Issues</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {buildings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search className="mb-3 h-10 w-10 text-gray-300" aria-hidden="true" />
              <p className="font-medium text-gray-500">No buildings match your filters</p>
              <p className="mt-1 text-sm text-gray-400">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => setFilters({ search: '', status: 'all', colourRating: 'all' })}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead scope="col">Building Address</TableHead>
                  <TableHead scope="col" className="text-center">Units</TableHead>
                  <TableHead scope="col" className="text-center">Storeys</TableHead>
                  <TableHead scope="col">Colour Rating</TableHead>
                  <TableHead scope="col">Status</TableHead>
                  <TableHead scope="col" className="text-center">Score</TableHead>
                  <TableHead scope="col">Annual Fee</TableHead>
                  <TableHead scope="col">Renewal Date</TableHead>
                  <TableHead scope="col" className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buildings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{b.address}</p>
                        <p className="text-xs text-gray-500">{b.city} {b.postalCode}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{b.units}</TableCell>
                    <TableCell className="text-center">{b.storeys}</TableCell>
                    <TableCell>
                      <ColourRatingBadge rating={b.colourRating} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={b.status} />
                    </TableCell>
                    <TableCell className="text-center font-semibold">{b.score}</TableCell>
                    <TableCell className="tabular-nums text-sm">{formatCurrency(b.annualFee)}</TableCell>
                    <TableCell className="text-sm text-gray-600">{formatDate(b.renewalDate)}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Link to="/evaluation">
                          <Button variant="ghost" size="sm" className="text-xs">Eval</Button>
                        </Link>
                        <Link to="/service-requests">
                          <Button variant="ghost" size="sm" className="text-xs">Request</Button>
                        </Link>
                        <Link to="/compliance">
                          <Button variant="ghost" size="sm" className="text-xs">Compliance</Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="text-sm text-gray-500">
        Showing {buildings.length} of {allBuildings.length} buildings
      </div>
    </div>
  )
}
