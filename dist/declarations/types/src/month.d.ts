import * as React from 'react';
export declare type CalendarMonth = React.PropsWithChildren<{
    month?: number;
}>;
declare type MonthContext = {
    month?: number;
};
export declare const MonthContext: React.Context<MonthContext>;
export declare function CalendarMonth({ children, month }: CalendarMonth): JSX.Element;
export {};
