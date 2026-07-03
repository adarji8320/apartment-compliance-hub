import { Link } from 'react-router-dom';
import {
  Building2,
  RefreshCw,
  Wrench,
  Star,
  AlertTriangle,
  Bell,
  CreditCard,
  ClipboardCheck,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useBuildings } from '@/hooks/useBuildings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ColourRatingBadge } from '@/components/badges/ColourRatingBadge';
import { StatusBadge } from '@/components/badges/StatusBadge';
import { MOCK_SERVICE_REQUESTS } from '@/data/mockServiceRequests';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const { user } = useAuth();
  const { allBuildings, stats } = useBuildings();
  const {
    totalBuildings,
    renewalDue: renewalDueCount,
    avgScore: averageScore,
    nextRenewalDate,
  } = stats;

  const openServiceRequests = MOCK_SERVICE_REQUESTS.filter((r) => r.status !== 'resolved');
  const urgentOpen = MOCK_SERVICE_REQUESTS.filter(
    (r) => r.urgency === 'urgent' && r.status !== 'resolved',
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.ownerName}</h1>
        <p className="text-sm text-gray-500">{user?.companyName}</p>
      </div>

      {/* Alert banners */}
      <div className="space-y-3">
        {renewalDueCount > 0 && nextRenewalDate && (
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            <AlertTitle>Renewal Deadline — {formatDate(nextRenewalDate)}</AlertTitle>
            <AlertDescription>
              {renewalDueCount} building{renewalDueCount !== 1 ? 's are' : ' is'} due for renewal.{' '}
              <Link to="/renewal" className="underline font-medium">
                Renew now →
              </Link>
            </AlertDescription>
          </Alert>
        )}

        <Alert variant="info">
          <Bell className="h-4 w-4" aria-hidden="true" />
          <AlertTitle>Colour Sign Posting Required — June 15, 2026</AlertTitle>
          <AlertDescription>
            All registered buildings must display the colour-coded compliance sign at the main
            entrance.{' '}
            <Link to="/compliance" className="underline font-medium">
              Check compliance →
            </Link>
          </AlertDescription>
        </Alert>

        {urgentOpen.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            <AlertTitle>
              {urgentOpen.length} Urgent Service Request{urgentOpen.length !== 1 ? 's' : ''}{' '}
              Outstanding
            </AlertTitle>
            <AlertDescription>
              Urgent requests must be resolved within 24 hours to avoid fines.{' '}
              <Link to="/service-requests" className="underline font-medium">
                View requests →
              </Link>
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Buildings</CardTitle>
            <Building2 className="h-4 w-4 text-brand" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{totalBuildings}</p>
            <p className="text-xs text-gray-500 mt-1">Registered properties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Renewals Due</CardTitle>
            <RefreshCw className="h-4 w-4 text-orange-500" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">{renewalDueCount}</p>
            <p className="text-xs text-gray-500 mt-1">
              {nextRenewalDate ? `By ${formatDate(nextRenewalDate)}` : 'No upcoming renewals'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Service Requests</CardTitle>
            <Wrench className="h-4 w-4 text-blue-500" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{openServiceRequests.length}</p>
            <p className="text-xs text-gray-500 mt-1">{urgentOpen.length} urgent open</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg. Compliance Score
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-500" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{averageScore}</p>
            <p className="text-xs text-gray-500 mt-1">Out of 100</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-3 text-base font-semibold text-gray-700">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/renewal">
            <Button className="gap-2 bg-brand hover:bg-brand/90">
              <CreditCard className="h-4 w-4" aria-hidden="true" />
              Pay Invoice
            </Button>
          </Link>
          <Link to="/service-requests">
            <Button variant="outline" className="gap-2 border-brand text-brand">
              <Wrench className="h-4 w-4" aria-hidden="true" />
              Submit Service Request
            </Button>
          </Link>
          <Link to="/compliance">
            <Button variant="outline" className="gap-2">
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              View Compliance Checklist
            </Button>
          </Link>
        </div>
      </div>

      {/* Buildings overview */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-700">Buildings Overview</h2>
          <Link to="/buildings" className="text-sm text-brand underline underline-offset-2">
            View all →
          </Link>
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead scope="col">Address</TableHead>
                  <TableHead scope="col" className="text-center">
                    Units
                  </TableHead>
                  <TableHead scope="col">Colour Rating</TableHead>
                  <TableHead scope="col">Status</TableHead>
                  <TableHead scope="col">Renewal Date</TableHead>
                  <TableHead scope="col">Annual Fee</TableHead>
                  <TableHead scope="col" className="text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allBuildings.map((building) => (
                  <TableRow key={building.id}>
                    <TableCell className="font-medium">{building.address}</TableCell>
                    <TableCell className="text-center">{building.units}</TableCell>
                    <TableCell>
                      <ColourRatingBadge rating={building.colourRating} showLabel={false} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={building.status} />
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {formatDate(building.renewalDate)}
                    </TableCell>
                    <TableCell className="tabular-nums text-sm">
                      {formatCurrency(building.annualFee)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link to="/evaluation">
                          <Button variant="ghost" size="sm">
                            Eval
                          </Button>
                        </Link>
                        <Link to="/service-requests">
                          <Button variant="ghost" size="sm">
                            Request
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
