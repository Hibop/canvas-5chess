var chess=document.getElementById("chess");
var ctx=chess.getContext('2d');
var blkOrWit=true;//黑先
var over=false;
var widT=chess.offsetWidth;
var ratios=widT/450;
console.log(widT);
console.log(ratios);

document.getElementById("repeat").onclick=function () {
	window.location.reload();
}

var chessBoard=new Array();
for (var i = 0; i < 15; i++) {
	chessBoard[i]=[];
	for (var j = 0; j < 15; j++) {
		chessBoard[i][j]=0;
	}
}

var wins=[];
for (var i = 0; i < 15; i++) {
	wins[i]=[];
	for (var j = 0; j < 15; j++) {
		wins[i][j]=[];
	}
}

var count=0;//赢的可能为572种;

//横线赢的可能
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i][j+k][count]=true;
		}
		count++;
	}
}

//竖
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[j+k][i][count]=true;
		}
		count++;
	}
}

//斜
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[j+k][i+k][count]=true;
		}
		count++;
	}
}

for (var i = 0; i < 11; i++) {
	for (var j = 14; j > 3; j--) {
		for (var k = 0; k < 5; k++) {
			wins[i+k][j-k][count]=true;
		}
		count++;
	}
}


var myWin=[];
var computerWin=[];
for (var i = 0; i < count; i++) {
	myWin[i]=0;
	computerWin[i]=0;
}

var bagua=new Image();
bagua.src="img/1.png";

bagua.onload=function(){
	ctx.drawImage(bagua,0,0,450,450);
	
	ctx.fillStyle='rgba(212,212,212,0.75)';
	ctx.fillRect(0,0,450,450);
	
	drawChessBoard ();
}


function drawChessBoard () {
	for (var i = 0; i < 15; i++) {
		ctx.moveTo(15 + i*30,15);
		ctx.lineTo(15 + i*30,435);
		ctx.stroke();
		ctx.moveTo(15,15 + i*30);
		ctx.lineTo(435,15 + i*30);
		ctx.stroke();		
	}
}



function oneStep (i,j,blkOrWit) {

	ctx.beginPath();
	ctx.arc(15+i*30,15+j*30,13, 0,2*Math.PI);
	ctx.closePath();
	var gradient=ctx.createRadialGradient(15+i*30+2,15+j*30+2,4,15+i*30,15+j*30,13);
	if (blkOrWit) {
		gradient.addColorStop(0,"#0A0A0A");
		gradient.addColorStop(1,"#676767");
		
	} else{
		gradient.addColorStop(0,"#d1d1d1");
		gradient.addColorStop(1,"#f9f9f9");
	}
	ctx.fillStyle=gradient;
	ctx.fill();
}


document.getElementById("vsPeople").onclick=function () {


chess.onclick=function (e) {
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.round(x/30/ratios-0.5);
	var j=Math.round(y/30/ratios-0.5);	
	console.log(i+"=============="+j);
	if(chessBoard[i][j]==0){
		oneStep(i,j,blkOrWit);
		if (blkOrWit) {
			chessBoard[i][j]=1;//黑=1
	 		for (var k = 0; k < count; k++) {
			 	if(wins[i][j][k]){
			 		myWin[k]++;
			 		computerWin[k]=6;
			 		if(myWin[k]==5){
			 			alert("恭喜黑方胜利！");
			 			over=true;
			 		}
			 	}
		 	}
		} else{
			chessBoard[i][j]=2;//白=2
			for (var k = 0; k < count; k++) {
			 	if(wins[i][j][k]){
			 		computerWin[k]++;
			 		myWin[k]=6;
			 		if(computerWin[k]==5){
			 			alert("恭喜白方胜利！");
			 			over=true;
			 		}
			 	}
		 	}
			
		}
		blkOrWit=!blkOrWit;
		if(over){
			window.location.reload();
		}
		if(blkOrWit){
			document.getElementById("info").innerHTML='请黑方下棋';
		}else{
			document.getElementById("info").innerHTML='请白方下棋';
		}
		
		
	}
}


}



document.getElementById("vsComputer").onclick=function () {
	

chess.onclick=function (e) {
	
	//if(!blkOrWit) return;//人机大战，只让人走，如果人人则注释掉
	
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.round(x/30/ratios-0.5);
	var j=Math.round(y/30/ratios-0.5);	
	console.log(i+"=============="+j);
	if(chessBoard[i][j]==0){
		oneStep(i,j,blkOrWit);
		if (blkOrWit) {
			chessBoard[i][j]=1;//黑=1
	 		for (var k = 0; k < count; k++) {
			 	if(wins[i][j][k]){
			 		myWin[k]++;
			 		computerWin[k]=6;
			 		if(myWin[k]==5){
			 			alert("恭喜黑方胜利！");
			 			over=true;
			 		}
			 	}
		 	}
		} 
		blkOrWit=!blkOrWit;
	}
	
	if(!over){
		//blkOrWit=!blkOrWit;
		computerAI();
	}
	if(over){
		location.reload();
	}
	
}

}



function computerAI () {
	var myScore=[];
	var computerScore=[];
	var max=0;
	var u=0,v=0;
	for (var i = 0; i < 15; i++) {
			myScore[i]=[];
			computerScore[i]=[];
		for (var j = 0; j < 15; j++) {
			myScore[i][j]=0;
			computerScore[i][j]=0;		
		}
	}

	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			if(chessBoard[i][j]==0){
				for (var k = 0; k < count; k++) {
					if(wins[i][j][k]){
						if(myWin[k]==1){
							myScore[i][j]+=200;
						}else if(myWin[k]==2){
							myScore[i][j]+=400;
						}else if(myWin[k]==3){
							myScore[i][j]+=2000;
						}else if(myWin[k]==4){
							myScore[i][j]+=10000;
						}

					
						if(computerWin[k]==1){
							computerScore[i][j]+=220;
						}else if(computerWin[k]==2){
							computerScore[i][j]+=420;
						}else if(computerWin[k]==3){
							computerScore[i][j]+=2100;
						}else if(computerWin[k]==4){
							computerScore[i][j]+=20000;
						}


					}
				}
				if(myScore[i][j]>max){
					max=myScore[i][j];
					u=i;
					v=j;
				}else if(myScore[i][j]==max){
					if(computerScore[i][j]>computerScore[u][v]){
					u=i;
					v=j;
					}
				}
				if(computerScore[i][j]>max){
					max=computerScore[i][j];
					u=i;
					v=j;
				}else if(computerScore[i][j]==max){
					if(myScore[i][j]>myScore[u][v]){
					u=i;
					v=j;
					}
				}				
				
				
				
			}
		}
	}	
	
	oneStep(u,v,false);
	chessBoard[u][v]=2;
	for (var k = 0; k < count; k++) {
	 	if(wins[u][v][k]){
	 		computerWin[k]++;
	 		myWin[k]=6;
	 		if(computerWin[k]==5){
	 			alert("恭喜白方胜利！");
	 			over=true;
	 		}
	 	}
	 }
	 
	if(!over){
		blkOrWit=!blkOrWit;
	}
}
