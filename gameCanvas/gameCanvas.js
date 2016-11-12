(function($){
	var canvas;
	var ctx;
	var ctxTemp;
	var canvasOffset;
	var offsetX;
	var offsetY;

	var startX;
	var startY;
	var isDown = false;

	var startCell;
	var endCell;
	var words;

	var cellLength;
	var $gameFancybo;

	
	/*
	 * Parse the mouse x,y coordinate to center accordingly
	 */
	function getCell($cells, x, y){

		// check the (x, y) coordinates
		var i = parseInt((x - 2) / cellLength);
		var j = parseInt((y - 2) / cellLength);

		// out of bound
		if(i < 0 || j < 0){
			return null;
		}
		var cell = $($cells[j * 10 + i]);
		
		// center x and y
		var returnCell = {};
		
		returnCell.mouseX = cell.position().left + parseInt(cell.width() / 2) + 3;
		// hard code value
		returnCell.mouseY = cell.position().top + parseInt(cell.height() / 2) + 5; 
		returnCell.x = i;
		returnCell.y = j;
		
		return returnCell;
	}

	/*
	 *	Parse the color to rgba format
	 * */
	function hexToRgba(hex) {
		var rgba = 'rgba(0,0,0,0.2)';
		
		if(hex){
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			var r = parseInt(result[1], 16);
			var g = parseInt(result[2], 16);
			var	b = parseInt(result[3], 16);

			rgba = 'rgba(' + r + ',' + g + ',' + b + ',0.2)';
		}
		
		return rgba;
	}

	/*
	 *	Draw a line
	 * */
	function drawLine(toX, toY, context, color) {
		var rgba = hexToRgba(color);
		context.beginPath();
		context.moveTo(startX, startY);
		context.lineWidth = cellWidth - 5; // hard code value
		context.lineCap = 'round';
		context.strokeStyle = rgba;
		context.fillStyle = rgba;
		context.lineTo(toX, toY);
		context.stroke();
	}

	function handleMouseDown(e){
		e.preventDefault();
		var mouseX = parseInt(e.clientX - offsetX);
		var mouseY = parseInt(e.clientY - offsetY);

		startCell = getCell(e.data.$gameGridCells, mouseX, mouseY);
		// save drag-startXY, 
		// move temp canvas over main canvas,
		// set dragging flag
		startX = startCell.mouseX;
		startY = startCell.mouseY;

		var $canvasTemp = e.data.$canvasTemp;
		ctxTemp.clearRect(0, 0, $canvasTemp.width(), $canvasTemp.height());
		$canvasTemp.css({
			left: 0,
			top: 0
		});
		isDown = true;
	}

	function handleMouseMove(e) {
		e.preventDefault();
		if (!isDown) {
			return;
		}
		var mouseX = parseInt(e.clientX - offsetX);
		var mouseY = parseInt(e.clientY - offsetY);
		// clear the temp canvas
		// on temp canvas draw a line from drag-start to mouseXY
		ctxTemp.clearRect(0, 0, e.data.$canvasTemp.width(), e.data.$canvasTemp.height());
		drawLine(mouseX, mouseY, ctxTemp);
	}

	function handleMouseUp(e) {
		e.preventDefault();
		if (!isDown) {
			return;
		}
		// clear dragging flag
		// move temp canvas offscreen
		// draw the user's line on the main canvas
		isDown = false;
		var mouseX = parseInt(e.clientX - offsetX);
		var mouseY = parseInt(e.clientY - offsetY);
		e.data.$canvasTemp.css({
			left: -500,
			top: 0
		});
		var $gameGrid = e.data.$gameGrid.find('td');
		endCell = getCell($gameGrid, mouseX, mouseY);
		if(endCell == null){
			return;
		}
		// only draw line with matched words
		$gameGrid.totalRow = e.data.$gameGrid.find('tr').length;
		var isMatchResult = isMatch($gameGrid, words, startCell, endCell);
		if(isMatchResult.color){
			drawLine(endCell.mouseX, endCell.mouseY, ctx, isMatchResult.color);
			// show message to declare victory
			if(words.length == 0){
				$gameFancybox.text('Victory');
				$.fancybox($gameFancybox);
			}
		}
	}

	$.fn.gameCanvas = function(puzzle){
		var $gameAreaBody = $('<tbody>').appendTo(this);
		var $gameAreaFirstRow = $('<tr>').appendTo($gameAreaBody);
		// create game canvas wrapper
		var $gameCanvasWrapper = $('<div>')
									.attr({
										class: 'gameCanvasWrapper'
									})
									.appendTo(
											$('<td>')
												.appendTo($gameAreaFirstRow)
									);
		var length = puzzle.length;
		cellLength = puzzle.length / puzzle.size;

		// create game grid
		var $gameGrid = $('<table>')
							.attr({
								class: 'gameGrid',
								width: length,
								height: length
							})
							.append('<thead>')
							.append('<tbody>')
							.appendTo($gameCanvasWrapper);
		var tbody = $gameGrid.find('tbody');
		for(var row = 0; row < puzzle.size; row++){
			var tr = $('<tr>');
			for(var col = 0; col < puzzle.size; col++){
				tr.append($('<td>', {width: puzzle.cellSize, height: puzzle.cellSize})
							.text(decodeURIComponent(puzzle.grid[row * puzzle.size + col])));		
			}
			tbody.append(tr);

		}
		cellWidth = tbody.find('td').first().outerWidth();
		cellHeight = tbody.find('td').first().outerHeight();

		// create canvasTemp
		$canvasTemp = $('<canvas>')
					.attr({
						class: 'canvasTemp',
						width:  length,
						height: length
					})
					.appendTo($gameCanvasWrapper);

		// create canvas
		$canvas = $('<canvas>')
					.attr({
						class: 'canvas',
						width:  length,
						height: length
					})
					.appendTo($gameCanvasWrapper);
		
		// create game word list
		words = puzzle.words;
		var $gameWordList = $('<div>')
									.attr({
										class: 'gameWordList'
									})
									.appendTo(
											$('<td>')
												.appendTo($gameAreaFirstRow)
									);
		
		var $wordList = $('<ul>').appendTo($gameWordList);

		for(var i = 0; i < words.length; i++){
			var word = words[i].display;

			words[i].$item = $('<li>').append($('<span>').attr('class', 'outer')
								.append($('<span>').attr('class', 'inner')
									.text(word)
								)
							);
			$wordList.append(words[i].$item);
		}
									
		canvas = $canvas[0];
		ctx = canvas.getContext("2d");
		ctxTemp = $canvasTemp[0].getContext("2d");
		canvasOffset = $canvas.offset();
		offsetX = canvasOffset.left;
		offsetY = canvasOffset.top;

		$canvasTemp.css({
			left: -500,
			top: 0
		});

		$canvas.mousedown({$gameGridCells: $gameGrid.find('td'), $canvasTemp: $canvasTemp}, function (e) {
			handleMouseDown(e);
		});

		$canvas.mousemove({$gameGrid: $gameGrid, $canvasTemp: $canvasTemp}, function (e) {
			handleMouseMove(e);
		});

		$canvas.mouseup({$gameGrid: $gameGrid, $canvasTemp: $canvasTemp}, function (e) {
			handleMouseUp(e);
		});

		// create the fancybox
		$gameFancybox = $('<div>').attr('class', 'gameFancybox');
		this.after($gameFancybox);

	};
}(jQuery));
