module.exports = function(response,offset){
    var image_info = [];
    var start_index = 0
    var end_index = 9

    for(var i = start_index; i <= end_index; i++){
        var object = {url: "", snippet:"", context: ""};

        var item = response[i];

        object.url = item.link;
        object.snippet = item.snippet;
        object.context = item.image.contextLink;

        image_info.push(object);
    }

    return image_info;
}