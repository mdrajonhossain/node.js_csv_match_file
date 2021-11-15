var express = require('express');
var router = express.Router();

const csv = require('csv-parser')
const fs = require('fs')
const messeage = [];
const reply = [];



/* GET home page. */
fs.createReadStream('live22_message.csv')
	.pipe(csv({}))
	.on('data', (data) => messeage.push(data))
	.on('end', () => {
		// console.log(messeage)
		fs.createReadStream('live22_replyconv.csv')
			.pipe(csv({}))
			.on('data', (data) => reply.push(data))
			.on('end', () => {
				// console.log(reply)				
				for (msg in messeage) {
					for (rep in reply) {
						if (messeage[msg].conversation_id === reply[rep].rep_id) {
							const msdata = [reply[rep].conversation_id, messeage[msg]]							
							console.log(msdata);
						}
					}
				}
			})
	})







// console.log(results)
// // 	fs.createReadStream('live22_replyconv.csv')
// // 	.pipe(csv({}))
// // 	.on('data', (data)=>results.push(data))
// // 	.on('end', ()=>{
// // 		// console.log(results);
// // 		for(data in results){
// // 			console.log("reply",results[data].rep_id)
// // 		}
// // 	});

 










router.get('/', function (req, res, next) {

	res.render('index', { title: 'Express' });
});

module.exports = router;
