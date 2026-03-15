import { AppLayout } from '@/react-app/components/AppLayout';

export default function Reports() {
  return (
    <AppLayout>
      <div className="px-4 lg:px-8 py-6 lg:py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Reports & Analytics</h1>
        <div className="max-w-lg">
          <p className="text-muted-foreground">
            Detailed reports and charts coming soon...
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
