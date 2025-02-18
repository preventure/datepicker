import * as React from 'react';
import { Locale } from 'date-fns';
import { CalendarDate } from './types';
export declare type CalendarContext = {
    dates: {
        startDateOfMonth: Date;
        endDateOfMonth: Date;
        startWeek: Date;
        endWeek: Date;
        days: (CalendarDate | null)[];
    }[];
    nextMonth: VoidFunction;
    prevMonth: VoidFunction;
    onSelectDates: (date: CalendarDate) => void;
    startSelectedDate?: CalendarDate;
    endSelectedDate?: CalendarDate;
    allowOutsideDays?: boolean;
    disablePastDates?: boolean | Date;
    disableFutureDates?: boolean | Date;
    disableWeekends?: boolean;
    disableDates?: CalendarDate[];
    locale?: Locale;
    weekdayFormat?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    highlightToday?: boolean;
};
export declare const CalendarContext: React.Context<CalendarContext>;
