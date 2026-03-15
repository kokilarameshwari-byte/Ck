export interface Expense {
  id: number;
  date: string;
  category: 'Food' | 'Travel' | 'Recharge' | 'Shopping' | 'Other';
  amount: number;
  description: string;
}

export interface CategorySummary {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export const CATEGORIES = ['Food', 'Travel', 'Recharge', 'Shopping', 'Other'] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  Food: 'hsl(162, 72%, 45%)',
  Travel: 'hsl(38, 92%, 55%)',
  Recharge: 'hsl(200, 80%, 50%)',
  Shopping: 'hsl(280, 70%, 55%)',
  Other: 'hsl(340, 75%, 55%)',
};

export const CATEGORY_ICONS: Record<string, string> = {
  Food: '🍕',
  Travel: '🚌',
  Recharge: '📱',
  Shopping: '🛒',
  Other: '📦',
};

// Stub data for development
export const stubExpenses: Expense[] = [
  { id: 1, date: '2025-01-22', category: 'Food', amount: 120, description: 'Lunch at cafeteria' },
  { id: 2, date: '2025-01-22', category: 'Travel', amount: 50, description: 'Bus fare to college' },
  { id: 3, date: '2025-01-21', category: 'Food', amount: 85, description: 'Coffee and snacks' },
  { id: 4, date: '2025-01-21', category: 'Recharge', amount: 199, description: 'Mobile recharge' },
  { id: 5, date: '2025-01-20', category: 'Shopping', amount: 450, description: 'Notebook and pens' },
  { id: 6, date: '2025-01-20', category: 'Food', amount: 150, description: 'Dinner with friends' },
  { id: 7, date: '2025-01-19', category: 'Travel', amount: 100, description: 'Auto to market' },
  { id: 8, date: '2025-01-19', category: 'Other', amount: 75, description: 'Photocopy charges' },
  { id: 9, date: '2025-01-18', category: 'Food', amount: 200, description: 'Weekend brunch' },
  { id: 10, date: '2025-01-17', category: 'Shopping', amount: 800, description: 'New headphones' },
  { id: 11, date: '2025-01-15', category: 'Food', amount: 95, description: 'Breakfast' },
  { id: 12, date: '2025-01-12', category: 'Recharge', amount: 299, description: 'Internet pack' },
];

export function calculateTodayExpenses(expenses: Expense[]): number {
  const today = new Date().toISOString().split('T')[0];
  return expenses
    .filter(e => e.date === today)
    .reduce((sum, e) => sum + e.amount, 0);
}

export function calculateMonthlyExpenses(expenses: Expense[]): number {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return expenses
    .filter(e => {
      const expenseDate = new Date(e.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    })
    .reduce((sum, e) => sum + e.amount, 0);
}

export function calculateCategorySummary(expenses: Expense[]): CategorySummary[] {
  const categoryTotals: Record<string, number> = {};
  
  expenses.forEach(expense => {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
  });
  
  const total = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);
  
  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
      color: CATEGORY_COLORS[category] || CATEGORY_COLORS.Other,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function getRecentExpenses(expenses: Expense[], limit: number = 5): Expense[] {
  return [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
