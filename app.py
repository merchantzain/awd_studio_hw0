# import libraries
from flask import Flask, render_template, request, jsonify
import openai
import os
from base64 import b64decode
from pathlib import Path

# define flask application (invoked by wsgi)
app = Flask(__name__)

# obtain openai key
openai.api_key = os.environ["AWDS_OPENAI_KEY"]

# home page
@app.route("/")
def hello_world():
    return render_template('index.html')

# get name ideas for the new pokemon
@app.route('/get_inspiration', methods=['GET', 'POST'])
def get_inspiration():
    # process input query
    data = request.get_json()
    processed_colors = f"{data['colors'][0]} and {data['colors'][1]}" if len(data['colors']) > 1 else data['colors'][0]
    processed_types = f"{data['types'][0]} and {data['types'][1]}" if len(data['types']) > 1 else data['types'][0]
    names_query = f"Give a 5 names for a {processed_types} type Pokemon that lives in {data['habitat']} and resembles a {data['animal']} in the format 1. name"
    image_query = f"{processed_colors} {processed_types} type Pokemon that lives in {data['habitat']} and resembles a {data['animal']}"
    
    # make request for obtaining ideas for possible names
    names_response = openai.Completion.create(engine="text-davinci-003", prompt=names_query, max_tokens=256)["choices"][0]["text"]
    names_response = names_response.split('\n')
    names_parsed = [line.split('. ')[1].split(' ')[0] for line in names_response if len(line.split('. ')) == 2]
    
    # make a request for an illustration example
    image_url = openai.Image.create(
        prompt=image_query,
        n=1,
        size="512x512",
    )['data'][0]['url']
    
    return jsonify({
        "names": names_parsed,
        "image_url": image_url
    })

# start flask application on script run
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)