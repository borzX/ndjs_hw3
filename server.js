const fs = require('fs')
const path = require('path')
const espress = require('express')
const { count } = require('console')
const app = espress()


const countVisit = {
  "visitHome": 1,
  "visitAbout": 1
}

const countVisitHomeFile = path.join(__dirname, 'countVisit.json')
fs.writeFileSync(countVisitHomeFile, JSON.stringify(countVisit))

app.get('/', (req, res) =>{
  const dataHome = fs.readFileSync(countVisitHomeFile, 'utf-8')
  const dataHomeJSON = JSON.parse(dataHome)
  const countH = dataHomeJSON.visitHome

  res.send(`<h1>Home</h1>
    <a href="/about">About</a>
    <p>Просмотров страницы: ${countH}</p>`)

  dataHomeJSON.visitHome += 1; 
  console.log(dataHomeJSON);
  fs.writeFileSync(countVisitHomeFile, JSON.stringify(dataHomeJSON))
  
})

app.get('/about', (req, res) =>{
  const dataAbout = fs.readFileSync(countVisitHomeFile, 'utf-8')
  const dataAboutJSON = JSON.parse(dataAbout)
  const countA = dataAboutJSON.visitAbout

  res.send(`<h1>About</h1>
    <a href="/">Home</a>
    <p>Просмотров страницы: ${countA}</p>`)

  dataAboutJSON.visitAbout += 1; 
  console.log(dataAboutJSON);
  fs.writeFileSync(countVisitHomeFile, JSON.stringify(dataAboutJSON))

})


const port = 3000
app.listen(port, ()=>{
  console.log('run...');
})