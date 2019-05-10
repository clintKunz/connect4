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

