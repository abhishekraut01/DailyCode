

import requests


import requests

def get_weather(city: str):
    url = f"https://wttr.in/{city}?format=j1"
    
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(url, headers=headers, timeout=10)

    if response.status_code != 200:
        return "Error fetching weather"

    data = response.json()

    temp_c = data["current_condition"][0]["temp_C"]
    desc = data["current_condition"][0]["weatherDesc"][0]["value"]

    return f"{city}: {temp_c}°C, {desc}"

print(get_weather("Hinganghat"))