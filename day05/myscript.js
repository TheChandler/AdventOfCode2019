

input=1;
function mainFunc(){


	code = document.getElementById("input").value;

	code=code.split(',');
	code=code.map((x)=>parseInt(x));

	
	output = runComputer(code.slice(0));
	input=5;
	output2= runComputer(code);

	document.getElementById("output").value=(output);
	document.getElementById("output2").value=(output2);
}

function runComputer(code){
	console.log("\n\n=================================\n\n");
	pointer=0;
	var output=0;
	while (code[pointer]!=99){
		opCode=code[pointer]%100;
		modes= Math.floor(code[pointer]/100);
		modes= numToA(modes);
		params=[];
		for (var i=0;i<2;i++){
			params[i]=code[pointer+1+i];
			if (modes[i]==0){
				params[i]=code[params[i]];
			}
		}

		console.log("pointer: "+pointer+" OpCode: "+code[pointer]+" params: "+code[pointer+1]+" "+code[pointer+2]+" "+code[pointer+3]);

		if (opCode==1){
			code[code[pointer+3]]=params[0]+params[1];
			console.log(code[pointer+3]+" = "+params[0]+" + "+params[1]+ " = " + (params[0]+params[1]));
			pointer+=4;
		}else if(opCode==2){
			code[code[pointer+3]]=params[0]*params[1];
			console.log(code[pointer+3]+" = "+params[0]+" x "+params[1]+ " = " + (params[0]*params[1]));
			pointer+=4;
		}else if(opCode==3){
			code[code[pointer+1]]=input;
			console.log(code[pointer+1]+" = "+input);
			pointer+=2;
		}else if(opCode==4){
			output=params[0];
			console.log("Outputting "+params[0]);
			pointer+=2;
		}else if(opCode==5){
			console.log("if "+params[0]+" != 0, going to "+params[1]);
			if (params[0]!=0){
				pointer=params[1];
			}else{
				pointer+=3;
			}
		}else if (opCode==6){
			console.log("if "+params[0]+" == 0, going to "+params[1]);
			if (params[0]==0){
				pointer=params[1];
			}else{
				pointer+=3;
			}
		}else if(opCode==7){
			console.log("if "+params[0]+" < "+params[1]+", "+params[1]+" = 1");
			if (params[0]<params[1]){
				code[code[pointer+3]]=1;
			}else{
				code[code[pointer+3]]=0;
			}
			pointer+=4;
		}else if(opCode==8){
			console.log("if "+params[0]+" == "+params[1]+", "+params[1]+" = 1");
			if (params[0]==params[1]){
				code[code[pointer+3]]=1;
			}else{
				code[code[pointer+3]]=0;		
			}
			pointer+=4;
		}else{
			break;
		}
	}
	return output;
}

function numToA(num){
	numArray = [];
	for (var i=0;i<2;i++){
		numArray[i]=(num%10);
		num=Math.floor(num/10);
	}
	return numArray;
}