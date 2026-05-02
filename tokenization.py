import tiktoken

encoder = tiktoken.encoding_for_model('gpt-4o')

print("vocab size" , encoder.n_vocab)
