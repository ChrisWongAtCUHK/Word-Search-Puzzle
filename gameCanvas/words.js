/*
 *	Get a single letter from the grid
 * */
function getCellLetter($gameGrid, x, y){
	var letter = $($gameGrid[y * $gameGrid.totalRow + x])[0].innerHTML;
	return letter;
}

/*
 *	Get the word, there are 8 directions
 * */
function getWord($gameGrid, startX, startY, endX, endY){
	var word = '';
	if(startX == endX && startY > endY){
		// up
		for(var j = startY; j >= endY; j--){
			word += getCellLetter($gameGrid, startX, j);
		}
	} else if(startX < endX && startY > endY){
		// up-right
		var j = startY;
		for(var i = startX; i <= endX; i++, j--){
			word += getCellLetter($gameGrid, i, j);
		}
		if(j + 1 != endY)
			return '';
	} else if(startX < endX && startY == endY){
		// right
		for(var i = startX; i <= endX; i++){
			word += getCellLetter($gameGrid, i, startY);
		}
	} else if(startX < endX && startY < endY){
		// down-right
		var j = startY;
		for(var i = startX; i <= endX; i++, j++){
			word += getCellLetter($gameGrid, i, j);
		}
		if(j - 1 != endY)
			return '';
	} else if(startX == endX && startY < endY){
		// down
		for(var j = startY; j <= endY; j++){
			word += getCellLetter($gameGrid, startX, j);
		}
	} else if(startX > endX && startY < endY){
		// down-left
		var j = startY;
		for(var i = startX; i >= endX; i--, j++){
			word += getCellLetter($gameGrid, i, j);
		}
		if(j - 1 != endY)
			return '';
	} else if(startX > endX && startY == endY){
		// left
		for(var i = startX; i >= endX; i--){
			word += getCellLetter($gameGrid, i, startY);
		}
	} else if(startX > endX && startY > endY){
		// up-left
		var j = startY;
		for(var i = startX; i >= endX; i--, j--){
			word += getCellLetter($gameGrid, i, j);
		}
		if(j + 1 != endY)
			return '';
	}
	return word;
}

/*
 *	Check if the word is in list, remove it if it is found
 * */
function isWordInList(word, words){
	for(var i = 0; i < words.length; i++){
		var reversedWord = word.split('').reverse().join('');
		if(word == words[i].word || reversedWord == words[i].word){
			// stroke the word
			words[i].$item.find('span.outer')
				.css({"color": words[i].color, "text-decoration": "line-through"});
			words[i].$item.find('span.inner')
				.css({"color": "#808080"});

			// remove the word from the array
			words.splice(i ,1);
			return true;
		}

	}
	return false;
}

/*
 *	Deter if the word is matched
 * */
function isMatch($gameGrid, words, startCell, endCell){
	var word = getWord($gameGrid, startCell.x, startCell.y, endCell.x, endCell.y);
	if(isWordInList(word, words)){
		return true;
	}
	return false;
}
