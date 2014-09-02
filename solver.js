function Solver(board, trie)
{
    this._board     = board;
    this._trie      = trie;
    this._frontier  = [];
    this._solutions = {};

    this.solve();
}

function solve()
{
    var dimensions = this.board.dimensions();

    for(var column = 0; column < dimensions.numColumns; column++)
    {
        for(var row = 0; row < dimensions.numRows; row++)
        {
            findWordsFromRootTile(row, column);
        }
    }
}

function findWordsFromRootTile(rowIndex, columnIndex)
{
    addNeighbors(rowIndex, columnIndex);

    // TODO :  Could make a word object
    var currentWord = [];
    var currentTile;

    currentWord.push(this._board.getTile(rowIndex, columnIndex));

    // pop off frontier
    // check if word
    // if word add word to list of solutions
    // check if
    while(this._frontier.length)
    {
        currentTile = this._frontier.pop();
        currentWord.push(currentTile);

        var wordString = addWord(word);

        if (this._trie.checkIfWord(wordString))
        {
            addNeighbors(currentTile.row, currentTile.column);
        }
        else
        {
            currentWord.pop();
        }
    }
}

/**
 *
 * @param Array<Tile> word
 */
function addWord(word)
{
    var string = '';
    for(var i = 0; i < word.length; i++)
    {
        string += word[i].letter();
    }

    if(this._trie.checkIfWord())
    {
        if (!(string in this._solutions))
        {
            this._solutions[string] = [];
        }

        this._solutions[string].push(word);
    }

    return string;
}

function addTileToFrontier(rowIndex, columnIndex)
{
    this._frontier.push(this._board.getTile(rowIndex, columnIndex));
}


/**
 * Adds valid neighboring tiles to the current search queue/stack.
 * @param {number} rowIndex
 * @param {number} columnIndex
 */
function addNeighbors(rowIndex, columnIndex)
{
    // Directly above
    isTileValid(rowIndex - 1, columnIndex)     ? addTileToFrontier(rowIndex - 1 , columnIndex)     : '';

    // Diagonal up right
    isTileValid(rowIndex - 1, columnIndex + 1) ? addTileToFrontier(rowIndex - 1 , columnIndex + 1) : '';

    // Directly right
    isTileValid(rowIndex,     columnIndex + 1) ? addTileToFrontier(rowIndex,      columnIndex + 1) : '';

    // Diagonal down right
    isTileValid(rowIndex + 1, columnIndex + 1) ? addTileToFrontier(rowIndex + 1,  columnIndex + 1) : '';

    // Diagonal below
    isTileValid(rowIndex + 1, columnIndex)     ? addTileToFrontier(rowIndex + 1,  columnIndex)     : '';

    // Diagonal down left
    isTileValid(rowIndex + 1, columnIndex - 1) ? addTileToFrontier(rowIndex + 1,  columnIndex - 1) : '';

    // Directly left
    isTileValid(rowIndex,     columnIndex - 1) ? addTileToFrontier(rowIndex,      columnIndex - 1) : '';

    // Diagonal  up left
    isTileValid(rowIndex - 1, columnIndex - 1) ? addTileToFrontier(rowIndex - 1 , columnIndex - 1) : '';
}

/**
 * @param {Tile} tile
 * @return {boolean}
 */
function isTileValid(rowIndex, columnIndex)
{
    //  TODO : Demorgans this to make it a bit more readable?
    return  !isTileMarked(rowIndex, columnIndex)      &&
            !isTileOutOfBounds(rowIndex, columnIndex) &&
            !isTileBlank(rowIndex, columnIndex);
}

/**
 * Check to see if the tile is in the current search queue/stack.  This should yield better
 * performance than iterating over the whole board.
 *
 *
 * Notes: perhaps this could be used instead of trying to keep track of whether or not a tile is marked
 * @param {Tile} tile
 * @return {boolean}
 */
function isTileMarked(rowIndex, columnIndex)
{
    var tile         = this._board.getTile(rowIndex, columnIndex);
    var length       = this._frontier.length;
    var isTileMarked = false;

    for (var i = 0; i < length; i++)
    {
        if (tile.equal(this._frontier[i]))
        {
            isTileMarked = true;
            break;
        }
    }

    return isTileMarked;
}

/**
 * @param {Tile} tile
 * @return {boolean}
 */
function isTileOutOfBounds(rowIndex, columnIndex)
{
    return !!this._board.getTile();
}

/**
 * @param {Tile} tile
 * @return {boolean}
 */
function isTileBlank(rowIndex, columnIndex)
{

}