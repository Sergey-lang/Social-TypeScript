import React from 'react'
import preloader from '../../u1-assets/images/app/preloader.gif'

import s from './Preloader.module.scss'

export const Preloader: React.FC = () => {
   return (
       <div className={s.preloader}>
          <img src={preloader} alt="preloader"/>
       </div>
   )
}

