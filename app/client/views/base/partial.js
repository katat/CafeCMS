define(['backbone', 'underscore', 'views/base/base'], function (Backbone, _, BaseView) {
    var PartialView = BaseView.extend({
        initialize : function(){
            BaseView.prototype.initialize.apply(this, arguments);
        },
//        addPartialInnerView:function (view, parentPlaceholder) {
//            view.parentPlaceholder = parentPlaceholder;
////            var existInnerView = _.find(this.innerViews, function(o){
////                if(o.selector == parentPlaceholder.selector)
////                    return true;
////            });
////            if(existInnerView != null){
////                existInnerView.view.removeView();
////                existInnerView = null;
////            }
//            this.innerViews = _.reject(this.innerViews, function(o){
//                if(o.selector == parentPlaceholder.selector)
//                {
//                    delete o.view.parentPlaceholder;
//                    o.view.removeView();
//                    return true;
//                }
//            });
//            this.innerViews.push({selector: parentPlaceholder.selector, view:view});
//            if(this.isRendered){
//                view.render();
//            }
//        },
//        addAppendInnerView: function(view, parentPlaceholder){
//            view.parentPlaceholder = parentPlaceholder;
//            this.innerViews.push({selector: parentPlaceholder.selector, view:view});
//            if(this.isRendered){
//                view.render();
//            }
//        },
        doRender : function(){
            this.parentPlaceholder.html(this.el);
        }
    })
    return PartialView;
});