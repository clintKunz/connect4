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

const Player = styled.h3`
  display: flex; 
  justify-content: space-between; 
  width: 60%;
  margin: 0 auto; 
  border: 1px solid blue; 
`;

const Board = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  width: 60%; 
  margin: 30px auto; 
`;

const Row = styled.div`
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
      player1: 'player1',
      player2: 'player2',
      turn: true,
      board: [],
      edit: false
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

  handler = e => {
    e.preventDefault()
    console.log(e)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <Container>
        <Header>Connect 4!</Header> 
        <Player>
          <div style={{color: 'red'}}>
            <div onClick={() => this.setState({edit: true})}>
              {!this.state.edit? 
                this.state.player1 
                : 
                <input 
                  onChange={this.handler} 
                  value={this.state.player1} 
                  name='player1' 
                  onKeyDown={e => e.keyCode === 13? this.setState({edit: false}): null}
                />
              }
            </div>
            {this.state.turn? <div>Your Turn</div>: null}
          </div>
          <div style={{color: 'green'}}>
            <div onClick={() => this.setState({edit: true})}>
              {!this.state.edit? 
                this.state.player2 
                : 
                <input 
                  onChange={this.handler} 
                  value={this.state.player2} 
                  name='player2' 
                  onKeyDown={e => e.keyCode === 13? this.setState({edit: false}): null}
                />
              }
            </div>
            {!this.state.turn? <div>Your Turn</div>: null}
          </div>
        </Player>
        <Board>
          {this.state.board.map(row => (
            <Row>
            {row.map(cell => (
              <Cell>{cell === null? 'e' : cell === 1? 'x': 'o'}</Cell>
            ))}
            </Row>
          ))}
        </Board>
      </Container>
    );
  }
}

export default App;
