/*
 * Start the puzzle 
 */
function startPuzzle(){
	var puzzle = {};
	puzzle.words = ['apple', 'boy', 'cat', 'dog', 'egg', 'fruit', 'girl', 'home', 'ice', 'jungle'];
	puzzle.grid = 
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

	puzzle.size = 10;
	puzzle.length = 300;
	return puzzle;
}


