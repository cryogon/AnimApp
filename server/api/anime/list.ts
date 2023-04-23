export default defineEventHandler(async (e) => {
  const config = useRuntimeConfig();
  const body = await readBody(e);
  const fields = body.fields || "title,main_picture";
  const res = await fetch(
    `https://api.myanimelist.net/v2/anime?q=${
      body.query
    }&limit=10&fields=${fields}&offset=${body.offset || 0}`,
    {
      headers: {
        "X-MAL-CLIENT-ID": config.public.malClientId,
      },
    }
  );
  const anime = await res.json();
  return anime;
});
