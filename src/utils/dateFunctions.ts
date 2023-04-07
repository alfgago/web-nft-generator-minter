const dateFormat = (value: any) => {
  const date = new Date(value)
  const day = date.toLocaleString("default", { day: "2-digit" })
  const month = date.toLocaleString("default", { month: "long" })
  const year = date.toLocaleString("default", { year: "numeric" })
  return day + " " + month + " " + year
}

export default dateFormat
