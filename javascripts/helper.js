//trim
!String.prototype.trim && (function(){
  String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,"");
  }
})();

// helper functions
(function(){
  window.helper = {
    extend: function(name,o){
      if (typeof name !== "string" || name == "" || !o) return;
      this[name] = o;
      return;
    }
  }
})(window);

// get random integer
(function(helper){
  var name = "getRandomInt";
  helper.extend(name,function(min,max){
    if (typeof min !== "number" || typeof max !== "number") return null;
    if (min > max){
      var tmp = max;
      max = min;
      min = tmp;
    }
    return min == max ? min : Math.floor(Math.random() * (max - min + 1)) + min;
  });
})(helper);

//create array of random integers
(function(helper){
  Array.prototype.randomIntArray = function(length){
    if (this.length > 0 || typeof length !== "number") return;
    for (var i=0; i<length; i++){
      this.push(helper.getRandomInt(0,length));
    }
    return this;
  }
})(helper);

// swap elements in array
(function(){
  Array.prototype.swap = function(i,j){
    if (typeof i !== "number" || typeof j !== "number" || i < 0 || j < 0 || i > this.length-1 || j > this.length -1 || i == j) return;
    var tmp = this[i];
    this[i] = this[j];
    this[j] = tmp;
  }
})();

// fix index so it's within range of array
(function(){
  Array.prototype.fixRange = function(i,end){
    if (typeof i !== "number") return end === true ? this.length-1 : 0;
    if (i > this.length-1){
      return this.length-1;
    }else if (i < 0){
      return 0;
    }else{
      return i;
    }
  }
})();

// copy array into new array
(function(){
  Array.prototype.copy = function(){
    var a = new Array();
    for (var i=0; i<this.length; i++){
      a.push(this[i]);
    }
    return a;
  }
})();

//test time
(function(helper){
  helper.testTime = function(func,str,iter){
    var start = new Date().getTime();
    var n = iter || 10000;
    for (var i=0; i<n; i++){
      func.call(window,i,n);
    }
    var end = new Date().getTime();
    var tot = end - start;
    console.log(str,":",tot/n,"ms per iteration on average");
    return {start: start, end: end, time: tot, iterations: n, average: tot/n}
  }
})(helper);
