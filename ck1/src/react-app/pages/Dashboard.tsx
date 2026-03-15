import { AppLayout } from '@/react-app/components/AppLayout';
import { StatCard } from '@/react-app/components/StatCard';
import { CategoryBreakdown } from '@/react-app/components/CategoryBreakdown';
import { RecentExpenses } from '@/react-app/components/RecentExpenses';
import { 
  stubExpenses, 
  calculateMonthlyExpenses, 
  calculateCategorySummary, 
  getRecentExpenses,
  CATEGORY_COLORS
} from '@/react-app/data/stubData';
import { Wallet, CalendarDays, TrendingUp, PiggyBank } from 'lucide-react';

export default function Dashboard() {
  const monthlyTotal = calculateMonthlyExpenses(stubExpenses);
  const categorySummary = calculateCategorySummary(stubExpenses);
  const recentExpenses = getRecentExpenses(stubExpenses, 5);
  const topCategory = categorySummary[0];
  
  // Calculate today's expenses (using stub data date)
  const todayExpenses = stubExpenses
    .filter(e => e.date === '2025-01-22')
    .reduce((sum, e) => sum + e.amount, 0);
  
  const totalExpenses = stubExpenses.reduce((sum, e) => sum + e.amount, 0);
  const avgDaily = Math.round(totalExpenses / 10); // Assuming 10 days of data
  
  return (
    <AppLayout>
      <div className="px-4 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
            Good morning, chhatresh! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your spending this month
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="This Month"
            value={monthlyTotal}
            subtitle="January 2025"
            icon={<Wallet className="w-5 h-5 text-emerald-600" />}
            accentColor={CATEGORY_COLORS.Food}
          />
          <StatCard
            title="Today's Spending"
            value={todayExpenses}
            subtitle="Jan 22, 2025"
            icon={<CalendarDays className="w-5 h-5 text-amber-600" />}
            accentColor={CATEGORY_COLORS.Travel}
          />
          <StatCard
            title="Top Category"
            value={topCategory?.category || 'None'}
            subtitle={topCategory ? `₹${topCategory.amount} (${topCategory.percentage}%)` : undefined}
            icon={<TrendingUp className="w-5 h-5 text-sky-600" />}
            accentColor={CATEGORY_COLORS.Recharge}
          />
          <StatCard
            title="Daily Average"
            value={avgDaily}
            subtitle="Last 10 days"
            icon={<PiggyBank className="w-5 h-5 text-purple-600" />}
            accentColor={CATEGORY_COLORS.Shopping}
          />
        </div>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryBreakdown categories={categorySummary} />
          <RecentExpenses expenses={recentExpenses} />
        </div>
        
        {/* Quick Add Button - Mobile */}
        <div className="fixed bottom-6 right-6 lg:hidden">
          <button className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow">
            <span className="text-2xl">+</span>
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
