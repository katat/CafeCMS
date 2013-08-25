define(['backbone', 'underscore', 'views/base/base'], function (Backbone, _, BaseView) {
    var AppendView = BaseView.extend({
        initialize : function(){
            BaseView.prototype.initialize.apply(this, arguments);
            this.parentPlaceholder = this.options.parentPlaceholder;
            this.innerViews = [];
        },
        doRender : function(){
            this.parentPlaceholder.append(this.el);
        }
    })
    return AppendView;
});