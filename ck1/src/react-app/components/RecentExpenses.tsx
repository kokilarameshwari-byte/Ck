import { Expense, CATEGORY_COLORS, CATEGORY_ICONS } from '@/react-app/data/stubData';

interface RecentExpensesProps {
  expenses: Expense[];
}

export function RecentExpenses({ expenses }: RecentExpensesProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateStr === today.toISOString().split('T')[0]) return 'Today';
    if (dateStr === yesterday.toISOString().split('T')[0]) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="rounded-xl bg-card p-5 shadow-sm border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Recent Expenses</h3>
        <button className="text-xs font-medium text-primary hover:underline">View All</button>
      </div>
      
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div 
            key={expense.id} 
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div 
              className="flex items-center justify-center w-10 h-10 rounded-lg text-lg"
              style={{ backgroundColor: `${CATEGORY_COLORS[expense.category]}20` }}
            >
              {CATEGORY_ICONS[expense.category]}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{expense.description}</p>
              <p className="text-xs text-muted-foreground">{expense.category} • {formatDate(expense.date)}</p>
            </div>
            
            <p className="text-sm font-semibold text-foreground">-₹{expense.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
