import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import InfoModal from '../modal/InfoModal';
import {getDogImageUrl} from '../Utility';

interface DogData {
  height?: {
    imperial?: string;
    metric?: string;
  };
}

export interface DogInfo {
  id?: number | string;
  reference_image_id?: string;
  name?: string;
  life_span?: string;
  breed_group?: string;
  bred_for?: string;
  height?: {
    imperial?: string;
    metric?: string;
  };
  weight?: {
    imperial?: string;
    metric?: string;
  };
}

const DogsList = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      try {
        let url = 'https://api.thedogapi.com/v1/breeds';
        if (searchText) {
          url = `https://api.thedogapi.com/v1/breeds/search?q=${searchText}&page=1&limit=10`;
        }
        const response = await fetch(url);
        const result = await response.json();
        setFilteredData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, [searchText]);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const handleSort = (order: 'asc' | 'desc') => {
    const sortedData = [...filteredData].sort((a: DogData, b: DogData) => {
      const heightA = parseInt(a.height?.imperial?.split(' - ')[0] || '0');
      const heightB = parseInt(b.height?.imperial?.split(' - ')[0] || '0');

      if (order === 'asc') {
        return heightA - heightB;
      } else {
        return heightB - heightA;
      }
    });
    setFilteredData(sortedData);
    setSortOrder(order);
  };

  const handleReset = () => {
    setSearchText('');
    setSortOrder('asc');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTextView}>
        <Text style={styles.title}>Dogs</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or breed..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <View>
        <View style={styles.filterView}>
          <Pressable onPress={() => handleReset()}>
            <Text style={styles.resetText}>Reset</Text>
          </Pressable>
          <Pressable
            onPress={() => handleSort(sortOrder === 'asc' ? 'desc' : 'asc')}
            style={{
              flexDirection: 'row',
            }}>
            <Text style={{right: 5, color: 'gray'}}>Sort By Height</Text>
            <Icon
              name="arrow-up"
              color={sortOrder === 'asc' ? 'blue' : 'gray'}
              size={16}
            />
            <Icon
              name="arrow-down"
              color={sortOrder === 'desc' ? 'blue' : 'gray'}
              size={16}
            />
          </Pressable>
        </View>
      </View>
      {loading && (
        <View
          style={[
            styles.container,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
      {!loading && (
        <>
          {filteredData?.length > 0 ? (
            <FlatList
              style={{top: 10}}
              data={filteredData}
              keyExtractor={(item: DogInfo) => item?.id?.toString() as string}
              renderItem={({item}) => (
                <Pressable
                  style={styles.item}
                  onPress={() => {
                    setIsModalVisible(true);
                    setInfo(item);
                  }}>
                  {item.reference_image_id && (
                    <Image
                      source={{
                        uri: getDogImageUrl(item?.reference_image_id),
                      }}
                      style={styles.image}
                    />
                  )}
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.subtitle}>
                      {item.breed_group || 'No breed group'}
                    </Text>
                  </View>
                </Pressable>
              )}
            />
          ) : (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text style={{color: 'black'}}>No data found</Text>
            </View>
          )}
        </>
      )}
      {isModalVisible && (
        <InfoModal
          info={info}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#f4f4f4',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  item: {
    backgroundColor: '#f4f4f4',
    marginVertical: 8,
    padding: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#FF6EC7',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  resetText: {
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    color: 'gray',
  },
  filterView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default DogsList;
