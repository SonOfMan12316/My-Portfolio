import { StackInterface, stack } from './stack'
import { SocialMediaInterface, socialMedia } from './social-media'
import { ProjectInterface, projects } from './project'
import { ExperienceInterface, experiences } from './experience'
import { CertificationInterface, certifications } from './certification'

interface DataProps {
  stack: Array<StackInterface>
  socialMedia: Array<SocialMediaInterface>
  projects: Array<ProjectInterface>
  experiences: Array<ExperienceInterface>
  certifications: Array<CertificationInterface>
}

const DATA: DataProps = {
  stack,
  socialMedia,
  projects,
  experiences,
  certifications,
}

export default DATA
