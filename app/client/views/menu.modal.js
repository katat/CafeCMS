/**
 * User: katat
 * Date: 8/30/13
 * Time: 9:19 AM
 */
define(['views/base/append', 'jquery', 'handlebars', 'text!templates/menu.modal.html', 'bootstrap'],
    function(AppendView, $, Handlebars, tpl){
        var MenuModalView = AppendView.extend({
            template: Handlebars.compile(tpl),
            events: {
                'blur .name': 'changeName',
                'blur .link': 'changeLink',
                'click button.save': 'saveMenu',
                'click button.remove': 'removeMenu'
            },
            onRender: function(){
                this.$el.html(this.template(this.model.toJSON()));
                this.modalPlaceholder = this.$el.find('#menu-modal');
                this.nameInput = this.$el.find('input.name');
                this.linkInput = this.$el.find('input.link');
            },
            onRendered: function(){
//                this.$el.find('#menu-modal').modal('show');
            },
            showModal: function(){
                this.modalPlaceholder.modal('show');
            },
            saveMenu: function(){
                this.model.set('name', this.nameInput.val());
                this.model.set('link', this.linkInput.val());
                this.modalPlaceholder.modal('hide');
            },
            removeMenu: function(){
                var that = this;
                this.modalPlaceholder.modal('hide');
                this.modalPlaceholder.on('hidden.bs.modal', function(){
                    that.model.destroy();
                })
//                this.model.destroy();
//                this.removeView();
            }
        })
        return MenuModalView;
    }
)