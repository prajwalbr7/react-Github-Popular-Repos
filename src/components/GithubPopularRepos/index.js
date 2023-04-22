import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    itemDetails: [],
    isLoading: true,
    isFail: false,
    languageIds: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    try {
      const {languageIds} = this.state
      const response = await fetch(
        `https://apis.ccbp.in/popular-repos?language=${languageIds}`,
      )
      const DataFetched = await response.json()
      if (response.ok) {
        this.successData(DataFetched.popular_repos)
      }
    } catch (e) {
      this.failure()
    }
  }

  failure = () =>
    this.setState({isFail: true, isLoading: true}, this.renderInternetGone)

  successData = listDetails => {
    const newDetails = listDetails.map(eachItem => ({
      avatarUrl: eachItem.avatar_url,
      forksCount: eachItem.forks_count,
      id: eachItem.id,
      issuesCount: eachItem.issues_count,
      name: eachItem.name,
      starsCount: eachItem.stars_count,
    }))
    this.setState({
      itemDetails: newDetails,
      isLoading: false,
    })
  }

  gettingTheId = id => {
    this.setState({languageIds: id, isLoading: true}, this.getDetails)
  }

  renderInternetGone = () => (
    <div className="noInternet-Container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="no-internet"
      />
      <h1 className="no-internet-heading">Something Went Wrong</h1>
    </div>
  )

  renderloader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderItems = () => {
    const {itemDetails} = this.state
    return (
      <ul className="ul-style-github-second">
        {itemDetails.map(eachItem => (
          <RepositoryItem ItemDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {languageIds, isLoading, isFail} = this.state
    console.log(languageIds)
    return (
      <div className="container-GithubPopular">
        <h1 className="heading-github">Popular</h1>
        <ul className="ul-style-github">
          {languageFiltersData.map(Item => (
            <LanguageFilterItem
              Data={Item}
              gettingTheId={this.gettingTheId}
              key={Item.id}
              isActive={Item.id === languageIds}
            />
          ))}
        </ul>
        {isLoading && (
          <>
            {!isFail && <>{this.renderloader()}</>}
            {isFail && <>{this.renderInternetGone()}</>}
          </>
        )}
        {!isLoading && <>{this.renderItems()}</>}
      </div>
    )
  }
}
export default GithubPopularRepos
