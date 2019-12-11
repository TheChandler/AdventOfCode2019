function mainFunc(){


	input = document.getElementById("input").value;

	regexd = input.match(/\d+/ig);
	regexd = regexd.map((x)=>parseInt(x));
	
	regexd[1]=12;
	regexd[2]=2;
	output = runComputer(regexd);
	document.getElementById("output").value=(output[0]);


	console.log(regexd[0]);
	if (true){ //set true to run part 2.
		for (var i = 0;i<100;i++){
			for (var j= 0;j<100;j++){
				regexd[1]=i;
				regexd[2]=j;

				if (runComputer(regexd)[0]==19690720){
					document.getElementById("output2").value=(i*100)+j;
					console.log("Found it");
				}
			}
		}
		console.log("done.");
	}

}

function runComputer(input){

	output=input.slice(0);
	pointer = 0;

	while (output[pointer]!=99){

		num1 = output[pointer+1];
		num2 = output[pointer+2];
		result = output[pointer+3];

		if (output[pointer]==1){
			output[result] = output[num1]+output[num2];
		}else if(output[pointer]==2){
			output[result] = output[num1]*output[num2];
		}
		pointer+=4;
	}

	return output;
}