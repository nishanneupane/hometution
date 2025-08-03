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
              About HR Home Tuition
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Transforming Education Through
              <span className="text-primary"> Personalized Learning</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to make quality education accessible to every student in Nepal through our network of
              verified, experienced tutors who bring learning directly to your home.
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
                  Founded on the Belief That Every Student Deserves Quality Education
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                HR Home Tuition was founded in 2020 with a simple yet powerful vision: to bridge the gap between
                students seeking quality education and experienced tutors looking to make a difference.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                What started as a small initiative in Kathmandu has now grown into Nepal's most trusted home tutoring
                platform, connecting thousands of students with qualified tutors across the country.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Verified Tutors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Happy Students</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/hero2.jpg"
                alt="Students learning"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mission, Vision & Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do and shape our commitment to educational excellence.
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
                  To democratize quality education by connecting students with the best tutors, making personalized
                  learning accessible, affordable, and effective for everyone.
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
                  To become Nepal's leading educational platform where every student has access to world-class tutoring
                  and every educator can reach their full potential.
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
                  Excellence, integrity, innovation, and inclusivity. We believe in creating meaningful connections that
                  foster growth, learning, and success for all.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We go beyond just connecting tutors and students. We create an ecosystem of learning excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Rigorous Verification</h3>
              <p className="text-muted-foreground text-sm">
                Every tutor undergoes thorough background checks and qualification verification.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Perfect Matching</h3>
              <p className="text-muted-foreground text-sm">
                Our algorithm ensures the best tutor-student matches based on learning needs.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Continuous Support</h3>
              <p className="text-muted-foreground text-sm">
                Ongoing support for both students and tutors throughout the learning journey.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Quality Assurance</h3>
              <p className="text-muted-foreground text-sm">
                Regular feedback and quality monitoring to ensure the best learning outcomes.
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
                alt="Quality education commitment"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-4">
                  Our Commitment
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Committed to Educational Excellence</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Quality First</h4>
                    <p className="text-muted-foreground">
                      We never compromise on the quality of education and tutoring services we provide.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Student Success</h4>
                    <p className="text-muted-foreground">
                      Every decision we make is centered around improving student learning outcomes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Continuous Innovation</h4>
                    <p className="text-muted-foreground">
                      We constantly evolve our platform to meet the changing needs of modern education.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Community Impact</h4>
                    <p className="text-muted-foreground">
                      We're building a stronger educational community across Nepal, one student at a time.
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
            <h2 className="text-3xl md:text-4xl font-bold">Join Our Educational Community</h2>
            <p className="text-xl opacity-90">
              Whether you're a student seeking quality education or a tutor looking to make a difference, we're here to
              support your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/student">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto h-12 px-8">
                  Find a Tutor
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
