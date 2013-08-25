define([
    'backbone',
    'views/base/partial',
    'jquery',
    'underscore',
    'config',
    'text!templates/main.html'
],
    function (Backbone, PartialView, $, _, Config, template) {
        var originR;
        var AppHeaderView = PartialView.extend({
            template:_.template(template),
            id: 'container',
            className:'container',
            events:{
            },
            loadingAnimation: function(){
                this.bodyPlaceholder.modal('loading');
            },
            req : function(deps, callback){
                var that = this;
//                this.loadingAnimation();
                callback = _.wrap(callback, function(func){
//                    that.loadingAnimation();
                    var originArgs = [];
                    for(var i=1;i<arguments.length;i++)
                        originArgs.push(arguments[i]);
                    func.apply(this, originArgs);
                });
    //            callback();
                originR(deps, callback);
            },
            clickNav:function (e) {
//                $(e.currentTarget.parentElement.parentElement).children().removeClass('active');
//                $(e.currentTarget.parentElement).addClass('active');
            },
            onRender:function () {
                var that = this;
                $(this.el).html(this.template({}));
                this.headerPlaceholder = this.$el.find('#header');
                this.contentPlaceholder = this.$el.find('#body');
//                this.searchPanelPlaceholder = this.$el.find('#search-panel-placeholder');

//                originR = require;

//                var headerView = new HeaderView();
//                this.addPartialInnerView(headerView, this.headerPlaceholder);
            },
            onRendered:function () {
                Backbone.MainView = this;
            },
            showView: function(viewName, args){
                var that = this;
//                console.log(Backbone.getUser());
//                if(Backbone.getUser() == null)
//                {
//                    this.bodyPlaceholder
//                        .css('max-height', '')
//                        .css('overflow-y', '');
//                    $(window).resize(function(){
//                        that.bodyPlaceholder.css('max-height', 'default');
//                    });
//                    $('html').css('overflow-y','');
//                    this.resetViewLayout();
//
//                    if(viewName == 'RegisterView' ||
//                       viewName == 'LandingView' ||
//                       viewName == 'LoginView')
//                        this['show'+viewName](args);
//                    else
//                        this.showLoginView();
//                    return;
//                }
//
//                this.bodyPlaceholder
//                    .css('max-height', $(window).height() - 80)
//                    .css('overflow-y', 'auto');
//                $(window).resize(function(){
//                    that.bodyPlaceholder.css('max-height', $(window).height() - 80);
//                });
//                $('html').css('overflow-y','hidden');
//
//                var headerView = this.getInnerView(this.headerPlaceholder);
//                if(headerView == null || headerView.$el == null)
//                    this.showHeaderView();
                this['show'+viewName](args);
            },
            showHeaderView: function(){
                var that = this;
                require(['views/header', 'models/header'],
                    function(HeaderView, HeaderModel){
                        var header = new HeaderModel();
                        header.fetch({
                            success: function(){
                                var headerView = new HeaderView({model: header});
                                that.addPartialInnerView(headerView, that.headerPlaceholder);
                            }
                        })
                    })
            },
            showContentView: function(args){
                var that = this;
                require(['views/content', 'views/header', 'models/page', 'models/header'],
                    function(ContentView, HeaderView, PageModel, HeaderModel){
                    var pageModel = new PageModel();
                    var contentView = new ContentView();
                    if(args.url != null){
                        pageModel.set('url', args.url);
                        pageModel.fetch(
                            {
                                success: function(res, body){
                                    contentView.model = pageModel;
                                    that.addPartialInnerView(contentView, that.contentPlaceholder);
                                },
                                error: function(model, response){
                                    if(response.status == 404){
                                        require(['views/notfound'], function(NotFoundView){
                                            that.addPartialInnerView((new NotFoundView()), that.contentPlaceholder);
                                        })
                                    }
                                }
                            });
                    }
                });
            }
        });

        return AppHeaderView;
    }
);