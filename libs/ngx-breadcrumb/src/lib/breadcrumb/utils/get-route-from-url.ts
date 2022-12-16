export function getRouteFromUrl(
  url: string | null | undefined
): string | undefined {
  const urlObject = toUrl(url);
  if (urlObject?.origin === window.location.origin) {
    // return relative url (aka. route)
    return urlObject.pathname;
  }
  return undefined;
}

function toUrl(arg: string | null | undefined): URL | null | undefined {
  if (typeof arg !== 'string') {
    // shit in --> shit out
    return arg;
  }

  try {
    // test if arg is an absolute url
    return new URL(arg);
  } catch (err) {}

  try {
    // test if arg is a relative url
    return new URL(arg, window.location.origin);
  } catch (err) {}

  return null;
}
