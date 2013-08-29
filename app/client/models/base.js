/**
 * User: katat
 * Date: 8/29/13
 * Time: 8:00 PM
 */
define(['backbone'], function(Backbone){
    var BaseModel = Backbone.Model.extend({
        getSubModel: function(name){
            var that = this;
            var SubModel = BaseModel.extend({
                set: function(property, val){
                    BaseModel.prototype.set.apply(this, arguments);
                    that.set(name, this.toJSON());
                }
            });
            return new SubModel(this.get(name));
        }
    })

    return BaseModel;
})