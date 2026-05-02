from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
sentences =  ['You are reading nikhil blog.']

embeddings = model.encode(sentences)
print(embeddings)
