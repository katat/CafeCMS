/**
 * User: katat
 * Date: 8/22/13
 * Time: 4:56 PM
 */
define(
    ['views/base/partial', 'handlebars', 'hallo', 'text!templates/content.html'],
    function(PartialView, Handlebars, Hallo, tpl){
    var ContentView = PartialView.extend({
//        template: Handlebars.compile(tpl),
        events:{
            'click #save-content' : 'save'
        },
        onRender: function(){
            this.template = Handlebars.compile(tpl, {noEscape: true});
            this.$el.html(this.template(this.model.toJSON()));
            this.contentPlaceholder = this.$el.find('#content');
            this.headingPlaceholder = this.$el.find('#heading');
        },
        onRendered: function(){

        },
        enableEdit: function(){
            this.contentPlaceholder.hallo({
                plugins: {
                    'halloformat': {},
                    'halloblock': {},
                    'halloblacklist': {},
                    'hallolink' : {},
                    'hallolists' : {}
                },
                toolbar: 'halloToolbarFixed',
                editable: true
            });
            this.headingPlaceholder.attr('contenteditable', true);
        },
        disableEdit: function(){
            this.contentPlaceholder.hallo({editable:false});
            this.headingPlaceholder.attr('contenteditable', false);
            this.model.set('title', this.headingPlaceholder.html());
            this.model.set('content', this.contentPlaceholder.html());
            this.model.save();
        }
//        save: function(){
//            this.model.set('content', this.contentPlaceholder.html());
//            this.model.save();
//        }
    })

    return ContentView;
})