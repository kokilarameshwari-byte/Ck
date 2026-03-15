import { CategorySummary, CATEGORY_ICONS } from '@/react-app/data/stubData';

interface CategoryBreakdownProps {
  categories: CategorySummary[];
}

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  const maxAmount = Math.max(...categories.map(c => c.amount));
  
  return (
    <div className="rounded-xl bg-card p-5 shadow-sm border border-border/50">
      <h3 className="text-sm font-semibold text-foreground mb-4">Spending by Category</h3>
      
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">{CATEGORY_ICONS[category.category]}</span>
                <span className="text-sm font-medium text-foreground">{category.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">₹{category.amount.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">({category.percentage}%)</span>
              </div>
            </div>
            
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${(category.amount / maxAmount) * 100}%`,
                  backgroundColor: category.color 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
