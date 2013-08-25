/**
 * User: katat
 * Date: 8/23/13
 * Time: 4:19 PM
 */
define(['backbone', 'config'], function(Backbone, Config){
    var Header = Backbone.Model.extend({
        idAttribute: '_id',
        sync: function(method, model, options){
            options.url = "/rest/header";
            return Backbone.sync(method, model, options);
        },
        urlRoot: Config.restAPI +'/header'
    });

    return Header;
});