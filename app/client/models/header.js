/**
 * User: katat
 * Date: 8/23/13
 * Time: 4:19 PM
 */
define(['backbone', 'models/base', 'config'], function(Backbone, BaseModel, Config){
    var Header = BaseModel.extend({
        idAttribute: '_id',
        sync: function(method, model, options){
            options.url = "/rest/header";
            if(Backbone.getUser() != null)
                options.headers = {apikey:Backbone.getUser().apikey};
            return Backbone.sync(method, model, options);
        },
        urlRoot: Config.restAPI +'/header'
    });

    return Header;
});