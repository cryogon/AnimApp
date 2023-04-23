export default defineEventHandler(async (e) => {
  const body = await readBody(e);
  const res = await fetch(
    `https://api.myanimelist.net/v2/users/@me/animelist?limit=100&${
      body.status !== "all" ? "status=" + body.status : ""
    }`,
    {
      headers: {
        Authorization: "Bearer " + body.accessToken,
      },
    }
  );
  const anime = await res.json();
  return anime;
});
