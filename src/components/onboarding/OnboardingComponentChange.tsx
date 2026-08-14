import OnboardingComponent1 from '@/components/onboarding/OnboardingComponent1'
import OnboardingComponent2 from '@/components/onboarding/OnboardingComponent2'
import OnboardingComponent3 from '@/components/onboarding/OnboardingComponent3'

export default function OnboardingComponentChange(props : { pageNumber : number }) {
  switch(props.pageNumber){
    case 1: return <OnboardingComponent1 />
    case 2: return <OnboardingComponent2 />
    case 3: return <OnboardingComponent3 />
  }
}