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
      turn: true,
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
      board
    })
  }

  play = column => {
    let board = this.state.board;
    for (let r = 5; r >= 0; r--) {
      if(board[r][column] === null) {
        board[r][column] = this.state.turn;
        break
      }
    }
    this.setState({
      board,
      turn: !this.state.turn
    })
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
        <Board>
          {this.state.board.map(row => (
            <Row>
            {row.map(cell => (
              <Cell>{cell === null? 'e' : cell === true? 'x': 'o'}</Cell>
            ))}
            </Row>
          ))}
        </Board>
        <Button onClick={this.initializeBoard}>Reset Game</Button>
      </Container>
    );
  }
}

export default App;
