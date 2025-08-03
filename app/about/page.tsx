import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Heart, Award, CheckCircle, GraduationCap, BookOpen, Shield, Star } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Bringing Education Home: <span className="text-primary">Learning with Love</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We&apos;re a family of educators dedicated to making quality education reachable for every student in Nepal. Our trusted tutors bring learning to your doorstep with care and connection.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-4">
                  Our Story
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  A Dream to Light Up Every Child&apos;s Future
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                HR Home Tuition began in 2020 in a small room in Kathmandu with a big heart. Our dream was simple: every Nepali child deserves a chance to learn and grow with the best teachers. What started as a small effort has grown into a trusted community, connecting thousands of students and teachers across Nepal.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We&apos;re here because of the trust and love of families like yours. For us, education isn&apos;t just about books—it&apos;s about building hope, confidence, and a brighter future, one student at a time.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">3,000+</div>
                  <div className="text-sm text-muted-foreground">Trusted Tutors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Happy Students</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/hero2.jpg"
                alt="Nepali students learning"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Our Foundation
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission, Vision & Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These are the heartbeats of our work, guiding us to create a better learning experience for every student.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  To make quality education a reality for every Nepali student by connecting them with caring, skilled tutors who teach from the heart.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  To create a Nepal where every child has access to personalized learning, and every teacher feels valued and empowered.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Care, trust, growth, and togetherness. We believe in building a community where learning feels like family.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Makes Us Special</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re more than just a tutoring service—we&apos;re a family that cares about your child&apos;s dreams and success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Trusted Tutors</h3>
              <p className="text-muted-foreground text-sm">
                Every tutor is carefully checked to ensure they&apos;re qualified and trustworthy, like a member of your own family.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Perfect Fit</h3>
              <p className="text-muted-foreground text-sm">
                We match tutors and students based on what your child needs, making learning feel personal and meaningful.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Always There for You</h3>
              <p className="text-muted-foreground text-sm">
                We support students and tutors every step of the way, like a friend who&apos;s always by your side.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Excellence in Learning</h3>
              <p className="text-muted-foreground text-sm">
                We listen to feedback and ensure every lesson helps your child shine brighter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="section-padding bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="/images/hero3.jpg"
                alt="Students and tutors together"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-4">
                  Our Promise
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">A Commitment to Your Child&apos;s Success</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Quality You Can Trust</h4>
                    <p className="text-muted-foreground">
                      We pour our hearts into ensuring every lesson is meaningful and effective.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Your Child First</h4>
                    <p className="text-muted-foreground">
                      Every step we take is to help your child grow with confidence and joy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Always Improving</h4>
                    <p className="text-muted-foreground">
                      We keep finding better ways to make learning exciting and relevant for today&apos;s world.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Building Our Community</h4>
                    <p className="text-muted-foreground">
                      Together, we&apos;re creating a stronger, more educated Nepal, one child at a time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg text-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Join Our Learning Family</h2>
            <p className="text-xl opacity-90">
              Whether you&apos;re a student dreaming big or a teacher ready to inspire, we&apos;re here to walk this journey with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/student">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto h-12 px-8">
                  Find Your Tutor
                </Button>
              </Link>
              <Link href="/teacher">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-8 border-white text-white hover:bg-white hover:text-primary bg-transparent"
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Become a Tutor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}