define(['backbone', 'underscore', 'jquery'], function (Backbone, _, $) {
    var BaseView = Backbone.View.extend({
//        innerViews : [],
//        isRendered : false,
        initialize:function () {
            this.parentPlaceholder = this.options.parentPlaceholder;
            this.innerViews = [];
            this.helpMessages = [];
            this.isRendered = false;
        },
        addModel:function (model) {
            this.collection.add(model);
        },
        addInnerView:function (view, parentPlaceholder) {
            view.parentPlaceholder = parentPlaceholder;
            this.innerViews.push({selector:parentPlaceholder.selector, view:view});
        },
        addPartialInnerView:function (view, parentPlaceholder) {
            view.parentPlaceholder = parentPlaceholder;
//            var existInnerView = _.find(this.innerViews, function(o){
//                if(o.selector == parentPlaceholder.selector)
//                    return true;
//            });
//            if(existInnerView != null){
//                existInnerView.view.removeView();
//                existInnerView = null;
//            }
            this.innerViews = _.reject(this.innerViews, function(o){
                if(o.selector == parentPlaceholder.selector)
                {
                    delete o.view.parentPlaceholder;
                    o.view.removeView();
                    return true;
                }
            });
            this.innerViews.push({selector: parentPlaceholder.selector, view:view});
            if(this.isRendered){
                view.render();
            }
        },
        addAppendInnerView: function(view, parentPlaceholder, notRender){
            view.parentPlaceholder = parentPlaceholder;
            this.innerViews.push({selector: parentPlaceholder.selector, view:view});
            if(this.isRendered){
                if(notRender == null || !notRender)
                    view.render();
            }
        },
        addHelpMessage: function(component, helpMsg, placement){
            this.helpMessages.push({component:component, msg:helpMsg, placement:placement});
        },
        getInnerView:function (parentPlaceholder) {
            var existInnerView = _.find(this.innerViews, function (o) {
                if (o.selector == parentPlaceholder.selector)
                    return true;
            });
            return existInnerView != null ? existInnerView.view : null;
        },
        getInnerViews: function(parentPlaceholder){
            var views = _.where(this.innerViews, {selector:parentPlaceholder.selector});
            return _.pluck(views,'view');
        },
        setMaxHeight: function(placeholder, heightToReduce){
            $(window).resize(function(){
                placeholder.css('max-height', $(window).height() - heightToReduce)
                           .css('overflow-y', 'auto');
            });
            $(window).resize();
        },
        render:function () {
            //before attaching to DOM
            this.onRender();
            //attaching to DOM
            this.doRender();
            this.isRendered = true;
            _.each(this.innerViews, function (viewObj) {
                viewObj.view.render();
            });
            _.each(this.helpMessages, function(msgObj){
                msgObj.component.popover({
                    content: msgObj.msg,
                    placement: msgObj.placement,
                    html: true,
                    trigger: 'manual'
                });
                msgObj.component.hover(
                    function(){
                        if(Backbone.showHelpTip == true)
                            msgObj.component.popover('show');
                    },
                    function(){
                        if(Backbone.showHelpTip == true)
                            msgObj.component.popover('hide');
                    }
                )
            });
            //after attached to DOM
            if (this.onRendered != null)
                this.onRendered();
            return this;
        },
        removeView:function () {
            _.each(this.innerViews, function (viewObj) {
                if(viewObj.view != null)
                    viewObj.view.removeView();
                delete viewObj.view;
            });
            this.unbind();
            if(this.$el != null){
                this.remove();
            }
            delete this.$el;
            delete this.el;
        },
        enableEdit: function(){
            var views = _.pluck(this.innerViews, 'view');
            _.each(views, function(view){
                view.enableEdit();
            })
        },
        disableEdit: function(){
            var views = _.pluck(this.innerViews, 'view');
            _.each(views, function(view){
                view.disableEdit();
            })
        }
    })
    return BaseView;
});