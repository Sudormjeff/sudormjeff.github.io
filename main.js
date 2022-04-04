var stage_data = [["St Ives",102.2,700,102.2,700,0],
["Spalding"	,61.1	,95	,163.3	,795,0],
["Louth"	,82.2	,465	,245.5	,1260,0],
["Hessle"	,57.8	,485	,303.3	,1750,1],
["Malton"	,66.9	,680	,370.2	,2425,1],
["Barnard Castle"	,114.0	,1255	,484.2	,3680,1],
["Brampton"	,83.7	,990	,567.8	,4670,2],
["Moffat"	,71.5	,810	,639.4	,5480,2],
["Dunfermline"	,111.1,	1170	,750.5	,6650,2],
["Innerleithen"	,80.2	,1130	,830.7	,7780,3],
["Eskdalemuir"	,49.5	, 660	,880.2	,8440,3],
["Brampton"	,56.8	,750	,937.0	,9190,3],
["Barnard Castle"	,83.6	,1000	,1020.6	,10195,3],
["Malton"	,111.7	,1155	,1132.3	,11350,4],
["Hessle"	,70.0	,710	,1202.4	,12060,4],
["Louth"	,58.3	,545	,1260.6	,12605,4],
["Spalding"	,81.3	,340	,1341.9	,12945,5],
["St Ives"	,60.3	,115	,1402.2	,13055,5],
["Great Easton"	,69.0	,350	,1471.2	,13410,5],
["Loughton"	,48.6	,365	,1519.7	,13770,5]]
var sample = ["Controls", "Distance", "Climb"]
"Total Distance", "Total Climb"
function main(){
	var storage = []
	var display_table = []
	var display = document.getElementById("display")
	var days_selector = document.createElement("input")
	days_selector.type = "range"
	days_selector.value = 6
	days_selector.min = 1
	days_selector.max = 7
	var days_showcase = document.createElement("p")
	days_showcase.innerHTML = "Total days: " + days_selector.value
	days_selector.oninput = function(){update()}
	function update(){
		days_showcase.innerHTML = "Total days: " + days_selector.value;
		while(display.lastChild.tagName == "TABLE"){
			display.removeChild(display.lastChild)
		}
		for( var i = 0; i < days_selector.value; i++){
			
			display_table[i] = document.createElement("table")
			display_table[i].innerHTML = "Day "+ (i+1)

			display_table[i].appendChild(document.createElement("tr"))
			for (var j = 0 ; j < sample.length; j++){
				cache =document.createElement("th")
				cache.innerHTML = sample[j]
				display_table[i].lastChild.appendChild(cache)
			}
			
			display.append(display_table[i])
		}
		for(var i = 0; i < stage_data.length; i++){
			storage[i] = document.createElement("tr")
			storage[i].id = i
			for (var j = 0; j < 3; j ++){
				cache = document.createElement("td")
				cache.innerHTML = stage_data[i][j]
				if(j >0){
					if(j == 1){
						cache.innerHTML  += " k"
					}
					cache.innerHTML  += "m"
				}
				storage[i].appendChild(cache)
				
			}
			var up_button = document.createElement("button")
			up_button.onclick = function(){//Change stage_data no, remove storage from parent and append it in another
				id = this.parentElement.id
				table_par = this.parentElement.parentElement
				if(this.parentElement.id == table_par.children[1].id){
					if(stage_data[id][5] > 0){
						stage_data[id][5] -=1
						this.parentElement.parentElement.removeChild(this.parentElement)
						display_table[stage_data[id][5]].insertBefore(storage[id],display_table[stage_data[id][5]].children[display_table[stage_data[id][5]].childElementCount-1])
						check()
					}
					
				}
			}
			up_button.innerHTML = "up"
			up_button.style.backgroundColor = "green"
			var down_button = document.createElement("button")
			down_button.onclick = function(){
				id = this.parentElement.id
				table_par = this.parentElement.parentElement
				if(this.parentElement.id == table_par.children[table_par.childElementCount-2].id){
					if(stage_data[id][5] < days_selector.value-1){
						stage_data[id][5] +=1
						this.parentElement.parentElement.removeChild(this.parentElement)
						display_table[stage_data[id][5]].insertBefore(storage[id], display_table[stage_data[id][5]].children[1])
						check()
					}
					
				}
			}
			down_button.innerHTML = "Down"
			down_button.style.backgroundColor = "red"
			
			storage[i].appendChild(up_button)
			storage[i].appendChild(down_button)
			// console.log(storage[i])
			if(stage_data[i][5] >= days_selector.value){
				stage_data[i][5] = (days_selector.value-1)
			}
			display_table[stage_data[i][5]].appendChild(storage[i])
			
			//display.appendChild(storage[i])
		}
		check()
	}
	function check(){
		for (var i = 0; i< display_table.length; i++){
			if(display_table[i].lastChild.id == "calculation"){
				display_table[i].removeChild(display_table[i].lastChild)
			}
			SumDistance = 0
			SumClimb = 0
			for (var j =1; j< display_table[i].childElementCount; j++){
				if(display_table[i].children[j].id != ""){
					SumDistance += stage_data[parseInt(display_table[i].children[j].id)][1]
					SumClimb += stage_data[parseInt(display_table[i].children[j].id)][2]
				}
				
			}
			
			
			var total_distance = document.createElement("th")
			total_distance.innerHTML = "Total Distance: " + SumDistance.toFixed(1) + " km "
			var total_climb = document.createElement("th")
			total_climb.innerHTML ="Total Climb: " + SumClimb.toFixed(1) +" m"
			var stop = document.createElement("th")
			stop.innerHTML= "Stopped at: \n" + stage_data[parseInt(display_table[i].children[j-1].id)][0]
			cache = document.createElement("tr")
			cache.id = "calculation"
			cache.appendChild(total_distance)
			cache.appendChild(total_climb)
			cache.appendChild(stop)
			display_table[i].appendChild(cache)
		}
		
	}
	
	
	
	display.appendChild(days_selector)
	display.appendChild(days_showcase)

	
	update()
}
main()