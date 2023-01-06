/* eslint-disable camelcase */
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"

const LocationPicker = ({ setFieldValue }: any) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  })

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleSelect =
    ({ description }: any) =>
    () => {
      setValue(description, false)
      clearSuggestions()

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0])
        console.log("Coordinates: ", { lat, lng })
        setFieldValue("latitude", lat)
        setFieldValue("longitude", lng)
        setFieldValue("address", description)
      })
    }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        placeId,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <li key={placeId} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })

  return (
    <div className="location-picker">
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where is the venue located?"
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  )
}

export default LocationPicker
