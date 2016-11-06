/*
 * Start the puzzle 
 */
function startPuzzle(){
	var puzzle = {};
	puzzle.words = 
	[ 
					{
						"word": "りんご",
						"display": "林檎",
						"color": "#ff0000"
					},
					{
						"word": "おとこのこ",
						"display": "男の子",
						"color": "#800000"
					},
					{
						"word": "ねこ",
						"display": "猫",
						"color": "#ffff00"
					},
					{
						"word": "いぬ",
						"display": "犬",
						"color": "#ffa500"
					},
					{
						"word": "たまご",
						"display": "卵",
						"color": "#00ffff"
					},
					{
						"word": "くだもの",
						"display": "果物",
						"color": "#0000ff"
					},
					{
						"word": "おんなのこ",
						"display": "女の子",
						"color": "#ff00ff"
					},
					{
						"word": "いえ",
						"display": "家",
						"color": "#ff0000"
					},
					{
						"word": "こおり",
						"display": "氷",
						"color": "#800080"
					},
					{
						"word": "みつりん",
						"display": "密林",
						"color": "#00ff00"
					}
	];
	var a = puzzle.words[0].word.split("");
	var b = puzzle.words[1].word.split("");
	var c = puzzle.words[2].word.split("");
	var d = puzzle.words[3].word.split("");
	var e = puzzle.words[4].word.split("");
	var f = puzzle.words[5].word.split("");
	var g = puzzle.words[6].word.split("");
	var h = puzzle.words[7].word.split("");
	var i = puzzle.words[8].word.split("");
	var j = puzzle.words[9].word.split("");

	puzzle.grid = 
		[
			j[3], '+' , '+' , '+' , '+' , '+' , '+' , f[0], '+' , '+',  
			'+' , j[2], '+' , h[1], d[0], '+' , '+' , f[1], '+' , '+',  
			'+' , '+' , j[1], '+' , '+' , d[1], '+' , f[2], '+' , '+',  
			'+' , '+' , '+' , j[0], '+' , '+' , '+' , f[3], '+' , '+',  
			'+' , b[4], a[0], a[1], a[2], '+' , '+' , '+' , '+' , '+',  
			'+' , b[3], '+' , i[1], '+' , '+' , '+' , g[0], '+' , '+',  
			'+' , b[2], '+' , '+' , i[0], '+' , g[1], '+' , '+' , '+',  
			c[0], b[1], '+' , '+' , '+' , g[2], '+' , e[0], '+' , '+',  
			'+' , b[0], '+' , '+' , g[3], '+' , '+' , '+' , e[1], '+',  
			'+' , '+' , '+' , g[4], '+' , '+' , '+' , '+' , '+' , e[2]  
		];

	var hiraganas = hiraganaList();
	for(var index = 0; index < puzzle.grid.length; index++){
		if(puzzle.grid[index] == '+'){
			puzzle.grid[index] = hiraganas[index % hiraganas.length];
		}
	}
	puzzle.size = 10;
	puzzle.cellSize = 30;
	puzzle.length = 350;
	return puzzle;
}


