import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  currentScore: number = 0;
  bestScore: number = 0;
  moveCount: number = 0;
  currentTime: string = '00:00';
  board: number[][] = [];
  colorMap: { [key: number]: string } = {};
  gameStarted: boolean = false;
  startGameTime: number | null = null;
  private previousBoards: number[][][] = []; // Stack for previous board states
  gameOver: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.colorMap = {
      0: 'gray',
      2: 'red',
      4: 'green',
      8: 'yellow',
      16: 'blue',
      32: 'purple',
      64: 'orange',
      128: 'pink',
      256: 'cyan',
      512: 'lime',
      1024: 'teal',
      2048: 'gold'
    };

    // Initialize touch gesture handler
    const boardElement = document.getElementById('game-board');
    if (boardElement) {
      const hammer = new Hammer(boardElement);
      hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
      hammer.on('swipeleft', () => this.handleSwipe('left'));
      hammer.on('swiperight', () => this.handleSwipe('right'));
      hammer.on('swipeup', () => this.handleSwipe('up'));
      hammer.on('swipedown', () => this.handleSwipe('down'));
    }

    this.startGame();
  }

  startGame() {
    this.currentScore = 0;
    this.moveCount = 0;
    this.gameOver = false;
    this.intializeBoard();
    this.addRandomTile();
    this.addRandomTile();
    this.startTimer();
  }

  intializeBoard() {
    this.board = Array.from({ length: 4 }, () => Array(4).fill(0));
  }

  handleSwipe(direction: string) {
    if (this.gameOver) return; // Ignore input if the game is over

    this.saveBoardState(); // Save the current state for undo
    let moved = false;
    switch (direction) {
      case 'left': moved = this.moveLeft(); break;
      case 'right': moved = this.moveRight(); break;
      case 'up': moved = this.moveUp(); break;
      case 'down': moved = this.moveDown(); break;
    }
    if (moved) {
      this.addRandomTile();
      this.moveCount++;
      if (this.isGameOver()) {
        this.gameOver = true;
        alert('Game Over!');
      }
    }
    this.cdr.detectChanges(); // Notify Angular about changes
  }

  moveLeft(): boolean {
    let moved = false;
    for (let row = 0; row < 4; row++) {
      let newRow = this.board[row].filter(val => val !== 0);
      let mergedRow = [];
      let skip = false;

      for (let col = 0; col < newRow.length; col++) {
        if (skip) {
          skip = false;
          continue;
        }
        if (col < newRow.length - 1 && newRow[col] === newRow[col + 1]) {
          mergedRow.push(newRow[col] * 2);
          this.currentScore += newRow[col] * 2;
          skip = true;
          moved = true;
        } else {
          mergedRow.push(newRow[col]);
        }
      }

      while (mergedRow.length < 4) {
        mergedRow.push(0);
      }

      if (!this.arraysEqual(this.board[row], mergedRow)) {
        this.board[row] = mergedRow;
        moved = true;
      }
    }
    return moved;
  }

  moveRight(): boolean {
    this.reverseRows();
    const moved = this.moveLeft();
    this.reverseRows();
    return moved;
  }

  moveUp(): boolean {
    this.transposeBoard();
    const moved = this.moveLeft();
    this.transposeBoard();
    return moved;
  }

  moveDown(): boolean {
    this.transposeBoard();
    this.reverseRows();
    const moved = this.moveLeft();
    this.reverseRows();
    this.transposeBoard();
    return moved;
  }

  reverseRows() {
    this.board.forEach(row => row.reverse());
  }

  transposeBoard() {
    this.board = this.board[0].map((_, colIndex) => this.board.map(row => row[colIndex]));
  }

  addRandomTile() {
    let emptyCells: { row: number, col: number }[] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.board[i][j] === 0) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }

    if (emptyCells.length) {
      let randIndex = Math.floor(Math.random() * emptyCells.length);
      let { row, col } = emptyCells[randIndex];
      this.board[row][col] = Math.random() < 0.9 ? 2 : 4; // Add 2 or 4
    }
  }

  startTimer() {
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.startGameTime = Date.now();
      setInterval(() => {
        if (this.startGameTime) {
          let currTime = Date.now();
          let diff = currTime - this.startGameTime;
          this.displayTimer(diff);
        }
      }, 1000);
    }
  }

  displayTimer(time: number) {
    const minutes = Math.floor(time / 1000 / 60);
    const seconds = Math.floor((time / 1000) % 60);
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    this.currentTime = `${displayMinutes}:${displaySeconds}`;
  }

  getColor(val: number) {
    return this.colorMap[val] || 'gray';
  }

  saveBoardState() {
    // Save the current board state onto the stack
    this.previousBoards.push(this.board.map(row => [...row]));
  }

  undo() {
    if (!this.gameOver && this.previousBoards.length > 0) {
      this.board = this.previousBoards.pop()!;
      this.moveCount--;
      this.cdr.detectChanges(); // Notify Angular about changes
    }
  }

  arraysEqual(arr1: number[], arr2: number[]): boolean {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  isGameOver(): boolean {
    if (this.board.some(row => row.includes(0))) {
      return false;
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === this.board[i][j + 1] || this.board[j][i] === this.board[j + 1][i]) {
          return false;
        }
      }
    }
    return true;
  }
}
