export const metadata = {
  title: 'Welcome To Charlie\'s Phoenix',
  description: 'Experience the nightlife at Charlie\'s Phoenix',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  )
}