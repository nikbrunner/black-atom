export interface DevState {
    owner: number;
    status: string;
    binary: string;
    env: Record<string, string>;
}

export async function launchDev(statePath: string, args: string[]): Promise<number> {
    try {
        const state: DevState = JSON.parse(Deno.readTextFileSync(statePath));
        Deno.kill(state.owner, 0);
        if (state.status !== "ready") {
            console.error(`livery-dev is not ready (${state.status}).`);
            return 1;
        }
        const result = await new Deno.Command(state.binary, {
            args,
            env: state.env,
            clearEnv: true,
            stdin: "inherit",
            stdout: "inherit",
            stderr: "inherit",
        }).spawn().status;
        return result.code;
    } catch (error) {
        console.error(
            `livery-dev is unavailable: ${error instanceof Error ? error.message : error}`,
        );
        return 1;
    }
}

if (import.meta.main) Deno.exit(await launchDev(Deno.args[0], Deno.args.slice(1)));
