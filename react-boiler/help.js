module.exports = `
Boiler: Boilerplate Library for Generating Blank Project Templates

boiler scaffold <folder name> 	creates blank project

boiler make <react component type> <component names>
	options
	- "pres" - presentational component (aka functional component)
	- "cont" - container component (full class component)
	- "conn" - component connected to the Redux store via R-R Library

	these can be chained...
	eg "boiler make pres One Two cont Three Four conn Five Six" 

boiler edit 	launches template in Sublime
`