import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

type ButtonClickAnimationProps = React.PropsWithChildren<{
  scale: SharedValue<number>;
}>;

/*Se eu espero ter children dentro de um costumized component, tenho de
seguir esta estrutura. Usar uma interface do tipo PropsWithChildren*/
const ButtonClickAnimation = ({
  scale,
  children,
}: ButtonClickAnimationProps): JSX.Element => {
  const animatedButton = useAnimatedStyle(() => {
    return {
      //opacity: progress.value,
      transform: [{scale: scale.value}],
    };
  }, []);

  return (
    <Animated.View
      style={[{alignItems: 'center', width: '100%'}, animatedButton]}>
      {children}
    </Animated.View>
  );
};

export default ButtonClickAnimation;
