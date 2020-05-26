var data1;
var data2;
var reduceddata1;
var reduceddata2;
let data1loaded=false, data2loaded=false;
var country1loading,country2loading;
var country1total=0,country2total=0;
var div,div2;
var baselineIFR=[];
var proportiondeathsperage;
var fatalityratio;

function setup() {
	createCanvas(windowWidth, windowHeight);
	country1 = createInput("UK");
	country1.position(100, 35);
	country2 = createInput("South Africa");
	country2.position(100, 55);
	title = createElement('h2', 'COVID IFR infererer thingey');
	title.position(1, -15);
	label1 = createElement('h4', 'Country 1');
	label1.position(5, 15);
	label2 = createElement('h4', 'Country 2');
	label2.position(5, 35);
	country1loading = createElement('h4', '');
	country1loading.position(255, 15);
	country2loading = createElement('h4', '');
	country2loading.position(255, 35);
	button = createButton('submit');
  	button.position(5,85);
	button.mousePressed(submit);
	div = createDiv(''); 
	div.html('<table><tr><td></td><td></td></tr></table>');
	div.position(5, 160);  
	div2 = createDiv(''); 
	div2.html('');
	div2.position(5, 120);  
}

function draw() {
	if (data1loaded&&data2loaded) {
		calcData();
		drawTable();
		data1loaded=false;
	} 
}

function submit() {
	country1loading.html('loading...');
	country2loading.html('loading...');

	country1xml = loadXML('https://cors-anywhere.herokuapp.com/http://api.wolframalpha.com/v2/query?appid=A6EGYK-47HK8LTAEH&podstate=AgeDistributionGrid:AgeDistributionData__Show+details&format=plaintext&podtitle=Population by age and sex&input=age%20distribution%20of%20'+country1.value(),processXML1);
	country2xml = loadXML('https://cors-anywhere.herokuapp.com/http://api.wolframalpha.com/v2/query?appid=A6EGYK-47HK8LTAEH&podstate=AgeDistributionGrid:AgeDistributionData__Show+details&format=plaintext&podtitle=Population by age and sex&input=age%20distribution%20of%20'+country2.value(),processXML2);

	//country1xml = loadXML("/sample1.xml",processXML1);
	//country2xml = loadXML("/sample2.xml",processXML2);

}

function processXML1() {
	let children = country1xml.getChildren("pod");
	if (children[0]) {
		//let inputstr = ",age | male | female | all\n0 to 4 | 2.022 million people | 1.931 million people | 3.954 million people\n5 to 9 | 1.767 million people | 1.686 million people | 3.453 million people\n10 to 14 | 1.89 million people | 1.801 million people | 3.691 million people\n15 to 19 | 2.064 million people | 2.002 million people | 4.066 million people\n20 to 24 | 2.174 million people | 2.109 million people | 4.283 million people\n25 to 29 | 2.123 million people | 2.114 million people | 4.237 million people\n30 to 34 | 1.983 million people | 1.973 million people | 3.956 million people\n35 to 39 | 2.088 million people | 2.127 million people | 4.214 million people\n40 to 44 | 2.332 million people | 2.389 million people | 4.721 million people\n45 to 49 | 2.314 million people | 2.375 million people | 4.689 million people\n50 to 54 | 1.962 million people | 1.996 million people | 3.958 million people\n55 to 59 | 1.727 million people | 1.771 million people | 3.498 million people\n60 to 64 | 1.89 million people | 1.961 million people | 3.851 million people\n65 to 69 | 1.418 million people | 1.508 million people | 2.926 million people\n70 to 74 | 1.144 million people | 1.282 million people | 2.425 million people\n75 to 79 | 886613 people | 1.089 million people | 1.976 million people\n80 to 84 | 573587 people | 846253 people | 1.42 million people\n85 to 89 | 326556 people | 606697 people | 933252 people\n90 to 94 | 104632 people | 251979 people | 356611 people\n95 to 99 | 21583 people | 74737 people | 96320 people\n100+ | 1827 people | 10185 people | 12012 people\nall | 30.81 million people | 31.9 million people | 62.72 million people\n(2010 estimates),";
		let inputstr = children[0].getContent()
		let histogram = createHistogram(inputstr);
		data1=histogram;
		data1loaded=true;
		country1loading.html('done');
	} else {
		country1loading.html('No data available');
		data1loaded=false;
	}
}

