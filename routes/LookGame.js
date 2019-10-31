var express = require('express');
var router = express.Router();
var logger = require('morgan');
var knex = require("../db/index")


class LookGame{
	constructor(){
		this.router = express.Router();
		this.router.get('/init',(req,res,next) => {
			let GameCards = this.initGame();
			res.send(GameCards)
		})
	}

	createRandomValues(length){
		let cards = new Set()
		let temp;
		for( let i = 0; i<length; i++){
			temp = Math.floor((Math.random() * 100) + 1);
			while(true){
				if(cards.has(temp)){
					temp = Math.floor((Math.random() * 100) + 1);
					continue;	
				}else{
					cards.add(temp)
					break;
				}					
			}
		}
		return Array.from(cards);
	}

	createCards(values){
		let cards = []
		for ( let j = 0; j < values.length; j++){
			cards.push(values[j])
			cards.push(values[j])
		}
		return this.shuffle(cards)
	}

	initGame(){
		let values = this.createRandomValues(8)
		let GameCards = this.createCards(values)
		return  GameCards;
	}

	//Fisher–Yates shuffle algorithm
	shuffle(a) {
	    var j, x, i;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
	    }
	    return a;
	}


}


module.exports = new LookGame();