from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()

client.chat.completions.create(
    model="gpt-4"
)