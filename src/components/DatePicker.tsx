'use client';

import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Matcher } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function DatePicker({
  value,
  onChange,
  disabled,
  calendarDisabled,
}: {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  calendarDisabled?: Matcher | Matcher[] | undefined;
  disabled?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          required
          disabled={calendarDisabled}
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
