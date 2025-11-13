jQuery(document).ready(function($) {
	var bingoBoard = {};
	var winningCondition = false;
	var wins = 0;

	// Remove nojs from body to display the content
	$('body').removeClass('nojs');

	// Function & trigger to resize the boxes
	function resizeBoxes() {
		$('.bingo-row > span').each(function() {
			// Height == width
			$(this).height($(this).width());
		});
	};
	$(window).resize(resizeBoxes);
	// Resize on startup
	resizeBoxes();

	// Check if localstorage exists
	if (localStorage['bingo']) {
		loadData();
	}
	else {
		// Create new game
		newGame();
	}

	// Function to randomize bingoboard and save it
	function newGame() {
		// Disable active in all fields
		$('.active').removeClass('active');

		// Reset win
		winningCondition = false;

		// Get the list of words
		$.getJSON('words.json', function(data) {
			// Shuffle the data (http://stackoverflow.com/a/18650169)
			data = data.sort(function() { return .5 - Math.random(); });

			// Only use top 25
			data = data.splice(0, 25);

			// Turn it into a object
			bingoBoard = {};

			for (var i in data) {
				bingoBoard[i] = {
					data: data[i],
					checked: false
				};
			}

			// Save the data
			saveData();

			// Use this data
			loadData();
		});
	}

	// Function to use localStorage data to draw the board
	function loadData() {
		// Get all elements from bingo board
		var elements = $('.bingo-block > p');

		// Loop data and add it to board
		bingoBoard = JSON.parse(localStorage['bingo']);
		elements.each(function(i) {
			// Change text
			$(this).text(bingoBoard[i].data);

			// If text is checked, add active-class
			if (bingoBoard[i].checked) {
				$(this).parent().addClass('active');
			}
		});

		// Get winning condition
		winningCondition = localStorage['winningCondition'] == "true" ? true : false;

		// Get wins
		wins = parseInt(localStorage['wins'], 10);
		drawWins();
	}

	// Function to save the board to localStorage
	function saveData() {
		localStorage['bingo'] = JSON.stringify(bingoBoard);
		localStorage['winningCondition'] = winningCondition;
		localStorage['wins'] = wins;
	}

	// Function to check winning condition
	function checkWin() {
		// Loop all rows and columns
		for (var i = 0; i < 5; i++) {
			var allCheckedRow = true;
			var allCheckedCol = true;

			// Loop all cells in row can column
			for (var j = 0; j < 5; j++) {
				// Row
				if (!bingoBoard[i * 5 + j].checked) {
					allCheckedRow = false;
				}

				// Column
				if (!bingoBoard[j * 5 + i].checked) {
					allCheckedCol = false;
				}

				if (!allCheckedRow && !allCheckedCol) {
					break;
				}
			}

			// Check if all rows were active
			if (allCheckedRow || allCheckedCol) {
				return win();
			}
		}

		// Check cross
		var indexes = [
			[1, 7, 13, 19, 25],
			[5, 9, 13, 17, 21]
		];

		
		for (var i = 0; i < indexes.length; i++) {
			var allChecked = true;
			for (var j = 0; j < indexes[i].length; j++) {
				if (!bingoBoard[indexes[i][j] - 1].checked) {
					allChecked = false;
				}
			}
			if (allChecked) {
				return win();
			}
		}
	}

	// Function for winning the game
	function win() {
		winningCondition = true;
		wins++;
		drawWins();
		saveData();
		alert('Yay you won!');
	}

	// Function to change the win-count
	function drawWins() {
		$('.wins').text(wins);
	}

	$('span').click(function() {
		// If user already won, just return
		if (winningCondition) {
			return;
		}

		// Toggle active
		$(this).toggleClass('active');

		// Get real index for current block
		var index = ($(this).index() + 1) + ($(this).parent().index()) * 5;

		// Change active status in board object
		bingoBoard[index - 1].checked = $(this).hasClass('active');

		// Save to localStorage
		saveData();

		// Check if you won
		checkWin(); 
	});

	// Trigger for reset -button
	$('.reset').click(function(e) {
		e.preventDefault();
		newGame();
	});

	// Trigger for reset wins -button
	$('.reset-wins').click(function(e) {
		e.preventDefault();
		wins = 0;
		saveData();
		drawWins();
	});
});
