import React from 'react'
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native'

import { styles } from './styles'
import { theme } from '../../theme'

interface Props extends TouchableOpacityProps {
  isLoading: boolean
}

const Button: React.FC<Props> = ({ isLoading, ...rest }) => (
  <TouchableOpacity style={styles.container} {...rest}>
    {isLoading ? (
      <ActivityIndicator color={theme.colors.text_on_brand_color} />
    ) : (
      <Text style={styles.text}>Enviar Feedback</Text>
    )}
  </TouchableOpacity>
)

export { Button }
