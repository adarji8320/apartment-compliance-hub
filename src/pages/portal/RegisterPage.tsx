import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  cn,
  calculateAnnualFee,
  formatCurrency,
  formatPhoneNumber,
  generateReferenceNumber,
} from '@/lib/utils';
import { CITY_NAME, CONTACT_EMAIL, CONTACT_PHONE, FEES, WARDS } from '@/lib/constants';
import type { BuildingType } from '@/types';

const step1Schema = z.object({
  streetAddress: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z
    .string()
    .regex(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, 'Enter a valid postal code'),
  storeys: z
    .number({ error: 'Number of storeys is required' })
    .int()
    .min(3, 'Minimum 3 storeys required to register'),
  units: z
    .number({ error: 'Number of units is required' })
    .int()
    .min(10, 'Minimum 10 residential units required to register'),
  yearBuilt: z
    .number({ error: 'Year built is required' })
    .int()
    .min(1800)
    .max(new Date().getFullYear()),
  buildingType: z.enum(['rental-apartment', 'mixed-use', 'other'] as const),
  ward: z.string().min(1, 'Ward is required'),
});

const step2Schema = z.object({
  ownerName: z.string().min(1, 'Owner name is required'),
  companyName: z.string().optional(),
  mailingAddress: z.string().optional(),
  businessPhone: z
    .string()
    .min(1, 'Business phone is required')
    .regex(/^[\d\s\-()+.]+$/, 'Enter a valid phone number'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  authorizedContactName: z.string().optional(),
  authorizedContactPhone: z.string().optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

interface FormState {
  step1: Partial<Step1Data>;
  step2: Partial<Step2Data>;
}

const STEPS = ['Property Details', 'Owner Details', 'Review & Submit', 'Confirmation'];

function StepIndicator({
  currentStep,
  onStepClick,
}: {
  currentStep: number;
  onStepClick: (step: number) => void;
}) {
  const canNavigateBack = currentStep < STEPS.length;

  return (
    <nav aria-label="Registration progress" className="mb-8">
      <ol className="flex items-center gap-0">
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const isDone = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          const isClickable = isDone && canNavigateBack;

          const circleAndLabel = (
            <>
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold',
                  isDone
                    ? 'border-brand bg-brand text-white'
                    : isActive
                      ? 'border-brand bg-white text-brand'
                      : 'border-gray-300 bg-white text-gray-500',
                )}
                aria-current={isActive ? 'step' : undefined}
              >
                {isDone ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : stepNum}
              </div>
              <span
                className={cn(
                  'mt-1 text-xs text-center hidden sm:block',
                  isActive ? 'font-medium text-brand' : isDone ? 'text-brand' : 'text-gray-500',
                )}
              >
                {label}
              </span>
            </>
          );

          return (
            <li key={label} className="flex items-center flex-1 last:flex-none">
              {isClickable ? (
                <button
                  type="button"
                  onClick={() => onStepClick(stepNum)}
                  className="flex flex-col items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Go back to step ${stepNum}: ${label}`}
                >
                  {circleAndLabel}
                </button>
              ) : (
                <div className="flex flex-col items-center">{circleAndLabel}</div>
              )}
              {i < STEPS.length - 1 && (
                <div
                  className={cn('mx-2 h-0.5 flex-1', isDone ? 'bg-brand' : 'bg-gray-200')}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState<FormState>({
    step1: {},
    step2: {},
  });
  const [declaration, setDeclaration] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceNumber] = useState(generateReferenceNumber);

  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      city: CITY_NAME,
      buildingType: 'rental-apartment',
      ...formState.step1,
    },
  });

  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: formState.step2,
  });

  function handleStep1Submit(data: Step1Data) {
    setFormState((s) => ({ ...s, step1: data }));
    setCurrentStep(2);
  }

  function handleStep2Submit(data: Step2Data) {
    setFormState((s) => ({ ...s, step2: data }));
    setCurrentStep(3);
  }

  async function handleFinalSubmit() {
    if (!declaration) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setCurrentStep(4);
  }

  const step1Data = formState.step1 as Step1Data;
  const step2Data = formState.step2 as Step2Data;
  const fee = step1Data.units ? calculateAnnualFee(step1Data.units) : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Register a Building</h1>
        <p className="text-sm text-gray-500">
          Complete all steps to submit your building registration.
        </p>
      </div>

      <StepIndicator currentStep={currentStep} onStepClick={setCurrentStep} />

      {/* Step 1 — Property Details */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form1.handleSubmit(handleStep1Submit)} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="streetAddress">Street Address *</Label>
                <Input
                  id="streetAddress"
                  placeholder="e.g. 123 Maple Street"
                  aria-required="true"
                  aria-invalid={!!form1.formState.errors.streetAddress}
                  {...form1.register('streetAddress')}
                />
                {form1.formState.errors.streetAddress && (
                  <p className="text-xs text-red-600" role="alert">
                    {form1.formState.errors.streetAddress.message}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...form1.register('city')}
                    aria-invalid={!!form1.formState.errors.city}
                  />
                  {form1.formState.errors.city && (
                    <p className="text-xs text-red-600" role="alert">
                      {form1.formState.errors.city.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    placeholder="A1A 1A1"
                    {...form1.register('postalCode')}
                    aria-invalid={!!form1.formState.errors.postalCode}
                  />
                  {form1.formState.errors.postalCode && (
                    <p className="text-xs text-red-600" role="alert">
                      {form1.formState.errors.postalCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="storeys">Number of Storeys *</Label>
                  <Input
                    id="storeys"
                    type="number"
                    min={3}
                    placeholder="Minimum 3"
                    aria-required="true"
                    aria-invalid={!!form1.formState.errors.storeys}
                    aria-describedby={form1.formState.errors.storeys ? 'storeys-error' : undefined}
                    {...form1.register('storeys', { valueAsNumber: true })}
                  />
                  {form1.formState.errors.storeys && (
                    <p id="storeys-error" className="text-xs text-red-600" role="alert">
                      {form1.formState.errors.storeys.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="units">Residential Units *</Label>
                  <Input
                    id="units"
                    type="number"
                    min={10}
                    placeholder="Minimum 10"
                    aria-required="true"
                    aria-invalid={!!form1.formState.errors.units}
                    aria-describedby={form1.formState.errors.units ? 'units-error' : undefined}
                    {...form1.register('units', { valueAsNumber: true })}
                  />
                  {form1.formState.errors.units && (
                    <p id="units-error" className="text-xs text-red-600" role="alert">
                      {form1.formState.errors.units.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <Input
                    id="yearBuilt"
                    type="number"
                    placeholder="e.g. 1985"
                    {...form1.register('yearBuilt', { valueAsNumber: true })}
                    aria-invalid={!!form1.formState.errors.yearBuilt}
                  />
                  {form1.formState.errors.yearBuilt && (
                    <p className="text-xs text-red-600" role="alert">
                      {form1.formState.errors.yearBuilt.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="buildingType">Building Type</Label>
                  <Select
                    defaultValue={form1.getValues('buildingType')}
                    onValueChange={(v) => form1.setValue('buildingType', v as BuildingType)}
                  >
                    <SelectTrigger id="buildingType" aria-label="Building type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rental-apartment">Rental Apartment</SelectItem>
                      <SelectItem value="mixed-use">Mixed Use</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ward">Ward *</Label>
                <Select
                  defaultValue={form1.getValues('ward')}
                  onValueChange={(v) => form1.setValue('ward', v)}
                >
                  <SelectTrigger
                    id="ward"
                    aria-label="Ward"
                    aria-required="true"
                    aria-invalid={!!form1.formState.errors.ward}
                  >
                    <SelectValue placeholder="Select ward" />
                  </SelectTrigger>
                  <SelectContent>
                    {WARDS.map((ward) => (
                      <SelectItem key={ward} value={ward}>
                        {ward}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form1.formState.errors.ward && (
                  <p className="text-xs text-red-600" role="alert">
                    {form1.formState.errors.ward.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" className="bg-brand hover:bg-brand/90 gap-2">
                  Next: Owner Details
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Step 2 — Owner Details */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Owner / Operator Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form2.handleSubmit(handleStep2Submit)} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="ownerName">Owner Full Legal Name *</Label>
                <Input
                  id="ownerName"
                  placeholder="Full legal name of owner"
                  aria-required="true"
                  aria-invalid={!!form2.formState.errors.ownerName}
                  {...form2.register('ownerName')}
                />
                {form2.formState.errors.ownerName && (
                  <p className="text-xs text-red-600" role="alert">
                    {form2.formState.errors.ownerName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="companyName">Company / Corporation Name</Label>
                <Input id="companyName" placeholder="Optional" {...form2.register('companyName')} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="mailingAddress">Mailing Address (if different from building)</Label>
                <Input
                  id="mailingAddress"
                  placeholder="Optional"
                  {...form2.register('mailingAddress')}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="businessPhone">Business Phone *</Label>
                  <Input
                    id="businessPhone"
                    type="tel"
                    placeholder="555-123-4567"
                    aria-required="true"
                    aria-invalid={!!form2.formState.errors.businessPhone}
                    {...form2.register('businessPhone', {
                      onChange: (e) => {
                        form2.setValue('businessPhone', formatPhoneNumber(e.target.value));
                      },
                    })}
                  />
                  {form2.formState.errors.businessPhone && (
                    <p className="text-xs text-red-600" role="alert">
                      {form2.formState.errors.businessPhone.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="owner@example.com"
                    aria-required="true"
                    aria-invalid={!!form2.formState.errors.email}
                    {...form2.register('email')}
                  />
                  {form2.formState.errors.email && (
                    <p className="text-xs text-red-600" role="alert">
                      {form2.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="authorizedContactName">Authorized Contact Name</Label>
                  <Input
                    id="authorizedContactName"
                    placeholder="Optional"
                    {...form2.register('authorizedContactName')}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="authorizedContactPhone">Authorized Contact Phone</Label>
                  <Input
                    id="authorizedContactPhone"
                    type="tel"
                    placeholder="Optional"
                    {...form2.register('authorizedContactPhone', {
                      onChange: (e) => {
                        form2.setValue('authorizedContactPhone', formatPhoneNumber(e.target.value));
                      },
                    })}
                  />
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Back
                </Button>
                <Button type="submit" className="bg-brand hover:bg-brand/90 gap-2">
                  Next: Review
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Step 3 — Review & Submit */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Review &amp; Submit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Property summary */}
            <section aria-labelledby="property-review">
              <h3
                id="property-review"
                className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3"
              >
                Property Details
              </h3>
              <dl className="grid gap-y-2 sm:grid-cols-2">
                {[
                  ['Street Address', step1Data.streetAddress],
                  ['City', step1Data.city],
                  ['Postal Code', step1Data.postalCode],
                  ['Storeys', String(step1Data.storeys)],
                  ['Residential Units', String(step1Data.units)],
                  ['Year Built', String(step1Data.yearBuilt)],
                  ['Building Type', step1Data.buildingType?.replace('-', ' ')],
                  ['Ward', step1Data.ward],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col">
                    <dt className="text-xs text-gray-500">{label}</dt>
                    <dd className="text-sm font-medium text-gray-900 capitalize">{value ?? '—'}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <Separator />

            {/* Owner summary */}
            <section aria-labelledby="owner-review">
              <h3
                id="owner-review"
                className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3"
              >
                Owner / Operator Details
              </h3>
              <dl className="grid gap-y-2 sm:grid-cols-2">
                {[
                  ['Owner Name', step2Data.ownerName],
                  ['Company', step2Data.companyName || '—'],
                  ['Business Phone', step2Data.businessPhone],
                  ['Email', step2Data.email],
                  ['Authorized Contact', step2Data.authorizedContactName || '—'],
                  ['Contact Phone', step2Data.authorizedContactPhone || '—'],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col">
                    <dt className="text-xs text-gray-500">{label}</dt>
                    <dd className="text-sm font-medium text-gray-900">{value ?? '—'}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <Separator />

            {/* Fee calculation */}
            <div className="rounded-lg border bg-blue-50 p-4">
              <h3 className="text-sm font-semibold text-brand mb-2">Annual Fee Calculation</h3>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-gray-600">
                  {step1Data.units} units × ${FEES.annualPerUnit.toFixed(2)} per unit
                </span>
                <span className="text-xl font-bold text-brand">{formatCurrency(fee)}</span>
              </div>
              <p className="mt-1 text-xs text-gray-600">
                Due upon registration. Payable by credit card (Visa, MasterCard, Amex).
              </p>
            </div>

            {/* Declaration */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="declaration"
                checked={declaration}
                onCheckedChange={(c) => setDeclaration(c === true)}
                aria-required="true"
              />
              <Label htmlFor="declaration" className="text-sm leading-relaxed cursor-pointer">
                I certify that the information provided is true and accurate to the best of my
                knowledge. I understand that providing false information may result in fines or
                cancellation of registration.
              </Label>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)} className="gap-2">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Back
              </Button>
              <Button
                onClick={handleFinalSubmit}
                disabled={!declaration || isSubmitting}
                className="bg-brand hover:bg-brand/90 gap-2"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting…
                  </>
                ) : (
                  'Submit Registration'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4 — Confirmation */}
      {currentStep === 4 && (
        <Card>
          <CardContent className="py-10 text-center space-y-4">
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" aria-hidden="true" />
            <h2 className="text-xl font-bold text-gray-900">
              Registration Submitted Successfully!
            </h2>
            <p className="text-sm text-gray-600">
              Your reference number is:{' '}
              <strong className="text-brand font-mono text-base">{referenceNumber}</strong>
            </p>
            <Alert variant="success" className="text-left max-w-md mx-auto">
              <AlertTitle>What happens next?</AlertTitle>
              <AlertDescription>
                <ol className="mt-2 list-decimal pl-4 space-y-1 text-sm">
                  <li>The City of {CITY_NAME} will review your application</li>
                  <li>
                    The building will be added to your account within{' '}
                    <strong>5–7 business days</strong>
                  </li>
                  <li>You'll be able to manage it from "My Buildings" once approved</li>
                  <li>A City inspector will schedule an initial building evaluation</li>
                </ol>
              </AlertDescription>
            </Alert>
            <p className="text-xs text-gray-500">
              Questions? Email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand underline">
                {CONTACT_EMAIL}
              </a>{' '}
              or call {CONTACT_PHONE}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
