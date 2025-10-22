import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

type CategoryValue = 'all' | 'web-dev' | 'math' | 'gk';
type DifficultyValue = 'all' | 'easy' | 'medium' | 'hard';

type AnswerOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type QuizQuestion = {
  id: string;
  question: string;
  category: Exclude<CategoryValue, 'all'>;
  difficulty: Exclude<DifficultyValue, 'all'>;
  options: AnswerOption[];
};

const categoryOptions: { label: string; value: CategoryValue }[] = [
  { label: 'All Categories', value: 'all' },
  { label: 'Web Development', value: 'web-dev' },
  { label: 'Mathematics', value: 'math' },
  { label: 'General Knowledge', value: 'gk' },
];

const difficultyOptions: { label: string; value: DifficultyValue }[] = [
  { label: 'All Levels', value: 'all' },
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

const categoryLabels: Record<CategoryValue, string> = {
  all: 'All Categories',
  'web-dev': 'Web Development',
  math: 'Math',
  gk: 'General Knowledge',
};

const difficultyLabels: Record<DifficultyValue, string> = {
  all: 'All Levels',
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

const difficultyBadgeColors: Record<Exclude<DifficultyValue, 'all'>, string> = {
  easy: '#34C759',
  medium: '#FF9500',
  hard: '#FF3B30',
};

const QUIZ_BANK: QuizQuestion[] = [
  // Math - Easy
  {
    id: 'math-e-1',
    question: 'What is 5 + 7?',
    category: 'math',
    difficulty: 'easy',
    options: [
      { id: 'math-e-1-a', text: '12', isCorrect: true },
      { id: 'math-e-1-b', text: '11', isCorrect: false },
      { id: 'math-e-1-c', text: '13', isCorrect: false },
      { id: 'math-e-1-d', text: '10', isCorrect: false },
    ],
  },
  {
    id: 'math-e-2',
    question: 'What is the square root of 81?',
    category: 'math',
    difficulty: 'easy',
    options: [
      { id: 'math-e-2-a', text: '9', isCorrect: true },
      { id: 'math-e-2-b', text: '8', isCorrect: false },
      { id: 'math-e-2-c', text: '7', isCorrect: false },
      { id: 'math-e-2-d', text: '6', isCorrect: false },
    ],
  },
  {
    id: 'math-e-3',
    question: 'What is 4 + 9?',
    category: 'math',
    difficulty: 'easy',
    options: [
      { id: 'math-e-3-a', text: '13', isCorrect: true },
      { id: 'math-e-3-b', text: '12', isCorrect: false },
      { id: 'math-e-3-c', text: '11', isCorrect: false },
      { id: 'math-e-3-d', text: '14', isCorrect: false },
    ],
  },
  {
    id: 'math-e-4',
    question: 'What is 20 - 8?',
    category: 'math',
    difficulty: 'easy',
    options: [
      { id: 'math-e-4-a', text: '12', isCorrect: true },
      { id: 'math-e-4-b', text: '10', isCorrect: false },
      { id: 'math-e-4-c', text: '8', isCorrect: false },
      { id: 'math-e-4-d', text: '14', isCorrect: false },
    ],
  },
  {
    id: 'math-e-5',
    question: 'What is 3 × 5?',
    category: 'math',
    difficulty: 'easy',
    options: [
      { id: 'math-e-5-a', text: '15', isCorrect: true },
      { id: 'math-e-5-b', text: '12', isCorrect: false },
      { id: 'math-e-5-c', text: '9', isCorrect: false },
      { id: 'math-e-5-d', text: '18', isCorrect: false },
    ],
  },
  {
    id: 'math-e-6',
    question: 'What is 30 ÷ 5?',
    category: 'math',
    difficulty: 'easy',
    options: [
      { id: 'math-e-6-a', text: '6', isCorrect: true },
      { id: 'math-e-6-b', text: '5', isCorrect: false },
      { id: 'math-e-6-c', text: '7', isCorrect: false },
      { id: 'math-e-6-d', text: '8', isCorrect: false },
    ],
  },
  {
    id: 'math-e-7',
    question: 'What is 12 + 7?',
    category: 'math',
    difficulty: 'easy',
    options: [
      { id: 'math-e-7-a', text: '19', isCorrect: true },
      { id: 'math-e-7-b', text: '18', isCorrect: false },
      { id: 'math-e-7-c', text: '21', isCorrect: false },
      { id: 'math-e-7-d', text: '20', isCorrect: false },
    ],
  },
  {
    id: 'math-e-8',
    question: 'What is 18 - 6?',
    category: 'math',
    difficulty: 'easy',
    options: [
      { id: 'math-e-8-a', text: '12', isCorrect: true },
      { id: 'math-e-8-b', text: '10', isCorrect: false },
      { id: 'math-e-8-c', text: '14', isCorrect: false },
      { id: 'math-e-8-d', text: '16', isCorrect: false },
    ],
  },
  {
    id: 'math-e-9',
    question: 'What is 9 × 2?',
    category: 'math',
    difficulty: 'easy',
    options: [
      { id: 'math-e-9-a', text: '18', isCorrect: true },
      { id: 'math-e-9-b', text: '16', isCorrect: false },
      { id: 'math-e-9-c', text: '20', isCorrect: false },
      { id: 'math-e-9-d', text: '12', isCorrect: false },
    ],
  },
  {
    id: 'math-e-10',
    question: 'What is 45 ÷ 9?',
    category: 'math',
    difficulty: 'easy',
    options: [
      { id: 'math-e-10-a', text: '5', isCorrect: true },
      { id: 'math-e-10-b', text: '6', isCorrect: false },
      { id: 'math-e-10-c', text: '4', isCorrect: false },
      { id: 'math-e-10-d', text: '7', isCorrect: false },
    ],
  },
  // Math - Medium
  {
    id: 'math-m-1',
    question: 'What is the derivative of x²?',
    category: 'math',
    difficulty: 'medium',
    options: [
      { id: 'math-m-1-a', text: '2x', isCorrect: true },
      { id: 'math-m-1-b', text: 'x²', isCorrect: false },
      { id: 'math-m-1-c', text: 'x', isCorrect: false },
      { id: 'math-m-1-d', text: '2', isCorrect: false },
    ],
  },
  {
    id: 'math-m-2',
    question: 'What is 15 × 12?',
    category: 'math',
    difficulty: 'medium',
    options: [
      { id: 'math-m-2-a', text: '180', isCorrect: true },
      { id: 'math-m-2-b', text: '160', isCorrect: false },
      { id: 'math-m-2-c', text: '165', isCorrect: false },
      { id: 'math-m-2-d', text: '175', isCorrect: false },
    ],
  },
  {
    id: 'math-m-3',
    question: 'What is the value of 3⁴?',
    category: 'math',
    difficulty: 'medium',
    options: [
      { id: 'math-m-3-a', text: '81', isCorrect: true },
      { id: 'math-m-3-b', text: '27', isCorrect: false },
      { id: 'math-m-3-c', text: '64', isCorrect: false },
      { id: 'math-m-3-d', text: '72', isCorrect: false },
    ],
  },
  {
    id: 'math-m-4',
    question: 'Solve for x: 2x + 6 = 18',
    category: 'math',
    difficulty: 'medium',
    options: [
      { id: 'math-m-4-a', text: '6', isCorrect: true },
      { id: 'math-m-4-b', text: '5', isCorrect: false },
      { id: 'math-m-4-c', text: '7', isCorrect: false },
      { id: 'math-m-4-d', text: '8', isCorrect: false },
    ],
  },
  {
    id: 'math-m-5',
    question: 'What is the area of a rectangle with length 8 and width 6?',
    category: 'math',
    difficulty: 'medium',
    options: [
      { id: 'math-m-5-a', text: '48', isCorrect: true },
      { id: 'math-m-5-b', text: '36', isCorrect: false },
      { id: 'math-m-5-c', text: '52', isCorrect: false },
      { id: 'math-m-5-d', text: '40', isCorrect: false },
    ],
  },
  {
    id: 'math-m-6',
    question: 'What is the sum of the first five positive integers?',
    category: 'math',
    difficulty: 'medium',
    options: [
      { id: 'math-m-6-a', text: '15', isCorrect: true },
      { id: 'math-m-6-b', text: '10', isCorrect: false },
      { id: 'math-m-6-c', text: '20', isCorrect: false },
      { id: 'math-m-6-d', text: '12', isCorrect: false },
    ],
  },
  {
    id: 'math-m-7',
    question: 'If y = 2x and x = 7, what is y?',
    category: 'math',
    difficulty: 'medium',
    options: [
      { id: 'math-m-7-a', text: '14', isCorrect: true },
      { id: 'math-m-7-b', text: '12', isCorrect: false },
      { id: 'math-m-7-c', text: '9', isCorrect: false },
      { id: 'math-m-7-d', text: '16', isCorrect: false },
    ],
  },
  {
    id: 'math-m-8',
    question: 'What is 60% of 50?',
    category: 'math',
    difficulty: 'medium',
    options: [
      { id: 'math-m-8-a', text: '30', isCorrect: true },
      { id: 'math-m-8-b', text: '25', isCorrect: false },
      { id: 'math-m-8-c', text: '35', isCorrect: false },
      { id: 'math-m-8-d', text: '40', isCorrect: false },
    ],
  },
  {
    id: 'math-m-9',
    question: 'What is the value of √144?',
    category: 'math',
    difficulty: 'medium',
    options: [
      { id: 'math-m-9-a', text: '12', isCorrect: true },
      { id: 'math-m-9-b', text: '14', isCorrect: false },
      { id: 'math-m-9-c', text: '10', isCorrect: false },
      { id: 'math-m-9-d', text: '16', isCorrect: false },
    ],
  },
  {
    id: 'math-m-10',
    question: 'Evaluate 3! + 4!',
    category: 'math',
    difficulty: 'medium',
    options: [
      { id: 'math-m-10-a', text: '30', isCorrect: true },
      { id: 'math-m-10-b', text: '32', isCorrect: false },
      { id: 'math-m-10-c', text: '26', isCorrect: false },
      { id: 'math-m-10-d', text: '28', isCorrect: false },
    ],
  },
  // Math - Hard
  {
    id: 'math-h-1',
    question: 'Solve for x: 3x + 9 = 0',
    category: 'math',
    difficulty: 'hard',
    options: [
      { id: 'math-h-1-a', text: '-3', isCorrect: true },
      { id: 'math-h-1-b', text: '3', isCorrect: false },
      { id: 'math-h-1-c', text: '0', isCorrect: false },
      { id: 'math-h-1-d', text: '9', isCorrect: false },
    ],
  },
  {
    id: 'math-h-2',
    question: 'What positive value of x satisfies 2x² - 8 = 0?',
    category: 'math',
    difficulty: 'hard',
    options: [
      { id: 'math-h-2-a', text: '2', isCorrect: true },
      { id: 'math-h-2-b', text: '4', isCorrect: false },
      { id: 'math-h-2-c', text: '3', isCorrect: false },
      { id: 'math-h-2-d', text: '1', isCorrect: false },
    ],
  },
  {
    id: 'math-h-3',
    question: 'What is the derivative of sin(x)?',
    category: 'math',
    difficulty: 'hard',
    options: [
      { id: 'math-h-3-a', text: 'cos(x)', isCorrect: true },
      { id: 'math-h-3-b', text: '-sin(x)', isCorrect: false },
      { id: 'math-h-3-c', text: 'tan(x)', isCorrect: false },
      { id: 'math-h-3-d', text: '-cos(x)', isCorrect: false },
    ],
  },
  {
    id: 'math-h-4',
    question: 'What is log₂(32)?',
    category: 'math',
    difficulty: 'hard',
    options: [
      { id: 'math-h-4-a', text: '5', isCorrect: true },
      { id: 'math-h-4-b', text: '4', isCorrect: false },
      { id: 'math-h-4-c', text: '6', isCorrect: false },
      { id: 'math-h-4-d', text: '3', isCorrect: false },
    ],
  },
  {
    id: 'math-h-5',
    question: 'Solve for x: 3x + 4 = 2x + 19',
    category: 'math',
    difficulty: 'hard',
    options: [
      { id: 'math-h-5-a', text: '15', isCorrect: true },
      { id: 'math-h-5-b', text: '13', isCorrect: false },
      { id: 'math-h-5-c', text: '11', isCorrect: false },
      { id: 'math-h-5-d', text: '9', isCorrect: false },
    ],
  },
  {
    id: 'math-h-6',
    question: 'What is the sum of the interior angles of a pentagon?',
    category: 'math',
    difficulty: 'hard',
    options: [
      { id: 'math-h-6-a', text: '540°', isCorrect: true },
      { id: 'math-h-6-b', text: '360°', isCorrect: false },
      { id: 'math-h-6-c', text: '450°', isCorrect: false },
      { id: 'math-h-6-d', text: '720°', isCorrect: false },
    ],
  },
  {
    id: 'math-h-7',
    question: 'If f(x) = x² and g(x) = 2x, what is f(g(3))?',
    category: 'math',
    difficulty: 'hard',
    options: [
      { id: 'math-h-7-a', text: '36', isCorrect: true },
      { id: 'math-h-7-b', text: '18', isCorrect: false },
      { id: 'math-h-7-c', text: '9', isCorrect: false },
      { id: 'math-h-7-d', text: '12', isCorrect: false },
    ],
  },
  {
    id: 'math-h-8',
    question: 'What is the value of 7! ?',
    category: 'math',
    difficulty: 'hard',
    options: [
      { id: 'math-h-8-a', text: '5040', isCorrect: true },
      { id: 'math-h-8-b', text: '720', isCorrect: false },
      { id: 'math-h-8-c', text: '4032', isCorrect: false },
      { id: 'math-h-8-d', text: '3620', isCorrect: false },
    ],
  },
  {
    id: 'math-h-9',
    question: 'What is the determinant of the matrix [[1, 2], [3, 4]]?',
    category: 'math',
    difficulty: 'hard',
    options: [
      { id: 'math-h-9-a', text: '-2', isCorrect: true },
      { id: 'math-h-9-b', text: '2', isCorrect: false },
      { id: 'math-h-9-c', text: '1', isCorrect: false },
      { id: 'math-h-9-d', text: '-1', isCorrect: false },
    ],
  },
  {
    id: 'math-h-10',
    question: 'Evaluate 2⁵ × 2³',
    category: 'math',
    difficulty: 'hard',
    options: [
      { id: 'math-h-10-a', text: '256', isCorrect: true },
      { id: 'math-h-10-b', text: '128', isCorrect: false },
      { id: 'math-h-10-c', text: '512', isCorrect: false },
      { id: 'math-h-10-d', text: '64', isCorrect: false },
    ],
  },
  // Web Dev - Easy
  {
    id: 'web-e-1',
    question: 'Which HTML tag renders the largest heading?',
    category: 'web-dev',
    difficulty: 'easy',
    options: [
      { id: 'web-e-1-a', text: '<h1>', isCorrect: true },
      { id: 'web-e-1-b', text: '<h6>', isCorrect: false },
      { id: 'web-e-1-c', text: '<header>', isCorrect: false },
      { id: 'web-e-1-d', text: '<heading>', isCorrect: false },
    ],
  },
  {
    id: 'web-e-2',
    question: 'Which CSS property controls the text size?',
    category: 'web-dev',
    difficulty: 'easy',
    options: [
      { id: 'web-e-2-a', text: 'font-size', isCorrect: true },
      { id: 'web-e-2-b', text: 'text-style', isCorrect: false },
      { id: 'web-e-2-c', text: 'font-weight', isCorrect: false },
      { id: 'web-e-2-d', text: 'text-size', isCorrect: false },
    ],
  },
  {
    id: 'web-e-3',
    question: 'Which HTML attribute provides alternative text for an image?',
    category: 'web-dev',
    difficulty: 'easy',
    options: [
      { id: 'web-e-3-a', text: 'alt', isCorrect: true },
      { id: 'web-e-3-b', text: 'title', isCorrect: false },
      { id: 'web-e-3-c', text: 'src', isCorrect: false },
      { id: 'web-e-3-d', text: 'href', isCorrect: false },
    ],
  },
  {
    id: 'web-e-4',
    question: 'Which HTML tag creates a hyperlink?',
    category: 'web-dev',
    difficulty: 'easy',
    options: [
      { id: 'web-e-4-a', text: '<a>', isCorrect: true },
      { id: 'web-e-4-b', text: '<link>', isCorrect: false },
      { id: 'web-e-4-c', text: '<p>', isCorrect: false },
      { id: 'web-e-4-d', text: '<span>', isCorrect: false },
    ],
  },
  {
    id: 'web-e-5',
    question: 'Which CSS property sets the background color of an element?',
    category: 'web-dev',
    difficulty: 'easy',
    options: [
      { id: 'web-e-5-a', text: 'background-color', isCorrect: true },
      { id: 'web-e-5-b', text: 'color', isCorrect: false },
      { id: 'web-e-5-c', text: 'background-image', isCorrect: false },
      { id: 'web-e-5-d', text: 'border-color', isCorrect: false },
    ],
  },
  {
    id: 'web-e-6',
    question: 'Which HTML element defines an unordered list?',
    category: 'web-dev',
    difficulty: 'easy',
    options: [
      { id: 'web-e-6-a', text: '<ul>', isCorrect: true },
      { id: 'web-e-6-b', text: '<ol>', isCorrect: false },
      { id: 'web-e-6-c', text: '<li>', isCorrect: false },
      { id: 'web-e-6-d', text: '<dl>', isCorrect: false },
    ],
  },
  {
    id: 'web-e-7',
    question: 'Which attribute is used to define inline styles in HTML?',
    category: 'web-dev',
    difficulty: 'easy',
    options: [
      { id: 'web-e-7-a', text: 'style', isCorrect: true },
      { id: 'web-e-7-b', text: 'class', isCorrect: false },
      { id: 'web-e-7-c', text: 'id', isCorrect: false },
      { id: 'web-e-7-d', text: 'data', isCorrect: false },
    ],
  },
  {
    id: 'web-e-8',
    question: 'Which CSS property centers text horizontally?',
    category: 'web-dev',
    difficulty: 'easy',
    options: [
      { id: 'web-e-8-a', text: 'text-align', isCorrect: true },
      { id: 'web-e-8-b', text: 'align-items', isCorrect: false },
      { id: 'web-e-8-c', text: 'justify-content', isCorrect: false },
      { id: 'web-e-8-d', text: 'text-justify', isCorrect: false },
    ],
  },
  {
    id: 'web-e-9',
    question: 'Which HTML tag inserts a line break?',
    category: 'web-dev',
    difficulty: 'easy',
    options: [
      { id: 'web-e-9-a', text: '<br>', isCorrect: true },
      { id: 'web-e-9-b', text: '<hr>', isCorrect: false },
      { id: 'web-e-9-c', text: '<break>', isCorrect: false },
      { id: 'web-e-9-d', text: '<line>', isCorrect: false },
    ],
  },
  {
    id: 'web-e-10',
    question: 'Which HTTP method is typically used to request data from a server?',
    category: 'web-dev',
    difficulty: 'easy',
    options: [
      { id: 'web-e-10-a', text: 'GET', isCorrect: true },
      { id: 'web-e-10-b', text: 'POST', isCorrect: false },
      { id: 'web-e-10-c', text: 'PUT', isCorrect: false },
      { id: 'web-e-10-d', text: 'DELETE', isCorrect: false },
    ],
  },
  // Web Dev - Medium
  {
    id: 'web-m-1',
    question: 'What does CSS stand for?',
    category: 'web-dev',
    difficulty: 'medium',
    options: [
      { id: 'web-m-1-a', text: 'Cascading Style Sheets', isCorrect: true },
      { id: 'web-m-1-b', text: 'Creative Style System', isCorrect: false },
      { id: 'web-m-1-c', text: 'Computer Styling Sheets', isCorrect: false },
      { id: 'web-m-1-d', text: 'Central Style Sheets', isCorrect: false },
    ],
  },
  {
    id: 'web-m-2',
    question: 'Which HTTP status code means “Not Found”?',
    category: 'web-dev',
    difficulty: 'medium',
    options: [
      { id: 'web-m-2-a', text: '404', isCorrect: true },
      { id: 'web-m-2-b', text: '200', isCorrect: false },
      { id: 'web-m-2-c', text: '500', isCorrect: false },
      { id: 'web-m-2-d', text: '301', isCorrect: false },
    ],
  },
  {
    id: 'web-m-3',
    question: 'Which CSS property turns an element into a flex container?',
    category: 'web-dev',
    difficulty: 'medium',
    options: [
      { id: 'web-m-3-a', text: 'display: flex', isCorrect: true },
      { id: 'web-m-3-b', text: 'position: flex', isCorrect: false },
      { id: 'web-m-3-c', text: 'flex: container', isCorrect: false },
      { id: 'web-m-3-d', text: 'justify-content: flex', isCorrect: false },
    ],
  },
  {
    id: 'web-m-4',
    question: 'What does DOM stand for?',
    category: 'web-dev',
    difficulty: 'medium',
    options: [
      { id: 'web-m-4-a', text: 'Document Object Model', isCorrect: true },
      { id: 'web-m-4-b', text: 'Data Object Manager', isCorrect: false },
      { id: 'web-m-4-c', text: 'Dynamic Object Map', isCorrect: false },
      { id: 'web-m-4-d', text: 'Document Output Module', isCorrect: false },
    ],
  },
  {
    id: 'web-m-5',
    question: 'Which HTML5 element is used for navigation links?',
    category: 'web-dev',
    difficulty: 'medium',
    options: [
      { id: 'web-m-5-a', text: '<nav>', isCorrect: true },
      { id: 'web-m-5-b', text: '<aside>', isCorrect: false },
      { id: 'web-m-5-c', text: '<header>', isCorrect: false },
      { id: 'web-m-5-d', text: '<section>', isCorrect: false },
    ],
  },
  {
    id: 'web-m-6',
    question: 'Which CSS selector targets the element with id “hero”?',
    category: 'web-dev',
    difficulty: 'medium',
    options: [
      { id: 'web-m-6-a', text: '#hero', isCorrect: true },
      { id: 'web-m-6-b', text: '.hero', isCorrect: false },
      { id: 'web-m-6-c', text: 'hero', isCorrect: false },
      { id: 'web-m-6-d', text: '*hero', isCorrect: false },
    ],
  },
  {
    id: 'web-m-7',
    question: 'Which CSS property controls the spacing between lines of text?',
    category: 'web-dev',
    difficulty: 'medium',
    options: [
      { id: 'web-m-7-a', text: 'line-height', isCorrect: true },
      { id: 'web-m-7-b', text: 'letter-spacing', isCorrect: false },
      { id: 'web-m-7-c', text: 'word-spacing', isCorrect: false },
      { id: 'web-m-7-d', text: 'margin', isCorrect: false },
    ],
  },
  {
    id: 'web-m-8',
    question: 'Which HTML element is best for self-contained article content?',
    category: 'web-dev',
    difficulty: 'medium',
    options: [
      { id: 'web-m-8-a', text: '<article>', isCorrect: true },
      { id: 'web-m-8-b', text: '<div>', isCorrect: false },
      { id: 'web-m-8-c', text: '<span>', isCorrect: false },
      { id: 'web-m-8-d', text: '<main>', isCorrect: false },
    ],
  },
  {
    id: 'web-m-9',
    question: 'Which JavaScript array method adds an item to the end of an array?',
    category: 'web-dev',
    difficulty: 'medium',
    options: [
      { id: 'web-m-9-a', text: 'push', isCorrect: true },
      { id: 'web-m-9-b', text: 'pop', isCorrect: false },
      { id: 'web-m-9-c', text: 'shift', isCorrect: false },
      { id: 'web-m-9-d', text: 'unshift', isCorrect: false },
    ],
  },
  {
    id: 'web-m-10',
    question: 'Which CSS feature allows styles to adapt to screen size?',
    category: 'web-dev',
    difficulty: 'medium',
    options: [
      { id: 'web-m-10-a', text: 'media queries', isCorrect: true },
      { id: 'web-m-10-b', text: 'grid-template', isCorrect: false },
      { id: 'web-m-10-c', text: 'pseudo-classes', isCorrect: false },
      { id: 'web-m-10-d', text: 'CSS variables', isCorrect: false },
    ],
  },
  // Web Dev - Hard
  {
    id: 'web-h-1',
    question: 'Which JavaScript method converts JSON text into an object?',
    category: 'web-dev',
    difficulty: 'hard',
    options: [
      { id: 'web-h-1-a', text: 'JSON.parse()', isCorrect: true },
      { id: 'web-h-1-b', text: 'JSON.stringify()', isCorrect: false },
      { id: 'web-h-1-c', text: 'JSON.object()', isCorrect: false },
      { id: 'web-h-1-d', text: 'JSON.toObject()', isCorrect: false },
    ],
  },
  {
    id: 'web-h-2',
    question: 'Which HTTP response status indicates too many requests from a client?',
    category: 'web-dev',
    difficulty: 'hard',
    options: [
      { id: 'web-h-2-a', text: '429', isCorrect: true },
      { id: 'web-h-2-b', text: '503', isCorrect: false },
      { id: 'web-h-2-c', text: '408', isCorrect: false },
      { id: 'web-h-2-d', text: '304', isCorrect: false },
    ],
  },
  {
    id: 'web-h-3',
    question: 'Which response header allows cross-origin resource sharing?',
    category: 'web-dev',
    difficulty: 'hard',
    options: [
      { id: 'web-h-3-a', text: 'Access-Control-Allow-Origin', isCorrect: true },
      { id: 'web-h-3-b', text: 'Content-Type', isCorrect: false },
      { id: 'web-h-3-c', text: 'ETag', isCorrect: false },
      { id: 'web-h-3-d', text: 'Accept-Encoding', isCorrect: false },
    ],
  },
  {
    id: 'web-h-4',
    question: 'In CSS Grid, which property defines the column structure?',
    category: 'web-dev',
    difficulty: 'hard',
    options: [
      { id: 'web-h-4-a', text: 'grid-template-columns', isCorrect: true },
      { id: 'web-h-4-b', text: 'grid-auto-columns', isCorrect: false },
      { id: 'web-h-4-c', text: 'grid-column-gap', isCorrect: false },
      { id: 'web-h-4-d', text: 'grid-template-rows', isCorrect: false },
    ],
  },
  {
    id: 'web-h-5',
    question: 'Which API lets web apps run background sync and push notifications?',
    category: 'web-dev',
    difficulty: 'hard',
    options: [
      { id: 'web-h-5-a', text: 'Service Worker API', isCorrect: true },
      { id: 'web-h-5-b', text: 'Fetch API', isCorrect: false },
      { id: 'web-h-5-c', text: 'WebSocket API', isCorrect: false },
      { id: 'web-h-5-d', text: 'Notification API', isCorrect: false },
    ],
  },
  {
    id: 'web-h-6',
    question: 'Which CSS syntax references a custom property named --brand-color?',
    category: 'web-dev',
    difficulty: 'hard',
    options: [
      { id: 'web-h-6-a', text: 'var(--brand-color)', isCorrect: true },
      { id: 'web-h-6-b', text: '$brand-color', isCorrect: false },
      { id: 'web-h-6-c', text: '@brand-color', isCorrect: false },
      { id: 'web-h-6-d', text: 'css(--brand-color)', isCorrect: false },
    ],
  },
  {
    id: 'web-h-7',
    question: 'Which HTTP header controls caching behavior?',
    category: 'web-dev',
    difficulty: 'hard',
    options: [
      { id: 'web-h-7-a', text: 'Cache-Control', isCorrect: true },
      { id: 'web-h-7-b', text: 'Authorization', isCorrect: false },
      { id: 'web-h-7-c', text: 'Referer', isCorrect: false },
      { id: 'web-h-7-d', text: 'Cookie', isCorrect: false },
    ],
  },
  {
    id: 'web-h-8',
    question: 'Which CSS at-rule is used to define keyframe animations?',
    category: 'web-dev',
    difficulty: 'hard',
    options: [
      { id: 'web-h-8-a', text: '@keyframes', isCorrect: true },
      { id: 'web-h-8-b', text: '@animation', isCorrect: false },
      { id: 'web-h-8-c', text: '@frames', isCorrect: false },
      { id: 'web-h-8-d', text: '@steps', isCorrect: false },
    ],
  },
  {
    id: 'web-h-9',
    question: 'Which HTTP method is idempotent and replaces a resource entirely?',
    category: 'web-dev',
    difficulty: 'hard',
    options: [
      { id: 'web-h-9-a', text: 'PUT', isCorrect: true },
      { id: 'web-h-9-b', text: 'POST', isCorrect: false },
      { id: 'web-h-9-c', text: 'PATCH', isCorrect: false },
      { id: 'web-h-9-d', text: 'DELETE', isCorrect: false },
    ],
  },
  {
    id: 'web-h-10',
    question: 'Which HTML meta tag is essential for responsive web design on mobile devices?',
    category: 'web-dev',
    difficulty: 'hard',
    options: [
      { id: 'web-h-10-a', text: '<meta name="viewport" content="width=device-width, initial-scale=1.0">', isCorrect: true },
      { id: 'web-h-10-b', text: '<meta charset="UTF-8">', isCorrect: false },
      { id: 'web-h-10-c', text: '<meta name="description" content="...">', isCorrect: false },
      { id: 'web-h-10-d', text: '<meta http-equiv="refresh" content="5">', isCorrect: false },
    ],
  },
  // General Knowledge - Easy
  {
    id: 'gk-e-1',
    question: 'What is the capital city of France?',
    category: 'gk',
    difficulty: 'easy',
    options: [
      { id: 'gk-e-1-a', text: 'Paris', isCorrect: true },
      { id: 'gk-e-1-b', text: 'Madrid', isCorrect: false },
      { id: 'gk-e-1-c', text: 'Rome', isCorrect: false },
      { id: 'gk-e-1-d', text: 'Berlin', isCorrect: false },
    ],
  },
  {
    id: 'gk-e-2',
    question: 'Which planet is known as the “Red Planet”?',
    category: 'gk',
    difficulty: 'easy',
    options: [
      { id: 'gk-e-2-a', text: 'Mars', isCorrect: true },
      { id: 'gk-e-2-b', text: 'Venus', isCorrect: false },
      { id: 'gk-e-2-c', text: 'Jupiter', isCorrect: false },
      { id: 'gk-e-2-d', text: 'Mercury', isCorrect: false },
    ],
  },
  {
    id: 'gk-e-3',
    question: 'Which animal is known as the King of the Jungle?',
    category: 'gk',
    difficulty: 'easy',
    options: [
      { id: 'gk-e-3-a', text: 'Lion', isCorrect: true },
      { id: 'gk-e-3-b', text: 'Tiger', isCorrect: false },
      { id: 'gk-e-3-c', text: 'Elephant', isCorrect: false },
      { id: 'gk-e-3-d', text: 'Giraffe', isCorrect: false },
    ],
  },
  {
    id: 'gk-e-4',
    question: 'Which ocean is the largest on Earth?',
    category: 'gk',
    difficulty: 'easy',
    options: [
      { id: 'gk-e-4-a', text: 'Pacific Ocean', isCorrect: true },
      { id: 'gk-e-4-b', text: 'Atlantic Ocean', isCorrect: false },
      { id: 'gk-e-4-c', text: 'Indian Ocean', isCorrect: false },
      { id: 'gk-e-4-d', text: 'Arctic Ocean', isCorrect: false },
    ],
  },
  {
    id: 'gk-e-5',
    question: 'What gas do humans need to breathe to survive?',
    category: 'gk',
    difficulty: 'easy',
    options: [
      { id: 'gk-e-5-a', text: 'Oxygen', isCorrect: true },
      { id: 'gk-e-5-b', text: 'Carbon Dioxide', isCorrect: false },
      { id: 'gk-e-5-c', text: 'Nitrogen', isCorrect: false },
      { id: 'gk-e-5-d', text: 'Helium', isCorrect: false },
    ],
  },
  {
    id: 'gk-e-6',
    question: 'How many continents are there on Earth?',
    category: 'gk',
    difficulty: 'easy',
    options: [
      { id: 'gk-e-6-a', text: '7', isCorrect: true },
      { id: 'gk-e-6-b', text: '6', isCorrect: false },
      { id: 'gk-e-6-c', text: '8', isCorrect: false },
      { id: 'gk-e-6-d', text: '5', isCorrect: false },
    ],
  },
  {
    id: 'gk-e-7',
    question: 'Which instrument is used to look at stars and planets?',
    category: 'gk',
    difficulty: 'easy',
    options: [
      { id: 'gk-e-7-a', text: 'Telescope', isCorrect: true },
      { id: 'gk-e-7-b', text: 'Microscope', isCorrect: false },
      { id: 'gk-e-7-c', text: 'Periscope', isCorrect: false },
      { id: 'gk-e-7-d', text: 'Binoculars', isCorrect: false },
    ],
  },
  {
    id: 'gk-e-8',
    question: 'What color do you get when you mix red and blue?',
    category: 'gk',
    difficulty: 'easy',
    options: [
      { id: 'gk-e-8-a', text: 'Purple', isCorrect: true },
      { id: 'gk-e-8-b', text: 'Green', isCorrect: false },
      { id: 'gk-e-8-c', text: 'Orange', isCorrect: false },
      { id: 'gk-e-8-d', text: 'Yellow', isCorrect: false },
    ],
  },
  {
    id: 'gk-e-9',
    question: 'How many sides does a triangle have?',
    category: 'gk',
    difficulty: 'easy',
    options: [
      { id: 'gk-e-9-a', text: '3', isCorrect: true },
      { id: 'gk-e-9-b', text: '4', isCorrect: false },
      { id: 'gk-e-9-c', text: '5', isCorrect: false },
      { id: 'gk-e-9-d', text: '2', isCorrect: false },
    ],
  },
  {
    id: 'gk-e-10',
    question: 'Which animal is the largest mammal on Earth?',
    category: 'gk',
    difficulty: 'easy',
    options: [
      { id: 'gk-e-10-a', text: 'Blue Whale', isCorrect: true },
      { id: 'gk-e-10-b', text: 'Elephant', isCorrect: false },
      { id: 'gk-e-10-c', text: 'Giraffe', isCorrect: false },
      { id: 'gk-e-10-d', text: 'Hippopotamus', isCorrect: false },
    ],
  },
  // General Knowledge - Medium
  {
    id: 'gk-m-1',
    question: 'Who wrote “Romeo and Juliet”?',
    category: 'gk',
    difficulty: 'medium',
    options: [
      { id: 'gk-m-1-a', text: 'William Shakespeare', isCorrect: true },
      { id: 'gk-m-1-b', text: 'Charles Dickens', isCorrect: false },
      { id: 'gk-m-1-c', text: 'Jane Austen', isCorrect: false },
      { id: 'gk-m-1-d', text: 'Mark Twain', isCorrect: false },
    ],
  },
  {
    id: 'gk-m-2',
    question: 'What gas do plants absorb during photosynthesis?',
    category: 'gk',
    difficulty: 'medium',
    options: [
      { id: 'gk-m-2-a', text: 'Carbon Dioxide', isCorrect: true },
      { id: 'gk-m-2-b', text: 'Oxygen', isCorrect: false },
      { id: 'gk-m-2-c', text: 'Nitrogen', isCorrect: false },
      { id: 'gk-m-2-d', text: 'Hydrogen', isCorrect: false },
    ],
  },
  {
    id: 'gk-m-3',
    question: 'Which scientist proposed the theory of general relativity?',
    category: 'gk',
    difficulty: 'medium',
    options: [
      { id: 'gk-m-3-a', text: 'Albert Einstein', isCorrect: true },
      { id: 'gk-m-3-b', text: 'Isaac Newton', isCorrect: false },
      { id: 'gk-m-3-c', text: 'Galileo Galilei', isCorrect: false },
      { id: 'gk-m-3-d', text: 'Nikola Tesla', isCorrect: false },
    ],
  },
  {
    id: 'gk-m-4',
    question: 'Which country is known as the Land of the Rising Sun?',
    category: 'gk',
    difficulty: 'medium',
    options: [
      { id: 'gk-m-4-a', text: 'Japan', isCorrect: true },
      { id: 'gk-m-4-b', text: 'China', isCorrect: false },
      { id: 'gk-m-4-c', text: 'South Korea', isCorrect: false },
      { id: 'gk-m-4-d', text: 'Thailand', isCorrect: false },
    ],
  },
  {
    id: 'gk-m-5',
    question: 'Who painted the Mona Lisa?',
    category: 'gk',
    difficulty: 'medium',
    options: [
      { id: 'gk-m-5-a', text: 'Leonardo da Vinci', isCorrect: true },
      { id: 'gk-m-5-b', text: 'Vincent van Gogh', isCorrect: false },
      { id: 'gk-m-5-c', text: 'Pablo Picasso', isCorrect: false },
      { id: 'gk-m-5-d', text: 'Claude Monet', isCorrect: false },
    ],
  },
  {
    id: 'gk-m-6',
    question: 'Which metal has the chemical symbol Fe?',
    category: 'gk',
    difficulty: 'medium',
    options: [
      { id: 'gk-m-6-a', text: 'Iron', isCorrect: true },
      { id: 'gk-m-6-b', text: 'Gold', isCorrect: false },
      { id: 'gk-m-6-c', text: 'Silver', isCorrect: false },
      { id: 'gk-m-6-d', text: 'Copper', isCorrect: false },
    ],
  },
  {
    id: 'gk-m-7',
    question: 'Which planet has the most moons?',
    category: 'gk',
    difficulty: 'medium',
    options: [
      { id: 'gk-m-7-a', text: 'Saturn', isCorrect: true },
      { id: 'gk-m-7-b', text: 'Jupiter', isCorrect: false },
      { id: 'gk-m-7-c', text: 'Uranus', isCorrect: false },
      { id: 'gk-m-7-d', text: 'Neptune', isCorrect: false },
    ],
  },
  {
    id: 'gk-m-8',
    question: 'Which desert is the largest hot desert in the world?',
    category: 'gk',
    difficulty: 'medium',
    options: [
      { id: 'gk-m-8-a', text: 'Sahara Desert', isCorrect: true },
      { id: 'gk-m-8-b', text: 'Gobi Desert', isCorrect: false },
      { id: 'gk-m-8-c', text: 'Atacama Desert', isCorrect: false },
      { id: 'gk-m-8-d', text: 'Kalahari Desert', isCorrect: false },
    ],
  },
  {
    id: 'gk-m-9',
    question: 'Which organ in the human body produces insulin?',
    category: 'gk',
    difficulty: 'medium',
    options: [
      { id: 'gk-m-9-a', text: 'Pancreas', isCorrect: true },
      { id: 'gk-m-9-b', text: 'Liver', isCorrect: false },
      { id: 'gk-m-9-c', text: 'Kidney', isCorrect: false },
      { id: 'gk-m-9-d', text: 'Spleen', isCorrect: false },
    ],
  },
  {
    id: 'gk-m-10',
    question: 'Which scientist discovered penicillin?',
    category: 'gk',
    difficulty: 'medium',
    options: [
      { id: 'gk-m-10-a', text: 'Alexander Fleming', isCorrect: true },
      { id: 'gk-m-10-b', text: 'Marie Curie', isCorrect: false },
      { id: 'gk-m-10-c', text: 'Louis Pasteur', isCorrect: false },
      { id: 'gk-m-10-d', text: 'Gregor Mendel', isCorrect: false },
    ],
  },
  // General Knowledge - Hard
  {
    id: 'gk-h-1',
    question: 'What is the smallest prime number greater than 100?',
    category: 'gk',
    difficulty: 'hard',
    options: [
      { id: 'gk-h-1-a', text: '101', isCorrect: true },
      { id: 'gk-h-1-b', text: '103', isCorrect: false },
      { id: 'gk-h-1-c', text: '107', isCorrect: false },
      { id: 'gk-h-1-d', text: '109', isCorrect: false },
    ],
  },
  {
    id: 'gk-h-2',
    question: 'Which scientist first proposed the heliocentric model of the solar system?',
    category: 'gk',
    difficulty: 'hard',
    options: [
      { id: 'gk-h-2-a', text: 'Nicolaus Copernicus', isCorrect: true },
      { id: 'gk-h-2-b', text: 'Johannes Kepler', isCorrect: false },
      { id: 'gk-h-2-c', text: 'Galileo Galilei', isCorrect: false },
      { id: 'gk-h-2-d', text: 'Tycho Brahe', isCorrect: false },
    ],
  },
  {
    id: 'gk-h-3',
    question: 'Which treaty ended World War I?',
    category: 'gk',
    difficulty: 'hard',
    options: [
      { id: 'gk-h-3-a', text: 'Treaty of Versailles', isCorrect: true },
      { id: 'gk-h-3-b', text: 'Treaty of Paris', isCorrect: false },
      { id: 'gk-h-3-c', text: 'Treaty of Utrecht', isCorrect: false },
      { id: 'gk-h-3-d', text: 'Treaty of Vienna', isCorrect: false },
    ],
  },
  {
    id: 'gk-h-4',
    question: 'Which element has the highest melting point?',
    category: 'gk',
    difficulty: 'hard',
    options: [
      { id: 'gk-h-4-a', text: 'Tungsten', isCorrect: true },
      { id: 'gk-h-4-b', text: 'Carbon', isCorrect: false },
      { id: 'gk-h-4-c', text: 'Platinum', isCorrect: false },
      { id: 'gk-h-4-d', text: 'Iron', isCorrect: false },
    ],
  },
  {
    id: 'gk-h-5',
    question: 'What is the capital city of New Zealand?',
    category: 'gk',
    difficulty: 'hard',
    options: [
      { id: 'gk-h-5-a', text: 'Wellington', isCorrect: true },
      { id: 'gk-h-5-b', text: 'Auckland', isCorrect: false },
      { id: 'gk-h-5-c', text: 'Christchurch', isCorrect: false },
      { id: 'gk-h-5-d', text: 'Queenstown', isCorrect: false },
    ],
  },
  {
    id: 'gk-h-6',
    question: 'Which mathematician is known as the “Father of Geometry”?',
    category: 'gk',
    difficulty: 'hard',
    options: [
      { id: 'gk-h-6-a', text: 'Euclid', isCorrect: true },
      { id: 'gk-h-6-b', text: 'Pythagoras', isCorrect: false },
      { id: 'gk-h-6-c', text: 'Archimedes', isCorrect: false },
      { id: 'gk-h-6-d', text: 'Descartes', isCorrect: false },
    ],
  },
  {
    id: 'gk-h-7',
    question: 'Which river is the longest in South America?',
    category: 'gk',
    difficulty: 'hard',
    options: [
      { id: 'gk-h-7-a', text: 'Amazon River', isCorrect: true },
      { id: 'gk-h-7-b', text: 'Paraná River', isCorrect: false },
      { id: 'gk-h-7-c', text: 'Orinoco River', isCorrect: false },
      { id: 'gk-h-7-d', text: 'Magdalena River', isCorrect: false },
    ],
  },
  {
    id: 'gk-h-8',
    question: 'Which philosopher wrote “The Republic”?',
    category: 'gk',
    difficulty: 'hard',
    options: [
      { id: 'gk-h-8-a', text: 'Plato', isCorrect: true },
      { id: 'gk-h-8-b', text: 'Aristotle', isCorrect: false },
      { id: 'gk-h-8-c', text: 'Socrates', isCorrect: false },
      { id: 'gk-h-8-d', text: 'Epicurus', isCorrect: false },
    ],
  },
  {
    id: 'gk-h-9',
    question: 'Which scientist is credited with discovering radioactivity?',
    category: 'gk',
    difficulty: 'hard',
    options: [
      { id: 'gk-h-9-a', text: 'Henri Becquerel', isCorrect: true },
      { id: 'gk-h-9-b', text: 'Niels Bohr', isCorrect: false },
      { id: 'gk-h-9-c', text: 'Enrico Fermi', isCorrect: false },
      { id: 'gk-h-9-d', text: 'Werner Heisenberg', isCorrect: false },
    ],
  },
  {
    id: 'gk-h-10',
    question: 'Which city hosted the first modern Olympic Games in 1896?',
    category: 'gk',
    difficulty: 'hard',
    options: [
      { id: 'gk-h-10-a', text: 'Athens', isCorrect: true },
      { id: 'gk-h-10-b', text: 'Paris', isCorrect: false },
      { id: 'gk-h-10-c', text: 'London', isCorrect: false },
      { id: 'gk-h-10-d', text: 'Berlin', isCorrect: false },
    ],
  },
];

const shuffleArray = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const TOTAL_QUESTIONS = 10;

export default function QuizScreen() {
  const [stage, setStage] = useState<'start' | 'quiz' | 'results'>('start');
  const [category, setCategory] = useState<CategoryValue>('all');
  const [difficulty, setDifficulty] = useState<DifficultyValue>('all');
  const [lastFilters, setLastFilters] = useState<{ category: CategoryValue; difficulty: DifficultyValue }>({
    category: 'all',
    difficulty: 'all',
  });

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);

  const currentQuestion = quizQuestions[currentIndex];
  const totalQuestions = quizQuestions.length;
  const completedCount = hasAnswered ? currentIndex + 1 : currentIndex;
  const progress = totalQuestions ? Math.min(1, completedCount / totalQuestions) : 0;

  const handleStartQuiz = () => {
    const filtered = QUIZ_BANK.filter(
      (item) =>
        (category === 'all' || item.category === category) &&
        (difficulty === 'all' || item.difficulty === difficulty),
    );

    if (filtered.length === 0) {
      setQuizQuestions([]);
      setStage('quiz');
      return;
    }

    const selectedQuestions = shuffleArray(filtered)
      .slice(0, TOTAL_QUESTIONS)
      .map((question) => ({
      ...question,
      options: shuffleArray(question.options.map((option) => ({ ...option }))),
    }));

    setQuizQuestions(selectedQuestions);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setHasAnswered(false);
    setFeedbackType(null);
    setScore(0);
    setLastFilters({ category, difficulty });
    setStage('quiz');
  };

  const handleSelectOption = (option: AnswerOption) => {
    if (hasAnswered) return;
    setSelectedOptionId(option.id);
    const isCorrect = option.isCorrect;
    setHasAnswered(true);
    setFeedbackType(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!hasAnswered) return;

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
      setFeedbackType(null);
    } else {
      setStage('results');
    }
  };

  const handleRestart = () => {
    setStage('start');
    setSelectedOptionId(null);
    setHasAnswered(false);
    setFeedbackType(null);
    setScore(0);
  };

  const renderStartScreen = () => (
    <LinearGradient colors={['#351F8C', '#8E1F87']} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <LinearGradient
            colors={['rgba(80, 141, 255, 0.38)', 'rgba(142, 65, 255, 0.0)']}
            start={{ x: 0.5, y: 0.2 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.iconGlow}
          />
          <LinearGradient
            colors={['#5A8BFF', '#8A4DFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconGradient}
          >
            <Ionicons name="rocket-outline" size={42} color="#ffffff" />
          </LinearGradient>
        </View>

        <Text style={styles.heading}>Dynamix Quiz Master</Text>
        <Text style={styles.subheading}>Test your knowledge and challenge yourself!</Text>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Select Category</Text>
          <View style={styles.pickerBorder}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={setCategory}
                dropdownIconColor="#6650F6"
                style={styles.picker}
              >
                {categoryOptions.map((option) => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Select Difficulty</Text>
          <View style={styles.pickerBorder}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={difficulty}
                onValueChange={setDifficulty}
                dropdownIconColor="#6650F6"
                style={styles.picker}
              >
                {difficultyOptions.map((option) => (
                  <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.85} onPress={handleStartQuiz} style={styles.ctaWrapper}>
          <LinearGradient
            colors={['#00D4FF', '#6C00FF']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.ctaButton}
          >
            <Ionicons name="flash-outline" size={20} color="#ffffff" />
            <Text style={styles.ctaText}>Start Quiz</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.infoPill}>
          <Text style={styles.infoText}>
            You&apos;ll answer 10 questions from your selected category and difficulty
          </Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderQuizScreen = () => {
    if (!currentQuestion) {
      return (
        <LinearGradient colors={['#F3F4FF', '#FFFFFF']} style={styles.container}>
          <View style={styles.quizCard}>
            <Text style={styles.heading}>No questions found</Text>
            <Text style={styles.subheading}>Try different filters to start a new quiz.</Text>
            <TouchableOpacity activeOpacity={0.85} onPress={handleRestart} style={styles.ctaWrapper}>
              <LinearGradient
                colors={['#00D4FF', '#6C00FF']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.ctaButton}
              >
                <Text style={styles.ctaText}>Back to Start</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      );
    }

    const currentDifficultyColor = difficultyBadgeColors[currentQuestion.difficulty];
    const questionNumber = currentIndex + 1;

    return (
      <LinearGradient colors={['#F3F4FF', '#FFFFFF']} style={styles.container}>
        <View style={styles.quizWrapper}>
          <View style={styles.topRow}>
            <Text style={styles.progressLabel}>
              Question {questionNumber} of {totalQuestions}
            </Text>
            <View style={[styles.difficultyBadge, { backgroundColor: currentDifficultyColor }]}>
              <Text style={styles.difficultyText}>{difficultyLabels[currentQuestion.difficulty]}</Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>

          <View style={styles.quizCard}>
            <View style={styles.questionMeta}>
              <View style={styles.metaBadge}>
                <Ionicons name="time-outline" size={18} color="#6A6F87" />
                <Text style={styles.metaText}>{categoryLabels[currentQuestion.category]}</Text>
              </View>
            </View>

            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            <View style={styles.optionsBlock}>
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOptionId === option.id;
                const isCorrect = option.isCorrect;
                const showAsCorrect = hasAnswered && isCorrect;
                const showAsIncorrect = hasAnswered && isSelected && !isCorrect;
                const showAsSelected = !hasAnswered && isSelected;
                const letter = String.fromCharCode(65 + index);

                return (
                  <TouchableOpacity
                    key={option.id}
                    activeOpacity={0.8}
                    onPress={() => handleSelectOption(option)}
                    disabled={hasAnswered}
                    style={[
                      styles.optionButton,
                      showAsSelected && styles.optionActive,
                      showAsCorrect && styles.optionCorrect,
                      showAsIncorrect && styles.optionIncorrect,
                    ]}
                  >
                    <View
                      style={[
                        styles.optionLetter,
                        showAsCorrect && styles.optionLetterCorrect,
                        showAsIncorrect && styles.optionLetterIncorrect,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionLetterText,
                          (showAsCorrect || showAsIncorrect || showAsSelected) && styles.optionLetterTextActive,
                        ]}
                      >
                        {letter}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        (showAsCorrect || showAsIncorrect) && styles.optionTextAnswered,
                      ]}
                    >
                      {option.text}
                    </Text>

                    {showAsCorrect && (
                      <Ionicons name="checkmark-circle" size={22} color="#1BAC4B" style={styles.optionStateIcon} />
                    )}
                    {showAsIncorrect && (
                      <Ionicons name="close-circle" size={22} color="#FF4D4F" style={styles.optionStateIcon} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {hasAnswered && (
              <View
                style={[
                  styles.feedbackBox,
                  feedbackType === 'correct' ? styles.feedbackCorrect : styles.feedbackIncorrect,
                ]}
              >
                <Ionicons
                  name={feedbackType === 'correct' ? 'checkmark-circle' : 'alert-circle'}
                  size={20}
                  color={feedbackType === 'correct' ? '#1BAC4B' : '#FF4D4F'}
                />
                <Text
                  style={[
                    styles.feedbackText,
                    feedbackType === 'correct' ? styles.feedbackTextCorrect : styles.feedbackTextIncorrect,
                  ]}
                >
                  {feedbackType === 'correct'
                    ? 'Correct! Well done!'
                    : 'Incorrect. The correct answer is highlighted.'}
                </Text>
              </View>
            )}

            <TouchableOpacity
              activeOpacity={hasAnswered ? 0.85 : 1}
              onPress={handleNext}
              disabled={!hasAnswered}
              style={styles.nextButtonWrapper}
            >
              <LinearGradient
                colors={['#8E2DE2', '#4A00E0']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[styles.nextButton, !hasAnswered && styles.nextButtonDisabled]}
              >
                <Text style={styles.nextButtonText}>
                  {currentIndex === totalQuestions - 1 ? 'See Results' : 'Next Question'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  };

  const renderResultsScreen = () => {
    const correctCount = score;
    const incorrectCount = totalQuestions - score;
    const accuracy = Math.round((correctCount / totalQuestions) * 100);

    const feedback = (() => {
      if (accuracy >= 90) {
        return {
          title: 'Outstanding!',
          subtitle: 'You nailed it. Keep up the amazing work!',
          icon: 'trophy-outline' as const,
        };
      }
      if (accuracy >= 70) {
        return {
          title: 'Good Effort!',
          subtitle: 'Nice work! Keep practicing to improve even more.',
          icon: 'trending-up-outline' as const,
        };
      }
      if (accuracy >= 50) {
        return {
          title: 'Keep Going!',
          subtitle: 'Solid attempt. A little more practice will do wonders.',
          icon: 'flag-outline' as const,
        };
      }
      return {
        title: 'Don’t Give Up!',
        subtitle: 'Every attempt is progress. Try again and you will improve.',
        icon: 'rocket-outline' as const,
      };
    })();

    return (
      <LinearGradient colors={['#F3F5FF', '#FFFFFF']} style={styles.container}>
        <View style={styles.resultsWrapper}>
          <View style={styles.resultsIconBadge}>
            <LinearGradient
              colors={['#8E2DE2', '#4A00E0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.resultsIconInner}
            >
              <Ionicons name={feedback.icon} size={38} color="#ffffff" />
            </LinearGradient>
          </View>

          <Text style={styles.resultsHeading}>{feedback.title}</Text>
          <Text style={styles.resultsSubtitle}>{feedback.subtitle}</Text>

          <LinearGradient colors={['#A855F7', '#4F46E5']} style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Your Score</Text>
            <Text style={styles.scoreValue}>
              {correctCount}/{totalQuestions}
            </Text>
            <Text style={styles.scoreSubtext}>{accuracy}% Correct</Text>
          </LinearGradient>

          <View style={styles.resultsProgressTrack}>
            <View style={[styles.resultsProgressFill, { width: `${accuracy}%` }]} />
          </View>
          <View style={styles.resultsProgressScale}>
            <Text style={styles.progressScaleText}>0%</Text>
            <Text style={styles.progressScaleText}>50%</Text>
            <Text style={styles.progressScaleText}>100%</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, styles.statValueCorrect]}>{correctCount}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, styles.statValueIncorrect]}>{incorrectCount}</Text>
              <Text style={styles.statLabel}>Incorrect</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, styles.statValueTotal]}>{totalQuestions}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.85} onPress={handleRestart} style={styles.resultsButtonWrapper}>
            <LinearGradient
              colors={['#9D50FF', '#4E92FF']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.resultsButton}
            >
              <Ionicons name="refresh" size={18} color="#ffffff" />
              <Text style={styles.resultsButtonText}>Try Again</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.resultsFooter}>
            Category • {categoryLabels[lastFilters.category]} · Difficulty • {difficultyLabels[lastFilters.difficulty]}
          </Text>
        </View>
      </LinearGradient>
    );
  };

  if (stage === 'start') {
    return renderStartScreen();
  }

  if (stage === 'quiz') {
    return renderQuizScreen();
  }

  return renderResultsScreen();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    width: '90%',
    maxWidth: 480,
    paddingVertical: 40,
    paddingHorizontal: 32,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.96)',
    shadowColor: '#1B0C3D',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 48,
    elevation: 24,
    alignItems: 'center',
    gap: 20,
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(62, 117, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    position: 'relative',
    overflow: 'visible',
    shadowColor: '#5C8CFF',
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 18 },
    shadowRadius: 32,
    elevation: 18,
  },
  iconGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    bottom: -50,
    opacity: 0.8,
    zIndex: -1,
    transform: [{ scaleX: 1.3 }],
  },
  iconGradient: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: '#5146D0',
  },
  subheading: {
    fontSize: 16,
    color: '#5A5A72',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  fieldBlock: {
    width: '100%',
    gap: 8,
  },
  label: {
    fontSize: 15,
    color: '#4C4C66',
  },
  pickerBorder: {
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(104, 92, 255, 0.38)',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    padding: 2,
    shadowColor: '#7456FF',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 10,
  },
  pickerContainer: {
    borderRadius: 16,
    backgroundColor: '#FBFAFF',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    color: '#2E2779',
    height: Platform.OS === 'web' ? 48 : undefined,
    backgroundColor: 'transparent',
    borderWidth: 0,
    ...(Platform.OS === 'web'
      ? ({
          outlineStyle: 'none',
          paddingHorizontal: 12,
          appearance: 'none',
        } as const)
      : {}),
  },
  ctaWrapper: {
    width: '100%',
    marginTop: 8,
  },
  ctaButton: {
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#3C6FFF',
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 14 },
    shadowRadius: 30,
    elevation: 12,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  infoPill: {
    marginTop: 8,
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: 'rgba(102, 80, 246, 0.08)',
  },
  infoText: {
    fontSize: 14,
    color: '#5B4DB2',
    textAlign: 'center',
    lineHeight: 20,
  },
  quizWrapper: {
    width: '100%',
    maxWidth: 720,
    gap: 18,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343B63',
  },
  difficultyBadge: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  progressTrack: {
    width: '100%',
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(99, 110, 255, 0.18)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#3F51FF',
  },
  quizCard: {
    width: '100%',
    borderRadius: 32,
    paddingVertical: 32,
    paddingHorizontal: 32,
    backgroundColor: '#ffffff',
    shadowColor: '#9FA4FF',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 30,
    elevation: 20,
    gap: 24,
  },
  questionMeta: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(127, 140, 255, 0.1)',
  },
  metaText: {
    fontSize: 14,
    color: '#5A628A',
    fontWeight: '500',
  },
  questionText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222752',
    lineHeight: 34,
  },
  optionsBlock: {
    gap: 14,
  },
  optionButton: {
    minHeight: 60,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(119, 127, 180, 0.22)',
    backgroundColor: '#F9F9FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 14,
  },
  optionActive: {
    borderColor: 'rgba(101, 87, 255, 0.7)',
    backgroundColor: 'rgba(111, 99, 255, 0.08)',
  },
  optionCorrect: {
    borderColor: '#4CD964',
    backgroundColor: 'rgba(76, 217, 100, 0.12)',
  },
  optionIncorrect: {
    borderColor: '#FF4D4F',
    backgroundColor: 'rgba(255, 77, 79, 0.12)',
  },
  optionLetter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(103, 114, 229, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterCorrect: {
    backgroundColor: '#4CD964',
  },
  optionLetterIncorrect: {
    backgroundColor: '#FF4D4F',
  },
  optionLetterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4D59A1',
  },
  optionLetterTextActive: {
    color: '#ffffff',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#303354',
  },
  optionTextAnswered: {
    color: '#283240',
  },
  optionStateIcon: {
    marginLeft: 8,
  },
  feedbackBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  feedbackCorrect: {
    backgroundColor: 'rgba(76, 217, 100, 0.18)',
  },
  feedbackIncorrect: {
    backgroundColor: 'rgba(255, 77, 79, 0.18)',
  },
  feedbackText: {
    fontSize: 15,
    fontWeight: '600',
  },
  feedbackTextCorrect: {
    color: '#128943',
  },
  feedbackTextIncorrect: {
    color: '#C22C32',
  },
  nextButtonWrapper: {
    width: '100%',
  },
  nextButton: {
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonDisabled: {
    opacity: 0.45,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  resultsWrapper: {
    width: '95%',
    maxWidth: 560,
    paddingVertical: 48,
    paddingHorizontal: 40,
    borderRadius: 36,
    backgroundColor: '#ffffff',
    shadowColor: '#9FA4FF',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 18 },
    shadowRadius: 40,
    elevation: 26,
    alignItems: 'center',
    gap: 24,
  },
  resultsIconBadge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(158, 141, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsIconInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsHeading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2F2F5B',
    textAlign: 'center',
  },
  resultsSubtitle: {
    fontSize: 16,
    color: '#5A5A7F',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  scoreCard: {
    width: '100%',
    borderRadius: 24,
    paddingVertical: 28,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#8C55F7',
    shadowOpacity: 0.24,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 36,
    elevation: 24,
  },
  scoreLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  scoreValue: {
    fontSize: 42,
    fontWeight: '700',
    color: '#ffffff',
  },
  scoreSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  resultsProgressTrack: {
    width: '100%',
    height: 12,
    borderRadius: 12,
    backgroundColor: '#E5E7FF',
    overflow: 'hidden',
  },
  resultsProgressFill: {
    height: '100%',
    borderRadius: 12,
    backgroundColor: '#312E81',
  },
  resultsProgressScale: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressScaleText: {
    fontSize: 12,
    color: '#4A4E7A',
    fontWeight: '500',
  },
  statsRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 18,
    backgroundColor: '#F8F7FF',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#CDD2FF',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 14,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statValueCorrect: {
    color: '#22C55E',
  },
  statValueIncorrect: {
    color: '#F43F5E',
  },
  statValueTotal: {
    color: '#7C3AED',
  },
  statLabel: {
    fontSize: 14,
    color: '#4A4E7A',
    fontWeight: '500',
  },
  resultsButtonWrapper: {
    width: '100%',
    marginTop: 8,
  },
  resultsButton: {
    height: 54,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  resultsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  resultsFooter: {
    fontSize: 14,
    color: '#5C5F87',
    textAlign: 'center',
  },
});
