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

```cpp
class Solution {
public:
    // time/space: O(n)/O(1)
    void moveZeroes(vector<int>& nums) {
        int l = 0;
        for (int r = 0; r < nums.size(); r++) {
            if (nums[r] != 0) nums[l++] = nums[r];
        }
        while (l < nums.size()) nums[l++] = 0;
    }
};
```

```cpp
class Solution {
public:
    // time/space: O(n^2)/O(1)
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int n = nums.size(), closest = nums[0] + nums[1] + nums[2];
        for (int i = 0; i < n; i++) {
            int l = i + 1, r = n - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == target) return sum;
                if (abs(sum - target) < abs(closest - target)) closest = sum;
                if (sum < target) l++;
                else r--;
            }
        }
        return closest;
    }
};
```

* [283. Move Zeroes](https://leetcode.com/problems/move-zeroes/)
* [16. 3Sum Closest](https://leetcode.com/problems/3sum-closest/description/)

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