function processXML2() {
	let children = country2xml.getChildren("pod");
	if (children[0]) {
		//let inputstr = ",age | male | female | all\n0 to 4 | 2.022 million people | 1.931 million people | 3.954 million people\n5 to 9 | 1.767 million people | 1.686 million people | 3.453 million people\n10 to 14 | 1.89 million people | 1.801 million people | 3.691 million people\n15 to 19 | 2.064 million people | 2.002 million people | 4.066 million people\n20 to 24 | 2.174 million people | 2.109 million people | 4.283 million people\n25 to 29 | 2.123 million people | 2.114 million people | 4.237 million people\n30 to 34 | 1.983 million people | 1.973 million people | 3.956 million people\n35 to 39 | 2.088 million people | 2.127 million people | 4.214 million people\n40 to 44 | 2.332 million people | 2.389 million people | 4.721 million people\n45 to 49 | 2.314 million people | 2.375 million people | 4.689 million people\n50 to 54 | 1.962 million people | 1.996 million people | 3.958 million people\n55 to 59 | 1.727 million people | 1.771 million people | 3.498 million people\n60 to 64 | 1.89 million people | 1.961 million people | 3.851 million people\n65 to 69 | 1.418 million people | 1.508 million people | 2.926 million people\n70 to 74 | 1.144 million people | 1.282 million people | 2.425 million people\n75 to 79 | 886613 people | 1.089 million people | 1.976 million people\n80 to 84 | 573587 people | 846253 people | 1.42 million people\n85 to 89 | 326556 people | 606697 people | 933252 people\n90 to 94 | 104632 people | 251979 people | 356611 people\n95 to 99 | 21583 people | 74737 people | 96320 people\n100+ | 1827 people | 10185 people | 12012 people\nall | 30.81 million people | 31.9 million people | 62.72 million people\n(2010 estimates),";
		let inputstr = children[0].getContent()
		let histogram = createHistogram(inputstr);
		data2=histogram;
		data2loaded=true;
		country2loading.html('done');
	} else {
		country2loading.html('No data available');
		data2loaded=false;
	}
}

function createHistogram(inputstr) {

	step1 = split(inputstr,'|');
	print(step1);
	let data = [];
	let index=0;
	for (i=0;i<step1.length-1;i++) {
		if (!step1[i].includes("age")&&!step1[i].includes("male")&&!step1[i].includes("0 to 4 ")) {
			index+=1;
			if (index%3==0) {
				data.push(step1[i].trim());
				print(step1[i].trim());
			}
		}
	}
	for (i=0;i<data.length;i++) {
		let element;
		if (data[i].includes("million")) {
			data[i]=data[i].slice(0,data[i].indexOf(" million"))*1000000;
		} else if (data[i].includes("people")) {
			data[i]=data[i].slice(0,data[i].indexOf(" people"))*1;
		}
	}
	return data;
}

