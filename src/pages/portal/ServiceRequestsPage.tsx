import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusCircle, Clock, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ServiceRequestStatusBadge, UrgencyBadge } from '@/components/badges/StatusBadge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MOCK_SERVICE_REQUESTS } from '@/data/mockServiceRequests';
import { MOCK_BUILDINGS } from '@/data/mockBuildings';
import {
  getServiceRequestUrgency,
  getResponseDueDate,
  generateServiceRequestId,
  formatDate,
  formatCurrency,
  formatPhoneNumber,
} from '@/lib/utils';
import { SERVICE_REQUEST_TYPES, FINES } from '@/lib/constants';
import type { ServiceRequest, ServiceRequestType } from '@/types';

const requestSchema = z.object({
  buildingId: z.string().min(1, 'Building is required'),
  type: z.enum(
    [
      'pest-complaint',
      'no-heat',
      'no-hot-water',
      'elevator-outage',
      'electrical-issue',
      'cooling-issue',
      'general-maintenance',
      'notification-board',
      'other',
    ] as const,
    { error: 'Request type is required' },
  ),
  description: z.string().min(10, 'Please provide at least 10 characters'),
  unitNumber: z.string().min(1, 'Unit number is required'),
  tenantContact: z.string().optional(),
});

type RequestFormData = z.infer<typeof requestSchema>;

export default function ServiceRequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>(MOCK_SERVICE_REQUESTS);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: { buildingId: MOCK_BUILDINGS[0]?.id ?? '' },
  });

  const selectedType = watch('type') as ServiceRequestType | undefined;
  const urgency = selectedType ? getServiceRequestUrgency(selectedType) : null;

  async function onSubmit(data: RequestFormData) {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));

    const today = new Date();
    const now = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const requestUrgency = getServiceRequestUrgency(data.type);
    const building = MOCK_BUILDINGS.find((b) => b.id === data.buildingId);
    const newRequest: ServiceRequest = {
      id: generateServiceRequestId(),
      buildingId: data.buildingId,
      buildingAddress: building?.address ?? '',
      type: data.type,
      urgency: requestUrgency,
      description: data.description,
      unitNumber: data.unitNumber,
      tenantContact: data.tenantContact ?? '',
      dateSubmitted: now,
      responseDue: getResponseDueDate(now, requestUrgency),
      status: 'open',
    };

    setRequests((prev) => [newRequest, ...prev]);
    setSubmittedId(newRequest.id);
    setIsSubmitting(false);
    reset();
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Service Requests</h1>
        <p className="text-sm text-gray-500">Submit and track building service requests</p>
      </div>

      <Tabs defaultValue="submit">
        <TabsList>
          <TabsTrigger value="submit">
            <PlusCircle className="mr-1.5 h-4 w-4" aria-hidden="true" />
            New Request
          </TabsTrigger>
          <TabsTrigger value="history">History ({requests.length})</TabsTrigger>
        </TabsList>

        {/* Submit new request */}
        <TabsContent value="submit" className="mt-4">
          {submittedId && (
            <Alert variant="success" className="mb-4">
              <AlertDescription>
                Request <strong>{submittedId}</strong> submitted successfully. You will receive a
                response within the required timeframe.
              </AlertDescription>
            </Alert>
          )}

          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle className="text-base">Submit a Service Request</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="buildingId">Building *</Label>
                  <Select
                    defaultValue={MOCK_BUILDINGS[0]?.id}
                    onValueChange={(v) => setValue('buildingId', v)}
                  >
                    <SelectTrigger
                      id="buildingId"
                      aria-label="Select building"
                      aria-required="true"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_BUILDINGS.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.address}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.buildingId && (
                    <p className="text-xs text-red-600" role="alert">
                      {errors.buildingId.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="requestType">Request Type *</Label>
                  <Select onValueChange={(v) => setValue('type', v as ServiceRequestType)}>
                    <SelectTrigger
                      id="requestType"
                      aria-label="Request type"
                      aria-required="true"
                      aria-invalid={!!errors.type}
                    >
                      <SelectValue placeholder="Select type…" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_REQUEST_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                          {t.urgency === 'urgent' && ' ⚠ Urgent'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-xs text-red-600" role="alert">
                      {errors.type.message}
                    </p>
                  )}
                </div>

                {urgency && (
                  <Alert variant={urgency === 'urgent' ? 'destructive' : 'info'}>
                    {urgency === 'urgent' ? (
                      <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Clock className="h-4 w-4" aria-hidden="true" />
                    )}
                    <AlertDescription>
                      <strong>{urgency === 'urgent' ? 'Urgent' : 'Non-urgent'}:</strong>{' '}
                      {urgency === 'urgent'
                        ? `You must respond within 24 hours. Failure to respond may result in a ${formatCurrency(FINES.urgentRequestNotAnswered)} fine.`
                        : 'You must respond within 7 days.'}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the issue in detail…"
                    rows={4}
                    aria-required="true"
                    aria-invalid={!!errors.description}
                    {...register('description')}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-600" role="alert">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="unitNumber">Unit Number *</Label>
                    <Input
                      id="unitNumber"
                      placeholder="e.g. 4B or Lobby"
                      aria-required="true"
                      aria-invalid={!!errors.unitNumber}
                      {...register('unitNumber')}
                    />
                    {errors.unitNumber && (
                      <p className="text-xs text-red-600" role="alert">
                        {errors.unitNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="tenantContact">Tenant Contact (Optional)</Label>
                    <Input
                      id="tenantContact"
                      type="tel"
                      placeholder="555-555-0100"
                      {...register('tenantContact', {
                        onChange: (e) => {
                          setValue('tenantContact', formatPhoneNumber(e.target.value));
                        },
                      })}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-brand hover:bg-brand/90"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      Submitting…
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardContent className="p-0">
              {requests.length === 0 ? (
                <div className="py-12 text-center text-gray-500">No service requests found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead scope="col">Request ID</TableHead>
                      <TableHead scope="col">Building</TableHead>
                      <TableHead scope="col">Type</TableHead>
                      <TableHead scope="col">Urgency</TableHead>
                      <TableHead scope="col">Date Submitted</TableHead>
                      <TableHead scope="col">Response Due</TableHead>
                      <TableHead scope="col">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((req) => {
                      const typeLabel =
                        SERVICE_REQUEST_TYPES.find((t) => t.value === req.type)?.label ?? req.type;
                      return (
                        <TableRow key={req.id}>
                          <TableCell className="font-mono text-xs">{req.id}</TableCell>
                          <TableCell className="text-sm">{req.buildingAddress}</TableCell>
                          <TableCell className="text-sm">{typeLabel}</TableCell>
                          <TableCell>
                            <UrgencyBadge urgency={req.urgency} />
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {formatDate(req.dateSubmitted)}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {formatDate(req.responseDue)}
                          </TableCell>
                          <TableCell>
                            <ServiceRequestStatusBadge status={req.status} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          <Separator className="my-4" />
          <p className="text-xs text-gray-500">
            Urgent requests must be resolved within <strong>24 hours</strong>. Non-urgent requests
            within <strong>7 days</strong>. Failure to respond to urgent requests may result in a{' '}
            {formatCurrency(FINES.urgentRequestNotAnswered)} fine.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
