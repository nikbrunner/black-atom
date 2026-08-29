import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
    pi.on("agent_settled", async (_event, ctx) => {
        const result = await pi.exec(
            "bash",
            [".claude/hooks/install-cli.sh", "--status-exit"],
            { cwd: ctx.cwd },
        );

        if (!ctx.hasUI) return;

        if (result.code === 0) {
            ctx.ui.notify("Synchronized the Livery CLI and adapter themes.", "info");
            return;
        }

        ctx.ui.notify("Livery CLI synchronization failed.", "error");
    });
}
