import asyncio

async def fetchData(args):
    print("Fetching data with arguments:", args)
    await asyncio.sleep(2)  # Simulate a network call
    return {"data": "Sample data based on " + str(args)}

async def main():
    result = await fetchData("example arguments")
    print("Data fetched:", result)

asyncio.run(main())