/**
 * User: katat
 * Date: 8/29/13
 * Time: 8:27 PM
 */
require(['../../../app/client/models/base'], function(BaseModel){
    describe('RequireJs basic tests', function(){
//        beforeEach(function(){
//            expect(true).toBeTruthy();
//        });
//        afterEach(function(){
//            expect(true).toBeTruthy();
//        });

        it('should change the second level property', function(){
            var baseModel = new BaseModel({a:{b:{c:{d:1}}}});
            expect(baseModel.toJSON().a.b.c.d).toBe(1);
            var a = baseModel.getSubModel('a');
            a.set('b', null);
            expect(a.toJSON().b).toBe(null);
        });
        it('should change the third level property', function () {
            var baseModel = new BaseModel({a:{b:{c:{d:1}}}});
            var a = baseModel.getSubModel('a');
            b = a.getSubModel('b');
            b.set('c', null);
            expect(a.getSubModel('b').get('c')).toBe(null);
            expect(b.get('c')).toBe(null);
            expect(a.toJSON().b.c).toBe(null);
        });

        it('should run setup', function(){
            expect(typeof setupHasRun).toBe('boolean');
        });
    });
});