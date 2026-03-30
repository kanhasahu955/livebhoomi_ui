export type LbSelectOption<T extends string | number = string | number> = {
  label: string
  value: T
  disabled?: boolean
}
