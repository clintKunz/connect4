import React from 'react';
import styled from 'styled-components';
import RowComponent from './Components/Row';

const Container = styled.div`
  min-width: 400px; 
  max-width: 700px;
  width: 100%; 
  height: 80vh; 
  margin: 30px auto; 
`;

const Header = styled.h1`
  display: flex;
  justify-content: center; 
  color: blue;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  width: 100px; 
  margin: 0 auto; 
  padding: 10px 0;
  &:hover {
    cursor: pointer;
    background-color: grey; 
  }
`;

const Player = styled.h3`
  display: flex; 
  justify-content: space-between; 
  width: 60%;
  margin: 20px auto; 
`;

const ClickArea = styled.div`
  width: 60%;
  height: 50px;
  margin: 0 auto; 
`;

const PickColumn = styled.div`
  display: flex; 
  justify-content: space-around; 
  width: 100%; 
  height: 100%;
`;

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
  height: 50px; 
  width: 100%; 
  &:hover {
    cursor: pointer;
    background-color: blue; 
  }
`;

const Board = styled.div`
  border: 3px solid blue; 
  width: 60%; 
  height: 300px; 
  margin: 0 auto 30px; 
`;

const GameOver = styled.div`
  font-size: 30px; 
  color: blue; 
  text-align: center;
  margin: 20px 0; 
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
      gameOver: false,
      turn: true,
      currentPlayer: 1
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
    if(this.checkWinner() === 'draw') {
      this.setState({
        gameOver:true,
        currentPlayer: 3,
        turn: null
      })
    }
    if(this.checkWinner() !== null) {
      this.setState({
        gameOver: true,
        turn: null
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
            Player 1
            {this.state.turn? <div>Your Turn</div>: null}
          </div>
          <div style={{color: 'green'}}>
            Player 2 
            {this.state.turn !== null && !this.state.turn? <div>Your Turn</div>: null}
          </div>
        </Player>
        {this.state.gameOver? (
          <GameOver>{this.state.currentPlayer === 3? 'Draw!' : this.state.currentPlayer === 1? 'Player 2 Wins!': 'Player 1 Wins'}</GameOver>
        )
        : 
        (
          <>
            <ClickArea>
              <PickColumn>
                {this.state.columns.map(column => 
                  <Cell
                    key={column}
                    onClick={e => this.play(column)}
                  >
                  </Cell>
                )}
              </PickColumn>
            </ClickArea>
            <Board>
              {this.state.board.map(row => (
                <RowComponent row={row} />
              ))}
            </Board>
          </>
        )}
        <Button onClick={this.initializeBoard}>Reset Game</Button>
      </Container>
    );
  }
}

export default App;
