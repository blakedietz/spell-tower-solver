var Tile = require('./tile');

function Board(numRows, numColumns)
{
    this._tiles      = [];
    this._numRows    = numRows;
    this._numColumns = numColumns

    // Initialize the board
    this.buildBoard(numRows, numColumns);
}

Board.prototype.buildBoard = buildBoard;
Board.prototype.printBoard = printBoard;
Board.prototype.dimensions = dimensions;
Board.prototype.getTile    = getTile;

module.exports = Board;

// Public
/**
 * Print a board to the console.
 */
function printBoard()
{
    var rowString = '';

    for (var row = 0; row < this._numRows; row++)
    {
        rowString = '';
        for(var column = 0; column < this._numColumns; column++)
        {
            rowString += this._tiles[row][column].toString();
        }
        console.log(rowString);
    }
}

function getTile(rowIndex, columnIndex)
{
    if (rowIndex    > this.numRows - 1    || rowIndex    < 0)
    {
       return null;
    }

    if (columnIndex > this.numColumns - 1 || columnIndex < 0)
    {
        return null;
    }

    return this._tiles[rowIndex][columnIndex];
}

function dimensions()
{
    return {numColumns : this._numColumns, numRows : this._numRows};
}

// Private
/**
 * Creates the underlying two dimensional array of Tile objects that represents the
 * game board. Modifies the tiles attribute of Board.
 * @param {number} numRows
 * @param {number} numColumns
 */
function buildBoard(numRows, numColumns)
{
    for (var row = 0; row < numRows; this._tiles.push([]), row++);

    for (var row = 0; row < numRows; row++)
    {
        for (var column = 0; column < numColumns; column++)
        {
            this._tiles[row].push(makeTile(column, row));
        }
    }
}

/**
 *
 * @param   {number} columnIndex
 * @param   {number} rowIndex
 * @returns {Tile}
 */
function makeTile(columnIndex, rowIndex)
{
    var letter;
    var type;
    var randomGen = false;

    if (randomGen)
    {
        letter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        type   = 'letter';
    }
    else
    {
        letter = testBoard()[rowIndex][columnIndex];
    }

    return new Tile(columnIndex, rowIndex, type, letter);
}

function testBoard()
{
    return  [
        ['c', 'a', 't'],
        ['o', 'l', 'd'],
        ['l', 's', 'b']
    ];
}