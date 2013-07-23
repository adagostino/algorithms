//Skiena, SS. 2010. The Algorithm Design Manual, 2nd Ed, p.132-133. Springer-Verlag, London, United Kingdom
// var a = ["this","is","the","search"]; var ind = bindarySearch(a,"the") returns 2;
(function(){
  function binarySearch(a,key,low,high){
    low = low || 0;
    high = high || a.length-1;
    if (low > high) return -1;
    var middle = Math.floor((low + high)/2);
    return a[middle] == key ? middle :
           a[middle]  > key ? binarySearch(a,key,low,middle) //note: since it's floored, we use middle not middle-1
                            : binarySearch(a,key,middle+1,high);
  }
  window.binarySearch = binarySearch;
})();
