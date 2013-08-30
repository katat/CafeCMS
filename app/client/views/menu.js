/**
 * User: katat
 * Date: 8/29/13
 * Time: 11:56 AM
 */
define(['views/base/append', 'views/menu.modal', 'jquery', 'handlebars', 'text!templates/menu.html', 'bootstrap'],
    function(AppendView, MenuModalView, $, Handlebars, tpl){
    var MenuView = AppendView.extend({
        template: Handlebars.compile(tpl),
        tagName: 'li',
        events: {
            'click a': 'showModal'
        },
        onRender: function(){
            var that = this;
            this.$el.html(this.template(this.model.toJSON()));
            this.linkElm = this.$el.find('a.menu');
            this.modalPlaceholder = this.$el.find('.modal-placeholder');
            this.model.bind('change', function(){
                that.linkElm.text(that.model.get('name'));
                that.linkElm.attr('href', that.model.get('link'));
            });
            this.model.bind('destroy', function(){
                that.remove();
            });
            this.addPartialInnerView(new MenuModalView({model:this.model}), this.modalPlaceholder);
        },
        onRendered: function(){
//            this.$el.find('#menu-modal').modal('show');
        },
        enableEdit: function(){
            var that = this;
            this.toShowModal = true;
//            this.$el.find('a.menu').hallo({
//                plugins: {
//                    'hallolink' : {}
//                },
//                toolbar: 'halloToolbarInstant',
//                editable: true
//            })
//            this.$el.find('a.menu').click(function(e){
//                require(['views/menu.modal'], function(MenuModalView){
//                    var menuView = new MenuModalView({model:that.model});
//                    that.addPartialInnerView(menuView, $(e.target).parent().find('.modal-placeholder'));
//                })
//                e.stopPropagation();
//                e.preventDefault();
//                return false;
//            });
//            this.$el.find('ul.menus li').each(function(index, elm){
//                var removeMenu = $(elm).find('a.remove-menu');
//                removeMenu.show();
//                $(removeMenu).click(function(){
//                    $(elm).remove();
//                })
//            });
            this.$el.addClass('enable-edit');
            AppendView.prototype.enableEdit.apply(this, arguments);
        },
        disableEdit: function(){
            this.toShowModal = false;
            this.$el.removeClass('enable-edit');
            AppendView.prototype.disableEdit.apply(this, arguments);
        },
        showModal: function(){
            if(!this.toShowModal)
                return;
            this.getInnerView(this.modalPlaceholder).showModal();
        }
    })

    return MenuView;
})