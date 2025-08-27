from flask import Flask, request, jsonify
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample data for recommendations
recommendations = [
    {"name": "SASSAFRAS Women Solid Kidult Kitsch Trousers", "link": "https://www.myntra.com/trousers/sassafras/sassafras-women-white-slim-fit-mid-rise-cigarette-trousers/25029070/buy", "price": "Rs. 873", "image": "https://imgs.search.brave.com/PiCSRAthiOzOLdNyqwPI4K_B762RXkYNCZInsLx4sJM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZmFzaGlvbGEu/aW4vcHJvZHVjdC1s/aXN0LzMwMHg0NTAv/bXludHJhLzEwMzM4/Mzk4Ny93b21lbi13/aGl0ZS1zbGltLWZp/dC1taWQtcmlzZS1j/aWdhcmV0dGUtdHJv/dXNlcnMud2VicA"},
    {"name": "Roadster Women Wide Leg Jeans", "link": "https://www.myntra.com/jeans/roadster/the-roadster-lifestyle-co-women-wide-leg-high-rise-cargo-jeans/19759022/buy", "price": "Rs. 1304", "image": "https://imgs.search.brave.com/0JiCKzbN8E4LMXX1QjTaG_CyCu-px7-2m8DJk44n00c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzF1TUZIK0NNZUwu/anBn"},
    {"name": "Roadster Women Cargo Track Pants", "link": "https://www.myntra.com/jeans/roadster/the-roadster-lifestyle-co-women-wide-leg-high-rise-stretchable-jeans/18202354/buy", "price": "Rs. 781", "image": "https://imgs.search.brave.com/w7oljre2tx_4W8TT34AcG9whu4RnKmMa08teEN9INcw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFBTzZjQ2d4R0wu/anBn"},
    {"name": "Women Solid Trousers", "link": "https://www.myntra.com/jeans/roadster/the-roadster-lifestyle-co-women-cream-coloured-winter-ramble-color-me-up-denims-jeans/19759102/buy", "price": "Rs. 524", "image": "https://imgs.search.brave.com/QOHrWkIJWII21YwyT4CoKjiFz_LkscH2oPw2Wbj7Zzw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcw/MS56dGF0Lm5ldC9h/cnRpY2xlL3NwcC1t/ZWRpYS1wMS80MWQ0/YzkwYzkyMmQ0NDYz/OWNhOWYwNjY5Y2Fm/MWVlNS9mMDZjYjMx/OTM5OTY0MGU2OTk5/OWE3OGFjM2Y1ZGZm/MS5qcGc_aW13aWR0/aD0zMDA"}
]

@app.route('/recommend', methods=['POST'])
def recommend():
    user_input = request.json.get('user_input')
    response = random.sample(recommendations, 4)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
