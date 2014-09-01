var Tile = require('./tile');

function Board(numRows, numColumns)
{
    this.tiles = [];

    for (var row = 0; row < numRows; this.tiles.push([]), row++)
    {
        for (var column= 0; column < numColumns; column++)
        {
            this.tiles[row].push(makeTile(column, row));
        }
    }
}

function makeTile(column, row)
{
    var letter;
    var type;
    var randomGen = true;

    if (randomGen)
    {
        letter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        type   = letter;
    }
    else
    {
       letter = testBoard()[column][row];
    }

    return new Tile(column, row, type);
}

function testBoard()
{
    var board = [
                    ['c', 'a', 't'],
                    ['o','l',  'd'],
                    ['l', 's', 'b']
                ];
}