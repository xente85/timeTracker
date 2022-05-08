export interface Employee {
  id: string
  workStatus: string
  firstName: string,
  lastName: string,
  imageProfileURL: string,
  totalWorkTime: Date,
  maxWorkTime: string
}

export interface Track {
  employee: Employee,
  workEntryIn: {
    date: string
  }
  workEntryOut: {
    date: string
  }
}