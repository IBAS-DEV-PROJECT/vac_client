export type InputStatus = 'default' | 'success' | 'error'

export interface ValidationResult {
  status: InputStatus
  message: string
}

export type IdInputStatus =
  'idle' | 'invalid' | 'ready' | 'available' | 'unavailable'
