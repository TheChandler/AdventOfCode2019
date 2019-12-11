

function mainFunc(){

	input=document.getElementById("input").value;
	input= input.match(/\S+/gi);
	partOne(input);
	partTwo(input);
}

function partOne(input){
	map = new Map();
	for (var i=0;i<input.length;i++){
		parent=input[i].slice(0,3);
		child=input[i].slice(4,7);

		map.set(child,parent);
	}

	numOrbits=0;
	map.forEach((x)=>{
		parent=x;
		while(parent!=null){
			numOrbits++;
			parent=map.get(parent);
		}
	})
	document.getElementById("output").value=numOrbits;
}
function partTwo(input){

	function Planet(){
		this.parent;
		this.children=[];
		this.visited=false;
		this.setParent = function(name){
			this.parent=name;
		}
		this.addChild = function(name){
			this.children.push(name);
		}
	}

	map = new Map();
	for (var i=0;i<input.length;i++){
		split=input[i].split(')');
		parent=split[0];
		child=split[1];

		if (map.get(child)==null){
			planet=new Planet();
			planet.setParent(parent);
			map.set(child,planet);
		}else{
			map.get(child).setParent(parent);
		}
		if (map.get(parent)==null){
			planet=new Planet();
			planet.addChild(child);
			map.set(parent,planet);
		}else{
			map.get(parent).addChild(child);
		}
	}


	pathLength=pathBetween("YOU","SAN")-1;
	
	document.getElementById("output2").value=pathLength;
	function pathBetween(start,end){
		return search(map.get(start).parent).num;

		function search(p){
			
			let data = {};
			data.found=false;
			data.num=0;
			
			let name=p;
			let planet=map.get(p);
			
			if (planet.visited)
				return data;
			
			planet.visited=true;

			if (name==end){
				data.found=true;
				return data;
			}

			if (planet.parent!=null){
				//console.log(name+ " moving to parent "+planet.parent);
				let parentSearch=search(planet.parent);
				if (parentSearch.found==true){
					parentSearch.num++;
					return parentSearch;
				}
			}
			let children=planet.children;
			for (var i=0;i<children.length;i++){
				let child=children[i];
				//console.log(name+ " moving to child "+child);
				let childSearch=search(child);
				if (childSearch.found==true){
					childSearch.num++;
					return childSearch;
				}
			}
			return data;
			
		}
	}



}