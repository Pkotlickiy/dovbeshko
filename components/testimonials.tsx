"use client"

import { AnimatedSection, AnimatedItem } from "@/components/animated-section"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { SectionDivider } from "@/components/section-divider"
import { StructuredData } from "@/components/structured-data"

export function Testimonials() {
  const testimonials = [
    {
      text: "Светлана Юрьевна блестяще провела мое уголовное дело от начала до конца. Ее глубокое знание законодательства, внимание к деталям и стратегическое мышление позволили добиться прекращения дела на стадии предварительного расследования. Особенно ценно, что она всегда была на связи и подробно объясняла каждый шаг защиты.",
      author: "Клиент по уголовному делу",
      rating: 5,
    },
    {
      text: "Обратился с запутанным земельным спором, где другие юристы отказывались браться за дело. Светлана Юрьевна не только взялась за решение проблемы, но и нашла нестандартный подход, который привел к полному удовлетворению моих требований. Профессионализм высочайшего уровня в сочетании с искренней заинтересованностью в результате.",
      author: "Клиент по земельному спору",
      rating: 5,
    },
    {
      text: "Благодаря Светлане Юрьевне сложная сделка с недвижимостью прошла гладко и безопасно. Она провела тщательную проверку объекта, выявила и помогла устранить потенциальные риски, грамотно составила все документы. Ее сопровождение дало мне полную уверенность на каждом этапе сделки. Рекомендую как надежного и компетентного специалиста.",
      author: "Клиент по сделке с недвижимостью",
      rating: 5,
    },
  ]

  // Создаем структурированные данные для отзывов
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: "Довбешко Светлана Юрьевна",
    review: testimonials.map((testimonial, index) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: testimonial.rating,
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: testimonial.author,
      },
      reviewBody: testimonial.text,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: testimonials.length.toString(),
    },
  }

  return (
    <AnimatedSection id="testimonials" className="relative bg-[#f8f5f2] py-16 md:py-24" stagger>
      <StructuredData data={reviewsSchema} />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white blur-3xl" />
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <AnimatedItem>
            <div className="inline-block rounded-full bg-[#741717]/10 px-3 py-1 text-sm font-medium text-[#741717]">
              Отзывы
            </div>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="text-3xl font-bold tracking-tighter text-[#741717] sm:text-4xl md:text-5xl">
              Отзывы клиентов
            </h2>
          </AnimatedItem>
          <AnimatedItem delay={0.1}>
            <p className="max-w-[700px] text-[#603a30] md:text-xl/relaxed">Что говорят мои клиенты о сотрудничестве</p>
          </AnimatedItem>
        </div>

        <div className="mt-12">
          <AnimatedItem delay={0.2}>
            <TestimonialCarousel testimonials={testimonials} />
          </AnimatedItem>
        </div>
      </div>

      <SectionDivider color="#ffffff" variant="wave" />
    </AnimatedSection>
  )
}
