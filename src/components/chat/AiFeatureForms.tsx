
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { GenerateProductRecommendationsInput } from "@/ai/flows/generate-product-recommendations";
import type { GenerateStyleSuggestionsInput } from "@/ai/flows/generate-style-suggestions";

// Schema for Product Recommendations
const productRecSchema = z.object({
  userPreferences: z.string().min(3, "Please describe your preferences (min 3 characters). e.g., 'bohemian', 'classic', 'comfy streetwear'.").max(500, "Preferences are too long (max 500 characters)."),
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
                <Textarea placeholder="e.g., I like minimalist designs, comfortable fit, neutral colors, or just 'bohemian'..." {...field} />
              </FormControl>
              <FormDescription>Describe what you typically look for in clothing and accessories. Even a single style word helps!</FormDescription>
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
  skinTone: z.string().min(2, "Please describe your skin tone (min 2 characters).").max(50, "Skin tone description is too long (max 50 characters)."),
  preferences: z.string().min(3, "Please describe your style preferences (min 3 characters).").max(500, "Preferences are too long (max 500 characters)."),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: "Please select your gender.",
  }),
  currentTrends: z.string().max(200, "Current trends description is too long (max 200 characters).").optional(),
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
              <FormDescription>What kind of look are you going for? Even a single style word helps!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Female
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Male
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="other" />
                    </FormControl>
                    <FormLabel className="font-normal">Other</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>This helps us tailor style suggestions.</FormDescription>
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
