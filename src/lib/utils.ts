import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FEES, SERVICE_REQUEST_TYPES } from '@/lib/constants';
import type { ServiceRequestType, ServiceRequestUrgency } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAnnualFee(units: number): number {
  return Math.round(units * FEES.annualPerUnit * 100) / 100;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function generateReferenceNumber(): string {
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `ACH-${new Date().getFullYear()}-${rand}`;
}

export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

export function formatExpiryDate(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

export function addYears(dateStr: string, years: number): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  return `${year + years}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function isPastDue(dateStr: string): boolean {
  const [year, month, day] = dateStr.split('-').map(Number);
  const dueDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today > dueDate;
}

export function getServiceRequestUrgency(type: ServiceRequestType): ServiceRequestUrgency {
  const found = SERVICE_REQUEST_TYPES.find((t) => t.value === type);
  return found?.urgency ?? 'non-urgent';
}

export function getResponseDueDate(submittedDate: string, urgency: ServiceRequestUrgency): string {
  const [year, month, day] = submittedDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + (urgency === 'urgent' ? 1 : 7));
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function generateServiceRequestId(): string {
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `SR-${new Date().getFullYear()}-${rand}`;
}
