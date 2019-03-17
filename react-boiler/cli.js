#!/usr/bin/env node

const { spawn } = require('child_process')
let input = process.argv
let command = input[2]
let arg1 = input[3]

const shell = (command) => {

	spawn(command, {shell: true, 
					cwd: process.cwd(), 
					stdio: 'inherit' }
		 )

}

let pwd = '/Users/jonathancannon/FSA/senior/PEP/react-boiler/project'

if(command === 'scaffold'){

	shell(`cp -a ${pwd}/. .`)
}

if(command === 'edit'){

	shell(`subl ${pwd}`)
}