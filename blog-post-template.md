# 📝 Blog Post Template

Copy this template and paste it into the `blogPosts` array in `BlogClient.tsx`:

```javascript
{
  id: "your-post-url-slug",
  title: "Your SEO-Optimized Title Here (50-60 characters)",
  excerpt: "Compelling description with primary keyword naturally integrated. Should be 150-160 characters and include your main keyword.",
  category: "CATEGORY_NAME",
  readTime: "X min read",
  image: "/images/your-image.jpg",
  fallbackImage: "/images/your-image.webp",
  featured: false
}
```

## 🎯 Available Categories:
- `DEMOLITION` - Demolition-related content
- `CONCRETE` - Concrete disposal and calculations
- `ROOFING` - Roofing waste and materials
- `CALCULATOR` - Calculator tools and guides
- `DUMPSTER SPECS` - Dumpster specifications and details
- `DUMPSTER RENTAL` - General rental information
- `RENOVATION` - Home renovation content
- `COMMERCIAL` - Commercial and business solutions
- `GUIDES` - How-to guides and tutorials

## 📋 Quick Add Steps:
1. Copy the template above
2. Replace all placeholder text with your content
3. Add to the `blogPosts` array in `BlogClient.tsx`
4. Keep featured posts at the top of the array
5. Save and test

## 🖼️ Image Requirements:
- Main image: `/images/your-image.jpg`
- Fallback image: `/images/your-image.webp`
- Recommended size: 500x500px or larger
- Place images in the `/public/images/` directory

## ✨ SEO Best Practices:
- Title: 50-60 characters, include primary keyword
- Excerpt: 150-160 characters, compelling and keyword-rich
- Use existing categories for consistency
- Only set `featured: true` for high-value posts
