import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setType } from '../../lib/slice/productSlice';
import { ScrollView } from 'react-native-web';
import { addToCart } from '../../lib/slice/cartSlice';

export default function Screen_02() {
    const navigation = useNavigation();
    const [search, setSearch] = React.useState('');
    const [seeAll, setSeeAll] = React.useState(false);
    const dispatch = useDispatch();

    const type = useSelector((state) => state.product.type);
    const products = useSelector((state) => state.product.data);
    const loading = useSelector((state) => state.product.loading);

    // Change category
    const handleChangeType = (type) => {
        dispatch(setType(type));
    };

    // Handle fetching products
    useEffect(() => {
        dispatch(fetchProducts({ type })); // Fetch products when the type changes
        setSeeAll(false); // Reset seeAll to false
    }, [dispatch, type]);

    // Filter products based on search term
    const filteredData = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    // Limit data to show only 6 products when 'seeAll' is false
    const displayedData = seeAll ? filteredData : filteredData.slice(0, 6);

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <AntDesign name="arrowleft" size={24} color="black" />
                <TouchableOpacity onPress={() => {
                    navigation.navigate('screen03')
                }}>

                    <Entypo name="shopping-cart" size={24} color="green" />
                </TouchableOpacity>
            </View>

            {/* Search Input */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search"
                value={search}
                onChangeText={(text) => setSearch(text)}
            />

            {/* Category Buttons */}
            <View style={styles.categoryContainer}>
                {['vegetable', 'seafood', 'drinks'].map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={type === category ? styles.selectedType : styles.type}
                        onPress={() => handleChangeType(category)}
                    >
                        <Text style={type === category ? styles.categoryTextSelected : styles.categoryText}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'green'
                }}>Order your favorite</Text>
                <TouchableOpacity style={{

                }}
                    onPress={() => setSeeAll(true)}
                >
                    <Text style={{
                        color: 'orange',
                        fontSize: 16
                    }}>See all</Text>
                </TouchableOpacity>
            </View>

            {/* Products */}
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={displayedData}
                    keyExtractor={(item) => item.id.toString()} // Make sure 'id' is a string
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.productCard} onPress={
                            () => {
                                dispatch(addToCart({ ...item, quantity: 1 }))
                                navigation.navigate('screen03')
                            }
                        }>
                            <Image source={{ uri: item.image }} style={styles.productImage} />
                            <View>
                                <Text style={styles.productName}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    scrollEnabled={false}
                />
            )}

            {/* See all button
            {filteredData.length > 6 && !seeAll && (
                <TouchableOpacity onPress={() => setSeeAll(true)} style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
            )} */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    searchInput: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    selectedType: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 20,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    type: {
        padding: 10,
        borderRadius: 20,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'blue',
    },
    categoryText: {
        color: 'black',
        fontSize: 16,
    },
    categoryTextSelected: {
        color: 'white',
        fontSize: 16,
    },
    productCard: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        borderRadius: 10,
        width: '48%',
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        color: 'grey',
    },
    productImage: {
        width: '100%',
        height: 100,
    },
    seeAllButton: {
        backgroundColor: 'cyan',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    seeAllText: {
        color: 'white',
    },
});
