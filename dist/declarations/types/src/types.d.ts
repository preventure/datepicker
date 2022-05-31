/// <reference types="react" />
import type { CSSObject } from '@chakra-ui/react';
export declare type CalendarDate = Date | number;
export declare type CalendarValues = {
    start?: CalendarDate;
    end?: CalendarDate;
};
export declare type Buttons = ({ onClick }: {
    onClick: () => void;
}) => JSX.Element;
export declare enum Target {
    START = "start",
    END = "end"
}
export declare type CalendarThemeKeys = 'calendar' | 'months';
export declare type CalendarStyles = Record<CalendarThemeKeys, CSSObject>;
export declare type CalendarMonthThemeKeys = 'month' | 'name' | 'week' | 'weekday' | 'days';
export declare type CalendarMonthStyles = Record<CalendarMonthThemeKeys, CSSObject>;
export declare type CalendarControlThemeKeys = 'controls' | 'button';
export declare type CalendarControlStyles = Record<CalendarControlThemeKeys, CSSObject>;
