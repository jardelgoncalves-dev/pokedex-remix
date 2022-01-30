export function getPageByUrl(requestUrl: string) {
  const url = new URL(requestUrl);
  const page = url.searchParams.get("page");
  const numberPage = !isNaN(Number(page)) ? Number(page) : 0
  
  return Math.floor(Math.max(0, numberPage))
}