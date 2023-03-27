const PassDescription = ({ pass }: any) => {
  const passType = pass.attributes.pass_type
  const artistName = pass.attributes.artist.data.attributes.name
  const venue = pass.attributes.event.data.attributes.venue
  const date = pass.attributes.event.data.attributes.date

  const dateFormat = (value: any) => {
    const date = new Date(value)
    const day = date.toLocaleString("default", { day: "2-digit" })
    const month = date.toLocaleString("default", { month: "long" })
    const year = date.toLocaleString("default", { year: "numeric" })
    return day + " " + month + " " + year
  }

  let description = ""
  if (passType == "Circle") {
    description = `This Circle Pass is ${artistName}'s community pass providing access 
                to one-of-a-kind single event guest pass giveaways for every show added to the plus|one platform.`
  }
  if (passType == "Guest") {
    description = `This Guest Pass provides direct access to ${artistName}'s guest list at ${venue} on ${dateFormat(
      date
    )}.`
  }
  if (passType == "Infinity") {
    description = `Infinity passes coming soon!`
  }
  if (passType == "Tour") {
    description = `Tour passes coming soon!`
  }

  return (
    <>
      <div className="descriptor">{description}</div>
    </>
  )
}

export default PassDescription
