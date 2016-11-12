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
		var direction = Math.floor(Math.random() * 0);
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

				var invalidCharacter = false;
				// for each cell to be placed a character
				for(var i = 0; i < word.length; i++){
					var character = this.grid[this.size * i + x];

					// check if it is empty
					if(character.length == 0){
						// if empty
						this.grid[this.size * i + x] = word[i];
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

};




