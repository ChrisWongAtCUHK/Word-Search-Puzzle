(function($){
	var vm;
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
	var puzzle;

	var cellLength;
	var $gameFancybox;

	/*
	 * Enable the button to add word with conditional check
	 * */
	function enableAddWordBtn($hiraganaInput, $hintInput, $addWordBtn){
		if($hiraganaInput.val().length > 0 && $hintInput.val().length > 0){
			$addWordBtn.prop('disabled', false);
		} else {
			$addWordBtn.prop('disabled', true);
		}
	}

	/*
	 * Create game canvas in the game area
	 * */
	function createGameCanvas(){
		var $gameAreaBody = $('<tbody>').appendTo(vm);
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
		var length = Puzzle.getStaticValues().totalLength;
		cellLength = Puzzle.getStaticValues().totalLength / Puzzle.getStaticValues().size;
		
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
		for(var row = 0; row < Puzzle.getStaticValues().size; row++){
			var tr = $('<tr>');
			for(var col = 0; col < Puzzle.getStaticValues().size; col++){
				tr.append($('<td>', {width: Puzzle.getStaticValues().cellLength, height: Puzzle.getStaticValues().cellLength})
							.text(decodeURIComponent(puzzle.grid[row * Puzzle.getStaticValues().size + col])));		
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
			left: -5000,
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
	}

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
			left: -5000,
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
				$gameFancybox.append($('<div>').text('Chris Wong is handsome.'));
				$.fancybox($gameFancybox, {
					height: '100px',
					width: '200px',
					autoSize: false,
					closeBtn : false,
					keys : {
						close: []		// no key for close
					}
				});

				// place middle vertically
				$gameFancybox.css('margin-top', ($gameFancybox.parent().height() - $gameFancybox.height()) / 2 + 'px');
			}
		}
	}

	$.fn.gameCanvas = function(inputPuzzle){
		vm = this;

		// create the fancybox
		$gameFancybox = $('<div>').attr('class', 'gameFancybox');
		this.after($gameFancybox);
		
		// place it to center
		this.css('position', 'relative');
		this.css('left', (this.parent().width() - Puzzle.getStaticValues().totalLength) / 2 + 'px');

		if(inputPuzzle == undefined){
			// allow user input the words inside the fancybox
			words = [];
			var $form = $('<table>').css('width', '100%').append($('<tbody>'));
			
			var $formTbody = $form.find('tbody');
			// create datatable
			var $hiraganaInput = $('<input>', {type: 'text'});
			var $hintInput = $('<input>', {type: 'text'});
			var $addWordBtn = $('<input>', {type: 'button', value:'Add'}).prop('disabled', true).css('float', 'right');
			$hiraganaInput.on('focusout', function(){
				enableAddWordBtn($hiraganaInput, $hintInput, $addWordBtn);
			});
			$hiraganaInput.on('keyup', function(){
				enableAddWordBtn($hiraganaInput, $hintInput, $addWordBtn);
			});
			$hintInput.on('focusout', function(){
				enableAddWordBtn($hiraganaInput, $hintInput, $addWordBtn);
			});
			$hintInput.on('keyup', function(){
				enableAddWordBtn($hiraganaInput, $hintInput, $addWordBtn);
			});

			var $displayTable = $('<table>', {class: 'display'}).css('width', '100%')
									.append(
											$('<thead>')
												.append(
													$('<tr>')
														.append($('<th>', {text: 'Hiragana'}))
														.append($('<th>', {text: 'Hint'}))
														.append($('<th>'))
												)
									)
									.append(
											$('<tfoot>')
											.append(
												$('<tr>')
													.append($('<th>').append($hiraganaInput))
													.append($('<th>').append($hintInput))
													.append($('<th>').append($addWordBtn))
											)
									);

			var $dt = $displayTable.DataTable({
						searching: false,
						sDom: 'rt'
					});

			// confirm the words
			var $confirm = $('<input>', {
								type: 'button',
								value: 'Confirm'
							})
							.click(function(e){
								// get the data from datatable
								var data = $dt.rows().data();
								if(data.length == 0){
									// no data, do nothing
									return;
								}
								// parse the data to words
								for(var i = 0 ; i < data.length; i++){
									var word = {};
									word.word = data[i][0];
									word.display = data[i][1];
									words.push(word);
								}
								puzzle = new Puzzle(words);
								createGameCanvas();
								$.fancybox.close();
							});
			$confirm.prop('disabled', true);
			$addWordBtn.click({"$confirm": $confirm}, function(e){

				var index = $dt.rows().data().length;
				// limit the input data length
				if(index < 10){
					var row = $dt.row.add([
						$hiraganaInput.val(),
						$hintInput.val(),
						'<input type="button" value="-" id="removeBtn-' + index + '"/>'
					]).draw(false);
					
					var $confirm = e.data.$confirm;
					// for removal
					$('#removeBtn-' + index).click({"$dt": $dt, "$confirm": $confirm}, function(event){
						// remove a row
						event.data.$dt.row($(this).parents('tr')).remove().draw();
						// disable the confirm button if necessary
						if(event.data.$dt.rows().data().length == 0){
							event.data.$confirm.prop('disabled', true);
						}
					});

					// clear the text
					$hiraganaInput.val('');
					$hintInput.val('');

					// enable the confirm button
					$confirm.prop('disabled', false);
				}
			});
			$formTbody.append($('<tr>').append($('<td>').append($displayTable)));
			$formTbody
				.append(
					$('<tr>').append($('<td>').css("text-align", 'center').append($confirm))
				);
			$.fancybox($form, {
				closeBtn : false,
				keys : {
					close: []		// no key for close
				}
			});
		} else {
			puzzle = inputPuzzle;
			createGameCanvas();
		}
	};
}(jQuery));
