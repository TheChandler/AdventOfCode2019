function mainFunc(){


	input = document.getElementById("input").value;
	sums = [];

	regexd = input.match(/\d+/ig);
	sums = regexd.map((x)=> Math.floor(x/3)-2);

	total = 0;
	for (var i=0;i<sums.length;i++){
		total+=sums[i];
	}
	document.getElementById("output").value=total;

	for (var i=0;i<sums.length;i++){
		subsum=mathit(sums[i]);
		while(subsum>0){
			total+=subsum;
			subsum=mathit(subsum);
		}
	}
	document.getElementById("output2").value=total;
}
function mathit(load){
	return Math.floor(load/3)-2;
}

