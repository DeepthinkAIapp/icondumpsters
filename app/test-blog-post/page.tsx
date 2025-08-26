import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Test Blog Post',
  description: 'This is a test blog post to verify routing is working.',
}

export default function TestBlogPost() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Test Blog Post</h1>
        <p className="text-lg text-gray-700">
          This is a test blog post to verify that the routing is working properly.
          If you can see this page, then the Next.js routing is functioning correctly.
        </p>
        <div className="mt-8 p-4 bg-green-100 border border-green-400 rounded">
          <p className="text-green-800">
            ✅ Success! The routing is working. The issue was likely with the original blog post file.
          </p>
        </div>
      </div>
    </div>
  )
}
