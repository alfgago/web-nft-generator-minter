// @ts-nocheck
import { Component } from "react"
import { ReactSVG } from "react-svg"

class DebouncedSearchBox extends Component {
  timerId = null

  state = {
    value: this.props.currentRefinement,
  }

  onChangeDebounced = (event: any) => {
    const delay = 300
    const { refine } = this.props
    const value = event.currentTarget.value
    clearTimeout(this.timerId)
    this.timerId = setTimeout(() => refine(value), delay)

    this.setState(() => ({
      value,
    }))
  }

  render() {
    const { value } = this.state

    return (
      <div className="search-field">
        <input
          id="auto-focus-search"
          value={value}
          autoFocus
          onChange={this.onChangeDebounced}
          placeholder="Search by artist, venue, or city..."
        />
        <ReactSVG className="icon" src="/assets/icons/search.svg" />
      </div>
    )
  }
}

export default DebouncedSearchBox
