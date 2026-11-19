import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

const DEFAULT_ITEM_MIN_WIDTH_PX = 320;
const DEFAULT_GAP_PX = 16;

function chunkItems<T>(items: T[], size: number) {
  const pages: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size));
  }
  return pages.length ? pages : [[]];
}

export function Carousel<T>({
  items,
  getKey,
  renderItem,
  itemMinWidth = DEFAULT_ITEM_MIN_WIDTH_PX,
  gap = DEFAULT_GAP_PX,
  previousLabel = 'Previous items',
  nextLabel = 'Next items',
  pagesLabel = 'Pages',
  className,
}: {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  itemMinWidth?: number;
  gap?: number;
  previousLabel?: string;
  nextLabel?: string;
  pagesLabel?: string;
  className?: string;
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const viewportRef = useRef<HTMLDivElement>(null);

  const pages = useMemo(
    () => chunkItems(items, itemsPerPage),
    [items, itemsPerPage],
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
      setItemsPerPage(
        Math.max(1, Math.floor((width + gap) / (itemMinWidth + gap))),
      );
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
  }, [gap, itemMinWidth, items.length]);

  useEffect(() => {
    setPageIndex((current) => Math.min(current, Math.max(0, pageCount - 1)));
  }, [pageCount]);

  if (!items.length) {
    return null;
  }

  return (
    <div className={cn(className)}>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="secondary"
          size="icon-lg"
          className="shrink-0 border border-border shadow-sm"
          disabled={!canGoPrevious}
          aria-label={previousLabel}
          onClick={() => setPageIndex((current) => Math.max(0, current - 1))}
        >
          <ChevronLeft className="size-5" aria-hidden />
        </Button>

        <div
          ref={viewportRef}
          className="min-w-0 flex-1"
          aria-live="polite"
          aria-atomic="false"
        >
          <div
            className="grid"
            style={{
              gap,
              gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
            }}
          >
            {currentPage.map((item, pageLocalIndex) => {
              const index = safePageIndex * itemsPerPage + pageLocalIndex;
              return (
                <div key={getKey(item, index)} className="min-w-0">
                  {renderItem(item, index)}
                </div>
              );
            })}
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="icon-lg"
          className="shrink-0 border border-border shadow-sm"
          disabled={!canGoNext}
          aria-label={nextLabel}
          onClick={() =>
            setPageIndex((current) => Math.min(pageCount - 1, current + 1))
          }
        >
          <ChevronRight className="size-5" aria-hidden />
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
            aria-label={pagesLabel}
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
  );
}
