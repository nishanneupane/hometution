import { getTestimonials } from "@/lib/actions/testimonial-actions"
import { TestimonialsTableClient } from "@/components/admin/testimonials-table-client"

export async function TestimonialsTable() {
  const testimonials = await getTestimonials()

  return <TestimonialsTableClient testimonials={testimonials} />
}
