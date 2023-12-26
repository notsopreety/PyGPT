const readline = require('readline');
const Replicate = require('replicate');
const clear = require('clear');

const REPLICATE_API_TOKEN = "r8_dyCs0exhBet4pIqrmJtdya4Joj7rCqE00CWQp";

const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
});

// Function to start a conversation based on user input
const startConversation = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Prompt the user to enter a custom prompt
  rl.question("You: ", async (userPrompt) => {
    const input = {
      prompt: userPrompt,
    };

    // Close the readline interface
    rl.close();

    // Stream events based on the user-defined prompt
    for await (const event of replicate.stream("meta/llama-2-70b-chat", { input })) {
      process.stdout.write(event.toString());
    }

    // Draw a line to separate conversations
    console.log("\n" + "-".repeat(30) + "\n");

    // Start a new conversation after the current one ends
    startConversation();
  });
};

// Clear the screen and print "About LLAMA" once at the beginning
clear();
console.log(`
██╗     ██╗      █████╗ ███╗   ███╗ █████╗
██║     ██║     ██╔══██╗████╗ ████║██╔══██╗
██║     ██║     ███████║██╔████╔██║███████║
██║     ██║     ██╔══██║██║╚██╔╝██║██╔══██║
███████╗███████╗██║  ██║██║ ╚═╝ ██║██║  ██║
╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝-70B
-----------------------------------------------
Powerful AI ChatBot By Meta With 70B Parameters
-----------------------------------------------
`);

// Start the initial conversation
startConversation();
