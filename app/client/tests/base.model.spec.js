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
        it('should change the element of an array property', function(){
            var baseModel = new BaseModel({a:{b:[{c:1},{d:2}]}});
            var a = baseModel.getSubModel('a');
            b = a.getSubModel('b');
            b.getSubModel(0).set('c',0);
            expect(a.toJSON().b[0].c).toBe(0);
        })
        it('should remove the property', function(){
            var baseModel = new BaseModel({a:{b:[{c:1},{d:2}]}});
            var a = baseModel.getSubModel('a');
            var b = a.getSubModel('b');
            b.getSubModel(0).destroy();
            b.getSubModel(1).destroy();
            expect(a.toJSON().b[0]).toBe(undefined);
        })
        it('should change the array element using getSubModels', function(){
            var baseModel = new BaseModel({a:{b:[{c:1},{d:2}]}});
            expect(baseModel.toJSON().a.b.length).toBe(2);
            var a = baseModel.getSubModel('a');
            var bs = a.getSubModels('b');
            expect(baseModel.toJSON().a.b.length).toBe(2);
            expect(bs.length).toBe(2);
            bs[0].set('c', 3);
            expect(baseModel.toJSON().a.b[0].c).toBe(3);
            expect(baseModel.toJSON().a.b[1].d).toBe(2);
        })
        it('should remove the array element using getSubModels', function(){
            var baseModel = new BaseModel({a:{b:[{c:1},{d:2}]}});
            var a = baseModel.getSubModel('a');
            var bs = a.getSubModels('b');
            expect(baseModel.toJSON().a.b.length).toBe(2);
            bs[0].destroy();
            expect(baseModel.toJSON().a.b.length).toBe(1);
            expect(baseModel.toJSON().a.b[0].c).toBe(undefined);
            bs[1].destroy();
            expect(baseModel.toJSON().a.b.length).toBe(0);

        })
        it('should add new array element', function(){
            var baseModel = new BaseModel({a:{b:[]}});
            var a = baseModel.getSubModel('a');
            var subModel = a.addSubModel('b', {c:1});
            expect(baseModel.toJSON().a.b[0].c).toBe(1);
            var ssm = a.addSubModel('b', {e:2});
            expect(baseModel.toJSON().a.b[1].e).toBe(2);
        })
        it('should run setup', function(){
            expect(typeof setupHasRun).toBe('boolean');
        });
    });
});