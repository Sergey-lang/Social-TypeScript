import React from "react";
import s from "./Paginator.module.css";

type PaginatorProps = {
    currentPage: number
    onPageChanged: (p:number) => void
    pageSize: number
}

export const Paginator: React.FC<PaginatorProps> = ({currentPage,onPageChanged, pageSize}) => {

    let pages = []
    for (let i = 505; i <= 525; i++) {
        pages.push(i)
    }

    return (
        <div className={s.users_page_num}>
            {pages.map(p => {
                return <span key={Math.random()}
                             className={currentPage === p ? `${s.selected} ${s.totalCount}` : s.totalCount}
                             onClick={() => onPageChanged(p)}
                >{p}</span>
            })}
        </div>
    )
}