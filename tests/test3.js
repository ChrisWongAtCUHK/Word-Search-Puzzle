/*
 * Start the puzzle 
 */
function startTest(){
	var words = 
	[ 
					{
						"word": "りんご",
						"display": "林檎"
					},
					{
						"word": "おとこのこ",
						"display": "男の子"
					},
					{
						"word": "ねこ",
						"display": "猫"
					},
					{
						"word": "いぬ",
						"display": "犬"
					},
					{
						"word": "たまご",
						"display": "卵"
					},
					{
						"word": "くだもの",
						"display": "果物"
					},
					{
						"word": "おんなのこ",
						"display": "女の子"
					},
					{
						"word": "いえ",
						"display": "家"
					},
					{
						"word": "こおり",
						"display": "氷"
					},
					{
						"word": "みつりん",
						"display": "密林"
					}
	];
	var words3 = [];
	for(var i = 0; i < 4; i++){
		words3.push(words[i]);
	}
	return words3;
}


