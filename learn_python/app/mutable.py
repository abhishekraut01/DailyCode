myset = set()

print(f"Before: {id(myset)}")

myset.add(1)
myset.add(2)
myset.add(3)
print(f"After: {id(myset)}")