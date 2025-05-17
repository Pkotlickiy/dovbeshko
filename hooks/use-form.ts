"use client"

import { useState, useCallback, type ChangeEvent, type FormEvent } from "react"

interface UseFormOptions<T> {
  initialValues: T
  onSubmit: (values: T) => Promise<void> | void
  validate?: (values: T) => Partial<Record<keyof T, string>> | null
}

export function useForm<T extends Record<string, any>>({ initialValues, onSubmit, validate }: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setValues((prev) => ({ ...prev, [name]: value }))

      // Clear error when field is changed
      if (errors[name as keyof T]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name as keyof T]
          return newErrors
        })
      }
    },
    [errors],
  )

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      // Validate form if validate function is provided
      if (validate) {
        const validationErrors = validate(values)
        if (validationErrors && Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors)
          return
        }
      }

      setIsSubmitting(true)
      try {
        await onSubmit(values)
      } catch (error) {
        console.error("Form submission error:", error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [values, validate, onSubmit],
  )

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  }
}
