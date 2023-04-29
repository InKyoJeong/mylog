import {months} from '@/constants/numbers';
import type {Locale} from '@/types';

function getDateWithSeparator(date: Date, separator: string = '') {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return [year, month, day].join(separator);
}

function getDateLocaleFormat(date: Date, locale: Locale = 'ko') {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

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
