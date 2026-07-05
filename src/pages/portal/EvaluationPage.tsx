import { useState } from 'react';
import { Star, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ColourRatingBadge } from '@/components/badges/ColourRatingBadge';
import { MOCK_BUILDINGS } from '@/data/mockBuildings';
import { MOCK_EVALUATIONS, MOCK_SCORE_HISTORY } from '@/data/mockServiceRequests';
import { formatDate, cn } from '@/lib/utils';

function ScoreBar({ score, maxScore, label }: { score: number; maxScore: number; label: string }) {
  const pct = Math.round((score / maxScore) * 100);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="tabular-nums text-gray-500">
          {score}/{maxScore}
        </span>
      </div>
      <Progress
        value={pct}
        className={cn(
          'h-2',
          pct >= 75
            ? '[&>div]:bg-green-500'
            : pct >= 50
              ? '[&>div]:bg-yellow-500'
              : '[&>div]:bg-red-500',
        )}
        aria-label={`${label}: ${score} out of ${maxScore}`}
      />
    </div>
  );
}

export default function EvaluationPage() {
  const [selectedBuildingId, setSelectedBuildingId] = useState(MOCK_BUILDINGS[0]?.id ?? '');

  const evaluation = MOCK_EVALUATIONS.find((e) => e.buildingId === selectedBuildingId);
  const selectedBuilding = MOCK_BUILDINGS.find((b) => b.id === selectedBuildingId);
  const history = MOCK_SCORE_HISTORY[selectedBuildingId] ?? [];

  const scorePercent = evaluation
    ? Math.round((evaluation.totalScore / evaluation.maxScore) * 100)
    : 0;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Building Evaluation</h1>
        <p className="text-sm text-gray-500">
          View your building's evaluation scores and colour rating
        </p>
      </div>

      {/* Building selector */}
      <div className="flex items-center gap-3">
        <label htmlFor="evalBuilding" className="text-sm font-medium text-gray-700 shrink-0">
          Building:
        </label>
        <Select value={selectedBuildingId} onValueChange={setSelectedBuildingId}>
          <SelectTrigger
            id="evalBuilding"
            className="max-w-xs"
            aria-label="Select building for evaluation"
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
      </div>

      {evaluation && selectedBuilding ? (
        <>
          {/* Score overview */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="sm:col-span-1">
              <CardContent className="pt-6 text-center">
                <div className="relative mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full border-4 border-brand">
                  <span className="text-3xl font-bold text-brand">{evaluation.totalScore}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">out of {evaluation.maxScore}</p>
                <ColourRatingBadge rating={evaluation.colourRating} />
                <p className="mt-2 text-xs text-gray-500">
                  Evaluated {formatDate(evaluation.date)}
                </p>
                <p className="text-xs text-gray-500">by {evaluation.evaluatorName}</p>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Star className="h-4 w-4 text-brand" aria-hidden="true" />
                  Score Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {evaluation.categories.map((cat) => (
                  <ScoreBar
                    key={cat.name}
                    label={cat.name}
                    score={cat.score}
                    maxScore={cat.maxScore}
                  />
                ))}
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Total Score</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tabular-nums">
                      {evaluation.totalScore}/{evaluation.maxScore}
                    </span>
                    <span className="text-sm text-gray-500">({scorePercent}%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Colour rating info */}
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500" aria-hidden="true" />
                  <span className="text-gray-600">
                    <strong>Green</strong> (75+): Good Standing
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-yellow-500" aria-hidden="true" />
                  <span className="text-gray-600">
                    <strong>Yellow</strong> (50–74): Needs Improvement
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500" aria-hidden="true" />
                  <span className="text-gray-600">
                    <strong>Red</strong> (&lt;50): Significant Issues
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Score history */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-brand" aria-hidden="true" />
                Evaluation History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {history.map((h, i) => (
                  <div key={h.date} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{formatDate(h.date)}</span>
                      {i === 0 && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                          Most Recent
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-100 rounded-full h-2">
                        <div
                          className={cn(
                            'h-2 rounded-full',
                            h.score >= 75
                              ? 'bg-green-500'
                              : h.score >= 50
                                ? 'bg-yellow-500'
                                : 'bg-red-500',
                          )}
                          style={{ width: `${h.score}%` }}
                          role="presentation"
                        />
                      </div>
                      <span className="text-sm font-semibold tabular-nums w-10 text-right">
                        {h.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next evaluation */}
          <div className="flex items-center gap-3 rounded-lg border p-4">
            <Calendar className="h-5 w-5 text-brand" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-gray-900">Next Scheduled Evaluation</p>
              <p className="text-sm text-gray-500">{formatDate(evaluation.nextEvaluationDate)}</p>
            </div>
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No evaluation data found for this building.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
