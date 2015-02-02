function compileFields(){
	var fieldCount = 0;
	try{
		$(".questions").each(function(){
			var fields = $.parseJSON($(this).html()),
				output = "";
			for(fieldNum in fields){
				fieldCount++;
				output += getField(fields[fieldNum], fieldCount);
			}
			$(this).addClass("show").html(output);
		});
	}catch(foo){
		console.log("Hey, dummy. Make sure your JSON is formatted correctly.")
	}
}

function makeSpineCase(string){
	return string
			.replace(/[^a-zA-Z\s]/gi,"")
			.replace(/\s/gi,"_")
			.toLowerCase()
			.substring(0,20);
}

function getField(field, fieldNum){
	var output	= "",
		head	= field["head"],
		name	= 'question' + fieldNum;
	switch(field["type"]){
	
		case "textarea":
			output += '<textarea name="' + name + '"></textarea>';
			break;
			
		case "checkbox":
			output += '<small>Check all that apply:</small>';
		case "radio":
			for(labelNum in field["labels"]){
				var label = field["labels"][labelNum];
				output += '<li>';
				output += '<input type="' + field["type"] + '" name="' + name + '" id="' + name + labelNum + '" value="' + labelNum + '" />';;
					if(label == "Other"){
						output += '<input class="other" type="text" placeholder="Other" />';
					}else{
						output += '<label for="' + name + labelNum + '">' + field["labels"][labelNum] + '</label>';
					}
				output += '</li>';
			}
			output = '<ul>' + output + '</ul>';
			break;
			
		case "scale":
			var labelMin = field["labels"]["min"],
				labelMax = field["labels"]["max"],
				max		 = field["max"];
				
			output += '<table class="scale"><tr><td></td>';
			for(x = 1; x <= max; x++){
				output += '<td>' + x + '</td>';
			}
			output += '<td></td></tr><tr><td>' + labelMin + '</td>';
			for(x = 1; x <= max; x++){
				output += '<td><input type="radio" name="' + name + '" value="' + x + '" /></td>';
			}
			output += '<td>' + labelMax + '</td></tr></table>';
			break;
	
	}
	return '<fieldset id="' + name + '"><h2>' + fieldNum + '. ' + head + '</h2>' + output + '</fieldset>';
}


function getURLparameters(){
	var parameters = location.search.substring(1).split("&");
	for(x in parameters){
		var pair = parameters[x].split("="),
			key = pair[0],
			val = pair[1],
			field = document.getElementsByName(key);
		if(field.length != 1) continue;
		$(field).val(val);
	}
}

function randomLetter(){
	var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	return letters.charAt(Math.floor(Math.random() * letters.length));
}

function shittyObfuscate(string){
	var output = "";
	for(x = 0; x < string.length; x++){
		output += randomLetter() + string.charCodeAt(x);
	}
	return output;
}

function shittyDeobfuscate(string){
	var chunks = string.match(/[^a-zA-Z]+/g),
		output = "";
	for(x in chunks){
		output += String.fromCharCode(chunks[x]);
	}
	return output;
}

$(document).ready(function(){

	compileFields();
	
	getURLparameters();
	
	$(".other").on("focus keydown",function(){
		var value = $(this).val();
		$(this).prev("input").val($(this).val()).prop("checked","checked");
	});
	
});