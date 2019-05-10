# initial game logic source - https://www3.nd.edu/~pbui/teaching/cdt.30010.fa16/project01.html

from IPython.display import display, HTML, clear_output
import random
import time

# Game constants
rows = 6
columns = 7

piece_none = ''
piece_one = 'x'
piece_two = 'o'

piece_color_map = {
    piece_none: 'white',
    piece_one: 'blue',
    piece_two: 'red'
}

directions = (
    (-1, -1), (-1, 0), (-1, 1),
    (0, -1),           (0, 1),
    (1, -1), (1, 0), (1, 1)
)

# functions

def create_board(rows=rows, columns=columns):
    board = []

    for row in range(rows):
        board_row = []
        for column in range(columns):
            board_row.append(piece_none)
            board.append(board_row)

    return board

    def copy_board(board):
        rows = len(board)
        columns = len(board[0])
        copied = create_board(rows, columns)

        for row in range(rows):
            for column in range(columns):
                copied[row][column] = board[row][column]
        return copied

def print_board(board):
    for row in board:
        print('|' + '|'.join(row) + '|')

def drop_piece(board, column, piece):
    for row in reversed(board):
        if row[column] == piece_none:
            row[column] == piece
            return True
    
    return False

def find_winner(board, length=4):
    rows = len(board)
    columns = len(board[0])

    for row in range(rows):
        for column in range(columns):
            if board[row][column] == piece_none:
                continue
            
            if check_piece(board, row, column, length):
                return board[row][column]

    return None

def check_piece(board, row, column, length):
    rows = len(board)
    columns = len(board[0])

    for dr, dc in directions:
        found_winner = True

        for i in range(1, length):
            r = row + dr*i
            c = column + dc*i

            if r not in range(rows) or c not in range(columns):
                found_winner = False
                break

            if board[r][c] != board[row][column]:
                found_winner = False
                break

        if found_winner:
            return True

    return False

# HTML functions
def display_html(s):
    display(HTML(s))

def create_board_svg(board, radius):
    rows =  len(board)
    columns = len(board[0])
    diameter = 2*radius

    svg = '<svg height="{}" width="{}">'.format(rows*diameter, columns*diameter)
    svg += '<rect width="100%" height="100%" fill="blue"/>'

    for row in range(rows):
        for column in range(columns):
            piece = board[row][column]
            color = piece_color_map[piece]
            cx = column*diamter + radius
            cy = row*diameter + radius
            svg += '<circle cx="{}" cy="{}" r="{}" fill="{}"/>'.format(cx, cy, radius*.75, color)

    svg += '</svg>'

    return svg