algorithms
==========

Here is a small repository of javascript implementations of useful algorithms. The purpose of the repository is to refresh my memory and practice writing efficient and elegant code during interviews. Since these algorithms can sometimes be discussed using a lot of hand-waving, hopefully seeing the actual code will help someone other than me.

Below is an updated list of algorithms and some minor notes on them.

Edit Distance
-------------
Skiena, SS. 2010. The Algorithm Design Manual, 2nd Ed, p.282-289. Springer-Verlag, London, United Kingdom
(7/22/13)

A simple implementation of edit distance using dynamic programming instead of recursion. To save on space, we keep only the last two rows instead of keeping the entire dynamic programming matrix.

Longest Common Substring
------------------------
Skiena, SS. 2010. The Algorithm Design Manual, 2nd Ed, p.282-289. Springer-Verlag, London, United Kingdom
(7/22/13)

A variation of edit distance used to find the longest common substring between two strings. Here we use hashtables instead of arrays to save more space and only store non-zero values.

As an exercise, I also created a "commonSubstrings" method to keep track of all substrings found between two strings instead of only the longest one.

Quicksort
-------------------------
Skiena, SS. 2010. The Algorithm Design Manual, 2nd Ed, p.124. Springer-Verlag, London, United Kingdom
(7/22/13)

A simple implementation of quicksort using prototypal inheritance. As can be seen by the tests performed in quicksort.html, it's probably best to just use the native javascript sorting algorithms as they outperform this particular implementation.


