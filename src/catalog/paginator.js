import React from "react";
import {Link} from "react-router-dom";

export class PaginatorComponent extends React.Component {

    getCurrent() {
        return parseInt(this.props.current, 10);
    }

    getTotalCount() {
        return parseInt(this.props.totalCount, 10);
    }

    getSize() {
        return parseInt(this.props.size, 10);
    }

    getPath() {
        return this.props.path;
    }

    getPages() {
        const pageCount = Math.ceil(this.getTotalCount() / this.getSize());

        const pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push({
                number: i,
                active: this.getCurrent() === i
            });
        }
        return pages;
    }

    render() {
        return (
            <div>
                {this.getPages().map((page, i) => {
                    if (page.active) {
                        return <span key={i}>{page.number}</span>
                    } else {
                        return (
                            <Link to={{pathname: this.getPath(), search: `?page=${page.number}`}}
                                key={i}>
                                {page.number}
                            </Link>
                        );
                    }
                })}
            </div>
        )
    }
}
