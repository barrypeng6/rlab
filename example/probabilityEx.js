var R = require("../rlab");
var dice = R.steps(1,6);
print("samples(1:6, 10)", R.samples(dice, 10));
print("runif(10,1,2)=", R.runif(10, 1, 2).str());
print("dunif(1.6)=%s", R.dunif(1.6, 1, 2));
print("punif(1.6)=%s", R.punif(1.6, 1, 2));
print("qunif(0.6)=%s", R.qunif(0.6, 1, 2));
print("rnorm(10,5,1)=", R.rnorm(10, 5, 1).str());
print("dnorm(5,5,1)=", R.dnorm(5, 5, 1));
print("pnorm(5,5,1)=", R.pnorm(5, 5, 1));
print("qnorm(0.5,5,1)=", R.qnorm(0.5, 5, 1));
print("rexp(10,2)=", R.rexp(10, 2).str());
print("rexp=", R.rexp);
print("rexp1(2)=", R.rexp1(2));
print("dexp(1,2)=", R.dexp(1, 2));
print("pexp(1,2)=", R.pexp(1, 2));
print("qexp(0.5,2)=", R.qexp(0.5, 2));
print("rbinom(10, 5, 0.5)=", R.rbinom(10,5,0.5));
print("dbinom(4, 5, 0.5)=", R.dbinom(4,5,0.5));
print("dbinom(5, 5, 0.5)=", R.dbinom(5,5,0.5));
print("pbinom(4, 5, 0.5)=", R.pbinom(4,5,0.5));
print("qbinom(0.9, 5, 0.5)=", R.qbinom(0.9,5,0.5));
