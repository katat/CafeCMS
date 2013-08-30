/**
 * User: katat
 * Date: 8/29/13
 * Time: 8:00 PM
 */
define(['backbone', 'underscore'], function (Backbone, _) {
    var BaseModel = Backbone.Model.extend({
        getSubModel:function (name) {
            var that = this;
            var SubModel;
            if (this.get(name) instanceof Array)
                throw "submodel is not allowed in this method, try getSubModels";
            SubModel = BaseModel.extend({
                set:function (property, val) {
                    BaseModel.prototype.set.apply(this, arguments);
                    that.set(name, this.toJSON());
                },
                destroy:function () {
                    BaseModel.prototype.destroy.apply(this, arguments);
                    that.unset(name);
                }
            });
            return new SubModel(this.get(name));
        },
        getSubModels:function (name) {
            var subModels = [];
            var that = this;
            if (Array.isArray(this.get(name)) != true)
                throw "this method only allow to get array";
            var SubModel = BaseModel.extend({
                set:function (property, val) {
                    BaseModel.prototype.set.apply(this, arguments);
                },
                destroy:function () {
                    var that = this;
                    BaseModel.prototype.destroy.apply(this, arguments);
                    subModels = _.reject(subModels, function (m) {
                        if (that.cid == m.cid)
                            return true;
                    })
                    that.set(name, _.map(subModels, function (sm) {
                        return sm.toJSON();
                    }));
                }
            });
            _.each(this.get(name), function (elm) {
                subModels.push(new SubModel(elm));
            })
            _.each(subModels, function(elm){
                elm.bind('change', function(){
                    that.set(name, _.map(subModels, function (sm) {
                        return sm.toJSON();
                    }), {silent:true});
                })
            })
            return subModels;
        },
        addSubModel: function(name, obj){
            if(Array.isArray(this.get(name)) != true)
                throw "only allow to add into an array property";
            var subModels = this.get(name);
            subModels.push(obj);
            this.set(name, subModels);
            var subModels = this.getSubModels(name);
            var subModel = subModels[subModels.length - 1];
            subModel.set(obj);
            return subModel;
        }
    })

    return BaseModel;
})