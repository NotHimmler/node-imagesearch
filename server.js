var child = require('child_process');
var request = require('request');
var express = require('express');
var sprintf = require('sprintf').sprintf;
var rp = require('./app/response-parser');
var latest_queries = require('./app/latest-queries');
var app = express();

app.set('port', process.env.PORT || 8080);

app.get('/image_search/:query', function(req,res){
    var start = 1;

    if(req.query.offset){
        start = req.query.offset*10 + 1;
    }

    var values = {"key":process.env.key,"cx":process.env.cx, "q":req.params.query, "searchType":"image", start:start}
    var url = sprintf("https://www.googleapis.com/customsearch/v1?key=%s&cx=%s&q=%s&searchType=%s&start=%s", values.key, values.cx, values.q, values.searchType, values.start);
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var body_json = JSON.parse(body);
            var items = body_json.items;
            latest_queries.addQuery(req.params.query);
            res.send(rp(items));
            
        } else {
            res.send({"error":"API call limit exceeded for the day"});
        }
    })
})

app.get('/latest', function(req, res){
    res.send(latest_queries.queries);
})

app.listen(app.get("port"));

