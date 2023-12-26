const readline = require('readline');
const Replicate = require('replicate');

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
/   \\  ___  /  _ \\|  | |  |/  _ \\|   | |    |  _/  |/ __ \\ /    \\
\\    \\_\\  \\(  <_> )  |_|  (  <_> )   | |    |   \\  \\  ___/|   |  \\
 \\______  / \\____/|____/__|\\____/|___| |______  /__|\\___  >___|  /
        \\/                                    \\/     \\/     \\/
`);
}

async function runReplicate(prompt) {
  const input = {
    prompt,
  };

  try {
    const stream = replicate.stream('meta/llama-2-70b-chat', { input });

    for await (const event of stream) {
      const message = event.toString();
      process.stdout.write(`${message}\n`);
    }
  } catch (error) {
    console.error('Error during replication:', error);
  }
}

async function startChat() {
  printLlamaBanner();

  let userPrompt = '';

  while (userPrompt.toLowerCase() !== 'exit') {
    // Print a line under the logo
    console.log('-'.repeat(50));

    userPrompt = await askUserPrompt();
    if (userPrompt.toLowerCase() !== 'exit') {
      await runReplicate(userPrompt);
    }

    // Close the line after each interaction
    console.log('-'.repeat(50));
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
