const express = require('express');
const req = require('express/lib/request');
const mongoose = require('mongoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const app=express();
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/blog',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
});
app.use(express.urlencoded( {  //allowing us to access all parameters in the form
    extended:false
}))
app.set('view engine','ejs'); //templating engine ejs set karliya ab vo view folder mei jakke check karega

app.use('/public', express.static('public'));


app.get('/',(req,res) => {
    //res.send("hellow");
    const articles =[{
        title:'Test Article',
        createdAt: new Date().toLocaleDateString(),
        description:'Test Description'
    },
    {
        title:'Test Article2',
        createdAt: new Date().toLocaleDateString(),
        description:'Test Description'
    }
]
    res.render('articles/index.ejs',{articles:articles}) //passing articles to text in ejs which whill get render and display
})
app.use('/articles',articleRouter)
app.listen(5000);