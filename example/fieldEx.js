var R = require("../rlab");
var FF = R.FloatField;
var be = R.be;
be('FF:2+3=5',FF.add(2,3)===5);
be('FF:2^3=8',FF.power(2,3)===8);

var F7= R.FiniteField.create(7);
var a = 3, b=6;
be('F7:3+6=2', F7.add(a,b)===2);
be('F7:3*6=4', F7.mul(a,b)===4);
be('F7:closability(+)=> a+b in F7', F7.addGroup.closability(3,6));
be('F7:associativity(+)=>(a+b)+c=a+(b+c)', F7.addGroup.associativity(3,6,4));
be('F7:identity(+)=>a+0=a', F7.addGroup.identity(3));
be('F7:inversability(+)=a-a=0', F7.addGroup.inversability(3));


var C = R.ComplexField;
var c1 = new R.Complex(2,3);
be('C.has(c1)=true', C.has(c1));
be('C :c1==2+3i', c1.str()==='2+3i');
be('C :c1+c1=4+6i', C.add(c1,c1).str()==='4+6i');
be('C :c1*c1=-5+12i', C.mul(c1,c1).str()==='-5+12i');
be('C :(c1*c1)/c1=2+3i', C.div(C.mul(c1,c1),c1).str()==='2+3i');

var Q = R.RatioField;
var q1 = new R.Ratio(2,3);
be('Q:q1=2/3', q1.str()==='2/3');
be('Q:q1+q1=4/3', Q.add(q1,q1).reduce().str()==='4/3');
be('Q:q1-q1=0', Q.sub(q1,q1).a===0);
be('Q:q1*q1=4/9', Q.mul(q1,q1).str()==='4/9');
be('Q:q1/q1*q1=2/3', Q.mul(Q.div(q1,q1),q1).reduce().str()==='2/3');
be('Q:q1^3=8/27', q1.power(3).str()==='8/27');

var co = new R.Complex(2,3);
be('C:co=2+3i', co.str()==='2+3i');
be('C:co+co=4+6i', co.add(co).str()==='4+6i');
be('C:co*co=-5+12i', co.mul(co).str()==='-5+12i');
be('C:co/co=1+0i', co.div(co).str()==='1+0i');
be('C:co*co/co=2+3i', co.mul(co).div(co).str()==='2+3i');

var c1=p('1+2i'), c2=p('2+1i'), c3=p('10+0i');
print('%s * %s=%s', c1, c2, c1.mul(c2));
print('(%s)*3=%s', c1, c1.mul(3));
print('3 * 3=%s', p('3').mul(3));
// print('c1.exp().log()=', c1.exp().log().str());

var sqrt2 = Math.sqrt(2);
var c=new R.Complex(sqrt2, sqrt2);
print('c=%s', c);
print('c.toPolar=%j', c.toPolar().str());
print('c*c=%s', c.mul(c));
print('c^2=%s', c.power(2));
print('c^2.sqrt()=%s', c.power(2).sqrt());
// be('c1.exp().ln()=', c1.exp().ln().str()==='1+2i');

var P2 = extend({e:[0,1]}, R.PermutationGroup);
print('[1,0].inv()=%j', P2.inv([1,0]));
var P3 = extend({e:[0,1,2]}, R.PermutationGroup);
print('[0,2,1].inv()=%j', P3.inv([0,2,1]));
print('[2,1,0].inv()=%j', P3.inv([2,1,0]));
print('[1,2,0].inv()=%j', P3.inv([1,2,0]));
print('[1,2,0]*[1,2,0].inv()=%j', P3.op([1,2,0], P3.inv([1,2,0])));
print('[1,2,0].inv()*[1,2,0]=%j', P3.op(P3.inv([1,2,0]),[1,2,0]));

var S2=[[0,1,2], [1,0,2]];
print('S2=', S2);
print('leftCoset([1,2,0], S2)=', P3.leftCoset([1,2,0],S2));
print('rightCoset([1,2,0], S2)=', P3.rightCoset(S2, [1,2,0]));

