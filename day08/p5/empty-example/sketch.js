let beginDrawing=false;
let j=0,k=0,i=0,loopNum=1000;
let pixels;

function mainFunc(){
	input = document.getElementById("input").value;
	input = input.match(/\d+/ig)[0];
	console.log(input.length);


	createCanvas(1000,1000);
	pixelSize=15;
	rect(9,9,1+25*pixelSize,1+6*pixelSize);
	strokeWeight(0);

	output = makePicture();
	pixels=input.slice(0);
	i=input.length-1;
	frameRate(1000);
	beginDrawing=true;

	document.getElementById("output").value=output;


	function makePicture(){
		pixels=input.slice(0);
		i=input.length-1;
		let offX=0;
		let offY=0;

		let leastZeros=151;
		let solution;
		while (i>=0){
			let zeros=0;
			let ones=0;
			let twos=0;
			for (var j=0;j<6;j++){
				for (var k=0;k<25;k++){
					if (pixels[i]==0){
						zeros++;
					}else if (pixels[i]==1){
						ones++;
					}else if (pixels[i]==2){
						twos++;
					}
					i--;
				}
			}

			if (zeros<leastZeros){
				solution=ones*twos;
				leastZeros=zeros;
			}
		}
		return solution;

		
	}
}

function setup() {
}


function draw() {
	if (beginDrawing){
		/*while (i>=0){
			for (k=0;k<6;k++){
				for (j=0;j<25;j++){
					paintPoints(j,k,i);
					i--;
				}
			}
		}*/
		for (n=0;n<loopNum;n++){
			if (i>=0){
				paintPoints(j,k,i);
				i--;

				if (j==24){
					j=0;
					k++;
					if (k==6){
						k=0;
					}
				}else{
					j++;
				}
			}
		}

		//slowdown for dramatic effect
		loopNum*=.93;
		loopNum=Math.max(loopNum,2);


	}
	
}
function paintPoints(x,y,i){
	let colors=[color(0,255),color(255,255),color(255,0)];
	fill(colors[pixels[i]]);
	rect(10+((24-x)*pixelSize),10+((5-y)*pixelSize),pixelSize,pixelSize);
}