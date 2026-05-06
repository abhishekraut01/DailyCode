num = 11

print(f"Before: {id(num)}")

num += 1

print(f"After: {id(num)}")

print(f"The value of num get changes and the memory address also changes. This is because integers are immutable in Python, so when we perform an operation that modifies the value, a new object is created in memory to hold the new value.")