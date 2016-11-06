/*
 * Start the puzzle 
 */
function startPuzzle(){
	var puzzle = {};
	puzzle.words = 
	[ 
					{
						"word": "%E3%82%8A%E3%82%93%E3%81%94",
						"color": "#ff0000"
					}
	];
	puzzle.grid = 
		[
			'+', '+', '+', '+', '+', '+', '+', '+', '+', '+',  
			'+', '+', '+', '+', '+', '+', '+', '+', '+', '+',  
			'+', '+', '+', '+', '+', '+', '+', '+', '+', '+',  
			'+', '+', '+', '+', '+', '+', '+', '+', '+', '+',  
			'+', '+', 'a', 'p', 'p', 'l', 'e', '+', '+', '+',  
			'+', '+', '+', '+', '+', '+', '+', '+', '+', '+',  
			'+', '+', '+', '+', '+', '+', '+', '+', '+', '+',  
			'+', '+', '+', '+', '+', '+', '+', '+', '+', '+',  
			'+', '+', '+', '+', '+', '+', '+', '+', '+', '+',  
			'+', '+', '+', '+', '+', '+', '+', '+', '+', '+'  
		];

	puzzle.size = 10;
	puzzle.length = 300;
	return puzzle;
}


