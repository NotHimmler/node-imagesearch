module.exports = {
    queries: [],
    addQuery: function(query){
        var q = this.queries;
        if(q.length > 10) q.pop();

        var query_object = {
            term: query,
            when: Date()
        }

        q.unshift(query_object);
        this.queries = q;
    }
}