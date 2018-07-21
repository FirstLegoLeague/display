const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const app = express()

const PORT = 3000

function mockResponses() {
	return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'responses.json'), 'utf8'))
}

app.use(cors())

app.get('/environment.json', (req, res, next) => {
	let responses = mockResponses()
	res.send(responses.env)
})

app.get('/settings/tournamentTitle', (req, res, next) => {
	let responses = mockResponses()
	res.send(responses.title)
})

app.get('/settings/tournamentLevel', (req, res, next) => {
	let responses = mockResponses()
	res.send(responses.stage)
})

app.get('/images/all', (req, res, next) => {
	let responses = mockResponses()
	res.send(responses.logos)
})

app.get('/rankings/:stage', (req, res, next) => {
	let responses = mockResponses()
	res.send(responses.rankings[req.params.stage])
})

app.use('/images', express.static(path.resolve(__dirname, 'images')))

app.use(express.static(path.resolve(__dirname, '../dist')))

app.listen(PORT, () => {
    console.log(`Scoring service listening on port ${PORT}`)
})
