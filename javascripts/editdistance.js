(function(){
  // simple edit distance algorithm implemented from:
  // Skiena, SS. 2010. The Algorithm Design Manual, 2nd Ed, p.282-289. Springer-Verlag, London, United Kingdom
  // returns the edit distance between 2 strings -- this version does not store the full matrix and instead only
  // stores the last 2 rows.
  String.prototype.editDistance = function(str){
    if (typeof str !== "string") return null;
    var str1 = " " + this;
    var str2 = " " + str;
    var row2 = new Array(), row1 = null;
    // init row
    for (var i=0; i<str2.length; i++){
      row2.push(i);
    }
    for (var i=1; i<str1.length; i++){
        // shift the rows -- row1: i-1, row2: i
        row1 = row2;
        row2 = new Array(row1.length);
        row2[0] = i;
      for (var j=1; j<str2.length; j++){
        // 0: match, 1: insert, 2: delete
        var opt = {
          0: row1[j-1] + match(str1[i],str2[j]),
          1: row2[j-1] + indel(str2[j]),
          2: row1[j]   + indel(str1[i])
        }
        row2[j] = opt[0];
        for (var k=1; k<=2; k++){
          if (opt[k] < row2[j]){
            row2[j] = opt[k];
          }
        }
      }
    }
    return row2[j-1];

    function match(s1,s2){
      return s1 == s2 ? 0 : 1;
    }

    function indel(s){
      return 1;
    }
  }
})();
