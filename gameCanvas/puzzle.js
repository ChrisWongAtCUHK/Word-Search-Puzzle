'use strict'

var Puzzle = function(words){
	this.words = words;

	// hard coded values
	this.size = 10;
	this.cellSize = 30;
	this.length = 350;

	this.grid = new Array(this.size * this.size);

	for(var i = 0; i < this.size; i++){
		for(var j = 0; j < this.size; j++){
			this.grid[j * this.size + i] = '';
		}
	}

	// for each word
	var index = 0;
	while(true){
		// random a direction of 8
		var direction = Math.floor(Math.random() * 0) + 0;
		// random x-coordinate
		var x = Math.floor(Math.random() * this.size);
		// random y-coordinate
		var y = Math.floor(Math.random() * this.size);
	
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

				placed = isPlaced(this.grid, word, direction, this.size, x, y);
				break;
			default:
			// up-right
			case 1:
				// check the length of the word, if it is over the grid, if fails
				var distX = x + word.length;
				var distY = y - word.length;
				if(distY < 0){
					break;
				}

				var invalidCharacter = false;
				// for each cell to be placed a character
				for(var i = 0; i < word.length; i++){
					var gridPos = this.size * (y - i) + i;
					var character = this.grid[gridPos];

					// check if it is empty
					if(character.length == 0){
						// if empty
						this.grid[gridPos] = word[i];
					} else if(character == words[i]){
						// if not empty, check the equality
						
					} else {
						// fail
						invalidCharacter = true;
						break;
					}
				}
				placed = !invalidCharacter;
				break;
				break;
		}
		// do the same word again
		if(!placed)
			continue;

		index++;
		if(index >= words.length)
			break;
	} 

};

/*
 * Get the grid position
 * */
function getGridPos(direction, size, x, y, i){
	switch(direction){
		// up
		case 0:
			return size * (y - i) + x;
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
			var gridPos = size * (y - i) + x;
			grid[gridPos] = word[i];
		}
	}
	// any invalid character would result in placement failure
	return !invalidCharacter;
}
