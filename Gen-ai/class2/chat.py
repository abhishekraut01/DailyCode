from dotenv import load_dotenv
import json

from openai import OpenAI
import requests
import subprocess
import platform

os_info = platform.system()

load_dotenv()
client = OpenAI()

def execute_command(command_list):
    try:
        if isinstance(command_list, list):
            command = " ".join(command_list)
        else:
            command = command_list

        output = subprocess.run(
            command,
            check=True,
            capture_output=True,
            text=True,
            shell=True
        )

        return output.stdout or "(command ran with no output)"

    except subprocess.CalledProcessError as e:
        return f"Error: {e.stderr}"

def get_weather(city: str):
    url = f"https://wttr.in/{city}?format=j1"
    response = requests.get(url)
    
    if response.status_code != 200:
        return "Error fetching weather"

    data = response.json()
    
    temp_c = data["current_condition"][0]["temp_C"]
    desc = data["current_condition"][0]["weatherDesc"][0]["value"]
    
    return f"{city}: {temp_c}°C, {desc}"

available_tools = {
    "get_weather":[
        get_weather,
        {
            "about_tool":"Gives Weather information based on input city in string format",
            "input":"city in string format",
            "output":"weather information like temperature in string format"
        }
    ],
    "execute_command":[
        execute_command,
        {
            "about_tool":"Executes the given command in list format and gives output",
            "input":"command in list format",
            "output":"output of the command execution"
        }
    ]
}

system_prompt = f'''
    You are a helpfull assistent and you work on Think Plan action observe output mode to resolve the user query 
    Based on the user input you do decide which work you need to do

    Current Operating System: {os_info}


    you have this tools access
    Available tools : {available_tools}

    example :
    user_input : Tell me what is temperature in hinganghat and what is the status of weather 
de
    Output : 
    {{"step":"think" , "content":"User is asking for temperature in hinganghat and current Weather Details"}},
    {{"step":"Plan" , "content":"I Need to call get_weather tool in order to get current weather details"}},
    {{"step":"action" , "tool":"get_weather" , "input":"hinganghat"}},
    {{"step":"observe" , "content":"get_weather tool gives us 45 degree celcius for hinganghat"}},
    {{"step":"output" , "content":"The current weather in hinganghat is too Hot , Its 45 degree celcius . Please take care of yourself and avoid sun exposure and drink water as much as possible"}}

    We want strict JSON Output format

    Note: if the step is action give this type of output
    {{
        "step":"action",
        "tool":"get_weather"
        "input":"hinganghat",
    }}

    if the step is one of from Think Plan action observe output
    give this type of output

    {{
        "step":"Think | Plan | observe | output",
        "content":"string",
    }}

    You always give one output at a time and Then proceed to next step 

    example :
    user_input : what is the current weather in hinganghat 

    output : 
    {{
        "step": "think",
        "content": "User is asking for current Weather Details for hinganghat"
    }}
'''

messages=[]

messages.append(
    {
        "role":"system",
        "content":system_prompt
    }
)

while True:
    user_input = input(">")
    if(user_input.lower() == "exit"): break
    messages.append(
        {
            "role":"user",
            "content":user_input
        }
    )

    while True:

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages
        )

        parsed_output = json.loads(response.choices[0].message.content)

        messages.append(
            {
                "role":"assistant",
                "content":json.dumps(parsed_output)
            }
        )

        if(parsed_output['step'] == "output"):
            print(f"🤖 -> ",parsed_output['content'])
            break

        print(f"🧠" , parsed_output)
        if(parsed_output['step'] != "action"): continue

        tool_response = available_tools[parsed_output['tool']][0](parsed_output['input'])

        messages.append({
            "role":"user",
            "content":json.dumps({"step":"observe","tool":parsed_output['tool'],"output":tool_response})
        })

        