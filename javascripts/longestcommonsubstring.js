// Skiena, SS. 2010. The Algorithm Design Manual, 2nd Ed, p.282-289. Springer-Verlag, London, United Kingdom
// returns the longest common substring, its length, and its position in the strings.
(function(){
  String.prototype.lcs = function(str){
    if (typeof str !== "string") return "";
    var str1 = " " + this;
    var str2 = " " + str;
    //initialize rows
    var row1 = {}, row2 = {};
    //initialize counters
    var maxLCS = 0, indI = -1, indJ = -1;
    for (var i=1; i<str1.length; i++){
      // shift the rows
      row1 = row2;
      row2 = {};
      for (var j=1; j<str2.length; j++){
        if (str1[i] === str2[j]){
          // check if the previous character has any matches and build on top of that
          row2[j] = (row1[j-1] || 0) + 1;
          if (row2[j] > maxLCS){
            maxLCS = row2[j];
            indI = i;
            indJ = j;
          }
        }
      }
    }
    var o = {
      offset: [
        {start: indI-maxLCS, end: indI},
        {start: indJ-maxLCS, end: indJ}
      ],
      length: maxLCS,
      sequence: maxLCS > 0 ? str1.substring(1+indI-maxLCS,1+ indI): ""
    }
    return o;
  }
})();

// almost the same as above, but store the matches
(function(){
  String.prototype.commonSubstrings = function(str,minLen){
    if (typeof str !== "string") return "";
    var str1 = " " + this;
    var str2 = " " + str;
    minLen = typeof minLen === "number" ? minLen : 0;
    //initialize rows
    var row1 = {}, row2 = {};
    //initialize counters
    var maxLCS = 0, indI = -1, indJ = -1;
    // init matches structure and longest index
    var longest = -1, matches = new Array();

    for (var i=1; i<str1.length; i++){
      // shift the rows
      row1 = row2;
      row2 = {};
      for (var j=1; j<str2.length; j++){
        if (str1[i] === str2[j]){
          // check if the previous character has any matches and build on top of that
          row2[j] = (row1[j-1] || 0) + 1;
          if (row2[j] > maxLCS){
            maxLCS = row2[j];
            indI = i;
            indJ = j;
          }else{
            if (i > indI + 1){
              // reset and add a match
              addMatch(indI,indJ,maxLCS);
              maxLCS = row2[j];
              indI = i;
              indJ = j;
            }
          }
        }
      }
    }
    // add the last match
    addMatch(indI,indJ,maxLCS);
    // return object with convenience function to retrieve sequences by index
    return {
      strings: [str1.substring(1),str2.substring(1)],
      matches: matches,
      longestIndex: longest,
      getSequence: function(idx){
        if (idx < 0 || idx > this.matches.length-1) return null;
        return this.strings[0].substring(this.matches[idx].offset[0].start, this.matches[idx].offset[0].end);
      },
      getLongestSequence: function(){
        return this.getSequence(this.longestIndex);
      }
    };

    // private function to add a match to the matches array
    function addMatch(i,j,len){
      // first make sure the match passes the min match length requirement
      if (len < minLen) return;
      var newMatch = {
        offset: [{start: i-len, end: i},{start:j-len, end: j}],
        length: len,
        matchIndex: matches.length
      };
      if (longest == -1 || newMatch.length > matches[longest].length) longest = matches.length;
      matches.push(newMatch);
    }
  }
})();
