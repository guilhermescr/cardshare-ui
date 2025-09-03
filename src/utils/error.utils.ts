export function getErrorMessage(
  error: unknown,
  fallback = 'Unexpected error occurred.'
) {
  if (!error) return fallback;
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && error !== null) {
    if (
      'message' in error &&
      typeof (error as { message?: unknown }).message === 'string'
    ) {
      return (error as { message: string }).message;
    }
    if (
      'error' in error &&
      typeof (error as { error?: unknown }).error === 'string'
    ) {
      return (error as { error: string }).error;
    }
  }
  return fallback;
}
