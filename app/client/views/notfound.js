/**
 * User: katat
 * Date: 8/25/13
 * Time: 12:16 PM
 */
define(['views/base/partial', 'handlebars', 'text!templates/notfound.html'], function(PartialView, Handlebars, tpl){
    var NotFoundView = PartialView.extend({
        template: Handlebars.compile(tpl),
        onRender: function(){
            this.$el.html(this.template({}));
        }
    })

    return NotFoundView;
})