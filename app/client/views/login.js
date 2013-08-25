/**
 * User: katat
 * Date: 8/24/13
 * Time: 10:36 AM
 */
define(['backbone', 'handlebars', 'text!templates/login.html'], function(Backbone, Handlebars, tpl){
    var LoginView = Backbone.View.extend({
        template: Handlebars.compile(tpl),
        events: {
            "click #sign-in" : 'signIn'
        },
        render: function(){
            this.$el.html(this.template({}));
            this.on('shown.bs.popover', function(){
                console.log('popover');
            })
            return this;
        },
        signIn: function(){
            console.log('test');
        }
    })

    return LoginView;
})