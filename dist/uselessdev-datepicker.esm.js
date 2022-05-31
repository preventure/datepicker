import * as React from 'react';
import { useMultiStyleConfig, Flex, Button, useStyleConfig, Box, Grid, Heading, Text, extendTheme } from '@chakra-ui/react';
import { subMonths, addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isValid, isSameDay, isBefore, isAfter, isWeekend, format as format$1, addDays } from 'date-fns';
import format from 'date-fns/format';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var CalendarContext = /*#__PURE__*/React.createContext({
  dates: [],
  nextMonth: function nextMonth() {
    return null;
  },
  prevMonth: function prevMonth() {
    return null;
  },
  onSelectDates: function onSelectDates() {
    return null;
  },
  weekStartsOn: 0
});

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function replaceOutMonthDays(days, date) {
  return days.map(function (d) {
    return isSameMonth(date, d) ? d : null;
  });
}

function useCalendar(_ref) {
  var start = _ref.start,
      _ref$months = _ref.months,
      months = _ref$months === void 0 ? 1 : _ref$months,
      blockFuture = _ref.blockFuture,
      allowOutsideDays = _ref.allowOutsideDays,
      locale = _ref.locale,
      weekStartsOn = _ref.weekStartsOn;
  var initialState = blockFuture ? subMonths(start, 1) : start;

  var _React$useState = React.useState(initialState),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      date = _React$useState2[0],
      setDate = _React$useState2[1];

  var actions = React.useMemo(function actionsFn() {
    var nextMonth = function nextMonth() {
      return setDate(function (prevSet) {
        return addMonths(prevSet, 1);
      });
    };

    var prevMonth = function prevMonth() {
      return setDate(function (prevSet) {
        return subMonths(prevSet, 1);
      });
    };

    var resetDate = function resetDate() {
      return setDate(initialState);
    };

    var dates = _toConsumableArray(Array(months).keys()).map(function (i) {
      var month = addMonths(date, i);
      var startDateOfMonth = startOfMonth(month);
      var endDateOfMonth = endOfMonth(month);
      var startWeek = startOfWeek(startDateOfMonth, {
        locale: locale,
        weekStartsOn: weekStartsOn
      });
      var endWeek = endOfWeek(endDateOfMonth, {
        locale: locale,
        weekStartsOn: weekStartsOn
      });
      var days = eachDayOfInterval({
        start: startWeek,
        end: endWeek
      });
      return {
        startDateOfMonth: startDateOfMonth,
        endDateOfMonth: endDateOfMonth,
        startWeek: startWeek,
        endWeek: endWeek,
        days: allowOutsideDays ? days : replaceOutMonthDays(days, month)
      };
    });

    return {
      nextMonth: nextMonth,
      prevMonth: prevMonth,
      resetDate: resetDate,
      dates: dates
    };
  }, [allowOutsideDays, date, initialState, months]);
  return _objectSpread2({
    startDate: date
  }, actions);
}

var Target;

(function (Target) {
  Target["START"] = "start";
  Target["END"] = "end";
})(Target || (Target = {}));

