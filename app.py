from flask import Flask, jsonify
from flask_cors import CORS
import pymongo
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['cricket_db']
collection = db['team_stats']

def fetch_data():
    try:
        # Fetch data from MongoDB
        data = list(collection.find({}))
        return data
    except Exception as e:
        print(f"Error fetching data: {e}")
        return None

def piebar(data):
    try:
        teams = [team_data['team'] for team_data in data]
        runs = [team_data['runs'] for team_data in data]
        wickets = [team_data['wickets'] for team_data in data]
        fours = [team_data['fours'] for team_data in data]
        sixes = [team_data['sixes'] for team_data in data]

        # Bar graph
        plt.figure(figsize=(10, 6))

        plt.subplot(2, 2, 1)
        plt.bar(teams, runs, color=['blue', 'green'])
        plt.title('Runs Scored')
        plt.ylabel('Runs')

        plt.subplot(2, 2, 2)
        plt.bar(teams, wickets, color=['blue', 'green'])
        plt.title('Wickets Taken')
        plt.ylabel('Wickets')

        plt.subplot(2, 2, 3)
        plt.bar(teams, fours, color=['blue', 'green'])
        plt.title('Fours Hit')
        plt.ylabel('Fours')

        plt.subplot(2, 2, 4)
        plt.bar(teams, sixes, color=['blue', 'green'])
        plt.title('Sixes Hit')
        plt.ylabel('Sixes')

        plt.tight_layout()

        # Save bar graph to buffer
        bar_buf = io.BytesIO()
        plt.savefig(bar_buf, format='png')
        bar_buf.seek(0)
        bar_graph = base64.b64encode(bar_buf.getvalue()).decode('utf-8')

        # Pie chart
        plt.figure(figsize=(8, 8))
        total_scores = runs + wickets + fours + sixes
        labels = [f'{team} {stat}' for team in teams for stat in ['Runs', 'Wickets', 'Fours', 'Sixes']]
        colors = ['blue', 'green'] * 4

        plt.pie(total_scores, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140)
        plt.title('Overall Match Statistics')

        # Save pie chart to buffer
        pie_buf = io.BytesIO()
        plt.savefig(pie_buf, format='png')
        pie_buf.seek(0)
        pie_chart = base64.b64encode(pie_buf.getvalue()).decode('utf-8')

        return {'bar_graph': bar_graph, 'pie_chart': pie_chart}
    except Exception as e:
        print(f"Error generating graphs: {e}")
        return None

@app.route('/api/statistics', methods=['GET'])
def statistic():
    data = fetch_data()
    if data is None:
        return jsonify({'error': 'Error fetching data'}), 500
    graphs = piebar(data)
    if graphs is None:
        return jsonify({'error': 'Error generating graphs'}), 500
    return jsonify({'barGraph': graphs['bar_graph'], 'pieChart': graphs['pie_chart']})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
