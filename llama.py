import os
import replicate

def clear_screen():
    if os.name == 'nt':
        os.system('cls')
    else:
        os.system('clear')

def print_llama_banner():
    llama_banner = """
   _____ ____  ____   __   ______  __     _______  ______
  / ___/|    ||    \ |  | |      ||  |   |       ||      |
 (   \_  |  | |  _  ||  |_|      ||  |   |   _   ||      |
  \__  | |  | |  |  ||   _  |    ||  |___|  | |  ||_|  |_|
  /  \ | |  | |  |  ||  | |  |    ||       |  |_|  |  |
  \    | |  | |  |  ||  | |  |    | \      |       |  |
   \___| |____||__|__||__| |__|    |  \____|_______|__|

Welcome to LLAMA-2-70b Chat! Type 'exit' to end the conversation.
    """
    print(llama_banner)

def run_llama_chat(prompt="..."):
    # The meta/llama-2-70b-chat model can stream output as it's running.
    for event in replicate.stream("meta/llama-2-70b-chat", input={"prompt": prompt}):
        print(str(event), end="")

if __name__ == "__main__":
    clear_screen()
    print_llama_banner()

    while True:
        user_prompt = input("You: ")
        if user_prompt.lower() == "exit":
            break

        print("LLAMA-2-70b: ", end="")
        run_llama_chat(prompt=user_prompt)
