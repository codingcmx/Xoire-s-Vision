import type { ProductRecommendationData } from '@/types/chat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface ProductRecommendationCardProps {
  data: ProductRecommendationData;
}

export function ProductRecommendationCard({ data }: ProductRecommendationCardProps) {
  return (
    <Card className="w-full max-w-md bg-card shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-primary">Product Recommendations</CardTitle>
        {data.reasoning && <CardDescription className="text-sm text-muted-foreground pt-1">{data.reasoning}</CardDescription>}
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {data.products.length > 0 ? (
          data.products.map((product, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 border rounded-md bg-secondary/50">
              <Image 
                src={`https://placehold.co/60x60.png?text=${encodeURIComponent(product.substring(0,2))}`} 
                alt={product} 
                width={60} 
                height={60} 
                className="rounded"
                data-ai-hint="fashion product"
              />
              <p className="font-medium text-card-foreground">{product}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No specific products recommended at this time.</p>
        )}
      </CardContent>
    </Card>
  );
}
