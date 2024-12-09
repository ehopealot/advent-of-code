import { loadPuzzleInput } from "../lib/load_file";

// Updated types to include concatenation operator
type Operator = '+' | '*' | '||';
type Equation = {
    testValue: number;
    numbers: number[];
};

function parseInput(input: string): Equation[] {
    return input.trim().split('\n').map(line => {
        const [testValueStr, numbersStr] = line.split(': ');
        return {
            testValue: parseInt(testValueStr),
            numbers: numbersStr.split(' ').map(n => parseInt(n))
        };
    });
}

function evaluateExpression(numbers: number[], operators: Operator[]): number {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const nextNumber = numbers[i + 1];
        
        switch (operator) {
            case '+':
                result += nextNumber;
                break;
            case '*':
                result *= nextNumber;
                break;
            case '||':
                // Convert both numbers to strings, concatenate, then convert back to number
                result = parseInt(`${result}${nextNumber}`);
                break;
        }
    }
    return result;
}

function generateAllOperatorCombinations(length: number): Operator[][] {
    const operators: Operator[] = ['+', '*', '||'];
    const results: Operator[][] = [];
    
    function generate(current: Operator[]): void {
        if (current.length === length) {
            results.push([...current]);
            return;
        }
        
        for (const op of operators) {
            current.push(op);
            generate(current);
            current.pop();
        }
    }
    
    generate([]);
    return results;
}

function canEquationBeTrue(equation: Equation): boolean {
    const operatorsNeeded = equation.numbers.length - 1;
    const allPossibleOperators = generateAllOperatorCombinations(operatorsNeeded);
    
    return allPossibleOperators.some(operators => 
        evaluateExpression(equation.numbers, operators) === equation.testValue
    );
}

function solvePuzzle(input: string): number {
    const equations = parseInput(input);
    return equations
        .filter(canEquationBeTrue)
        .reduce((sum, eq) => sum + eq.testValue, 0);
}

// Helper function to format an expression as a string
function formatExpression(numbers: number[], operators: Operator[]): string {
    let result = numbers[0].toString();
    for (let i = 0; i < operators.length; i++) {
        result += ` ${operators[i]} ${numbers[i + 1]}`;
    }
    return result;
}

// Enhanced testing function that shows all valid solutions
function testEquation(equation: Equation): void {
    const operatorsNeeded = equation.numbers.length - 1;
    const allPossibleOperators = generateAllOperatorCombinations(operatorsNeeded);
    let solutionsFound = 0;
    
    console.log(`\nTesting equation ${equation.testValue}: ${equation.numbers.join(' ')}`);
    allPossibleOperators.forEach(operators => {
        const result = evaluateExpression(equation.numbers, operators);
        if (result === equation.testValue) {
            solutionsFound++;
            console.log(`Solution ${solutionsFound}: ${formatExpression(equation.numbers, operators)} = ${result}`);
        }
    });
    
    if (solutionsFound === 0) {
        console.log('No solutions found');
    }
}

// Example usage:
const exampleInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

console.log(solvePuzzle(loadPuzzleInput("7", false, "2024").join('\n'))); // Should output 3749


// Test specific cases to verify concatenation
const testCases: Equation[] = [
    { testValue: 156, numbers: [15, 6] },           // Should find 15 || 6 = 156
    { testValue: 7290, numbers: [6, 8, 6, 15] },    // Should find 6 * 8 || 6 * 15 = 7290
    { testValue: 192, numbers: [17, 8, 14] }        // Should find 17 || 8 + 14 = 192
];

testCases.forEach(testEquation);
