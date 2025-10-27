export function formatDateTime(dateString: string | Date): {
  date: string;
  time: string;
} {
  const date = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return { date: `${diffInSeconds} sec ago`, time: '' };
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return { date: `${minutes} min ago`, time: '' };
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return { date: `${hours} hour${hours > 1 ? 's' : ''} ago`, time: '' };
  }

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(date);

  const time = `${parts.find((p) => p.type === 'hour')?.value}:${parts.find((p) => p.type === 'minute')?.value} ${parts.find((p) => p.type === 'dayPeriod')?.value}`;
  const dateFormatted = `${parts.find((p) => p.type === 'month')?.value} ${parts.find((p) => p.type === 'day')?.value}, ${parts.find((p) => p.type === 'year')?.value}`;

  return {
    date: dateFormatted,
    time: time,
  };
}

export function formatDateToLongString(dateString: string | Date): string {
  if (!dateString) return '';

  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}
