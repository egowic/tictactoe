"""Tic Tac Toe game logic."""

from board import Board
from player import Player


class TicTacToe:
    def __init__(self):
        self.board = Board()
        self.player_x = Player("X")
        self.player_o = Player("O")
        self.current_player = self.player_x

    def switch_player(self):
        self.current_player = self.player_o if self.current_player == self.player_x else self.player_x

    def make_move(self, position):
        """Place a mark on the board. Returns True if successful."""
        row = (position - 1) // 3
        col = (position - 1) % 3

        if self.board.board[row][col] != 0:
            return False

        self.board.board[row][col] = 1 if self.current_player.symbol == "X" else 2
        return True

    def check_winner(self):
        """Check if there's a winner. Returns 'X', 'O', or None."""
        win_conditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]

        flat = [cell for row in self.board.board for cell in row]

        for condition in win_conditions:
            if flat[condition[0]] == flat[condition[1]] == flat[condition[2]] != 0:
                return "X" if flat[condition[0]] == 1 else "O"

        return None

    def is_board_full(self):
        """Check if the board is full."""
        return all(cell != 0 for row in self.board.board for cell in row)

    def play(self):
        """Main game loop."""
        print("=== Tic Tac Toe ===\n")
        self.board.show_positions()

        while True:
            self.board.display()
            player_symbol = self.current_player.symbol

            while True:
                try:
                    position = int(input(f"{player_symbol} oyuncusu hamle yap (1-9): "))
                    if position < 1 or position > 9:
                        print("1 ile 9 arasında bir sayı gir!")
                        continue

                    if not self.make_move(position):
                        print("Bu hücre zaten dolu!")
                        continue

                    break
                except ValueError:
                    print("Geçersiz giriş! 1-9 arasında bir sayı gir.")

            winner = self.check_winner()
            if winner:
                self.board.display()
                print(f"🎉 {winner} oyuncusu kazandı!")
                break

            if self.is_board_full():
                self.board.display()
                print("🤝 Oyun berabere bitti!")
                break

            self.switch_player()
