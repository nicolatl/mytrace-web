import traceAgent from "$lib/trace/traceAgent.js";

export async function GET({ url }) {
  const id = url.searchParams.get("id");
  const result = await traceAgent({ id }); // 👈 pass it into traceAgent.js
  return new Response(JSON.stringify(result), { status: 200 });
}
