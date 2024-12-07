import { View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity } from '../../lib/slice/cartSlice';

export default function Screen_03() {
    const navigation = useNavigation();
    const [data, setData] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart.cart);

    useEffect(() => {
        setData(cart);
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });
        setTotal(total);
    }, [cart]);
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: 20
        }}>
            <TouchableOpacity onPress={() => navigation.navigate('screen02')}>

                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'green'
            }}>My Basket</Text>
            {
                data && data.length > 0 ? (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginVertical: 10
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>

                                    <Image source={{ uri: item.image }} style={{
                                        width: 70,
                                        height: 70
                                    }} />
                                    <View style={{
                                        marginLeft: 10
                                    }}>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            fontSize: 20,
                                            color: 'green'
                                        }}>${item.price}</Text>
                                        <Text>{item.name}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 5
                                        }}>
                                            <AntDesign name="star" size={14} color="yellow" />
                                            <AntDesign name="star" size={14} color="yellow" />
                                            <AntDesign name="star" size={14} color="yellow" />
                                            <AntDesign name="star" size={14} color="yellow" />
                                            <AntDesign name="star" size={14} color="yellow" />
                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 10
                                }}>
                                    <TouchableOpacity style={{
                                        backgroundColor: 'white',
                                        borderColor: 'green',
                                        borderWidth: 1,
                                        padding: 5,
                                        borderRadius: 100
                                    }}
                                        onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                                    >
                                        <AntDesign name="minus" size={24} color="green" />
                                    </TouchableOpacity>
                                    <Text>{item.quantity}</Text>
                                    <TouchableOpacity style={{
                                        backgroundColor: 'green',
                                        padding: 5,
                                        borderRadius: 100
                                    }}
                                        onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                    >
                                        <AntDesign name="plus" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                ) : (
                    <Text>No items in the cart</Text>
                )
            }
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                marginBottom: 20,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    borderTopWidth: 1,
                }}>
                    <Text>Total:</Text>
                    <Text>$ {total}</Text>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: 'green',
                    padding: 10,
                    borderRadius: 20,
                    marginTop: 20
                }}
                    onPress={() => navigation.navigate('screen02')}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>Payment</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}