import { generateDevelopment } from "../core/src/tasks/adapters/watch.ts";

await generateDevelopment(Deno.args.length ? Deno.args : undefined);
