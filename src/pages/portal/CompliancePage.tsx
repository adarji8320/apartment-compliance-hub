import { useState } from 'react';
import { ClipboardCheck, Download, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MOCK_BUILDINGS } from '@/data/mockBuildings';
import { MOCK_COMPLIANCE_ITEMS } from '@/data/mockServiceRequests';
import type { ComplianceItem } from '@/types';
import { cn } from '@/lib/utils';

function ComplianceChecklist({ buildingId }: { buildingId: string }) {
  const [items, setItems] = useState<ComplianceItem[]>(MOCK_COMPLIANCE_ITEMS[buildingId] ?? []);

  const completedCount = items.filter((i) => i.completed).length;
  const percent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  function toggleItem(id: string) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  }

  function updateNotes(id: string, notes: string) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, notes } : item)));
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-gray-500">
          No compliance checklist found for this building.
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span className="flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4 text-brand" aria-hidden="true" />
              Compliance Progress
            </span>
            <span className="text-lg font-bold text-brand">
              {completedCount}/{items.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress
            value={percent}
            className="h-3"
            aria-label={`${percent}% compliance complete`}
          />
          <p className="mt-2 text-sm text-gray-600">
            {percent}% complete —{' '}
            {percent === 100
              ? 'All items satisfied!'
              : `${items.length - completedCount} item${items.length - completedCount !== 1 ? 's' : ''} remaining`}
          </p>
        </CardContent>
      </Card>

      {/* Checklist items */}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <Card
            key={item.id}
            className={cn(
              'transition-all',
              item.completed ? 'border-green-200 bg-green-50/40' : 'border-gray-200',
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    item.completed
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-gray-300 hover:border-brand',
                  )}
                  aria-pressed={item.completed}
                  aria-label={`${item.completed ? 'Mark incomplete' : 'Mark complete'}: ${item.label}`}
                >
                  {item.completed && <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs text-gray-600 font-mono">{idx + 1}.</span>
                    <h3
                      className={cn(
                        'font-medium text-sm',
                        item.completed ? 'line-through text-gray-600' : 'text-gray-900',
                      )}
                    >
                      {item.label}
                    </h3>
                    {item.isNew && (
                      <Badge variant="warning" className="text-[10px] py-0">
                        NEW June 2026
                      </Badge>
                    )}
                    {item.completed ? (
                      <span className="flex items-center gap-1 text-xs text-green-700">
                        <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> Complete
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-red-700">
                        <XCircle className="h-3 w-3" aria-hidden="true" /> Incomplete
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{item.description}</p>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Textarea
                      placeholder="Add notes…"
                      value={item.notes}
                      onChange={(e) => updateNotes(item.id, e.target.value)}
                      rows={1}
                      className="text-xs min-h-[2rem] flex-1"
                      aria-label={`Notes for ${item.label}`}
                    />
                    {item.templateUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-brand gap-1 shrink-0"
                        asChild
                      >
                        <a
                          href={item.templateUrl}
                          download
                          aria-label={`Download template for ${item.label}`}
                        >
                          <Download className="h-3 w-3" aria-hidden="true" />
                          Template
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      {percent < 100 && (
        <Alert variant="warning">
          <AlertDescription>
            Complete all checklist items to ensure full compliance with registration requirements.
            Missing items may affect your evaluation score and colour rating.
          </AlertDescription>
        </Alert>
      )}

      {percent === 100 && (
        <Alert variant="success">
          <AlertDescription>
            All compliance items are complete. Your building is meeting all registration
            requirements.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}

export default function CompliancePage() {
  const [selectedBuildingId, setSelectedBuildingId] = useState(MOCK_BUILDINGS[0]?.id ?? '');
  const selectedBuilding = MOCK_BUILDINGS.find((b) => b.id === selectedBuildingId);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Compliance Checklist</h1>
        <p className="text-sm text-gray-500">
          Track your building's compliance with registration requirements
        </p>
      </div>

      {/* Building selector */}
      <div className="flex items-center gap-3">
        <label htmlFor="complianceBuilding" className="text-sm font-medium text-gray-700 shrink-0">
          Building:
        </label>
        <Select value={selectedBuildingId} onValueChange={setSelectedBuildingId}>
          <SelectTrigger
            id="complianceBuilding"
            className="max-w-xs"
            aria-label="Select building for compliance"
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
        {selectedBuilding && (
          <span className="text-sm text-gray-500">
            {selectedBuilding.units} units, {selectedBuilding.storeys} storeys
          </span>
        )}
      </div>

      <ComplianceChecklist key={selectedBuildingId} buildingId={selectedBuildingId} />
    </div>
  );
}
