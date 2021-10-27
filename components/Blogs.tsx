import React from 'react';
import { Blog } from '../types/Blogs';

type Props = {
    blogs: Blog[];
};

class BlogsComponent extends React.PureComponent<Props> {
    openBlog(url: string): void {
        window.open(`/api/redirect?url=${ encodeURI(url) }`);
        return;
    }

    render(): JSX.Element {
        const { blogs } = this.props;

        return (
            <section className="blogs">
                <div className="container">
                    <h1 className="section-title">JS Blogs</h1>
                    <div className="highlight" />

                    <div className="blogs">
                        <div className="row">
                            {
                                blogs.map((blog) => (
                                    <div className="col-md-4 col-12" key={blog.row_id} onClick={() => this.openBlog(blog.Link)}>
                                        <div className="blog-card">
                                            <img src={blog.Thumbanil} alt={blog.Title} />
                                            <h4 className="blog-title">{blog.Title}</h4>
                                            <p className="blog-description">
                                                {blog.Description}
                                                <span className="read-more">more...</span>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                            {/* <div className="col-12">
                                <button className="btn btn-primary">READ MORE</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default BlogsComponent;
