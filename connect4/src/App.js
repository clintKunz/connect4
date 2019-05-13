import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid red; 
  min-width: 400px; 
  max-width: 1100px;
  width: 100%; 
`;

const Header = styled.h1`
  display: flex;
  justify-content: center; 
  color: blue;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid red; 
  width: 100px; 
  margin: 0 auto; 
  &:hover {
    cursor: pointer;
  }
`;

const Player = styled.h3`
  display: flex; 
  justify-content: space-between; 
  width: 60%;
  margin: 0 auto; 
  border: 1px solid blue; 
`;

const ClickArea = styled.div`
  width: 60%;
  height: 50px;  
  margin: 0 auto; 
`;

const PickColumn = styled.div`
  display: flex; 
  justify-content: space-around; 
  background-color: green;
  width: 100%; 
  height: 100%;
  
  &:hover {
    cursor: pointer; 
  }
`;

const Board = styled.div`
  width: 60%; 
  margin: 0 auto 30px; 
`;

const Row = styled.div`
  display: flex; 
  justify-content: space-around; 
  background-color: yellow;
  width: 100%; 
`;

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
`;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player1: 1,
      player2: 2,
      currentPlayer: 1,
      turn: true,
      gameOver: false,
      board: [],
      columns: [0,1,2,3,4,5,6]
    }
  }

  componentDidMount() {
    this.initializeBoard()
  }

  initializeBoard = () => {
    let board = [];
    for (let r = 0; r < 6; r++) {
      let row = [];
      for (let c = 0; c < 7; c++) { row.push(null) }
      board.push(row);
    }

    this.setState({
      board,
      gameOver: false
    })
  }

  play = column => {
    let board = this.state.board;
    for (let r = 5; r >= 0; r--) {
      if(board[r][column] === null) {
        board[r][column] = this.state.currentPlayer;
        break
      }
    }
    let newCurrentPlayer
    if(this.state.currentPlayer === 2) {
      newCurrentPlayer = 1;
    } else {
      newCurrentPlayer = 2
    }
    this.setState({
      board,
      turn: !this.state.turn,
      currentPlayer: newCurrentPlayer
    })
    if(this.checkWinner() !== null) {
      this.setState({
        gameOver: true
      })
    }
  }

  checkWinner = () => {
    function checkVertical(board) {
      // Check only if row is 3 or greater
      for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
          if (board[r][c]) {
            if (board[r][c] === board[r - 1][c] &&
                board[r][c] === board[r - 2][c] &&
                board[r][c] === board[r - 3][c]) {
              return board[r][c];    
            }
          }
        }
      }
    };
    function checkHorizontal(board) {
      // Check only if column is 3 or less
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
          if (board[r][c]) {
            if (board[r][c] === board[r][c + 1] && 
                board[r][c] === board[r][c + 2] &&
                board[r][c] === board[r][c + 3]) {
              return board[r][c];
            }
          }
        }
      }
    };
    function checkDiagonalRight(board) {
      // Check only if row is 3 or greater AND column is 3 or less
      for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
          if (board[r][c]) {
            if (board[r][c] === board[r - 1][c + 1] &&
                board[r][c] === board[r - 2][c + 2] &&
                board[r][c] === board[r - 3][c + 3]) {
              return board[r][c];
            }
          }
        }
      }
    };
    function checkDiagonalLeft(board) {
      // Check only if row is 3 or greater AND column is 3 or greater
      for (let r = 3; r < 6; r++) {
        for (let c = 3; c < 7; c++) {
          if (board[r][c]) {
            if (board[r][c] === board[r - 1][c - 1] &&
                board[r][c] === board[r - 2][c - 2] &&
                board[r][c] === board[r - 3][c - 3]) {
              return board[r][c];
            }
          }
        }
      }
    };
    function checkDraw(board) {
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
          if (board[r][c] === null) {
            return null;
          }
        }
      }
      return 'draw';    
    };

    let board = this.state.board;
    return checkVertical(board) || checkDiagonalRight(board) || checkDiagonalLeft(board) || checkHorizontal(board) || checkDraw(board);
  }

  render() {
    return (
      <Container>
        <Header>Connect 4!</Header> 
        <Player>
          <div style={{color: 'red'}}>
            X
            {this.state.turn? <div>Your Turn</div>: null}
          </div>
          <div style={{color: 'green'}}>
            O
            {!this.state.turn? <div>Your Turn</div>: null}
          </div>
        </Player>
        <ClickArea>
          <PickColumn>
            {this.state.columns.map(column => 
              <Cell
                onClick={e => this.play(column)}
              >
                {column}
              </Cell>
            )}
          </PickColumn>
        </ClickArea>
        {this.state.gameOver? (
          <div>game over!</div>
        )
        : 
        (
          <Board>
            {this.state.board.map(row => (
              <Row>
              {row.map(cell => (
                <Cell>{cell === null? 'e' : cell === 1? 'x': 'o'}</Cell>
              ))}
              </Row>
            ))}
          </Board>
        )}
        <Button onClick={this.initializeBoard}>Reset Game</Button>
      </Container>
    );
  }
}

export default App;
