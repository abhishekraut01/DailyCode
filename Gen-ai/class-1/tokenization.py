import tiktoken

encoder = tiktoken.encoding_for_model('gpt-4o')

text  = "Hello, how are you doing today? I hope you're having a great day!"

tokens = encoder.encode(text)
print(f"Text: {text}")
print(f"Tokens: {tokens}")

myTokens = [13225, 11, 1495, 553, 481, 5306, 4044, 30, 357, 5498, 7163, 4566, 261, 2212, 2163, 0]

decoded_text = encoder.decode(myTokens)
print(f"Decoded Text: {decoded_text}")