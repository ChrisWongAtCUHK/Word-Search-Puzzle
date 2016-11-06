/*
 * Start the puzzle 
 */
function startPuzzle(){
	var puzzle = {};
	puzzle.words = 
	[ 
					{
						"word": "apple",
						"color": "#ff0000"
					},
					{
						"word": "boy",
						"color": "#800000"
					},
					{
						"word": "cat",
						"color": "#ffff00"
					},
					{
						"word": "dog",
						"color": "#ffa500"
					},
					{
						"word": "egg",
						"color": "#00ffff"
					},
					{
						"word": "fruit",
						"color": "#0000ff"
					},
					{
						"word": "girl",
						"color": "#ff00ff"
					},
					{
						"word": "home",
						"color": "#ff0000"
					},
					{
						"word": "ice",
						"color": "#800080"
					},
					{
						"word": "jungle",
						"color": "#00ff00"
					}
	
	];
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


