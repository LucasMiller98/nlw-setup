import { ActivityIndicator, View } from "react-native";
import { styles } from './styles/styles'

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color='#7c3aed' />
    </View>
  )
}