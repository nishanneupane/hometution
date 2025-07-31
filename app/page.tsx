import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Users, GraduationCap, Briefcase, Star, MapPin, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Find the Perfect <span className="text-primary">Home Tutor</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Connect with qualified tutors across Nepal. Professional home tutoring services for all subjects and grades,
            tailored to your learning needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/student">
              <Button size="lg" className="w-full sm:w-auto">
                <Users className="mr-2 h-5 w-5" />I Need a Tutor
              </Button>
            </Link>
            <Link href="/teacher">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                <GraduationCap className="mr-2 h-5 w-5" />
                I'm a Teacher
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose HR Home Tuition?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Qualified Tutors</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All our tutors are verified and approved by our admin team. Each tutor goes through a rigorous
                  screening process.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Local Tutors</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find tutors in your area across all provinces, districts, and municipalities in Nepal for convenient
                  home tutoring.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Flexible Timing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Choose your preferred time slots that work best for your schedule. Morning, afternoon, or evening
                  sessions available.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Students */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">For Students</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Submit Your Request</h4>
                    <p className="text-muted-foreground">
                      Fill out our simple form with your subject needs and preferences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Get Matched</h4>
                    <p className="text-muted-foreground">Qualified tutors in your area will apply to teach you.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Start Learning</h4>
                    <p className="text-muted-foreground">Begin your personalized tutoring sessions at home.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Teachers */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-secondary">For Teachers</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary text-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Register & Verify</h4>
                    <p className="text-muted-foreground">Create your profile and get verified by our admin team.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary text-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Browse Opportunities</h4>
                    <p className="text-muted-foreground">View available tutoring requests in your area.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary text-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Start Teaching</h4>
                    <p className="text-muted-foreground">Apply to teach and begin earning from home tutoring.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students and teachers already using HR Home Tuition
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/student">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Find a Tutor
              </Button>
            </Link>
            <Link href="/careers">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                View Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-foreground text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-6 w-6" />
            <span className="text-xl font-bold">HR Home Tuition</span>
          </div>
          <p className="text-muted-foreground">© 2024 HR Home Tuition. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
