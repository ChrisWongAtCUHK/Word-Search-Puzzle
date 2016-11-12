/*
 * Start the puzzle 
 */
function startTest(){
	var words = 
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
	var words3 = [];
	for(var i = 0; i < 3; i++){
		words3.push(words[i]);
	}
	return words3;
}


