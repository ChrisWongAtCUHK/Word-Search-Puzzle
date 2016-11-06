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
	
	/*
	 * Parse the mouse x,y coordinate to center accordingly
	 */
	function getCell($cells, x, y, size){

		// check the (x, y) coordinates
		var i = parseInt((mouseX - 2) / size);
		var j = parseInt((mouseY - 2) / size);

		// out of bound
		if(i < 0 || j < 0){
			return null;
		}
		var cell = $($cells[j * 10 + i]);
		
		// center x and y
		var returnCell = {};
		
		returnCell.mouseX = cell.position().left + parseInt(cell.width() / 2);
		returnCell.mouseY = cell.position().top + parseInt(cell.height() / 2);
		returnCell.x = i;
		returnCell.y = j;

		return returnCell;
	}

	/*
	 *	Draw a line
	 * */
	function drawLine(toX, toY, context) {
		context.beginPath();
		context.moveTo(startX, startY);
		context.lineWidth = 20;
		context.lineCap = 'round';
		context.strokeStyle = 'rgba(0,0,0,0.2)';
		context.fillStyle = 'rgba(0,0,0,0.2)';
		context.lineTo(toX, toY);
		context.stroke();
	}

	function handleMouseDown(e){
		e.preventDefault();
		mouseX = parseInt(e.clientX - offsetX);
		mouseY = parseInt(e.clientY - offsetY);

		startCell = getCell(e.data.$gameGridCells, mouseX, mouseY, 30);
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
		mouseX = parseInt(e.clientX - offsetX);
		mouseY = parseInt(e.clientY - offsetY);
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
		mouseX = parseInt(e.clientX - offsetX);
		mouseY = parseInt(e.clientY - offsetY);
		e.data.$canvasTemp.css({
			left: -500,
			top: 0
		});
		var $gameGrid = e.data.$gameGrid.find('td');
		endCell = getCell($gameGrid, mouseX, mouseY, 30);
		if(endCell == null){
			return;
		}
		// only draw line with matched words
		$gameGrid.totalRow = e.data.$gameGrid.find('tr').length;
		if(isMatch($gameGrid, words, startCell, endCell)){
			drawLine(endCell.mouseX, endCell.mouseY, ctx);
		}
	}

	$.fn.gameCanvas = function($canvas, $canvasTemp, inputWords){
		canvas = $canvas[0];
		ctx = canvas.getContext("2d");
		ctxTemp = $canvasTemp[0].getContext("2d");
		canvasOffset = $canvas.offset();
		offsetX = canvasOffset.left;
		offsetY = canvasOffset.top;
		words = inputWords;

		$canvasTemp.css({
			left: -500,
			top: 0
		});

		$canvas.mousedown({$gameGridCells: this.find('td'), $canvasTemp: $canvasTemp}, function (e) {
			handleMouseDown(e);
		});

		$canvas.mousemove({$gameGrid: this, $canvasTemp: $canvasTemp}, function (e) {
			handleMouseMove(e);
		});

		$canvas.mouseup({$gameGrid: this, $canvasTemp: $canvasTemp}, function (e) {
			handleMouseUp(e);
		});
	};
}(jQuery));
