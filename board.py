"""Board representation for Tic Tac Toe."""


class Board:
    def __init__(self):
        self.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

    def display(self):
        """Display the current board state."""
        print("\n")
        for i in range(3):
            row = []
            for j in range(3):
                cell = self.board[i][j]
                if cell == 0:
                    row.append(" ")
                else:
                    row.append("X" if cell == 1 else "O")
            print(f" {row[0]} | {row[1]} | {row[2]} ")
            if i < 2:
                print("-----------")
        print("\n")

    def show_positions(self):
        """Show position numbers for player reference."""
        print("Pozisyon numaraları:")
        print(" 1 | 2 | 3 ")
        print("-----------")
        print(" 4 | 5 | 6 ")
        print("-----------")
        print(" 7 | 8 | 9 ")
        print()
