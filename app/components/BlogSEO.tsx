import Head from 'next/head';

interface BlogSEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  publishedDate: string;
  modifiedDate: string;
  author: string;
  category: string;
  readTime: string;
  featuredImage: string;
  keywords: string[];
  articleBody?: string;
}

export default function BlogSEO({
  title,
  description,
  canonicalUrl,
  publishedDate,
  modifiedDate,
  author,
  category,
  readTime,
  featuredImage,
  keywords,
  articleBody
}: BlogSEOProps) {
  const fullImageUrl = featuredImage.startsWith('http') 
    ? featuredImage 
    : `https://icondumpsters.com${featuredImage}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Icon Dumpsters" />
      <meta property="og:locale" content="en_US" />
      <meta property="article:published_time" content={publishedDate} />
      <meta property="article:modified_time" content={modifiedDate} />
      <meta property="article:author" content={author} />
      <meta property="article:section" content={category} />
      <meta property="article:tag" content={keywords.join(', ')} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@icondumpsters" />
      <meta name="twitter:creator" content="@icondumpsters" />

      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#4e37a8" />
      <meta name="msapplication-TileColor" content="#4e37a8" />
      
      {/* Article-specific meta tags */}
      <meta name="article:published_time" content={publishedDate} />
      <meta name="article:modified_time" content={modifiedDate} />
      <meta name="article:author" content={author} />
      <meta name="article:section" content={category} />
      
      {/* Reading time and word count */}
      <meta name="article:reading_time" content={readTime} />
      {articleBody && (
        <meta name="article:word_count" content={articleBody.split(' ').length.toString()} />
      )}

      {/* Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": fullImageUrl,
            "author": {
              "@type": "Organization",
              "name": author,
              "url": "https://icondumpsters.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Icon Dumpsters",
              "logo": {
                "@type": "ImageObject",
                "url": "https://icondumpsters.com/Icon_Dumpsters_Final.png"
              }
            },
            "datePublished": publishedDate,
            "dateModified": modifiedDate,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            },
            "articleSection": category,
            "keywords": keywords,
            "wordCount": articleBody ? articleBody.split(' ').length : 0,
            "timeRequired": readTime,
            "inLanguage": "en-US",
            "isAccessibleForFree": true
          })
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://icondumpsters.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://icondumpsters.com/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": title,
                "item": canonicalUrl
              }
            ]
          })
        }}
      />
    </Head>
  );
}
