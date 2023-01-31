import { 
  Text, 
  TouchableOpacity, 
  View
} from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import { CheckBoxProps } from './types'

export function CheckBox({ isChecked = false, title, ...rest }: CheckBoxProps) {
  return(
    <TouchableOpacity
      activeOpacity={.7}
      className='flex-row mb-2 items-center'
      { ...rest }
    >
      { isChecked ? (

        <View 
          className="
            h-8 
            w-8
            rounded-lg 
            bg-green-500 
            items-center 
            justify-center
          "
        >
          <Feather 
            name="check"
            size={20} 
            color={colors.white}
          />
        </View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      ) }

      <Text className="text-white text-base ml-3 font-semibold">
        { title }
      </Text>

    </TouchableOpacity>
  )
}