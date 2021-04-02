import {FilterType} from '../../../redux/users-reducer';
import React from 'react';
import {UsersSearchForm} from '../UsersSearchForm/UsersSearchForm';

import s from './UsersPageHeader.module.scss';

type UsersPageHeaderProps = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersPageHeader: React.FC<UsersPageHeaderProps> = ({ onFilterChanged}) => {
    return (
        <div className={s.centralMeta}>
            <div className={s.leftBlock}>
                <div className={s.pageTitle}>Friends / Followers
                    <span className={s.followCount}>55</span>
                </div>
            </div>
            <div className={s.rightBlock}>
                <UsersSearchForm onFilterChanged={onFilterChanged}/>
            </div>
        </div>
    )
}
