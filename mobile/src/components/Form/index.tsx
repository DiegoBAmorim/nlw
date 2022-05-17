import React, { useState } from 'react'
import { ArrowLeft } from 'phosphor-react-native'
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system'
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native'

import { Button } from '../Button'
import { FeedbackType } from '../Widget'
import { Screenshot } from '../Screenshot'

import { styles } from './styles'
import { theme } from '../../theme'
import { api } from '../../services/api'
import { feedbackTypes } from '../../utils/feedbackTypes'

interface Props {
  feedbackType: FeedbackType
  onFeedbackCanceled: () => void
  onFeedbackSent: () => void
}

const Form: React.FC<Props> = ({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}) => {
  const [loading, setLoading] = useState(false)
  const [comment, setComment] = useState('')
  const [screenshot, setScreenshot] = useState<string | null>(null)

  const feedbackInfo = feedbackTypes[feedbackType]

  const handleScreenshot = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
      .then(uri => setScreenshot(uri))
      .catch(err => console.log(err))
  }

  const handleRemoveScreenshot = () => setScreenshot(null)

  const handleSendFeedback = async () => {
    if (loading) return

    setLoading(true)

    const screenshotBase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' }))

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment,
      })

      setLoading(false)

      onFeedbackSent()
    } catch (err) {
      console.log(err)

      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackInfo.image} style={styles.image} />

          <Text style={styles.titleText}>{feedbackInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        autoCorrect={false}
        onChangeText={setComment}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <Screenshot
          onTakeShot={handleScreenshot}
          onRemoveShot={handleRemoveScreenshot}
          screenshot={screenshot}
        />

        <Button isLoading={loading} onPress={handleSendFeedback} />
      </View>
    </View>
  )
}

export { Form }
