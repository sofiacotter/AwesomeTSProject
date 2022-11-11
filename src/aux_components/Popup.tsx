import React from 'react';
import {View, Pressable, Text, Modal} from 'react-native';
import Animated, {BounceInDown, BounceOutDown} from 'react-native-reanimated';
import stylesheet from '../styles/stylesheet';

interface PopupProps {
  statusState: string;
  openModal: (b: boolean) => void;
  goToGameStart: () => void;
}

const Popup = ({
  statusState,
  openModal,
  goToGameStart,
}: PopupProps): JSX.Element => {
  return (
    <Modal
      //animationType={'slide'}
      transparent={true}
      onRequestClose={() => {
        openModal(false);
      }}>
      <Animated.View
        style={stylesheet.modal}
        entering={BounceInDown.duration(1500)}
        exiting={BounceOutDown.duration(1500)}>
        <Text style={stylesheet.modaltext}>{statusState}</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={stylesheet.modalbutton}
            onPress={() => {
              openModal(false);
            }}>
            <Text style={stylesheet.buttontext}>Close</Text>
          </Pressable>
          <Pressable
            style={stylesheet.modalbutton}
            onPress={() => {
              openModal(false);
              goToGameStart();
            }}>
            <Text style={stylesheet.buttontext}>New Game</Text>
          </Pressable>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default Popup;
