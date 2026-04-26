#!/usr/bin/env python3
"""Flask web server for Tic Tac Toe."""

from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder='templates', static_folder='static')


class GameLogic:
    def __init__(self):
        self.board = [0] * 9
        self.current_player = 1  # 1 for X, 2 for O

    def make_move(self, position):
        if position < 0 or position > 8 or self.board[position] != 0:
            return False
        self.board[position] = self.current_player
        self.current_player = 2 if self.current_player == 1 else 1
        return True

    def check_winner(self):
        win_conditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]

        for condition in win_conditions:
            if (self.board[condition[0]] == self.board[condition[1]] ==
                self.board[condition[2]] != 0):
                return self.board[condition[0]], condition

        return 0, []

    def is_board_full(self):
        return all(cell != 0 for cell in self.board)

    def get_state(self):
        winner, winning_cells = self.check_winner()
        game_over = winner != 0 or self.is_board_full()

        return {
            'board': self.board,
            'current_player': self.current_player,
            'winner': winner,
            'winning_cells': winning_cells,
            'game_over': game_over,
            'is_full': self.is_board_full()
        }

    def reset(self):
        self.board = [0] * 9
        self.current_player = 1


game = GameLogic()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/state', methods=['GET'])
def get_state():
    return jsonify(game.get_state())


@app.route('/api/move', methods=['POST'])
def make_move():
    data = request.json
    position = data.get('position')

    if not game.make_move(position):
        return jsonify({'success': False, 'error': 'Geçersiz hamle'})

    return jsonify(game.get_state())


@app.route('/api/reset', methods=['POST'])
def reset():
    game.reset()
    return jsonify(game.get_state())


if __name__ == '__main__':
    app.run(debug=True, port=5000)