function drawTable() {
	
	let html = "<table border=1><tr><td>Age</td><td>"+country1.value()+" pop</td><td>"+country2.value()+" pop</td><td>"+country1.value()+" normalised</td><td>"+country2.value()+" normalised</td></tr>";
	for (var i = 0; i < data1.length; i++) {
		html = html+"<tr>";
		html = html+"<td>"+i*5+" to "+((i+1)*5-1)+"</td>";
		html = html+"<td>"+nfc(data1[i],0)+"</td>";
		html = html+"<td>"+nfc(data2[i],0)+"</td>";
		html = html+"<td>1.00</td>";
		html = html+"<td>"+nf(data2[i]*country1total/(1.0*country2total)/data1[i],0,2)+"</td>";
		html = html+"</tr>";
	}
	html = html+"<tr><td>Total</td><td>"+nfc(country1total,0)+"</td><td>"+nfc(country2total,0)+"</td></tr>";
	html = html+"</table><br/>";

	html = html+"<table border=1><tr><td>Age</td><td>"+country1.value()+" norm pop</td><td>"+country2.value()+" norm pop</td><td>% deaths</td><td>Relative deaths</td></tr>";
	fatalityratio=0;
	let deaths1=0;
	let deaths2=0;
	let totaldeaths1=0;
	let totaldeaths2=0;
	for (var i = 0; i < reduceddata1.length; i++) {
		html = html+"<tr>";
		html = html+"<td>"+i*5+" to "+((i+1)*5-1)+"</td>";
		html = html+"<td>1.0</td>";
		html = html+"<td>"+nf(reduceddata2[i]*country1total/(1.0*country2total)/reduceddata1[i],0,2)+"</td>";
		html = html+"<td>"+nf(proportiondeathsperage[i]*100,0,2)+"%</td>";
		html = html+"<td>"+nf(reduceddata2[i]*country1total/(1.0*country2total)/reduceddata1[i],0,2)+"</td>";
		html = html+"</tr>";
		deaths1=proportiondeathsperage[i]*reduceddata1[i];
		deaths2=proportiondeathsperage[i]*reduceddata2[i]*country1total/(1.0*country2total);
		totaldeaths1+=deaths1;
		totaldeaths2+=deaths2;
	}
	fatalityratio=totaldeaths2/totaldeaths1;
	html = html+"<tr><td>Total</td><td> </td><td> </td><td>100%</td><td>"+nf(fatalityratio,0,2)+"</td></tr>";
	html = html+"</table>";

	div.html(html);
	div2.html(country2.value()+" will have "+nf(fatalityratio*100,0,1)+"% of the deaths per 100,000 population compared to "+country1.value()+" ignoring all factors except age.");
}

function calcData() {
	country1total=0;country2total=0;
	for (var i = 0; i < data1.length; i++) {
		country1total+=data1[i];
		country2total+=data2[i];
	}
	reduceddata1 = []; reduceddata2 = [];
	reduceddata1.push(data1[0]+data1[1]);
	reduceddata1.push(data1[2]+data1[3]);
	reduceddata1.push(data1[4]+data1[5]+data1[6]+data1[7]+data1[8]+data1[9]);
	reduceddata1.push(data1[10]+data1[11]);
	reduceddata1.push(data1[12]+data1[13]);
	reduceddata1.push(data1[14]+data1[15]);
	reduceddata1.push(data1[16]+data1[17]+data1[18]+data1[19]+data1[20]);

	reduceddata2.push(data2[0]+data2[1]);
	reduceddata2.push(data2[2]+data2[3]);
	reduceddata2.push(data2[4]+data2[5]+data2[6]+data2[7]+data2[8]+data2[9]);
	reduceddata2.push(data2[10]+data2[11]);
	reduceddata2.push(data2[12]+data2[13]);
	reduceddata2.push(data2[14]+data2[15]);
	reduceddata2.push(data2[16]+data2[17]+data2[18]+data2[19]+data2[20]);
	print(reduceddata2);
	proportiondeathsperage=[];
	proportiondeathsperage.push(	 0.0 	);
	proportiondeathsperage.push(	 0.00638 	);
	proportiondeathsperage.push(	 0.01135 	);
	proportiondeathsperage.push(	 0.04610 	);
	proportiondeathsperage.push(	 0.12766 	);
	proportiondeathsperage.push(	 0.28369 	);
	proportiondeathsperage.push(	 0.52482 	);
}