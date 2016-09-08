
const _ = require('lodash')
const denodeify = require('denodeify')
const request = denodeify(require('request'))
const jsonxml = require('jsontoxml')
const prettyPrint = true
const xmlHeader = true

var swaggerUri ='https://treadstone-autodev.testschoolmessenger.com/v1/api/spec';

request(swaggerUri)
.then( (res) => JSON.parse(res.body))
.then( (res) => {
	
	var api = {
		name: 'api',
		attrs: {
			context: "/ts",
			name: "TreadstoneAPI",
			// xmlns: "http://ws.apache.org/ns/synapse"
		}
	}

	var definitions = [api]
	
	api.children = _.map(res.paths, (methods, path) => {
		_.each(methods, (operation, method) => {
			definitions.push({
				name: 'endpoint',
				attrs: {
					name: operation.operationId + 'Endpoint',
					method: method.toUpperCase()
				},
				children: [{
					name: 'http',
					attrs: {
						'uri-template': "http://localhost:3030/testanotherone/ep/{uri.var.hospital}"
					}
				}]
			})
		})
		return {
			name: 'resource',
			attrs: {
				methods: _.keys(methods).join(' ').toUpperCase(),
				'uri-template': path
			}
		}		
	})

	return {definitions}

})
.then((o) => jsonxml(o,{prettyPrint,xmlHeader}), console.error)
.then(console.log)