import { useAtomValue } from 'jotai';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { projectDetailsAtom } from '@/atoms';
import { SuggestedEditCard } from '@/components/SuggestedEditCard';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { projectGoalOptions } from '@/projectDetails';
import {
  getSuggestedEditTotalScore,
  suggestedEditRows,
  type ImpactGoalKey,
} from '@/suggestedEdits';

const CARD_MIN_WIDTH_PX = 320;
const CARD_GAP_PX = 16;

function getSelectedGoals(goals: Record<ImpactGoalKey, boolean>) {
  return projectGoalOptions
    .map((goal) => goal.name)
    .filter((goal) => goals[goal]);
}

function chunkItems<T>(items: T[], size: number) {
  const pages: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size));
  }
  return pages.length ? pages : [[]];
}

export function SuggestedEditsGrid() {
  const projectDetails = useAtomValue(projectDetailsAtom);
  const selectedGoals = useMemo(
    () => getSelectedGoals(projectDetails.goals),
    [projectDetails.goals],
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const viewportRef = useRef<HTMLDivElement>(null);

  const rankedRows = useMemo(() => {
    return suggestedEditRows
      .filter((row) => getSuggestedEditTotalScore(row, selectedGoals) > 0)
      .sort((left, right) => {
        return (
          getSuggestedEditTotalScore(right, selectedGoals) -
          getSuggestedEditTotalScore(left, selectedGoals)
        );
      });
  }, [selectedGoals]);

  const pages = useMemo(
    () => chunkItems(rankedRows, itemsPerPage),
    [rankedRows, itemsPerPage],
  );
  const pageCount = pages.length;
  const safePageIndex = Math.min(pageIndex, pageCount - 1);
  const currentPage = pages[safePageIndex] ?? [];
  const canGoPrevious = safePageIndex > 0;
  const canGoNext = safePageIndex < pageCount - 1;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    function updateItemsPerPage(width: number) {
      const nextItemsPerPage = Math.max(
        1,
        Math.floor((width + CARD_GAP_PX) / (CARD_MIN_WIDTH_PX + CARD_GAP_PX)),
      );
      setItemsPerPage(nextItemsPerPage);
    }

    updateItemsPerPage(viewport.clientWidth);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      updateItemsPerPage(entry.contentRect.width);
    });

    observer.observe(viewport);
    return () => observer.disconnect();
  }, [selectedGoals.length]);

  useEffect(() => {
    setPageIndex((current) => Math.min(current, Math.max(0, pageCount - 1)));
  }, [pageCount]);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight">Suggested Edits</h2>

      {selectedGoals.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Select at least one project goal on the Project Details page to see
          scored suggested edits.
        </p>
      ) : rankedRows.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No suggested edits have a positive score for the selected project
          goals.
        </p>
      ) : (
        <div className="mt-4">
          <div className="flex items-start gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="mt-8 shrink-0"
              disabled={!canGoPrevious}
              aria-label="Previous suggested edits"
              onClick={() =>
                setPageIndex((current) => Math.max(0, current - 1))
              }
            >
              <ChevronLeft aria-hidden />
            </Button>

            <div
              ref={viewportRef}
              className="min-w-0 flex-1"
              aria-live="polite"
              aria-atomic="false"
            >
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
                }}
              >
                {currentPage.map((row, index) => {
                  const absoluteIndex = safePageIndex * itemsPerPage + index;
                  return (
                    <div key={row.measure} className="min-w-0">
                      <SuggestedEditCard
                        row={row}
                        selectedGoals={selectedGoals}
                        applied={absoluteIndex === 0}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="mt-8 shrink-0"
              disabled={!canGoNext}
              aria-label="Next suggested edits"
              onClick={() =>
                setPageIndex((current) => Math.min(pageCount - 1, current + 1))
              }
            >
              <ChevronRight aria-hidden />
            </Button>
          </div>

          {pageCount > 1 ? (
            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="sr-only" aria-live="polite">
                Page {safePageIndex + 1} of {pageCount}
              </p>
              <RadioGroup
                value={String(safePageIndex)}
                onValueChange={(value) => setPageIndex(Number(value))}
                aria-label="Suggested edits pages"
                className="flex w-auto flex-row items-center justify-center gap-2"
              >
                {pages.map((_, index) => (
                  <RadioGroupItem
                    key={index}
                    value={String(index)}
                    label={`Page ${index + 1} of ${pageCount}`}
                    className="size-2.5 border-muted-foreground/40 data-checked:border-foreground data-checked:bg-foreground"
                  />
                ))}
              </RadioGroup>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
