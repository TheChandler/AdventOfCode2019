

function mainFunc(){

	input = document.getElementById("input").value;
	input = input.split('-');
	input = input.map((x)=>parseInt(x));

	num=input[0];
	arr=numToA(num);

	validateStart(arr);
	console.log(arr);

	count1=0;
	count2=0;
	while (aToNum(arr)<=input[1]){
		if (test(arr)){
			count1++;
		}
		if (test2(arr)){
			count2++;
		}
		increment(arr);
	}
	document.getElementById("output").value=count1;
	document.getElementById("output2").value=count2;

}
function numToA(num){
	numArray=[];
	for (var i=5;i>=0;i--){
		numArray[i]=(num%10);
		num=Math.floor(num/10);
	}
	return numArray;
}
function aToNum(a){
	var num=0;
	for (var i=0;i<6;i++){
		num*=10;
		num+=a[i];
	}
	return num;
}
function validateStart(arr){
	for (var i=1;i<6;i++){
		arr[i]=Math.max(arr[i-1],arr[i]);
	}
}
function increment(arr){
	i = 5;
	while (arr[i]==9){
		i--;
	}
	num=arr[i]+1;
	for (i;i<6;i++){
		arr[i]=num;
	}
}
function test(arr){
	for (var i=0;i<5;i++){
		if (arr[i]==arr[i+1]){
			return true;
		}
	}
	return false;
}

function test2(arr){
	for (var i=0;i<5;i++){
		if (arr[i]==arr[i+1]){
			if (arr[i-1]!=arr[i]&&arr[i+2]!=arr[i]){
				return true;
			}
		}
	}
	return false;
}