/**
 * User: katat
 * Date: 8/22/13
 * Time: 8:35 PM
 */
define(['backbone', 'underscore', 'views/base/partial', 'handlebars', 'hallo', 'text!templates/header.html', 'text!templates/login.html', 'bootstrap'],
    function(Backbone, _, PartialView, Handlebars, Hallo, tpl, loginTpl){
    var HeaderView = PartialView.extend({
        template: Handlebars.compile(tpl),
        events:{
            'click #enable-edit' : 'editClick',
            'click #new-menu' : 'addNewMenu',
            'click #user-logout' : 'logout'
        },
        onRender : function(){
            var that = this;
            this.$el.html(this.template(this.model.toJSON()));
            this.menuPlaceholder = this.$el.find('ul.menus li a.menu');
            this.menuRemoveBtns = this.$el.find('ul.menus li a.remove-menu');
            this.editBtn = this.$el.find('#enable-edit');
            this.userLoginBtn = this.$el.find('#user-login');
            this.userLogoutBtn = this.$el.find('#user-logout');

            console.log(that.model.toJSON());
            require(['views/menu'], function(MenuView){
                _.each(that.model.getSubModels('menus'), function(menu){
                    var menuView = new MenuView({model:menu});
                    that.addAppendInnerView(menuView, that.$el.find('ul.menus'));
                })
            })

            if(Backbone.getUser() != null)
                this.login();
            else
                this.logout();
        },
        onRendered : function(){
            var that = this;
            this.userLoginBtn.popover({
                html:true,
                trigger: 'click',
                content: loginTpl,
                placement: 'bottom',
                container: 'body'
            });
            this.userLoginBtn.on('shown.bs.popover', function(e){
                var loginForm = $('#login-form');
                loginForm.find('#sign-in').click(function(){
                    that.userLoginBtn.popover('hide');
                    var data = {
                        username: loginForm.find('#username').val(),
                        password: loginForm.find('#password').val()
                    };
                    $.post('/rest/login', data, function(ret){
                        if(ret.apikey != null){
                            Backbone.setUser(ret);
                            that.login();
                        }
                    });
                });
            })
        },
//        addMenu: function(){
//
//        },
        login: function(){
            this.editBtn.removeAttr('style');
            this.userLoginBtn.hide();
            this.userLogoutBtn.removeAttr('style');
        },
        logout: function(){
            Backbone.setUser(null);
            this.editBtn.hide();
            this.userLoginBtn.removeAttr('style');
            this.userLogoutBtn.hide();
        },
        enableEdit: function(){
            this.$el.find('ul.menus li#new-menu').show();
            console.log(this.model.toJSON());
            PartialView.prototype.enableEdit.apply(this, arguments);
        },
        disableEdit: function(){
//            this.$el.find('ul.menus li a.menu').hallo({editable:false});
            this.$el.find('ul.menus li#new-menu').hide();
            this.menuRemoveBtns.hide();
            PartialView.prototype.disableEdit.apply(this, arguments);
        },
        addNewMenu : function(){
//            var newMenuElm = $("<li><a class='menu'>new</a></li>");
//            newMenuElm.hallo({
//                plugins: {
//                    'hallolink' : {}
//                },
//                toolbar: 'halloToolbarInstant',
//                editable: true
//            });
//            this.$el.find('ul.menus #new-menu').before(newMenuElm);
            var that = this;
            require(['views/menu'], function(MenuView){
                var subModel = that.model.addSubModel('menus', {name:'new', link:''});
                var menuView = new MenuView({model:subModel});
                that.addAppendInnerView(menuView, that.$el.find('ul.menus'));
                menuView.enableEdit();
            });
        },
        editClick : function(){
            if(this.editBtn.hasClass('enable-edit')){
                this.editBtn
                    .removeClass('enable-edit')
                    .addClass('disable-edit')
                    .text('Edit');
//                var menus = [];
//                this.$el.find('ul.menus li a.menu').each(function(index, elm){
//                    var menuElm = $(elm);
//                    var menu = {
//                        name: menuElm.text(),
//                        link: menuElm.attr('href')
//                    };
//                    menus.push(menu);
//                })
//                this.model.set('menus', menus);
//                this.model.save();
                console.log(this.model.toJSON());
                this.model.save();
                Backbone.mainView.disableEdit();
            }
            else{
                this.editBtn
                    .removeClass('disable-edit')
                    .addClass('enable-edit')
                    .text('Save');
                Backbone.mainView.enableEdit();
            }

        }
    })

    return HeaderView;
})