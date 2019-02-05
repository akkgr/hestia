import React from 'react'
import { Carousel } from 'antd'
import './index.css'

const Landing = () => (
  <Carousel autoplay effect="fade">
    <div>
      <h3>Παρακολούθηση Εξόδων</h3>
    </div>
    <div>
      <h3>Υπολογισμός Κοινοχρήστων</h3>
    </div>
    <div>
      <h3>Ημερολόγιο Εργασιών</h3>
    </div>
  </Carousel>
)

export default Landing
