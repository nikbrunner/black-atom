import { join } from "@std/path";
import { config } from "../config.ts";
import { createDevProcesses } from "../../../scripts/dev-process.ts";

const processes = createDevProcesses({ cwd: join(config.dir.core, "monitor") });
const interrupt = () => void processes.stop(130);
const terminate = () => void processes.stop(143);
Deno.addSignalListener("SIGINT", interrupt);
Deno.addSignalListener("SIGTERM", terminate);
try {
    processes.startService([
        Deno.execPath(),
        "run",
        "-A",
        join(config.dir.core, "src/monitor-server.ts"),
    ]);
    processes.startService([Deno.execPath(), "run", "-A", "npm:vite"]);
    Deno.exitCode = await processes.finished;
} finally {
    Deno.removeSignalListener("SIGINT", interrupt);
    Deno.removeSignalListener("SIGTERM", terminate);
}
