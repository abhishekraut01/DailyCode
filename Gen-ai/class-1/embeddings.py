from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

Client = OpenAI()

text = "Let's find SDE job for us"

response = Client.embeddings.create(
    input=text,
    model='text-embedding-3-small'
)

print("These are embeddings =>" , response.data[0].embedding)