/**
 * User: katat
 * Date: 8/21/13
 * Time: 5:38 PM
 */
define(['backbone', 'config'], function(Backbone, Config){
    var Page = Backbone.Model.extend({
        idAttribute: '_id',
        sync: function(method, model, options){
            options.url = "/rest/pages/" + this.get('url');
            if(Backbone.getUser() != null)
                options.headers = {apikey:Backbone.getUser().apikey};
            return Backbone.sync(method, model, options);
        },
        urlRoot: Config.restAPI +'/pages',
//        defaults:{
//            name: null,
//            description: null,
//            problems:[]
//        },
//        setRootUrl: function(exerciseId){
//            this.urlRoot = Config.restServer +'teacher/exercises/'+exerciseId;
//        }
        setId : function(id){
            this.set('id', id);
        }
    });

    return Page;
});