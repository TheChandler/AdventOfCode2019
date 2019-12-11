
function mainFunc(){
	input = document.getElementById("input").value;
	input = input.match(/\S+/gi);
	input = input.map((x)=>x.split(""));

	partOne=partOne();
	partTwo();

	function partOne(){
		clear();
		background(color(200));
		let max={};
		max.count=0;
		for (var i=0;i<input.length;i++){
			for (var j=0;j<input[i].length;j++){
				if (input[i][j]=='#'){
					let currentCount=countAsteroids(i,j);
					if (currentCount.count>max.count){
						max=currentCount;
						max.x=j;
						max.y=i;
					}
				}
			}
		}

		document.getElementById("output").value=max.count;
		printArray(max.array);
		return max;
	}

	function partTwo(){
		let asteroids = sortAsteroids(partOne.y,partOne.x);
		let previous = {};
		previous.x=partOne.x;
		previous.y=partOne.y;
		for (var i=0;i<asteroids.length;i++){
			stroke(color(255,Math.abs(((i*3)%510)-255),0));
			console.log(asteroids[i].x+" "+asteroids[i].y);
			line(650+previous.x*25,previous.y*25,650+asteroids[i].x*25,asteroids[i].y*25);
			previous=asteroids[i];
		}
		let solution = asteroids[199].x*100+asteroids[199].y;
		document.getElementById("output2").value=solution;
	}
	function sortAsteroids(y,x){
		let asteriods =[];
		input.map((x)=>{
			asteriods.push(x.slice());
		});
		asteriods[y][x]='O';

		let lines=[];
		for (var i=0;i<asteriods.length;i++){
			for (var j=0;j<asteriods[i].length;j++){
				if (asteriods[i][j]=='#'){
					lines.push(pushLine(i,j));
				}
			}
		}
		let sorted=sortLines(lines);
		let points = [];
		let pointer = 0;
		let next;
		while (sorted.length>0){
			console.log(pointer);
			next = sorted[pointer].points.shift();
			if (next==null){
				console.log("splicing "+pointer);
				sorted.splice(pointer,1);
			}else{
				points.push(next);
				pointer++;
			}
			pointer%=sorted.length;
		}
		return points;

		function pushLine(y2,x2){
			if (x==x2&&y==y2)
				return;
			let difx=x2-x;
			let dify=y2-y;
			let i=Math.max(Math.abs(difx),Math.abs(dify));

			while ((difx/i)%1!=0||(dify/i)%1!=0){
				i--;
			}

			let xPointer=x+difx/i;
			let yPointer=y+dify/i;
			let points=[];
			while (xPointer>=0&&xPointer<asteriods[y].length&&yPointer>=0&&yPointer<asteriods.length){
				let point={};
				point.x=xPointer;
				point.y=yPointer;
				if (asteriods[yPointer][xPointer]=='#'){
					points.push(point);
					asteriods[yPointer][xPointer]='.';
				}
				xPointer+=difx/i;
				yPointer+=dify/i;
			}
			let line={};
			line.points=points;
			line.xSlope=difx;
			line.ySlope=dify;
			return line;
		}
		function sortLines(array){
			sortedArray = [];
			copy=array.slice();
			for (var i=0;i<array.length;i++){
				let lowest = 0;
				for (var j=1;j<copy.length;j++){
					if (lineIsLessThan(copy[j],copy[lowest])){
						lowest=j;
					}
				}
				sortedArray.push(copy[lowest]);
				copy.splice(lowest,1);
			}
			return sortedArray;
		}
		function lineIsLessThan(line1,line2){
			quad1=assignQuad(line1);
			quad2=assignQuad(line2);

			if (quad1<quad2){
				return true;
			}
			if (quad1==quad2){
				if ((line1.xSlope/line1.ySlope)>(line2.xSlope/line2.ySlope)){
					return true;
				}else{
					return false;
				}
			}
			if (quad1>quad2){
				return false;
			}
			
			function assignQuad(line){
				if (line.xSlope==0){
					if (line.ySlope<0){
						return 0;
					}else{
						return 4;
					}
				}else if(line.xSlope>0){
					if (line.ySlope<0){
						return 1;
					}else if(line.ySlope==0){
						return 2;
					}else{
						return 3;
					}
				}else{
					if (line.ySlope<0){
						return 7;
					}else if(line.ySlope==0){
						return 6;
					}else{
						return 5;
					}
				}
			}
		}
	}
	function countAsteroids(y,x){
		let asteriods =[];
		input.map((x)=>{
			asteriods.push(x.slice());
		});
		let count=0;
		asteriods[y][x]='O';
		for (var i=0;i<asteriods.length;i++){
			for (var j=0;j<asteriods[i].length;j++){
				if (asteriods[i][j]=='#'){
					eliminateAsteroids(i,j);
					count++;
				}
			}
		}

		let soulution={};
		soulution.array=asteriods;
		soulution.count=countRemaining(asteriods);
		return soulution;
		function eliminateAsteroids(y2,x2){
			if (x==x2&&y==y2)
				return;
			let difx=x2-x;
			let dify=y2-y;
			let i=Math.max(Math.abs(difx),Math.abs(dify));

			while ((difx/i)%1!=0||(dify/i)%1!=0){
				i--;
			}
			let xPointer=x+difx/i;
			let yPointer=y+dify/i;
			while (xPointer>=0&&xPointer<asteriods[y].length&&yPointer>=0&&yPointer<asteriods.length){
				if (xPointer==x2&&yPointer==y2){
					asteriods[yPointer][xPointer]='X';
				}else{
					asteriods[yPointer][xPointer]='.';
				}
				xPointer+=difx/i;
				yPointer+=dify/i;
			}
		}
	}

}
function printArray(array){
	console.log("\t 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 ")
	for (var i=0;i<array.length;i++){
		string=i+":\t";
		for (var j=0;j<array[i].length;j++){
				string+=" "+array[i][j];
		}
		console.log(string);
	}

	let sourceX,sourceY;
	for (var i=0;i<array.length;i++){
		for (var j=0;j<array[i].length;j++){
				if (array[i][j]=='O'){
					sourceY=i;
					sourceX=j;
				}
		}
	}
	for (var i=0;i<array.length;i++){
		for (var j=0;j<array[i].length;j++){
				if (array[i][j]=='X'){
					line(20+sourceX*25,20+sourceY*25,20+j*25,20+i*25);
					strokeWeight(4);
					stroke(color(200,0,0));
					point(20+j*25,20+i*25);
					stroke(color(0));
					strokeWeight(1);
				}
		}
	}
}
function countRemaining(array){
	let count=0;
	for (var i=0;i<array.length;i++){
		for (var j=0;j<array[i].length;j++){
			if (array[i][j]=='X'){
				count++;
			}
		}
	}
	return count;
}

function setup(){
	createCanvas(1500,1500);
	background(color(230));
}
function draw(){

}