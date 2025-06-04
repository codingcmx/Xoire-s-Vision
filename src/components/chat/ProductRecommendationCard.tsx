
import type { ProductRecommendationData } from '@/types/chat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, ExternalLink } from 'lucide-react'; // Added ExternalLink for product URL

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
              <div className="flex-1">
                {product.productUrl ? (
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-card-foreground hover:text-primary hover:underline inline-flex items-center group"
                  >
                    {product.name}
                    <ExternalLink className="h-4 w-4 ml-1.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <h4 className="font-semibold text-card-foreground">{product.name}</h4>
                )}
                {product.rationale && <p className="text-xs text-muted-foreground italic mt-1">{product.rationale}</p>}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No specific products recommended from the catalog at this time. Try refining your preferences!</p>
        )}
      </CardContent>
    </Card>
  );
}
