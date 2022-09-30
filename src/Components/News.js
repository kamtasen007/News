import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);



  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9912f2f63e8246fd9ce5dfeedb719192&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();

  }, [])





  const fetchMoreData = async () => {
    setpage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9912f2f63e8246fd9ce5dfeedb719192&page=${page + 1}&pageSize=${props.pageSize}`;
    setpage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }
  return (

    <div className='container my-2'>
      <h2 className='text-center' style={{ margin: "35px 0px", marginTop: "90px" }}>Top-Headlines</h2>


      <InfiniteScroll

        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<h4>Loading...</h4>}

      >
        <div className='container'>

          <div className='row'>
            {articles.map((element) => {
              return <div className='col-md-4' key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

              </div>

            })}

          </div>
        </div>
      </InfiniteScroll>
    </div>
  )


}

News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News;
