//dropdown list for all the years
function dropdownList() {
    
    //data route for dropdown labels
    var years_url = '/years';
    
    // Grab a reference to the dropdown select element
    var selectYear = document.getElementById('selectYear');
    
    //default option on load
    var defaultOption = document.createElement('option');
    defaultOption.text = 'all_years';
    defaultOption.value = 'all_years';
    selectYear.appendChild(defaultOption);
    
    // Use the list of years from the route to populate the select options
    Plotly.d3.json(years_url, function(error, response) {
        if (error) return console.warn(error);
        
        for (var i = 0; i < response.length;  i++) {
            var dropdownOption = document.createElement('option');
            dropdownOption.text = response[i];
            dropdownOption.value = response[i];
            //console.log(dropdownOption);
            
            selectYear.appendChild(dropdownOption);
        }
    })
}

//call to load in the list
dropdownList();

//change pie charts based off dropdown list
function optionChanged(year) {
    
    var isEmpty = document.getElementById('pieChart').innerHTML === "";
    
    if (isEmpty) {
        oscars_by_year(year);
    }
        
    else {
        var pieChart = document.getElementById("pieChart");
        pieChart.innerHTML = '';
        oscars_by_year(year);
    }
}   

//Oscars pie charts selected by year
//Hardcoded due to time constraints
//not an ideal solution but manageable with this dataset
function oscars_by_year(year) {
    switch(year) {
        case '1990':
            oscars_chart("1990", 1,0,2,1,0,2);
            break;
        case '1991': 
            oscars_chart("1991", 1,0,0,2,0,1)
            break;
        case '1992':
            oscars_chart("1992", 1,2,0,4,1,1)
            break;
        case '1993':
            break;
        case '1994':
            oscars_chart("1994", 1,0,2,1,0,2);
            break;
        case '1995': 
            oscars_chart("1995", 1,0,2,1,0,2)
            break;
        case '1996':
            oscars_chart("1996", 1,0,2,1,0,2)
            break;
        case '1997':
            break;
        case '1998':
            oscars_chart("1998", 1,0,2,1,0,2);
            break;
        case '1999': 
            oscars_chart("1999",1,0,2,1,0,2)
            break;
        case '2000':
            oscars_chart("2000",1,0,2,1,0,2)
            break;
        
        default:
            //console.log(year);
            oscars_chart("1990-2017",24,22,19,25,27,33);
    }
}


function oscars_chart (year, bv_value, fox_value, paramount_value, sony_value, universal_value, wb_value) {
    data = [
			{
				"label": "BV",
				"value": parseInt(bv_value),
				"color": "#2484c1"
			},
			{
				"label": "Fox",
				"value": parseInt(fox_value),
				"color": "#0c6197"
			},
			{
				"label": "Paramount",
				"value": parseInt(paramount_value),
				"color": "#4daa4b"
			},
			{
				"label": "Sony",
				"value": parseInt(sony_value),
				"color": "#90c469"
			},
			{
				"label": "Universal",
				"value": parseInt(universal_value),
				"color": "#daca61"
			},
			{
				"label": "WB",
				"value": parseInt(wb_value),
				"color": "#e4a14b"
			}
		]
    var pie = new d3pie("pieChart", {
	"header": {
		"title": {
			"text": "Oscar Winners by Studio (" + year + ")",
			"fontSize": 24,
			"font": "open sans"
		},
	},
	"footer": {
		"color": "#999999",
		"fontSize": 10,
		"font": "open sans",
		"location": "bottom-left"
	},
	"size": {
		"canvasWidth": 590,
		"pieOuterRadius": "90%"
	},
	"data": {
		"sortOrder": "value-desc",
		"content": data
	},
	"labels": {
		"outer": {
			"pieDistance": 32
		},
		"inner": {
			"hideWhenLessThanPercentage": 3
		},
		"mainLabel": {
			"fontSize": 11
		},
		"percentage": {
			"color": "#ffffff",
			"decimalPlaces": 0
		},
		"value": {
			"color": "#adadad",
			"fontSize": 11
		},
		"lines": {
			"enabled": true
		},
		"truncation": {
			"enabled": true
		}
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		}
	},
	"misc": {
		"gradient": {
			"enabled": true,
			"percentage": 100
		}
	}
});
}

