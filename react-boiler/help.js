module.exports = `
my boilerplate generator so I don't have to think about initializing projects anymore

boiler scaffold <folder name> 	creates blank project

boiler make <react component type> <component names>
	options
	- "pres" - presentational component (aka functional component)
	- "cont" - container component (full class component)
	- "conn" - component connected to the Redux store via R-R Library

	these can be chained...
	eg "boiler make pres One Two cont Three Four conn Five Six" 

boiler deploy 	copies just the deployment toolchain

boiler edit 	launches template in Sublime
`