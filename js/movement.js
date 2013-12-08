function initBoardArray()
{
	// // first index is letter, second is number, with a little magic

	// // alert("a".charCodeAt(0) - 97);
	// // alert("b".charCodeAt(0) - 97);
	// // alert("c".charCodeAt(0) - 97);
	// // alert("d".charCodeAt(0) - 97);
	// // alert("e".charCodeAt(0) - 97);

	// // location - 1

	boardArray = [];
	for(var i = 0; i < 8; i++)
	{
		boardArray[i] = [];    
		for(var j = 0; j < 8; j++)
		{ 
			boardArray[i][j] = [0, "notAPiece"];   
		}    
	}
	//if there is a piece, at a location, it is 1, and the actual piece's obj var.
	//creates the default board within the array.
	//not great because of letter vs number, but figured the array working better 
	//with movement was more beneficial the array working better just for the intial
	//state.
	boardArray[0][0] = [1, whiteRook1];
	boardArray[0][1] = [1, whitePawn1];
	boardArray[0][6] = [1, blackPawn1];
	boardArray[0][7] = [1, blackRook1];
	
	boardArray[1][0] = [1, whiteKnight1];
	boardArray[1][1] = [1, whitePawn2];
	boardArray[1][6] = [1, blackPawn2];
	boardArray[1][7] = [1, blackKnight1];
	
	boardArray[2][0] = [1, whiteBishop1];
	boardArray[2][1] = [1, whitePawn3];
	boardArray[2][6] = [1, blackPawn3];
	boardArray[2][7] = [1, blackBishop1];
	
	boardArray[3][0] = [1, whiteQueen];
	boardArray[3][1] = [1, whitePawn4];
	boardArray[3][6] = [1, blackPawn4];
	boardArray[3][7] = [1, blackKing];
	
	boardArray[4][0] = [1, whiteKing];
	boardArray[4][1] = [1, whitePawn5];
	boardArray[4][6] = [1, blackPawn5];
	boardArray[4][7] = [1, blackQueen];
	
	boardArray[5][0] = [1, whiteBishop2];
	boardArray[5][1] = [1, whitePawn6];
	boardArray[5][6] = [1, blackPawn6];
	boardArray[5][7] = [1, blackBishop2];
	
	boardArray[6][0] = [1, whiteKnight2];
	boardArray[6][1] = [1, whitePawn7];
	boardArray[6][6] = [1, blackPawn7];
	boardArray[6][7] = [1, blackKnight2];
	
	boardArray[7][0] = [1, whiteRook2];
	boardArray[7][1] = [1, whitePawn8];
	boardArray[7][6] = [1, blackPawn8];
	boardArray[7][7] = [1, blackRook2];
}

function pieceMove()
{
	//using the first turn as an example
	var currentTurnString = turnArray[currentTurn];
	//currentTurnString = "Pe2e4"
	//alert(currentTurnString);
	
	var initialPosition = currentTurnString.substring(1,3);
	//initialPosition = "e2"
	//alert(initialPosition);
	var finalPosition = currentTurnString.substring(3,5);
	//finalPosition = "e4"
	//alert(finalPosition);
	
	//converts the characters to their proper array indices.
	var ipLetterToArray = initialPosition.substring(0,1).charCodeAt(0) - 97;
	//alert(ipLetterToArray);
	var ipNumberToArray = parseInt(initialPosition.substring(1,2)) - 1;
	//alert(ipNumberToArray);
	
	var fpLetterToArray = finalPosition.substring(0,1).charCodeAt(0) - 97;
	//alert(ipLetterToArray);
	var fpNumberToArray = parseInt(finalPosition.substring(1,2)) - 1;
	//alert(ipNumberToArray);
	
	var currentPiece = boardArray[ipLetterToArray][ipNumberToArray][1];
	
	
	//castling check
	if(currentTurnString === "Ke1c1" || currentTurnString === "Ke1g1" || currentTurnString === "Ke8c8" || currentTurnString === "Ke8g8")
	{
		boardArray[fpLetterToArray][fpNumberToArray] = boardArray[ipLetterToArray][ipNumberToArray];
		boardArray[ipLetterToArray][ipNumberToArray] = [0, "notAPiece"];

		if(currentTurnString === "Ke1c1") //going through the actual cases
		{	
			var rookToMove = boardArray[0][0][1];
			boardArray[3][0] = boardArray[0][0];
			boardArray[0][0] = [0, "notAPiece"];
			
			rookToMove.translateX(30);
			//going to be based when animations are implemented, same for the next ones
			moveX = 0;
			
			currentPiece.translateX(-20);
		}
		else if(currentTurnString === "Ke1g1")
		{	
			var rookToMove = boardArray[7][0][1];
			boardArray[5][0] = boardArray[7][0];
			boardArray[7][0] = [0, "notAPiece"];
			
			rookToMove.translateX(-20);
			
			moveX = 0;
			
			currentPiece.translateX(20);
		}
		else if(currentTurnString === "Ke8c8")
		{	
			var rookToMove = boardArray[0][7][1];
			boardArray[3][7] = boardArray[0][7];
			boardArray[0][7] = [0, "notAPiece"];
			
			rookToMove.translateX(30);
			
			moveX = 0;
			
			currentPiece.translateX(-20);
		}
		else if(currentTurnString === "Ke8g8")
		{	
			var rookToMove = boardArray[7][7][1];
			boardArray[5][7] = boardArray[7][7];
			boardArray[7][7] = [0, "notAPiece"];
			
			rookToMove.translateX(-20);
			
			moveX = 0;
			
			currentPiece.translateX(20);
		}
	}
	else //standard movement
	{
		//check if anything is in the final position
		if(boardArray[fpLetterToArray][fpNumberToArray][0] !== 0)
		{
			//most likely a placeholder, though we shall see...
			scene.remove(boardArray[fpLetterToArray][fpNumberToArray][1]);
		}
		
		//move the piece to the new position
		boardArray[fpLetterToArray][fpNumberToArray] = boardArray[ipLetterToArray][ipNumberToArray];
		//"null" the old position
		boardArray[ipLetterToArray][ipNumberToArray] = [0, "notAPiece"];
		
		//calculate the distance needed to move
		var moveX = 0;
		var moveZ = 0;
		
		//for x, left is negative, right is positive in respect to the white side
		moveX = (fpLetterToArray - ipLetterToArray) * 10;
		
		//for z, up is negative, down is positive in respect to the white side
		moveZ = (ipNumberToArray - fpNumberToArray) * 10;
		
		currentPiece.translateX(moveX);
		currentPiece.translateZ(moveZ);
		//alert(moveX.toString() + " " + moveZ.toString());
	}
	
	currentTurn++;
}