
function mainFunc(){
	sourceCode = document.getElementById("input").value;

	sourceCode=sourceCode.split(',');
	sourceCode=sourceCode.map((x)=>parseInt(x));
	
	output = runComputer([1]).output;
	document.getElementById("output").value=(output);


	output2 = runComputer([2]).output;
	document.getElementById("output2").value=(output2);
	

	//Part 1
	function loop(prev,pastOut){
		let input=[];
		let max=-100000;
		//console.log(prev+" out = "+pastOut);
		for (let i=0;i<5;i++){
			let skip=false;
			for (let j=0;j<prev.length;j++){
				if (i==prev[j]){
					skip=true;
				}
			}
			if (!skip){
				input[0]=i;
				input[1]=pastOut;
				if (prev.length==4){
					//console.log(prev+","+i);	
					return runComputer(input).output;
				}else{
					let p=prev.slice(0);
					p.push(i);
					let result=runComputer(input);
					max=Math.max(max,loop(p,runComputer(input).output));
					console.log(result);
					console.log(max);
				}
			}
		}
		return max;
	}

	//part 2
	function loop2(prev){
		for (let i=0;i<5;i++){
			let skip=false;
			for (let j=0;j<prev.length;j++){
				if (i==prev[j]){
					skip=true;
				}
			}
			if (!skip){
				let p=prev.slice(0);
				p.push(i);
				if (prev.length==4){
				//	console.log(p);	
					tryCombo(p);
				}else{
					loop2(p);
				}
			}
		}
		return max;


		function tryCombo(combo){
			let A = runComputer([combo[0]+5,0]);
			let B = runComputer([combo[1]+5,A.output]);
			let C = runComputer([combo[2]+5,B.output]);
			let D = runComputer([combo[3]+5,C.output]);
			let E = runComputer([combo[4]+5,D.output]);
			while (E.code!=null){
				A = runComputer([E.output],A);
				B = runComputer([A.output],B);
				C = runComputer([B.output],C);
				D = runComputer([C.output],D);
				E = runComputer([D.output],E);
			}
			max=Math.max(max,E.output);
		}
	}
	

}

function runComputer(input,restoreState){
	compOut("\n\n=================================\n\n");
	let code,pointer;
	if (restoreState!=null){
		code=restoreState.code.slice(0);
		pointer=restoreState.pointer;
	}else{
		code=sourceCode.slice(0);
		pointer=0;
	}
	code=code.concat(new Array(10000-code.length).fill(0));
	let output=0;
	let inputPointer=0;
	let relativeBase=0;

	while (code[pointer]!=99){
		opCode=code[pointer]%100;
		modes= Math.floor(code[pointer]/100);
		modes= numToA(modes);
		params=[];
		writingLocations=[code[pointer+1],code[pointer+2],code[pointer+3]];
		for (var i=0;i<3;i++){
			params[i]=code[pointer+1+i];
			if (modes[i]==0){
				params[i]=code[params[i]];
			}else if (modes[i]==2){
				writingLocations[i]=relativeBase+params[i];
				params[i]=code[relativeBase+params[i]];
			}
		}

		compOut("pointer: "+pointer+" OpCode: "+code[pointer]+" params: "+code[pointer+1]+" "+code[pointer+2]+" "+code[pointer+3]);

		if (opCode==1){
			code[writingLocations[2]]=params[0]+params[1];
			compOut(code[pointer+3]+" = "+params[0]+" + "+params[1]+ " = " + (params[0]+params[1]));
			pointer+=4;
		}else if(opCode==2){
			code[writingLocations[2]]=params[0]*params[1];
			compOut(code[pointer+3]+" = "+params[0]+" x "+params[1]+ " = " + (params[0]*params[1]));
			pointer+=4;
		}else if(opCode==3){
			nextInput= getInput();
			if (nextInput.code!=null){
				return nextInput;
			}
			code[writingLocations[0]]=nextInput;
			compOut(writingLocations[0]+" = "+nextInput);
			pointer+=2;
		}else if(opCode==4){
			output=params[0];
			compOut("Outputting "+params[0]);
			console.log("\nOutput: "+params[0]);
			pointer+=2;
		}else if(opCode==5){
			compOut("if "+params[0]+" != 0, going to "+params[1]);
			if (params[0]!=0){
				pointer=params[1];
			}else{
				pointer+=3;
			}
		}else if (opCode==6){
			compOut("if "+params[0]+" == 0, going to "+params[1]);
			if (params[0]==0){
				pointer=params[1];
			}else{
				pointer+=3;
			}
		}else if(opCode==7){
			compOut("if "+params[0]+" < "+params[1]+", "+params[1]+" = 1");
			if (params[0]<params[1]){
				code[writingLocations[2]]=1;
			}else{
				code[writingLocations[2]]=0;
			}
			pointer+=4;
		}else if(opCode==8){
			compOut("if "+params[0]+" == "+params[1]+", "+writingLocations[2]+" = 1");
			if (params[0]==params[1]){
				code[writingLocations[2]]=1;
			}else{
				code[writingLocations[2]]=0;		
			}
			pointer+=4;
		}else if(opCode==9){
			compOut("Relative base = "+params[0]+" "+relativeBase+" = "+(params[0]+relativeBase));
			relativeBase+=params[0];
			pointer+=2;
		}else{
			break;
		}
		if (code[pointer]==99){
			compOut("OpCode = 99, Exiting");
		}
	}
	let state={};
	state.output=output;
	return state;
	function getInput(){

		//console.log("Input: "+inputPointer+": "+input[inputPointer]);
		if (inputPointer<input.length){
			return input[inputPointer++];
		}else{
			let state={};
			state.code=code;
			state.pointer=pointer;
			state.output=output;
			return state;
		}
	}
	function compOut(str){
		if (false){
			console.log(str);
		}
	}
}

function numToA(num){
	numArray = [];
	for (var i=0;i<3;i++){
		numArray[i]=(num%10);
		num=Math.floor(num/10);
	}
	return numArray;
}