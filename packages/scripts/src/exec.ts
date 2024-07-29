import { execa } from "execa";
import kill from "tree-kill";

type CleanupCallback = () => Promise<void>;
export type KILL_SIGNAL = "SIGKILL" | "SIGTERM";

const isTaskkillCmdProcessNotFoundError = (err: Error) => {
  return (
    process.platform === "win32" &&
    "cmd" in err &&
    "code" in err &&
    typeof err.cmd === "string" &&
    err.cmd.startsWith("taskkill") &&
    err.code === 128
  );
}
const killProcess = (pid: number, signal: KILL_SIGNAL) =>
  new Promise<void>((resolve, reject) => {
    kill(pid, signal, error => {
      return (error && !isTaskkillCmdProcessNotFoundError(error))
        ? reject(error)
        : resolve();
    });
  });


export const runCommand = (command: string): CleanupCallback => {
  const childProcess = execa(command, {
    shell: true,
    stdio: "inherit",
  });
  childProcess.on("exit", (code) => {
    if (code && code !== 0) {
      process.exitCode = code
    }
  });


  return async () => {
    await killProcess(childProcess.pid!, "SIGTERM");
  };
}
