import { reactive, toRefs } from 'vue'
import useApi from './api'

type FormErrors<T> = {
  [K in keyof T]: string | null | any
}

export default function useForm<T extends Record<string, any>>(object: T) {
  const form = reactive({ ...object }) as T
  const errors = reactive({} as FormErrors<any>)

  ;(Object.keys(object) as Array<keyof T>).forEach((key: any) => {
    errors[key] = null
  })

  function reset_error(field?: keyof T) {
    if (field) {
      errors[field] = null
    } else {
      ;(Object.keys(errors) as Array<keyof T>).forEach((key) => {
        errors[key] = null
      })
    }
  }

  function set_error(field: keyof T, message: string) {
    errors[field] = message
  }

  function has_error(field: keyof T) {
    return errors[field] !== null
  }

  function get_error(field: keyof T) {
    return errors[field]
  }

  function is_dirty() {
    return (Object.keys(errors) as Array<keyof T>).some((key) => {
      return errors[key] !== null
    })
  }

  function validate(rules: Record<keyof T, Function>) {
    reset_error()
    ;(Object.keys(rules) as Array<keyof T>).forEach((key) => {
      const result = rules[key](form[key])
      if (!result) {
        reset_error(key)
      } else {
        set_error(key, result)
      }
    })

    return !is_dirty()
  }

  function buildPayload() {
    function hasFile(data: Record<string, any>): boolean {
      return Object.values(data).some((value) => {
        if (value instanceof File || value instanceof Blob) return true
        if (Array.isArray(value)) {
          return value.some((v) => v instanceof File || v instanceof Blob)
        }
        return false
      })
    }

    function toFormData(data: Record<string, any>) {
      const formData = new FormData()

      Object.keys(data).forEach((key) => {
        const value = data[key]

        if (value instanceof File || value instanceof Blob) {
          formData.append(key, value)
        } else if (Array.isArray(value)) {
          value.forEach((v, i) => {
            if (v instanceof File || v instanceof Blob) {
              formData.append(`${key}[${i}]`, v)
            } else {
              formData.append(`${key}[${i}]`, v)
            }
          })
        } else if (value !== null && value !== undefined) {
          formData.append(key, value)
        }
      })

      return formData
    }

    if (hasFile(form)) {
      return toFormData(form)
    }
    return form
  }

  return {
    ...toRefs(form),
    errors,
    func: {
      get_payload: buildPayload,
      reset_error,
      set_error,
      has_error,
      get_error,
      is_dirty,
      validate,
      file: (key: keyof T, e: any) => {
        form[key] = e.target.files[0]
      },
      files: (key: keyof T, e: any) => {
        form[key] = e.target.files
      },
      get: (endpoint: string, config?: any) => {
        return useApi().get(endpoint, config)
      },
      post: (endpoint: string, config?: any) => {
        const payload = buildPayload()
        return useApi().post(endpoint, payload, {
          headers: payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
          ...config,
        })
      },
      put: (endpoint: string, config?: any) => {
        const payload = buildPayload()
        return useApi().put(endpoint, payload, {
          headers: payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
          ...config,
        })
      },
      patch: (endpoint: string, config?: any) => {
        const payload = buildPayload()
        return useApi().patch(endpoint, payload, {
          headers: payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
          ...config,
        })
      },
      delete: (endpoint: string, config?: any) => {
        return useApi().delete(endpoint, config)
      },
    },
  }
}
