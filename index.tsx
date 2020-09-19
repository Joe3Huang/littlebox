import { serve, ServerRequest, Response} from "https://deno.land/std@0.68.0/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
 //httpHandler(req, );
  req.respond({ body: "Hello World\n" });
}

async function httpHandler<TReq, TRes>(
  req: ServerRequest, 
  res: Response, 
  requestType: new () => TReq,
  handler: (body: TReq) => Promise<TRes>
  )
{
  let requestData = plainToClass(requestType, {
    urlParams: req.,
    body: req.body || {}
  });
  let responseData = await handler(requestData);
  res.status = 200;
  res.bodyresponseData;
  return;
}