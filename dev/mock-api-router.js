const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const router = express.Router()

function mockResponses () {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'responses.json'), 'utf8'))
}

router.use(cors())

router.get('/environment.json', (req, res, next) => {
  const responses = mockResponses()
  res.send(responses.env)
})

router.get('/settings/tournamentTitle', (req, res, next) => {
  const responses = mockResponses()
  res.send(responses.title)
})

router.get('/settings/tournamentStage', (req, res, next) => {
  const responses = mockResponses()
  res.send(responses.stage)
})

router.get('/image/global', (req, res, next) => {
  const responses = mockResponses()
  res.send(responses.globalLogos)
})

router.get('/image/local', (req, res, next) => {
  const responses = mockResponses()
  res.send(responses.localLogos)
})

router.get('/image/all', (req, res, next) => {
  const responses = mockResponses()
  res.send({ local: responses.local, global: responses.global })
})

router.get('/team/all', (req, res) => {
  const responses = mockResponses()
  res.send(responses.teams)
})

router.get('/table/all', (req, res) => {
  const responses = mockResponses()
  res.send(responses.tables)
})

router.get('/match/current', (req, res) => {
  const responses = mockResponses()
  res.send(responses.matches[0])
})

router.get('/match/upcoming/:count', (req, res) => {
  const responses = mockResponses()
  res.send(responses.matches.slice(1, req.params.count + 1))
})

router.get('/match/upcoming', (req, res) => {
  const responses = mockResponses()
  res.send(responses.matches.slice(1, 2))
})

router.get('/rankings.json', (req, res, next) => {
  const responses = mockResponses()
  res.send(responses.rankings[responses.stage])
})

router.use('/images', express.static(path.resolve(__dirname, 'images')))

router.use(express.static(path.resolve(__dirname, '../dist')))

exports.MockAPIRouter = router