var _excluded$1 = ["resetDate"];
function Calendar$1(_ref) {
  var children = _ref.children,
      months = _ref.months,
      value = _ref.value,
      allowOutsideDays = _ref.allowOutsideDays,
      singleDateSelection = _ref.singleDateSelection,
      disablePastDates = _ref.disablePastDates,
      disableFutureDates = _ref.disableFutureDates,
      disableWeekends = _ref.disableWeekends,
      disableDates = _ref.disableDates,
      locale = _ref.locale,
      weekdayFormat = _ref.weekdayFormat,
      onSelectDate = _ref.onSelectDate,
      weekStartsOn = _ref.weekStartsOn,
      weekDateSelection = _ref.weekDateSelection,
      highlightToday = _ref.highlightToday;
  var styles = useMultiStyleConfig('Calendar', {});

  var _useCalendar = useCalendar({
    allowOutsideDays: allowOutsideDays,
    blockFuture: false,
    start: (value === null || value === void 0 ? void 0 : value.start) || new Date(),
    months: months,
    locale: locale,
    weekStartsOn: weekStartsOn
  }),
      resetDate = _useCalendar.resetDate,
      values = _objectWithoutProperties(_useCalendar, _excluded$1);

  var _React$useState = React.useState(Target.START),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      target = _React$useState2[0],
      setTarget = _React$useState2[1];

  React.useEffect(function () {
    if (isValid(value.start)) {
      resetDate();
    } // missing resetDate, adding resetDate causes to calendar
    // impossible to navigation through months.
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [value.start]);

  var selectDateHandler = function selectDateHandler(date) {
    if (singleDateSelection) {
      return onSelectDate(date);
    }

    if (weekDateSelection) {
      return onSelectDate({
        start: startOfWeek(date, {
          locale: locale,
          weekStartsOn: weekStartsOn
        }),
        end: endOfWeek(date, {
          locale: locale,
          weekStartsOn: weekStartsOn
        })
      });
    }

    if (value.start && isSameDay(date, value.start) || value.end && isSameDay(date, value.end)) {
      return;
    }

    if (value.start && isBefore(date, value.start)) {
      return onSelectDate(_objectSpread2(_objectSpread2({}, value), {}, {
        start: date
      }));
    }

    if (value.end && isAfter(date, value.end)) {
      return onSelectDate(_objectSpread2(_objectSpread2({}, value), {}, {
        end: date
      }));
    }

    if (target === Target.END) {
      setTarget(Target.START);
      return onSelectDate(_objectSpread2(_objectSpread2({}, value), {}, {
        end: date
      }));
    }

    setTarget(Target.END);
    return onSelectDate(_objectSpread2(_objectSpread2({}, value), {}, {
      start: date
    }));
  };

  return /*#__PURE__*/React.createElement(CalendarContext.Provider, {
    value: _objectSpread2(_objectSpread2({}, values), {}, {
      onSelectDates: selectDateHandler,
      startSelectedDate: value === null || value === void 0 ? void 0 : value.start,
      endSelectedDate: value === null || value === void 0 ? void 0 : value.end,
      disableDates: disableDates,
      disableFutureDates: disableFutureDates,
      disablePastDates: disablePastDates,
      disableWeekends: disableWeekends,
      locale: locale,
      weekdayFormat: weekdayFormat,
      weekStartsOn: weekStartsOn,
      highlightToday: highlightToday
    })
  }, /*#__PURE__*/React.createElement(Flex, {
    sx: styles.calendar
  }, children));
}

function CalendarControls(_ref) {
  var children = _ref.children;
  var styles = useMultiStyleConfig('CalendarControl', {});
  return /*#__PURE__*/React.createElement(Flex, {
    sx: styles.controls
  }, children);
}

function CalendarNextButton(_ref) {
  var as = _ref.as;
  var styles = useMultiStyleConfig('CalendarControl', {});

  var _React$useContext = React.useContext(CalendarContext),
      nextMonth = _React$useContext.nextMonth;

  if (as) {
    return as({
      onClick: nextMonth
    });
  }

  return /*#__PURE__*/React.createElement(Button, {
    onClick: nextMonth,
    sx: styles.button
  }, "\u2192");
}

function CalendarPrevButton(_ref) {
  var as = _ref.as;
  var styles = useMultiStyleConfig('CalendarControl', {});

  var _React$useContext = React.useContext(CalendarContext),
      prevMonth = _React$useContext.prevMonth;

  if (as) {
    return as({
      onClick: prevMonth
    });
  }

  return /*#__PURE__*/React.createElement(Button, {
    onClick: prevMonth,
    sx: styles.button
  }, "\u2190");
}

function Day(_ref) {
  var day = _ref.day,
      variant = _ref.variant,
      disabled = _ref.disabled,
      onSelectDate = _ref.onSelectDate;
  var styles = useStyleConfig('CalendarDay', {
    variant: variant
  }); // console.log({ variant, day })

  return /*#__PURE__*/React.createElement(Button, {
    "aria-label": format(day, 'MM-d'),
    onClick: function onClick() {
      return onSelectDate(day);
    },
    sx: styles,
    isDisabled: disabled,
    "aria-current": variant === 'selected' ? 'date' : false
  }, format(day, 'd'));
}

var MonthContext = /*#__PURE__*/React.createContext({
  month: 0
});
function CalendarMonth$1(_ref) {
  var children = _ref.children,
      _ref$month = _ref.month,
      month = _ref$month === void 0 ? 0 : _ref$month;
  var styles = useMultiStyleConfig('CalendarMonth', {});
  return /*#__PURE__*/React.createElement(MonthContext.Provider, {
    value: {
      month: month
    }
  }, /*#__PURE__*/React.createElement(Box, {
    sx: styles.month
  }, children));
}

function CalendarDays() {
  var styles = useMultiStyleConfig('CalendarMonth', {});

  var _React$useContext = React.useContext(CalendarContext),
      dates = _React$useContext.dates,
      onSelectDates = _React$useContext.onSelectDates,
      startSelectedDate = _React$useContext.startSelectedDate,
      endSelectedDate = _React$useContext.endSelectedDate,
      disableDates = _React$useContext.disableDates,
      disableFutureDates = _React$useContext.disableFutureDates,
      disablePastDates = _React$useContext.disablePastDates,
      disableWeekends = _React$useContext.disableWeekends,
      highlightToday = _React$useContext.highlightToday;

  var _React$useContext2 = React.useContext(MonthContext),
      month = _React$useContext2.month;

  return /*#__PURE__*/React.createElement(Grid, {
    sx: styles.days
  }, dates[Number(month)].days.map(function (day, index) {
    if (!day) {
      return /*#__PURE__*/React.createElement("span", {
        key: "not-a-day-".concat(index)
      });
    }

    var variant;
    var isSelected = startSelectedDate && isSameDay(day, startSelectedDate) || endSelectedDate && isSameDay(day, endSelectedDate);

    if (isSelected) {
      variant = 'selected';
    }

    if ((isBefore(day, startOfMonth(dates[Number(month)].startDateOfMonth)) || isAfter(day, endOfMonth(dates[Number(month)].startDateOfMonth))) && !isSelected) {
      variant = 'outside';
    }

    if (highlightToday && isSameDay(new Date(), day)) {
      variant = 'today';
    }

    var interval = startSelectedDate && endSelectedDate && eachDayOfInterval({
      start: startSelectedDate,
      end: endSelectedDate
    });
    var isInRange = interval ? interval.some(function (date) {
      return isSameDay(day, date);
    }) : false;

    if (isInRange && !isSelected) {
      variant = 'range';
    }

    var isDisabled = disablePastDates && isBefore(day, disablePastDates instanceof Date ? disablePastDates : new Date()) || disableFutureDates && isAfter(day, disableFutureDates instanceof Date ? disableFutureDates : new Date()) || disableWeekends && isWeekend(day) || disableDates && disableDates.some(function (date) {
      return isSameDay(day, date);
    });
    return /*#__PURE__*/React.createElement(Day, {
      variant: variant,
      day: day,
      key: format$1(day, 'd-M'),
      disabled: isDisabled,
      onSelectDate: onSelectDates
    });
  }));
}

function CalendarMonthName(_ref) {
  var _ref$format = _ref.format,
      format = _ref$format === void 0 ? 'MMMM, yyyy' : _ref$format;
  var styles = useMultiStyleConfig('CalendarMonth', {});

  var _React$useContext = React.useContext(CalendarContext),
      dates = _React$useContext.dates,
      locale = _React$useContext.locale;

  var _React$useContext2 = React.useContext(MonthContext),
      month = _React$useContext2.month;

  var currentMonth = dates[Number(month)].startDateOfMonth;
  return /*#__PURE__*/React.createElement(Heading, {
    sx: styles.name
  }, format$1(currentMonth, format, {
    locale: locale
  }));
}

function weekdays(_ref) {
  var _ref$weekdayFormat = _ref.weekdayFormat,
      weekdayFormat = _ref$weekdayFormat === void 0 ? 'E' : _ref$weekdayFormat,
      locale = _ref.locale,
      weekStartsOn = _ref.weekStartsOn;
  var start = startOfWeek(new Date(), {
    locale: locale,
    weekStartsOn: weekStartsOn
  });
  return _toConsumableArray(Array(7).keys()).map(function (i) {
    return format$1(addDays(start, i), weekdayFormat, {
      locale: locale
    });
  });
}

function CalendarWeek() {
  var styles = useMultiStyleConfig('CalendarMonth', {});

  var _React$useContext = React.useContext(CalendarContext),
      locale = _React$useContext.locale,
      weekdayFormat = _React$useContext.weekdayFormat,
      weekStartsOn = _React$useContext.weekStartsOn;

  var week = weekdays({
    weekdayFormat: weekdayFormat,
    locale: locale,
    weekStartsOn: weekStartsOn
  });
  return /*#__PURE__*/React.createElement(Grid, {
    sx: styles.week
  }, week.map(function (weekday) {
    return /*#__PURE__*/React.createElement(Text, {
      key: weekday,
      sx: styles.weekday
    }, weekday);
  }));
}

var _excluded = ["children"];
function CalendarMonths(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded);

  var styles = useMultiStyleConfig('Calendar', {});
  return /*#__PURE__*/React.createElement(Grid, {
    sx: _objectSpread2(_objectSpread2({}, styles.months), props)
  }, children);
}

