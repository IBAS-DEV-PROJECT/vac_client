import { onboardingComponentProps } from '@/pages/Onboarding'
import OnboardingPage1Component from '@/components/onboarding/OnboardingPage1Component'
import OnboardingPage2Component from '@/components/onboarding/OnboardingPage2Component'
import OnboardingPage3Component from '@/components/onboarding/OnboardingPage3Component'

export default function OnboardingComponentChange ({pageNumber, topic, setTopic, decision, setDecision, reason, setReason, selectedValue, setSelectedValue, selectedCategory, setSelectedCategory} : onboardingComponentProps) {
  switch(pageNumber){
    case 1: return <OnboardingPage1Component />
    case 2: return <OnboardingPage2Component />
    case 3: return <OnboardingPage3Component
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