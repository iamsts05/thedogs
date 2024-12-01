import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import {
  calculateAverageHeight,
  calculateAverageWeight,
  getDogImageUrl,
} from '../Utility';

const InfoModal = ({setIsModalVisible, isModalVisible, info}: any) => {
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Button title="Show Modal" onPress={toggleModal} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <Pressable style={styles.overlay} onPress={() => toggleModal()}>
          <View style={styles.modalContent}>
            <View style={styles.imageContainer}>
              {info.reference_image_id && (
                <Image
                  source={{
                    uri: getDogImageUrl(info?.reference_image_id),
                  }}
                  style={styles.image}
                />
              )}
              <Text style={styles.nameText}>{info?.name}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text
                style={styles.infoText}>{`LifeSpan: ${info?.life_span}`}</Text>
              <Text
                style={styles.infoText}>{`Breed: ${info?.breed_group}`}</Text>
              <Text
                style={styles.infoText}>{`BreedFor: ${info?.bred_for}`}</Text>
              <Text style={styles.infoText}>
                {`Height: ${
                  calculateAverageHeight(info?.height)?.averageImperialHeightFt
                } ft`}
              </Text>
              <Text style={styles.infoText}>
                {`Weight: ${
                  calculateAverageWeight(info?.weight)?.averageImperialWeightKg
                } kg`}
              </Text>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    height: '50%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 75,
  },
  nameText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    padding: 10,
    justifyContent:"center",
    alignItems:"center",
  },
  infoText: {
    backgroundColor: '#f4f4f4',
    borderRadius: 6,
    padding: 10,
    margin: 5,
    color:"#8b8b8b",
    fontWeight:"600",
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default InfoModal;
