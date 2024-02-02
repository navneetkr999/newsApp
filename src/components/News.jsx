import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        category: 'general',
        pageSize: 12
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            articlesLength: 0
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews() {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        this.props.setProgress(20);
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false  
        });
        document.title = 'News-365 - ' + `${this.capitalizeFirstLetter(this.props.category)}`
        this.props.setProgress(100);
    }

    async componentDidMount() { //component lifecycle method
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            articlesLength: this.state.articlesLength + parsedData.articles.length
        });
        document.title = 'News-365 - ' + `${this.capitalizeFirstLetter(this.props.category)}`
    }
        

    // fetchPreviousNews = async () => {
    //     this.setState({
    //         page: this.state.page - 1,
    //     });
    //     this.updateNews();
    // }

    // fetchNextNews = async () => {
    //     this.setState({
    //         page: this.state.page + 1,
    //     });
    //     this.updateNews();
    // }

    render() { //component lifecycle method
        return (
            <>
                <h1 className='text-center my-5 text-uppercase'>News 365 - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                dataLength={this.state.articlesLength}
                next={this.fetchMoreData}
                hasMore={this.state.articlesLength !== this.state.totalResults}
                loader={<Spinner/>}
                >
                    <div className="container my-3">
                        <div className="row">
                            {this.state.articles && this.state.articles.map((article) => {
                                let title = article.title ? article.title : 'This is a default title';
                                let desc = article.description ? article.description : 'This is a default description';
                                let urlToImage = article.urlToImage ? article.urlToImage : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';
                                return <div className="col-md-4" key={Math.random().toString().substr(2, 6)}>
                                    <NewsItem title={title.slice(0, 45)} description={desc.slice(0, 70)} imageUrl={urlToImage} newsUrl={article.url} source = {article.source.name ? article.source.name : 'Unknown'} author={article.author ? article.author : 'Unknown'} publishedDate={article.publishedAt ? new Date(article.publishedAt).toDateString() : 'Date not available'} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between my-2">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.fetchPreviousNews}>&larr; Previos</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.fetchNextNews}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News
