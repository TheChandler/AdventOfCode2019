function mainFunc(){
	clear();
	strokeWeight(1);
	input = document.getElementById("input").value;
	input2= document.getElementById("input2").value;

	wire1=input.split(',');
	wire2=input2.split(',');
	
	var gridx;
	var gridy;
	setGridSize();

	var map = new Map();

	xpointer=0;
	ypointer=0;
	stroke(color(0,0,255));

	w1Length=0
	for (var i=0;i<wire1.length;i++){
		num=wire1[i].slice(1);
		switch (wire1[i][0]){
			case 'L':
				for (var j=0;j<num;j++){
					xpointer--;
					w1Length++;
					map.set(xpointer+","+ypointer,w1Length);
					plotpoint()
				}
				break;
			case 'R':
				for (var j=0;j<num;j++){
					xpointer++;
					w1Length++;
					map.set(xpointer+","+ypointer,w1Length);
					plotpoint();
				}
				break;
			case 'U':
				for (var j=0;j<num;j++){
					ypointer++;
					w1Length++;
					map.set(xpointer+","+ypointer,w1Length);
					plotpoint()
				}
				break;
			case 'D':
				for (var j=0;j<num;j++){
					ypointer--;
					w1Length++;
					map.set(xpointer+","+ypointer,w1Length);
					plotpoint()
				}
				break;
		}
	}
	xpointer=0;
	ypointer=0;
	shortDis=gridx+gridy+10000;
	var lowDist;

	w2Length=0;
	stroke(color(255,0,0));
	for (var i=0;i<wire2.length;i++){
		num=wire2[i].slice(1);
		switch (wire2[i][0]){
			case 'L':
				for (var j=0;j<num;j++){
					xpointer--;
					plotpoint();
					setShortest();
					w2Length++;
					setLowest(w2Length);
				}
				break;
			case 'R':
				for (var j=0;j<num;j++){
					xpointer++;
					plotpoint();
					setShortest();
					w2Length++;
					setLowest(w2Length);
				}
				break;
			case 'U':
				for (var j=0;j<num;j++){
					ypointer++;
					plotpoint();
					setShortest();
					w2Length++;
					setLowest(w2Length);
				}
				break;
			case 'D':
				for (var j=0;j<num;j++){
					ypointer--;
					plotpoint();
					setShortest();
					w2Length++;
					setLowest(w2Length);
				}
				break;
		}
	}
	stroke(0,255,0);
	strokeWeight(3);
	point(1500/2,1500/2);
	document.getElementById("output").value=shortDis;
	document.getElementById("output2").value=lowDist;

	function plotpoint(){
		x=xpointer;
		y=ypointer;
		if (gridx>1480){
			x=xpointer*(1480/gridx);
		}
		if (gridy>1480){
			y=ypointer*(1480/gridy);
		}
		if (y>749){
			console.log("y too big");
		}
		point(750+x,750+y);
	}

	function setShortest(){
		if (map.get(xpointer+","+ypointer)!=null){
			dist=Math.abs(xpointer)+Math.abs(ypointer);
			if (shortDis>dist){
				shortDis=dist;
			}
		}
	}
	function setLowest(currentLength){
		w1Length=map.get(xpointer+','+ypointer);
		if (w1Length!=null){
			if (lowDist==null){
				lowDist=w1Length+currentLength;
			}
			if (lowDist>w1Length+currentLength){
				lowDist=w1Length+currentLength;
			}
		}
	}

	function setGridSize(){

		grid1=size(wire1);
		grid2=size(wire2);

		gridx=Math.max(grid1.x,grid2.x)*2+2;
		gridy=Math.max(grid1.y,grid2.y)*2+2;



		function size(wire){
			xpointer=0;
			ypointer=0;
			xSize=0;
			ySize=0;
			for (var i=0;i<wire.length;i++){
				letter=wire[i][0];
				number=parseInt(wire[i].slice(1));

				if (letter=='R'){
					xpointer+=number;
				}else if (letter=='L'){
					xpointer-=number;
				}else if (letter=='U'){
					ypointer+=number;
				}else if (letter=='D'){
					ypointer-=number;
				}

				xSize=Math.max(Math.abs(xpointer),xSize);
				ySize=Math.max(Math.abs(ypointer),ySize);
			}	
			grid={};
			grid.x=xSize;
			grid.y=ySize;
			return grid;
		}
	}
}

function setup() {
	createCanvas(1500,1500);
}

function draw() {
}