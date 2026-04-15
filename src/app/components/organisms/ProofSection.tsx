import SectionTemplate from '@/templates/SectionTemplate'
import Title from '../atoms/Title'

const proofItems = [
  'Built and shipped a React application serving 5,000+ users',
  'Reduced API response times by 45% using Redis caching',
  'Improved frontend load performance by 35%',
  'Led frontend delivery and collaborated across teams',
]

export default function ProofSection() {
  return (
    <SectionTemplate id="impact" className="min-h-0 flex flex-col items-center pt-8 sm:pt-12">
      <div className="w-full mx-auto max-w-[1160px]">
        <Title className="text-left">Experience & Impact</Title>
        <p className="pt-4 text-gray-300 max-w-3xl">
          Measured outcomes from production systems and cross-functional
          delivery.
        </p>
        <ul className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
          {proofItems.map((text) => (
            <li key={text} className="text-base text-gray-100/90 leading-8">
              - {text}
            </li>
          ))}
        </ul>
      </div>
    </SectionTemplate>
  )
}
