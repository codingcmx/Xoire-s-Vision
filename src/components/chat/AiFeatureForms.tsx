"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { GenerateProductRecommendationsInput } from "@/ai/flows/generate-product-recommendations";
import type { GenerateStyleSuggestionsInput } from "@/ai/flows/generate-style-suggestions";

// Schema for Product Recommendations
const productRecSchema = z.object({
  userPreferences: z.string().min(10, "Please describe your preferences in more detail."),
  pastBehavior: z.string().min(10, "Please describe your past behavior (purchases, browsing) in more detail."),
});

interface ProductRecFormProps {
  onSubmit: (data: GenerateProductRecommendationsInput) => void;
  isSubmitting: boolean;
}

export function ProductRecForm({ onSubmit, isSubmitting }: ProductRecFormProps) {
  const form = useForm<GenerateProductRecommendationsInput>({
    resolver: zodResolver(productRecSchema),
    defaultValues: {
      userPreferences: "",
      pastBehavior: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="userPreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Style Preferences</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., I like minimalist designs, comfortable fit, neutral colors..." {...field} />
              </FormControl>
              <FormDescription>Describe what you typically look for in clothing and accessories.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pastBehavior"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Past Purchases/Browsing</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., I recently bought a black cotton t-shirt and browsed for denim jackets." {...field} />
              </FormControl>
              <FormDescription>Mention any recent items you've bought, liked, or searched for.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90">
          {isSubmitting ? "Getting Recommendations..." : "Get Product Recommendations"}
        </Button>
      </form>
    </Form>
  );
}

// Schema for Style Suggestions
const styleGuideSchema = z.object({
  skinTone: z.string().min(2, "Please describe your skin tone."),
  preferences: z.string().min(10, "Please describe your style preferences in more detail."),
  currentTrends: z.string().optional(),
});

interface StyleGuideFormProps {
  onSubmit: (data: GenerateStyleSuggestionsInput) => void;
  isSubmitting: boolean;
}

export function StyleGuideForm({ onSubmit, isSubmitting }: StyleGuideFormProps) {
  const form = useForm<GenerateStyleSuggestionsInput>({
    resolver: zodResolver(styleGuideSchema),
    defaultValues: {
      skinTone: "",
      preferences: "",
      currentTrends: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="skinTone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Skin Tone</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Fair, Medium, Olive, Dark" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Style Preferences</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Modern, classic, bohemian, casual, formal..." {...field} />
              </FormControl>
              <FormDescription>What kind of look are you going for?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentTrends"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Trends (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Oversized blazers, vibrant colors" {...field} />
              </FormControl>
              <FormDescription>Any specific trends you're interested in?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90">
          {isSubmitting ? "Getting Suggestions..." : "Get Style Suggestions"}
        </Button>
      </form>
    </Form>
  );
}
