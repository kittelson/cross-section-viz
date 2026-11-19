import { cn } from 'cn';
import { useAtom } from 'jotai';
import { minSafeDimensionAtom } from '@/atoms';
import { UnderConstruction } from '@/components/UnderConstruction';
import { CheckboxField } from '@/components/ui/checkbox-field';
import {
  minSafeDimensionIdeas,
  type MinSafeDimensionOption,
} from '@/minSafeDimension';

export function MinSafeDimensionIdeas() {
  const [minSafeDimension, setMinSafeDimension] = useAtom(minSafeDimensionAtom);

  function selectOption(option: MinSafeDimensionOption, checked: boolean) {
    setMinSafeDimension({
      selectedOption: checked ? option : null,
    });
  }

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {minSafeDimensionIdeas.map((idea) => {
        const selected = minSafeDimension.selectedOption === idea.value;

        return (
          <div
            key={idea.value}
            className={cn(
              'relative cursor-pointer rounded-lg border p-3 hover:bg-muted/50',
              selected && 'border-primary bg-primary/5',
            )}
            onClick={() => selectOption(idea.value, true)}
          >
            <div onClick={(event) => event.stopPropagation()}>
              <CheckboxField
                name={`min-safe-idea-${idea.value}`}
                label={idea.label}
                value={selected}
                onChange={(checked) => selectOption(idea.value, checked)}
              />
            </div>
            <UnderConstruction>
              <img
                src={idea.image}
                alt=""
                className="pointer-events-none mt-3 w-full rounded-md"
              />
            </UnderConstruction>
          </div>
        );
      })}
    </div>
  );
}
