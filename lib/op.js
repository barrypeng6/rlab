var Field = require("./field");
var S = Field.Set;
var Complex = Field.Complex;
var O = { Field:Field };

O.isField=function(x) {
	return S.isBool(x) || S.isNumber(x) || x instanceof Field.FieldObj;
}

var acc = {
	sum:{init:0,op:'+'}, 
	product:{init:1,op:'*'},
	min:{init:Number.MAX_VALUE,op:'min'},
	max:{init:-Number.MAX_VALUE,op:'max'},
}

O.vop=function(op,x,y) {
	var c=[],result=(S.isUndefined(acc[op]))?undefined:acc[op].init;
  if (S.isArray(x)) {
		for (var i=0; i<x.length; i++) {
			if (!S.isUndefined(result)) {
				var xAcc=S.isArray(x[i])?O.op(op, x[i]):x[i];
				result = O.op(acc[op].op, xAcc, result);
			} 
			else {
				var yi = S.isArray(y)?y[i]:y;
				c[i] = O.op(op, x[i], yi);
			}
		}
	} else {
		throw Error('vop fail:op,x,y=', op, x, y);
	}
	if (x.length === c.length)
		return c;
	else
		return result;
}

O.op = function(op,x,y) {
  if (O.isField(x)) {
		if (!S.isUndefined(acc[op])) {
			return x;			
		}	else if (x instanceof Field.FieldObj || 
		    (S.isNumber(x) && y instanceof Field.FieldObj)) {
			x = Complex.toComplex(x); 
			y = S.isNumber(y)?Complex.toComplex(y):y;
			switch (op) {
				case 'eval': var exp = y; return exp(x);
				case 'neg':return x.neg();
				case 'inv':return x.inv();
				case 'bnot':return x.bnot();				
				case '+':return x.add(y);
				case '-':return x.sub(y);
				case '*':return x.mul(y);
				case '/':return x.div(y);
				case 'power':return x.power(y);
				case 'sqrt':return x.sqrt();
				case 'eq':return x.eq(y);
				case 'neq':return x.neq(y);
				case 'geq':return x.geq(y);
				case 'leq':return x.leq(y);
				case 'gt':return x.gt(y);
				case 'lt':return x.lt(y);
			}
		} else if (S.isBool(x) || S.isNumber(x)) {
			switch (op) {
				case 'eval': var exp = y; return exp(x);
				case 'not':return !x;
				case 'neg':return -x;
				case 'inv':return 1/x;
				case 'bnot':return ~x;
				case 'max': return Math.max(x,y);
				case 'min': return Math.min(x,y);
				case 'and':return x&&y;
				case 'or':return x||y;
				case 'xor':return x!==y;
				case '+':return x+y;
				case '-':return x-y;
				case '*':return x*y;
				case '/':return x/y;
				case '%':return x%y;
				case 'eq':return x===y;
				case 'neq':return x!==y;
				case 'geq':return x>=y;
				case 'leq':return x<=y;
				case 'gt':return x>y;
				case 'lt':return x<y;
				case '&':return x&y;
				case '|':return x|y;
				case 'bxor':return x^y;
				case '<<':return x<<y;
				case '>>':return x>>y;
				case 'and':return x&&y;
				case 'or':return x||y;
				case 'xor':return x!==y;
				case 'sqrt':return Math.sqrt(x);
				case 'power':return Math.pow(x,y);				
				case 'log':return Math.log(x);
				case 'exp':return Math.exp(x);
				case 'abs':return Math.abs(x);;
				case 'sin':return Math.sin(x);
				case 'cos':return Math.cos(x);
				case 'tan':return Math.tan(x);
				case 'asin':return Math.asin(x);
				case 'acos':return Math.acos(x);
				case 'atan':return Math.atan(x);
				case 'sinh':return Math.sinh(x);
				case 'cosh':return Math.cosh(x);
				case 'tanh':return Math.tanh(x);
				case 'ceil':return Math.ceil(x);
				case 'floor':return Math.floor(x);
				case 'round':return Math.round(x);
				case 'log1p':return Math.log1p(x);
				case 'log10':return Math.log10(x);
				case 'log2':return Math.log2(x);
				case 'random':return Math.random();
				case 'sign':return Math.sign(x);
				case 'abs':return Math.abs(x);
				case 'cbrt':return Math.cbrt(x); // cubic root
			}
		}
	} else if (S.isFunction(x)) {
		if (S.isFunction(y)) {
			switch (op) {
				case 'neg':return O.fneg(x);
				case 'inv':return O.finv(x);
				case '+':return O.fadd(x,y);
				case '-':return O.fsub(x,y);
				case '*':return O.fmul(x,y);
				case '/':return O.fdiv(x,y);
				case 'compose':return O.fcompose(x,y);
			}			
		} else {
			switch (op) {
				case 'eval':return x(y);
			}
		}
	}	else if (S.isArray(x)) {
		return O.vop(op,x,y);
	}
	throw Error('op fail:op,x,y=', op, x, y);
}

