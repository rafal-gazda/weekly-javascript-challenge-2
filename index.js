const inputUnits = document.getElementsByClassName("main__select")[0];
const outputUnits = document.getElementsByClassName("main__select")[1];

const inputValue = document.getElementsByClassName("main__input")[0];
const outputValue = document.getElementsByClassName("main__input")[1];

const errorMessage = document.getElementsByClassName("main__error")[0];

class Units{
	constructor(inputUnit, outputUnit, inputValue){
		this.inputUnit = inputUnit;
		this.outputUnit = outputUnit;
		this.inputValue = inputValue;
		this.arrayUnits = {"milimetr" : 0.1, "centymetr" : 1, "decymetr" : 10, "cal" : 2.54, "stopa" : 30.48, "metr" : 100, "jard": 110, "kilometr" : 100000, "mila" : 6200000};
	}
	
	static hashFor(Unit, value, arrayUnits, multiply){
		
		for(var key in arrayUnits){
			if(Unit == key) {
				if(multiply == true){
					return value * arrayUnits[key];
				}
				else {
					return value / arrayUnits[key];
				}
			}
		}
	}
	
	static centymetrUnits(inputUnit, inputValue, arrayUnit) {
		
		return Units.hashFor(inputUnit, inputValue, arrayUnit, true);
	}
	
	allUnits() {
		const centValue = Units.centymetrUnits(this.inputUnit, this.inputValue, this.arrayUnits);
							
		return Units.hashFor(this.outputUnit, centValue, this.arrayUnits, false);
	}
}

function validation(){
	try{
		if(inputValue.value.length ===0){
		   throw "";
		}
		else if(isNaN(inputValue.value)){
			throw "Wpisana wartość nie jest liczbą";
		}
		else if(inputValue.value < 0){
			throw "Wpisana liczba powinna być większa od zera";
		}
		else{
			errorMessage.textContent = "";
			finalResult();
		}
	}
	catch(err){
		messageException(err);
	}
}

function finalResult(){
	const Unit = new Units(inputUnits.value, outputUnits.value, inputValue.value);
	
	outputValue.value = Unit.allUnits();
}

function messageException(err){
	outputValue.value = "";
	errorMessage.textContent = err;
}

inputUnits.addEventListener('change', validation, false);
outputUnits.addEventListener('change', validation, false);
inputValue.addEventListener('input', validation);








