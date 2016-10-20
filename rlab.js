var _ = require("lodash");
var R = require("./lib/statistics");
var M = require("./lib/matrix");
var Symbol = require("./lib/symbolic");
var D = require("./lib/calculus");
R.Algebra = require("./lib/algebra");
R.Op = R.Algebra.Op;
R.Field = R.Op.Field;
R.Set = R.Field.Set;
R.NN = require("./plugin/neural");
R.NN.RBM = require("./plugin/neural/rbm");

R.Matrix = R.M = M;
R._ = _;
R.S = R.Sym = R.Symbol = Symbol;

R.PI = Math.PI;
R.E  = Math.E;

// space 沒有加上機率參數 , 不能指定機率
R.samples = function(space, size, arg) {
	var arg = _.defaults(arg, {replace:true});
	if (arg.replace)
		return _.times(size, ()=>_.sample(space));
	else
		return _.sampleSize(space, size);
}

// Graph

R.G = G = {}

G.curve=function(f, from=-10, to=10, step=0.1) {
	var x=R.steps(from, to, step);
	var y=x.map(f);
	return { type:"curve", x:x,	y:y	};
}

G.hist=function(a, from, to, step=1) {
	from = from||a.min();
	to = to||a.max();
  var n = Math.ceil((to-from+R.EPSILON)/step);
  var xc = R.steps(from+step/2.0, to, step);
  var bins = R.M.newV(n, 0);
  for (var i in a) {
    var slot=Math.floor((a[i]-from)/step);
    if (slot>=0 && slot < n)
      bins[slot]++;
  }
	return { type:'histogram', xc:xc, bins:bins, from:from, to:to, step:step};
}

G.ihist=function(a) {
	return G.hist(a, a.min()-0.5, a.max()+0.5, 1);
}

// Global
debug = function() {
	var arg = _.slice(arguments);
	console.debug.apply(console, arg);
}

print = function() {
	var arg = _.slice(arguments);
	console.log.apply(console, arg);
}

p = R.p = R.Op.parse;
be = R.Set.be;

R.debug = debug;
R.print = print;

// ==== Copy functions to R ======
R.copyFunctions(R, D, "differential,integral".split(","));
R.copyFunctions(R, Math, "abs,acos,asin,atan,ceil,cos,exp,floor,log,pow,random,round,sin,sqrt,tan".split(","));

R.copyFunctions(R, M, "solveLP,solveMP,ODE,minimize,complex,spline,linspace".split(","));

// not include : bench, xxxeq, ccsXXX, cgrid, 
R.mixThis(Array.prototype, M, [
"cLU",
"cdelsq",
"clone",
"rows",
"cols",
"row",
"col",
"tr",
"inv",
"all",
"any",
"same",
"isFinite",
"isNaN",
"mapreduce",
"complex",
"det",
"norm2",
"norm2Squared",
"norm2inf",
"dot",
"dim",
"eig",
"LU",
"svd",
"sum",
"rowSum",
"colSum",
"rowMean",
"colMean",
"addMV",
"mapM",
"mapMM",
"flatM",
"fillVM",
"fillMM",
"getBlock",
"setBlock",
"getDiag",
"diag",
// "parseFloat",
// "parseDate",
// "parseCSV",
// "toCSV",
"strM",
"sumM",
]);

// not include : bench, xxxeq, ccsXXX, cgrid, 
R.mixThis(Array.prototype, G, [
"hist",
"ihist",
]);

R.mixThis(Array.prototype, R, [
// statistics
"max",
"min",
// "sum",
"product",
"mean",
"range",
"median",
"variance",
"deviation",
"sd",
"cov",
"cor",
"normalize",
]);

