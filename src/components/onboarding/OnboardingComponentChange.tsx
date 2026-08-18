import { onboardingComponentProps } from '@/pages/Onboarding'
import OnboardingComponent1 from '@/components/onboarding/OnboardingComponent1'
import OnboardingComponent2 from '@/components/onboarding/OnboardingComponent2'
import OnboardingComponent3 from '@/components/onboarding/OnboardingComponent3'

export default function OnboardingComponentChange ({pageNumber, topic, setTopic, decision, setDecision, reason, setReason, selectedValue, setSelectedValue, selectedCategory, setSelectedCategory} : onboardingComponentProps) {
  switch(pageNumber){
    case 1: return <OnboardingComponent1 />
    case 2: return <OnboardingComponent2 />
    case 3: return <OnboardingComponent3
      pageNumber={pageNumber} 
      topic = {topic} 
      setTopic = {setTopic}
      decision = {decision}
      setDecision = {setDecision}
      reason = {reason}
      setReason = {setReason}
      selectedValue = {selectedValue}
      setSelectedValue = {setSelectedValue}
      selectedCategory = {selectedCategory}
      setSelectedCategory = {setSelectedCategory}
    />
  }
}