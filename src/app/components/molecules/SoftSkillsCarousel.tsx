import React from 'react'
import Carousel from './Carousel'
import SoftSkill from '../atoms/SoftSkill'

const softSkills = [
  'Communication',
  'Teamwork',
  'Problem-solving',
  'Open-mindedness',
]

export default function SoftSkillsCarousel() {
  const listNode = softSkills.map((item, index) => (
    <SoftSkill
      key={index}
      label={item}
      className="hover:text-[var(--action)] cursor-pointer"
    />
  ))

  return <Carousel list={listNode} />
}
