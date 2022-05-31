import * as React from 'react';
import { CalendarDate } from './types';
export declare type Day = React.PropsWithChildren<{
    day: CalendarDate;
    variant?: 'selected' | 'range' | 'outside' | 'today';
    disabled?: boolean;
    onSelectDate: (date: CalendarDate) => void;
}>;
export declare function Day({ day, variant, disabled, onSelectDate }: Day): JSX.Element;
