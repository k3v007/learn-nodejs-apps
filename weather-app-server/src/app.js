const path = require('path')
const express = require('express');
const morgan = require('morgan')
const hbs = require('hbs')


const app = express();
const staticDir = path.join(__dirname, '../static')
const templateDir = path.join(__dirname, '../templates')
const partialDir = path.join(__dirname, '../templates/partials')

// app settings
app.use(morgan('common'))
app.set('views', templateDir)
app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);
app.use(express.static(staticDir))

// hbs settings
hbs.registerPartials(partialDir)

// routes

app.get('', (req, res) => {
    res.render('index.html')
})


app.listen(3000)