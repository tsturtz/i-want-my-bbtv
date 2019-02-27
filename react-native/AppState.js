import React, { Component, createContext } from 'react';

export const AppContext = createContext();

export class AppProvider extends Component {
  state = {
    tmdbConfigImagesBaseUrl: '',
  }
  
  async componentWillMount() {
    try {
      const response = await fetch(`${process.env.TMDB_BASE_AND_VERSION}/configuration${process.env.TMDB_API_KEY_PARAM}`)
      const json = await response.json()
      this.setState({ tmdbConfigImagesBaseUrl: json.images.secure_base_url })
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
