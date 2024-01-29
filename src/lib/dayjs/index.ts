import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('id');
dayjs.tz.setDefault('Asia/Jakarta');

const Dayjs = dayjs;

export {Dayjs};
