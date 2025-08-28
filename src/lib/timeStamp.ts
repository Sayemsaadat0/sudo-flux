export function formatDatestamp(originalTimestamp: any) {
  const dateObject = new Date(originalTimestamp);
  const day = dateObject.getUTCDate();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[dateObject.getUTCMonth()];
  const year = dateObject.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

export function formatTimeStamp(date: unknown): string {
  // Try to parse string inputs into Date objects
  if (typeof date === 'string') {
    date = new Date(date);
  }

  // Check if the date is a valid Date instance and is not NaN
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new TypeError('Invalid date object provided.');
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format hours in 12-hour format
  const formattedHours = hours % 12 || 12;
  const amPm = hours < 12 ? 'AM' : 'PM';

  // Pad minutes and seconds to always be two digits
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours.toString().padStart(2, '0')}:${formattedMinutes}:${formattedSeconds} ${amPm}`;
}
