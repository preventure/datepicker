import { Locale } from 'date-fns';
import type { CalendarDate } from './types';
export declare type UseCalendar = {
    start: CalendarDate;
    blockFuture?: boolean;
    allowOutsideDays?: boolean;
    months?: number;
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};
export declare function useCalendar({ start, months, blockFuture, allowOutsideDays, locale, weekStartsOn, }: UseCalendar): {
    nextMonth: () => void;
    prevMonth: () => void;
    resetDate: () => void;
    dates: {
        startDateOfMonth: Date;
        endDateOfMonth: Date;
        startWeek: Date;
        endWeek: Date;
        days: (CalendarDate | null)[];
    }[];
    startDate: CalendarDate;
};
