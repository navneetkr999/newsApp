import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, author, publishedDate, source} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
            <div className="imageContainer">
                <img src={imageUrl} className="card-img-top" alt="..." style={{height: '265px'}}/>
            </div>
            <div className='d-flex position-absolute justify-content-end end-0'>
              <span className="badge rounded-pill bg-danger">{source}
              </span>
            </div>
            <div className="card-body">
              <h5 className="card-title">{title}..</h5>
              <p className="card-text">{description}..</p>
              <p className="card-text"><small className='text-muted'>by {author} on {publishedDate}</small></p>
              <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-secondary">Read More..</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
