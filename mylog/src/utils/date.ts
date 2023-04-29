import {months} from '@/constants/numbers';
import type {Locale} from '@/types';

function getDateDetails(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return {year, month, day};
}

function getDateWithSeparator(date: Date, separator: string = '') {
  const {year, month, day} = getDateDetails(date);

  return [
    String(year),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join(separator);
}

function getDateLocaleFormat(date: Date, locale: Locale = 'ko') {
  const {year, month, day} = getDateDetails(date);

  switch (locale) {
    case 'ko': {
      return `${year}년 ${month}월 ${day}일`;
    }
    case 'en': {
      return `${months[month]} ${day}, ${year}`;
    }
  }
}

export {getDateWithSeparator, getDateLocaleFormat};
