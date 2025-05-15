
import type { ProductRecommendationData } from '@/types/chat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';

interface ProductRecommendationCardProps {
  data: ProductRecommendationData;
}

export function ProductRecommendationCard({ data }: ProductRecommendationCardProps) {
  return (
    <Card className="w-full max-w-md bg-card shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <CardTitle className="text-lg font-semibold text-primary">Product Recommendations</CardTitle>
        </div>
        {data.overallReasoning && <CardDescription className="text-sm text-muted-foreground pt-2">{data.overallReasoning}</CardDescription>}
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {data.products && data.products.length > 0 ? (
          data.products.map((product, index) => (
            <div key={index} className="p-3 border rounded-md bg-secondary/30 shadow-sm">
              <div className="flex items-center space-x-3 mb-2">
                <Image 
                  src={`https://placehold.co/80x80.png?text=${encodeURIComponent(product.name.substring(0,3))}`} 
                  alt={product.name} 
                  width={60} 
                  height={60} 
                  className="rounded-md border"
                  data-ai-hint="fashion clothing" // Generic hint, can be improved if product category is available
                />
                <h4 className="font-semibold text-card-foreground">{product.name}</h4>
              </div>
              <p className="text-xs text-muted-foreground italic">{product.rationale}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No specific products recommended from the catalog at this time. Try refining your preferences!</p>
        )}
      </CardContent>
    </Card>
  );
}
