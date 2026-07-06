import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, CreditCard, Loader2, AlertTriangle } from 'lucide-react';
import { useBuildings } from '@/hooks/useBuildings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StatusBadge } from '@/components/badges/StatusBadge';
import {
  formatCurrency,
  formatDate,
  formatCardNumber,
  formatExpiryDate,
  addYears,
  isPastDue,
} from '@/lib/utils';
import { FEES, FINES } from '@/lib/constants';
import type { CardType, RegistrationStatus } from '@/types';

const paymentSchema = z.object({
  cardholderName: z.string().min(1, 'Cardholder name is required'),
  cardNumber: z
    .string()
    .min(1, 'Card number is required')
    .regex(/^[\d\s]{13,19}$/, 'Enter a valid card number'),
  expiryDate: z
    .string()
    .min(1, 'Expiry date is required')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Enter MM/YY format'),
  cvv: z
    .string()
    .min(3, 'CVV must be 3–4 digits')
    .max(4, 'CVV must be 3–4 digits')
    .regex(/^\d{3,4}$/, 'CVV must be numeric'),
  cardType: z.enum(['visa', 'mastercard', 'amex'] as const),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function RenewalPage() {
  const { allBuildings, stats } = useBuildings();
  const renewalDueBuildings = allBuildings.filter((b) => b.status === 'Renewal Due');
  const [selectedBuildingId, setSelectedBuildingId] = useState(renewalDueBuildings[0]?.id ?? '');
  const [paymentDone, setPaymentDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBuilding = renewalDueBuildings.find((b) => b.id === selectedBuildingId);
  const isOverdue = stats.nextRenewalDate ? isPastDue(stats.nextRenewalDate) : false;
  const isSelectedPastDue = selectedBuilding ? isPastDue(selectedBuilding.renewalDate) : false;
  const displayStatus: RegistrationStatus | undefined =
    selectedBuilding && selectedBuilding.status === 'Renewal Due' && isSelectedPastDue
      ? 'Expired'
      : selectedBuilding?.status;
  const lateFine = isSelectedPastDue ? FINES.registrationNotUpToDate : 0;
  const totalOwing = selectedBuilding ? selectedBuilding.annualFee + lateFine : 0;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { cardType: 'visa' },
  });

  const cardNumber = watch('cardNumber', '');

  async function onSubmit() {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setPaymentDone(true);
  }

  if (paymentDone && selectedBuilding) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <Card>
          <CardContent className="py-10 text-center space-y-4">
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" aria-hidden="true" />
            <h1 className="text-xl font-bold text-gray-900">Payment Received!</h1>
            <p className="text-sm text-gray-600">
              Registration for <strong>{selectedBuilding.address}</strong> has been renewed.
            </p>
            <div className="rounded-lg border bg-green-50 p-4 text-left">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Building</dt>
                  <dd className="font-medium">{selectedBuilding.address}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Amount paid</dt>
                  <dd className="font-medium">{formatCurrency(totalOwing)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Valid until</dt>
                  <dd className="font-medium">
                    {formatDate(addYears(selectedBuilding.renewalDate, 1))}
                  </dd>
                </div>
              </dl>
            </div>
            <Button onClick={() => setPaymentDone(false)} variant="outline" size="sm">
              Renew another building
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Annual Renewal</h1>
        <p className="text-sm text-gray-500">
          Renew your building registration
          {stats.nextRenewalDate && ` — due ${formatDate(stats.nextRenewalDate)}`}
        </p>
      </div>

      {renewalDueBuildings.length > 0 && (
        <Alert variant={isOverdue ? 'destructive' : 'warning'}>
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          <AlertTitle>
            {isOverdue
              ? `Registration Overdue${stats.nextRenewalDate ? ` Since ${formatDate(stats.nextRenewalDate)}` : ''}`
              : `Renewal Deadline${stats.nextRenewalDate ? `: ${formatDate(stats.nextRenewalDate)}` : ''}`}
          </AlertTitle>
          <AlertDescription>
            {isOverdue
              ? `A fine of ${formatCurrency(FINES.registrationNotUpToDate)} has been applied. Pay now to avoid further penalties.`
              : `Late renewal may result in fines up to ${formatCurrency(FINES.registrationNotUpToDate)}.`}{' '}
            Only Visa, MasterCard, and Amex are accepted. Visa Debit is not supported.
          </AlertDescription>
        </Alert>
      )}

      {renewalDueBuildings.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-600" aria-hidden="true" />
            <p className="font-medium text-gray-900">No buildings currently need renewal</p>
            <p className="mt-1 text-sm text-gray-500">
              All your registered buildings are up to date.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Building selector */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Select Building</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedBuildingId} onValueChange={setSelectedBuildingId}>
                <SelectTrigger aria-label="Select building to renew">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {renewalDueBuildings.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.address} ({b.units} units)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Invoice card */}
          {selectedBuilding && (
            <Card className="border-brand">
              <CardHeader className="bg-brand text-white rounded-t-lg pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="h-4 w-4" aria-hidden="true" />
                  Invoice — {selectedBuilding.address}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Building</dt>
                    <dd className="font-medium">{selectedBuilding.address}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Status</dt>
                    <dd>
                      <StatusBadge status={displayStatus ?? selectedBuilding.status} />
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Residential units</dt>
                    <dd className="font-medium">{selectedBuilding.units}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Fee per unit</dt>
                    <dd className="font-medium">{formatCurrency(FEES.annualPerUnit)}</dd>
                  </div>
                  {lateFine > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-red-600">Late payment fine</dt>
                      <dd className="font-medium text-red-600">{formatCurrency(lateFine)}</dd>
                    </div>
                  )}
                </dl>
                <Separator className="my-2" />
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between font-semibold text-base">
                    <dt>Total owing</dt>
                    <dd className="text-brand">{formatCurrency(totalOwing)}</dd>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <dt>Due date</dt>
                    <dd>{formatDate(selectedBuilding.renewalDate)}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          )}

          {/* Payment form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cardType">Card Type</Label>
                  <Select
                    defaultValue="visa"
                    onValueChange={(v) => setValue('cardType', v as CardType)}
                  >
                    <SelectTrigger id="cardType" aria-label="Card type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visa">Visa</SelectItem>
                      <SelectItem value="mastercard">MasterCard</SelectItem>
                      <SelectItem value="amex">American Express</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Visa Debit is not supported.</p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    placeholder="As it appears on your card"
                    autoComplete="cc-name"
                    aria-invalid={!!errors.cardholderName}
                    {...register('cardholderName')}
                  />
                  {errors.cardholderName && (
                    <p className="text-xs text-red-600" role="alert">
                      {errors.cardholderName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    maxLength={19}
                    aria-invalid={!!errors.cardNumber}
                    value={formatCardNumber(cardNumber)}
                    {...register('cardNumber', {
                      onChange: (e) => {
                        setValue('cardNumber', formatCardNumber(e.target.value));
                      },
                    })}
                  />
                  {errors.cardNumber && (
                    <p className="text-xs text-red-600" role="alert">
                      {errors.cardNumber.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      inputMode="numeric"
                      maxLength={5}
                      autoComplete="cc-exp"
                      aria-invalid={!!errors.expiryDate}
                      {...register('expiryDate', {
                        onChange: (e) => {
                          setValue('expiryDate', formatExpiryDate(e.target.value));
                        },
                      })}
                    />
                    {errors.expiryDate && (
                      <p className="text-xs text-red-600" role="alert">
                        {errors.expiryDate.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="3–4 digits"
                      inputMode="numeric"
                      maxLength={4}
                      autoComplete="cc-csc"
                      type="password"
                      aria-invalid={!!errors.cvv}
                      {...register('cvv')}
                    />
                    {errors.cvv && (
                      <p className="text-xs text-red-600" role="alert">
                        {errors.cvv.message}
                      </p>
                    )}
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
                      Processing…
                    </>
                  ) : (
                    `Pay ${selectedBuilding ? formatCurrency(totalOwing) : ''}`
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
