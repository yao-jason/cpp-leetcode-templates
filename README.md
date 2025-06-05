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
* [16. 3Sum Closest](https://leetcode.com/problems/3sum-closest/)

## Binary Search

```cpp
class Solution {
public:
    // time/space: O(nlogK)/O(1)
    int minEatingSpeed(vector<int>& piles, int h) {
        int l = 1, r = *max_element(piles.begin(), piles.end());
        while (l < r) {
            int k = l + (r - l) / 2;
            if (getHour(piles, k) <= h) r = k;
            else l = k + 1;
        }
        return l;
    }
private:
    int getHour(vector<int>& piles, int k) {
        int hour = 0;
        for (auto& p : piles) hour += ((p + k - 1) / k);
        return hour;
    }
};
```

```cpp
class Solution {
public:
    // time/space: O(log(m + n))/O(log(m + n))
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int k1 = (nums1.size() + nums2.size() + 1) / 2;
        int k2 = (nums1.size() + nums2.size() + 2) / 2;
        return (double)(getKth(nums1, 0, nums2, 0, k1) + getKth(nums1, 0, nums2, 0, k2)) / 2.0;
    }
private:
    int getKth(vector<int>& nums1, int l1, vector<int>& nums2, int l2, int k) {
        // terminate
        if (l1 >= nums1.size()) return nums2[l2 + k - 1];
        if (l2 >= nums2.size()) return nums1[l1 + k - 1];
        if (k == 1) return min(nums1[l1], nums2[l2]);

        // enumerate
        int m1 = l1 + (k / 2) - 1, m2 = l2 + (k / 2) - 1;
        int median1 = (m1 < nums1.size()) ? nums1[m1] : INT_MAX;
        int median2 = (m2 < nums2.size()) ? nums2[m2] : INT_MAX;
        if (median1 <= median2) return getKth(nums1, m1 + 1, nums2, l2, k - (k / 2));
        return getKth(nums1, l1, nums2, m2 + 1, k - (k / 2));
    }
};
```

* [875. Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)
* [4. Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)

## Sliding Window

```cpp
class Solution {
public:
    // time/space: O(m + n)/O(1)
    string minWindow(string s, string t) {
        vector<int> count(128, 0);
        for (auto& c : t) count[c]++;
        int bestIndex = 0, bestLength = INT_MAX;
        for (int l = 0, r = 0; r < s.size(); r++) {
            count[s[r]]--;
            while (all_of(count.begin(), count.end(), [](int x){return (x <= 0);})) {
                if ((r - l + 1) < bestLength) bestIndex = l, bestLength = r - l + 1;
                count[s[l++]]++;
            }
        }
        if (bestLength == INT_MAX) return "";
        return s.substr(bestIndex, bestLength);
    }
};
```

```cpp
class Solution {
public:
    // time/space: O(n)/O(k)
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        int n = nums.size();
        deque<int> dq;
        vector<int> result;
        for (int i = 0; i < n; i++) {
            while (!dq.empty() && (dq.front() <= (i - k))) dq.pop_front();
            while (!dq.empty() && (nums[dq.back()] <= nums[i])) dq.pop_back();
            dq.push_back(i);
            if (i >= (k - 1)) result.push_back(nums[dq.front()]);
        }
        return result;
    }
};
```

```cpp
class Solution {
public:
    // time/space: O(n)/O(1)
    int numSubarrayBoundedMax(vector<int>& nums, int left, int right) {
        return helper(nums, right) - helper(nums, left - 1);
    }
private:
    int helper(vector<int>& nums, int bound) {
        int count = 0;
        for (int l = 0, r = 0; r < nums.size(); r++) {
            if (nums[r] <= bound) count += (r - l + 1);
            else l = r + 1;
        }
        return count;
    }
};
```

* [76. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)
* [239. Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/)
* [795. Number of Subarrays with Bounded Maximum](https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum/)

## Linked List

## Trees

## Tries

## Heap / Priority Queue

## Intervals

## Greedy

## Backtracking

## Graphs

### Union Find

```cpp
class Solution {
public:
    // time/space: O(nk)/O(k)
    string smallestEquivalentString(string s1, string s2, string baseStr) {
        int n = s1.size(), k = 128;
        vector<int> root(k);
        for (int c = 0; c < k; c++) root[c] = c;
        for (int i = 0; i < n; i++) connect(root, s1[i], s2[i]);
        string result;
        for (auto& c : baseStr) result.push_back(find(root, c));
        return result;
    }
private:
    int find(vector<int>& root, int x) {
        if (root[x] == x) return x;
        return root[x] = find(root, root[x]);
    }
    void connect(vector<int>& root, int x, int y) {
        int rootX = find(root, x);
        int rootY = find(root, y);
        if (rootX != rootY) root[max(rootX, rootY)] = min(rootX, rootY);
    }
};
```

* [1061. Lexicographically Smallest Equivalent String](https://leetcode.com/problems/lexicographically-smallest-equivalent-string)

## Dynamic Programming

## Bit Manipulation

## Math & Geometry
