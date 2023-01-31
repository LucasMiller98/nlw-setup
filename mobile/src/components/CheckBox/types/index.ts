import { TouchableOpacityProps } from 'react-native'

export interface CheckBoxProps extends TouchableOpacityProps {
  isChecked?: boolean
  title: string
}