from pprint import pprint
from flask import Flask, render_template, request
import json
import requests

app = Flask(__name__)

app.debug = True

@app.route("/")
def main_page():
    return render_template('index.html')


@app.route("/post", methods=['POST'])
def post_to_platform():
    url = request.json['writeApiLocation']
    data = request.json['jsonToPost']
    bearerToken = request.json.get('bearerToken')
    headers = {'content-type': 'application/json'}

    if bearerToken is not None:
        headers.update({'Authorization': 'Bearer ' + bearerToken})

    try:
        req = requests.post(url, data,
                            headers=headers)
        if req.status_code is 200:
            return "thanks"
        else:
            return req.text, req.status_code
    except Exception as e:
        return json.dumps({'error': str(e)}), 400


if __name__ == "__main__":
    app.run()