var Calendar = {
  parts: ['calendar', 'months'],
  baseStyle: {
    calendar: {
      position: 'relative',
      w: 'min-content',
      borderWidth: '1px',
      rounded: 'md',
      shadow: 'lg'
    },
    months: {
      p: 4,
      w: '100%',
      gridTemplateColumns: '1fr 1fr'
    }
  }
};

var CalendarMonth = {
  parts: ['month', 'name', 'week', 'weekday', 'days'],
  baseStyle: {
    name: {
      h: 8,
      fontSize: 'md',
      lineHeight: 6,
      textAlign: 'center',
      textTransform: 'capitalize'
    },
    week: {
      gridTemplateColumns: 'repeat(7, 1fr)'
    },
    weekday: {
      color: 'gray.500',
      textAlign: 'center',
      textTransform: 'capitalize'
    },
    days: {
      gridTemplateColumns: 'repeat(7, 1fr)'
    }
  },
  defaultProps: {
    name: {
      as: 'h2'
    }
  }
};

var CalendarDay = {
  baseStyle: {
    rounded: 'none',
    bgColor: 'transparent',
    _hover: {
      bgColor: 'gray.100'
    },
    _disabled: {
      color: 'gray.200',
      _hover: {
        cursor: 'initial',
        bgColor: 'transparent'
      }
    }
  },
  sizes: {
    sm: {
      h: 8
    }
  },
  variants: {
    selected: {
      bgColor: 'pink.400',
      color: 'white',
      _hover: {
        bgColor: 'pink.300'
      }
    },
    range: {
      bgColor: 'pink.200',
      color: 'white',
      _hover: {
        bgColor: 'pink.100'
      },
      _disabled: {
        _hover: {
          bgColor: 'pink.300'
        }
      }
    },
    outside: {
      color: 'gray.300'
    },
    today: {
      bgColor: 'pink.100',
      _hover: {
        bgColor: 'pink.200'
      }
    }
  },
  defaultProps: {
    size: 'sm'
  }
};

var CalendarControl = {
  parts: ['controls', 'button'],
  baseStyle: {
    controls: {
      position: 'absolute',
      p: 4,
      w: '100%',
      justifyContent: 'space-between'
    },
    button: {
      h: 6,
      px: 2,
      lineHeight: 0,
      fontSize: 'md',
      rounded: 'md'
    }
  }
};

var theme = extendTheme({
  components: {
    Calendar: Calendar,
    CalendarMonth: CalendarMonth,
    CalendarDay: CalendarDay,
    CalendarControl: CalendarControl
  }
});

export { Calendar$1 as Calendar, CalendarContext, CalendarControls, CalendarDays, theme as CalendarDefaultTheme, CalendarMonth$1 as CalendarMonth, CalendarMonthName, CalendarMonths, CalendarNextButton, CalendarPrevButton, CalendarWeek, Day, MonthContext, Target, useCalendar };
