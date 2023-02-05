# Counting cows code challenge
We have a field of n * n and in some cells there are cows. We want to count cows based on these criteria:

1. Cows in corners
2. Cows with neighbors.

We have an API which provides these values:

1. `getFieldSize`: provides n starting with 1
2. `getNumberOfCows`: number of cows in the field
3. `getXCoordinateForCow`: position x of the given index of cows
4. `getYCoordinateForCow`: position y of the given index of cows