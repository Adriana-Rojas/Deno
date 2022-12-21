import {serve} from "https://deno.land/std/http/mod.ts";
//import {serve} from "https://deno.land/std@0.167.0/http/mod.ts";
//import { serve } from "http://deno.land/std@0.167.0/http/mod.ts";

console.log(Deno.args[0]);
let port_listen: number;
port_listen = parseInt(Deno.args[0]);
console.log(port_listen);

if (Deno.args[0] !== "") {
  port_listen = parseInt(Deno.args[0]);
}

async function getJson(filePath: string) {
  return JSON.parse(await Deno.readTextFile(filePath));
}

async function reqHandler(req: Request, conn: ConnInfo) {
    
  if (req.method !== "GET") {
    return new Response(null, { status: 405 });
  }

  const { pathname: path } = new URL(req.url);

  if (path == "/json/expresion_regular_v1") {
    const data_work = await getJson("./data1.json");    //console.log(d);  
    return new Response(JSON.stringify(data_work));
  }else if (path == "/json/codigo_de_proceso_v1") {
    const data_work = await getJson("./CodigoDeProceso.json");     
    return new Response(JSON.stringify(data_work));
  }else{
    return new Response(null, { status: 404 });
  }
}

serve(reqHandler, {port:port_listen});


