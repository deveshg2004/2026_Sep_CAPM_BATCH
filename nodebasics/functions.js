var x = function(a, b)
{
    return a+b;
}
console.log(x(2, 1))


// function - tax amount - 5% of 50000, net amount - 50,000, disccount = 10% 

// function calc(n,t,d) 
// {
//     let tax=(n*t)/100;
//     let dis=(n*d)/100;
//     let amt=n+tax-dis;
//     console.log("Net:", n);
//     console.log("Tax:", tax);
//     console.log("Discount:", dis);
//     console.log("Amount:", amt);
// }
// calc(50000,5,10);

// answer 47250


function calc(n,t,d) {
    let dis=(n*d) / 100;
    let bal=n-dis;
    let tax=(bal*t)/100;
    let amt=bal+tax;
    console.log("Final Amount:", amt);
}
calc(50000, 5, 10);



// there is one company, sony 2020 - 

// function(2020, 400, 500, 450, growth - 10%)


// this is correct:

function predict(year, r1, r2, r3, growth) {

    for (let i = year + 1; i <= 2026; i++) {
        r1 = r1 + (r1 * growth / 100);
        r2 = r2 + (r2 * growth / 100);
        r3 = r3 + (r3 * growth / 100);
    }

    console.log("Region 1:", r1);
    console.log("Region 2:", r2);
    console.log("Region 3:", r3);
    console.log("Total:", r1 + r2 + r3);
}

predict(2020, 400, 500, 450, 10);

// predict(2020, 400, 500, 450, 10);

// Q.) supplier risk 10 -- 100 (100x10/100), delivery performance 20, quality of the pdt 0.1, spend 0.3, turnover --> inputs

// supplier - 0.1 56; dp- 0.15  65; q - 0.15  72; spend - 0.3  108; turnover - 0.3  114 and divide by 5



function cal(sr,dp,q,s,to)
{
    a = sr*0.10;
    b = dp*0.15;
    c = q*0.15;
    d = s*0.3;
    e = to*0.3;
    let score = a+b+c+d+e;
    final = score/5;
    console.log(final);
}
cal(56,65,72,108,114)


// answer 18.55




var a = [ "ABC", "DEF", "GHI", "JKL"];
var b = [ 123, 456, 789, 012];
newv = []
for (let i=0; i<=a.length;i++)
{
    newv.push(a[i] + b[i]);
}
console.log(newv);



