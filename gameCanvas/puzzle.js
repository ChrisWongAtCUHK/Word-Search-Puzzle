'use strict'

var colors = ["#ff0000", "#800000", "#ffff00", "#ffa500", "#00ffff", "#0000ff", "#ff00ff", "#ff0000", "#800080", "#00ff00"]

var Puzzle = function(words){
	this.words = words;

	// assign the colors
	for(var i = 0; i < this.words.length; i++){
		this.words[i].color = colors[i % colors.length];
	}

	// hard coded values
	Puzzle.staticValues = {};
	Puzzle.staticValues.size = 10;
	Puzzle.staticValues.cellLength = 30;
	Puzzle.staticValues.totalLength = 350;

	this.grid = new Array(Puzzle.staticValues.size * Puzzle.staticValues.size);

	for(var i = 0; i < Puzzle.staticValues.size; i++){
		for(var j = 0; j < Puzzle.staticValues.size; j++){
			this.grid[j * Puzzle.staticValues.size + i] = '';
		}
	}

	// for each word
	var index = 0;
	while(true){
		// random a direction of 8
		var direction = Math.floor(Math.random() * 8);
		var x = Math.floor(Math.random() * Puzzle.staticValues.size);
		// random y-coordinate
		var y = Math.floor(Math.random() * Puzzle.staticValues.size);
	
		var placed = false;
		
		var word = words[index].word;
		switch(direction){
			// up
			case 0:
				// check the length of the word, if it is over the grid, if fails
				var distX = x;
				var distY = y - word.length;
				if(distY < 0){
					break;
				}

				placed = isPlaced(this.grid, word, direction, Puzzle.staticValues.size, x, y);
				break;
			// up-right
			case 1:
				// check the length of the word, if it is over the grid, if fails
				var distX = x + word.length;
				var distY = y - word.length;
				if(distX >= Puzzle.staticValues.size || distY < 0){
					break;
				}

				placed = isPlaced(this.grid, word, direction, Puzzle.staticValues.size, x, y);
				break;
			// right
			case 2:
				// check the length of the word, if it is over the grid, if fails
				var distX = x + word.length;
				var distY = y;
				if(distX >= Puzzle.staticValues.size){
					break;
				}

				placed = isPlaced(this.grid, word, direction, Puzzle.staticValues.size, x, y);
				break;
			// down-right
			case 3:
				// check the length of the word, if it is over the grid, if fails
				var distX = x + word.length;
				var distY = y + word.length;
				if(distX >= Puzzle.staticValues.size || distY >= Puzzle.staticValues.size){
					break;
				}

				placed = isPlaced(this.grid, word, direction, Puzzle.staticValues.size, x, y);
				break;
			// down
			case 4:
				// check the length of the word, if it is over the grid, if fails
				var distX = x;
				var distY = y + word.length;
				if(distY >= Puzzle.staticValues.size){
					break;
				}

				placed = isPlaced(this.grid, word, direction, Puzzle.staticValues.size, x, y);
				break;
			// down-left
			case 5:
				// check the length of the word, if it is over the grid, if fails
				var distX = x - word.length;
				var distY = y + word.length;
				if(distX < 0 || distY >= Puzzle.staticValues.size){
					break;
				}

				placed = isPlaced(this.grid, word, direction, Puzzle.staticValues.size, x, y);
				break;
			// left
			case 6:
				// check the length of the word, if it is over the grid, if fails
				var distX = x - word.length;
				var distY = y;
				if(distX < 0){
					break;
				}

				placed = isPlaced(this.grid, word, direction, Puzzle.staticValues.size, x, y);
				break;
			// up-left
			case 7:
				// check the length of the word, if it is over the grid, if fails
				var distX = x - word.length;
				var distY = y - word.length;
				if(distX < 0 || distY < 0){
					break;
				}

				placed = isPlaced(this.grid, word, direction, Puzzle.staticValues.size, x, y);
				break;
			default:
				break;
		}
		// do the same word again
		if(!placed)
			continue;

		index++;
		if(index >= words.length)
			break;
	}

	// fill up the empty cells
	/*
	var hiraganas = hiraganaList();
	for(index = 0; index < this.grid.length; index++){
		if(this.grid[index].length == 0){
			var rand = Math.floor(Math.random() * hiraganas.length);
			this.grid[index] = hiraganas[rand];
		}
	}*/
};

/*
 * Get the grid position
 * */
function getGridPos(direction, size, x, y, i){
	switch(direction){
		// up
		case 0:
			return size * (y - i) + x;
		// up-right
		case 1:
			return size * (y - i) + (x + i);
		// right
		case 2:
			return size * y + (x + i);
		// down-right
		case 3:
			return size * (y + i) + (x + i);
		// down
		case 4:
			return size * (y + i) + x;
		// down-left
		case 5:
			return size * (y + i) + (x - i);
		// left
		case 6:
			return size * y + (x - i);
		// up-left
		case 7:
			return size * (y - i) + (x - i);
		default:
			return -1;
	}


}

/*
 * Check if a word is placed successfully
 * */
function isPlaced(grid, word, direction, size, x, y){
	var invalidCharacter = false;
	// for each cell to be placed a character
	for(var i = 0; i < word.length; i++){
		var gridPos = getGridPos(direction, size, x, y, i);
		var character = grid[gridPos];
		
		// check if it is empty
		if(character.length == 0){
			// if empty
		} else if(character == word[i]){
			// if not empty, check the equality
			
		} else {
			// fail
			invalidCharacter = true;
			break;
		}
	}

	// do the placement
	if(!invalidCharacter){
	
		for(var i = 0; i < word.length; i++){
			var gridPos = getGridPos(direction, size, x, y, i);
			grid[gridPos] = word[i];
		}
	}
	// any invalid character would result in placement failure
	return !invalidCharacter;
}

