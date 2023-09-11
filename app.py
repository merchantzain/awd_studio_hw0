# import libraries
from flask import Flask, render_template

# define flask application (invoked by wsgi)
app = Flask(__name__)

# home page
@app.route("/")
def hello_world():
    return render_template('index.html')

# start flask application on script run
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)