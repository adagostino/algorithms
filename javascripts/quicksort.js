(function(){
  // simple quicksort algorithm implemented from:
  // Skiena, SS. 2010. The Algorithm Design Manual, 2nd Ed, p.124. Springer-Verlag, London, United Kingdom
  //
  // Inputs:
  //   compareFunc: supply your own custom compare function
  //                ex: function(a,b){
  //                  // this will sort in descending order
  //                  return b-a;
  //                }
  //                or supply a boolean for the func to indicate if you are sorting by
  //                ascending or descending order (true = asc, false = des)
  //                default: true;
  //  startInd: supply a custom start index (0-based) of the array to sort only that section of the array
  //            default: 0
  //  endInd:   supply a custom end index (0-based) of the array to sort only that section of hte array
  //            default: array.length-1
  Array.prototype.quicksort = function(compareFunc,startInd,endInd){
    // keep track of "this" through closures, initialize the comparitors
    var that = this, ltv = -1, gtv = 1;

    // parse the compare function
    var func = getFunc(compareFunc);

    // parse the start/end indicies
    // note: fixRange is a custom function defined in helper.js
    startInd = this.fixRange(startInd);
    endInd = this.fixRange(endInd,true);
    if (startInd > endInd){
      var tmp = startInd;
      startInd = endInd;
      endInd = tmp;
    }
    // to avoid making comparisons every iteration:
    var callFunc = typeof func === "function";

    if (!callFunc && func == -1){
      gtv = -1;
      ltv = 1;
    }

    // call sort
    sort(startInd,endInd);

    // return this to enable chaining
    return this;

    function sort(low,high){
      if (high - low > 0){
        var p = partition(low,high);
        sort(low,p-1);
        sort(p+1,high);
      }
    }

    function partition(low,high){
      var pivot = high;
      var firstHigh = low;
      for (var i=low; i<high; i++){
        var a = that[i], b= that[pivot];
        var r = callFunc ? func.call(that,a,b) : a < b ? ltv : a==b ? 0 : gtv;
        if (r < 0){
          // note: swap is a custom function defined in helper.js
          that.swap(i,firstHigh);
          firstHigh++;
        }
      }
      that.swap(pivot,firstHigh);
      return firstHigh;
    }

    // parse the comparison function
    function getFunc(cfunc){
      var x = typeof cfunc;
      var r = 1;
      switch(x){
        case "function":
          r = cfunc;
          break;
        case "boolean":
          r = cfunc ? 1 : -1;
          break;
        case "number":
          r = r == 0 ? 1 : Math.round(cfunc/Math.abs(cfunc));
          break;
        default:
          break;
      }
      return r;
    }

  }

})();

// The above function may look complicated, but that's mainly b/c of error checking.
// Quicksort is actually a very simple and efficient "divide-and-conquer" algorithm.
// A simplified function allowing only an ascending sort is below to illustrate this simplicity.

(function(){
  // in-place sorting algorithm
  // ex: var x = [5, 1, 3]; quicksort(x); console.log(x) results in [1, 3, 5];

  function quicksort(x,low,high){
    low = typeof low === "number" ? low : 0;
    high = typeof high === "number" ? high : x.length-1;
    if (high - low > 0){
      var p = partition(low,high,x);
      quicksort(x, low,  p-1);
      quicksort(x, p+1, high);
    }
  }

  function partition(low,high,x){
    var pivot = high;
    var firstHigh = low;
    for (var i=low; i<high; i++){
      var a = x[i], b = x[pivot];
      if (a<b){
        swap(i,firstHigh,x);
        firstHigh++;
      }
    }
    swap(pivot,firstHigh,x);
    return firstHigh;
  }

  function swap(i,j,x){
    var tmp = x[i];
    x[i] = x[j];
    x[j] = tmp;
  }

})();
