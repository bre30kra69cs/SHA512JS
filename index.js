"use strict";

var BigNumber = require('bignumber.js');

var _ = require("lodash");

var R = require('ramda'); //For easy way


var print = console.log;

var bn = function bn(x) {
  return new BigNumber(x);
};

var BN1 = bn("0x6a09e667f3bcc908");
var BN2 = bn("0xbb67ae8584caa73b");

var round2print = function round2print(i, v) {
  print(i);
  print(v.a.toString(16), v.b.toString(16), v.c.toString(16), v.d.toString(16));
  print(v.e.toString(16), v.f.toString(16), v.g.toString(16), v.h.toString(16));
};

var result2print = function result2print(v) {
  print(v[0].toString(16), v[1].toString(16), v[2].toString(16), v[3].toString(16));
  print(v[4].toString(16), v[5].toString(16), v[6].toString(16), v[7].toString(16));
}; //Init staff


var mod64 = bn(2).exponentiatedBy(64);
var strk = ['0x428a2f98d728ae22', '0x7137449123ef65cd', '0xb5c0fbcfec4d3b2f', '0xe9b5dba58189dbbc', '0x3956c25bf348b538', '0x59f111f1b605d019', '0x923f82a4af194f9b', '0xab1c5ed5da6d8118', '0xd807aa98a3030242', '0x12835b0145706fbe', '0x243185be4ee4b28c', '0x550c7dc3d5ffb4e2', '0x72be5d74f27b896f', '0x80deb1fe3b1696b1', '0x9bdc06a725c71235', '0xc19bf174cf692694', '0xe49b69c19ef14ad2', '0xefbe4786384f25e3', '0x0fc19dc68b8cd5b5', '0x240ca1cc77ac9c65', '0x2de92c6f592b0275', '0x4a7484aa6ea6e483', '0x5cb0a9dcbd41fbd4', '0x76f988da831153b5', '0x983e5152ee66dfab', '0xa831c66d2db43210', '0xb00327c898fb213f', '0xbf597fc7beef0ee4', '0xc6e00bf33da88fc2', '0xd5a79147930aa725', '0x06ca6351e003826f', '0x142929670a0e6e70', '0x27b70a8546d22ffc', '0x2e1b21385c26c926', '0x4d2c6dfc5ac42aed', '0x53380d139d95b3df', '0x650a73548baf63de', '0x766a0abb3c77b2a8', '0x81c2c92e47edaee6', '0x92722c851482353b', '0xa2bfe8a14cf10364', '0xa81a664bbc423001', '0xc24b8b70d0f89791', '0xc76c51a30654be30', '0xd192e819d6ef5218', '0xd69906245565a910', '0xf40e35855771202a', '0x106aa07032bbd1b8', '0x19a4c116b8d2d0c8', '0x1e376c085141ab53', '0x2748774cdf8eeb99', '0x34b0bcb5e19b48a8', '0x391c0cb3c5c95a63', '0x4ed8aa4ae3418acb', '0x5b9cca4f7763e373', '0x682e6ff3d6b2b8a3', '0x748f82ee5defb2fc', '0x78a5636f43172f60', '0x84c87814a1f0ab72', '0x8cc702081a6439ec', '0x90befffa23631e28', '0xa4506cebde82bde9', '0xbef9a3f7b2c67915', '0xc67178f2e372532b', '0xca273eceea26619c', '0xd186b8c721c0c207', '0xeada7dd6cde0eb1e', '0xf57d4f7fee6ed178', '0x06f067aa72176fba', '0x0a637dc5a2c898a6', '0x113f9804bef90dae', '0x1b710b35131c471b', '0x28db77f523047d84', '0x32caab7b40c72493', '0x3c9ebe0a15c9bebc', '0x431d67c49c100d4c', '0x4cc5d4becb3e42b6', '0x597f299cfc657e2a', '0x5fcb6fab3ad6faec', '0x6c44198c4a475817'];
var bnk = R.map(bn, strk);
var strh = ['0x6a09e667f3bcc908', '0xbb67ae8584caa73b', '0x3c6ef372fe94f82b', '0xa54ff53a5f1d36f1', '0x510e527fade682d1', '0x9b05688c2b3e6c1f', '0x1f83d9abfb41bd6b', '0x5be0cd19137e2179'];
var bnh = R.map(bn, strh); // BASIC OPERATION
//Sum of value 2**64

var sum64 = R.curry(function (v1, v2) {
  return v1.plus(v2).modulo(mod64);
}); //Bit64 to BigNumber

var bit2bn = R.pipe(R.reverse, R.zip(_.range(64)), R.map(function (x) {
  return bn(2).exponentiatedBy(x[0]).multipliedBy(x[1]);
}), R.reduce(function (x1, x2) {
  return x1.plus(x2);
}, bn(0)));
//BigNumber to bit64

var bn2bit = R.pipe(function (x) {
  return x.toString(2);
}, function (x) {
  return R.times(function (y) {
    return "0";
  }, 64 - x.length).join("") + x;
}, R.map(parseInt));
//Bitwise XOR of BigNumbers

var xor = R.curry(function (v1, v2) {
  return R.pipe(bn2bit, R.zip(bn2bit(v2)), R.map(function (x) {
    return x[0] ^ x[1];
  }), bit2bn)(v1);
});
//Bitwise AND of BigNumbers

var and = R.curry(function (v1, v2) {
  return R.pipe(bn2bit, R.zip(bn2bit(v2)), R.map(function (x) {
    return x[0] & x[1];
  }), bit2bn)(v1);
});
//Bitwise OR of BigNumbers

