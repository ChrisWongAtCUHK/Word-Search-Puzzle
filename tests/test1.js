/*
 * Start the puzzle 
 */
function startPuzzle(){
	var words = ['apple', 'boy', 'cat', 'dog', 'egg', 'fruit', 'girl', 'home', 'ice', 'jungle'];
	var puzzle = 
		[
			'+', '+', '+', '+', '+', '+', '+', '+', '+', '+',  
			'+', '+', 't', '+', 'e', '+', '+', '+', '+', '+',  
			'+', 'f', 'a', 'p', 'p', 'l', 'e', '+', '+', '+',  
			'+', 'r', 'c', '+', '+', '+', 'g', '+', '+', '+',  
			'+', 'u', '+', '+', 'd', '+', '+', 'n', '+', '+',  
			'+', 'i', '+', '+', 'o', '+', 'g', '+', 'u', '+',  
			'+', 't', 'e', 'g', 'g', '+', '+', 'i', '+', 'j',  
			'+', 'c', '+', '+', '+', '+', 'b', '+', 'r', '+',  
			'i', '+', '+', 'e', 'm', 'o', 'h', '+', '+', 'l',  
			'+', '+', '+', '+', 'y', '+', '+', '+', '+', '+'  
		];

	var gameGrid = $('#gameGrid tbody');
	var size = 10;
	for(var row = 0; row < size; row++){
		var tr = $('<tr>');
		for(var col = 0; col < size; col++){
			tr.append('<td>' + puzzle[row * size + col] + '</td>');		
		}
		gameGrid.append(tr);

	}

	return words;
}


