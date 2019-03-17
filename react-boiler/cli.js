#!/usr/bin/env node

const { spawn } = require('child_process')
let input = process.argv
let command = input[2]
let arg1 = input[3]

const shell = (command) => {

	let myProcess = spawn(command, {shell: true, 
					cwd: process.cwd(), 
					stdio: 'inherit' }
				)

	return myProcess
}

if(command === 'scaffold'){
// console.log('hitting')

  shell('mkdir app app/components public')

}