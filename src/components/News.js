import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spineer from './Spineer';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8
  } 

  static PropsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
  }

  capitalizeFirstLetter = (string) =>{
  return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const 
  constructor(props){
    super(props)
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  } 

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b10e8052d23547e993d4719277480687&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);    
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles, 
      totalResults: parseData.totalResults,
      loading: false
    });

  }

  async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b10e8052d23547e993d4719277480687&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);    
    // let parseData = await data.json();
    // console.log(parseData);
    // this.setState({
    //   articles: parseData.articles, 
    //   totalResults: parseData.totalResults,
    //   loading: false
    // });
    this.updateNews();
  }

  handleNextClick = async() =>{
    // if((this.state.page + 1 <= Math.ceil(this.state.totalResults/this.props.pageSize))){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b10e8052d23547e993d4719277480687&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);    
    // let parseData = await data.json();
    // console.log(parseData);
   
    // this.setState({
    //     page: this.state.page+1,
    //     articles: parseData.articles,
    //     loading: false
    //   })
    // }
    this.setState({page: this.state.page+1});
    this.updateNews();

    }


  handlePrevClick = async() =>{
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b10e8052d23547e993d4719277480687&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);    
    // let parseData = await data.json();
    // console.log(parseData);
   
    // this.setState({
    //     page: this.state.page-1,
    //     articles: parseData.articles,
    //     loading: false
    //   })
    this.setState({page: this.state.page-1});
    this.updateNews();

  }

 
  render() {
    return (
      <div>
        <div className="container my-3">
            <h1 className='text-center' style={{margin: '30px 0px'}}>NewsMokey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
            {this.state.loading && <Spineer/>}
            <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className='col-md-4' key={element.url}>
                    <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imgUrl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} bagColor={this.props.bagColor}/>
                </div>
            })}
            </div>
            <div className="container d-flex justify-content-between">  
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
      </div>
      
    )
  }
}

export default News

