// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	// baseUrl: 'lib/opensource',
	baseUrl: '/',
	waitSeconds: 200,
	shim : {
		underscore : {
			exports : '_'
		},
		jquery : {
			exports : '$'
		},
		backbone : {
			deps : [ 'underscore', 'jquery' ],
			exports : 'Backbone'
		},
        'hallo' : ['jquery.ui', 'rangy'],
        rangy : {
            exports : 'rangy',
            init: function(){ this.rangy.init();return this.rangy}
        },
        handlebars:{
            exports : 'Handlebars'
        }
	},
	paths : {
        config : '/configs',
		jquery : '/lib/jquery',
        'jquery.ui' : '/lib/jquery-ui',
        'jquery.cookie' : '/lib/jquery-cookie/jquery.cookie',
		underscore : '/lib/underscore',
		backbone : '/lib/backbone',
		text : '/lib/text/text',
		'knowledge.autocomplete': '/lib/custom/knowledge_concept_autocomplete',
		'bootstrap': '/lib/bootstrap/dist/js/bootstrap.min',
        'hallo' : '/lib/hallo-prod/hallo',
        'rangy' : '/lib/rangy/rangy-core',
        'handlebars' : '/lib/handlebars'
	}
});
require([ 'backbone', 'jquery', 'config', '/views/main.js', 'jquery.cookie'],
    function(Backbone, $, Config, MainView) {
	var AppRouter = Backbone.Router.extend({
		routes : {
            "" : "showPageView",
            "page/:url" : "showPageView"
		},
        getUrlVars: function()
        {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        initialize: function(){
            this.bind('all', this.changeRoute);
            $.cookie.json = true;
            Backbone.getUser = function(){
                return $.cookie('user');
            };
            Backbone.setUser = function(user){
                $.cookie('user', JSON.stringify(user));
            };
            if(this.getUrlVars()['apikey'] != null)
                Backbone.setUser({apiKey:this.getUrlVars()['apikey']});

//            var that = this;
            this.mainView = new MainView({parentPlaceholder:$('body')});
            this.mainView.render();
            this.mainView.showHeaderView();
            Backbone.mainView = this.mainView;


        },
        changeRoute: function(){

        },
        showPageView: function(url){
            if(url == null)
                this.mainView.showView("ContentView", {url:'landing'});
            else
                this.mainView.showView("ContentView", {url:url});

            $(document).on("click", "a:not([data-bypass])", function(evt) {
                var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
                var root = location.protocol + "//" + location.host + Backbone.history.root;

                if (href.prop && href.prop.slice(0, root.length) === root) {
                    evt.preventDefault();
                    Backbone.history.navigate(href.prop.slice(root.length), true);
                }
            });
        }
	});

	var app = new AppRouter();
	Backbone.history.start({pushState: true});
    Backbone.app = app;
});
