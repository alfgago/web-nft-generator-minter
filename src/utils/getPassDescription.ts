import dateFormat from "./dateFunctions"

export const getPassDescription = (pass: any) => {
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
    desc = `Plus|One circle passes provide the digital utility via <a href="/artist/${artist.slug}">${artist.name}'s profile page</a> to enter guest pass giveaways 
    and access unique fan club plus|perks. Giveaway winners can use the guest pass to send guest list requests directly to 
    ${artist.name} for the event or sell their winning pass on our marketplace. Plus|Perks are unique digital links that can only be 
    accessed by owning the corresponding pass. An artist may adjust the plus|perks associated with this pass at any time.  
    Learn more about the utility and restrictions of circle passes <a href='/resources/fans'>here</a>.`
  }

  if (pass.pass_type == "Guest") {
    desc = `Plus|One guest passes provide the digital utility via <a href='/my-passes'>My Passes</a>
     to directly send ${artist.name} guest list requests for the ${event.name} 
     show on ${dateFormat(event.date)}. Following a guest list submission, 
     the current pass owner will be held space on Kings of Leon's guest list for each 
     name provided, which, depending on the show, will provide GA access or premium seating (for ticketed, seated shows). 
     Entry will be via the venue's Will Call, simply by stating 
     "I am on ${artist.name}'s guest list". 
     Guest Passes can be resold at any time and the new owner will be able to replace any prior guest list submissions so 
     long as the submission has been completed by 24hr prior to the event. While an artist may adjust any plus|perks associated with 
     this pass at any time, guest list access utility will never change. 
     To see plus|perks associated with this pass, view details on
      <a href="/artist/${artist.slug}">${
      artist.name
    }'s profile</a>. Learn more about the utility and restrictions of plus|one 
     guest passes <a href='/resources/fans'>here</a>.`
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
