import React from 'react'
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageProps,
  Text,
} from 'react-native'

import { styles } from './styles'

interface Props extends TouchableOpacityProps {
  title: string
  image: ImageProps
}

const Option: React.FC<Props> = ({ title, image, ...rest }) => (
  <TouchableOpacity style={styles.container} {...rest}>
    <Image source={image} style={styles.image} />

    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
)

export { Option }
