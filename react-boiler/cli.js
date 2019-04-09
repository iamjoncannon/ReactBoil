#!/usr/bin/env node

const { spawn, spawnSync } = require('child_process')
let input = process.argv
let command = input[2]
const fs = require("fs");

const shell = (command) => {

	return spawn(command, {shell: true, 
					cwd: process.cwd(), 
					stdio: 'inherit' }
		 )
}

let sourceDirect = __dirname + '/project'

if(command === 'scaffold'){

	let first = shell(`cp -a ${sourceDirect}/. .`)

	if(process.argv[3]){

		first.on('exit', ()=>{

			let second = shell(`mv src ${process.argv[3]}`)

			second.on('exit', ()=>{
				let third = shell(`chmod +x ./${process.argv[3]}/init`)
				
				third.on('exit', ()=>{

					spawn(`./init ${process.argv[3]}`, {shell: true, 
									cwd: `${process.cwd()}/${process.argv[3]}`, 
									stdio: 'inherit' }
					)
				})
			})
		})
	}
}

if(command === 'make'){

	let components = sortCompTypes(input)

	if(!components){

		console.log('no components specified')	
	}
	else{

		components.forEach(comp => {

			let type = comp[0] === 'cont' ? 'container' : 
					   comp[0] === 'pres' ? 'presentational' :
					   comp[0] === 'conn' ? 'connected' : '' ;

			let payload = comp[0] === 'cont' ? require('./cont')(comp[1]) : 
						  comp[0] === 'pres' ? require('./pres')(comp[1]) :
						  comp[0] === 'conn' ? require('./conn')(comp[1]) : '' ;

			try {
				fs.writeFile(
			        `./${comp[1]}.js`,
			        payload,
			        () => {
			        	
			          console.log('created ' + type + ' component: ', comp[1]);
			        }
			      );
			}
			catch(err){
				console.log(err)
			}
		})
	}	
}

if(command === 'edit'){

	shell(`subl ${sourceDirect}`)
}

if(command === 'help'){

	console.log(require('./help'))
}

function sortCompTypes(args){
	
	let output = []

	let type

	for(let i =0; i < args.length; i++){

		if(args[i] === 'cont' || args[i] === 'pres' || args[i] === 'conn'){
			type = args[i]
			continue
		}
		if(type){
			output.push([type, args[i]])
		}

	}

	if(!output.length){
		return null
	}
	else{
		return output
	}
}

