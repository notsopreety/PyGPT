const readline = require('readline');
const Replicate = require('replicate');
const clearScreen = require('clear-screen');

// Set your Replicate API key here
const REPLICATE_API_KEY = 'r8_dyCs0exhBet4pIqrmJtdya4Joj7rCqE00CWQp';

const replicate = new Replicate({
  auth: REPLICATE_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function printLlamaBanner() {
  console.log(`
  ________        .__  .__       .___ __________.__
 /  _____/   ____ |  | |__| ____ |   |\______   \__| ____   ____
/   \  ___  /  _ \|  | |  |/  _ \|   | |    |  _/  |/ __ \ /    \\
\    \_\  \(  <_> )  |_|  (  <_> )   | |    |   \  \  ___/|   |  \\
 \______  / \____/|____/__|\____/|___| |______  /__|\___  >___|  /
        \/                                    \/     \/     \/
`);
}

async function runReplicate(prompt) {
  clearScreen();
  printLlamaBanner();

  const input = {
    prompt,
  };

  try {
    const stream = replicate.stream('meta/llama-2-70b-chat', { input });

    for await (const event of stream) {
      process.stdout.write(event.toString());
    }
  } catch (error) {
    console.error('Error during replication:', error);
  }
}

async function startChat() {
  let userPrompt = '';

  while (userPrompt.toLowerCase() !== 'exit') {
    userPrompt = await askUserPrompt();
    if (userPrompt.toLowerCase() !== 'exit') {
      await runReplicate(userPrompt);
    }
  }

  rl.close();
}

function askUserPrompt() {
  return new Promise((resolve) => {
    rl.question('Enter your prompt (type "exit" to end): ', (answer) => {
      resolve(answer);
    });
  });
}

startChat();
