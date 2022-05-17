import React from 'react'
import { View, Text } from 'react-native'

import { Copyright } from '../Copyright'
import { Option } from '../Option'
import { FeedbackType } from '../Widget'

import { feedbackTypes } from '../../utils/feedbackTypes'

import { styles } from './styles'

interface Props {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void
}

const Options: React.FC<Props> = ({ onFeedbackTypeChanged }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Deixe seu feedback</Text>

    <View style={styles.options}>
      {Object.entries(feedbackTypes).map(([key, item]) => (
        <Option
          key={key}
          image={item.image}
          title={item.title}
          onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
        />
      ))}
    </View>

    <Copyright />
  </View>
)

export { Options }
