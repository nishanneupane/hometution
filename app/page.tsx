import { Suspense } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { MDWelcomeSection } from "@/components/md-welcome-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getTestimonials } from "@/lib/actions/testimonial-actions"
import { BookOpen, Users, GraduationCap, MapPin, Star, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ChatbotButton from "@/components/ChatbotButton"

function TestimonialsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

async function TestimonialsSection() {
  const testimonials = await getTestimonials()
  const displayTestimonials = testimonials.slice(0, 3)

  if (displayTestimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600">
              Real experiences from students and parents who found success with our tutors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">{testimonial.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {testimonial.role === "student" ? "Student" : "Parent"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed">"{testimonial.message}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />

        <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-slate-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-4 py-2">
                      #1 Quality Home Tuition Platform in Nepal
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                      Find the Perfect <span className="text-blue-600">Tutor</span> for Your Child
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Connect with qualified, experienced tutors in your area. Personalized learning at home for better
                      results.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                      <Link href="/student">
                        Find a Tutor <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/teacher">Become a Tutor</Link>
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">1500+</div>
                      <div className="text-sm text-gray-600">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">3000+</div>
                      <div className="text-sm text-gray-600">Tutors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">200+</div>
                      <div className="text-sm text-gray-600">Schools</div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative z-10">
                    <Image
                      src="/images/hero.jpg"
                      alt="Students learning with tutor"
                      width={600}
                      height={400}
                      className="rounded-2xl shadow-2xl"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-2xl" />
                  <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50" />
                  <div className="absolute -top-4 -left-4 w-48 h-48 bg-slate-100 rounded-full blur-2xl opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <MDWelcomeSection />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose HR Home Tuition?</h2>
                <p className="text-xl text-gray-600">
                  We provide the best home tutoring experience with qualified teachers
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>Qualified Tutors</CardTitle>
                    <CardDescription>
                      All our tutors are verified, experienced, and passionate about teaching
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle>Local Tutors</CardTitle>
                    <CardDescription>Find tutors in your area for convenient home-based learning</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <BookOpen className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle>All Subjects</CardTitle>
                    <CardDescription>From Mathematics to Science, we cover all subjects and grade levels</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <CardTitle>Personalized Learning</CardTitle>
                    <CardDescription>One-on-one attention tailored to your child's learning style</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                      <CheckCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle>Flexible Scheduling</CardTitle>
                    <CardDescription>Choose times that work best for your family's schedule</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                      <Star className="h-6 w-6 text-teal-600" />
                    </div>
                    <CardTitle>Proven Results</CardTitle>
                    <CardDescription>Track record of improving student performance and confidence</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Suspense fallback={<TestimonialsSkeleton />}>
          <TestimonialsSection />
        </Suspense>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Learning?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of students who have improved their grades with our expert tutors
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/student">
                    Find a Tutor Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                  asChild
                >
                  <Link href="/teacher">Apply as Tutor</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      <ChatbotButton />
    </>
  )
}
