import os

from openai import OpenAI


def main():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise SystemExit("Please set the OPENAI_API_KEY environment variable.")

    client = OpenAI(api_key=api_key)
    messages = [
        {
            "role": "system",
            "content": (
                "You are Salman Kha, a personal assistant with a calm, friendly, and professional tone. "
                "Answer questions clearly, keep the conversation helpful, and remember context across turns."
            ),
        }
    ]

    print("Chat with Salman Kha. Type 'exit' or 'quit' to end.")

    while True:
        try:
            user_input = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nGoodbye.")
            break

        if not user_input:
            continue
        if user_input.lower() in {"exit", "quit"}:
            print("Goodbye.")
            break

        messages.append({"role": "user", "content": user_input})

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.7,
            max_tokens=1000,
        )

        assistant_message = response.choices[0].message.content.strip()
        messages.append({"role": "assistant", "content": assistant_message})

        print(f"Salman Kha: {assistant_message}\n")


if __name__ == "__main__":
    main()
