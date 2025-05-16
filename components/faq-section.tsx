"use client"

import { AnimatedSection, AnimatedItem } from "@/components/animated-section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { SectionDivider } from "@/components/section-divider"
import { PageDivider } from "@/components/page-divider"
import { FormattedList } from "@/components/formatted-list"

export function FaqSection() {
  const faqs = [
    {
      question: "Как проходит первичная консультация?",
      answer:
        "Первичная консультация — это ваш первый шаг к решению юридической проблемы. В течение 60 минут мы детально обсудим вашу ситуацию, я задам уточняющие вопросы и проанализирую имеющиеся документы. Вы получите не только профессиональную оценку перспектив дела, но и конкретный план действий с понятными шагами. Моя задача — чтобы вы ушли с консультации с четким пониманием ситуации и уверенностью в дальнейших действиях.",
    },
    {
      question: "Сколько стоят ваши услуги?",
      answer:
        "Стоимость услуг формируется индивидуально и зависит от сложности вашего дела и необходимых юридических действий. Я практикую прозрачный подход к ценообразованию: после первичной консультации вы получите детальное предложение с фиксированной стоимостью услуг. Никаких скрытых платежей или неожиданных расходов — все условия сотрудничества фиксируются в договоре. Для постоянных клиентов действует гибкая система скидок и специальные условия абонентского обслуживания.",
    },
    {
      question: "Какие документы нужно принести на консультацию?",
      answer:
        "Для максимально эффективной консультации рекомендую взять с собой все документы, связанные с вашим вопросом: договоры, переписку, судебные акты, претензии и квитанции. Чем больше информации будет в моем распоряжении, тем точнее я смогу оценить ситуацию и предложить оптимальное решение. Не беспокойтесь, если вы не уверены, какие документы важны — просто возьмите всё, что связано с вашим делом, а вместе мы определим ключевые материалы и выстроим стратегию защиты ваших интересов.",
    },
    {
      question: "Вы работаете по всей России или только в Санкт-Петербурге?",
      answer:
        "Хотя основная практика сосредоточена в Санкт-Петербурге и Ленинградской области, я успешно представляю интересы клиентов по всей России. Для удаленных клиентов доступны онлайн-консультации через видеосвязь с тем же уровнем профессионализма и внимания к деталям. Если ваше дело требует личного присутствия в другом регионе, мы обсудим этот вопрос индивидуально и найдем оптимальное решение. Современные технологии позволяют мне эффективно работать с клиентами независимо от их местонахождения.",
    },
    {
      question: "Как долго может длиться судебный процесс?",
      answer:
        "Продолжительность судебного процесса зависит от многих факторов, включая сложность дела, загруженность суда и поведение участников. В среднем, рассмотрение гражданских дел занимает от 2 до 6 месяцев, а уголовных — от 3 месяцев до года. На первичной консультации я дам вам реалистичный прогноз по срокам с учетом особенностей вашей ситуации и поделюсь стратегией, как избежать необоснованного затягивания процесса. Моя задача — не только добиться положительного результата, но и сделать это в оптимальные сроки.",
    },
    {
      question: "Что такое адвокатская тайна?",
      answer:
        "Адвокатская тайна — это фундаментальный принцип, гарантирующий полную конфиденциальность всей информации, которую вы доверяете мне как адвокату. Это означает, что любые сведения о вашем деле, включая сам факт обращения, содержание консультаций и стратегию защиты, надежно защищены от разглашения третьим лицам. Адвокатская тайна не имеет срока давности и сохраняется даже после завершения нашего сотрудничества. Это создает безопасное пространство для откровенного обсуждения вашей ситуации и разработки наиболее эффективной стратегии защиты.",
    },
    {
      question: "Можно ли получить консультацию онлайн?",
      answer:
        "Да, я провожу полноценные онлайн-консультации через удобные для вас платформы видеосвязи (Zoom, Skype, WhatsApp). Онлайн-формат особенно удобен, если вы находитесь в другом городе или ограничены во времени. Качество консультации при этом остается на высоком уровне — вы получите такой же профессиональный анализ ситуации и детальные рекомендации, как при личной встрече. Для подготовки к онлайн-консультации вы можете заранее направить мне необходимые документы по электронной почте, что позволит максимально эффективно использовать время нашей встречи.",
    },
  ]

  return (
    <AnimatedSection id="faq" className="relative bg-white py-16 md:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#f8f5f2] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#f8f5f2] blur-3xl" />
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <AnimatedItem>
            <div className="inline-block rounded-full bg-[#741717]/10 px-3 py-1 text-sm font-medium text-[#741717]">
              Вопросы и ответы
            </div>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="font-playfair text-3xl font-bold tracking-tighter text-[#741717] sm:text-4xl md:text-5xl">
              Часто задаваемые вопросы
            </h2>
          </AnimatedItem>
          <AnimatedItem delay={0.1}>
            <p className="max-w-[700px] text-[#603a30] md:text-xl/relaxed">
              Ответы на наиболее распространенные вопросы о юридических услугах
            </p>
          </AnimatedItem>

          {/* Simple page divider */}
          <PageDivider variant="simple" className="my-2" />
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full" aria-label="Часто задаваемые вопросы">
            {faqs.map((faq, index) => (
              <AnimatedItem key={index} delay={0.1 + index * 0.05}>
                <motion.div
                  whileHover={{ backgroundColor: "rgba(248, 245, 242, 0.5)" }}
                  className="rounded-lg transition-all duration-300"
                >
                  <AccordionItem value={`item-${index}`} className="border-b border-[#c4bab3]/20 px-2">
                    <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                      <AccordionTrigger className="text-left font-playfair font-medium text-[#603a30] hover:text-[#741717] hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                    </motion.div>
                    <AccordionContent className="text-[#603a30]">
                      <motion.div
                        className="rounded-lg bg-[#f8f5f2]/50 p-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Используем компонент FormattedList вместо простого параграфа */}
                        <FormattedList content={faq.answer} firstLetterStyle={true} markerColor="#741717" />
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              </AnimatedItem>
            ))}
          </Accordion>
        </div>

        <AnimatedItem delay={0.5}>
          <div className="mt-12 flex justify-center">
            <motion.div
              className="relative overflow-hidden rounded-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#contact"
                className="relative inline-flex items-center justify-center rounded-md bg-[#741717] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#603a30]"
                role="button"
                aria-label="Перейти к форме контактов"
              >
                <span className="relative z-10">Остались вопросы? Свяжитесь со мной</span>
                <span className="absolute inset-0 -z-0 bg-gradient-to-r from-[#8B0000] to-[#741717] opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
              </a>
            </motion.div>
          </div>
        </AnimatedItem>
      </div>

      <SectionDivider color="#f8f5f2" variant="angle" />
    </AnimatedSection>
  )
}
