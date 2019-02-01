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

    getPageCount() {
        return Math.ceil(this.getTotalCount() / this.getSize());
    }

    getPages() {
        const pageCount = this.getPageCount();

        let start = this.getCurrent() - 2;
        let end = this.getCurrent() + 2;

        if (start <= 0) {
            start = 1;
            end += Math.abs(start);

            if (this.getCurrent() === 1) {
                end++;
            }
        }

        if (end > pageCount) {
            start -= Math.abs(end - pageCount);
            end = pageCount;
        }

        if (start <= 0) {
            start = 1;
        }

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push({
                number: i,
                active: this.getCurrent() === i
            });
        }
        return pages;
    }

    hasPrev() {
        return this.getCurrent() !== 1 && this.getPageCount() !== 1;
    }

    hasNext() {
        return this.getCurrent() !== this.getPageCount() && this.getPageCount() !== 1;
    }

    render() {
        return (
            <div className="pagination">
                {this.hasPrev() ? (
                    <Link to={{pathname: this.getPath(), search: `?page=${this.getCurrent() - 1}`}}
                          className="arrow prev"/>
                ): ''}

                {this.getPages().map((page, i) => {
                    return (
                        <Link
                            to={{pathname: this.getPath(), search: `?page=${page.number}`}}
                            key={i}
                            className={`item ${page.active ? 'active' : ''}`}>
                            {page.number}
                        </Link>
                    );
                })}

                {this.hasNext() ? (
                    <Link to={{pathname: this.getPath(), search: `?page=${this.getCurrent() + 1}`}}
                          className="arrow next"/>
                ): ''}
            </div>
        )
    }
}
