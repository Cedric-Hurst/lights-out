import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
  }

  createBoard() {
    let board = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y,x)//center
    flipCell(y, x + 1);//right
    flipCell(y, x - 1);//left
    flipCell(y + 1, x );//below
    flipCell(y - 1, x );//above

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({board, hasWon });
  }


  render() {
    const title = <div><span className="neon-orange">Lights </span><span className="neon-blue"> Out</span></div>
    const tblBoard = this.state.board.map((row, y) =>
      <tr key={y}>{row.map((cell, x) =>
        <Cell key={`${y}-${x}`} isLit={cell} flipCellsAroundMe={() => this.flipCellsAround(`${y}-${x}`)} />)}
      </tr>)
    const table = <div>{title}<table className="Board"><tbody>{tblBoard}</tbody></table></div>
    const win = <div><span className="neon-orange">You </span><span className="neon-blue"> Win!</span></div>
    return (
      <div>
        {this.state.hasWon ? win : table}
      </div>
    )
  }
}


export default Board;