O.eval=function(x,y) { return O.op('eval', x,y) }
// +-*/%^
O.add=function(x,y) {	return O.op('+',x,y) }
O.sub=function(x,y) {	return O.op('-',x,y) }
O.mul=function(x,y) {	return O.op('*',x,y) }
O.div=function(x,y) {	return O.op('/',x,y) }
O.mod=function(x,y) {	return O.op('%',x,y) }
O.power=function(x,y) { return O.op('power', x, y) }
O.neg=function(x) { return O.op('neg', x) }
O.inv=function(x) { return O.op('inv', x) }
// logical
O.not=function(x) { return O.op('not', x) }
O.and=function(x,y) { return O.op('&&', x, y) }
O.or=function(x,y) { return O.op('||', x, y) }
O.xor=function(x,y) { return O.op('xor', x, y) }
O.bnot=function(x) { return O.op('bnot', x) }
O.band=function(x,y) { return O.op('&', x, y) }
O.bor=function(x,y) { return O.op('|', x, y) }
O.bxor=function(x,y) { return O.op('bxor', x, y) }
O.lshift=function(x,y) { return O.op('<<', x, y) }
O.rshift=function(x,y) { return O.op('>>', x, y) }
// compare
O.eq=function(x,y) { return O.op('eq', x, y) }
O.neq=function(x,y) { return O.op('neq', x, y) }
O.geq=function(x,y) { return O.op('geq', x, y) }
O.leq=function(x,y) { return O.op('leq', x, y) }
O.gt=function(x,y) { return O.op('gt', x, y) }
O.lt=function(x,y) { return O.op('lt', x, y) }
// number function
O.sqrt=function(x) { return O.op('sqrt', x) }
O.log=function(x) { return O.op('log', x) }
O.exp=function(x) { return O.op('exp', x) }
O.abs=function(x) { return O.op('abs', x) }
O.sin=function(x) { return O.op('sin', x) }
O.cos=function(x) { return O.op('cos', x) }
O.tan=function(x) { return O.op('tan', x) }
O.asin=function(x) { return O.op('asin', x) }
O.acos=function(x) { return O.op('acos', x) }
O.atan=function(x) { return O.op('atan', x) }
O.atan2=function(x) { return O.op('atan2', x) }
O.ceil=function(x) { return O.op('ceil', x) }
O.floor=function(x) { return O.op('floor', x) }
O.round=function(x) { return O.op('round', x) }

O.fneg=function(fx) { return function(v) {
	return -1*fx(v);
}}

O.finv=function(fx) { return function(v) {
	return 1/fx(v);
}}

O.fadd=function(fx,fy) { return function(v) {
	return fx(v).add(fy(v));
}}

O.fsub=function(fx,fy) { return function(v) {
	return fx(v).sub(fy(v));
}}

O.fmul=function(fx,fy) { return function(v) {
	return fx(v).mul(fy(v));
}}

O.fdiv=function(fx,fy) { return function(v) {
	return fx(v).div(fy(v));
}}

O.fcompose=function(fx,fy) { return function(v) {
	return fx(fy(v));
}}

O.feval=function(f,x) { return f(x) }

// =========== Calculus =================
O.fdiff = function(f, x, dx=0.001) {
  var dy = f(x.add(dx)).sub(f(x.sub(dx)));
  return dy.div(dx.mul(2));
}

O.fintegral = function(f, a, b, dx=0.01) {
  var area = 0.0;
  for (var x=a; x<b; x=x+dx) {
    area = area + f(x).mul(dx);
  }
  return area;
}

O.parse = function(s) {
	if (s.indexOf(';')>=0) {
		var m = split(s, ";"), matrix;
		for (var i=0; i<m.length; i++) {
			matrix[i] = parse(m[i]);
		}
		return matrix;
	} if (s.indexOf(',')>=0) {
		var a = split(s, ","), array;
		for (var i=0; i<a.length; i++) {
			array[i] = parse(a[i]);
		}
		return array;
	}
	else if (s.indexOf('/')>=0)
		return Ratio.parse(s);
	else if (s.indexOf('i')>=0)
		return Complex.parse(s);
	else {
		return parseFloat(s);
	}
}

module.exports = O;

/*
O.vfill=function(size, value) {
	var v=[];
	for (var i=0; i<size; i++)
		v[i] = value;
	return v;
}

O.vextend=function(a, size) {
	var v = a.slice();
	for (var i=a.length; i<size; i++) {
		v.push(0);
	}
	return v;
}

O.vdot=function(x,y) {
	var sum = 0;
	for (var i=0; i<x.length; i++) {
		sum = sum.add(x[i].mul(y[i]));
	}
	return sum;
}

*/