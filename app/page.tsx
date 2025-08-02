import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { Users, GraduationCap, Star, MapPin, Clock, BookOpen, Award, Shield, ArrowRight, Quote } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container section-padding relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🎓 Nepal's #1 Home Tutoring Platform
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Find the Perfect{" "}
                  <span className="text-primary relative">
                    Home Tutor
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                      viewBox="0 0 100 12"
                      fill="currentColor"
                    >
                      <path d="M0 8c30-4 70-4 100 0v4H0z" />
                    </svg>
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Connect with qualified, verified tutors across Nepal. Get personalized home tutoring for all subjects
                  and grades, tailored to your learning needs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/student">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                    <Users className="mr-2 h-5 w-5" />
                    Find a Tutor
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/teacher">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-transparent">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Become a Tutor
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Verified Tutors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Happy Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.9</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/images/hero.jpg"
                  alt="Students learning with tutors"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  height={500}
                  width={600}
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* MD's Welcome Section */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container">
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
            <CardContent className="relative p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* MD's Photo */}
                <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
                  <div className="relative w-40 h-40 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-xl overflow-hidden border-4 border-white shadow-xl">
                    <Image
                      src="/images/md.jpeg"
                      alt="Birendra Naral - MD, HR Home Tuition"
                      fill
                      className="object-cover"
                    />

                    {/* Soft glow effects */}
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary/30 rounded-full blur-md z-0" />
                    <div className="absolute -bottom-5 -left-5 w-14 h-14 bg-blue-400/20 rounded-full blur-lg z-0" />
                  </div>
                </div>


                {/* Welcome Message */}
                <div className="order-1 lg:order-2 space-y-6 text-center lg:text-left">
                  <div className="space-y-3">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Welcome Message
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Welcome to HR Home Tuition!</h2>
                  </div>

                  <div className="space-y-4 text-lg leading-relaxed text-slate-700">
                    <p>
                      We are excited to be a part of your educational journey. Our goal is to provide quality education
                      to students in the comfort of their own homes. We believe in nurturing students' potential through
                      experienced teachers and personalized attention.
                    </p>
                    <p>
                      Our vision is to equip each student with the knowledge and skills necessary for success. We are
                      committed to your success.
                    </p>
                  </div>

                  {/* Signature */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="space-y-1">
                      <p className="text-base text-slate-600">Thank you,</p>
                      <div className="space-y-1">
                        <p className="text-xl font-semibold text-slate-900">Birendra Naral</p>
                        <p className="text-sm text-primary font-medium">MD, HR Home Tuition</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Quote decoration */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="h-16 w-16 text-primary" />
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why HR Home Tuition is Different</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the highest quality tutoring experience with verified tutors and personalized
              learning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Verified Tutors</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  All our tutors go through rigorous background checks and verification processes. Only qualified
                  professionals make it to our platform.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Local Tutors</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Find experienced tutors in your area across all provinces and districts in Nepal. Convenient home
                  tutoring at your doorstep.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Flexible Timing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Choose your preferred time slots that work with your schedule. Morning, afternoon, or evening sessions
                  available.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">All Subjects</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  From Mathematics to Science, English to Nepali - we have expert tutors for all subjects and grade
                  levels.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Proven Results</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Our students consistently show improved grades and confidence. Track progress with regular assessments
                  and feedback.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">5-Star Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Our dedicated support team is always ready to help. Get assistance with tutor matching, scheduling,
                  and more.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting started with quality home tutoring is easier than ever. Follow these simple steps.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Students */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-primary mb-4">For Students</h3>
                <p className="text-muted-foreground">Find your perfect tutor in 3 easy steps</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Submit Your Request</h4>
                    <p className="text-muted-foreground">
                      Fill out our detailed form with your subject needs, preferred schedule, and location. The more
                      details, the better we can match you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Get Matched</h4>
                    <p className="text-muted-foreground">
                      Our algorithm finds the best tutors in your area. Review profiles, ratings, and experience before
                      making your choice.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Start Learning</h4>
                    <p className="text-muted-foreground">
                      Begin your personalized tutoring sessions at home. Track progress and provide feedback through our
                      platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Teachers */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-primary/80 mb-4">For Teachers</h3>
                <p className="text-muted-foreground">Start earning by teaching from home</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/80 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Create Your Profile</h4>
                    <p className="text-muted-foreground">
                      Sign up and create a comprehensive profile showcasing your qualifications, experience, and
                      teaching subjects.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/70 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Get Verified</h4>
                    <p className="text-muted-foreground">
                      Our team will verify your credentials and approve your profile. This ensures quality and builds
                      student trust.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/60 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">Start Teaching</h4>
                    <p className="text-muted-foreground">
                      Browse available tutoring opportunities, apply to teach students, and start earning from your
                      expertise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what students and parents have to say about their experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground mb-4">
                  "The tutor we found through HR Home Tuition helped my daughter improve her math grades from C to A+ in
                  just 3 months. Highly recommended!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sunita Maharjan</p>
                    <p className="text-sm text-muted-foreground">Parent, Lalitpur</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground mb-4">
                  "As a teacher, this platform has given me the flexibility to work from home while helping students
                  achieve their academic goals."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">RK</span>
                  </div>
                  <div>
                    <p className="font-semibold">Rajesh KC</p>
                    <p className="text-sm text-muted-foreground">Math Tutor, Kathmandu</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground mb-4">
                  "The quality of tutors is exceptional. My son's confidence in English has improved dramatically since
                  we started using this service."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">PS</span>
                  </div>
                  <div>
                    <p className="font-semibold">Priya Shrestha</p>
                    <p className="text-sm text-muted-foreground">Parent, Bhaktapur</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg text-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Learning Experience?</h2>
            <p className="text-xl opacity-90">
              Join thousands of students and teachers who are already part of Nepal's most trusted home tutoring
              platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/student">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto h-12 px-8 text-base">
                  Find a Tutor Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/teacher">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-8 text-base border-white text-white hover:bg-white hover:text-primary bg-transparent"
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Become a Tutor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  )
}
