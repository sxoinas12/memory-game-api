var express = require('express');
var router = express.Router();
var logger = require('morgan');
var knex = require("../db/index")

class Game {
	constructor(){
		this.perPage = 9;
		this.router = express.Router();

		this.router.get("/test",(req,res,next) => {
			res.send("Push Notifications Works")
		})
		

		this.router.post('/init',(req,res,next) =>{
			let cards = req.body.cards;
			cards = parseInt(cards)
			this.SelectCards(cards)
			.then((data) => {
				let arr = [];
				data.forEach((item) => arr.push(item))
				res.send(arr)
				})
			.catch((e) => res.sendStatus(500))
		})


		this.router.post('/save',(req,res,next) => {
			let body = req.body;
			this.save(body)
			.then( () => res.sendStatus(200))
			.catch((e) => {
				console.log(e)
				res.sendStatus(500)})

		})

		this.router.get('/turns/:page',(req,res,next) => {
			let page = req.params.page;
			this.getHistory(page)
			.then((data) => res.send(data))
			.catch((e) => {
				console.log(e)
				res.sendStatus(500)})
		})
	}

	SelectCards(cardsNum){
		return new Promise((resolve,reject) => {
			let cards;
			switch(cardsNum){
				default:
				case 4:
					resolve(cards = this.CreateSet(4))
					break;
				case 8:
					resolve(cards = this.CreateSet(8))
					break;
				case 12: 
					resolve(cards = this.CreateSet(12))
					break;
				
				}
			}).catch((e) => console.log(e))
		
	}

	CreateSet(len){
		let cards = new Set()
		let temp;
		for( let i = 0; i<len; i++){
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
		return cards;
	}

	checkWin(OpenedCards, GameCards){
		let result = OpenedCards.length < GameCards.length
		return !result;

	}

	save(data){
		return new Promise((resolve,reject) => {
			let result;
			let GameCards = data.cards.map((card) => card.value)
			let OpenedCards = data.OpenedCards.map((card) => card.value)
			this.checkWin(OpenedCards, GameCards) ? result = 'win' : result = 'lose';
			knex('History').insert({cards:GameCards,OpenedCards:OpenedCards,date:knex.fn.now(),result:result})
			.then((resp) => resolve(resp))
			.catch((e) => reject(e))
		})
	}


	getHistory(page = 0, perPage = this.perPage){
		return knex.select("*").from('History').limit(perPage).offset(page*perPage).orderBy('date','DESC')
		.then((data) => {
			return knex.count().from("History")
			.then((total) => {
				return {
					data,
					total
				}
			})

		})
	}
}


module.exports = new Game();
