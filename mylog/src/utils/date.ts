import {months} from '@/constants/date';
import type {Locale} from '@/types';

function getDateDetails(dateString: Date | string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return {year, month, day};
}

function getDateWithSeparator(
  dateString: Date | string,
  separator: string = '',
) {
  const {year, month, day} = getDateDetails(dateString);

  return [
    String(year),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join(separator);
}

function getDateLocaleFormat(dateString: Date | string, locale: Locale = 'ko') {
  const {year, month, day} = getDateDetails(dateString);

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
