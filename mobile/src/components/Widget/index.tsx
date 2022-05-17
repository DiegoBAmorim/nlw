import React, { useRef, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { TouchableOpacity } from 'react-native'
import { ChatTeardropDots } from 'phosphor-react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { Form } from '../Form'
import { Options } from '../Options'
import { Success } from '../Success'

import { styles } from './styles'
import { theme } from '../../theme'
import { feedbackTypes } from '../../utils/feedbackTypes'

export type FeedbackType = keyof typeof feedbackTypes

const Widget: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  const handleOpen = () => {
    bottomSheetRef.current?.expand()
  }

  const handleRestartFeedback = () => {
    setFeedbackType(null)
    setFeedbackSent(false)
  }

  const handleFeedbackSent = () => setFeedbackSent(true)

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots size={24} color={theme.colors.text_on_brand_color} />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success onSendAnotherFeedback={handleRestartFeedback} />
        ) : (
          <>
            {feedbackType ? (
              <Form
                feedbackType={feedbackType}
                onFeedbackCanceled={handleRestartFeedback}
                onFeedbackSent={handleFeedbackSent}
              />
            ) : (
              <Options onFeedbackTypeChanged={setFeedbackType} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  )
}

export default gestureHandlerRootHOC(Widget)
