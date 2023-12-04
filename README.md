# advent-of-code

My solutions for advent of code.

## Tests

There are jest tests which can run the solutions on the sample inputs:

`npm test 2022/day1` will run the tests for day 1 part 1 and 2.

_Note: For problems which have different examples for part 1 and 2, the part 1 tests probably fail since I only have one example file per problem, so the example file in the repo contains the part 2 example only, and as of now I am too lazy to fix that._

## Running a solution

`npm run solve [day] [part] [year (2022 by default)]`

Example `npm run solve 1 2` --> solve day 1 part 2 of the 2022 puzzles.

## Scaffolding for solutions

`npm run gen [day] [year (2022 by default)]`

Generates a solution file (`src/2022/day1.ts`), test file (`src/2022/day1.test.ts`) and downloads the input. 
Add a `.env` with the `AOC_SESSION` variable set to your browser's `session` cookie for adventofcode.com to be able to run this command.