var or = function or(v1, v2) {
  return R.pipe(bn2bit, R.zip(bn2bit(v2)), R.map(function (x) {
    return x[0] | x[1];
  }), bit2bn)(v1);
};
//Bitwise REVERSE of BigNumber


var reverse = R.pipe(bn2bit, R.map(function (x) {
  return x ^ 1;
}), bit2bn);
//Shift of BigNumber

var Rn = function Rn(n, v) {
  return R.pipe(bn2bit, function (x) {
    return R.times(function (y) {
      return 0;
    }, n).concat(x);
  }, R.dropLast(n), bit2bn)(v);
};
//Rotation of BigNumber


var Sn = R.curry(function (n, v) {
  return R.pipe(bn2bit, function (x) {
    return R.takeLast(n % 64, x).concat(x);
  }, R.take(64), bit2bn)(v);
});
// LOGICAL FUNCTION

var K0 = bn("0x428a2f98d728ae22");
var e = bn("0x510e527fade682d1");
var h = bn("0x5be0cd19137e2179");
var f = bn("0x9b05688c2b3e6c1f");
var g = bn("0x1f83d9abfb41bd6b");
var d = bn("0xa54ff53a5f1d36f1");
var W0 = bn("0x6162638000000000");

var Z0 = function Z0(x) {
  return R.pipe(Sn(28), xor(Sn(34, x)), xor(Sn(39, x)))(x);
};

var Z1 = function Z1(x) {
  return R.pipe(Sn(14), xor(Sn(18, x)), xor(Sn(41, x)))(x);
};

var Ch = function Ch(x, y, z) {
  return R.pipe(and(y), xor(and(reverse(x), z)))(x);
};


var Maj = function Maj(x, y, z) {
  return R.pipe(and(y), xor(and(x, z)), xor(and(y, z)))(x);
};

var T1 = function T1(h, e, f, g, Kj, Wj) {
  return R.pipe(sum64(Z1(e)), sum64(Ch(e, f, g)), sum64(Kj), sum64(Wj))(h);
};

var T2 = function T2(a, b, c) {
  return R.pipe(Z0, sum64(Maj(a, b, c)))(a);
};

var q0 = function q0(x) {
  return R.pipe(Sn(1), xor(Sn(8, x)), xor(Rn(7, x)))(x);
};

var q1 = function q1(x) {
  return R.pipe(Sn(19), xor(Sn(61, x)), xor(Rn(6, x)))(x);
};

var Wj = function Wj(w2, w7, w15, w16) {
  return R.pipe(q1, sum64(w7), sum64(q0(w15)), sum64(w16))(w2);
}; // MESSAGES CREATION
//BigNumber in bin128


var bn2bit128 = R.pipe(function (x) {
  return x.toString(2);
}, function (x) {
  return R.repeat("0", 128 - x.length).join("") + x;
}, R.map(parseInt)); //Input convert to complete messages

var input2message = R.pipe(R.map(function (x) {
  return parseInt(x, 16);
}), R.map(function (x) {
  return bn(x);
}), R.map(function (x) {
  return x.toString(2);
}), R.map(R.split("")), R.map(function (x) {
  return R.map(parseInt, x);
}), R.map(function (x) {
  return R.repeat(0, 8 - x.length).concat(x);
}), R.reduce(function (x, y) {
  return x.concat(y);
}, []), function (x) {
  return x.concat([1]).concat(R.repeat(0, 1024 - (x.length + 1 + 128) % 1024)).concat(bn2bit128(bn(x.length)));
}, R.splitEvery(1024), R.map(R.splitEvery(64)), R.map(function (x) {
  return R.map(bit2bn, x);
}));
// MAIN SHA-512 BLOCKS
//Compression function

var compression = R.curry(function (K, W, regs) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = R.range(0, 80)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      var t1 = T1(regs.h, regs.e, regs.f, regs.g, K[i], W[i]);
      var t2 = T2(regs.a, regs.b, regs.c);
      regs.h = regs.g;
      regs.g = regs.f;
      regs.f = regs.e;
      regs.e = sum64(regs.d, t1);
      regs.d = regs.c;
      regs.c = regs.b;
      regs.b = regs.a;
      regs.a = sum64(t1, t2);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return regs;
}); //Create registers from message vector

var message2register = R.pipe(R.zip(["a", "b", "c", "d", "e", "f", "g", "h"]),
R.reduce(function (x, y) {
  x[y[0]] = y[1];
  return x;
}, {})
); //Message schedule

var schedule = function schedule(M) {
  var result = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = R.range(0, 80)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var i = _step2.value;

      if (i <= 15) {
        result.push(M[i]);
      } else {
        result.push(Wj(result[i - 2], result[i - 7], result[i - 15], result[i - 16]));
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return result;
}; //Compute intermediate hash value - message hash


var hash = R.curry(function (H, regs) {
  return R.pipe(Object.values, R.zip(H), R.map(function (x) {
    return sum64(x[0], x[1]);
  }))(regs);
}); //Main block for one message

var block = R.curry(function (K, H, M) {
  return R.pipe(message2register,
  compression(K, schedule(M)), hash(H))(H);
}); //SHA-512 algorithms

var SHA512MAIN = R.curry(function (K, H, input) {
  return R.pipe(input2message,
  R.reduce(block(K), H))(input);
});
// THE MAIN AND RESULTING FUNCTION, JUST WRITE SHA512 AND ALL MUST WORK

var SHA512 = SHA512MAIN(bnk, bnh);

exports.SHA512 = SHA512;
exports.result2print = result2print;
