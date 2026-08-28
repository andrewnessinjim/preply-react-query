import readline from "node:readline";

const controller = new AbortController();
const { signal } = controller;

async function longRunningTask(signal) {
  console.log("Task started");

  let aborted = false;
  signal.addEventListener("abort", () => {
    aborted = true;
    console.log("abort event received, reason:", signal.reason);
  });

  for (let i = 1; i <= 10; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (aborted) {
      console.log(`Stopping after step ${i}`);
      return;
    }
    console.log(`Step ${i} complete`);
  }
  console.log("Task finished normally");
}

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);
process.stdin.on("keypress", (str) => {
  if (str === "k") controller.abort("User pressed K");
});

longRunningTask(signal).then(() => process.exit(0));
