import readline from 'node:readline';

const controller = new AbortController();
const { signal } = controller;

// Simulates a multi-step async process with no fetch involved.
async function longRunningTask(signal) {
  console.log('Task started');

  let aborted = false;
  signal.addEventListener('abort', () => {
    aborted = true;
    console.log('abort event received, reason:', signal.reason);
  });

  for (let i = 1; i <= 10; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (aborted) {
      console.log(`Stopping after step ${i}`);
      return;
    }
    console.log(`Step ${i} complete`);
  }
  console.log('Task finished normally');
}

// Separate function listening for the key press, per your requirement.
// Node has no keydown event, so we put stdin into raw mode and use
// readline's keypress events instead.
function listenForAbortKey(controller) {
  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) process.stdin.setRawMode(true);
  process.stdin.resume();

  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') process.exit();
    if (str === 'k') {
      controller.abort('User pressed K');
    }
  });
}

listenForAbortKey(controller);
longRunningTask(signal).then(() => process.exit(0));
