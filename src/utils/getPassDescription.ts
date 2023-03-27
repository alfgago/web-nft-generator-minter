export const getPassDescription = (pass: any) => {
  console.log(pass)
  const artist = pass.artist.data.attributes
  const event = pass.event?.data?.attributes
  const tour = pass.tour?.data?.attributes
  let desc = ""
  if (pass.pass_type == "Infinity") {
    desc = `This plus|one infinity pass provides the digital utility via <a href="/artist/${artist.slug}">${artist.name}'s profile page</a> to directly send guest list 
            requests for every show ${artist.name} adds to the plus|one platform. When a guest list request is submitted via the plus|one 
            platform, it provides the owner two spots on ${artist.name}'s guest list, which, depending on the particular show, will 
            provide GA access or premium seating (for ticketed, seated shows). The infinity pass does not have an expiration date, 
            and can be resold at any time by setting up a listing on any polygon supported marketplace. Guest list requests must 
            be submitted over 24 hours prior to the event. Learn more about the utility and restrictions <a href="https://plusonemusic.io/resources/fans">here</a>.`
  }

  if (pass.pass_type == "Circle") {
    desc = `This plus|one circle pass provides the digital utility via <a href="/artist/${artist.slug}">${artist.name}'s profile page</a> 
    to enter drawings to win a single event guest pass for every show ${artist.name} adds to the plus|one platform.  
    After winning, the owner can use the single event pass to send guest list requests directly to ${artist.name} for the event or sell their 
    winning pass on any marketplace supporting the polygon network. Single event guest passes provide the owner two spots on ${artist.name}'s guest list, 
    which, depending on the particular show, will provide GA access or premium seating (for ticketed, seated shows).  
    Guest list requests must be submitted over 24 hours prior to the event.  The lottery pass is also the community token for the plus|one 
    platform which will provide future perks to fans as the pass has no expiration.  Learn more about the utility and restrictions <a href="https://plusonemusic.io/resources/fans">here</a>.`
  }

  if (pass.pass_type == "Guest") {
    desc = `This plus|one guest pass provides the digital utility via <a href="/artist/${artist.slug}">${artist.name}'s profile page</a> 
    to directly send ${artist.name} guest list requests for the ${event.name} show at ${event.address} on ${event.date}. When a guest list request is submitted via the plus|one 
    platform, it provides the owner two spots on ${artist.name}'s guest list, which, depending on the particular show, will provide GA access or 
    premium seating (for ticketed, seated shows). All passes can be resold at any time by setting up a listing on any polygon supported 
    marketplace. Guest list requests must be submitted over 24 hours prior to the event. 
    Learn more about the utility and restrictions <a href="https://plusonemusic.io/resources/fans">here</a>.`
  }

  if (pass.pass_type == "Tour") {
    desc = `This plus|one tour pass provides the digital utility via <a href="/artist/${artist.slug}">${artist.name}'s profile page 
    to directly send guest list requests for every show ${artist.name} adds to the plus|one platform 
    between ${tour.date_from} and ${tour.date_to} for ${tour.tour_name}
    When a guest list request is submitted via the plus|one platform, it provides the owner two spots on ${artist.name}'s guest list, which, 
    depending on the particular show, will provide GA access or premium seating (for ticketed, seated shows). 
    All passes can be resold at any time by setting up a listing on any polygon supported marketplace.  
    Guest list requests must be submitted over 24 hours prior to the event.
    Learn more about the utility and restrictions <a href="https://plusonemusic.io/resources/fans">here</a>.`
  }

  return desc
}
