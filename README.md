# cpp-leetcode-templates

**C++ LeetCode Templates for Data Structures & Algorithms Interview Preparation**

This repository provides a curated collection of C++ code templates tailored for solving LeetCode problems spanning fundamental data structures and algorithms, and facilitating rapid reference during technical interview preparation.

## Table of Contents

* [Stack](#stack)
* [Two Pointers](#two-pointers)
* [Binary Search](#binary-search)
* [Sliding Window](#sliding-window)
* [Linked List](#linked-list)
* [Trees](#trees)
* [Tries](#tries)
* [Heap / Priority Queue](#heap--priority-queue)
* [Intervals](#intervals)
* [Greedy](#greedy)
* [Backtracking](#backtracking)
* [Graphs](#graphs)
* [Dynamic Programming](#dynamic-programming)
* [Bit Manipulation](#bit-manipulation)
* [Math & Geometry](#math--geometry)

## Stack

### Monotonic Stack

```cpp
class Solution {
public:
    // time/space: O(n)/O(n)
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> stk, answer(n, 0);
        for (int i = 0; i < n; i++) {
            while (!stk.empty() && (temperatures[stk.back()] < temperatures[i])) {
                answer[stk.back()] = (i - stk.back());
                stk.pop_back();
            }
            stk.push_back(i);
        }
        return answer;
    }
};
```

* [739. Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

## Two Pointers

## Binary Search

## Sliding Window

## Linked List

## Trees

## Tries

## Heap / Priority Queue

## Intervals

## Greedy

## Backtracking

## Graphs

## Dynamic Programming

## Bit Manipulation

## Math & Geometry