R.mixThisMap(Array.prototype, _, {
// lodash
_chunk:'chunk',
_compact:'compact',
_concat:'concat',
_difference:'difference',
_differenceBy:'differenceBy',
_differenceWith:'differenceWith',
_drop:'drop',
_dropRight:'dropRight',
_dropRightWhile:'dropRightWhile',
_dropWhile:'dropWhile',
_fill:'fill',
_findIndex:'findIndex',
_findLastIndex:'findLastIndex',
_flatten:'flatten',
_flattenDeep:'flattenDeep',
_flattenDepth:'flattenDepth',
_fromPairs:'flattenPairs',
_head:'head',
_indexOf:'indexOf',
_initial:'initial',
_intersection:'intersection',
_intersectionBy:'intersectonBy',
_intersectionWith:'intersectionWith',
_join:'join',
_last:'last',
_lastIndexOf:'lastIndexOf',
_nth:'nth',
_pull:'pull',
_pullAll:'pullAll',
_pullAllBy:'pullAllBy',
_pullAllWith:'pullAllWith',
_pullAt:'pullAt',
_remove:'remove',
_reverse:'reverse',
_slice:'slice',
_sortedIndex:'sortedIndex',
_sortedIndexBy:'sortedIndexBy',
_sortedIndexOf:'sortedIndexOf',
_sortedLastIndex:'sortedLastIndex',
_sortedLastIndexBy:'sortedLastIndexBy',
_sortedLastIndexOf:'sortedLastIndexOf',
_sortedUniq:'sortedUniq',
_sortedUniqBy:'sortedUniqBy',
_tail:'tail',
_take:'take',
_takeRight:'takeRight',
_takeRightWhile:'takeRightWhile',
_takeWhile:'takeWhile',
_union:'union',
_unionBy:'unionBy',
_unionWith:'unionWith',
_uniq:'uniq',
_uniqBy:'uniqBy',
_uniqWith:'uniqWith',
_unzip:'unzip',
_unzipWith:'unzipWith',
_without:'without',
_xor:'xor',
_xorBy:'xorBy',
_xorWith:'xorWith',
_zip:'zip',
_zipObject:'zipObject',
_zipObjectDeep:'zipObjectDeep',
_zipWith:'zipWith',
// Collection
_countBy:'countBy',
// each→ forEach
// _eachRight → forEachRight
_every:'every',
_filter:'filter',
_find:'find',
_findLast:'findLast',
_flatMap:'flatMap',
_flatMapDeep:'flatMapDeep',
_flatMapDepth:'flatMapDepth',
_forEach:'forEach',
_forEachRight:'forEachRight',
_groupBy:'groupBy',
_includes:'includes',
_invokeMap:'invokeMap',
_keyBy:'keyBy',
_map:'map',
_orderBy:'orderBy',
_partition:'partition',
_reduce:'reduce',
_reduceRight:'reduceRight',
_reject:'reject',
_sample:'sample',
_sampleSize:'sampleSize',
_shuffle:'shuffle',
_size:'size',
_some:'some',
_sortBy:'sortBy',
});

Complex = R.Field.Complex;
Ratio = R.Field.Ratio;
// R.mixThis(Array.prototype,  {str:R.astr}, ['str']);
R.mixThisMap(Array.prototype,  R, {str:'astr',print:'print'});
R.mixThis(Array.prototype, R.Op, [
"eval",
// +-*/%
"add",
"sub",
"mul",
"div",
"mod",
"neg",
// "inv", 和矩陣相衝
// logical
"and",
"or",
"xor",
"not",
// bits operation
"bnot",
"band",
"bor",
"bxor",
// function
"power",
// "dot", 和矩陣相衝
"sqrt",
"log",
"exp",
"abs",
"sin",
"cos",
"tan",
"asin",
"acos",
"atan",
"ceil",
"floor",
"round",
]);

R.mixThisMap(Number.prototype, R, {
	str:'nstr',
	print:'print',
});

R.mixThis(Number.prototype, R.Op, [
	'eval',
	'add',
	'sub',
	'mul',
	'div',
	'mod',
	'power',
	'neg',
	'inv',
	'sqrt',
	'log',
	'exp',
	'abs',
	'sin',
	'cos',
	'tan',
	'asin',
	'acos',
	'atan',
	'ceil',
	'floor',
	'round',
]);
R.mixThisMap(Function.prototype, R.Op, {
	add:'fadd',
	sub:'fsub',
	mul:'fmul',
	div:'fdiv',
	compose:'fcompose',
	eval:'feval',
	diff:'fdiff',
	integral:'fintegral',
});
R.mixThisMap(String.prototype, R, {str:'sstr',print:'print'});
R.mixThisMap(Object.prototype, R, {str:'ostr',print:'print'});
R.mixThisMap(Object.prototype, M, {strM:'strM'});
R.mixThisMap(Object.prototype, R.Set, {
	proto:'proto',
	eq:'eq',
	neq:'neq',
	geq:'geq',
	leq:'leq',
	gt:'gt',
	lt:'lt',
});

module.exports = R;
